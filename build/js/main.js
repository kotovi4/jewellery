//открытие и закрытие меню по кнопке крестика
const pageBody = document.querySelector('.page-body')
const menuOpenButton = document.querySelector('.page-header__toggle');
const pageHeader = document.querySelector('.page-header');

pageBody.classList.remove('page-body--nojs');
pageHeader.classList.remove('page-header--opened');
menuOpenButton.addEventListener('click', () => pageHeader.classList.toggle('page-header--opened'));

//открыие фильтра по кнопке
const filterOpenButton = document.querySelector('.filter__button--open');
const filterCloseButton = document.querySelector('.filter__button--close');
const filter = document.querySelector('.filter');

filterOpenButton.addEventListener('click', () => filter.classList.add('filter--opened'));
filterCloseButton.addEventListener('click', () => filter.classList.remove('filter--opened'));

// //Slider
// const newCard = document.querySelectorAll('.new__cards li');
// const arrowLeft = document.querySelector('.new__slider-button--left');
// const arrowRight = document.querySelector('.new__slider-button--right');

// arrowLeft.addEventListener('click',function() {
//   newCard.style.left =
// })
