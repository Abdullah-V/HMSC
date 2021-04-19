#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const { isFile, isFolder, lineCountOfFile, isExists, getFileExtension } = require("./lib.js")


var 
    lineCount = 0
    folderCount = 0
    fileCount = 0
    paths = []
    readedFolders = []
    givenPath = ""
    excludeds = []
    onlyFiles = []
    fileExtensions = []
    uniqueFileExtensions = []

async function readFolder(folder) {
    folderCount++
    folder = await path.resolve(folder)
    await paths.push(...fs.readdirSync(folder).map(fileName => {
        return path.join(folder, fileName)
    }))
}

function isEnd(path) {
    try {
        return isFile(path) || readedFolders.includes(path)
    }
    catch(e){
        return false
    }
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

async function analyzeFileExtensions() {
    fileExtensions = await onlyFiles.map(file => {
        return getFileExtension(path.basename(file))
    })
    uniqueFileExtensions = [...new Set(fileExtensions)]
}

function getPercentageOfFileExtension(fe) { // parameter mean file extension
    return fileExtensions.filter(e => { return e === fe }).length * 100 / fileExtensions.length
}

async function main(stuff) {
    if(isFile(stuff)) {
        console.log(`\n📄 ${chalk.green(lineCountOfFile(stuff))} ${chalk.blue("line")} in ${chalk.yellow(stuff)} file\n`)
    }
    else if(isFolder(stuff)) {
       await readFolder(stuff)
       return main(paths)
    }
    else if(Array.isArray(stuff)){
        if(paths.every(isEnd)){
            onlyFiles = await paths.filter(isFile) 
            await calculateCounts()
            await analyzeFileExtensions()
            // console.log(getPercentageOfFileExtension(".py"))
            console.log(`\n📂 ${chalk.green(folderCount)} ${chalk.blue("folder")};\n\n📄 ${chalk.green(lineCount)} ${chalk.blue("line")} in ${chalk.green(fileCount)} ${chalk.blue("file")}\n\n⭐ inside ${chalk.yellow(givenPath)}\n`)
        }
        else{
            await stuff.forEach(f => {
                if(isFolder(f) && !readedFolders.includes(f)){
                    readFolder(f)
                    readedFolders.push(f)
                }
            })
            return main(paths)
        }
    }
}

(async function setup(){
    // console.log(getFileExtension("deneme.js"))
    givenPath = await argv.path
    if(argv.exclude){
        excludeds = await Array.isArray(argv.exclude) ? argv.exclude : [argv.exclude]
    }
    
    excludeds = await excludeds.filter(isExists)

    excludeds = await excludeds.map(p => {
        return path.resolve(p)
    })

    await readedFolders.push(...excludeds)

    if(Array.isArray(givenPath)) {
        var v = await true // valid
        await givenPath.forEach(p => {
            if(!isExists(p)) {
                console.log(`\n❌  ${chalk.red("No such file or directory:")} ${chalk.yellow(p)}\n`)
                v = false
            }
        })
        if(v) {
            await givenPath.forEach(f => {
                paths.push(f)
            })
            if(givenPath.every(isFile)) { await folderCount++ }
            main(givenPath)
        }
    } 
    else {
        if(isExists(givenPath)) {
            main(givenPath)
        } else {
            console.log(`\n❌  ${chalk.red("No such file or directory:")} ${chalk.yellow(givenPath)}\n`)
        }
    }
})()

