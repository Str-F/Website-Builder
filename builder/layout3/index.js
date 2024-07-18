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
    var color1 = document.getElementById('color1').value;
    var color2 = document.getElementById('color2').value;
    var nav1 = document.getElementById('nav1').value;
    var nav2 = document.getElementById('nav2').value;
    var nav3 = document.getElementById('nav3').value;
    var nav4 = document.getElementById('nav4').value;
    var heading1 = document.getElementById('heading1').value;
    var text1 = document.getElementById('text1').value;
    var heading2 = document.getElementById('heading2').value;
    var text2 = document.getElementById('text2').value;

    var fileContent = loadFile('layout.html')
    var fileType = 'text/html';

    var fileContent = fileContent.replace('color1', color1)
    var fileContent = fileContent.replace('color2', color2)
    var fileContent = fileContent.replace('nav1', nav1)
    var fileContent = fileContent.replace('nav2', nav2)
    var fileContent = fileContent.replace('nav3', nav3)
    var fileContent = fileContent.replace('nav4', nav4)
    var fileContent = fileContent.replace('heading1', heading1)
    var fileContent = fileContent.replace('text1', text1)
    var fileContent = fileContent.replace('heading2', heading2)
    var fileContent = fileContent.replace('text2', text2)

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