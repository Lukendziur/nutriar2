
window.addEventListener('DOMContentLoaded', () => {
  fillShoppingCart()
  confirmButton()
});

const leerShopingCartTitle = document.getElementById('leerShopingCart')
const leerShoppingCartTitle2 = document.getElementById('leerShoppingCartTitle2')
const emptyCartImg = document.getElementById('emptyCartImg')
const containerProduct = document.getElementById('items') 
const productTitle = document.getElementById('ProductsTitle')
const totalAmountContainer = document.getElementById('amountsCart')
/**
 * getSelectedProducts
 * @returns array
 */
const getSelectedProducts = () =>{
  try{
    if(localStorage.shoppingCartStorage){
        let shoppingCart = JSON.parse(localStorage.getItem('shoppingCartStorage'))
      return shoppingCart
      }
}catch(e){
  console.error({title: 'Error in getSelectedProducts function', details: e})
  
}
}

let selectedProducts = getSelectedProducts()


/**
 * fillShoppingCart
 */
const fillShoppingCart = () => {

  try{
  if (selectedProducts) {
    if (selectedProducts.length <= 0) {  
    productTitle.classList.add('titleDisplayNone')
    leerShopingCartTitle.classList.remove('titleDisplayNone')
    leerShoppingCartTitle2.classList.remove('titleDisplayNone')
    emptyCartImg.classList.remove('titleDisplayNone')    
  } else {
    productTitle.classList.remove('ProductsTitles')
    leerShopingCartTitle.classList.add('titleDisplayNone')
    leerShoppingCartTitle2.classList.add('titleDisplayNone')
    emptyCartImg.classList.add('titleDisplayNone')
    productTitle.classList.remove('titleDisplayNone')
  }
  }

  containerProduct.innerHTML = ''

  const template = document.querySelector('#template-shoppingCart').content
  const fragment = document.createDocumentFragment()
  if (selectedProducts) {
    selectedProducts.forEach((prod) => {
    template.querySelector('.productsDetails h4').textContent = prod.productTitle
    template.querySelector('.productsDetails img').src = prod.image 
    template.querySelector('.optionsCart .price ').textContent = `$${prod.productPrice * prod.quantity}`
    template.querySelector('.optionsCart .numberInput ').textContent = prod.quantity
    
    // Small Buttons
    template.querySelector('.plus').id = prod.id
    template.querySelector('.minus').id = prod.id


    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

  })
  }

  containerProduct.appendChild(fragment)

  fillTotalAmount()
  buttonActions()

}catch(e){
  console.error({title: 'Error in fillShoppingCart function', details: e})
  
}

}



/**
 * fillTotalAmount
 * @returns 
 */
const fillTotalAmount = () => {

try{
    totalAmountContainer.innerHTML = ''
    // Elimino el carrito
    if(selectedProducts && selectedProducts.length === 0){
      containerProduct.innerHTML = "" 
      localStorage.clear()  
      return
    }

    const template = document.getElementById('totalAmount').content
    const fragment = document.createDocumentFragment()

    if (selectedProducts && selectedProducts.length > 0) {
      productTitle.classList.remove('ProductsTitle')
    const totalAmount = selectedProducts.reduce((a, {quantity, productPrice}) => a + quantity * productPrice, 0)
      template.querySelector('.totalmounts #total').textContent = `Total con envío $${totalAmount}`
      const clone = template.cloneNode(true)
      fragment.appendChild(clone)
      containerProduct.appendChild(fragment)
      const deleteCart = document.getElementById('buttonDeleteCart')
    deleteCart.addEventListener('click', () => {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        text: "No se podrá recuperar el carrito",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, borrar el carrito!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'El carrito fue eliminado.',
            'success'
          )
          productTitle.classList.add('ProductsTitles')
          leerShopingCartTitle.classList.remove('titleDisplayNone')
          leerShoppingCartTitle2.classList.remove('titleDisplayNone')
          emptyCartImg.classList.remove('titleDisplayNone')



            selectedProducts = []
            localStorage.clear() 
            fillTotalAmount()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu carrito está a salvo :)',
            'error'
          )
        }
      })

    })

    }
}catch(e){
  console.error({title: 'Error in fillTotalAmount function', details: e})
  
}
}

/**
 * buttonActions
 */
const buttonActions = () => {
  try{
      const addButtons = document.querySelectorAll('#items .plus')
        const deleteButtons = document.querySelectorAll('#items .minus')
        
        addButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            //   Se agrega al objeto que tenemos.
            selectedProducts.forEach((prod) => {
              if (btn.id == prod.id) {
                prod.quantity++
              
            }
            })      
            // Se agrega a localStorage
            localStorage.clear()
            localStorage.setItem('shoppingCartStorage',JSON.stringify(selectedProducts))
        fillShoppingCart()
        
        })
        })
        
        deleteButtons.forEach(btn => {
          btn.addEventListener('click', () => {
            selectedProducts.forEach((prod) => {
              if (prod.quantity > 1) {
                if (btn.id == prod.id) {
                  prod.quantity--
                
              }
              }else{
                if(btn.id == prod.id){
            let index = selectedProducts.indexOf(prod)
            selectedProducts.splice(index, 1)

            }
              } 

            })

        if (!selectedProducts || selectedProducts.length <= 0) {
          productTitle.classList.add('ProductsTitles') 
        }

          // Se agrega a localStorage
          localStorage.clear()
          localStorage.setItem('shoppingCartStorage',JSON.stringify(selectedProducts))

        
        fillShoppingCart()
        })
        })
  }catch(e){
    console.error({title: 'Error in buttonActions function', details: e})
    
  }
 
  }

/**
 * confirmButton
 */
const confirmButton = () => {
  try{
    
    const btnConfirm = document.getElementById('buttonConfirm')
    if (btnConfirm) {
        btnConfirm.addEventListener('click', () =>{

      Swal.fire({
          title: 'Confirmación',
          text: 'Su compra ha sido realizada con éxito',
          icon: 'success',
          showConfirmButton: false,
          timer: 1700
        })
      })
    }    
  }catch(e){
    console.error({title: 'Error in confirmButton function', details: e})
  }
}
