const fs = require('fs');
const path = require('path');
const OSS = require('ali-oss');
const archiver = require('archiver');

async function zipSnapshots(dir, filename) {
  return new Promise((resolve) => {
    const output = fs.createWriteStream(filename);

    output.on('close', function () {
      if (archive.pointer() === 0) resolve(false);
      else resolve(true);
    });

    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.on('error', function (err) {
      throw err;
    });

    archive.pipe(output);

    let fileIndex = 0;

    const expects = new Set([]);

    function zipFiles(folder) {
      const fileNames = fs.readdirSync(folder);
      for (const fileName of fileNames) {
        const filePath = path.join(folder, fileName);
        const fileStat = fs.statSync(filePath);
        if (fileStat.isFile()) {
          const f = path.parse(filePath);
          if (f.name.endsWith('-diff') || f.name.endsWith('-actual')) {
            const expectFilePath = filePath
              .replace('-diff', '')
              .replace('-actual', '');
            expects.add(expectFilePath);
            archive.file(filePath, { name: `${fileIndex}-${f.base}` });
            fileIndex++;
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
      const f = path.parse(expectFilePath);
      archive.file(expectFilePath, { name: `${fileIndex}-${f.base}` });
      fileIndex++;
    }

    archive.finalize();
  });
}

async function put(file, secrets) {
  const client = new OSS({
    region: secrets[0],
    accessKeyId: secrets[1],
    accessKeySecret: secrets[2],
    bucket: secrets[3],
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

async function uploadSnapshot(root, secrets) {
  const zipFilePath = path.join(root, new Date().getTime() + '.zip');

  const hasPackFile = await zipSnapshots(
    path.join(root, '/__tests__/integration/snapshots'),
    zipFilePath,
  );

  if (hasPackFile) {
    await put(zipFilePath, secrets);
  } else {
    console.log('no diff snapshot files found');
  }
}

function main() {
  const [root, ...secrets] = process.argv.slice(2);
  if (secrets.length === 4) {
    uploadSnapshot(root, secrets);
  } else console.log('skip upload');
}

main();
