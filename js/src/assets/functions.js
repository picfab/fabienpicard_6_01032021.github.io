import dataApp from './dataApp'
/**
 * Affiche ou non une recette
 * @param {Oject} param0 une recette provenant de dataApp.recettes
 * @returns {Boolean} True pour afficher une recette
 */
const authorize = ({
    showAppareil,
    showIngredient,
    showUstensil,
    showSearch,
}) => {
    if (showAppareil && showIngredient && showUstensil && showSearch) {
        return true
    }
    return false
}

/**
 * Affiche les recettes dans le Dom
 */
const showRecettes = () => {
    const { recettes } = dataApp
    const content = document.querySelector('.listcards')
    content.innerHTML = ''
    let valid = false
    recettes.forEach((x) => {
        if (authorize(x)) {
            valid = true
            content.append(x.html)
        }
    })
    if (valid === false) {
        const message = document.createElement('div')
        message.classList.add('alert', 'alert-warning')
        message.role = 'alert'
        message.textContent =
            'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.'
        content.append(message)
    }
}

/**
 * Vérifie les recette à afficher en fonction des tags ingredients
 */
const verifIngredients = () => {
    const { recettes, ingredientsSelected } = dataApp
    recettes.forEach((rec, i) => {
        let verif = true
        ingredientsSelected.forEach((val) => {
            if (
                rec.ingredients.findIndex(
                    (x) => x.ingredient.toLowerCase() === val
                ) === -1
            ) {
                verif = false
            }
        })
        recettes[i].showIngredient = verif
    })
}

/**
 * Vérifie les recette à afficher en fonction des tags ustensiles
 */
const verifUnstensils = () => {
    const { recettes, ustensilsSelected } = dataApp
    recettes.forEach((rec, i) => {
        let verif = true
        ustensilsSelected.forEach((val) => {
            if (
                rec.ustensils.findIndex((x) => x.toLowerCase() === val) === -1
            ) {
                verif = false
            }
        })
        recettes[i].showUstensil = verif
    })
}

/**
 * Vérifie les recette à afficher en fonction des tags appareils
 */
const verifAppareils = () => {
    const { recettes, appareilsSelected } = dataApp
    recettes.forEach((rec, i) => {
        let verif = true
        appareilsSelected.forEach((val) => {
            if (val !== rec.appliance.toLowerCase()) {
                verif = false
            }
        })
        recettes[i].showAppareil = verif
    })
}

/**
 * Vérifie les recettes à afficher en fonction du champ recherche
 */
const verifSearch = () => {
    const { recettes, search, recettesForSearch } = dataApp
    let newSearch = search
    if (search.length < 3) {
        newSearch = ''
    }
    recettesForSearch.forEach((rec, i) => {
        recettes[i].showSearch = rec.includes(newSearch.toLocaleLowerCase())
    })
}

/**
 * Mets à jours l'application
 */
const updateRecettes = () => {
    verifIngredients()
    verifUnstensils()
    verifAppareils()
    verifSearch()
    showRecettes()
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
 * Ajoute l'option dans la liste d'options accessible à l'utilisateur
 * @param {String} type le nom du type de filtre
 * @param {String} val le nom du tag
 */
const pushOptionsToList = (type, val) => {
    const selectedName = `${type}Selected`
    const newVal = val.toLowerCase()
    if (
        // S'il n'est pas déjà inclus dans la liste
        !dataApp[type].includes(newVal) &&
        // et s'il n'est pas dans la liste des tags sélectionné
        dataApp[selectedName].findIndex((x) => x === newVal) === -1
        // alors je l'ajoute
    ) {
        dataApp[type].push(newVal)
    }
}

/**
 * mettre à jour la liste des options des filtre
 */
const updateListsOptions = () => {
    const { recettes } = dataApp
    recettes.forEach((x) => {
        if (authorize(x)) {
            x.ingredients.forEach((elt) => {
                pushOptionsToList('ingredients', elt.ingredient)
            })
        }
        if (authorize(x)) {
            x.ustensils.forEach((elt) => {
                pushOptionsToList('ustensils', elt)
            })
        }
        if (authorize(x)) {
            if (x.appliance) {
                pushOptionsToList('appareils', x.appliance)
            }
        }
    })

    dataApp.ingredientsFilter.updateShowBtn(dataApp.ingredients)
    dataApp.appareilsFilter.updateShowBtn(dataApp.appareils)
    dataApp.ustensilesFilter.updateShowBtn(dataApp.ustensils)
}

/**
 * Mettre la première lettre en majuscule
 * @param {String} text
 * @returns String
 */
const maj = (text) => text[0].toUpperCase() + text.substring(1)

/**
 * création des listes d'options pour les boutons de filtre
 */
const setListsOptions = () => {
    dataApp.recettes.forEach((x) => {
        if (x.showIngredient && x.showSearch) {
            x.ingredients.forEach((elt) => {
                pushOptionsToList('ingredients', elt.ingredient)
            })
        }
        if (x.showUstensil && x.showSearch) {
            x.ustensils.forEach((elt) => {
                pushOptionsToList('ustensils', elt)
            })
        }
        if (x.showAppareil && x.showSearch) {
            if (x.appliance) {
                pushOptionsToList('appareils', x.appliance)
            }
        }
    })
}

/**
 * function à importer dans le constructeur
 * lors de la création d'un bouton de filtre afin de traiter
 * l'ajout et la suppression de tags
 * @param {String} type nom du filtre
 * @param {String} search nom du tag
 * @param {Boolean} show ajout de tag ou suppression
 */
function updateAfterChangeTag(type, search, show) {
    switch (type) {
        case 'Ingrédients':
            changeTags(dataApp.ingredientsSelected, search, show)
            break
        case 'Ustensiles':
            changeTags(dataApp.ustensilsSelected, search, show)
            break
        case 'Appareil':
            changeTags(dataApp.appareilsSelected, search, show)
            break
        default:
            break
    }
    updateRecettes()
    dataApp.ingredients = []
    dataApp.ustensils = []
    dataApp.appareils = []
    updateListsOptions()
}

/**
 * création des boutons de filtre
 */
const createFilter = (factFilter, eltFilters) => {
    dataApp.ingredientsFilter = factFilter.CreateElement(
        'Ingrédients',
        dataApp.ingredients.sort(),
        'Recherche un ingrédient',
        'primary',
        updateAfterChangeTag
    )
    dataApp.appareilsFilter = factFilter.CreateElement(
        'Appareil',
        dataApp.appareils.sort(),
        'Recherche un appareil',
        'success',
        updateAfterChangeTag
    )
    dataApp.ustensilesFilter = factFilter.CreateElement(
        'Ustensiles',
        dataApp.ustensils.sort(),
        'Recherche un ustensile',
        'danger',
        updateAfterChangeTag
    )
    eltFilters.append(dataApp.ingredientsFilter.button)
    eltFilters.append(dataApp.appareilsFilter.button)
    eltFilters.append(dataApp.ustensilesFilter.button)
}

/**
 * Création du tableau de recettes pour la recette
 */
const setRecetteForSearch = (recette, data) => {
    let ingredientsString = ''
    recette.ingredients.forEach((ing, i) => {
        const next = recette.ingredients.length > i ? ' ' : ''
        ingredientsString += `${ing.ingredient} ${next}`
    })
    data.recettesForSearch.push(
        `${recette.name.toLowerCase()} ${recette.description.toLowerCase()} ${ingredientsString.toLowerCase()}`
    )
}
export {
    showRecettes,
    authorize,
    updateRecettes,
    changeTags,
    pushOptionsToList,
    updateListsOptions,
    maj,
    setListsOptions,
    updateAfterChangeTag,
    createFilter,
    setRecetteForSearch
}
