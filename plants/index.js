const body = document.querySelector('.body')

// Меню бургер

const navIconMenu = document.querySelector('.nav-icon-menu');
const mainNav = document.querySelector('.main-nav');
const headerMenu = document.querySelector('.header-menu')

if(navIconMenu && mainNav) {
  navIconMenu.addEventListener('click', (event) => {
    document.body.classList.toggle('_lock');
    navIconMenu.classList.toggle('_active');
    mainNav.classList.toggle('_active');
    headerMenu.classList.toggle('_lock');
  })
}

// Удаление открытого меню при нажатии на ссылку с названием раздела

const itemLinks = document.querySelectorAll('.item-link');

if(itemLinks.length > 0) {
  itemLinks.forEach(itemLink => {
    itemLink.addEventListener('click', onItemClickLink)
  })

  function onItemClickLink(event) {
    const itemLink = event.target;
    if(navIconMenu.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      navIconMenu.classList.remove('_active');
      mainNav.classList.remove('_active');
      headerMenu.classList.remove('_lock');
    }
  }
}

// Закрытие открытого бургер меню при нажатии на область вне меню

headerMenu.addEventListener('click', (event) => {
  if(event.target.classList.contains('header-menu')) {
    document.body.classList.remove('_lock');
    navIconMenu.classList.remove('_active');
    mainNav.classList.remove('_active');
    headerMenu.classList.remove('_lock');
  }
})


// BLUR

// Метод indexOf() ищет в массиве указанный элемент и возвращает его позицию.
// Метод splice() изменяет содержимое массива, удаляя существующие элементы и/или добавляя новые.

const removeElement = (array, value) => {
  var index = array.indexOf(value);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

console.log('skript')
const serviceButtons = document.querySelectorAll('.service-button-item')
const serviceItem = document.querySelectorAll('.service-galery-item')
const arrButtonsActive = [];
const serviceActive = [];

serviceButtons.forEach(button => {

  button.addEventListener('click', (event) => {

    const { target } = event;
    // Проверка есть ли в массиве arrButtonsActive две нажатые кнопки, если есть - то третья не нажимается

    if(!(target.classList.contains('button-common__active'))) {

      if(arrButtonsActive.length < 2) {
        target.classList.add('button-common__active');
        arrButtonsActive.push(target);
        serviceActive.push(target.dataset.service);
      }

    } else {
      target.classList.remove('button-common__active')
      arrButtonsActive.pop();
      removeElement(serviceActive, target.dataset.service)
    }
    // Блюр карточек, если кнопки неактивны и незаблюренные карточки, если кнопки активны
    // serviceActive - массив для активных кнопок
    serviceItem.forEach(itemGalery => {
        if(serviceActive.includes(itemGalery.dataset.service)){
          itemGalery.classList.remove('service-galery-item__blur');
        } else {
          itemGalery.classList.add('service-galery-item__blur');
        }

    })

  })
})



// BTN-PRICES OPEN / CLOSE

const buttonDropDown = document.querySelectorAll('.item-btn');
const cards = document.querySelectorAll('.prices-item')
// console.log(card)
const arrButton = []

buttonDropDown.forEach(button => {
  button.addEventListener('click', (event) => {
    const { target } = event;
    // console.log(target)
    if(target.classList.contains('item-btn_active')) {
      target.classList.remove('item-btn_active');
      cards.forEach(card => {
        if(card.classList.contains('prices-item__active')) {
          card.classList.remove('prices-item__active')
        }
      })
    } else {
      buttonDropDown.forEach(btn => {
        if(btn.classList.contains('item-btn_active')) {
          btn.classList.remove('item-btn_active')
          cards.forEach(card => {
            if(card.classList.contains('prices-item__active')) {
              card.classList.remove('prices-item__active')
            }
          })
        }
        target.classList.add('item-btn_active')
        cards.forEach(card => {
          if(card.dataset.price === target.dataset.price) {
            card.classList.add('prices-item__active')
          }
        })
      })

    }

  })
})

// SELECT CONTACT CITY

const selectCommon = document.querySelector('.contacts-header-row');
const select = document.querySelector('.contacts-header');

const contactsItemCity = document.querySelectorAll('.contacts-item');
const textCity = document.querySelector('.contacts-header-name');
const contactCards = document.querySelectorAll('.contact-card-item');
const imgGirl = document.querySelector('.contact-img-tablet');

// Открытие/закрытие списка с городами при нажатии
// Тут же, если опять открываем выбор города - удаляется карточка если она была выведена

select.addEventListener('click', () => {
  selectCommon.classList.toggle('_active')
  contactCards.forEach(card => {
    card.classList.remove('contact-card-item_active');
  })
})

// Реализовано добавление названия города вместо слова City
// Добавление карточки и смена фона в окне выборки

contactsItemCity.forEach( itemCity => {
  itemCity.addEventListener('click', (event) => {
  const { target } = event
  textCity.textContent = target.textContent;
  selectCommon.classList.toggle('_active');
  selectCommon.classList.add('_active-show-card')
  contactCards.forEach(card => {
    card.classList.remove('contact-card-item_active');
    if(card.dataset.city === target.textContent) {
      card.classList.add('contact-card-item_active');
    }
    if(window.innerWidth <= 380 && card.classList.contains('contact-card-item_active')) {
      imgGirl.classList.add('hidden')
    }
  })
  })
})






