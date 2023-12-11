// --------------------------- burger menu ---------------------------------// 

let burgerBtn = document.querySelector('.header-menu__burger');
let menuArea = document.querySelector('.header-menu');
const openClass = `${burgerBtn.className}-active`;

burgerBtn.onclick = (e) => {
    e.preventDefault()
    
    menuArea.classList.toggle('header-menu-open')
    burgerBtn.classList.toggle(openClass)
}

menuArea.addEventListener("click", (e) => {
   console.dir(e.target.tagName)
   if (e.target.tagName === "A") {
    menuArea.classList.toggle('header-menu-open')
    burgerBtn.classList.toggle(openClass)
   }
})