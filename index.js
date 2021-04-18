#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const { isFile, isFolder, lineCountOfFile, isExists, getFileExtension } = require("./lib.js")


var 
    lineCount = 0,
    folderCount = 0,
    fileCount = 0,
    files = [],
    readedFolders = []
    givenPath = ""
    excludeds = []
    onlyFiles = []

async function readFolder(folder) {
    folderCount++
    folder = await path.resolve(folder)
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

async function isExcluded(stuff) {
    var res = false
    await excludeds.forEach(excld => {
        if(path.resolve(stuff).startsWith(path.resolve(excld))){
            res = true
        }
    })
    return res
}

async function calculateCounts() {
    folderCount -= 1
    // fileCount = onlyFiles.length
    onlyFiles.forEach(async (f) => {
        f = await path.resolve(f)
        if(!readedFolders.includes(f)) { fileCount++ }
    })
    await onlyFiles.forEach(async (file) => {
        file = await path.resolve(file)
        if(!readedFolders.includes(file)) {
            lineCount += lineCountOfFile(file)
        }
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
            onlyFiles = await files.filter(isFile) 
            await calculateCounts()
            console.log(`\n📂 ${chalk.green(folderCount)} ${chalk.blue("folder")};\n\n📄 ${chalk.green(lineCount)} ${chalk.blue("line")} in ${chalk.green(fileCount)} ${chalk.blue("file")}\n\n⭐ inside ${chalk.yellow(givenPath)}\n`)
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

(async function setup(){
    // console.log(getFileExtension("deneme.js"))
    givenPath = await argv.path
    if(argv.excludeds){
        excludeds = await Array.isArray(argv.excludeds) ? argv.excludeds : [argv.excludeds]
    }
    
    excludeds = await excludeds.filter(isExists)

    excludeds = await excludeds.map(p => {
        return path.resolve(p)
    })

    await readedFolders.push(...excludeds)

    if(isExists(givenPath)) {
        main(givenPath)
    } else {
        console.log(`\n❌  ${chalk.red("No such file or directory:")} ${chalk.yellow(givenPath)}\n`)
    }
})()