//==============================
// PRODUCTS
//==============================

const products = [

{
id:1,
name:"Dell Inspiron Laptop",
category:"Electronics",
price:52999,
rating:4.8,
discount:15,
image:"images/laptop.jpg"
},

{
id:2,
name:"Wireless Headphones",
category:"Electronics",
price:3999,
rating:4.6,
discount:20,
image:"images/headphones.jpg"
},

{
id:3,
name:"Smart Phone",
category:"Electronics",
price:28999,
rating:4.7,
discount:10,
image:"images/phone.jpg"
},

{
id:4,
name:"DSLR Camera",
category:"Electronics",
price:45999,
rating:4.9,
discount:18,
image:"images/camera.jpg"
},

{
id:5,
name:"Men's T-Shirt",
category:"Fashion",
price:899,
rating:4.3,
discount:25,
image:"images/tshirt.jpg"
},

{
id:6,
name:"Blue Jeans",
category:"Fashion",
price:1699,
rating:4.5,
discount:30,
image:"images/jeans.jpg"
},

{
id:7,
name:"Running Shoes",
category:"Fashion",
price:3499,
rating:4.6,
discount:15,
image:"images/shoes.jpg"
},

{
id:8,
name:"Smart Watch",
category:"Electronics",
price:6999,
rating:4.7,
discount:12,
image:"images/watch.jpg"
}

];


//==============================
// CART
//==============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


//==============================
// HTML ELEMENTS
//==============================

const productContainer = document.getElementById("productContainer");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const totalPrice = document.getElementById("totalPrice");

const searchBox = document.getElementById("liveSearch");

const categoryFilter = document.getElementById("categoryFilter");
//==============================
// DISPLAY PRODUCTS
//==============================

function displayProducts(productList){

productContainer.innerHTML="";

productList.forEach(product=>{

productContainer.innerHTML += `

<div class="product">

<div class="wishlist"
onclick="toggleWishlist(${product.id}, this)">

<i class="fa-regular fa-heart"></i>

</div>

<span class="discount">

${product.discount}% OFF

</span>

<img src="${product.image}"
onclick="openModal(${product.id})">

<div class="product-info">

<h3>${product.name}</h3>

<p class="category">

${product.category}

</p>

<p class="price">

₹${product.price}

</p>

<p class="rating">

⭐ ${product.rating}

</p>

<button onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

</div>

`;

});

}

displayProducts(products);
//==============================
// ADD TO CART
//==============================

function addToCart(id){

    const product = products.find(item=>item.id===id);

    const existing = cart.find(item=>item.id===id);

    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    // const toast=document.getElementById("toast");

    // toast.classList.add("show");

    const toast = document.getElementById("toast");

    if (toast) {

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2000);

}

    setTimeout(()=>{

    toast.classList.remove("show");

    },2000);

    updateCart();

}

//==============================
// WISHLIST
//==============================

let wishlist = [];

function toggleWishlist(id, element){

    const heart = element.querySelector("i");

    if(heart.classList.contains("fa-regular")){

        heart.classList.replace("fa-regular","fa-solid");

        heart.style.color = "red";

        wishlist.push(id);

    }

    else{

        heart.classList.replace("fa-solid","fa-regular");

        heart.style.color = "";

        wishlist = wishlist.filter(item => item !== id);

    }

}
//==============================
// UPDATE CART
//==============================

function updateCart(){

    cartItems.innerHTML="";

    let total=0;

    cart.forEach((item,index)=>{

        total+=item.price * (item.quantity || 1);

        cartItems.innerHTML+=`

        <div class="cart-item">

            <div class="cart-details">

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <div class="qty">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${item.quantity || 1}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </div>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    cartCount.innerText=cart.length;

    totalPrice.innerText=total.toLocaleString();

}

//==============================
// REMOVE ITEM
//==============================

function removeItem(index){

cart.splice(index,1);

saveCart();

updateCart();

}

//==============================
// INCREASE QUANTITY
//==============================

function increaseQty(index){

    if(!cart[index].quantity){

        cart[index].quantity=1;

    }

    cart[index].quantity++;

    saveCart();

    updateCart();

}

//==============================
// DECREASE QUANTITY
//==============================

function decreaseQty(index){

    if(!cart[index].quantity){

        cart[index].quantity=1;

    }

    if(cart[index].quantity>1){

        cart[index].quantity--;

    }

    saveCart();

    updateCart();

}

//==============================
// SAVE CART
//==============================

function saveCart(){

localStorage.setItem(

"cart",

JSON.stringify(cart)

);

}

//==============================
// LOAD CART
//==============================

updateCart();

//==============================
// SEARCH
//==============================

searchBox.addEventListener("keyup",()=>{

const value=searchBox.value.toLowerCase();

const filtered=products.filter(product=>

product.name.toLowerCase().includes(value)

);

displayProducts(filtered);

});

//==============================
// CATEGORY FILTER
//==============================

categoryFilter.addEventListener("change",()=>{

const category=categoryFilter.value;

if(category==="All"){

displayProducts(products);

return;

}

const filtered=products.filter(product=>

product.category===category

);

displayProducts(filtered);

});

//==============================
// DARK MODE
//==============================

function darkMode(){

document.body.classList.toggle("dark");

}

//==============================
// SCROLL BUTTON
//==============================

const topBtn = document.getElementById("topBtn");

if(topBtn){

window.addEventListener("scroll",function(){

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

window.addEventListener("load",function(){

const loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

});
//==============================
// PRODUCT MODAL
//==============================

function openModal(id){

const product = products.find(item=>item.id===id);

document.getElementById("modalImage").src=product.image;

document.getElementById("modalTitle").innerText=product.name;

document.getElementById("modalPrice").innerText="₹"+product.price;

document.getElementById("modalCategory").innerText=product.category;

document.getElementById("modalCartBtn").onclick=function(){

addToCart(id);

};

document.getElementById("productModal").style.display="flex";

}

function closeModal(){

document.getElementById("productModal").style.display="none";

}
const sliderImages=[

"images/laptop.jpg",

"images/phone.jpg",

"images/headphones.jpg",

"images/watch.jpg"

];

let currentSlide=0;

setInterval(()=>{

currentSlide++;

if(currentSlide>=sliderImages.length){

currentSlide=0;

}

document.getElementById("sliderImage").src=sliderImages[currentSlide];

},3000);
document.getElementById("checkoutBtn").addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty!");

return;

}

alert("Demo Checkout Successful!");

});