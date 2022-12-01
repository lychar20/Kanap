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

  })
     

} else {
    document
   .getElementById("cart__items")
   .innerHTML = "NANNNNNNNN";
    
}




// Les Fonctions

function displayProduct () {
  document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${value._id}" data-color="${canap.couleur}">
              <div class="cart__item__img">
              <img src="${value.imageUrl}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${value.name} </h2>
                  <p>${canap.couleur}</p>
                  <p>${value.price} euros </p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>${canap.nombre} </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.nombre}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`;
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