function ellipsis(text, max = 200) {
    return text.substr(0, max - 1) + (text.length > max ? '…;' : '')
}
export default function Card(recette) {
    const col = document.createElement('div')
    col.classList.add('col', 'mb-4')

    const card = document.createElement('div')
    card.classList.add('card')
    col.append(card)

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 380 178')
    svg.classList.add('card-img-top')
    // svg.viewBox = '0 0 380 178'
    card.append(svg)


    const container = document.createElement('div')
    container.classList.add('card-body', 'container')
    card.append(container)

    const row = document.createElement('div')
    row.classList.add('row')
    container.append(row)

    const cardTitle = document.createElement('div')
    cardTitle.classList.add(
        'card-title',
        'col-12',
        'd-flex',
        'justify-content-between',
        'p-0'
    )
    row.append(cardTitle)

    const title = document.createElement('h2')
    title.classList.add('card__title')
    title.textContent = recette.name
    cardTitle.append(title)

    const time = document.createElement('div')
    time.classList.add('card__time')
    title.after(time)

    const iconTime = document.createElement('span')
    iconTime.classList.add('far', 'fa-clock')
    time.append(iconTime)
    iconTime.after(recette.time)

    const info = document.createElement('ul')
    info.classList.add('card__info', 'col-md-6', 'p-0')
    row.append(info)

    recette.ingredients.forEach(({ ingredient, quantity, unit }) => {
        const ingredientDiv = document.createElement('li')
        ingredientDiv.classList.add('card__infoElt')

        const name = document.createElement('strong')
        const nameValue = ingredient + (quantity ? ' : ' : '')
        name.textContent = nameValue

        ingredientDiv.append(name)
        if (quantity) {
            ingredientDiv.append(quantity)
        }
        if (unit) {
            ingredientDiv.append(unit)
        }
        info.append(ingredientDiv)
    })

    const description = document.createElement('div')
    description.classList.add('card__description', 'col-md-6', 'p-0')
    const descriptionContent = document.createElement('p')
    descriptionContent.textContent = ellipsis(recette.description)
    description.append(descriptionContent)
    row.append(description)

    // console.log(card)

    return col
}
