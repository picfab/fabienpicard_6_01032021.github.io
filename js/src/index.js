import recipes from './data/recipes'
import FactoryFilter from './Factories/FactoryFilter'
console.log(recipes)
const factFilter = new FactoryFilter()
const eltFilters = document.getElementById('filters')
const ingredients = []
const ustensils = []
const appareils = []
recipes.forEach((x) => {
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
const ingrediantsFilter = factFilter.CreateElement('Ingrédients', ingredients, 'Recherche un ingrédient')
const appareilsFilter = factFilter.CreateElement('Appareil', appareils, 'Recherche un ustensils', 'success')
const ustensilsFilter = factFilter.CreateElement('Ustensiles', ustensils, 'Recherche un ustensiles', 'danger')
console.log(appareils)

eltFilters.append(ingrediantsFilter.button)
eltFilters.append(appareilsFilter.button)
eltFilters.append(ustensilsFilter.button)
