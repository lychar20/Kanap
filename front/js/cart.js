let sofa = JSON.parse(localStorage.getItem("sofas"));
console.log("sofa", sofa);

let panierentier = []

let allPromises = []

if (sofa != null ) {

  sofa.forEach(canap => {

  const promise =  fetch(`http://localhost:3000/api/products/${canap.id}`)         

        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            //console.log("value", value);    
            
             panierentier.push({
             id: value._id,    // talbeau value
             nom: value.name,
             image: value.imageUrl,
             prix: value.price,    // tableau value
             quantite: canap.nombre,   //canap.nombre
             couleur: canap.couleur    //canap.couleur
            })                
             })
          .catch(function(err) {
            
          })   
    
          allPromises.push(promise)
  });                                   //jusqu'a la c'est bon

  Promise.all(allPromises).then(() => {
    console.log("PanierEntier", panierentier)

    displayProduct()
    calculTotal()
    //addEventOnButton() 
    changeQuantity()

  })
     

} else {
    document
   .getElementById("cart__items")
   .innerHTML = "NANNNNNNNN";
    
}




// Les Fonctions

function displayProduct () {

  panierentier.map((product) => {
    document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.couleur}">
    <div class="cart__item__img">
    <img src="${product.image}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.nom} </h2>
        <p>${product.couleur}</p>
        <p>${product.prix} euros </p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>${product.quantite} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
})
  
}


function calculTotal () {
  let prixTotalCalcul = [];
            let quantiteTotalCalcul = [];

            for (let m = 0; m < panierentier.length; m++) {
              let prixProduitsDanslePanier =  panierentier[m].prix * panierentier[m].quantite;
              let quantiteDansLePanier = parseInt(panierentier[m].quantite);  //panierentier[m].quantite


              prixTotalCalcul.push(prixProduitsDanslePanier)
              quantiteTotalCalcul.push(quantiteDansLePanier)

              console.log("PrixTotalCalcul", prixTotalCalcul);
              console.log("quantiteTotalCalcul", quantiteTotalCalcul);
            }

            //Additionner les prix du tableau prixTotalCalcul et les quantite

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const prixTotal = prixTotalCalcul.reduce(reducer, 0);
            console.log("prixTotal", prixTotal);

            const quantiteTotal = quantiteTotalCalcul.reduce(reducer, 0);
            console.log("quantiteTotal", quantiteTotal);

            //Le code HTML du prix a afficher et les quantités
            document.querySelector('#totalPrice').innerHTML =  `${prixTotal}`
            document.querySelector('#totalQuantity').innerHTML = `${quantiteTotal}`
}



 // changer la quantité

/*  function addEventOnButton() {

  const changequantity = document.querySelectorAll('.itemQuantity');
  console.log("changequantity", changequantity)
  
 
 changequantity.addEventListener('change', (event) => {
   //const newquantity = document.querySelector('cart__item__content__settings__quantity');  
   //newquantity.innerHTML = ` ${event.target.value} `;

 })

 }
 */

/*  function changeQuantity() {

  let itemQuantity = document.querySelectorAll('.itemQuantity');
  itemQuantity.forEach((item) => {
    item.addEventListener('change', function() {
      newQuantity = parseInt(item.value);
      let article = item.closest("article");
      productID = article.getAttribute("data-id");
      productColor = article.getAttribute("data-color");
      let product = JSON.parse(localStorage.getItem(productID + ";" + productColor));
      product.qte = newQuantity;
      console.log(product)
      console.log(newQuantity)
      localStorage.setItem(product + ";" + productColor, JSON.stringify(product))
      displayTotal()
    })
  })
 }
 */

 function changeQuantity() {
  
 }