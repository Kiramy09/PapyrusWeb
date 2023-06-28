const http = require('http');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const port = 8000;

// Chemin vers le fichier index.html
const indexPath = path.join(__dirname, '../Pages', 'index.html');

// Chemin vers le répertoire contenant les fichiers CSS
const cssDirectory = path.join(__dirname, '../Styles');

// Chemin vers le répertoire contenant les fichiers JavaScript
const jsDirectory = path.join(__dirname, '../Scripts');

console.log('cssDirectory:', cssDirectory);
console.log('jsDirectory:', jsDirectory);

// Commande pour ouvrir le fichier index.html
const openCommand = process.platform === 'win32' ? 'start' : 'open';

// Mappage des extensions de fichiers aux types de contenu et aux répertoires correspondants
const fileTypes = {
  '.html': { contentType: 'text/html', directory: '../Pages' },
  '.css': { contentType: 'text/css', directory: '../Styles' },
  '.js': { contentType: 'text/javascript', directory: '../Scripts' },
  '.jpg': { contentType: 'image/jpeg', directory: '../Images' },
  '.jpeg': { contentType: 'image/jpeg', directory: '../Images' },
  '.png': { contentType: 'image/png', directory: '../Images' },
  '.gif': { contentType: 'image/gif', directory: '../Images' },
  // Ajoutez d'autres extensions d'image selon vos besoins
};

// Création du serveur HTTP
const server = http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(__dirname, getFileDirectory(url), url);
  const fileExtension = path.extname(filePath);
  const contentType = getContentType(fileExtension);

  if (contentType.startsWith('text/') || contentType.startsWith('image/')) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error loading ${fileExtension} file`);
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

// Démarrage du serveur sur le port spécifié
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);

  // Ouvre le fichier index.html dans le navigateur par défaut
  exec(`${openCommand} ${indexPath}`);
});

// Fonction pour déterminer le type de contenu en fonction de l'extension du fichier
function getContentType(fileExtension) {
  console.log('fileExtension:', fileExtension);
  return fileTypes[fileExtension] && fileTypes[fileExtension].contentType || 'application/octet-stream';
}

// Fonction pour obtenir le répertoire d'un fichier en fonction de son extension
function getFileDirectory(url) {
  const fileExtension = path.extname(url);
  console.log('fileExtension:', fileExtension);
  return fileTypes[fileExtension] && fileTypes[fileExtension].directory || '../Pages';
}
