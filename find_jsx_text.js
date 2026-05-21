const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next') && !file.includes('api')) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') && !file.includes('api')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('c:\\Anahit\\aaaaaaa\\aaaaaaaaaaaaaaaa\\src');
let uniqueTexts = new Set();

files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find text between > and <
    const matches = content.match(/>([^<]+)</g);
    if (matches) {
        matches.forEach(m => {
            const text = m.substring(1, m.length - 1).trim();
            if (text && /[a-zA-Z]/.test(text) && !text.includes('=>') && !text.includes('}')) {
                uniqueTexts.add(text);
            }
        });
    }

    // Find placeholders
    const placeholders = content.match(/placeholder="([^"]+)"/g);
    if (placeholders) {
        placeholders.forEach(p => {
            const text = p.split('"')[1];
            if (text && /[a-zA-Z]/.test(text)) {
                uniqueTexts.add(text);
            }
        });
    }
});

console.log([...uniqueTexts].join('\n'));
