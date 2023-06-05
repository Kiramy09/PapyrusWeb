window.selectedImages = [];

function createObjectURLs(files) {
  let objectURLs = [];
  for (let i = 0; i < files.length; i++) {
    const objectURL = URL.createObjectURL(files[i]);
    objectURLs.push(objectURL);
  }
  return objectURLs;
}

function loadImages() {
  // Récupérer les fichiers du dossier sélectionné
  const files = document.getElementById("file-input").files;
  
  // Vérifier que des fichiers ont été sélectionnés
  if (files.length === 0) {
    alert("Veuillez sélectionner un dossier contenant des images.");
    return;
  }

  // Récupérer le nombre d'images à sélectionner
  const count = parseInt(document.getElementById("count-input").value);

  // Vérifier que le nombre est valide
  if (isNaN(count) || count <= 0 || count > files.length) {
    alert("Veuillez saisir un nombre valide d'images à sélectionner.");
    return;
  }

  // Sélectionner des images aléatoirement
  const selectedFiles = [];
  while (selectedFiles.length < count) {
    const index = Math.floor(Math.random() * files.length);
    const file = files[index];
    if (!selectedFiles.includes(file)) {
      selectedFiles.push(file);
    }
  }

  // Créer des objets URL et des images pour chaque image sélectionnée
  const objectURLs = createObjectURLs(selectedFiles);
  const images = selectedFiles.map((file, index) => {
    return {
      name: file.name,
      url: objectURLs[index],
      image: new Image()
    };
  });


  // Charger les images
let loadedImages = 0;
images.forEach((image, index) => {
  image.image.onload = () => {
    loadedImages++;
    if (loadedImages === images.length) {
      // Toutes les images ont été chargées
      window.selectedImages = images;
      // Enregistrer les données dans le stockage local

      sessionStorage.setItem("selectedImages", JSON.stringify(window.selectedImages));
      console.log(selectedImages); 

      // Ouvrir une nouvelle page pour afficher les images sélectionnées



      preview.innerHTML = "";
      images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.name;
        preview.appendChild(imgElement);
      });
console.log(selectedImages)

      window.location.href = "nouveau.html";
    }
  };
  image.image.src = image.url;
});

}
//const fileInput = document.getElementById("file-input");
//const selectedDirectory = fileInput.files[0].webkitRelativePath.split('/')[0];
//console.log(selectedDirectory); // affiche le nom du dossier sélectionné dans la console

const fileInput = document.getElementById("file-input")
console.log(fileInput)
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    const selectedDirectory = fileInput.files[0].webkitRelativePath.split('/')[0];
    console.log(selectedDirectory); // Affiche le nom du dossier sélectionné dans la console
  }
});
