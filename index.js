const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const { isFile, isFolder, lineCountOfFile } = require("./lib.js")


var 
    lineCount = 0,
    folderCount = 0,
    fileCount = 0,
    files = [],
    readedFolders = []

const givenPath = process.argv[2]


async function readFolder(folder) {
    folderCount++
    await files.push(...fs.readdirSync(folder).map(fileName => {
        return path.join(folder, fileName)
    }))
}

function isEnd(path) {
    try {
        return fs.lstatSync(path).isFile() || readedFolders.includes(path)
    }
    catch(e){
        return false
    }
}

async function calculateCounts() {
    folderCount -= 1
    var onlyFiles = files.filter(isFile)
    fileCount = onlyFiles.length
    await onlyFiles.forEach(file => {
        lineCount += lineCountOfFile(file)
    })
}

async function main(stuff) {
    if(isFile(stuff)) {
        console.log(`\n${chalk.green(lineCountOfFile(stuff))} ${chalk.blue("line")} in ${chalk.yellow(stuff)} file\n`)
    }
    else if(isFolder(stuff)) {
       await readFolder(stuff)
       return main(files)
    }
    else if(Array.isArray(stuff)){
        if(files.every(isEnd)){
            await calculateCounts()
            console.log(`\n${chalk.green(folderCount)} ${chalk.blue("folder")};\n\n${chalk.green(lineCount)} ${chalk.blue("line")} in ${chalk.green(fileCount)} ${chalk.blue("file")}\n\ninside ${chalk.yellow(givenPath)}\n`)
        }
        else{
            await stuff.forEach(f => {
                if(isFolder(f) && !readedFolders.includes(f)){
                    readFolder(f)
                    readedFolders.push(f)
                }
            })
            return main(files)
        }
    }
}

(function setup(){
    main(givenPath)
    // console.log(argv);
})()