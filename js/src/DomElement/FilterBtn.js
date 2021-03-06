export default function FilterBtn(name, color = 'primary') {
    const button = document.createElement('button')
    button.classList.add('filter', `bg-${color}`, 'text-white')
    button.role = 'button'
    button.ariaHaspopup = 'true'
    button.ariaExpanded = 'false'
    button.textContent = name
    const iconBtn = document.createElement('span')
    iconBtn.classList.add('fas', 'fa-chevron-down')
    button.append(iconBtn)
    return button
}
