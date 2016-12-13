
$('#myselect').on('keydown',function(e) {
	var key = e.which;
  if(key == 13) { // the enter key code
    //doAction($("#myselect").val());
    //window.close();
  } 
  if(key == 27) { // the escape key code
    window.close();
  }
});

$('#refresh').on('click', function(e) {
  createHTML();
});

function doAction(actionID) {
	var script = "app.menuActions.itemByID(" + actionID + ").invoke()";
	var csInterface = new CSInterface();
	csInterface.evalScript(script);
}

function myOnLoad() {
    new CSInterface().evalScript("$._Ext_IDSN.doesFileExist(\"" + tempJSFFilePath() + "\")", function (result) {
      if (result == "No") {
        createHTML();
        location.reload();
      }
    }); 
}

function tempJSFFilePath() { 
  return createTempFolder() + "IDSN.html.js";
}

function createHTML() {
	var tempFile = tempJSFFilePath();
	new CSInterface().evalScript("$._Ext_IDSN.selectWithOptions()", function (result) {
		window.cep.fs.writeFile(tempFile, result);
		});	
}

function createTempFolder() {
  var tempFolder = getTempFolder();
  window.cep.fs.makedir(tempFolder);
  //window.cep.fs.setPosixPermissions(tempFolder, "777");
  return tempFolder;
}

function getTempFolder() {
  var tempFolderName = 'com.example.helloworld.extension/';
  var tempFolder = '/tmp/' + tempFolderName;
  if (window.navigator.platform.toLowerCase().indexOf('win') > -1) {
    tempFolder = new CSInterface().getSystemPath(SystemPath.USER_DATA) + '/../Local/Temp/' + tempFolderName;
  }
  return tempFolder;
}

