// carrito de compras 
// consumo una api  y genero el dom 
// con el evento click  sumo los productos al carrito cuando apreto en el carrito(que esta en el medio ) aparece todos los productos seleccionados 
// lo que que esta en el carrito lo guardo en el local storang asi si refrescamos la pagina sigue quedando guardado almenos que pongamos el boton de enviar que borra el local storange
// ahi mismo suma y resta  totales dependiendo de si le ponemos o sacamos 
// si queremos poner numeros negativos en el input esta programado para no dejar 
// cuando ponemos enviar nos sale una alerta de a libreria de felicitaciones  tu compra realizada

const mainContainer = document.querySelector(".mainContainer")
const asynchronousRequest = async () => {
  const res = await
    fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
  const parsedInformation = await res.json()



  parsedInformation.forEach((element) => {
    const products = document.createElement("div")
    products.className =  "productContainer"     
    products.innerHTML =
      `
        <div class="divcontenedor card style=width: 18rem;"> 
        <img class="img  card-img-top" src="${element.images[0]}" alt="">
        <h3 class="producto card-title">${element.title}</h3>
        <p>precio:</p>
        <p class="precioproduc card-text"> ${element.price}$</p> 
       
         <button class="button btn btn-primary  " >enviar</button>
         
         </div>
    `



    mainContainer.appendChild(products)

  })




  // aca le hago que haga click a todos los botons 
  // genero una funcion(clickdebotton)
  let buttonProducts = document.querySelectorAll(".button")

  buttonProducts.forEach((event) => {
    event.addEventListener("click", clickdebutton)

    function clickdebutton(e) {
      const button = e.target;

      // con el atributo closest ingreso al div por la clase y cuando oprimo el boton me envia el mas cercano 
      let buttonFind = button.closest('.productContainer')
      let picture = buttonFind.querySelector(".img").src;

      let products = buttonFind.querySelector(".producto").textContent;
      let price = buttonFind.querySelector(".precioproduc").textContent;
      

      cArrito(picture, products, price);


    }
  });





}

asynchronousRequest()


// aca lo pego en el carrito
// este lo traigo del html
// objeto constructor para almacenar en localstorange
const shoppingCartModal = document.querySelector(".shoppingcartmodal")



class allProduct {
  constructor(imagen, producto, precio) {
    this.imagen = imagen;
    this.producto = producto;
    this.precio = precio;
  }

}
let cartStorage = []


const Noduplicarcarrito = shoppingCartModal.getElementsByClassName('producto');


function cArrito(imgprins, poductoss, precioprod) {


  cartStorage.push(new allProduct(imgprins, poductoss, precioprod))

  
  for (let i = 0; i < Noduplicarcarrito.length; i++) {
    Noduplicarcarrito[i].textContent
    if (Noduplicarcarrito[i].textContent === poductoss) {
      // aca con parentnode hago que al agregar no se dulique en el carrito el mismo elemento
      // parent element si esta en el index y parent node si lo creamos con el dom
      let noduplicar = Noduplicarcarrito[i].parentNode.parentNode.querySelector('.cantidadprod');
      //  aca se suma la cantidad y y la funcion para sumar y return(retorne) para cortar y que se vuelva aejecutar
      noduplicar.value++;
      totalshopingcard()
      return;

    }


  }


  //  para multiplicar la cantidad por el precio y lo parseo
  // para acceder al boton de eliminar entramos a el div que lo contiene no a  document
  let containerShoppingCarts= document.createElement("div")
  containerShoppingCarts.className = "divcarrito"

  containerShoppingCarts.innerHTML =
    `
  <div class="divcontenedo card style=width: 18rem;">

  
  <img class="imgcarrito  card-img-top" src="${imgprins}" alt="">
  <h3 id="producto" class="producto card-title">${poductoss}</h3>
  
  <p class="precioproduc">${precioprod}</p> 
 
  <input class="cantidadprod" type="number" value="1">
 
   
   <button class="butoneliminar  btn btn-primary" >eliminar</button>
   </div>
`

shoppingCartModal.appendChild(containerShoppingCarts)


  // declaro la funcion para el boton eliminar y usarlo despues abajo 
  containerShoppingCarts.querySelector('.butoneliminar').addEventListener('click', botoneliminar)
  containerShoppingCarts.querySelector('.cantidadprod').addEventListener('change', botoncambiodecanmtidad)









  totalshopingcard()


}


function totalshopingcard() {

  let totalShopingCard = 0;

  let totalShopingCardParse= 0

  let cardtotal = document.querySelectorAll('.divcarrito')

  cardtotal.forEach(cardtotal => {

    const totalprecio = cardtotal.querySelector('.precioproduc')

    const cardetotalprecios = Number(totalprecio.textContent.replace(
      '$',
      ''
    ))

    const cantidadtotal = cardtotal.querySelector('.cantidadprod')
    //  de aca obtengo la cantidad de productos la recorro con el foreach y la pego con el inerhtml
    // aprovecho el foreach del total 
    const cantidadtotalparse = Number(cantidadtotal.value)

    totalShopingCardParse += cantidadtotalparse

    totalShopingCard  = totalShopingCard  + cardetotalprecios * cantidadtotalparse

    addLocalStorage()

  })

  const spambuttom = document.getElementById('spanbutton')

  spambuttom.innerHTML = `${totalShopingCardParse} item`
  const totaldelcarritodecompras = document.querySelector('.divprueba3')


  totaldelcarritodecompras.innerHTML = `
  <h1>Total: ${totalShopingCard} $</h1>   

  <button class="btnenviar   btn btn-primary">enviar</button> 
   `
  const btnenviar = document.querySelector('.btnenviar')
  btnenviar.addEventListener('click', comprarboton)

  addLocalStorage()


}
//cuando compro vacia el local storange con clear 
// aca hago la cliack al boton de comprar y borro su interior cuando pongo en comprar ycon l funcion de sumar totales se borra el total 
function comprarboton() {
  swal({
    title: "FELICITACIONES!",
    text: "tu compra se realizo con exito!",
    icon: "success",
    button: "confirmar!",
  });
  shoppingCartModal.innerHTML = ""

  totalshopingcard()
  localStorage.clear()


}



// aca pego lo que entra al carrito al local storange
function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(cartStorage))

}



// parseo lo que guarde en el local storange si hay algo entra y lo pega en el carrito de arriba 
let storang = JSON.parse(localStorage.getItem('carrito'));

if (storang) {

  for (const carrito of storang) {
    const imagenlocal = carrito.imagen
    const productolocal = carrito.producto
    const precioprodlocal = carrito.precio

    cArrito(imagenlocal, productolocal, precioprodlocal)

  }

}




// cons esto lo que hacemos en eliminar los productosdel carrito 
function botoneliminar(e) {
  const botoneliminar = e.target;
  botoneliminar.closest('.divcarrito').remove();

  // aca pego la funcion para que sume y reeste 
  totalshopingcard()
  localStorage.clear()


}
// aca es la funciondee cambio de precio
function botoncambiodecanmtidad(e) {

  const cambiototal = e.target;
  if (cambiototal.value <= 0) {
    cambiototal.value = 1;
  }

  totalshopingcard()
}










