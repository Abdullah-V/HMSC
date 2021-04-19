# HMSC (Beta)

[![node](https://badges.aleen42.com/src/node.svg)](https://badges.aleen42.com/src/javascript.svg
)
[![npm](https://badges.aleen42.com/src/npm.svg
)](https://badges.aleen42.com/src/npm.svg)
[![javascript](https://badges.aleen42.com/src/javascript.svg
)](https://badges.aleen42.com/src/javascript.svg
)


## 🔰 About

HMSC (How Many Stuffs) provide you count the number of files, folders and lines in the directory (and more)

## 📓 Requirements
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://nodejs.org/en/download/)


## 🔌 Installation

`$ npm i -g hmsc`

## ⚡ Usage

### 📂 Example direcotry structure

```
C:.
|   sampleFile1.js
|   sampleFile2.js
|
+---onlyFiles
|       file1.js
|       file2.js
|
+---onlyFolder
|   +---subFolder1
|   |   \---subSubFolder11
|   \---subFolder2
|       \---subSubFolder21
\---sampleFolder
    |   subFile1.js
    |
    +---subFolder1
    |       subFile1.js
    |
    \---subFolder2
            subFile1.js
```

### `--path`

Give an absolute or relative path. If path is folder path, the number of folders, lines and files is shown. if file path, shows number of lines. You can multiple this.

#### Examples:

```cmd
$ hmsc --path "C:\\Users\\Abdullah\\Desktop\\testForHMS\\"

📂 9 folder;

📄 30 line in 7 file

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\




$ hmsc --path "C:\\Users\\Abdullah\\Desktop\\testForHMS\\sampleFile1.js"

📄 17 line in C:\Users\Abdullah\Desktop\testForHMS\sampleFile1.js file




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\adasdsasd"

❌  No such file or directory: C:\Users\Abdullah\Desktop\testForHMS\adasdsasd




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\" --path "C:\Users\Abdullah\Desktop\testForHMS\sampleFile1.js"

📂 4 folder;

📄 17 line in 1 file

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\,C:\Users\Abdullah\Desktop\testForHMS\sampleFile1.js
```

### `--exclude`

Folders or files you wanted to be excluded, give the relative or absolute path. You can multiple this.

#### Examples: 
```cmd

$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\"

📂 4 folder;

📄 30 line in 7 file

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\"

📂 3 folder;

📄 28 line in 5 file

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\" --path "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\subFolder1\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\file1.js"

📂 3 folder;

📄 1 line in 1 file

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\,C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\
```



## ✨ Todoes
- [ ] "exclude hidden files/folders" option
- [ ] File extension analysis
- [ ] Add image(s) to readme


## 🔒 License
[MIT LICENSE](https://github.com/Abdullah-V/HMS/blob/master/LICENSE)