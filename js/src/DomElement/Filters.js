import { maj } from '../assets/functions'

export default function Filters(name, color = 'primary') {
    const button = document.createElement('li')
    button.classList.add('filter__elt', `btn-${color}`)
    button.textContent = maj(name)
    const iconBtn = document.createElement('span')
    iconBtn.classList.add('fas', 'fa-chevron-up')
    return button
}
