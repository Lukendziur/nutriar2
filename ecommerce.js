window.addEventListener('DOMContentLoaded', () => {
  fetchData();
});
let shoppingCart = [];

const storage = JSON.parse(localStorage.getItem("shoppingCartStorage"));
let circle = document.getElementById("circle");
storage ? (circle.textContent = storage.length) : "";

/**
 * fetchData
 */
const fetchData = async () => {
  try {
    const response = await fetch("../products.json");
    const data = await response.json();
    renderProducts(data);

    if (storage) {
      compareProducts(data);
    } else {

      addProduct(data);
    }
  } catch (e) {
    console.error({title: 'Error in fetchData function', details: e});
  }
};


/**
 * compareProducts
 * @param {*} data 
 */
const compareProducts = (data) => {
  try{
  const buttons = document.querySelectorAll(".cardButton");
    let circle = document.getElementById("circle");

    buttons.forEach((button) => {
      let temporalArr = [];
      button.addEventListener("click", () => {
        let storage = JSON.parse(localStorage.getItem("shoppingCartStorage"));

        const product = data.find((item) => item.id == button.id);
        if (!product.quantity) {
          product.quantity = 1;
        }
        storage.forEach((item) => {
          temporalArr.push(item.id);
        });
        storage = JSON.stringify(storage);
        if (!temporalArr.includes(product.id)) {
          shoppingCart.push(product);
          shoppingCart = [...new Set(shoppingCart)];

          let newArr = shoppingCart.concat(JSON.parse(storage));
          newArr.length >= 0 ? (circle.textContent = newArr.length) : "";

          Toastify({
            text: `El libro "${product.productTitle}" ha sido añadido con éxito`,
            duration: 3000,
            style: {
              background:'#b9c94e',
            }
          }).showToast();

          localStorage.clear();
          newArr = newArr.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.id ===
                    value.id &&
                  t.image ===
                    value.image &&
                  t.productDescription === value.productDescription &&
                  t.productPrice === value.productPrice &&
                  t.productTitle === value.productTitle  &&
                  t.quantity === value.quantity
              )
          );

          localStorage.setItem("shoppingCartStorage", JSON.stringify(newArr));
        }
      });
    });
}catch(e){
  console.error({title: 'Error in compareProducts function', details: e})
  
}
 
};

/**
 * renderProducts
 * @param {*} data 
 */
const renderProducts = (data) => {
  try{
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
  });
}catch(e){
  console.error({title: 'Error in renderProducts function', details: e})
  
}
  
};


/**
 * addProduct
 * @param {*} data 
 */
const addProduct = (data) => {
  try{
      const buttons = document.querySelectorAll(".cardButton");
      let circle = document.getElementById("circle");

      buttons.forEach((button) => {
        button.addEventListener("click", () => {

          const product = data.find((item) => item.id == button.id);
          if (!product.quantity) {
            product.quantity = 1;
          }

          shoppingCart.push(product);
          shoppingCart = [...new Set(shoppingCart)];

          if (shoppingCart.length >= 0) {
            circle.textContent = shoppingCart.length;
          }

          Toastify({
            text: `El libro "${product.productTitle}" ha sido añadido con éxito`,
            duration: 3000,
            style: {
              background:'#b9c94e',
            }
          }).showToast();

          addProductToShoppingCart(shoppingCart);
        });
      });
}catch(e){
  console.error({title: 'Error in addProduct function', details: e})
  
}

};

/**
 * addProductToShoppingCart
 * @param {*} shoppingCart 
 */
const addProductToShoppingCart = (shoppingCart) => {
  try{
  shoppingCart = [...new Set(shoppingCart)];
  localStorage.setItem("shoppingCartStorage", JSON.stringify(shoppingCart));
  }catch(e){
    console.error({title: 'Error in addProductToShoppingCart function', details: e})
  }

};

