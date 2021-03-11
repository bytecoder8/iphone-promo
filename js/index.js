'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const tabs = data => {
    const cardDetailChangeList = document.querySelectorAll('.card-details__change')
    const cardTitleElement = document.querySelector('.card-details__title')
    const cardImageElement = document.querySelector('.card__image_item')
    const cardPriceElement = document.querySelector('.card-details__price')
    const cardMemoryElement = document.querySelector('.description__memory-value')
  
  
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
        cardPriceElement.textContent = data[index].price.toLocaleString() + '₽'
        cardMemoryElement.textContent = data[index].memory
      })
    })
  }

  fetch('tabs.json')
    .then(response => response.json())
    .then(json => tabs(json))
    .catch(error => alert('Произошла ошибка: ' + error.toString()))
})
