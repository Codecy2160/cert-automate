var files = File.openDialog("Select Photoshop files", "*.psd", false);
var nameFile = File.openDialog("Select Text File with Names", "*.psd", false);
var names = [ ];

if(!files) alert("No Photoshop file selected!");
else if(!nameFile) alert("No Text file selected!");
if(!files || !nameFile) $.gc;

function createCerts(x) {
    if(!names[x]) return;
    var file = new File(files[0]);
    var doc = app.open(file);
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

}

function processNames() {
    var file = new File(nameFile);
    var name = file.open('r');
    var contents = file.read();
    file.close;
    var delimiters = /\s\n\r,\|&/gmi;
    names = contents.split(delimiters);
}