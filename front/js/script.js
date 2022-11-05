fetch('http://localhost:3000/api/products')
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    console.log(value);
    
    for (let product of value) {
        document.querySelector('#items').innerHTML  += `<a href="./product.html?id=${product._id} ">
        <article>
          <img src="${product.imageUrl} " alt="${product.altTxt}">
          <h3 class="productName"> ${product.name}</h3>
          <p class="productDescription"> ${product.description} </p>
        </article>
      </a>`;
        
        
    }
    
    
})
.catch(function(err) {
  
})
