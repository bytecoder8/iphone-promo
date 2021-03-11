'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const cardDetailChangeList = document.querySelectorAll('.card-details__change')
  const cardTitleElement = document.querySelector('.card-details__title')
  const cardImageElement = document.querySelector('.card__image_item')
  const cardPriceElement = document.querySelector('.card-details__price')
  const cardMemoryElement = document.querySelector('.description__memory')
  
  const data = [
    {
      name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
      img: 'img/iPhone-graphite.png',
      memory: 128,
      price: 99_990,
    },
    {
      name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
      img: 'img/iPhone-silver.png',
      memory: 256,
      price: 109_990,
    },
    {
      name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
      img: 'img/iPhone-blue.png',
      memory: 128,
      price: 99_990,
    },
  ]
  
  const deactivateTabs = () => {
    cardDetailChangeList.forEach( btn => {
      btn.classList.remove('active')
    } )
  }

  cardDetailChangeList.forEach( (btn, index) => {
    btn.addEventListener('click', event => {
      event.preventDefault()

      deactivateTabs()
      btn.classList.add('active')

      cardTitleElement.textContent = data[index].name
      cardImageElement.src = data[index].img
      cardImageElement.alt = data[index].name
      cardPriceElement.textContent = data[index].price + '₽'
      cardMemoryElement.textContent = `Встроенная память (ROM) ${data[index].memory} ГБ`
    })
  })

})
