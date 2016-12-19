var $select2Obj = $("select");


function redirect() {
  new CSInterface().evalScript("$._Ext_IDSN.doesFileExist(\"" + getDataFile() + "\")", function(result) {
   if (result == "Yes") {
     window.location=getDataFile();
   }
  });
}

function onLoad() {
  new CSInterface().evalScript("$._Ext_IDSN.doesFileExist(\"" + getDataFile() + "\")", function(result) {
    if (result == "No") {
      createHTML();
      location.reload();
    }
  });

  $select2Obj.val("").trigger("change");
  $select2Obj.select2("open");
}

$select2Obj.on("select2:select", function (e) { 
//  smallUI();
  var value = $("#menuList").val();
  doAction(value);
  window.close();
});

$select2Obj.on("select2:opening", function (e) { 
  CSInterface.prototype.resizeContent(615, 450);
  $select2Obj.val(null).trigger("change");
});

$select2Obj.on("select2:open", function (e) { 
  $select2Obj.val(null).trigger("change");
});

$select2Obj.on("select2:closing", function (e) { 
  smallUI();
});

$select2Obj.on("select2:close", function (e) { 
  window.close();
});


$('#refresh').on('click', function(e) {
//  createHTML();
location.reload();
});


function doAction(actionID) {
  var script = "app.menuActions.itemByID(" + actionID + ").invoke()";
  var csInterface = new CSInterface();
  csInterface.evalScript(script);
}

function smallUI() {
  CSInterface.prototype.resizeContent(615, 60);
}

function getDataFile() {
  var sysPath = new CSInterface().getSystemPath(SystemPath.EXTENSION);
  var hostEnv = new CSInterface().getHostEnvironment();
  var dataFile = sysPath + '/' + hostEnv.appId + '_' + hostEnv.appUILocale + '_' + hostEnv.appVersion + '.js';
  return dataFile;
}

function createHTML() {
  var tempFile = getDataFile();
  new CSInterface().evalScript("$._Ext_IDSN.selectWithOptions()", function(result) {
    window.cep.fs.writeFile(tempFile, result);
  });
}

$('input').on('keydown', function(e) {
  var key = e.which;
  //if (key == 13) { // the enter key code
    //doAction($("#menuList").val());
    //window.close();
  //}
  if (key == 27) { // the escape key code
    //$('#menuList').select2().select2('close');
    $select2Obj.select2("close");
    window.close();
  }
});
