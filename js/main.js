var csInterface = new CSInterface();
var $select2Obj = $("select");

function redirect() {
  var htmlFile = getHTMLFile();

  csInterface.evalScript("$._Ext_IDSN.doesFileExist(\"" + htmlFile + "\")", function(result) {
    if (result == "No") {
      generateHTMLFile();
      location.reload();
    }
    if (result == "Yes") {
     window.location = htmlFile;
    }
  });
}

function onLoad() {
  $select2Obj.val("").trigger("change");
  $select2Obj.select2("open");
}

$select2Obj.on("select2:select", function (e) { 
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
  redirect();
});


function doAction(actionID) {
  var script = "app.menuActions.itemByID(" + actionID + ").invoke()";
  var csInterface = new CSInterface();
  csInterface.evalScript(script);
}

function smallUI() {
  CSInterface.prototype.resizeContent(615, 60);
}

function getHTMLFile() {
  var sysPath = new CSInterface().getSystemPath(SystemPath.EXTENSION);
  var hostEnv = new CSInterface().getHostEnvironment();
  var dataFile = sysPath + '/' + hostEnv.appId + '_' + hostEnv.appUILocale + '_' + hostEnv.appVersion + '.html';
  return dataFile;
}


function generateHTMLFile() {
  var htmlFile = getHTMLFile();
  new CSInterface().evalScript("$._Ext_IDSN.generateHTML()", function(result) {
    var fileResult = window.cep.fs.writeFile(htmlFile, result);
    if (0 == fileResult.err) {
      return true;
    }
  });
  return false;
}

$('input').on('keydown', function(e) {
  var key = e.which;
  if (key == 27) { // the escape key code
    $select2Obj.select2("close");
    window.close();
  }
});
