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
    deleteaSofa() 
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

 function deleteaSofa () { 

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

let formCheck = {
  firstName: false,
  lastName: false,
  email: false,
  address: false,
  city: false,
}


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
      formCheck.firstName = false;
    } else {
     // form.push({name: firstName.value})
      //console.log("formulaire", form);
      textName.innerHTML = ""
      formCheck.firstName = true;
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
      formCheck.lastName = false;
    } else {
      //form.push({name2:lastName.value})
      //console.log("formulaire", form);
      textName.innerHTML = ""
      formCheck.lastName = true;
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
      formCheck.address = false;
    } else {
      textName.innerHTML = ""
      formCheck.address = true;
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
      formCheck.city = false;
    } else {
      textName.innerHTML = ""
      formCheck.city = true;
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
      formCheck.email = false;
    } else {
      textName.innerHTML = ""
      formCheck.email = true;
    }
  })
  
   
} 



//------------------------Créer un tableau avecs les ids des produits commandés

let jeudi = sofa[1].id //  pour sortir les'IDs des produits du local storage
console.log("jeudi", jeudi);

let listOfIds = []

for (let y = 0; y <sofa.length; y++) {
  let IDS = sofa[y].id
  listOfIds.push(IDS)
}

console.log("listOfIds", listOfIds);
// La partie du dessus fonctionne

//---------Rassembler les données a transmettre a l'API
/* let orderInfos =
function createOrderInfos() {
    orderInfos = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          address: address.value,
          city: city.value
        },
        products: listOfIds
    }
} */

//console.log("orderInfos", orderInfos);
///////


//-----------



//-------------------------------------- Effet du boutton commander

const butonSendForm = document.getElementById('order');

butonSendForm.addEventListener('click', (e) => {
  e.preventDefault();
  console.log("RéponseFormulaire");

  //Récupération des valeur du formulaire
 
  

  console.log("formCheck", formCheck);
  console.log(firstName.value)

  if (formCheck.firstName && formCheck.lastName && formCheck.address && formCheck.city && formCheck.email) {
    //on envoie
    
   const promise01 = fetch("http://localhost:3000/api/products/order", {

      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      
        
      body: JSON.stringify({
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          address: address.value,
          city: city.value
        },
        products: listOfIds
      }),
         //
    })
    
    
    
    .then(function(response) {
      if (response.ok) {
        return response.json()
      }
    })
    
    .then(function(data) {
      
      
      document.location.href = "confirmation.html?orderId=" + data.orderId  //a verifier
      //localsotage.clear();
    })
     .catch(function(err){

    }) 
    console.log("firstName", firstName);

    //-------------------ce qui s'envoit va au dessus
    console.log("promise01", promise01); // Le console log marche ici
    console.log("ca marche enfin");
  } else {
    alert("Veuillez remplir correctement le formulaire")
  } 

  

}) // fin d'effet du bouton commander












