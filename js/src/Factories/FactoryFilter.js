/* eslint-disable no-param-reassign */
import FilterBtn from '../DomElement/FilterBtn'
import FilterList from '../DomElement/FilterList'
import Filters from '../DomElement/Filters'

const tagsSelect = document.querySelector('.tags')
export default function FactoryFilter() {
    this.CreateElement = (
        name,
        tagsList,
        label,
        color,
        updateAfterChangeTag
    ) => {
        const filterList = new FilterList(label, color)
        const element = {
            tags: [],
            button: new FilterBtn(name, color),
            filterElt: filterList,
            listContent: filterList.getElementsByClassName('filter__list')[0],
            input: filterList.getElementsByClassName('filter__input')[0],
        }

        /**
         * initialise les tags
         * @param {array} tags
         */
        element.setTag = (tags) => {
            tags.forEach((tagName) => {
                const tag = {}
                tag.name = tagName
                tag.show = true
                tag.element = new Filters(tagName, color)
                element.tags.push(tag)
            })
        }
        element.setTag(tagsList)

        /**
         * ajoute un tag au click
         * @param {number} index
         */
        element.addTag = (index) => {
            const tagBtn = document.createElement('button')
            tagBtn.setAttribute('data-type', name)
            tagBtn.textContent = element.tags[index].name
            tagBtn.classList.add('btn', `btn-${color}`)
            const tagIcon = document.createElement('span')
            tagIcon.classList.add('far', 'fa-times-circle')
            tagBtn.append(tagIcon)
            tagBtn.onclick = () => {
                tagBtn.remove()
                element.tags[index].show = true
                element.showTags()
                updateAfterChangeTag(name, element.tags[index].name, false)
            }
            tagsSelect.append(tagBtn)
            element.tags[index].show = false
            element.showTags()
            updateAfterChangeTag(name, element.tags[index].name, true)
            return element.tags[index].name
        }

        /**
         * Fonction Ouvre le formulaire
         */
        const verifIfClose = (e) => {
            e.preventDefault()
            let targetElement = e.target // clicked element
            do {
                if (targetElement === element.filterElt) {
                    return
                }
                // Go up the DOM
                targetElement = targetElement.parentNode
            } while (targetElement)
            if (element.button.classList.contains('hidden')) {
                element.close()
                element.button.classList.remove('hidden')
                document.removeEventListener('click', verifIfClose)
            } else {
                element.button.classList.add('hidden')
            }
        }

        element.open = () => {
            element.button.after(element.filterElt)
            document.addEventListener('click', verifIfClose)
        }
        /**
         * Ferme le formulaire
         */
        element.close = () => {
            // document.querySelector('.filter').remove()
            element.filterElt.remove()
            element.button.removeAttribute('style')
        }

        /**
         * Affiche les tags
         */
        element.showTags = () => {
            element.listContent.innerHTML = ''
            element.tags.forEach((x, i) => {
                if (x.show === true) {
                    x.element.onclick = (e) => {
                        e.stopPropagation()
                        element.addTag(i)
                    }
                    element.listContent.append(x.element)
                }
            })
        }

        element.updateShowBtn = (list) => {
            // console.log(name, 'updateShowBtn')
            element.tags.forEach((tag) => {
                // console.log(tag.name, list)
                if (list.indexOf(tag.name) === -1) {
                    tag.show = false
                } else {
                    tag.show = true
                }
            })

            element.showTags()
        }

        /**
         * Events
         */

        // Ouverture des filtres
        element.button.onclick = () => {
            element.button.style.display = 'none'
            element.showTags()
            element.open()
        }

        // Recherche dans l'input
        element.input.oninput = (e) => {
            element.tags.forEach((x) => {
                if (
                    x.name.toLowerCase().includes(e.target.value.toLowerCase())
                ) {
                    x.show = true
                } else {
                    x.show = false
                }
            })
            element.showTags()
        }

        return element
    }
}
