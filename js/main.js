var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCaregoryInput = document.getElementById('productCaregory');
var productDescInput = document.getElementById('productDesc');
var addBtn = document.getElementById('addBtn');
var inputs = document.getElementsByClassName('form-control');
var products=[];
var currentIndex=0;


if(JSON.parse(localStorage.getItem('productsList'))!=null) {
    products=JSON.parse(localStorage.getItem('productsList'));
    displayProduct();
}


function addProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCaregoryInput.value,
        desc: productDescInput.value,
    };
    products.push(product);
    localStorage.setItem('productsList', JSON.stringify(products));
}

function displayProduct() {
    var cartona='';
    for (var i=0; i<products.length; i++) {
        cartona+=`
            <tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].desc}</td>
                <td><button onclick="(getProductInfo(${i}))" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick="(deleteProduct(${i}))" class="btn btn-outline-danger">Delete</button></td>
            </tr>
        `
        addBtn.innerHTML='Add Product';
        productNameInput.classList.remove('is-valid');
        productPriceInput.classList.remove('is-valid');
        productCaregoryInput.classList.remove('is-valid');
        addBtn.disabled='true';
    }
    document.getElementById('tableBody').innerHTML=cartona;
}

function resetForm() {
    for (var i=0; i<inputs.length; i++) {
        inputs[i].value = '';
    }
}

function deleteProduct(index) {
    products.splice(index,1);
    displayProduct();
    localStorage.setItem('productsList', JSON.stringify(products));
}

function getProductInfo(index) {
    currentIndex=index;
    var currentProduct=products[index];
    productNameInput.value=currentProduct.name;
    productPriceInput.value=currentProduct.price;
    productCaregoryInput.value=currentProduct.category;
    productDescInput.value=currentProduct.desc;

    addBtn.innerHTML="Update Product";
    addBtn.removeAttribute('disabled');
}

function search(searchTxt) {
    var cartona='';
    for (var i=0; i<products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchTxt.toLowerCase())) {
            cartona+=`
            <tr>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].desc}</td>
                <td><button onclick="(getProductInfo(${i}))" class="btn btn-outline-warning">Update</button></td>
                <td><button onclick="(deleteProduct(${i}))" class="btn btn-outline-danger">Delete</button></td>
            </tr>
        `
        }
    }
    document.getElementById('tableBody').innerHTML=cartona;
}

function updateProduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCaregoryInput.value,
        desc: productDescInput.value,
    };
    products[currentIndex]=product;
    localStorage.setItem('productsList', JSON.stringify(products));
}

addBtn.onclick = function() {
    if (addBtn.innerHTML=='Add Product') {
        addProduct();
    }
    else {
        updateProduct();
    }
    displayProduct();
    resetForm();
}

// regular expression(rejex) 


var nameAlert=document.getElementById('nameAlert');

productNameInput.onkeyup=function() {
    var nameRejex=/^[A-Z][a-z]{3,15}\s*$/;
    let nameValid = '';
    if (nameRejex.test(productNameInput.value))    // valid
    {
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        nameAlert.classList.add('d-none');
        nameValid=true;
    }
    else                                          // not valid
    {
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        nameAlert.classList.remove('d-none');
        nameValid=false;
    }
    return nameValid;
}

var priceAlert=document.getElementById('priceAlert');

productPriceInput.onkeyup=function() {
    var priceRejex=/^[1-9 0]{3,8}$/;
    let priceValid = '';
    if (priceRejex.test(productPriceInput.value))    // valid
    {
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        priceAlert.classList.add('d-none');
        priceValid=true;
    }
    else                                          // not valid
    {
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        priceAlert.classList.remove('d-none');
        priceValid=false;
    }
    return priceValid;
}



var categoryAlert=document.getElementById('categoryAlert');

productCaregoryInput.onkeyup=function() {
    var categoryRejex=/^[a-z]{3,15}$/;
    let categoryValid = '';
    if (categoryRejex.test(productCaregoryInput.value))    // valid
    {
        addBtn.removeAttribute('disabled');
        productCaregoryInput.classList.add('is-valid');
        productCaregoryInput.classList.remove('is-invalid');
        categoryAlert.classList.add('d-none');
        categoryValid=true;
    }
    else                                          // not valid
    {
        addBtn.disabled='true';
        productCaregoryInput.classList.add('is-invalid');
        productCaregoryInput.classList.remove('is-valid');
        categoryAlert.classList.remove('d-none');
        categoryValid=false;
    }
    return categoryValid;
}


