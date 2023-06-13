var nameFile = File.openDialog("Select Text File with Names", "*.txt", false);
var names = [ ];

if(!nameFile) {
    alert("No Text file selected!");
    $.gc;
}

function createCerts() {
    if(!names[0]) return;
    var doc = app.activeDocument;
    var nameLayer = doc.activeLayer;
    var textSize = 0;
    for(var i = 0; i < names.length; i++) {
        var textItem = nameLayer.textItem;
        textItem.content = names[i];
        var psdFilePath = doc.fullName;    
        var outputPath = psdFilePath.parent.fsName + "/" + psdFilePath.name.replace(/\.psd$/i, ".png");
        var pngOptions = new PNGSaveOptions();
        doc.saveAs(new File(outputPath), pngOptions);
    }
}

function processNames() {
    var file = new File(nameFile);
    var open = file.open('r');
    var contents = file.read();
    file.close;
    var delimiters = /\n\r,\|&/gmi;
    names = contents.split(delimiters);
}

processNames();
createCerts();