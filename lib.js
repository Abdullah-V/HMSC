const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const lib = {
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
        } catch(e) { return str }
    },

    getSizeOfFile(file) {
        return fs.statSync(file).size / (1024*1024);
    },

    isHidden(p) {
        try {
            return path.basename(p)[0] === "."
        } catch(e) { return false }
    },

    easyPadStart(padCount, str) {
        return str.padStart([...str].length + padCount) 
    },

    printDocumentation() {
        console.log(`\n${chalk.yellow("HMSC (How Much Stuffs CLI) analyst for your files and folders")}\n`)
        console.log(`📄 Check guide, examples and source code from here: ${chalk.green("https://github.com/Abdullah-V/HMSC")}\n`)

        // --path
        console.log(`${chalk.blue("--path")}\n`)
        console.log(lib.easyPadStart(6, "Give an absolute or relative path."))
        console.log(lib.easyPadStart(6, "If path is folder path, folder analyzes is is shown,"))
        console.log(lib.easyPadStart(6, "if file path, shows number of lines and size of file."))
        console.log(lib.easyPadStart(6, "You can multiple this.\n"))

        // --exclude
        console.log(`${chalk.blue("--exclude")}\n`)
        console.log(lib.easyPadStart(6, "Folders or files you wanted to be excluded."))
        console.log(lib.easyPadStart(6, "Give the relative or absolute path."))
        console.log(lib.easyPadStart(6, "You can multiple this.\n"))

        // --table
        console.log(`${chalk.blue("--table")}\n`)
        console.log(lib.easyPadStart(6, "If given, output shown as table.\n"))

        // --exclude-hidden-files
        console.log(`${chalk.blue("--exclude-hidden-files")}\n`)
        console.log(lib.easyPadStart(6, "Exclude hidden files.\n"))

        // --exclude-hidden-folders
        console.log(`${chalk.blue("--exclude-hidden-folders")}\n`)
        console.log(lib.easyPadStart(6, "Exclude hidden folders.\n"))

        // --exclude-all-hiddens
        console.log(`${chalk.blue("--exclude-all-hiddens")}\n`)
        console.log(lib.easyPadStart(6, "Exclude hidden files and folders.\n"))

        // --sort-by <key>
        console.log(`${chalk.blue("--sort-by <key>")}\n`)
        console.log(lib.easyPadStart(6, "Sort output by <key>\n"))
        console.log(lib.easyPadStart(6, `Available keys: ${chalk.bold("count")}, ${chalk.bold("lineCount")}, ${chalk.bold("size")}\n`))
        console.log(lib.easyPadStart(6, `NOTE: Sorting is ascending by default. For descending sorting use ${chalk.blue("--desc")} option.\n`))
    }
}

module.exports = lib