function removeBackground(image, callback) {
  // Créer un élément canvas
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  // Dessiner l'image sur le canvas
  var context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  // Récupérer les pixels de l'image
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var pixels = imageData.data;

  // Parcourir tous les pixels et remplacer les pixels d'arrière-plan par des pixels transparents
  for (let i = 0, len = pixels.length; i < len; i += 4) {
    var red = pixels[i];
    var green = pixels[i + 1];
    var blue = pixels[i + 2];

    // Si le pixel est d'arrière-plan (défini par des valeurs de rouge, vert et bleu inférieures à 50)
    if (red < 50 && green < 50 && blue < 50) {
      pixels[i + 3] = 0; // Rendre le pixel transparent
    }
  }

  // Remettre les pixels modifiés sur le canvas
  context.putImageData(imageData, 0, 0);

  // Obtenir l'URL de l'image avec fond transparent
  var transparentImageURL = canvas.toDataURL("image/png");

  // Créer une nouvelle image avec l'URL de l'image avec fond transparent
  var transparentImage = new Image();
  transparentImage.onload = function() {
    transparentImage.classList.add('image'); // Ajouter la classe "image"
    transparentImage.setAttribute("style", "background-color: transparent;"); // Définir le fond transparent
    callback(transparentImage);
  };
  transparentImage.src = transparentImageURL;
}



function getImagePosition(image) {
  // Récupérer les valeurs de `left` et `top` de l'image
  var left = image.style.left;
  var top = image.style.top;

  // Afficher les coordonnées de position de l'image
  console.log("Position de l'image : left =", left, ", top =", top);
}


function dragImages() {
  let imagePositions = {};
  let lastSauvegarde = {};
  let selectedImage = null;
  let mouseX = 0;
  let mouseY = 0;
  let imageWidth = 150;
  let imageHeight = 150;

  d3.select(document).on("mousedown", function(event) {
    if (event.target.classList.contains("image")) {
      selectedImage = event.target;
      mouseX = event.pageX;
      mouseY = event.pageY;
      d3.select(selectedImage)
        .style("cursor", "move")
        .classed("dragged-image", true); // Ajouter la classe "dragged-image"
    }
  });

  d3.select(document).on("mousemove", function(event) {
    if (selectedImage) {
      let dx = event.pageX - mouseX;
      let dy = event.pageY - mouseY;
      let left = parseInt(selectedImage.style.left || "0");
      let top = parseInt(selectedImage.style.top || "0");

      // Vérifiez si l'image est déplacée sur la div #block2
      if (selectedImage.parentNode.id === "block2") {
        // Ajoutez les coordonnées de position relatives de la div #block2 au déplacement
        const block2Rect = document.getElementById("block2").getBoundingClientRect();
        dx -= block2Rect.left;
        dy -= block2Rect.top;
      }

      selectedImage.style.left = left + dx + "px";
      selectedImage.style.top = top + dy + "px";
      mouseX = event.pageX;
      mouseY = event.pageY;
      let imageName = selectedImage.src.split('/').pop();
      imagePositions[imageName] = {
        left: selectedImage.style.left,
        top: selectedImage.style.top
      };
    }
  });

  d3.select(document).on("mouseup", function(event) {
    selectedImage = null;
    //d3.selectAll(".dragged-image").classed("dragged-image", false); // Supprimer la classe "dragged-image"
  });

  let images = d3.selectAll('.image');

  images.each(function(imageData, index) {
    let image = d3.select(this);

    image.on("mousedown", function(d, i) {
      d3.select(this)
        .style("opacity", null)
        .style("cursor", "move")
        .classed("dragged-image", true); // Ajouter la classe "dragged-image"
      selectedImage = this;
      if (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
      }
      getImagePosition(this);
    });
  });
}







document.addEventListener("DOMContentLoaded", function() {


  const selectedImages = JSON.parse(sessionStorage.getItem("selectedImages"));
  const selectedDirectory = localStorage.getItem("selectedDirectory");
  console.log(selectedDirectory);// Affiche le nom du dossier dans la console
  let imageMatrix;
  if (!selectedImages || selectedImages.length === 0) {
    alert("Aucune image sélectionnée.");
    window.location.href = "selectionner.html";
  } else {
    imageMatrix = selectedImages.map(image => image.name);
    console.log(imageMatrix);
  }

  // Parcourir la matrice et ajouter chaque image à la page
  for (let i = 0; i < imageMatrix.length; i++) {
    const filename = imageMatrix[i];
    const img = document.createElement('img');
    img.onload = function() {
      // Une fois l'image chargée, appeler removeBackground()
      removeBackground(img, function(transparentImage) {
        // Ajouter l'image avec fond transparent à la page
        document.getElementById('images').appendChild(transparentImage);

        // Initialiser la fonction de glisser-déposer une fois que l'image a été ajoutée à la page
        dragImages();
      });

    };
    img.src = `${selectedDirectory}/${filename}`; // Chemin de l'image
    img.classList.add('image');
  }

  
    function captureImage2() {

        // Sélectionne le div à capturer
        const elementToCapture = document.querySelector("#block2");

        // Utilise html2canvas pour capturer le contenu du div
        html2canvas(elementToCapture).then(function(canvas) {

          // Crée un élément <a> pour télécharger l'image
          const link = document.createElement('a');
          link.download = 'ma_capture.png';
          link.href = canvas.toDataURL("image/png");
          link.click();
          
        });
    }

    function savePositions() {

      // Boucle à travers chaque image et stocke sa position actuelle
      d3.selectAll('.image').each(function(d) {
        let imageName = this.src.split('/').pop(); // Récupère le nom de l'image
        let left = this.style.left;
        let top = this.style.top;
        lastSauvegarde[imageName] = {
          left: left,
          top: top
        };
      });
    }
      const buttonSave = document.getElementById('save');
      const captureButton=document.getElementById('capture');


      buttonSave.addEventListener('click', () => {
        savePositions();
      });

      captureButton.addEventListener('click', () => {

        console.log("capture effectué")
        captureImage2();
      });

  // Sélectionnez le bouton "Sauvegarder cette page"
const savePageButton = document.getElementById('savePage');

// Ajoutez un écouteur d'événements "click" au bouton
savePageButton.addEventListener('click', function() {
  // Demandez à l'utilisateur d'entrer un nom pour la sauvegarde
  const saveName = window.prompt('Entrez un nom pour votre sauvegarde :');

  // Vérifiez que l'utilisateur a entré un nom
  if (saveName !== null) {
    // Sauvegardez la position de chaque image dans un objet JSON
    const imagePositionsJSON = JSON.stringify(imagePositions);

    // Enregistrez la sauvegarde dans localStorage sous la clé "saveName"
    localStorage.setItem(saveName, imagePositionsJSON);
    console.log(imagePositionsJSON)
  }
});

//Ajouter une nouvelle image:  
// Récupère l'élément de bouton "Ajouter une image"
const addImageButton = document.getElementById('add-image');

// Ajoute un écouteur d'événement pour le clic sur le bouton "Ajouter une image"
addImageButton.addEventListener('click', function() {
  // Appelle la fonction pour ajouter une nouvelle image à la matrice
  addNewImage();
});

function addNewImage() {
  // Créez un nouvel élément <input> de type "file"
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  // Ajoutez un écouteur d'événement pour le changement de fichier
  fileInput.addEventListener('change', function() {
    // Récupère le fichier sélectionné par l'utilisateur
    const selectedFile = fileInput.files[0];

    // Vérifiez que l'utilisateur a sélectionné un fichier
    if (selectedFile) {
      // Créez un nouvel élément <img> pour afficher l'image
      const img = document.createElement('img');
      img.onload = function() {
        // Une fois l'image chargée, appeler removeBackground()
        removeBackground(img, function(transparentImage) {
          // Supprimer le fond de l'élément "block2" avant d'ajouter l'image
          d3.select("#block2").style("background-image", "none");

          // Ajoutez l'image à la page
          document.getElementById('images').appendChild(transparentImage);

          // Initialiser la fonction de glisser-déposer une fois que l'image a été ajoutée à la page
          dragImages();
        });
      };
      img.src = URL.createObjectURL(selectedFile); // Chargez l'image à partir du fichier
    }
  });

  // Déclenchez le clic sur l'élément <input> pour permettre à l'utilisateur de sélectionner un fichier
  fileInput.click();
}


  console.log(imageMatrix);

});
