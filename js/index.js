'use strict';

document.addEventListener('DOMContentLoaded', () => {

  let selectedPhoneTitle = ''

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
  
    selectedPhoneTitle = cardTitleElement.textContent

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

        selectedPhoneTitle = cardTitleElement.textContent
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
    const modalElement = document.querySelector('.modal')
    const modalBlock = document.querySelector('.modal__block')
    const closeButton = document.querySelector('.modal__close')
    const openButton = document.querySelector('.button_buy')
    const titleElement = document.querySelector('.modal__title')

    modalElement.addEventListener('click', () => {
      modalElement.classList.remove('open')
    })
    // Клик по самому блоку модального окна запрещает всплытие до родителя
    modalBlock.addEventListener('click', event => {
      event.stopPropagation()
    })
    
    openButton.addEventListener('click', event => {
      event.preventDefault()
      modalElement.classList.add('open')
      titleElement.textContent = selectedPhoneTitle
    })
    closeButton.addEventListener('click', event => {
      event.preventDefault()
      modalElement.classList.remove('open')
    })
  }


  fetch('tabs.json')
    .then(response => response.json())
    .then(json => tabs(json))
    .catch(error => alert('Произошла ошибка: ' + error.toString()))

  accordion()
  modal()
})
