console.log('Ваша оценка - 85 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1) Блок header\n2) Секция welcome\n3) Секция about\n4) Секция service\n5) Секция prices\n6) Секция contacts\n7) Блок footer\n8) Блок header\n9) Секция welcome\n10) Секция about\n11) Секция service\n12) Секция prices\n13) Секция contacts\n14) Блок footer\n15) нет полосы прокрутки при ширине страницы от 1440рх до 380px\n16) нет полосы прокрутки при ширине страницы от 380px до 320рх\n17) при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка\n18) при нажатии на бургер-иконку плавно появляется адаптивное меню\n19) адаптивное меню соответствует цветовой схеме макета\n20) при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран\n21) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (все, кроме Account, она пока просто закрывает меню)\n22) при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна')

const body = document.querySelector('.body')

// Меню бургер

const navIconMenu = document.querySelector('.nav-icon-menu');
const mainNav = document.querySelector('.main-nav');
const headerMenu = document.querySelector('.header-menu')
// console.log(navItem)

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


