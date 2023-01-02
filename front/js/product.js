//document
//.getElementById("title")
//.innerText = "Canapé1";


//Récupération de la variable ID de l'URL

 console.log("Window Location:", window.location);

 const myKeysValues = window.location.search;
 console.log("Keys & Values:", myKeysValues);

 const urlParams = new URLSearchParams(myKeysValues);

 const param1 = urlParams.get('id');

 console.log("ID:", param1);


 //Fonction qui montre les différents canapés et les options 

 fetch(`http://localhost:3000/api/products/${param1}`)
 .then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    console.log(value);    
    
document
.getElementById("title")
.innerText = `${value.name}`;

document
.getElementById("description")
.innerText = `${value.description}`;

document
.getElementById("price")
.innerText = `${value.price}`;


document.querySelector(".item__img").innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}">`;


console.log(value.colors.length);
for (let i = 0; i < value.colors.length; i++) {
    document.querySelector('#colors').innerHTML  += `<option value= "${value.colors[i]}"> ${value.colors[i]} </option>
    `
}


})

.catch(function(err) {
  
})





//Fonction pour storer les choix dans la page panier



function saveBasket(sofas) {
    // on enrigistre le tableau dans le local storage
    localStorage.setItem("sofas", JSON.stringify(sofas));
}

function getBasket () {
    let sofa = localStorage.getItem("sofas");
    if (sofa == null) {
        return [];
    } else {
        return JSON.parse(sofa);
    }
}

function addBasket(product) {

    // on récupère le LocalStorage dans une variable temporaire
    let sofaFromLS = getBasket();
    console.log("sofaFromLS",sofaFromLS);
    // on ajoute le produit à la variable temporaire
    let foundProduct = sofaFromLS.find(p => p.id == param1 && p.couleur == colors.value);
    console.log("foundProduct", foundProduct);
    if (foundProduct != undefined) {
        foundProduct.nombre = parseInt(foundProduct.nombre) + parseInt(quantity.value);
        //let additionQuantité = parseInt(foundProduct.nombre) + parseInt(quantity.value);
       // foundProduct.nombre = JSON.stringify(additionQuantité);
    } else {
    // Ici pour rentrer les tests
    sofaFromLS.push(product);
    console.log("sofaFromLS + nouveau produit",sofaFromLS);
}
    // on enregistre la variable temporaire (le panier au complet) dans le LocalStorage
    saveBasket(sofaFromLS);

}

//const local = JSON.parse(localStorage.getItem("sofa"));



const elementclique = document.getElementById('addToCart');

elementclique.addEventListener('click', function(event) {

    const sofa = { 
        id: param1,
        nombre: quantity.value,
        couleur: colors.value
    }    


    let myInput = document.getElementById('quantity');
    let myInput2 = document.getElementById('colors');

    if ( myInput.value == 0 && myInput2.value == "") { 
        alert("choississez une quantité et une couleur");
        e.preventDefault();
    } else if (myInput2.value == "") { 
        alert("choississez une couleur");
     } else if (myInput.value == 0) { 
        alert("choississez une quantité");
     }
      else { 
    addBasket(sofa);
}



}); 



/* if ( quantity.value = 3 ) { 
    alert("choississez une quantité");
} else { 
addBasket(sofa);
} */