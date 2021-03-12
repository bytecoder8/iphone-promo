'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const tabs = data => {
    const cardDetailChangeList = document.querySelectorAll('.card-details__change')
    const cardTitleElement = document.querySelector('.card-details__title')
    const cardImageElement = document.querySelector('.card__image_item')
    const cardPriceElement = document.querySelector('.card-details__price')
    const cardMemoryElement = document.querySelector('.description__memory-value')
    
    const activeClass = 'active'
  
    const deactivateTabs = () => {
      cardDetailChangeList.forEach( btn => {
        btn.classList.remove(activeClass)
      } )
    }
  
    cardDetailChangeList.forEach( (btn, index) => {
      btn.addEventListener('click', event => {
        event.preventDefault()
  
        deactivateTabs()
        btn.classList.add(activeClass)
  
        cardTitleElement.textContent = data[index].name
        cardImageElement.src = data[index].img
        cardImageElement.alt = data[index].name
        cardPriceElement.textContent = data[index].price.toLocaleString() + '₽'
        cardMemoryElement.textContent = data[index].memory
      })
    })
  }


  const accordion = () => {
    const characteristicsList = document.querySelector('.characteristics__list')
    const buttonClass = 'characteristics__title'
    const dropDownClass = 'characteristics__description'
    const activeClass = 'active'
    const itemClass = 'characteristics__item'


    const closeAll = () => {
      const buttons = document.querySelectorAll(`.${buttonClass}.${activeClass}`)
      const dropDowns = document.querySelectorAll(`.${dropDownClass}.${activeClass}`)
      buttons.forEach( (button, index) => close(button, dropDowns[index]))
    }

    const open = (button, dropDown) => {
      closeAll()
      button.classList.add(activeClass)
      dropDown.style.height = dropDown.scrollHeight + 'px'      
      dropDown.classList.add(activeClass)
    }

    const close = (button, dropDown) => {
      button.classList.remove(activeClass)
      dropDown.classList.remove(activeClass)
      dropDown.style.height = ''
    }

    // Пересчет высоты для уже открытого элемента
    const openedDropDown = document.querySelector(`.${dropDownClass}.${activeClass}`)
    if (openedDropDown) {
      openedDropDown.style.height = openedDropDown.scrollHeight + 'px' 
    }

    characteristicsList.addEventListener('click', ({ target }) => {
      if (target.classList.contains(buttonClass)) {
        const button = target
        const parent = button.closest(`.${itemClass}`)
        const dropDown = parent.querySelector(`.${dropDownClass}`)
        button.classList.contains(activeClass) 
          ? close(button, dropDown) : open(button, dropDown)
      }
    })
  }


  const modal = () => {   
    const modalRootElement = document.querySelector('.modal')
    const closeButton = document.querySelector('.modal__close')
    const openButton = document.querySelector('.card-details__button_buy')
    const openButton2 = document.querySelector('.card-details__button_delivery')
    const titleElement = document.querySelector('.modal__title')
    const subtitleElement = document.querySelector('.modal__subtitle')

    const selectedProductElement = document.querySelector('[name="selectedProduct"]')
    const cardDetailsTitleElement = document.querySelector('.card-details__title')


    const open = ({ target }) => {
      modalRootElement.classList.add('open')
      document.addEventListener('keydown', handleEscapeKey)

      selectedProductElement.value = cardDetailsTitleElement.textContent
      titleElement.textContent = cardDetailsTitleElement.textContent

      if ('buySubtitle' in target.dataset) {
        subtitleElement.textContent = target.dataset.buySubtitle
      }

      document.querySelector('.modal__input').focus()
    }

    const close = () => {
      modalRootElement.classList.remove('open')
      document.removeEventListener('keydown', handleEscapeKey)
    }

    const handleEscapeKey = (event) => {
      if (event.code === 'Escape' || event.key === 'Escape' || event.keyCode === 27) {
        close()
      }
    }

    modalRootElement.addEventListener('click', ({target}) => {
      if (target === modalRootElement || target === closeButton) {
        close()
      }
    })
    
    openButton.addEventListener('click', open)
    openButton2.addEventListener('click', open)
  }


  fetch('tabs.json')
    .then(response => response.json())
    .then(json => tabs(json))
    .catch(error => alert('Произошла ошибка: ' + error.toString()))

  accordion()
  modal()
})
