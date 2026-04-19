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

let modifiedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // 1. Color Replacement
    // Gold (#BFA26A) -> Muted Sage Green (#A1C2B5)
    content = content.replace(/#BFA26A/g, '#A1C2B5');
    content = content.replace(/#bfa26a/g, '#a1c2b5');
    
    // Lighter Gold / Hover (#D4B87A) -> Lighter Sage Green (#B8D6C9)
    content = content.replace(/#D4B87A/g, '#B8D6C9');
    content = content.replace(/#d4b87a/g, '#b8d6c9');
    
    // We should also replace the literal text "glass-gold" to "glass-sage" just for semantic correctness internally
    content = content.replace(/glass-gold/g, 'glass-sage');
    
    // 2. Typography Replacements
    // Downgrade font-black to font-bold to reduce the "shouting" aspect
    content = content.replace(/font-black/g, 'font-bold');
    
    // Downgrade tracking-tighter to tracking-tight for more airy, elegant letter spacing
    content = content.replace(/tracking-tighter/g, 'tracking-tight');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Updated ${modifiedFiles} files.`);
