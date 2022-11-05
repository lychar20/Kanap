//document
//.getElementById("title")
//.innerText = "Canapé1";



 console.log("Window Location:", window.location);

 const myKeysValues = window.location.search;
 console.log("Keys & Values:", myKeysValues);

 const urlParams = new URLSearchParams(myKeysValues);

 const param1 = urlParams.get('id');

 console.log("ID:", param1);


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


document
.getElementsByClassName("item__img")
.innerText =`<img src="${value.imageUrl}" alt="${value.altTxt}">`;



})

.catch(function(err) {
  
})

