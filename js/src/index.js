import recipes from './data/recipes'
import FactoryFilter from './Factories/FactoryFilter'
import FactoryRecette from './Factories/FactoryRecette'

const factFilter = new FactoryFilter()
const factRecette = new FactoryRecette()
const eltFilters = document.getElementById('filters')
const ingredients = []
const ustensils = []
const appareils = []
const recettes = []
recipes.forEach((x) => {
    recettes.push(factRecette.CreateElement(x))
    x.ingredients.forEach((elt) => {
        const name = elt.ingredient.toLowerCase()
        if (!ingredients.includes(name)) {
            ingredients.push(name)
        }
    })
    x.ustensils.forEach((elt) => {
        const name = elt.toLowerCase()
        if (!ustensils.includes(name)) {
            ustensils.push(name)
        }
    })
    if (x.appliance) {
        const name = x.appliance.toLowerCase()
        if (!appareils.includes(name)) {
            appareils.push(name)
        }
    }
})
const ingrediantsFilter = factFilter.CreateElement(
    'Ingrédients',
    ingredients,
    'Recherche un ingrédient'
)
const appareilsFilter = factFilter.CreateElement(
    'Appareil',
    appareils,
    'Recherche un appareil',
    'success'
)
const ustensilsFilter = factFilter.CreateElement(
    'Ustensiles',
    ustensils,
    'Recherche un ustensile',
    'danger'
)

eltFilters.append(ingrediantsFilter.button)
eltFilters.append(appareilsFilter.button)
eltFilters.append(ustensilsFilter.button)

const showRecettes = () => {
    const content = document.querySelector('.listcards')
    recettes.forEach(x => {
        content.append(x.html)
    })
}
showRecettes()
