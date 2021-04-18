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

    isExists(path) {
        return fs.existsSync(path)
    },
    
    getFileExtension(str) {
        try {
            if(str[0] === ".") {
                return false
            } else {
                return str.match(/\.[0-9a-z]+$/ig)[0]
            }
        } catch(e) { return false }
    }
}