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
    updateListsOptions,
    setListsOptions,
    createFilter,
} from './assets/functions'
/**
 * importation des factory
 */
import FactoryFilter from './Factories/FactoryFilter'
import FactoryRecette from './Factories/FactoryRecette'

// INITIALISATION DE L'APP

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
 * Écouteur sur le champs de recherche
 * @param {Object} e
 */
searchInput.oninput = (e) => {
    const { value } = e.target
    dataApp.search = value
    updateRecettes(dataApp)
    dataApp.ingredients = []
    dataApp.appareils = []
    dataApp.ustensils = []
    setListsOptions(dataApp)
    updateListsOptions(dataApp)
}

/**
 * Création du tableau de recettes dans l'appData
 */
recipes.forEach((x) => {
    dataApp.recettes.push(factRecette.CreateElement(x))
})

/**
 * Affichage des recettes
 */
setListsOptions(dataApp)
createFilter(factFilter, eltFilters)
showRecettes(dataApp)
