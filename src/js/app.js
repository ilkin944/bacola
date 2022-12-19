// categories dropdown

const dropdownCategory = document.getElementById('dropdown-category');
const categoriesList = document.getElementById("categories-list");
dropdownCategory.addEventListener('click', function () {
  categoriesList.classList.toggle("show")
});

// location
const userLocation = document.querySelector('.user-location');
const locationBox = document.querySelector('#location');
const closeBtn = document.querySelector("#close-btn");
userLocation.addEventListener('click', function () {
  locationBox.classList.add("active")
});
closeBtn.addEventListener('click', function () {
  locationBox.classList.remove("active");
});

// slideshow
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


// add to cart

// const addToCart = document.querySelectorAll(".product-add-to-cart");
// const sebet = document.querySelectorAll(".has-item");

// addToCart.forEach(function (item, index) {
//   item.addEventListener("click", sebeteElaveEt)
// })
// function sebeteElaveEt(e) {
//   console.log(e);
// };
// sebet.forEach(function (item) {
//   console.log(item.children);
// })

let shoppingCart = (function () {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];
  // Constructor
  function Item(name, image, price, count) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }


  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, image, price, count) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, image, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  }
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (let i in cart) {
      item = cart[i];
      itemCopy = {};
      for (let p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})()


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
var sebeteElaveEtDuymesi = document.getElementsByClassName("product-add-to-cart-a");

for (let index = 0; index < sebeteElaveEtDuymesi.length; index++) {
  sebeteElaveEtDuymesi[index].addEventListener("click", sebet)

  function sebet(event) {
    event.preventDefault();
    var name = event.target.parentElement.parentElement.children[0].children[0].textContent;
    var image = event.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].getAttribute("src");
    var price = Number(event.target.parentElement.parentElement.children[3].children[1].textContent.slice(1));
    shoppingCart.addItemToCart(name, image, price, 1);
    event.target.parentElement.innerHTML = `<div class="w-100 flex items-center between"><button class="minus-item" onclick="azalt(this)">-</button>
                                          <button class="hazirki-say" disabled>1</button>
                                          <button class="plus-item" onclick="artir(this)">+</button></div>`;
    displayCart();
  }

  function artir(event) {
    event.previousElementSibling.textContent = Number(event.previousElementSibling.textContent) + 1;
    var name = event.parentElement.parentElement.parentElement.children[0].children[0].textContent;
    shoppingCart.addItemToCart(name);
    displayCart();
  };

  function azalt(event) {
    if (event.nextElementSibling.textContent < 2) {
      var name = event.parentElement.parentElement.children[0].children[0].textContent;
      shoppingCart.removeItemFromCart(name);
      displayCart();
      event.parentElement.innerHTML = `<button href="#" class="product-add-to-cart-a w-100 flex items-center center">Add to Cart</button>`
    } else {
      var name = event.parentElement.parentElement.children[0].children[0].textContent;
      shoppingCart.removeItemFromCart(name);
      displayCart();
      event.nextElementSibling.textContent = Number(event.nextElementSibling.textContent) - 1;
    }
  };

}


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    output += `
                <div class="product-wrapper flex">
                  <div class="addedProductInfo flex">
                      <div class="cart-image w-20 flex">
                          <i class="delete fa-solid fa-times" onclick="silme(this)"></i>
                          <img class="w-100" src="${cartArray[i].image}" alt="">
                      </div>
                      <div class="cart-description flex column">
                          <div class="cart-name flex">
                              <h3>${cartArray[i].name}</h3>
                          </div>
                          <div class="cart-qty-price flex">
                              <span class="qty">${cartArray[i].count} </span>
                              <span> x </span>                              
                              <span class="price"> ${cartArray[i].price}</span>
                          </div>
                      </div>
                  </div>
              </div>`
  }
  console.log(document.querySelectorAll('.cartTotal')[0]);
  document.querySelector(".cart-inner").innerHTML = output;
  document.querySelector('.totalPrice').innerHTML = `${shoppingCart.totalCart()}`;
  document.querySelector('.cartTotal').innerHTML = `$${shoppingCart.totalCart()}`;
  document.querySelector('.card-total').children[0].textContent = `$${shoppingCart.totalCart()}`;
}

// Delete item button

function silme(e) {
  var name = e.parentElement.nextElementSibling.children[0].children[0].textContent;
  shoppingCart.removeItemFromCart(name);
  e.parentElement.parentElement.parentElement.remove();
  displayCart();
}
displayCart();