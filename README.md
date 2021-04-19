# HMSC (Beta)

[![node](https://badges.aleen42.com/src/node.svg)](https://badges.aleen42.com/src/javascript.svg
)
[![npm](https://badges.aleen42.com/src/npm.svg
)](https://badges.aleen42.com/src/npm.svg)
[![javascript](https://badges.aleen42.com/src/javascript.svg
)](https://badges.aleen42.com/src/javascript.svg
)


## 🔰 About

HMSC (How Many Stuffs CLI) provide you count the number of files, folders and lines in the directory (and more)

## 📓 Requirements
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)


## 🔌 Installation

`$ npm i -g hmsc`

## ⚡ Usage

### 📂 Example direcotry structure

```
C:.
|   sampleFile1.js
|   sampleFile2.js
|   sampleFile3.py
|
+---onlyFiles
|       file1.js
|       file2.js
|       file3.py
|
+---onlyFolder
|   +---subFolder1
|   |   \---subSubFolder11
|   \---subFolder2
|       \---subSubFolder21
\---sampleFolder
    |   subFile1.js
    |   subFile2.py
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

📄 33 line in 10 file;

7 .js file (70.00%);

3 .py file (30.00%);

⭐ inside C:\\Users\\Abdullah\\Desktop\\testForHMS\\




$ hmsc --path "C:\\Users\\Abdullah\\Desktop\\testForHMS\\sampleFile1.js"

📄 17 line in C:\Users\Abdullah\Desktop\testForHMS\sampleFile1.js file




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\adasdsasd"

❌  No such file or directory: C:\Users\Abdullah\Desktop\testForHMS\adasdsasd




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\" --path "C:\Users\Abdullah\Desktop\testForHMS\sampleFile1.js"

📂 4 folder;

📄 17 line in 1 file;

1 .js file (100.00%);

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\,C:\Users\Abdullah\Desktop\testForHMS\sampleFile1.js
```

### `--exclude`

Folders or files you wanted to be excluded, give the relative or absolute path. You can multiple this.

#### Examples: 
```cmd

$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\"

📂 4 folder;

📄 33 line in 10 file;

7 .js file (70.00%);

3 .py file (30.00%);

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\"

📂 3 folder;

📄 30 line in 7 file;

5 .js file (71.43%);

2 .py file (28.57%);

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\




$ hmsc --path "C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\" --path "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\subFolder1\" --exclude "C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\file1.js"

📂 3 folder;

📄 2 line in 2 file;

1 .js file (50.00%);

1 .py file (50.00%);

⭐ inside C:\Users\Abdullah\Desktop\testForHMS\onlyFiles\,C:\Users\Abdullah\Desktop\testForHMS\onlyFolder\
```



## ✨ Todoes
- [ ] "exclude hidden files/folders" option
- [ ] Line count on file extension analysis
- [ ] Add image(s) to readme
- [ ] Add tests.js

## ⚖️ License
[MIT LICENSE](https://github.com/Abdullah-V/HMSC/blob/master/LICENSE)