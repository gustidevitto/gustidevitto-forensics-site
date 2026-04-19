const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.match(/\.(tsx|ts|jsx|js|css|json|md)$/)) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
files.push(path.join(__dirname, 'index.html'));

let modifiedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Saturation Bump (From Muted Greyish Sage to a Clearer Lab Sage)
    content = content.replace(/#A1C2B5/g, '#82C7A8');
    content = content.replace(/#a1c2b5/g, '#82C7A8');
    
    // Hover State Bump
    content = content.replace(/#B8D6C9/g, '#A4E0C4');
    content = content.replace(/#b8d6c9/g, '#A4E0C4');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated ${file}`);
    }
});

const indexCssPath = path.join(__dirname, 'src', 'index.css');
if(fs.existsSync(indexCssPath)) {
    let css = fs.readFileSync(indexCssPath, 'utf8');
    let origCss = css;
    css = css.replace(/#A1C2B5/g, '#82C7A8');
    css = css.replace(/#a1c2b5/g, '#82C7A8');
    if(css !== origCss) {
        fs.writeFileSync(indexCssPath, css, 'utf8');
    }
}

console.log(`Updated ${modifiedFiles} files.`);
