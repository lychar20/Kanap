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
             nombre: canap.nombre,   //canap.nombre
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
    addEventOnButton() 
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
          <p>Qté: </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.nombre}">
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
  console.log("calculT", panierentier);
  let prixTotalCalcul = [];
            let quantiteTotalCalcul = [];

            for (let m = 0; m < panierentier.length; m++) {
              let prixProduitsDanslePanier =  panierentier[m].prix * panierentier[m].nombre;
              let quantiteDansLePanier = parseInt(panierentier[m].nombre);  //panierentier[m].quantite


              prixTotalCalcul.push(prixProduitsDanslePanier)
              quantiteTotalCalcul.push(quantiteDansLePanier)

              // console.log("PrixTotalCalcul", prixTotalCalcul);
              //console.log("quantiteTotalCalcul", quantiteTotalCalcul); 
              
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



  function changeQuantity() {

  let itemQuantity = document.querySelectorAll('.itemQuantity');
  console.log ("itemQuantity", itemQuantity);
  itemQuantity.forEach((item) => {
    item.addEventListener('change', function(e) {
      console.log(e.target.value);
      let article = e.target.closest("article");
      console.log("article", article);
      productID = article.getAttribute("data-id");
      productColor = article.getAttribute("data-color");

      let index = sofa.findIndex(p => p.id == productID && p.couleur == productColor)
      console.log("index", index);

      sofa[index].nombre = e.target.value
      panierentier[index].nombre = e.target.value // a bosser
      console.log("coucou", sofa[index].nombre);
      

      localStorage.setItem("sofas", JSON.stringify(sofa));
     
      calculTotal()
     
    })
  })
 }
 


console.log('salut cava?')

 function addEventOnButton () { 

  let deleteproduct = document.querySelectorAll('.deleteItem');
  console.log ("deleteproduct", deleteproduct);

   deleteproduct.forEach((thing) => {
    thing.addEventListener('click', function(e) {
      
      console.log('ca marche');
      console.log(e.target.value);
      
      
      let article2 = e.target.closest("article");
      console.log("article2", article2);
      productID2 = article2.getAttribute("data-id");
      productColor2 = article2.getAttribute("data-color");

      let indexDelete = sofa.findIndex(p => p.id == productID2 && p.couleur == productColor2)
      console.log("indexDelete", indexDelete);
      sofa.splice(indexDelete, 1)
      panierentier.splice(indexDelete, 1) 

      /* sofa = sofa.filter(p => p.id !== productID2 && p.couleur !== productColor2);
      panierentier = sofa.filter(p => p.id !== productID2 && p.couleur !== productColor2); */
      
      localStorage.setItem("sofas", JSON.stringify(sofa));
      article2.remove();
     
      alert("Ce produit a été supprimé du panier");
      //window.location.href = "cart.html";
      //location.reload();

      calculTotal ()
      
    
    })
  }) 

 }




//Fonction pour verifier le prénom

let form = []


  validName ()

function validName () {
  let name = document.getElementById("firstName");
  let textName = document.getElementById("firstNameErrorMsg");

  name.addEventListener('input', function (e) {
    let pattern = /^([a-zA-Z]{2,20})$/;
    let currentValue = e.target.value;
    //console.log("currentValue", currentValue);
    let valid = pattern.test(currentValue);
   

    if (!valid) {
      textName.innerHTML = "Votre nom doit etre entre deux et vingt caractères"
      return false;
    } else {
     // form.push({name: firstName.value})
      //console.log("formulaire", form);
      textName.innerHTML = ""
      return true;
    }
  })
  
   
} 


//Fonction pour verifier le nom

validLastName ()

function validLastName () {
  let lastname = document.getElementById("lastName");
  let textName = document.getElementById("lastNameErrorMsg");

  lastname.addEventListener('input', function (e) {
    let pattern = /^([a-zA-Z]{2,20})$/;
    let currentValue = e.target.value;
    //console.log("currentValue", currentValue);
    let valid = pattern.test(currentValue);
   

    if (!valid) {
      textName.innerHTML = "Votre nom doit etre entre deux et vingt caractères"
      return false;
    } else {
      //form.push({name2:lastName.value})
      //console.log("formulaire", form);
      textName.innerHTML = ""
      return true;
    }
  })
  
   
} 

// Fonction valide adresse

validAddress ()

function validAddress () {
  let address = document.getElementById("address");
  let textName = document.getElementById("addressErrorMsg");

  address.addEventListener('input', function (e) {
    let pattern = /^([A-Za-z0-9\s\-]){5,50}$/;
    let currentValue = e.target.value;
    //console.log("currentValue", currentValue);
    let valid = pattern.test(currentValue);
   

    if (!valid) {
      textName.innerHTML = "Veuillez rentrer une adresse valide"
    } else {
      textName.innerHTML = ""
    }
  })
  
   
} 

//Fonction valide ville

validVille ()

function validVille () {
  let city = document.getElementById("city");  //email
  let textName = document.getElementById("cityErrorMsg");  //emailErrorMsg

  city.addEventListener('input', function (e) {
    let pattern = /^([A-Za-z\s\-]){5,50}$/;   //  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let currentValue = e.target.value;
    //console.log("currentValue", currentValue);
    let valid = pattern.test(currentValue);
   

    if (!valid) {
      textName.innerHTML = "Veuillez rentrer une ville"
    } else {
      textName.innerHTML = ""
    }
  })
  
   
} 

// Fonction valide email

validEmail ()

function validEmail () {
  let email = document.getElementById("email");  // city
  let textName = document.getElementById("emailErrorMsg");  //cityErrorMsg

  email.addEventListener('input', function (e) {
    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;      // /^([A-Za-z0-9\s\-]){5,50}$/;
    let currentValue = e.target.value;
    console.log("currentValue", currentValue);
    let valid = pattern.test(currentValue);
   

    if (!valid) {
      textName.innerHTML = "Veuillez rentrer un email valide"
    } else {
      textName.innerHTML = ""
    }
  })
  
   
} 


// Effet du boutton commander

const butonSendForm = document.getElementById('order');

butonSendForm.addEventListener('click', (e) => {
  console.log("RéponseFormulaire");

  //Récupération des valeur du formulaire
 
  const formValues = {
    prenom: document.getElementById("firstName").value,
     nom: document.getElementById("lastName").value,
    adresse: document.getElementById("address").value,
    ville: document.getElementById("city").value,
    email: document.getElementById("email").value
  }

  console.log("formValues", formValues);

  if (validName ()) {
    console.log("ca marche");
  } else {
    console.log("stop");
  }

}) // fin d'effet du bouton commander




// Fonction validation abrégée




/* validInput("firstName", "/^([a-zA-Z]{2,20})$/", "Votre prenom doit etre entre trois et vingt caractères")
validInput("lastName", "/^([a-zA-Z]{2,20})$/", "Votre nom doit etre entre trois et test caractères" )

      function validInput (input, regex, msg) {
        let dat = document.getElementById(input);
        let textName = document.getElementById("firstNameErrorMsg");
      
        dat.addEventListener('input', function (e) {
          let pattern = /^([a-zA-Z]{2,20})$/;
          let currentValue = e.target.value;
          console.log("currentValue", currentValue);
          let valid = pattern.test(currentValue);
         console.log("valid", valid)
      
          if (!valid) {
            textName.innerHTML = msg
          }
           else {
            textName.innerHTML = ""            
        }
       })   
         
      }  */
 







