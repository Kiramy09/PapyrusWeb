const http = require('http');
const path = require('path');
const { exec } = require('child_process');

const port = 7000; 

// Chemin vers les fichiers index.html, CSS et JS
const imagesDirPath = path.join(__dirname, '../..', 'IMAGES');


const indexPath = path.join(__dirname, '../Pages', 'index.html');
const indexCSSPath = path.join(__dirname, '../Styles', 'index.css');
const indexJSPath = path.join(__dirname, '../Scripts', 'index.js');

const selectionnerPath = path.join(__dirname, '../Pages', 'selectionner.html');
const selectionnerCSSPath = path.join(__dirname, '../Styles', 'selectionner.css');
const selectionnerJSPath = path.join(__dirname, '../Scripts', 'selectionner.js');

const revenirPath = path.join(__dirname, '../Pages', 'revenir.html');
const revenirCSSPath = path.join(__dirname, '../Styles', 'revenir.css');

const nouveauPath = path.join(__dirname, '../Pages', 'nouveau.html');
const nouveauCSSPath = path.join(__dirname, '../Styles', 'mat.css');
const nouveauJSPath = path.join(__dirname, '../Scripts', 'nouveau.js');

const ouvrirPath = path.join(__dirname, '../Pages', 'ouvrir.html');
const ouvrirCSSPath = path.join(__dirname, '../Styles', 'ouvrir.css');
const ouvrirJSPath = path.join(__dirname, '../Scripts', 'ouvrir.js');

// Commande pour ouvrir le fichier index.html
const openCommand = process.platform === 'win32' ? 'start' : 'open';

// Création du serveur HTTP
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading index.html');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/Styles/index.css') {
    fs.readFile(indexCSSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading index.css');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/Scripts/index.js') {
    fs.readFile(indexJSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading index.js');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/selectionner.html') {
    fs.readFile(selectionnerPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading selectionner.html');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/Styles/selectionner.css') {
    fs.readFile(selectionnerCSSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading selectionner.css');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/Scripts/selectionner.js') {
    fs.readFile(selectionnerJSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading selectionner.js');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/revenir.html') {
    fs.readFile(revenirPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading revenir.html');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/Styles/revenir.css') {
    fs.readFile(revenirCSSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading revenir.css');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/nouveau.html') {
    fs.readFile(nouveauPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading nouveau.html');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }else if (req.url === '/Scripts/nouveau.js') {
    fs.readFile(nouveauJSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading nouveau.js');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  }  else if (req.url === '/Styles/mat.css') {
    fs.readFile(nouveauCSSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading mat.css');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  } else if (req.url === '/ouvrir.html') {
    fs.readFile(ouvrirPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading ouvrir.html');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  } else if (req.url === '/Scripts/ouvrir.js') {
    fs.readFile(ouvrirJSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading ouvrir.js');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/javascript');
        res.end(data);
      }
    });
  } else if (req.url === '/Styles/ouvrir.css') {
    fs.readFile(ouvrirCSSPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading ouvrir.css');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      }
    });
  }else if (req.url.startsWith('/IMAGES/')) {
    const imageRelativePath = req.url.substring('/IMAGES/'.length);
    const imagePath = path.join(imagesDirPath, imageRelativePath);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('Image not found');
      } else {
        const ext = path.extname(imagePath).toLowerCase();
        let contentType = 'image/jpeg'; // Par défaut, le type MIME comme image/jpeg pour les extensions jpg/jpeg

        if (ext === '.png') {
          contentType = 'image/png';
        } else if (ext === '.gif') {
          contentType = 'image/gif';
        }

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
