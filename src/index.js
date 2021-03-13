'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const getData = (url, handleSuccess, handleError) => { 
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        try {
          const data = JSON.parse(this.response)
          handleSuccess(data)
        } catch (error) {
          handleError(error)
        }
      } else {
        handleError(new Error('Bad server response: ' + this.status))
      }
    }
    request.onerror = function() {
      handleError(new Error('Unknown network error'))
    }
    request.send()
  }

  const shuffle = (arr) => {
    const result = arr.slice()
    for (let i = result.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result
  }


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


  let allRelatedProducts = []
  const renderRelatedProducts = () => {
    const PRODUCTS_COUNT = 4
    const relatedProductsList = document.querySelector('.cross-sell__list')
    const showMoreButton = document.querySelector('.cross-sell__show-more')

    const createRelatedProduct = (item) => {
      const liElement = document.createElement('li')
      liElement.innerHTML = `
        <article class="cross-sell__item">
          <img class="cross-sell__image" src="${item.photo}" alt="${item.name}">
          <h3 class="cross-sell__title">${item.name}</h3>
          <p class="cross-sell__price">${item.price.toLocaleString()}₽</p>
          <button class="button button_buy cross-sell__button">Купить</button>
        </article>
      `
      return liElement
    }

    const render = (items) => {
      items.forEach(item => {
        relatedProductsList.append(createRelatedProduct(item))
      })
    }

    const createRelatedProductsList = (items) => {
      allRelatedProducts = allRelatedProducts.concat(shuffle(items))

      render(allRelatedProducts.splice(0, PRODUCTS_COUNT))
    }

    const showMore = (event) => {
      render(allRelatedProducts.splice(0, PRODUCTS_COUNT))
      if (allRelatedProducts.length === 0) {
        showMoreButton.style.display = 'none'
      }
    }
    showMoreButton.addEventListener('click', showMore)

    getData(
      'cross-sell-dbase/dbase.json', 
      items => createRelatedProductsList(items),
      error => alert(error.toString())
    )
  }

  getData(
    'cross-sell-dbase/tabs.json', 
    items => tabs(items),
    error => alert(error.toString())
  )

  accordion()
  modal()
  renderRelatedProducts()
})
