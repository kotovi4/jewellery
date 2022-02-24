//открытие и закрытие меню по кнопке крестика
var pageBody = document.querySelector('.page-body')
var menuOpenButton = document.querySelector('.page-header__toggle');
var pageHeader = document.querySelector('.page-header');
var page = document.querySelector('.page');
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
var loginModal = document.getElementById('login');
var emailInput = document.getElementById('email');
var loginButton = document.querySelector('.page-header__login');
var loginSpan = document.querySelector('.login__span');

loginButton.addEventListener('click', function (evt) {
  if (loginModal) {
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
  var loginModalCloseButton = loginModal.querySelector('.login__button-close');
  loginModalCloseButton.addEventListener('click', function (evt) {
    if (!loginModal.classList.contains('login--closed')) {
      evt.preventDefault();
      loginModal.classList.remove('login--opened');
      loginModal.classList.add('login--closed');
      page.classList.remove('page--hidden');
    }
  })

  //сохраняет email логина в localStorage
  loginModal.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('email', email.value);
    }
  });
});

//аккордеон
var switchTabsAccordion = function (tabs, className) {
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
var faqItems = document.querySelectorAll('.faq__item');

if (faqItems) {
  faqItems.forEach(function (tab) {
    tab.classList.remove('faq__item--opened');
  });
}

switchTabsAccordion(faqItems, 'faq__item--opened');

//аккордеон фильтра
var tabsFilter = document.querySelectorAll('.filter__accordion');

if (tabsFilter) {
  tabsFilter.forEach(function (tab) {
    if (!tab.classList.contains('filter__accordion--opened')) {
      tab.classList.add('filter__accordion--opened');
    }
  });
}

switchTabsAccordion(tabsFilter, 'filter__accordion--opened');

//открыие и закрытие фильтра на мобильном меню
var filterOpenButton = document.querySelector('.filter__button--open');
var filterCloseButton = document.querySelector('.filter__button--close');
var filter = document.querySelector('.filter');

if (filter) {
  filter.classList.remove('filter--opened');

  filterOpenButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    filter.classList.add('filter--opened');
  });

  filterCloseButton.addEventListener('click', () => filter.classList.remove('filter--opened'));
}

// слайдер
var swiperContainer = document.querySelector('.swiper-container');

if (swiperContainer) {
  var swiper = new window.Swiper(swiperContainer, {
    spaceBetween: 30,
    loop: true,
    loopPreventsSlide: true,

    breakpoints: {
      0: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            return current + ' of ' + total;
          },
        },
      },

      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'pagination-list__page',
          bulletActiveClass: 'pagination-list__page--active',
          renderBullet: function (index, className) {
            return '<button class="' + className + '">' + (index + 1) + '</button>';
          }
        },
      },

      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'new__button',
          bulletActiveClass: 'new__button--active',
          renderBullet: function (index, className) {
            return '<button class="' + className + '">' + (index + 1) + '</button>';
          }
        },
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
