// index.html js
window.titleChanged = (event) => {
    window.titleF = event;
    document.getElementById("tb-title-text-region").innerHTML = event;
}
window.JSONEditor = window.jeNPM = require("@json-editor/json-editor")
function empty(v) {
    let type = typeof v;
    if (type === 'undefined') {
        return true;
    }
    if (type === 'boolean') {
        return !v;
    }
    if (v === null) {
        return true;
    }
    if (v === undefined) {
        return true;
    }
    if (v instanceof Array) {
        if (v.length < 1) {
            return true;
        }
    } else if (type === 'string') {
        if (v.length < 1) {
            return true;
        }
        if (v === '0') {
            return true;
        }
    } else if (type === 'object') {
        if (Object.keys(v).length < 1) {
            return true;
        }
    } else if (type === 'number') {
        if (v === 0) {
            return true;
        }
    }
    return false;
}
window.openErrorCause = "no errors"
function openFile (path/**String*/) { // FIXME: should not just return when errors
    let errorsReturn = false;
    try {
        if (empty(path)) {
            window.openErrorCause = "path is empty (by: empty(path) detecter)"
        }
        if (!path || path == null || path === null || undefined === path || path === void 0 || typeof path == 'undefined') {
            window.openErrorCause = "path is null or undefined or void 0"
            return;
        }
        if (path.trim() == "") {
            window.openErrorCause = "path is empty (with trimming in editor code)"
            return;
        }
    } catch { 
        errorsReturn = true;
        window.openErrorCause = "can't confirm if path is undefined or null or empty because the editor catch errors from JavaScript engine (possibliy the path wasn't string)"
    }
    if (errorsReturn) return;
} // TODO
window.remote = require('electron').remote
let maxCB = (e)=>{
    window.bwindow.maximize();
    document.querySelector("#tb-button-max").id="tb-button-unmax";
    document.querySelector("#tb-button-unmax").alt="Unmaximize";
    document.querySelector("#tb-button-unmax").title="Unmaximize";
    document.querySelector("#tb-button-unmax").onclick = unmaxCB
}
let unmaxCB = (e)=>{
    window.bwindow.unmaximize();
    document.querySelector("#tb-button-unmax").id="tb-button-max";
    document.querySelector("#tb-button-max").alt="Maximize";
    document.querySelector("#tb-button-max").title="Maximize";
    document.querySelector("#tb-button-max").onclick = maxCB
}
window.onload = (e)=>{
    window.wygiwysEditor = CodeMirror.fromTextArea(document.getElementById("jeditor-wygiwys-right"), {
        lineNumbers: true,
        mode: {name: "javascript", json: true}
    });
    let heightMain = parseInt(getComputedStyle(document.body).height.replace("px", ""));
    let heightTB = parseInt(getComputedStyle(document.querySelector("#title-bar")).height.replace("px", ""));
    let outerH = heightMain - heightTB;
    console.log("resizing rt", heightMain, heightTB, outerH)
    document.querySelector("#content").style.height = outerH + "px";
    document.querySelectorAll(".jeditor-box")[0].style.height = outerH + "px";
    window.wygiwysEditor.setSize(null, outerH);
    console.log("resized", document.querySelector("#content"), document.querySelectorAll(".jeditor-box")[0], window.wygiwysEditor)
    setInterval(() => {
        let heightMain = parseInt(getComputedStyle(document.body).height.replace("px", ""));
        let heightTB = parseInt(getComputedStyle(document.querySelector("#title-bar")).height.replace("px", ""));
        let outerH = heightMain - heightTB;
        document.querySelector("#content").style.height = outerH + "px";
        document.querySelectorAll(".jeditor-box")[0].style.height = outerH + "px";
        window.wygiwysEditor.setSize(null, outerH);
    }, 1)
    document.querySelector("#tb-button-min").onclick = (e)=>{
        window.bwindow.minimize();
    }
    document.querySelector("#tb-button-max").onclick = maxCB
    document.querySelector("#tb-button-close").onclick = (e)=>{
        window.bwindow.close();
    }
}