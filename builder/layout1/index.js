async function loadFile(filePath) {
  const response = await fetch(filePath);
  if (response.status === 200) {
    return await response.text();
  }
  return null;
}

async function createFile() {
  event.preventDefault();

  const fileNameInput = document.getElementById('fileName');
  const fileName = fileNameInput.value || 'default.html';
  const formattedFileName = fileName.endsWith('.html') ? fileName : `${fileName}.html`;

  const elements = [
    'color1', 'color2', 'nav1', 'nav2', 'nav3', 'nav4', 
    'heading1', 'text1', 'heading2', 'text2'
  ];

  const values = elements.reduce((acc, id) => {
    acc[id] = document.getElementById(id).value;
    return acc;
  }, {});

  let fileContent = await loadFile('layout.html');
  const fileType = 'text/html';

  Object.keys(values).forEach(key => {
    fileContent = fileContent.replace(key, values[key]);
  });

  return [fileContent, fileType, formattedFileName];
}

async function downloadFile() {
  event.preventDefault();

  const [fileContent, fileType, fileName] = await createFile();
  const file = new Blob([fileContent], { type: fileType });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = fileName;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

window.addEventListener("DOMContentLoaded", async () => {
  const previewFrame = document.getElementById('preview');
  const previewDocument = previewFrame.contentWindow.document;

  const updatePreview = async () => {
    const [fileContent] = await createFile();
    previewDocument.open();
    previewDocument.write(fileContent);
    previewDocument.close();
  };

  await updatePreview();

  document.getElementById("builder").addEventListener("input", async () => {
    console.log("INPUT");
    await updatePreview();
  });
});
