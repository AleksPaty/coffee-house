// --------------------------- burger menu ---------------------------------// 

let burgerBtn = document.querySelector('.header-menu__burger');
let menuArea = document.querySelector('.header-menu');

burgerBtn.onclick = (e) => {
    e.preventDefault()
    menuArea.classList.toggle('header-menu-open')
}