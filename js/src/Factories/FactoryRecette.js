import Card from '../DomElement/Card'

export default function FactoryRecette() {
    this.CreateElement = (recette) => {
        const element = {
            appareilsFilter: true,
            ingrediantsFilter: true,
            ustensilsFilter: true,
            searchFilter: true,
        }

        element.html = new Card(recette)

        return element
    }
}
