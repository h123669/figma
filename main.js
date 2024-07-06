
let fruImg = document.getElementById("fruImg");
let fruName= document.getElementById("fruName");
let fruPrice= document.getElementById("fruPrice");
let fruDiscount= document.getElementById("fruDiscount");
let fruCount = document.getElementById("fruCount");

let fruitList;
if (localStorage.getItem("fruitList") == null) {
   fruitList = [];
 } else {
   fruitList = JSON.parse(localStorage.getItem("fruitList"));
   showData(fruitList);
 }
document.getElementById("fruitForm").addEventListener("submit", addProduct);
function addProduct(event){
  event.preventDefault();
  const file = fruImg.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fruit = {
                        name: fruName.value,
                        discountedPrice: fruDiscount.value,
                        oldPrice: fruPrice.value,
                        image: e.target.result, 
                        quantity: fruCount.value,
                    };
                    fruitList.push(fruit);
                    console.log(fruitList);
                    showData();
                    localStorage.setItem(
                      "fruitList",
                      JSON.stringify(fruitList)
                    );
                };
                reader.readAsDataURL(file);
            }
}


function showData(){
  let cartona='';
  for(i=0;i<fruitList.length;i++){
    cartona += `
      <div class="card">
      <div class="card-img">
                                <img src="${fruitList[i].image}" alt="${fruitList[i].image}">
                            </div>
                            <div class="card-info">
                                <h3>${fruitList[i].name}</h3>
                                <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                                <div class="price">
                                    <p>${fruitList[i].discountedPrice}$ <span class="old-price">${fruitList[i].oldPrice}$</span></p>
                                </div>
                                <div class="flex-que">
                                     <div class="quantity">
                <button onclick="decreaseQuantity(${i})">-</button>
                <input id="quantity" type="text" value="${fruitList[i].quantity}" readonly>
                <button onclick="increaseQuantity(${i})">+</button>
            </div>
                                    <div class="btn">
                                        <button class="buy-now">BUY NOW</button>
                                    </div>
                                </div>
                            </div>
      </div>
    `;
  }
  document.getElementById("catalog").innerHTML = cartona;
}
 function increaseQuantity(index) {
   fruitList[index].quantity++;
   document.getElementById(`quantity`).value =
     fruitList[index].quantity;
 }

 function decreaseQuantity(index) {
   if (fruitList[index].quantity > 1) {
     fruitList[index].quantity--;
     document.getElementById(`quantity`).value =
       fruitList[index].quantity;
   }
 }

