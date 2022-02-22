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
var tabsFilter = document.querySelectorAll('.filter__block');

if (tabsFilter) {
  tabsFilter.forEach(function (tab) {
    if (!tab.classList.contains('filter__block--opened')) {
      tab.classList.add('filter__block--opened');
    }
  });
}

switchTabsAccordion(tabsFilter, 'filter__block--opened');

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
try {
  var slider = document.querySelector('.new__cards ul');
  var sliderItems = document.querySelectorAll('.new__cards li');
  var sliderPadeItems = document.querySelectorAll('.new__button');
  var leftSlideButton = document.querySelector('.new__slider-button--left');
  var rightSlideButton = document.querySelector('.new__slider-button--right');
  var mobilePageSliderCounter = document.querySelector('.new__buttons--mobile span');

  var currentSlideIndex = 0;
  var lastSlideIndex = 0;
  var sliderGap = 30;
  var percentSymbol = '% - ';
  var slidesCount;
  var startPos;

  var windowDesktopSize = window.matchMedia('(min-width: 1024px)');
  var windowTabletSize = window.matchMedia('(min-width: 768px)');


  var enableSlider = function () {
    if (windowDesktopSize.matches) {
      slidesCount = 3;
      rightSlideButton.addEventListener('click', toNextSlide);
      leftSlideButton.addEventListener('click', toPreviousSlide);
      sliderPageButtons();
    } else if (windowTabletSize.matches) {
      slidesCount = 6;
      rightSlideButton.addEventListener('click', toNextSlide);
      leftSlideButton.addEventListener('click', toPreviousSlide);
      sliderPageButtons();
      swipeSlider();
    } else {
      slidesCount = 6;
      swipeSlider();
    }
  };

  var pushSlide = function (buttonIndex) {
    sliderPadeItems[lastSlideIndex].classList.remove('new__button--active');
    for (var i = 0; i < sliderItems.length; i++) {
      currentSlideIndex = buttonIndex;
      sliderItems[i].style.left = 'calc(-' + (100 * currentSlideIndex) + percentSymbol + (sliderGap * currentSlideIndex) + 'px)';
    }
    sliderPadeItems[currentSlideIndex].classList.add('new__button--active');
    lastSlideIndex = currentSlideIndex;
  };

  var changeSlideOnPressPage = function (index) {
    sliderPadeItems[index].addEventListener('click', () => {
      pushSlide(index);
    });
  };

  var sliderPageButtons = function () {
    for (var i = 0; i < slidesCount; i++) {
      changeSlideOnPressPage(i);
    }
  };

  var toNextSlide = function () {
    currentSlideIndex = currentSlideIndex + 1;
    if (currentSlideIndex === slidesCount) {
      currentSlideIndex = slidesCount - 1;
    }
    pushSlide(currentSlideIndex);
  };

  var toPreviousSlide = function () {
    currentSlideIndex = currentSlideIndex - 1;
    if (currentSlideIndex === -1) {
      currentSlideIndex = 0;
    }
    pushSlide(currentSlideIndex);
  };

  var swipeSlider = function () {
    var swipeRange = 50;

    slider.addEventListener('touchstart', (evt) => {
      startPos = evt.touches[0].clientX;
      document.addEventListener('touchmove', touchMove);
    });

    var touchMove = function (moveEvt) {
      var movePos = moveEvt.touches[0].clientX;

      if (movePos - startPos > swipeRange) {
        toPreviousSlide();
        sliderPageNumber();
        document.removeEventListener('touchmove', touchMove);
      }

      if (startPos - movePos > swipeRange) {
        toNextSlide();
        sliderPageNumber();
        document.removeEventListener('touchmove', touchMove);
      }
    };
  };

  var sliderPageNumber = function () {
    var pageNumber = currentSlideIndex + 1;
    mobilePageSliderCounter.innerHTML = pageNumber;
  };

  enableSlider();
} catch (e) {
  console.log();
}
