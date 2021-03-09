import Card from '../DomElement/Card'

export default function FactoryRecette() {
    this.CreateElement = (recette) => {
        const element = {
            ...recette,
            showAppareil: true,
            showIngredient: true,
            showUstensil: true,
            showSearch: true,
        }

        element.html = new Card(recette)

        return element
    }
}
