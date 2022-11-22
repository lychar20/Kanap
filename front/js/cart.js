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
    for (canap of sofa) { // for canap of sofa

        fetch(`http://localhost:3000/api/products/${canap.id}`) 

        

        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            console.log("value", value);    
            
             panierentier.push({
             id: value._id,    // talbeau value
             nom: value.name,
             image: value.imageUrl,
             prix: value.price,    // tableau value
             quantite: canap.nombre,   //canap.nombre
             couleur: canap.couleur    //canap.couleur
            })
           
            
            console.log("panierentier", panierentier);

            
             for (let x of panierentier)   {

                

                    document.querySelector('#cart__items').innerHTML += `<article class="cart__item" data-id="${x.id}" data-color="${x.couleur}">
                    <div class="cart__item__img">
                      <img src="${x.image} " alt="${x.altTxt}">
                    </div>
                    <div class="cart__item__content">
                      <div class="cart__item__content__description">
                        <h2>${x.nom} </h2>
                        <p>${x.couleur}</p>
                        <p>${x.prix} euros </p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                          <p>${x.quantite} </p>
                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </article>`; 

             }
             

             })

             
   
   .catch(function(err) {
     
   }) 

        


    }    // for canap of sofa


    //for pour les panier

 


} else {
    document
   .getElementById("cart__items")
   .innerHTML = "NANNNNNNNN";
    
}



