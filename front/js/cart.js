/* document
.getElementById("cart__items")
.innerHTML = "enfin sur chrome"; */

/* let sofa = JSON.parse(localStorage.getItem("sofas"));

if (sofa != null ) {
    document
.getElementById("cart__items")
.innerHTML = "enfin sur chrome";
} else {
    document
    .getElementById("cart__items")
    .innerHTML = "NANNNNNNNN";
}
 */

// Panier 2

let sofa = JSON.parse(localStorage.getItem("sofas"));
console.log("sofa", sofa);

let panierentier = []


if (sofa != null ) {

  sofa.forEach(canap => {

    fetch(`http://localhost:3000/api/products/${canap.id}`)         

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

            console.log(canap)
            console.log(panierentier)
            
            

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


              
             })
          .catch(function(err) {
            
          })   
    
  });
    

    console.log("panierentier", panierentier);    
    
    //

    //

} else {
    document
   .getElementById("cart__items")
   .innerHTML = "NANNNNNNNN";
    
}



// Fonctions de calcul



  /* let prixTotalCalcul = [] */

  

/* for (let m = 0; m < panierentier.length; m++ ){
  let prixProduitsDanslePanier = panierentier[m].prix;
  console.log ("Test1",prixProduitsDanslePanier );
  console.log("Test2", panierentier.length);
  console.log ("Test3", panierentier );

  prixTotalCalcul.push(prixProduitsDanslePanier)

  console.log("prixTotal", prixTotalCalcul);
}  */


console.log("cool2", panierentier.length); 

for (let produit of panierentier) {
  let nouveauTableau = `${produit.prix}`;
}
console.log("PanierPrix", nouveauTableau);

console.log("sofala", sofa.length);


 
 
