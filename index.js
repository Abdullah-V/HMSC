#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const { 
    isFile, 
    isFolder, 
    lineCountOfFile, 
    isExists, 
    getFileExtension, 
    getSizeOfFile
} = require("./lib.js");

const { table } = require('console');

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
    fileExtensionStatistics = []
    totalSize = 0
    tableOutput = false

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
    onlyFiles.forEach(async (f) => {
        f = await path.resolve(f)
        if(!readedFolders.includes(f)) {
            fileCount++ 
            totalSize += getSizeOfFile(f)
        }
        else { onlyFiles.splice(onlyFiles.indexOf(f),1) }
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

function getPercentageOfLines(l) { // line
    return l * 100 / lineCount
}

function getPercentageOfSize(s) { // size
    return s * 100 / totalSize
}

async function calculateFileExtensionStatistics() {
    uniqueFileExtensions.forEach(async (ufe) => {
        var totalLine = 0
        var s = 0 // size
        await onlyFiles.filter(f => { return path.basename(f).endsWith(ufe) }).forEach(file => {
            totalLine += lineCountOfFile(file)
            s += getSizeOfFile(file)
        })
        fileExtensionStatistics.push({
            fe: ufe,
            percentage: getPercentageOfFileExtension(ufe).toFixed(2),
            count: fileExtensions.filter(e => {return e === ufe}).length,
            lineCount: totalLine,
            size: s
        })
    })
}

function logFileExtensionStatistics() {
    fileExtensionStatistics.forEach(item => {
        console.log(`\n${chalk.green(item.lineCount)} ${chalk.blue("line")} (${chalk.cyan(getPercentageOfLines(item.lineCount).toFixed(2) + '%' )} of total lines) on ${chalk.green(item.count)} ${chalk.yellow(item.fe)} ${chalk.blue("file")} (${chalk.cyan(item.percentage + '%')} of all files), ${chalk.blue("Size:")} ${chalk.green(item.size.toFixed(8))} MB (${chalk.cyan(getPercentageOfSize(item.size).toFixed(2) + "%")} of total size)`)
    })
}

async function output() {
    onlyFiles = await paths.filter(isFile) 
    await calculateCounts()
    await analyzeFileExtensions()
    await calculateFileExtensionStatistics()
    await console.log(`\n📂 ${chalk.green(folderCount)} ${chalk.blue("folder")};\n\n📄 ${chalk.green(lineCount)} ${chalk.blue("line")} in ${chalk.green(fileCount)} ${chalk.blue("file")};\n`)
    await console.log(`Total ${chalk.blue("size")} of files: ${chalk.green(totalSize.toFixed(8))} MB\n`)
    await console.log(chalk.green(uniqueFileExtensions.length) + chalk.blue(" file extensions: ") + chalk.yellow(...uniqueFileExtensions) + ";")
    if(!tableOutput) { await logFileExtensionStatistics() }
    if(tableOutput) {
        console.log()
        await console.table(
            fileExtensionStatistics.map(item => {
                return {
                    "File extension": item.fe,
                    "Count of files": `${item.count} (${item.percentage}% of all files)`,
                    "Line Count": `${item.lineCount} (${getPercentageOfLines(item.lineCount).toFixed(2)}% of all lines)`,
                    "Size":  `${item.size.toFixed(8)} MB (${getPercentageOfSize(item.size).toFixed(2)}% of total size)`
                }
            })
        )
    }
    await console.log(`\n⭐ inside ${chalk.yellow(givenPath)}\n`)
}

async function main(stuff) {
    if(isFile(stuff)) {
        console.log(`\n📄 ${chalk.green(lineCountOfFile(stuff))} ${chalk.blue("line")} in ${chalk.yellow(stuff)} file; ${chalk.blue("Size")}: ${chalk.green(getSizeOfFile(stuff).toFixed(8))} MB\n`)
    }
    else if(isFolder(stuff)) {
       await readFolder(stuff)
       return main(paths)
    }
    else if(Array.isArray(stuff)){
        if(paths.every(isEnd)){
            output()
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
    givenPath = await argv.path
    if(!givenPath) {
        console.log(`\n${chalk.yellow("HMSC (How Many Stuffs CLI) analyst for your files and folders")}\n`)
        console.log(`📄 Check guide, examples and source code from here: ${chalk.green("https://github.com/Abdullah-V/HMSC")}\n`)

        // --path
        console.log(`${chalk.blue("--path")}\n`)
        console.log("Give an absolute or relative path.".padStart(40))
        console.log("If path is folder path, folder analyzes is is shown,".padStart(58))
        console.log("if file path, shows number of lines and size of file.".padStart(59))
        console.log("You can multiple this.\n".padStart(29))

        // --exclude
        console.log(`${chalk.blue("--exclude")}\n`)
        console.log("Folders or files you wanted to be excluded.".padStart(49))
        console.log("Give the relative or absolute path.".padStart(41))
        console.log("You can multiple this.\n".padStart(29))

        // --table
        console.log(`${chalk.blue("--table")}\n`)
        console.log("If given, output shown as table.\n".padStart(38))

        return false
    }
    if(argv.exclude){
        excludeds = await Array.isArray(argv.exclude) ? argv.exclude : [argv.exclude]
    }
    
    excludeds = await excludeds.filter(isExists)

    excludeds = await excludeds.map(p => {
        return path.resolve(p)
    })

    await readedFolders.push(...excludeds)

    tableOutput = await "table" in argv

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

