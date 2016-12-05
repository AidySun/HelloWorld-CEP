
if(window && window.adobe_cep) {
	window.adobe_cep.showDevTools();
}

// Get a reference to a CSInterface object
var csInterface = new CSInterface();
var button = window.document.getElementById("btn");

button.onclick = function() {
// Call function defined in host/ps.jsx
console.log("CSInterface Api Version = " + CSInterface.getCurrentApiVersion());
alert(CSInterface.getCurrentApiVersion());
csInterface.evalScript("addDocument()");
};
