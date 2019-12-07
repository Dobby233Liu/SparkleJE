// main process

const { app, dialog, remote } = require('electron')
const bwindow = window.bwindow = remote.getCurrentWindow()
appRoot = window.appRoot = __dirname
bwindow.on('page-title-updated', function(event, title){
    bwindow.webContents.executeJavaScript("window.titleChanged(\""+title.replace('\\', '\\\\')+"\")");
})
exports.selectJSONFile = () => {
    return dialog.showOpenDialogSync(bwindow, {
        title: "Select a File",
        buttonLabel: "Use",
        filters: [
            { name: 'JSON File', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ["openFile"]
    })
}
exports.saveJSONFile = () => {
    return dialog.showSaveDialogSync(bwindow, {
        title: "Save the File",
        buttonLabel: "Save",
        filters: [
            { name: 'JSON File', extensions: ['json'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    })
}