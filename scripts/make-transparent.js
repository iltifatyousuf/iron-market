const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..', 'src', 'components', 'home');

function replaceBackgrounds(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      replaceBackgrounds(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/bg-neutral-950(?![\/\w])/g, 'bg-transparent');
      content = content.replace(/bg-neutral-900(?![\/\w])/g, 'bg-black/20 backdrop-blur-sm border-y border-white/5');
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
}

replaceBackgrounds(directoryPath);
console.log('Backgrounds updated to be transparent!');
