/**
 * Affiche ou non une recette
 * @param {Oject} param0 une recette provenant de dataApp.recettes
 * @returns {Boolean} True pour afficher une recette
 */
const authorize = ({
    appareilShow,
    ingredientShow,
    ustensileShow,
    searchShow,
}) => {
    if (appareilShow && ingredientShow && ustensileShow && searchShow) {
        return true
    }
    return false
}

/**
 * Affiche les recettes dans le Dom
 * @param {Object} dataApp les données de l'app
 */
const showRecettes = (dataApp) => {
    const content = document.querySelector('.listcards')
    content.innerHTML = ''
    dataApp.recettes.forEach((x) => {
        if (authorize(x)) {
            content.append(x.html)
        }
    })
}

/**
 * Vérifie les recette à afficher en fonction des tags ingredients
 * @param {Object} dataApp les données de l'app
 */
const verifIngredients = (dataApp) => {
    const { recettes, ingredientsSelected } = dataApp
    recettes.forEach((rec, i) => {
        let verif = true
        ingredientsSelected.forEach((val) => {
            if (rec.ingredients.findIndex((x) => x.ingredient === val) === -1) {
                verif = false
            }
        })
        recettes[i].ingredientShow = verif
    })
}

/**
 * Vérifie les recette à afficher en fonction des tags ustensiles
 * @param {Object} dataApp les données de l'app
 */
const verifUnstensils = (dataApp) => {
    const { recettes, ustensilsSelected } = dataApp
    recettes.forEach((rec, i) => {
        let verif = true
        ustensilsSelected.forEach((val) => {
            if (rec.ustensils.findIndex((x) => x === val) === -1) {
                verif = false
            }
        })
        recettes[i].ustensileShow = verif
    })
}

/**
 * Vérifie les recette à afficher en fonction des tags appareils
 * @param {Object} dataApp les données de l'app
 */
const verifAppareils = (dataApp) => {
    const { recettes, appareilsSelected } = dataApp
    recettes.forEach((rec, i) => {
        let verif = true
        appareilsSelected.forEach((val) => {
            if (val !== rec.appliance) {
                verif = false
            }
        })
        recettes[i].appareilShow = verif
    })
}

/**
 * Vérifie les recette à afficher en fonction du champ recherche
 * @param {Object} dataApp les données de l'app
 */
const verifSearch = (dataApp) => {
    const { recettes, search } = dataApp
    recettes.forEach((rec, i) => {
        let verif = false
        if (rec.name.toLowerCase().includes(search)) {
            verif = true
        }
        if (rec.description.toLowerCase().includes(search)) {
            verif = true
        }
        rec.ingredients.forEach((ing) => {
            if (
                ing.ingredient
                    .toLowerCase()
                    .includes(dataApp.search.toLowerCase())
            ) {
                verif = true
            }
        })
        recettes[i].searchShow = verif
    })
}

/**
 * Mets à jours l'application
 * @param {Object} dataApp les données de l'app
 */
const updateRecettes = (dataApp) => {
    verifIngredients(dataApp)
    verifUnstensils(dataApp)
    verifAppareils(dataApp)
    verifSearch(dataApp)
    showRecettes(dataApp)
}

/**
 * ajoute ou supprime les tags sélectionnés
 * @param {Array} selected les tags selectionnés
 * @param {String} tagName le nom du tag
 * @param {Boolean} show dois je l'afficher
 */
const changeTags = (selected, tagName, show) => {
    if (show) {
        selected.push(tagName)
    } else {
        const i = selected.findIndex((x) => x.includes(tagName))
        selected.splice(i, 1)
    }
}

/**
 * Ajoute l'option dans la liste d'option accessible à l'utilisateur
 * @param {String} type le nom du type de filtre
 * @param {String} val le nom du tag
 * @param {Object} dataApp les données de l'app
 */
const pushOptionsToList = (type, val, dataApp) => {
    const selectedName = `${type}Selected`
    if (
        // S'il n'est pas déjà inclus dans la liste
        !dataApp[type].includes(val) &&
        // et s'il n'est pas dans la liste des tags sélectionné
        dataApp[selectedName].findIndex((x) => x === val) === -1
        // alors je l'ajoute
    ) {
        dataApp[type].push(val)
    }
}

/**
 * mettre à jour la liste des options des filtre
 * @param {Object} dataApp les données de l'app
 */
const updateListsOptions = (dataApp) => {
    const { recettes } = dataApp
    recettes.forEach((x) => {
        if (authorize(x)) {
            x.ingredients.forEach((elt) => {
                pushOptionsToList('ingredients', elt.ingredient, dataApp)
            })
        }
        if (authorize(x)) {
            x.ustensils.forEach((elt) => {
                pushOptionsToList('ustensils', elt, dataApp)
            })
        }
        if (authorize(x)) {
            if (x.appliance) {
                pushOptionsToList('appareils', x.appliance, dataApp)
            }
        }
    })
}

export {
    showRecettes,
    authorize,
    updateRecettes,
    changeTags,
    pushOptionsToList,
    updateListsOptions,
}
