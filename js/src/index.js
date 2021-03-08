/**
 * importation des recettes
 */
import recipes from './data/recipes'
/**
 * Importation des données de l'application
 */
import dataApp from './assets/dataApp'
/**
 * importation des functions
 */
import {
    showRecettes,
    updateRecettes,
    changeTags,
    pushOptionsToList,
    updateListsOptions,
} from './assets/functions'
/**
 * importation des factory
 */
import FactoryFilter from './Factories/FactoryFilter'
import FactoryRecette from './Factories/FactoryRecette'

/**
 * instenciation des factory
 */
const factFilter = new FactoryFilter()
const factRecette = new FactoryRecette()
/**
 * Récupération des éléments du DOM
 */
const eltFilters = document.getElementById('filters')
const searchInput = document.getElementById('search')

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
    updateRecettes(dataApp)
    dataApp.ingredients = []
    dataApp.ustensils = []
    dataApp.appareils = []
    updateListsOptions(dataApp)
    dataApp.ingredientsFilter.updateShowBtn(dataApp.ingredients)
    dataApp.appareilsFilter.updateShowBtn(dataApp.appareils)
    dataApp.ustensilesFilter.updateShowBtn(dataApp.ustensils)
}

/**
 * Création du tableau de recettes dans l'appData
 */
recipes.forEach((x) => {
    dataApp.recettes.push(factRecette.CreateElement(x))
})

/**
 * création des listes d'options pour les boutons de filtre
 */
dataApp.recettes.forEach((x) => {
    if (x.ingredientShow) {
        x.ingredients.forEach((elt) => {
            pushOptionsToList('ingredients', elt.ingredient, dataApp)
        })
    }
    if (x.ustensileShow) {
        x.ustensils.forEach((elt) => {
            pushOptionsToList('ustensils', elt, dataApp)
        })
    }
    if (x.appareilShow) {
        if (x.appliance) {
            pushOptionsToList('appareils', x.appliance, dataApp)
        }
    }
})

/**
 * création des boutons de filtre
 */
dataApp.ingredientsFilter = factFilter.CreateElement(
    'Ingrédients',
    dataApp.ingredients,
    'Recherche un ingrédient',
    'primary',
    updateAfterChangeTag
)
dataApp.appareilsFilter = factFilter.CreateElement(
    'Appareil',
    dataApp.appareils,
    'Recherche un appareil',
    'success',
    updateAfterChangeTag
)
dataApp.ustensilesFilter = factFilter.CreateElement(
    'Ustensiles',
    dataApp.ustensils,
    'Recherche un ustensile',
    'danger',
    updateAfterChangeTag
)
eltFilters.append(dataApp.ingredientsFilter.button)
eltFilters.append(dataApp.appareilsFilter.button)
eltFilters.append(dataApp.ustensilesFilter.button)

/**
 * Écouteur sur le champs de recherche
 * @param {Object} e
 */
searchInput.oninput = (e) => {
    const { value } = e.target
    dataApp.search = value
    updateRecettes(dataApp)
}

/**
 * Affichage des recettes
 */
showRecettes(dataApp)
