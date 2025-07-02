import * as fs from 'fs';
import * as path from 'path';

// 递归查找所有 markdown 文件
function findMarkdownFiles(dir: string): string[] {
  const mdFiles: string[] = [];

  function traverse(currentDir: string) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        const fullPath = path.join(currentDir, item.name);
        traverse(fullPath);
      } else if (item.name.endsWith('.md')) {
        mdFiles.push(path.join(currentDir, item.name));
      }
    }
  }

  traverse(dir);
  return mdFiles;
}

// 提取文件中的 Playground 组件
function extractPlaygroundComponents(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const playgroundRegex =
    /<Playground\s+path="([^"]+)"\s+rid="([^"]+)"[^>]*>[\s\S]*?<\/playground>/gi;
  const matches: Array<{
    fullMatch: string;
    path: string;
    rid: string;
    filePath: string;
  }> = [];

  let match;
  while ((match = playgroundRegex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      path: match[1],
      rid: match[2],
      filePath: filePath,
    });
  }

  return matches;
}

// 读取对应的代码文件内容
function getCodeContent(codePath: string, baseDir: string): string | null {
  // 构建完整的文件路径 - 修正路径构建
  const fullCodePath = path.join(baseDir, 'examples', codePath);

  if (!fs.existsSync(fullCodePath)) {
    console.warn(`警告: 代码文件不存在: ${fullCodePath}`);
    return null;
  }

  try {
    return fs.readFileSync(fullCodePath, 'utf8');
  } catch (error) {
    console.error(`读取文件失败 ${fullCodePath}:`, (error as Error).message);
    return null;
  }
}

// 生成新的代码块
function generateObservableCodeBlock(codeContent: string, rid: string): string {
  return `\`\`\`js | ob { inject: true }\n${codeContent}\n\`\`\``;
}

// 处理单个 Markdown 文件
function processMarkdownFile(
  filePath: string,
  baseDir: string,
): { processed: boolean; count: number } {
  console.log(`处理文件: ${path.relative(baseDir, filePath)}`);

  const playgroundComponents = extractPlaygroundComponents(filePath);
  if (playgroundComponents.length === 0) {
    return { processed: false, count: 0 };
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;

  for (const component of playgroundComponents) {
    const codeContent = getCodeContent(component.path, baseDir);
    if (codeContent) {
      const newCodeBlock = generateObservableCodeBlock(
        codeContent,
        component.rid,
      );
      content = content.replace(component.fullMatch, newCodeBlock);
      replacements++;
      console.log(
        `  ✓ 替换 Playground: ${component.path} -> Observable 代码块`,
      );
    } else {
      console.log(`  ✗ 跳过 Playground: ${component.path} (代码文件未找到)`);
    }
  }

  if (replacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { processed: true, count: replacements };
  }

  return { processed: false, count: 0 };
}

// 主函数
function main() {
  const docsDir = path.join(__dirname, '..', 'docs'); // 修正路径：从scripts目录向上一级找到docs
  const outputPath = path.join(__dirname, 'playground-extraction-report.md');

  if (!fs.existsSync(docsDir)) {
    console.error(`错误: docs 目录不存在: ${docsDir}`);
    return;
  }

  console.log('正在扫描 docs 目录中的 Markdown 文件...');
  const mdFiles = findMarkdownFiles(docsDir);
  console.log(`找到 ${mdFiles.length} 个 Markdown 文件`);

  const results: Array<{ file: string; replacements: number }> = [];
  let totalProcessed = 0;
  let totalReplacements = 0;

  for (const filePath of mdFiles) {
    const result = processMarkdownFile(filePath, path.join(__dirname, '..')); // 修正基础目录为site目录
    if (result.processed) {
      results.push({
        file: path.relative(path.join(__dirname, '..'), filePath),
        replacements: result.count,
      });
      totalProcessed++;
      totalReplacements += result.count;
    }
  }

  // 生成报告
  let report = '# Playground 组件提取报告\n\n';
  report += `## 统计信息\n\n`;
  report += `- 扫描的 Markdown 文件总数: ${mdFiles.length}\n`;
  report += `- 处理的文件数: ${totalProcessed}\n`;
  report += `- 总替换数: ${totalReplacements}\n\n`;

  if (results.length > 0) {
    report += `## 处理详情\n\n`;
    for (const result of results) {
      report += `### ${result.file}\n`;
      report += `- 替换的 Playground 组件数: ${result.replacements}\n\n`;
    }
  }

  report += `## 处理时间\n\n`;
  report += `${new Date().toLocaleString()}\n`;

  fs.writeFileSync(outputPath, report, 'utf8');

  console.log('\n📊 处理完成!');
  console.log(`✅ 处理了 ${totalProcessed} 个文件`);
  console.log(`🔄 总共替换了 ${totalReplacements} 个 Playground 组件`);
  console.log(`📄 报告已生成: ${outputPath}`);
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  main,
  findMarkdownFiles,
  extractPlaygroundComponents,
  getCodeContent,
  processMarkdownFile,
};
