

  /***********************************************SUPPRESSION DES ARRIÈRES PLAN DES IMAGES ******************************************/

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
      transparentImage.setAttribute("data-name", image.getAttribute("data-name")); 
      transparentImage.setAttribute("style", "background-color: transparent;"); // Définir le fond transparent
      callback(transparentImage);
    };
    transparentImage.src = transparentImageURL;
    
    
  }


  /*******************************************************FONCTION GLISSER DÉPOSER****************************************************/

  function dragImages() {
    let selectedImage = null;
    let mouseX = 0;
    let mouseY = 0;
    let imageWidth = 150;
    let imageHeight = 150;

    const images = d3.selectAll('.image');

    images.on("mousedown", function(event) {
      if (event.target.classList.contains("image")) {
        selectedImage = event.target;
        mouseX = event.pageX;
        mouseY = event.pageY;
        d3.select(selectedImage)
          .style("cursor", "move")
          .classed("dragged-image", true);
      }
    });
    var imagesDeplacees = {};
    d3.select(document).on("mousemove", function(event) {
      if (selectedImage) {
        if(!imagesDeplacees[selectedImage.src]) {
        var element = selectedImage.parentElement;


        element.style.border = "2px solid red";
        // Créer une nouvelle image pour la copie non déplaçable
        const nonDraggableImage = document.createElement('img');
        nonDraggableImage.classList.add('non-draggable-image');
        // Ajouter la copie non déplaçable de l'image à la div parente
        element.appendChild(nonDraggableImage);
        nonDraggableImage.src = selectedImage.src;
        imagesDeplacees[selectedImage.src] = true;// Définir imageDeplacee à true pour indiquer que l'image a été déplacée
    }
        const dx = event.pageX - mouseX;
        const dy = event.pageY - mouseY;
        const left = parseInt(selectedImage.style.left || "0");
        const top = parseInt(selectedImage.style.top || "0");

        selectedImage.style.left = left + dx + "px";
        selectedImage.style.top = top + dy + "px";
        mouseX = event.pageX;
        mouseY = event.pageY;

        const imageName = selectedImage.getAttribute('data-name');

        // Vérifier si l'image est déplacée à l'intérieur de la div cible (block2)
        if (isInsideBlock2(selectedImage)) {
          const block2 = document.getElementById("block2");
          block2.appendChild(selectedImage);
        }

        imagePositions[imageName] = {
          left: selectedImage.style.left,
          top: selectedImage.style.top
        };
      }
    });

    d3.select(document).on("mouseup", function(event) {
      selectedImage = null;
      savePositions();
    });

    function isInsideBlock2(image) {
      const block2Rect = document.getElementById("block2").getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      return (
        imageRect.left >= block2Rect.left &&
        imageRect.right <= block2Rect.right &&
        imageRect.top >= block2Rect.top &&
        imageRect.bottom <= block2Rect.bottom
      );
    }
  }



  const selectedDirectory = localStorage.getItem("selectedDirectory");

  /************************************************************FONCTION SAVE AS*********************************************************** */

  function saveImagePositions() {
  // Ajouter le nom du dossier sélectionné à l'objet imagePositions
  imagePositions["selectedDirectory"] = selectedDirectory;

  // Convertir l'objet imagePositions en chaîne JSON
  const imagePositionsJSON = JSON.stringify(imagePositions);

  // Demander à l'utilisateur d'entrer un nom pour la sauvegarde
  const saveName = window.prompt("Enter a name for your backup:");
  console.log(saveName)
  // Vérifier que l'utilisateur a entré un nom
  if (saveName !== null) {
    // Créer un nouveau blob avec les données JSON
    const blob = new Blob([imagePositionsJSON], { type: "application/json;charset=utf-8" });

    // Créer un nouvel élément <a> pour le téléchargement du fichier
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = saveName + '.json';

    // Ajouter l'élément <a> à la page et déclencher le téléchargement du fichier
    document.body.appendChild(link);
    link.click();

    // Supprimer l'élément <a> de la page
    document.body.removeChild(link);
  }
}



  /**************************************************************SAVE****************************************************************** */

  function savePositions() {
    const images = document.getElementsByClassName('image');

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const imageName = image.dataset.name;

      // Récupérer les positions par rapport à la div parente
      const leftI = image.offsetLeft + 'px';
      const topI = image.offsetTop + 'px';

      // Vérifier si l'image est dans block2
      const isInBlock2 = image.parentNode.id === "block2";

      // Mettre à jour les coordonnées dans imagePositions
      imagePositions[imageName] = {
        left: leftI,
        top: topI,
        isInBlock2: isInBlock2
      };
    }
  }







  /*************************************************************************AJOUTER UNE IMAGE**************************************************************** */


  function addNewImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', function() {
      const selectedFile = fileInput.files[0];

      if (selectedFile) {
        const img = document.createElement('img');
        const div = document.createElement('div'); // Nouveau div pour l'image
        div.classList.add('image-container');
        img.onload = function() {
          removeBackground(img, function(transparentImage) {
            div.appendChild(transparentImage); // Ajouter l'image avec fond transparent au div

            const imageName = selectedFile.name; // Utiliser le nom du fichier comme nom de l'image

            // Créer un élément de texte pour le nom de l'image
            const imageNameSpan = document.createElement('span');
            imageNameSpan.innerText = imageName; // Ajouter le nom de l'image dans le texte

            // Ajouter le nom de l'image à la div
            div.appendChild(imageNameSpan);

            document.getElementById('images').appendChild(div); // Ajouter le div contenant l'image à la page
            dragImages();
            JPG
            var imageRect = transparentImage.getBoundingClientRect();
            var leftI = imageRect.left + 'px';
            var topI = imageRect.top + 'px';

            imagePositions[imageName] = {
              left: leftI,
              top: topI
            };
          });
        };

        img.src = URL.createObjectURL(selectedFile);
        img.classList.add('image');
      }
    });

    fileInput.click();
  }


  /********************************************************Enregistrer******************************************************************/

  function enregistrer(){

    // Ajouter le nom du dossier sélectionné à l'objet imagePositions
    imagePositions["selectedDirectory"] = selectedDirectory;

    // Convertir l'objet imagePositions en chaîne JSON
    const imagePositionsJSON = JSON.stringify(imagePositions);

      // Demander à l'utilisateur d'entrer un nom pour la sauvegarde

      var selectedFileName = localStorage.getItem('selectedFileName');
  
      console.log('Selected file:', selectedFileName);

      const saveName = selectedFileName;

      // Vérifier que l'utilisateur a entré un nom
      if (saveName !== null) {
        // Créer un nouvel objet Blob avec les données JSON
        const blob = new Blob([imagePositionsJSON], { type: "application/json;charset=utf-8" });

        // Écraser le fichier JSON existant en utilisant la fonction saveAs()
        saveAs(blob, saveName);
  }
    
  }



  /**************************************************************FONCTION DE CAPTURE************************************************************************* */

  function captureImage()  {
    // Sélectionner le div à capturer (block2)
    const elementToCapture = document.getElementById("block2");

    // Utiliser html2canvas pour capturer le contenu du div
    html2canvas(elementToCapture).then(function(canvas) {
      // Créer un élément <a> pour télécharger l'image
      const link = document.createElement('a');
      link.download = 'ma_capture.png';
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }


  let imagePositions = {};
  let imageMatrix = [];



  const selectedJSON = localStorage.getItem('selectedJSON'); // Récupérer le JSON depuis le stockage local

  if (selectedJSON) {
    const data = JSON.parse(selectedJSON); // Convertir le JSON en objet JavaScript
    const selectedDirectory = data.selectedDirectory; 


        //console.log('Contenu du fichier :', contenuFichier);
        console.log('Nom du dossier :', selectedDirectory);

        const nombreObjets = Object.keys(data).length - 1; // Soustraire 1 pour exclure la clé "selectedDirectory"
        console.log('Nombre d\'objets dans le JSON :', nombreObjets);

        if (!data || nombreObjets === 0) {
          console.log("Aucune image trouvée dans le fichier.");
        }

        const imagePositions = data;
        const cles = Object.keys(data).filter(key => key !== 'selectedDirectory');
        console.log('Clés (noms des images) :', cles);

        console.log(imagePositions)


        
        // Parcourir les clés (noms des images) et ajouter chaque image à la page
        for (let i = 0; i < cles.length; i++) {
          const filename = cles[i];

          console.log('Nom de l\'image:', filename); // Afficher le nom de l'image dans la console

          // Vérifier si l'image existe dans le JSON
          if (imagePositions.hasOwnProperty(filename)) {
            const img = new Image();
            img.setAttribute('data-name', filename);
            console.log(img)
            img.onload = function() {
              // Une fois l'image chargée, appeler removeBackground()
              removeBackground(img, function(transparentImage) {
                // Créer une div pour l'image
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('image-container');

              
                imageDiv.appendChild(transparentImage);

                // Créer un élément de texte pour le nom de l'image
                const imageNameSpan = document.createElement('span');
                imageNameSpan.innerText = filename; // Ajouter le nom de l'image dans le texte

                // Ajouter le nom de l'image à la div
                imageDiv.appendChild(imageNameSpan);



                // Initialiser la fonction de glisser-déposer une fois que l'image a été ajoutée à la page
                dragImages();

                // Récupérer les positions de l'image à partir du JSON
                const imagePositionsData = imagePositions[filename];
                const leftI = imagePositionsData.left;
                const topI = imagePositionsData.top;
                const pos=imagePositionsData.isInBlock2;

                // Mettre à jour les positions de l'image dans la div
                imageDiv.style.left = leftI;
                imageDiv.style.top = topI;

                console.log(document.getElementById('block2'))

                // Ajouter la div à la page
                if(pos){
                  //document.body.appendChild(imageDiv);
                  console.log("image dans blok2")
                  document.getElementById('block2').appendChild(imageDiv);

                }
                
                else{
                  console.log("image dans images")
                  document.getElementById('images').appendChild(imageDiv);

                }
                //document.body.appendChild(imageDiv);
              });
            };
            img.src = `../../IMAGES/${selectedDirectory}/${filename}`;// Chemin de l'image
            img.classList.add('image');
          }
        }
      };

          //Récupération des bouttons

      const buttonSave = document.getElementById('save');
      const captureButton=document.getElementById('capture');
      const addImageButton = document.getElementById('add-image');
      const saveAsButton = document.getElementById("saveAs");


      //Appel des fonctions sur les boutons
      //Enregistrer
      buttonSave.addEventListener('click', () => {

        enregistrer();

      });
      //capturer
      captureButton.addEventListener('click', () => {

              console.log("capture effectué")
              captureImage();

      });

      //ajouter une image
      addImageButton.addEventListener('click', function() {

        addNewImage();

      });
      //Enregistrement d'un nouveau fichier

      saveAsButton.addEventListener("click",function(){
        console.log(imagePositions)
        savePositions();
        console.log(imagePositions)
        saveImagePositions();


      });
