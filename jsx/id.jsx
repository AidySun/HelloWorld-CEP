function addDocument() {
	alert("open");
	application.documents.add();
}

function btnSelected() {
	if (navigator.onLine === true) {
		alert("online");
	} else {
		alert("offline");
	}
}

function test() {
	var doc = app.activeDocument;
	var frames = doc.textFrames;
	
	for (var i =0; i < frames.length; i++) {
		alert(frames[i].name);
		
	}
}

function loadGoogle() {
	window.location.href = "https://www.google.com";
}

/*
function csinterfaceFun() {
	var cs = new CSInterface();
	cs.addEventListener(“documentCreated”, function(event) {
		alert(’Cool!’ + event.data);
	});

	var extendScript = ’app.document.add(); var event=new Object(); event.type=”documentCreated”; event.data=”blahblah”; dispatchCSXSEvent(event);’ //you can have this code in the .jsx file instead
	cs.evalScript(extendScript);
}
*/