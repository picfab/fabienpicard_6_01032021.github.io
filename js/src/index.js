/* eslint-disable no-use-before-define */
import recipes from './data/recipes'
import FactoryFilter from './Factories/FactoryFilter'
import FactoryRecette from './Factories/FactoryRecette'

const factFilter = new FactoryFilter()
const factRecette = new FactoryRecette()
const eltFilters = document.getElementById('filters')
const dataApp = {
    ingredients: [],
    ustensils: [],
    appareils: [],
    recettes: [],
    ingredientsSelected: [],
    ustensilsSelected: [],
    appareilsSelected: [],
}

const showRecettes = () => {
    const content = document.querySelector('.listcards')
    content.innerHTML = ''
    dataApp.recettes.forEach((x) => {
        if (authorize(x)) {
            content.append(x.html)
        }
    })
}

const verifIngredients = (values) => {
    dataApp.recettes.forEach((rec, i) => {
        let verif = true
        values.forEach((val) => {
            if (rec.ingredients.findIndex((x) => x.ingredient === val) === -1) {
                verif = false
            }
        })
        dataApp.recettes[i].ingredientShow = verif
    })
}

const verifUnstensils = (values) => {
    dataApp.recettes.forEach((rec, i) => {
        let verif = true
        values.forEach((val) => {
            if (rec.ustensils.findIndex((x) => x === val) === -1) {
                verif = false
            }
        })
        dataApp.recettes[i].ustensileShow = verif
    })
}

const verifAppareils = (values) => {
    dataApp.recettes.forEach((rec, i) => {
        let verif = true
        values.forEach((val) => {
            if (val !== rec.appliance) {
                verif = false
            }
        })
        dataApp.recettes[i].appareilShow = verif
    })
}

const updateRecettes = () => {
    verifIngredients(dataApp.ingredientsSelected)
    verifUnstensils(dataApp.ustensilsSelected)
    verifAppareils(dataApp.appareilsSelected)
}

const changeTags = (type, search, show) => {
    if (show) {
        type.push(search)
    } else {
        const i = type.findIndex((x) => x.includes(search))
        type.splice(i, 1)
    }
}

const updateListsOptions = () => {
    dataApp.ingredients = []
    dataApp.ustensils = []
    dataApp.appareils = []
    dataApp.recettes.forEach((x) => {
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
}

const pushOptionsToList = (type, val) => {
    const selectedName = `${type}Selected`
    if (!dataApp[type].includes(val) && dataApp[selectedName].findIndex(x => x === val) === -1) {
        dataApp[type].push(val)
    }
}

//INIT
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
    showRecettes()

    updateListsOptions()
    ingredientsFilter.updateShowBtn(dataApp.ingredients)
    appareilsFilter.updateShowBtn(dataApp.appareils)
    ustensilesFilter.updateShowBtn(dataApp.ustensils)
}

recipes.forEach((x) => {
    dataApp.recettes.push(factRecette.CreateElement(x))
})

dataApp.recettes.forEach((x) => {
    if (x.ingredientShow) {
        x.ingredients.forEach((elt) => {
            pushOptionsToList('ingredients', elt.ingredient)
        })
    }
    if (x.ustensileShow) {
        x.ustensils.forEach((elt) => {
            pushOptionsToList('ustensils', elt)
        })
    }
    if (x.appareilShow) {
        if (x.appliance) {
            pushOptionsToList('appareils', x.appliance)
        }
    }
})

const ingredientsFilter = factFilter.CreateElement(
    'Ingrédients',
    dataApp.ingredients,
    'Recherche un ingrédient',
    'primary',
    updateAfterChangeTag
)
const appareilsFilter = factFilter.CreateElement(
    'Appareil',
    dataApp.appareils,
    'Recherche un appareil',
    'success',
    updateAfterChangeTag
)
const ustensilesFilter = factFilter.CreateElement(
    'Ustensiles',
    dataApp.ustensils,
    'Recherche un ustensile',
    'danger',
    updateAfterChangeTag
)

eltFilters.append(ingredientsFilter.button)
eltFilters.append(appareilsFilter.button)
eltFilters.append(ustensilesFilter.button)

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

showRecettes()
