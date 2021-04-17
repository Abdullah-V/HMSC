const fs = require('fs');

module.exports = {
    isFile(path) {
        try {
            return fs.lstatSync(path).isFile()
        }
        catch(e){}
    },
    
    isFolder(path) {
        try {
            return fs.lstatSync(path).isDirectory()
        }
        catch(e){}
    },
    
    lineCountOfFile(path) {
        return fs.readFileSync(path, 'utf8').split("\n").length
    },
}