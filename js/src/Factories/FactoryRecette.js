import Card from '../DomElement/Card'

export default function FactoryRecette() {
    this.CreateElement = (recette) => {
        const element = {
            ...recette,
            appareilShow: true,
            ingredientShow: true,
            ustensileShow: true,
            searchShow: true,
        }

        element.html = new Card(recette)

        return element
    }
}
