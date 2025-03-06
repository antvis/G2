const fs = require('fs');
const path = require('path');

/**
 * @param {Object} param
 * @param {import('@actions/core')} param.core
 * @param {import('@actions/core').InputOptions} param.inputs
 */
module.exports = async ({ core, inputs }) => {
  try {
    const API_BASE = 'https://www.yuque.com/api/v2';
    const group_login = 'antv'; // 知识库所属组织
    const { token, book_slug, site_slug } = inputs;

    // 存储创建的文档ID，用于后续更新目录
    const createdDocIds = {
      tutorials: [],
      examples: [],
    };

    core.info('开始更新语雀文档...');

    // 删除知识库中的所有文档
    async function clearAllDocs() {
      core.info('获取知识库文档列表...');

      try {
        let allDocs = [];
        let offset = 0;
        const limit = 100; // 语雀API每页最大条数
        let hasMore = true;

        // 循环获取所有文档
        while (hasMore) {
          core.info(`获取文档列表，偏移量: ${offset}, 数量: ${limit}...`);

          const response = await fetch(
            `${API_BASE}/repos/${group_login}/${book_slug}/docs?offset=${offset}&limit=${limit}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
              },
            },
          );

          if (!response.ok) {
            throw new Error(`获取文档列表失败: ${response.statusText}`);
          }

          const data = await response.json();
          const docs = data.data;

          if (docs && docs.length > 0) {
            allDocs = allDocs.concat(docs);
            offset += docs.length;

            // 如果返回的文档数量小于请求的限制，说明已经没有更多文档了
            if (docs.length < limit) {
              hasMore = false;
            }
          } else {
            hasMore = false;
          }
        }

        core.info(`共找到 ${allDocs.length} 个文档，准备删除...`);

        // 删除所有文档
        for (const doc of allDocs) {
          core.info(`删除文档: ${doc.title} (${doc.id})...`);

          const deleteResponse = await fetch(
            `${API_BASE}/repos/${group_login}/${book_slug}/docs/${doc.id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': token,
              },
            },
          );

          if (!deleteResponse.ok) {
            core.warning(
              `删除文档 ${doc.title} 失败: ${deleteResponse.statusText}`,
            );
          } else {
            core.info(`已删除文档: ${doc.title}`);
          }
        }

        core.info('所有文档已删除');
      } catch (error) {
        core.error('删除文档过程中出错:' + error.message);
        throw error;
      }
    }

    // 创建单个文档
    async function createDoc(title, body, type) {
      try {
        core.info(`创建文档: ${title}...`);

        const response = await fetch(
          `${API_BASE}/repos/${group_login}/${book_slug}/docs`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Auth-Token': token,
            },
            body: JSON.stringify({
              title: title,
              public: 1,
              format: 'lake',
              body: body,
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`创建文档失败: ${response.statusText}`);
        }

        const data = await response.json();
        core.info(`文档已创建: ${title} (ID: ${data.data.id})`);

        // 存储文档ID用于后续更新目录
        if (type === 'tutorial') {
          createdDocIds.tutorials.push(data.data.id);
        } else {
          createdDocIds.examples.push(data.data.id);
        }

        return data.data.id;
      } catch (error) {
        core.error(`创建文档 ${title} 时出错: ${error.message}`);
        return null;
      }
    }

    // 更新知识库目录
    async function updateToc() {
      try {
        core.info('更新知识库目录...');

        const response = await fetch(
          `${API_BASE}/repos/${group_login}/${book_slug}/toc`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'X-Auth-Token': token,
            },
            body: JSON.stringify({
              action: 'appendNode',
              action_mode: 'child',
              doc_ids: [...createdDocIds.tutorials, ...createdDocIds.examples],
              type: 'DOC',
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`更新目录失败: ${response.statusText}`);
        }

        core.info('知识库目录已更新');
      } catch (error) {
        core.error('更新目录时出错: ' + error.message);
        throw error;
      }
    }

    // 递归获取所有 .zh.md 文件并创建文档
    async function processMarkdownFiles() {
      core.info('处理Markdown文档...');

      function getAllMarkdownFiles(dir) {
        let results = [];

        if (!fs.existsSync(dir)) {
          core.warning(`目录不存在: ${dir}`);
          return results;
        }

        const list = fs.readdirSync(dir);
        list.forEach((file) => {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          if (stat && stat.isDirectory()) {
            results = results.concat(getAllMarkdownFiles(filePath));
          } else if (file.endsWith('.zh.md')) {
            results.push(filePath);
          }
        });
        return results;
      }

      try {
        // 获取文档目录
        const docsDir = path.join(process.cwd(), site_slug, 'docs');
        core.info(`搜索文档目录: ${docsDir}`);

        const files = getAllMarkdownFiles(docsDir);
        core.info(`找到 ${files.length} 个中文 Markdown 文件`);

        // 为每个文件创建文档
        for (const file of files) {
          let content = fs.readFileSync(file, 'utf-8');
          const fileName = path.basename(file, '.zh.md');
          const title = `教程-${fileName}`;

          await createDoc(title, content, 'tutorial');
        }
      } catch (error) {
        core.error('处理 Markdown 文件时出错: ' + error.message);
        throw error;
      }
    }

    // 处理示例代码文件
    async function processExampleFiles() {
      core.info('处理示例代码...');

      function traverseDirectory(dir) {
        const metaFiles = [];

        if (!fs.existsSync(dir)) {
          core.warning(`目录不存在: ${dir}`);
          return metaFiles;
        }

        function findMetaFiles(directory) {
          try {
            fs.readdirSync(directory, { withFileTypes: true }).forEach(
              (dirent) => {
                const fullPath = path.join(directory, dirent.name);
                if (dirent.isDirectory()) {
                  findMetaFiles(fullPath);
                } else if (dirent.name === 'meta.json') {
                  metaFiles.push(fullPath);
                }
              },
            );
          } catch (err) {
            core.warning(`读取目录 ${directory} 时出错: ${err.message}`);
          }
        }

        findMetaFiles(dir);
        return metaFiles;
      }

      async function processMetaJson(metaFilePath) {
        try {
          const dir = path.dirname(metaFilePath);
          const folderName = path.basename(dir);
          const metaContent = fs.readFileSync(metaFilePath, 'utf-8');
          const metaJson = JSON.parse(metaContent);

          if (Array.isArray(metaJson.demos)) {
            for (const demo of metaJson.demos) {
              const demoFilePath = path.join(dir, demo.filename);
              if (
                fs.existsSync(demoFilePath) &&
                fs.statSync(demoFilePath).isFile()
              ) {
                await processDemoFile(demoFilePath, demo.title.zh, folderName);
              }
            }
          }
        } catch (error) {
          core.error(`处理 ${metaFilePath} 时出错: ${error.message}`);
        }
      }

      async function processDemoFile(filePath, title, category) {
        try {
          let content = fs.readFileSync(filePath, 'utf-8');
          // 移除HTML标签
          content = removeHtmlTags(content);

          const docTitle = `${category}-${title}`;
          await createDoc(docTitle, `// ${title}\n${content}`, 'example');
        } catch (error) {
          core.error(`处理 ${filePath} 时出错: ${error.message}`);
        }
      }

      // 移除HTML标签的函数
      function removeHtmlTags(code) {
        // 找到模板字符串中的HTML标签
        const templateStringRegex = /`([\s\S]*?)`/g;

        return code.replace(templateStringRegex, (match, templateContent) => {
          // 移除模板字符串中的HTML标签
          const cleanTemplate = templateContent
            .replace(/<[^>]*>[\s\S]*?<\/[^>]*>/g, '')
            .replace(/<[^>]*\/>/g, '') // 移除自闭合标签
            .replace(/<[^>]*>/g, ''); // 移除单个开放标签

          return '`' + cleanTemplate + '`';
        });
      }

      try {
        const rootDir = process.cwd();
        core.info(`搜索示例文件，根目录: ${rootDir}`);

        const metaFiles = traverseDirectory(rootDir);
        core.info(`找到 ${metaFiles.length} 个 meta.json 文件`);

        for (const metaFile of metaFiles) {
          await processMetaJson(metaFile);
        }
      } catch (error) {
        core.error('处理示例文件时出错: ' + error.message);
        throw error;
      }
    }

    // 主执行函数
    try {
      core.startGroup('清除现有文档');
      await clearAllDocs();
      core.endGroup();

      core.startGroup('处理示例文件');
      await processExampleFiles();
      core.endGroup();

      core.startGroup('处理文档文件');
      await processMarkdownFiles();
      core.endGroup();

      core.startGroup('更新目录');
      await updateToc();
      core.endGroup();

      core.info('文档更新处理完成');
    } catch (error) {
      core.setFailed(`更新语雀文档失败: ${error.message}`);
    }
  } catch (error) {
    core.setFailed(`脚本执行失败: ${error.message}`);
  }
};
