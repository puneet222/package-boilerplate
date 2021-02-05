const fs = require('fs');
var entryFiles = []
const readDirectory = (path) => {
    if (!path) {
        return []
    }
    let children = []
    fs.readdirSync(path).forEach(function (file) {
        const childFile = generateFS(`${path}/${file}`, file)
        children.push(childFile)
    })
    return children
}
const generateFS = (path = '', name) => {
    if (!path) { return {} }
    let updatedName = name
    let isDirectory = false
    if (!name) {
        const splittedPath = path.split("/")
        updatedName = splittedPath[splittedPath.length - 1]
    }
    const stat = fs.statSync(path)
    if (stat.isDirectory()) {
        isDirectory = true
    }
    let fileTree = {
        name: updatedName,
        path,
        isDirectory,
        children: isDirectory ? readDirectory(path) : []
    }
    return fileTree
}
const generateEntryPaths = (files = []) => {
    files.forEach(file => {
        if(!file.isDirectory){
            entryFiles.push(file.path)
        }
        else {
            generateEntryPaths(file.children)
        }
    })
    return entryFiles
}
const getFiles = ( files = [], ext) => {
    const splittedFilenames = files.map( file => {
        const splittedpath = file.split('actions')
        const fileStr  = splittedpath[splittedpath.length - 1]
        const path = splittedpath.filter((path , index) => {
        if( index > 0 && index < (splittedpath.length - 1)){
            return path
        }
        })
        if( fileStr.search(ext) > 0){
            return path + fileStr
        } else {
            return ""
        }
    })
    const filteredfiles = splittedFilenames.filter(file => (file.length > 0))
    return filteredfiles
}
module.exports = {
    generateFS : generateFS,
    generateEntryPaths : generateEntryPaths,
    getFiles: getFiles
}