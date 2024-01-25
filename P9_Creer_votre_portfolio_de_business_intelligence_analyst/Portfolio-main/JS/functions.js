// Fonction générique pour créer et ajouter un élément avec HTML
function createAndAppendElementWithHTML(tag, innerHTML, parentElement) {
    const element = document.createElement(tag);
    element.innerHTML = innerHTML;
    parentElement.appendChild(element);
}

function getLocalizedContent(lang, contentObj) {
    let title, desc;
    if (lang === 'fr') {
        title = contentObj.title_fr;
        desc = contentObj.desc_fr;
    } else if (lang === 'en') {
        title = contentObj.title_en;
        desc = contentObj.desc_en;
    }
    return { title, desc };
}

function addCollapsibleButtonListeners(titleObj, arrowElement) {
    const buttonCategory = titleObj.category;
    const collapsibleButton = document.getElementById(buttonCategory);
    if (collapsibleButton) {
        const titleElement = document.createElement("h1");  // Ajout de la déclaration de titleElement
        const { title } = getLocalizedContent(lang, titleObj);
        titleElement.textContent = title;

        collapsibleButton.appendChild(arrowElement);
        collapsibleButton.appendChild(titleElement);

        const nextElementSibling = collapsibleButton.nextElementSibling;
        if (nextElementSibling) {
            nextElementSibling.classList.add("hidden");
        }

        collapsibleButton.addEventListener('click', function () {
            title_collapsible.forEach((otherTitleObj) => {
                const otherButtonCategory = otherTitleObj.category;
                if (otherButtonCategory !== buttonCategory) {
                    const otherCollapsibleButton = document.getElementById(otherButtonCategory);
                    const otherNextElementSibling = otherCollapsibleButton.nextElementSibling;
                    if (otherNextElementSibling) {
                        otherNextElementSibling.classList.add("hidden");
                        const otherArrowElement = otherCollapsibleButton.querySelector('.arrowCol');
                        if (otherArrowElement) {
                            otherArrowElement.textContent = "▶";
                        }
                    }
                }
            });

            if (nextElementSibling.classList.contains('hidden')) {
                nextElementSibling.classList.remove('hidden');
                arrowElement.textContent = "▼";
            } else {
                nextElementSibling.classList.add("hidden");
                arrowElement.textContent = "▶";
            }
        });
    }
}

function toggleProjectContent() {
    var ulElement = this.querySelector('ul');
    const arrowElement = this.querySelector('.arrow');
    if (arrowElement.textContent === "▶") {
        document.querySelectorAll('.collapsible_project').forEach(otherButton => {
            const otherUlElement = otherButton.querySelector('ul');
            const otherArrowElement = otherButton.querySelector('.arrow');
            if (otherUlElement !== ulElement) {
                otherUlElement.classList.add("hidden");
                otherArrowElement.textContent = "▶";
            }
        });

        ulElement.classList.remove("hidden");
        arrowElement.textContent = "▼";
    } else {
        ulElement.classList.add("hidden");
        arrowElement.textContent = "▶";
    }
}

function createProjectContent(project) {
    const lang = document.documentElement.lang;
    const { title, desc } = getLocalizedContent(lang, project);

    const buttonElement = document.createElement("button");
    buttonElement.classList.add('collapsible_project'); 

    const arrowElement = document.createElement("span");
    arrowElement.textContent = "▶";
    arrowElement.classList.add('arrow');

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const descElement = document.createElement("ul");
    desc.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        descElement.appendChild(li);
    });
    descElement.classList.add('hidden');

    buttonElement.appendChild(arrowElement);
    buttonElement.appendChild(titleElement);
    buttonElement.appendChild(descElement);

    buttonElement.addEventListener('click', toggleProjectContent);

    return buttonElement;
}