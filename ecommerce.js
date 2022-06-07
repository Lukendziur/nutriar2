let shoppingCart = []

let circle = document.getElementById('circle')
if(localStorage.shoppingCartStorage){
  circle.textContent = JSON.parse(localStorage.shoppingCartStorage).length
}



const fetchData = async () => {

  try {
      const response = await fetch("../products.json");
      const data = await response.json();
    renderProducts(data)
    let storage = JSON.parse(localStorage.getItem('shoppingCartStorage'));

    if (storage) {

      console.log('comparo');
      compareProducts(data)

    } else {
      console.log('agrego de 0');

      addProduct(data)
    }
    

  }catch(e){
    console.error({error: true, message: e});
  }
  
};
fetchData()

const compareProducts = (data) =>{
  const buttons = document.querySelectorAll('.cardButton')
 
  buttons.forEach((button) => {  
    
    button.addEventListener('click', () => {
    let storage = JSON.parse(localStorage.getItem('shoppingCartStorage'));

    const product = data.find(item => item.id == button.id)     
      if (!product.quantity) {
        product.quantity = 1
      }

      storage = JSON.stringify(storage)

      if (!storage.includes(JSON.stringify(product))) {
        console.log('entró al if: se setea dicho product');
         shoppingCart.push(product)
         shoppingCart = [...new Set(shoppingCart)]
         
        const newArr = shoppingCart.concat(JSON.parse(storage))

        localStorage.clear()
        localStorage.setItem('shoppingCartStorage', JSON.stringify(newArr))

      }

    })
  })
}





const renderProducts = (data) => {

  const productContainer = document.getElementById("productContainer");
    data.forEach((product) => {
      // Itero los elementos que vienen de mi json y los voy creando en el HTML
      const li = document.createElement("li");
      li.classList.add("card");
      li.innerHTML = `<img src="${product.image}" alt="">
       <div class="detailsP">
           <h5>${product.productTitle}</h5>
               <p class="bookDetails">${product.productDescription}</p>
               <h5>$${product.productPrice}</h5>    
       </div>
       
       `;

      productContainer.appendChild(li);

      // Add button
      const button = document.createElement("button");
      button.id = product.id;
      button.textContent = "Agregar al carrito";
      button.classList.add("cardButton");
      li.appendChild(button);
    })
}

const addProduct = (data) => {
  const buttons = document.querySelectorAll('.cardButton')
 
  buttons.forEach((button) => {  
    
    button.addEventListener('click', () => {
    const product = data.find(item => item.id == button.id)     
      if (!product.quantity) {
        product.quantity = 1
      }

      shoppingCart.push(product)

      shoppingCart = [...new Set(shoppingCart)]

      addProductToShoppingCart(shoppingCart)
    })
  })
}

const addProductToShoppingCart = (shoppingCart) =>{
  // console.log(shoppingCart); 
  let circle = document.getElementById('circle')

  localStorage.setItem('shoppingCartStorage', JSON.stringify(shoppingCart))


  if (JSON.parse(localStorage.shoppingCartStorage).length >= 0) {
    circle.textContent = JSON.parse(localStorage.shoppingCartStorage).length
    
  }
 
}




window.onload = function() {
  //   let storage = JSON.parse(localStorage.getItem('shoppingCartStorage'));
  //   console.log(shoppingCart);

  //   if(storage){
  //     // comparo productos y agrego solo los q no existen
  //   console.log(storage);
  //   shoppingCart = storage;
  //   console.log(shoppingCart);

  //   shoppingCart = [...new Set(shoppingCart)]
  //   localStorage.setItem('shoppingCartStorage', JSON.stringify(shoppingCart))
  //  } else{
  //     //agrego todos
  //     fetchData()
  //   }
  }