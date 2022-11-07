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


const local = Json.parse(localStorage.getItem("sofa"));

addToCart.onclik = () =>{
    const sofa = {
        id: `${value.price}`
    }

    localStorage.setItem("id", JSON.stringify(sofa));
}