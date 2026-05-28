const fs = require('fs');
const path = require('path');

function deleteFilesRecursive(dir, extensions, exclude = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      deleteFilesRecursive(filePath, extensions, exclude);
    } else if (extensions.some(ext => file.endsWith(ext)) && !exclude.includes(file)) {
      fs.unlinkSync(filePath);
      console.log(`Deleted: ${filePath}`);
    }
  });
}

const srcDir = path.join(__dirname, 'src');
deleteFilesRecursive(srcDir, ['.tsx', '.ts'], ['vite-env.d.ts']);
console.log('Cleanup complete!');
