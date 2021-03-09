export default function FilterList(label, color = 'primary') {
    const listContent = document.createElement('div')
    listContent.classList.add('filter', `bg-${color}`, 'text-white')

    const filterForm = document.createElement('div')
    filterForm.classList.add('filter__form')

    const input = document.createElement('input')
    input.classList.add('filter__input', `bg-${color}`)
    input.placeholder = label
    filterForm.append(input)
    listContent.append(filterForm)

    const filterIcon = document.createElement('div')
    filterIcon.classList.add('filter__icon')
    const span = document.createElement('span')
    span.classList.add('fas', 'fa-chevron-up')
    filterIcon.append(span)
    input.after(span)

    const filterList = document.createElement('ul')
    filterList.classList.add('filter__list', `bg-${color}`)
    listContent.append(filterList)

    return listContent
}
