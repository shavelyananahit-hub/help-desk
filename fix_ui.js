const fs = require('fs');
const path = require('path');

const replacements = {
    'dzevakert-սխալ': 'dzevakert-skhalt',
    'Ցатsr': 'Ցածր',
    'Միջین': 'Միջին',
    'IT, HR, Ծառայություն...': 'ՏՏ, ՄՌ, Ծառայություն...',
    'Help Desk Կառավարում': 'Աջակցության Կենտրոնի Կառավարում',
    'Help Desk Կառավարման Համակարգ': 'Աջակցության Կենտրոնի Կառավարման Համակարգ',
    'Help Desk': 'Աջակցության Կենտրոն',
    '>Help<': '>Աջակցության<',
    '>Desk<': '>Կենտրոն<'
};

const sortedKeys = Object.keys(replacements).sort((a, b) => b.length - a.length);

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    for (let key of sortedKeys) {
        let value = replacements[key];
        content = content.split(key).join(value);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next') && !file.includes('api')) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('c:\\Anahit\\aaaaaaa\\aaaaaaaaaaaaaaaa\\src');
files.forEach(processFile);
console.log("Done");
