var nameFile = File.openDialog("Select Text File with Names", "*.psd", false);
var names = [ ];

if(!nameFile) {
    alert("No Text file selected!");
    $.gc;
}

function createCerts() {
    if(!names[0]) return;
    var doc = app.activeDocument;
    var nameLayer;
    var textSize = 0;
    for(var i = 0; i < doc.layers.length; i++) {
        var layer = doc.layers[i];
        if(layer.kind === LayerKind.TEXT) {
            var textItem = layer.textItem;
            if(textItem.content.length === 0 &&
                textItem.size > textSize) nameLayer = layer;
        }
    }
    for(var i = 0; i < names.length; i++) {
        var textItem = nameLayer.textItem;
        textItem.content = names[i];
        var psdFilePath = doc.fullName;    
        var outputPath = psdFilePath.parent.fsName + "/" + psdFilePath.name.replace(/\.psd$/i, ".png");
        doc.saveAs(new File(outputPath), pngOptions);
    }
}

function processNames() {
    var file = new File(nameFile);
    var open = file.open('r');
    var contents = file.read();
    file.close;
    var delimiters = /\s\n\r,\|&/gmi;
    names = contents.split(delimiters);
}