let wishlist = [];
let products = [
{id:1,name:"Floral Kurti",price:2199,category:"Kurti",image:"floral_kurti.webp"},
{id:9,name:"Kurti",price:1499,category:"Kurti",image:"kurti.webp"},
{id:2,name:"Silk Saree",price:1299,category:"Saree",image:"sare.webp"},
{id:3,name:"Western Top",price:899,category:"Women Western",image:"west.webp"},
{id:4,name:"Men T-Shirt",price:499,category:"Men",image:"shirt.jfif"},
{id:5,name:"Kids Toy Car",price:799,category:"Kids",image:"car.webp"},
{id:13,name:"Kids Fashion",price:1199,category:"Kids",image:"girl.webp"},
{id:6,name:"Kitchen Set",price:1899,category:"Home",image:"kit.webp"},
{id:11,name:"Formal",price:3999,category:"Men",image:"sid.webp"},
{id:14,name:"Western One Piece",price:2599,category:"Women Western",image:"one.webp"},
{id:7,name:"Face Cream",price:299,category:"Beauty",image:"face.webp"},
{id:15,name:"Kitchen Set",price:5099,category:"Home",image:"kit1.webp"},
{id:8,name:"Health",price:1399,category:"Health",image:"health.webp"},
{id:16,name:"Makeup",price:999,category:"Beauty",image:"makeup.webp"},
{id:10,name:"Trending Dress",price:1199,category:"Popular",image:"mod.jfif"},
{id:12,name:"Saree",price:1299,category:"Saree",image:"kala.jpeg"},

];

let cart = [];

function displayProducts(productArray = products){
let html="";

productArray.forEach(p=>{
html+=`
<div class="product">
<img src="${p.image}">
<h4>${p.name}</h4>
<p>₹${p.price}</p>
<button onclick="addToCart(${p.id})">Add to Cart</button>
<button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
</div>`;
});

document.getElementById("product-list").innerHTML=html;
}
displayProducts();
showSection("home");

function filterCategory(cat){
    if(cat==="All"){
        displayProducts(products);
    } else {
        let filtered = products.filter(p=>p.category===cat);
        displayProducts(filtered);
    }
}

function searchProduct(){
    let value=document.getElementById("search").value.toLowerCase();
    let filtered=products.filter(p=>p.name.toLowerCase().includes(value));
    displayProducts(filtered);
}

function sortProducts(type){
    let sorted=[...products];
    if(type==="low"){
        sorted.sort((a,b)=>a.price-b.price);
    }
    if(type==="high"){
        sorted.sort((a,b)=>b.price-a.price);
    }
    displayProducts(sorted);
}

function addToCart(id){
    let item=products.find(p=>p.id===id);
    cart.push(item);
    updateCart();
}

function updateCart(){
    let html="";
    let total=0;

    cart.forEach((item,index)=>{
        total+=item.price;
        html+=`
        <p>
            ${item.name} - ₹${item.price}
            <button onclick="removeFromCart(${index})">❌</button>
        </p>`;
    });

    document.getElementById("cart-items").innerHTML=html;
    document.getElementById("total").innerText=total;
    document.getElementById("cart-count").innerText=cart.length;
}

function removeFromCart(index){
    cart.splice(index,1);
    updateCart();
}

function addToWishlist(id){

let item = products.find(p => p.id === id);
if(!item) return;

if(wishlist.some(p => p.id === id)){
return;
}

wishlist.push(item);
updateWishlist();

let popup = document.getElementById("wishlistPopup");
popup.classList.add("active");


setTimeout(()=>{
popup.classList.remove("active");
},1500);

}
function removeFromWishlist(index){
    wishlist.splice(index,1);
    updateWishlist();
}

function placeOrder(){
let address=document.getElementById("address").value;

if(cart.length==0){
alert("Cart empty");
return;
}

if(address==""){
alert("Enter address");
return;
}

document.getElementById("orderPopup").classList.add("active");

cart=[];
updateCart();
}

function showSection(id){
    document.querySelectorAll(".section").forEach(sec=>{
        sec.style.display="none";
    });
    document.getElementById(id).style.display="block";
}

displayProducts();
showSection("home");

function closePopup(){
document.getElementById("orderPopup").classList.remove("active");
showSection("home");
}
function logout(){


    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("trendifyUser");

    let nameElement = document.getElementById("profileName");
    if(nameElement){
        nameElement.innerText = "";
    }

    document.getElementById("logoutPopup").classList.add("active");

}

function confirmLogout(){

    document.getElementById("logoutPopup").classList.remove("active");
    document.getElementById("mainSite").style.display="none";

    document.getElementById("loginPage").style.display="flex";

}
function updateWishlist(){

let html="";

wishlist.forEach((item,index)=>{
html+=`
<p>
${item.name} - ₹${item.price}
<button onclick="removeFromWishlist(${index})">❌</button>
</p>`;
});

let container = document.getElementById("wishlist-items");
if(container){
container.innerHTML = html;
}

let count = document.getElementById("wish-count");
if(count){
count.innerText = wishlist.length;
}
}