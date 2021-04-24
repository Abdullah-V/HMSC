const fs = require('fs');
const path = require('path');

module.exports = {
    isFile(p) {
        try {
            return fs.lstatSync(p).isFile()
        }
        catch(e){ return false }
    },
    
    isFolder(p) {
        try {
            return fs.lstatSync(p).isDirectory()
        }
        catch(e){ return false }
    },
    
    lineCountOfFile(p) {
        return fs.readFileSync(p, 'utf8').split("\n").length
    },

    isExists(p) {
        return fs.existsSync(p)
    },
    
    getFileExtension(str) {
        try {
                return str.match(/\.[0-9a-z]+$/ig)[0]
        } catch(e) { return false }
    },

    getSizeOfFile(file) {
        return fs.statSync(file).size / (1024*1024);
    },

    isHidden(p) {
        try {
            return path.basename(p)[0] === "."
        } catch(e) { return false }
    }
}