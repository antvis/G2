const fs = require('fs');
const { exec } = require('child_process');

const folderPath = './manual'; // 替换成你的文件夹路径

function translateFile(filePath) {
  const command = `npx translate -d ${filePath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error translating ${filePath}: ${error.message}`);
      return;
    }
    console.log(`Translated ${filePath} successfully.`);
  });
}

function processFolder(folder) {
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${folder}`);
      return;
    }

    files.forEach((file) => {
      const filePath = `${folder}/${file}`;
      if (fs.statSync(filePath).isDirectory()) {
        // 如果是子文件夹，递归处理
        processFolder(filePath);
      } else if (file.endsWith('.zh.md')) {
        // 如果文件以'.zh.md'为扩展名，执行翻译命令
        translateFile(filePath);
      }
    });
  });
}

// bundle, event, pattern,3d-charts, ssr

processFolder(folderPath);
