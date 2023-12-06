
const slideList = document.querySelector(".row-items");
const btnLeft = document.querySelector(".coffee-slider__left-btn");
const btnRight = document.querySelector(".coffee-slider__right-btn");
const progressBars = document.querySelectorAll(".coffee-slider__bare");

const moveSlide = (n) => {
    let gaps = slideList.offsetWidth - slideList.firstElementChild.offsetWidth * 3;
    let distance = ((slideList.offsetWidth - gaps) / 3 + gaps / 2) * n;

    slideList.style.transform = `translateX(-${distance}px)`
}
const autoMovingSlide = (n) => {
    const i = n < 2 ? n + 1 : 0;

    moveSlide(i)
    progressBars[n].classList.remove("coffee-slider__bare_active")
    progressBars[i].classList.add("coffee-slider__bare_active")
}
const manualMovingSlide = (side) => {
    let curDistance = slideList.getAttribute("style") != null 
        ? Number(slideList.getAttribute("style").replace(/[\D]{1,}/g, ""))
        : 0
    let curImg = curDistance / slideList.firstElementChild.offsetWidth;
    let n;
    if(side === 'left') {
        n = curImg === 0 ? 2 : curImg - 1;
    } else if(side === 'right') {
        n = curImg === 2 ? 0 : curImg + 1;
    }

    progressBars[curImg].classList.remove("coffee-slider__bare_active");
    progressBars[n].classList.add("coffee-slider__bare_active");
    moveSlide(n)
}
progressBars.forEach((bar, i) => {
    bar.classList.contains("coffee-slider__bare_active")
    bar.addEventListener("animationend", () => {
        
        autoMovingSlide(i)
    })
})

btnLeft.addEventListener("click", () => {
    manualMovingSlide('left')
})
btnRight.addEventListener("click", () => {
    manualMovingSlide('right')
})