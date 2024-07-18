function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function createAndDownloadFile() {

    event.preventDefault();

    var fileName = document.getElementById('fileName').value;
    var fileContent = document.getElementById('fileContent').value;
    var fileType = 'text/html';

    if (!fileName.endsWith('.html')) {
        fileName += '.html';
    }

    var file = new Blob([fileContent], {type: fileType});

    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = fileName || 'default.html';

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
}