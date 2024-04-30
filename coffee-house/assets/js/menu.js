import products from './products.json' assert { type: 'json'};
// --------------------------- Menu block ---------------------------------// 
const menuBlock = document.querySelector(".our-menu");
const menuBtns = document.querySelectorAll(".menu__tab");
const addCardBtn = document.querySelector(".menu__adding-btn");
const overlay = document.getElementById("modal");
const modalBody = document.getElementById("modal-window");
const closeModalBtn = document.querySelector(".modal-window__close");
const chooseSizeBtns = document.querySelectorAll(".size-btn");
const additiveBtns = document.querySelectorAll(".addition-btn");

function createProductCard(prod, i, count) {
    menuBlock.insertAdjacentHTML("beforeend", 
        `<div class="our-menu-item ${prod.category} ${prod.category !== 'coffee' ? 'none' : ''}" data-index="${i}" >
            <div class="our-menu-item__label">
                <img src="assets/image/forMenu/${prod.category}/${prod.category}-${count}.png" alt="${prod.category}${count}">
            </div>
            <div class="our-menu-item__description">
                <h3>
                    ${prod.name}
                </h3>
                <p>
                    ${prod.description}
                </p>
                <h3>
                    ${prod.price}
                </h3>
            </div>
        </div>`
    )
}
const changeProductCards = (category) => {
    let count = 0;
    productCards.forEach((item) => {
        if (item.classList.contains(`${category}`)) {
            count++;
            item.classList.remove("none")
        } else {
            if (!item.classList.contains("none")) {
                item.classList.add("none")
            }
        }
    })
    hideRefreshBtn(count)
}

function hideRefreshBtn (count) {
    if (count < 5) {
        addCardBtn.classList.add("none")
    } else {
        addCardBtn.classList.remove("none")
    }
}

const switchChecked = (btn, checkbox = 0) => {
    const input = btn.firstElementChild;

    if (!input.checked) {
        input.checked = true
    } else if (checkbox) {
        input.checked = false
    }
}

const countPrice = (priceList) => {
    let totalPrice = 0;
    for (const price in priceList) {
        totalPrice += Number(priceList[price])
    }
    return totalPrice
}

const fillModalCard = (card, cardIndex) => {
    const cardData = products[card.dataset.index * 1];
    const modalImage = modalBody.querySelector('img');
    const modalContents = modalBody.lastElementChild.children;
    const prodDescription = [...modalContents[0].children];
    const renameBtns = (type, btn, index) => {
        let values = products[cardIndex][type];
        let label = btn.lastElementChild;
        let sizeLetter = label.previousElementSibling.innerText.toLowerCase();

        Array.isArray(values) 
            ? label.innerText = values[index].name
            : label.innerText = values[sizeLetter].size
    }

    modalImage.src = card.querySelector('img').src;
    prodDescription[0].innerText = cardData.name;
    prodDescription[1].innerText = cardData.description;

    modalContents[3].lastElementChild.innerText = `$${cardData.price}`;

    // reset buttons
    chooseSizeBtns.forEach((b, i) => {
        renameBtns('sizes', b, i)
        if (i === 0) switchChecked(b)
    })
    additiveBtns.forEach((b, i) => {
        let input = b.firstElementChild;

        renameBtns('additives', b, i)        
        if (input.checked) {
            input.checked = false;
        }
       
    })
    
    return {
        basePrice: cardData.price,
        sizePrice: 0,
        additivePrice: 0
    }
}

const changeSizePrice = (e, priceList) => {
    priceList.sizePrice = e.currentTarget.firstElementChild.value;
}
const changeAdditivePrice = (priceList) => {
    let priceForItem = 0;
    let checkedItems = 0;
    additiveBtns.forEach((btn) => {
        let input = btn.firstElementChild;
        priceForItem = input.value;

        if (input.checked) {
            checkedItems++
        }
    })
    priceList.additivePrice = priceForItem * checkedItems
}

// --------------------------- Create products ---------------------------------// 

const productCards = (function () {
    let countImg = 0;
    products.forEach((prod, i, arr) => {
        let prev = i === 0 ? arr[0].category : arr[i-1].category; 
        let cur = prod.category;
        if (cur !== prev) {
            countImg = 1;
        } else {
            countImg++;
        }
        createProductCard(prod, i, countImg)
    })
    return document.querySelectorAll(".our-menu-item");
}) ()

// --------------------------- end create products ---------------------------------// 

menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const input = btn.firstElementChild;
        switchChecked(btn)

        menuBlock.classList.remove('show')
        changeProductCards(input.id)
    })
})

addCardBtn.addEventListener('click', () => {
    menuBlock.classList.add('show')
    hideRefreshBtn(0)
})

overlay.addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target === closeModalBtn) {
        document.body.removeAttribute('style')
        overlay.classList.remove('open');
    }
})


productCards.forEach((card, i) => {
    card.addEventListener('click', () => {
        const priceList = fillModalCard(card, i)
        overlay.classList.add('open')
        document.body.style = 'overflow-y: hidden;'

        chooseSizeBtns.forEach((btn) => {   // Size buttons

            btn.onclick = (e) => {
                switchChecked(btn)
                changeSizePrice(e, priceList)
                let total = countPrice(priceList).toString()
                const priceElem = btn.offsetParent.querySelector(".modal-window__result").lastElementChild;

                priceElem.innerText = `$${total.length === 1 ? total.padEnd(4, '.00') : total.padEnd(4, '0')}`;
            }

        })
        additiveBtns.forEach((btn) => {     // additive buttons

            btn.onclick = (e) => {
                if (e.target.classList.contains("addition-btn__icon")) {
                    switchChecked(btn, 1)
                }
                changeAdditivePrice(priceList)
                let total = countPrice(priceList).toString()
                const priceElem = btn.offsetParent.querySelector(".modal-window__result").lastElementChild;

                priceElem.innerText = `$${total.length === 1 ? total.padEnd(4, '.00') : total.padEnd(4, '0')}`;
            }

        })
    })
})

