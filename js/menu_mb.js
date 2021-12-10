const popupLink = document.querySelector('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const menuLinks = document.querySelectorAll('.nav__link-mb');

let unlock = true;

const timeout = 200;

popupLink.addEventListener('click', function(e) {
  const popupName = popupLink.getAttribute('href').replace('#', '');
  const currentPopup = document.getElementById(popupName);
  popupOpen(currentPopup);
  e.preventDefault();
});

const popupCloseIcon = document.querySelector('.popup-close');

popupCloseIcon.addEventListener('click', function(e) {
  popupClose(popupCloseIcon.closest('.popup'));
  e.preventDefault();
});


function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
     // bodyLock();
    currentPopup.classList.add('open');
}
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    //if (doUnlock) {
    //  bodyUnLock();
    //}
  }
}

function go_hash(hash) {
  console.log('go_hash: ' + hash)
  if(hash.indexOf('#') == -1)
    hash = '#' + hash
  if(document.location.hash) {
    document.location.hash = hash
    return
  }
  if(window.location.hash) {
    window.location.hash = hash
    return
  }
  if(document.location.href) {
    document.location.href = hash
    return
  }
  window.location.href = hash
}


if (menuLinks.length > 0) {
  for (let index = 0; index < menuLinks.length; index++) {
    const link = menuLinks[index];
    link.addEventListener('click', function(e) {
      
      const blockId = link.getAttribute('href').replace('#', '');
      
      //window.location.hash = blockId;
      //document.getElementById(blockId).scrollIntoView({
      //  block: 'start'
      //})
      
      const popupActive = document.querySelector('.popup.open');
      if (popupActive){
        popupClose(popupActive, true);
      }
      go_hash(blockId);
      //document.location.reload(true)
      
      e.preventDefault();
    });
  }
}


function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.button').offsetWidth + 'px';

if (lockPadding.length > 0) {
  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function() {
      unlock = true;
    }, timeout);
  }
}

function bodyUnLock() {
  setTimeout(function() {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = '0px';
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}


