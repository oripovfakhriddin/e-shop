import { data } from "./data.js";
const productsBlock = document.querySelector(".products__block");
const productsCart = document.querySelector(".cart__block");
const totalPrice = document.querySelector(".total-price");
let cart = [];
const sum = () => {
    totalPrice.textContent = cart.reduce((a, b) => { return a + b.userPrice; }, 0)+"$"
}
const renderShop = () => {
    productsBlock.innerHTML = data.map((data) => {
        if (data.count > 0) {
            return `
                     <div class="item1">
                        <div class="item1-img">
                            <img src="${data.img}" alt="telefon">
                        </div>
                        <div>
                            <h2>${data.name}</h2>
                            <b>${data.price}</b>
                            <p>${data.count}</p>
                            <div><button class="remove" data-productid="${data.id}">Add</button></div>
                        </div>
                    </div> `
        }
    })
}

renderShop();

const renderCart = () => {
    productsCart.innerHTML = cart.map((data) => {
        if (data.userCount > 0) {
            return `
                 <div class="item1">
                    <div class="item1-img">
                        <img src="${data.img}" alt="telefon">
                    </div>
                    <div>
                        <h2>${data.name}</h2>
                        <b>${data.userPrice}</b>
                        <div>
                             <button class="add-cart" id="${data.id}">+</button>
                             <p>${data.userCount}</p>
                             <button class="remove-cart" id="${data.id}">-</button>
                        </div>
                    </div>
                </div> `
        }

    })
};

productsBlock.addEventListener("click", (event) => {
    let item = cart.some((item) => item.id === Number(event.target.dataset.productid));
    if (event.target.dataset.productid && !item) {
        let product = data?.find((item) => {
            if (item.id === Number(event.target.dataset.productid)) {
                item.count -= 1;
                return true;
            }
        });
        cart.push({ ...product, userCount: 1, userPrice: product.price });
        renderCart();
        renderShop();
    }
    sum();
});

productsCart.addEventListener("click", (event) => {
    if (event.target.className === "add-cart") {
        for (let i of data) {
            if (event.target.id == i.id && i.count > 0) {
                i.count -= 1;
                cart.forEach((el) => {
                    if (el.id == i.id) {
                        el.userCount += 1;
                        el.userPrice = el.userCount * el.price;
                    }
                })
            }
        }
    }
    else if (event.target.className === "remove-cart") {
        for (let i of cart) {
            if (event.target.id == i.id && i.userCount > 0) {
                i.userCount -= 1;
                i.userPrice = i.userCount * i.price;
                data.forEach((el) => {
                    if (el.id == i.id) {
                        el.count += 1;
                    }
                })
            }
        }
        cart = cart.filter((el) => el.userCount > 0)
    }

    renderCart();
    renderShop();
    sum();
});


