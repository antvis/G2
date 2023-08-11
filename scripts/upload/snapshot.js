const fs = require('fs');
const path = require('path');
const OSS = require('ali-oss');
const archiver = require('archiver');

async function zipSnapshots(dir, filename) {
  return new Promise((resolve) => {
    const output = fs.createWriteStream(filename);
    let fileIndex = -1;

    output.on('close', function () {
      if (fileIndex === -1) resolve(false);
      else resolve(true);
    });

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.on('error', function (err) {
      throw err;
    });

    archive.pipe(output);

    const expects = new Set([]);

    function zipFiles(folder) {
      const fileNames = fs.readdirSync(folder);
      for (const fileName of fileNames) {
        const filePath = path.join(folder, fileName);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isFile()) {
          const f = path.parse(filePath);
          if (f.name.endsWith('-diff') || f.name.endsWith('-actual')) {
            fileIndex++;
            const expectFilePath = filePath
              .replace('-diff', '')
              .replace('-actual', '');
            expects.add(expectFilePath);
            archive.file(filePath, { name: `${fileIndex}-${f.base}` });
          }
        }
        if (fileStat.isDirectory()) {
          zipFiles(filePath);
        }
      }
    }

    zipFiles(dir);

    // zip expects
    for (const expectFilePath of expects) {
      fileIndex++;
      const f = path.parse(expectFilePath);
      archive.file(expectFilePath, { name: `${fileIndex}-${f.base}` });
    }

    archive.finalize();
  });
}

async function put(file) {
  const client = new OSS({
    region: process.env.OSS_REGION,
    accessKeyId: process.env.OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
    bucket: process.env.OSS_BUCKET,
  });
  try {
    await client.put(path.parse(file).base, path.normalize(file), {
      headers: {},
    });
    console.log('upload success');
  } catch (e) {
    console.log('upload failed');
  }
}

function toFileName(str) {
  return JSON.stringify(str)
    .replace(/\"|\\/g, '')
    .replace(/[\/:*?"<>|]/g, '_')
    .replace(/ /g, '_');
}

function getZipName() {
  const title = process.env.REF_NAME || 'unknown';
  return (
    toFileName(title) +
    '-' +
    new Date().toLocaleString('zh-CN').replace(/\/|:/g, '-').replace(' ', '_')
  );
}

async function uploadSnapshot() {
  const root = process.env.GITHUB_WORKSPACE;
  const zipFilePath = path.join(root, getZipName() + '.zip');

  const hasPackFile = await zipSnapshots(
    path.join(root, '/__tests__/integration/snapshots'),
    zipFilePath,
  );

  if (hasPackFile) {
    await put(zipFilePath);
  } else {
    fs.unlinkSync(zipFilePath);
    console.log('no diff snapshot files found');
  }
}

function main() {
  const { OSS_REGION, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_BUCKET } =
    process.env;
  if (OSS_REGION && OSS_ACCESS_KEY_ID && OSS_ACCESS_KEY_SECRET && OSS_BUCKET) {
    uploadSnapshot();
  } else console.log('skip upload');
}

main();
