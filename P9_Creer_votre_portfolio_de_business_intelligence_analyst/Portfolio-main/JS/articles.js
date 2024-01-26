const lang = document.documentElement.lang; // Récupère la langue de la balise HTML

// Création d'un objet contenant les titres principaux de la page
const title_page = [
    {
        title_fr: "Mon Portfolio",
        title_en: "My Portfolio"
    }
];

title_page.forEach((titleObj, index) => {
    const titleElement = document.createElement("h2");

    if (lang === 'fr') {
        titleElement.textContent = titleObj.title_fr;
    } else if (lang === 'en') {
        titleElement.textContent = titleObj.title_en;
    }

    // Ajouter le titre à l'élément 'logo'
    const logoElement = document.getElementById("logo");
    if (logoElement) {
        logoElement.appendChild(titleElement);
    }
});

const profil = [
    {
        firstName: "Gaspard-Fauvelle Angel",
        title_job_fr: "Analyste de données",
        title_job_en: "Data Analyst",
        sentence_fr: "En quête d’une opportunité pour mettre en pratique mes <br> compétences nouvellement acquises, je suis activement <br> à la recherche d’un poste de Data Analyst disponible.",
        sentence_en: "In pursuit of an opportunity to put into practice my newly <br> acquired skills, I am actively seeking an available <br> Data Analyst position."
    }
]

// Sélectionnez l'élément dans lequel vous souhaitez injecter le profil
const inject = document.querySelector('body>main>aside>section');

// Créez et ajoutez chaque élément
createAndAppendElementWithHTML('h1', profil[0].firstName, inject);
createAndAppendElementWithHTML('h2', lang === 'fr' ? profil[0].title_job_fr : profil[0].title_job_en, inject);
createAndAppendElementWithHTML('p', lang === 'fr' ? profil[0].sentence_fr : profil[0].sentence_en, inject);

// Création d'un objet contenant les en-têtes de la page
const header = [
    {
        name_fr: "Mes Projets Github",
        name_en: "My Github Projects",
        category: "github",
    },
    {
        name_fr: "Mon Tableau de bord Portfolio",
        name_en: "My Portfolio Dashboard",
        category: "dashboard",
    },
    {
        name_fr: "English version",
        name_en: "Version française",
        category: "mirror",
    }
];

header.forEach((headerObj) => {
    const headerElement = document.createElement("h3");

    if (lang === 'fr') {
        headerElement.textContent = headerObj.name_fr;
    } else if (lang === 'en') {
        headerElement.textContent = headerObj.name_en;
    }

    // Ajouter le titre à l'élément correspondant
    const category = headerObj.category;
    const parentElement = document.getElementById(category);
    if (parentElement) {
        parentElement.appendChild(headerElement);
    }
});

// Création d'un objet contenant les titres de spécialités
const title_projets = [
    {
        title_fr: "Analyse de données: OpenClassrooms",
        title_en: "Data Analysis: OpenClassrooms",
        category: "projets_analyst"
    },
    {
        title_fr: "Développement Web: OpenClassrooms",
        title_en: "Web Developer: OpenClassrooms",
        category: "projets_web"
    },
    {
        title_fr: "Science des données: OpenClassrooms",
        title_en: "Data Science: OpenClassrooms",
        category: "projets_scientist"
    },
    {
        title_fr: "Développement Logiciel",
        title_en: "Software Developer",
        category: "projets_software"
    }
];

title_projets.forEach((projetObj, index) => {
    const projetElement = document.createElement("h1");

    if (lang === 'fr') {
        projetElement.textContent = projetObj.title_fr;
    } else if (lang === 'en') {
        projetElement.textContent = projetObj.title_en;
    }

    const containerElement = document.getElementById(projetObj.category);
    if (containerElement) {
        containerElement.appendChild(projetElement);
    }
});


// Création d'un objet contenant les projets
const projets = [
    {
        title_fr: "1- Visualisation des données via Excel",
        desc_fr: ["Documentation", "Visualisations"],
        title_en: "1- Excel Datasheet Visualizations",
        desc_en: ["Documentation", "Graphics"],
        category: "projets_analyst"
    },
    {
        title_fr: "2- Nettoyage de données d'une assurance via requêtes SQL",
        desc_fr: ["Nettoyage de données", "Pseudonymisation"],
        title_en: "2- SQL Life Insurance Database Cleansing Requests",
        desc_en: ["Data Cleaning", "Pseudonymization"],
        category: "projets_analyst"
    },
    {
        title_fr: "4- Collecte de données d'assurance voiture via requêtes SQL",
        desc_fr: ["scripting", "Pseudonymisation RGPD"],
        title_en: "4- SQL Car Insurance Database Collecting Requests",
        desc_en: ["scripting", "GDPR Pseudonymization"],
        category: "projets_analyst"
    },
    {
        title_fr: "5- Analyse de données d'une chaîne commerciale via requêtes SQL",
        desc_fr: ["scripting", "Vérification des données"],
        title_en: "5- SQL Market Database Analyzis Requests",
        desc_en: ["scripting", "Data Consistency Check"],
        category: "projets_analyst"
    },
    {
        title_fr: "6- Création d'un tableau de bord dynamique via Power BI",
        desc_fr: ["Nettoyage et formatage de données", "Visualisations", "Gestion des droits d'accès"],
        title_en: "6- Power BI Dynamique Dashboard Creation",
        desc_en: ["Database Cleaning/Remodeling", "Visualizations", "Access Right Management"],
        category: "projets_analyst"
    },
    {
        title_fr: "7- Optimisation de la gestion des stocks d'un commerce via Python Notebook",
        desc_fr: ["scripting", "Nettoyage de données", "Analyse Exploratoire"],
        title_en: "7- Python Notebook Market Stock Management Optimization",
        desc_en: ["scripting", "Data Cleaning", "Exploratory Analysis"],
        category: "projets_analyst"
    },
    {
        title_fr: "8- Analyse de l'évolution des prix de l'immobilier via Python Notebook",
        desc_fr: ["scripting", "Nettoyage de données", "Analyse Exploratoire", "Algorithmes de prédiction", "Analyse préscriptive"],
        title_en: "8- Python Notebook Real Estate Price Trends Analysis",
        desc_en: ["scripting", "Data Cleaning", "Exploratory Analysis", "Predictive Algorithmic Forecasting", "Prescriptive Analysis"],
        category: "projets_analyst"
    },
    {
        title_fr: "Indisponible pour le moment",
        desc_fr: [],
        title_en: "Not Available - To Be Annonced",
        desc_en: [],
        category: "projets_scientist"
    },
    {
        title_fr: "1- Transformer une maquette en site web",
        desc_fr: ["Front-End", "Responsive", "HTML/CSS"],
        title_en: "1- Transform a Mockup into a Web Site",
        desc_en: ["Front-End", "Responsive", "HTML/CSS"],
        category: "projets_web"
    },
    {
        title_fr: "2- Dynamiser une page web avec des animations CSS",
        desc_fr: ["CSS", "Responsive", "KeyFrames Animations"],
        title_en: "2- Dynamize a Web Page with CSS Animations",
        desc_en: ["CSS", "Responsive", "KeyFrames Animations"],
        category: "projets_web"
    },
    {
        title_fr: "3- Optimisez un site web existant",
        desc_fr: ["Référencement", "Performance", "Lightouse", "GTMetrix", "Wave"],
        title_en: "Optimize the S.E.O for an Existing Web Site",
        desc_en: ["S.E.O", "Performance", "Lightouse", "GTMetrix", "Wave"],
        category: "projets_web"
    },
    {
        title_fr: "4- Construisez un site e-commerce en JavaScript",
        desc_fr: ["NodeJS", "Back-End", "Scripting"],
        title_en: "4- Build an E-commerce Web Site with JavaScript",
        desc_en: ["NodeJS", "Back-End", "Scripting"],
        category: "projets_web"
    },
    {
        title_fr: "5- Construisez une API sécurisée pour une application d'avis gastronomiques",
        desc_fr: ["CRUD", "Back-End", "Clean Architecture"],
        title_en: "5- Build an API for a Restaurant Review Application",
        desc_en: ["CRUD", "Back-End", "Clean Architecture"],
        category: "projets_web",
    },
    {
        title_fr: "6- Créer une application web de location immobilière avec React",
        desc_fr: ["NodeJS/React", "DOM", "Scripting", "AJAX"],
        title_en: "6- Create a Real Estate Web Application with React",
        desc_en: ["NodeJS/React", "DOM", "Scripting", "AJAX"],
        category: "projets_web",
    },
    {
        title_fr: "1- Java",
        desc_fr: ["Convertisseur CSV/XLSX", "Jeu de rôle en ligne de commandes"],
        title_en: "1- Java",
        desc_en: ["Parser CSV/XLSX", "Terminal command line Role Play Gaming"],
        category: "projets_software"
    },
    {
        title_fr: "2- C Language",
        desc_fr: ["Compilation de programmes", "Printf", "Scanf"],
        title_en: "2- C Language",
        desc_en: ["Compiled Programs", "Printf", "Scanf"],
        category: "projets_software"
    },
    {
        title_fr: "3- BASH",
        desc_fr: ["Jeu Zelda Like en ligne de commande", "Outils d'administation système", "Terminal Command Bash"],
        title_en: "3- BASH",
        desc_en: ["Terminal command line Zelda Like Game", "System Administrator Tools", "Terminal Command Bash"],
        category: "projets_software"
    }
];

// Utiliser la fonction modifiée pour injecter les projets
projets.forEach(projet => {
    const projectContent = createProjectContent(projet);
    const categoryElement = document.getElementById(projet.category);
    categoryElement.appendChild(projectContent);
});


// Création d'un objet contenant les titres de collapsible
const title_collapsible = [
    {
        title_fr: "Mes différents projets",
        title_en: "My latest projects",
        category: "projet_button"
    },
    {
        title_fr: "Mes débuts dans l'informatique",
        title_en: "My early days in computing",
        category: "start_button"
    },
    {
        title_fr: "Mes objectifs professionnels sur le court-terme",
        title_en: "My short-term professional goals",
        category: "proshort_button"
    },
    {
        title_fr: "Mes objectifs professionnels sur le long-terme",
        title_en: "My long-term professional goals",
        category: "prolong_button"
    },
    {
        title_fr: "Mes objectifs personnels",
        title_en: "My personal goals",
        category: "personal_button"
    }
];

title_collapsible.forEach((titleObj) => {
    const titleElement = document.createElement("h1");
    const { title } = getLocalizedContent(lang, titleObj);

    titleElement.textContent = title;

    const arrowElement = document.createElement("span");
    arrowElement.textContent = "▶";
    arrowElement.classList.add('arrowCol');

    addCollapsibleButtonListeners(titleObj, arrowElement);
});

// Création d'un objet contenant les paragraphes
const para = [
    {
        paragraphe_fr: "Je me suis intéressé durant la primaire aux différents matériels informatiques (l'Hardware), pouvoir démonter et remonter un ordinateur, et pouvoir le modifier.<br> À partir du collège, j'ai appris la programmation en HTML5 avec du CSS3 pour créer des sites vitrines.<br> Durant le Lycée, j'ai efféctué une pause dans l'apprentissage de l'informatique en autodidactie.<br> J'ai repris la programmation dans l'ETNA, apprenant à développer, en plus des sites web dont j'avais un certain bagage, des logiciels. Il y'avait aussi de l'administration système sous Linux.<br> \n<br> J'ai finalement rejoins OpenClassrooms, afin de découvrir le monde de la Data Science, allant de la préparation de données à la prédictions de ces dernières, en passant par de l'analyse statistique, inférentielle, et même de la création de tableaux de bords.",
        paragraphe_en: "In primary school, I became interested in hardware, being able to take a computer apart and put it back together again, and being able to modify it.<br> From middle school onwards, I learned HTML5 programming with CSS3 to create showcase sites.<br> During high school, I took a break from self-taught computer training. I took up programming again at ETNA, learning to develop software in addition to the websites I already knew. There was also Linux systems administration.<br> <br> I finally joined OpenClassrooms, to discover the world of Data Science, from data preparation to data prediction, via statistical and inferential analysis, and even the creation of dashboards.",
        category: "starting_IT"
    },
    {
        paragraphe_fr: "Je souhaite pouvoir améliorer mes compétences en Data Science, tout en acquérissant les connaissances avancées en mathématiques.<br> Pouvoir innover dans la création de modèles algorithmiques est mon objectif sur le court-terme.<br> Cela passe par ce que l'on appelle le reverse engineering tout au long de differents projets.",
        paragraphe_en: "I would like to improve my skills in Data Science, while acquiring advanced mathematical knowledge.<br> Being able to innovate in the creation of algorithmic models is my short-term goal.<br> This involves what is known as reverse engineering throughout different projects.",
        category: "short_term"
    },
    {
        paragraphe_fr: "Je souhaite pouvoir faire bénéficier la société de mes compétences, que ce soit sur le plan environnemental, médical, voire social.<br> Envisager d'entreprendre ne sera pas exclu, afin d'exploiter au mieux mes connaissances.<br> Pouvoir en parallèle faire prospérer mon hobby jeu-vidéoludique, et pouvoir y ajouter ma pierre à l'édifice, serait le plus grand honneur.",
        paragraphe_en: "I'd like to be able to give society the benefit of my skills, be they environmental, medical or even social.<br> Considering entrepreneurship won't be out of the question, in order to multiply the use of my knowledge.<br> At the same time, it would be a great honor to be able to make my gaming hobby flourish, and to be able to add my stone to the edifice.",
        category: "long_term"
    },
    {
        paragraphe_fr: "Mon style de jeu favoris, c'est le jeu de rôle se déroulant dans un monde d'aventure, avec des mécaniques de jeux d'actions.<br> Si on assemblait toutes les idées des différents jeux de rôle, dans un jeu, ce serait un jeu quasi parfait dans sa maniabilité, ergonomie. Seulement, si on conserve l'IA des jeux actuels, se basant sur celle d'antan, l'immersion ne serait pas au rendez-vous.<br> <br> Vous connaissez, ou avez déjà entendu parler de Half-Life ? Ce jeu est sorti en 1998, et a littéralement révolutionné la place de l'intelligence artificielle dans les jeux-vidéos.<br> Car les adversaires, des IA, adoptent des stratégies en temps réel en fonction des choix des joueurs, et qui, s'apparenterait à des réactions humaines.<br> Ceux d'aujourd'hui, ne font que l'optimiser dans la forme, sans y mettre plus de moyens, préferant la course aux graphismes malheureusement.<br> <br> Mon objectif final, est de pouvoir créer ce jeu, dont l'IA et la cohérence de l'univers forgerait l'immersion, et dont le reste est une sélection des atouts des différents jeux de rôles.<br> J'y travaille depuis le lycée, ce pourquoi j'avais arrêté d'apprendre la programmation.<br> Pouvoir jouer au jeu de rôle parfait, avec une IA redéfinissant les standards du monde vidéoludique, sera un travail des plus colossaux.",
        paragraphe_en: "My favorite style of game is the role-playing game set in an adventure world, with action game mechanics.<br> If we assembled all the ideas from different role-playing games into one game, it would be almost perfect in its handling and ergonomics. However, if the AI of today's games were based on that of yesteryear, immersion would not be at its best.<br> <br> Do you know, or have you ever heard of Half-Life? This game was released in 1998, and literally revolutionized the use of artificial intelligence in video games.<br> Because the opponents, AIs, adopt strategies in real time based on the choices made by the players, and which, it would seem, are similar to human reactions.<br> Today's games only optimize the form, without putting more resources into it, preferring the race for graphics, unfortunately.<br> <br> My ultimate goal is to be able to create this game, whose AI and coherent universe would forge immersion, and whose rest is a selection of the strengths of different role-playing games.<br> I've been working on it since high school, which is why I stopped learning programming.<br> Being able to play the perfect role-playing game, with an AI redefining the standards of the videogame world, will be a most colossal task.",
        category: "personal"
    }
]


para.forEach((paraObj, index) => {
    const paraElement = document.createElement("p");

    if (lang === 'fr') {
        paraElement.innerHTML = paraObj.paragraphe_fr;
    } else if (lang === 'en') {
        paraElement.innerHTML = paraObj.paragraphe_en;
    }

    // Ajouter le paragraphe à l'élément 'content' correspondant
    const contentElement = document.getElementById(paraObj.category);
    if (contentElement) {
        contentElement.appendChild(paraElement);
    }
});