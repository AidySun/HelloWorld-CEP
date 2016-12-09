
$('#myselect').on('keydown',function(e) {
	var key = e.which;
  if(key == 13) { // the enter key code
    doAction($("#myselect").val());
    window.close();
  } 
  if(key == 27) { // the escape key code
    window.close();
  }
});

function doAction(actionID) {
	var script = "app.menuActions.itemByID(" + actionID + ").invoke()";
	var csInterface = new CSInterface();
	csInterface.evalScript(script);
}

function myOnLoad() {
/*
    $("#includedContent").load(getTempFolder()+"IDSN.html"); 

    $("#myselect").searchable();
    
    $("#myselect").change(function(){
        doAction(this.value);
      });
*/
}


function createHTML() {
	var tempFile = createTempFolder() + "IDSN.html";
	var csInterface = new CSInterface();
	csInterface.evalScript("$._CEP_CC.selectWithOptions()", function (result) {
			window.cep.fs.writeFile(tempFile, result);
	//		window.cep.fs.setPosixPermissions(tempFile, "777");
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

