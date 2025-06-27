import * as fs from 'fs';
import * as path from 'path';

/**
 * Rewrites code blocks from G2.Chart format to Chart instance format
 *
 * Transforms:
 * const chart = new G2.Chart(options);
 * return chart.getContainer();
 *
 * To:
 * import { Chart } from "@antv/g2"
 * const chart = new Chart({ container: 'container',...options });
 *
 * Also ensures that ```js | ob {} includes inject true
 */

// Regular expression to match ob code blocks with chart
const OB_CODE_BLOCK_REGEX = /```js\s*\|\s*ob(.*?)\n([\s\S]*?)```/g;
const G2_CHART_REGEX =
  /const\s+(\w+)\s*=\s*new\s+G2\.Chart\(\s*(\{[\s\S]*?\})?\s*\)\s*;/g;
// General regex to match all G2 API calls and property access
const G2_API_ASSIGNMENT_REGEX = /const\s+(\w+)\s*=\s*G2\.(\w+)/g;
const G2_API_CALL_REGEX = /G2\.(\w+)\(/g;
const G2_PROPERTY_REGEX = /G2\.(\w+)(?!\s*\()/g; // Match G2.property but not G2.function(
const RETURN_CONTAINER_REGEX = /return\s+\w+\.getContainer\(\);\s*$/gm;
const IIFE_START_REGEX = /^\(\s*\(\s*\)\s*=>\s*{\s*$/m;
const IIFE_END_REGEX = /^\s*}\s*\)\s*\(\s*\)\s*;?\s*$/m;

/**
 * Transform G2.Chart to Chart instance code
 * @param match The matched string
 * @param chartName The chart variable name
 * @param options The chart options object
 */
function transformG2ChartToChartInstance(
  match: string,
  chartName: string,
  options = '{}',
): string {
  return `import { Chart } from "@antv/g2";

const ${chartName} = new Chart({
  container: 'container',${options.trim().slice(1, -1)}
});`;
}

/**
 * Extract G2 API names from code content
 */
function extractG2APIs(content: string): Set<string> {
  const apis = new Set<string>();

  // Use a single comprehensive regex to find all G2 API usage
  const g2ApiRegex = /G2\.(\w+)/g;
  let match;

  while ((match = g2ApiRegex.exec(content)) !== null) {
    apis.add(match[1]);
  }

  return apis;
}

/**
 * Transform G2 API calls to named imports
 */
function transformG2APIs(content: string): string {
  // Extract all G2 APIs used in the content
  const apis = extractG2APIs(content);

  // Transform all G2.apiName to apiName
  content = content.replace(/G2\.(\w+)/g, '$1');

  // Add import statement if APIs were found
  if (apis.size > 0) {
    const importStatement = `import { ${Array.from(apis)
      .sort()
      .join(', ')} } from '@antv/g2';\n\n`;
    content = importStatement + content;
  }

  return content;
}

/**
 * Ensure inject true is included in ob options
 * @param obOptions The options string like ' { pin: false }' or ''
 * @returns Updated options string with inject true
 */
function ensureAutoMount(obOptions: string): string {
  // If there are no options, add them with inject true
  if (!obOptions || obOptions.trim() === '') {
    return ' { inject true }';
  }

  // Check if there are already options
  const trimmed = obOptions.trim();
  if (!trimmed.includes('{')) {
    return ` { inject true }`;
  }

  // Parse the options to see if autoMount already exists
  const optionsMatch = trimmed.match(/\{(.*)\}/);
  if (!optionsMatch) {
    return ` { inject true }`;
  }

  const optionsContent = optionsMatch[1].trim();
  if (optionsContent === '') {
    return ` { inject true }`;
  }

  // Check if autoMount already exists
  if (optionsContent.includes('inject')) {
    return obOptions;
  }

  // Add inject true to existing options
  const updatedOptions = trimmed.replace(/\{(.*)\}/, (match, content) => {
    const separator = content.trim() ? ', ' : '';
    return `{ ${content}${separator}inject true }`;
  });

  return ` ${updatedOptions}`;
}

/**
 * Process a single file to rewrite ob code blocks
 * @param filePath
 */
function processFile(filePath: string): void {
  try {
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    content = content.replace(
      OB_CODE_BLOCK_REGEX,
      (match, obOptions: string, codeContent: string) => {
        // Ensure inject true is included in ob options
        const updatedObOptions = ensureAutoMount(obOptions);

        // Replace G2.Chart with Chart instance in the code content
        let updatedCodeContent = codeContent.replace(
          G2_CHART_REGEX,
          (g2ChartMatch: string, chartName: string, options: string) => {
            modified = true;
            return transformG2ChartToChartInstance(
              g2ChartMatch,
              chartName,
              options,
            );
          },
        );

        // Transform all G2 API calls
        const originalContent = updatedCodeContent;
        updatedCodeContent = transformG2APIs(updatedCodeContent);
        if (updatedCodeContent !== originalContent) {
          modified = true;
        }

        // Remove return chart.getContainer() statements
        updatedCodeContent = updatedCodeContent.replace(
          RETURN_CONTAINER_REGEX,
          '',
        );

        // Remove IIFE wrapper (only at start and end)
        updatedCodeContent = updatedCodeContent
          .replace(IIFE_START_REGEX, '')
          .replace(IIFE_END_REGEX, '')
          .trim(); // Remove extra whitespace

        // Merge import statements
        updatedCodeContent = mergeImportStatements(updatedCodeContent);

        // If code was modified or options were updated, the file needs to be saved
        if (
          updatedCodeContent !== codeContent ||
          updatedObOptions !== obOptions
        ) {
          modified = true;
        }

        // Return the updated code block with proper formatting
        return `\`\`\`js | ob${updatedObOptions}\n${updatedCodeContent}\n\`\`\``;
      },
    );

    // Save changes if the file was modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Transformed: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

/**
 * Merge multiple import statements into one
 */
function mergeImportStatements(content: string): string {
  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]@antv\/g2['"];?/g;
  const imports = new Set<string>();
  let match;

  // Collect all imports
  while ((match = importRegex.exec(content)) !== null) {
    const items = match[1].split(',').map((item) => item.trim());
    items.forEach((item) => imports.add(item));
  }

  // Remove all import statements
  content = content.replace(importRegex, '');

  // Add merged import statement at the beginning
  if (imports.size > 0) {
    const importStatement = `import { ${Array.from(imports).join(
      ', ',
    )} } from '@antv/g2';\n\n`;
    content = importStatement + content;
  }

  return content;
}

/**
 * Recursively find all markdown files in a directory
 * @param dir
 */
async function findMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  // Read directory contents
  const dirEntries = await fs.promises.readdir(dir, { withFileTypes: true });

  // Process each entry
  for (const entry of dirEntries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively search subdirectories
      const subFiles = await findMarkdownFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Add markdown files to result
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Main function to scan and process files
 */
async function main() {
  try {
    // Find all markdown files in site/docs
    const docsDir = path.resolve(__dirname, '../docs');
    const files = await findMarkdownFiles(docsDir);
    console.log(`Found ${files.length} markdown files to scan`);

    let processedCount = 0;

    // Process each file
    for (const file of files) {
      processFile(file);
      processedCount++;

      // Log progress periodically
      if (processedCount % 50 === 0) {
        console.log(`Processed ${processedCount}/${files.length} files`);
      }
    }

    console.log(`Completed processing ${processedCount} files`);
  } catch (error) {
    console.error('Error scanning files:', error);
  }
}

// Run the script
main().catch((error) => {
  console.error('Error executing script:', error);
  process.exit(1);
});
