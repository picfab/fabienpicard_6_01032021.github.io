export default function Filters(name, color = 'primary') {
    const button = document.createElement('button')
    button.classList.add('filter__elt', 'btn', `btn-${color}`)
    button.textContent = name
    const iconBtn = document.createElement('span')
    iconBtn.classList.add('fas', 'fa-chevron-up')
    return button
}
