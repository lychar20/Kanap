fetch('http://localhost:3000/api/products')
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(value) {
    console.log(value);
    
    for (let product of value) {
        document.querySelector('#items').innerHTML  += `<a href="./product.html?id=42">
        <article>
          <img src="${product.imageUrl} " alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName"> ${product.name}</h3>
          <p class="productDescription"> ${product.description} </p>
        </article>
      </a>`;
        
        
    }
    
    
})
.catch(function(err) {
  
})
