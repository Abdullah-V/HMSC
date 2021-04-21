const fs = require('fs');

module.exports = {
    isFile(path) {
        try {
            return fs.lstatSync(path).isFile()
        }
        catch(e){ return false }
    },
    
    isFolder(path) {
        try {
            return fs.lstatSync(path).isDirectory()
        }
        catch(e){ return false }
    },
    
    lineCountOfFile(path) {
        return fs.readFileSync(path, 'utf8').split("\n").length
    },

    isExists(path) {
        return fs.existsSync(path)
    },
    
    getFileExtension(str) {
        try {
                return str.match(/\.[0-9a-z]+$/ig)[0]
        } catch(e) { return false }
    },

    getSizeOfFile(file) {
        return fs.statSync(file).size / (1024*1024);
    }
}