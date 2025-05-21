let quantityboxes=document.querySelectorAll(".food_quantity")
let cartIcon=document.querySelector(".fa-cart-shopping")
let cartItems=document.getElementById("cart_items")
let cartPrice=document.getElementById("price")

let cartPopup=document.createElement("div")
document.body.appendChild(cartPopup)
cartPopup.id="cart_popup"
// cartPopup.style.height="200px"
cartPopup.style.width="270px"
cartPopup.style.border="3px solid black"
cartPopup.style.position="fixed"
cartPopup.style.borderRadius="15px"
cartPopup.style.backgroundColor="white"
cartPopup.style.top="90px"
cartPopup.style.right="75px"
cartPopup.style.padding="15px"
cartPopup.style.display="none"

cartIcon.addEventListener("click",()=>{
    if(cartPopup.style.display=="none"){
        cartPopup.style.display="block"
    }else{
     cartPopup.style.display="none"   
    }
});

let cart={}
quantityboxes.forEach((box)=>{
    let icons=box.querySelectorAll("i");
    let minusBtn=icons[0];
    let plusBtn=icons[1];
    let card=box.closest(".card_container")
    let title=card.querySelector(".food_title").innerText
    let price=parseInt(card.querySelector(".food_price").innerText)
    
    function updateCart(){
        let totalQty=0;
        let totalPrice=0;
        cartPopup.innerHTML=""
        for(let item in cart){
            let qty=cart[item].quantity
            let itemPrice=cart[item].price
            totalQty+=qty
            totalPrice+=qty*itemPrice
            cartPopup.innerHTML += `<p>${item} x ${qty} = <i class="fa-solid fa-indian-rupee-sign"></i> ${qty * itemPrice.toFixed(2)}</p>`
        }
        cartItems.innerText=totalQty
        cartPrice.innerHTML=`<i class="fa-solid fa-indian-rupee-sign"> ${totalPrice.toFixed(2)}`
    }
    
    function setQuantity(qty){
        box.innerText="";
        box.append(minusBtn,qty,plusBtn)
    }
    
    minusBtn.addEventListener("click",()=>{
        let current=parseInt(box.innerText)
        if(current>0){
            current--
            if(current==0){
                delete cart[title]
            }else{
                cart[title].quantity=current
            }
        }
        updateCart()
        setQuantity(current)
      })
    
      plusBtn.addEventListener("click",()=>{
        let current=parseInt(box.innerText)
        current++
       cart[title]={
        quantity:current,
        price:price
       }
        updateCart()
        setQuantity(current)
      })
});