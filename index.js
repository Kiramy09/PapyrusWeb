
function goToPage() {
    var selectBox = document.getElementById("previous");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    window.location.href = selectedValue;
    console.log("c'est fait")
    return false;
}

//SUPPRESSION ARRIÈRE PLAN DES IMAGES DANS UN DOSSIER

/*
function removeBackgroundFromFolder(folderPath) {
    //Récupérer toutes les images dans le dossier
    let images = document.querySelectorAll(`#${folderPath} img`);
    images.forEach(function(image) {
      // Créer une toile (canvas)
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
  
      // Récupérer le contexte du canvas
      let context = canvas.getContext("2d");
  
      // Dessiner l'image sur le canvas en utilisant un mode de composition qui supprime l'arrière-plan
      context.globalCompositeOperation = "destination-out";
      context.drawImage(image, 0, 0);
  
      // Obtenir l'URL de l'image avec fond transparent
      let transparentImageURL = canvas.toDataURL("image/png");
  
      // Créer une nouvelle image avec l'URL de l'image avec fond transparent
      let transparentImage = new Image();
      transparentImage.onload = function() {
        transparentImage.classList.add('image'); // Ajouter la classe "image"
        transparentImage.setAttribute("style", "background-color: transparent;"); // Définir le fond transparent
        image.parentNode.replaceChild(transparentImage, image); // Remplacer l'image originale par l'image avec fond transparent
        console.log("c'est fait")
      };
      transparentImage.src = transparentImageURL;
    });
  }
 
  removeBackgroundFromFolder("C:/var/www/html/STAGE/ImagesPapyrus");
  */