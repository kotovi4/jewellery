//открытие и закрытие меню по кнопке крестика
const pageBody = document.querySelector('.page-body')
const menuOpenButton = document.querySelector('.page-header__toggle');
const pageHeader = document.querySelector('.page-header');
const page = document.querySelector('.page');
let isStorageSupport = true;
let storage = '';

try {
  storage = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

//открытие и закрытие мобильного меню
pageBody.classList.remove('page-body--nojs');
pageHeader.classList.remove('page-header--opened');
menuOpenButton.addEventListener('click', function () {
  pageHeader.classList.toggle('page-header--opened');
  page.classList.toggle('page--hidden');
});

//открытие и закрытие модального окна
const loginModal = document.getElementById('login');
const emailInput = document.getElementById('email');
const loginButton = document.querySelector('.page-header__login');
const loginSpan = document.querySelector('.login__span');

loginButton.addEventListener('click', function (evt) {
  if(loginModal) {
    evt.preventDefault();
    loginModal.classList.remove('login--closed');
    loginModal.classList.add('login--opened');
    page.classList.add('page--hidden');
    emailInput.focus();

    loginSpan.onfocus = function () {
      emailInput.focus();
    }
  }

  // закрывает тапом на ESC
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (loginModal.classList.contains('login--opened')) {
        evt.preventDefault();
        loginModal.classList.remove('login--opened');
        loginModal.classList.add('login--closed');
        page.classList.remove('page--hidden');
      }
    }
  })

  // закрытие по оверлею
  loginModal.addEventListener('click', (evt) => {
    if (evt.target === loginModal) {
      loginModal.classList.remove('login--opened');
      loginModal.classList.add('login--closed');
      page.classList.remove('page--hidden');
    }
  });

  // закрывает тапом на крестик
  const loginModalCloseButton = loginModal.querySelector('.login__button-close');
  loginModalCloseButton.addEventListener('click', function (evt) {
    if (!loginModal.classList.contains('login--closed')) {
      evt.preventDefault();
      loginModal.classList.remove('login--opened');
      loginModal.classList.add('login--closed');
      page.classList.remove('page--hidden');
    }
  })
});

//сохраняет email логина в localStorage
loginModal.addEventListener('submit', function () {
  if (isStorageSupport) {
    localStorage.setItem('email', email.value);
  }
});

//аккордеон
const faqItems = document.querySelectorAll('.faq__item');

const switchTabsAccordion = function (tabs, className) {
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (tab.classList.contains(className)) {
        tab.classList.remove(className);
      } else {
        tab.classList.add(className);
      }
    });
  });
};

//аккордеон FAQ
if (faqItems) {
  faqItems.forEach(function (tab) {
    tab.classList.remove('faq__item--open');
  });
}

switchTabsAccordion(faqItems, 'faq__item--open');

//аккордеон фильтра
const tabsFilter = document.querySelectorAll('.filter__block');

if (tabsFilter) {
  tabsFilter.forEach(function (tab) {
    if (!tab.classList.contains('filter__block--opened')) {
      tab.classList.add('filter__block--opened');
    }
  });
}

switchTabsAccordion(tabsFilter, 'filter__block--opened');

//открыие и закрытие фильтра на мобильном меню
const filterOpenButton = document.querySelector('.filter__button--open');
const filterCloseButton = document.querySelector('.filter__button--close');
const filter = document.querySelector('.filter');

filterOpenButton.addEventListener('click', function (evt) {
  if(filter) {
    evt.preventDefault();
    filter.classList.add('filter--opened')
  }

  filterCloseButton.addEventListener('click', () => filter.classList.remove('filter--opened'));
});
