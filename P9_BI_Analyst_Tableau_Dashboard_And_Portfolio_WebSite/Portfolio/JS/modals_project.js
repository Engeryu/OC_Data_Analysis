// Liste des URLs des notebooks sur nbviewer pour chaque projet
let notebooks = {
    "8- Python Notebook Real Estate Price Trends Analysis": "https://nbviewer.org/github/Engeryu/Data_Analysis/blob/main/Notebook/Gaspard_Fauvelle_Angel_P8_notebook_062023.ipynb",
    // Ajoutez d'autres projets ici si nécessaire
};

// Fonction pour créer une fenêtre modale
function creerModal(projet) {
    // Création des éléments HTML
    let modal = document.createElement("div");
    modal.className = "modal"; // Ajout de la classe "modal" à la fenêtre modale

    // Vérifiez si l'URL du notebook pour ce projet existe dans l'objet notebooks
    let notebookUrl = notebooks[projet.titre];
    if (notebookUrl) {
        // Si l'URL du notebook existe, ajoutez un iframe
        let iframe = document.createElement("iframe");
        iframe.src = notebookUrl;
        modal.appendChild(iframe);
    } else {
        // Pour les autres projets, utilisez le contenu existant de l'article
        modal.innerHTML = article.innerHTML;
    }

    return modal;
}