// Liste des URLs des projets pour chaque type
const projet_content = {
    "notebooks": [
        {
            titre: "8- Python Notebook Real Estate Price Trends Analysis",
            categorie: "projets_analyst",
            link: "https://nbviewer.org/github/Engeryu/Data_Analysis/blob/main/Notebook/Gaspard_Fauvelle_Angel_P8_notebook_062023.ipynb"
        },
        // Ajoutez d'autres notebooks ici si nécessaire
        {
            titre: "1- Excel Datasheet Visualizations",
            categorie: "projets_analyst",
            link: ""
        },
    ],
    "sql": [

    ],
    "graphiques": [
        // Ajoutez vos projets graphiques ici
    ]
};

// Fonction pour créer une fenêtre modale
function creerModal(projet) {
    // Création des éléments HTML
    let overlay = document.createElement("div");
    let modal = document.createElement("div");
    let h2 = document.createElement("h2");
    let iframe = document.createElement("iframe");

    // Ajout du contenu aux éléments
    h2.textContent = projet.titre;
    iframe.src = projet.link;

    // Ajout des éléments à la fenêtre modale
    modal.append(h2, iframe);

    // Ajout de la classe "modal" à l'élément div
    modal.classList.add("modal");
    overlay.classList.add("overlay");

    // Ajout de la fenêtre modale à l'élément de superposition
    overlay.appendChild(modal);

    // Ajout d'un événement onclick à l'élément de superposition pour fermer la fenêtre modale
    overlay.onclick = function() {
        document.body.removeChild(overlay);
    };

    return overlay;
}



// Fonction pour afficher la fenêtre modale correspondante lorsque l'article est cliqué
document.addEventListener('articleClicked', function(e) {
    let projet = e.detail;
    
    // Recherche du projet correspondant dans projet_content
    for (let categorie in projet_content) {
        for (let p of projet_content[categorie]) {
            if (p.titre === projet.titre && p.categorie === projet.categorie) {
                // Création et affichage de la fenêtre modale
                let overlay = creerModal(p);
                document.body.appendChild(overlay);
                return;  // Arrête la boucle dès qu'un match est trouvé
            }
        }
        break;
    }
});



