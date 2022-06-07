let shoppingCart = [];
const storage = JSON.parse(localStorage.getItem("shoppingCartStorage"));
let circle = document.getElementById("circle");
storage ? circle.textContent = storage.length : ''


const fetchData = async () => {
  try {
    const response = await fetch("../products.json");
    const data = await response.json();
    renderProducts(data);
    // let storage = JSON.parse(localStorage.getItem("shoppingCartStorage"));

    if (storage) {
      console.log('Compare');
      compareProducts(data);
    } else {
      console.log('Inicio desde 0');

      addProduct(data);
    }
  } catch (e) {
    console.error({ error: true, message: e });
  }
};
fetchData();

const compareProducts = (data) => {
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

        const newArr = shoppingCart.concat(JSON.parse(storage));
        if (newArr.length >= 0) {
                  circle.textContent = newArr.length
                }
        localStorage.clear();
        localStorage.setItem("shoppingCartStorage", JSON.stringify(newArr));
       
      }
    });
  });
};

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
  });
};

const addProduct = (data) => {
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
        circle.textContent = shoppingCart.length
      }
      addProductToShoppingCart(shoppingCart);
    });
  });
};

const addProductToShoppingCart = (shoppingCart) => {
  shoppingCart = [...new Set(shoppingCart)];
  localStorage.setItem("shoppingCartStorage", JSON.stringify(shoppingCart));

};
