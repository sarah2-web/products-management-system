// Product total calculation: price + taxes + ads - discount
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood= 'create';
let tmp;

// Calculate total
function getTotal() {
if (price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value)
    - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor ='#00C853'
}
else {
    total.innerHTML ='';
    total.style.backgroundColor ='#00B0FF'
}
}

// create product
let dataPro;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
else {
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    // count
    if(title.value!=''
        && price.value != ''
        && category.value != ''
        && newPro.count <100)
        {
    if (mood === 'create'){
    if (newPro.count > 1){
        for (let i = 0; i < newPro.count; i++){
            dataPro.push(newPro);
        }
    } else {
        dataPro.push(newPro);
    }
} else {
    dataPro [tmp]= newPro;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
}
clearData();
    }
    // save local storage
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}
// clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData(){
    getTotal()
    let table = '';
    for (let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteall = document.getElementById('deleteall');
    if (dataPro.length > 0){
        deleteall.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    } else {
        deleteall.innerHTML = '';
    }
}
showData();

// delete
function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

// delete all
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

// search
let search = document.getElementById('search');
let searchmood = 'title';
function getsearchMood(id){
    if (id == 'searchtitle'){
        searchmood ='title';
    } else {
        searchmood ='category';
    }
    search.placeholder = 'Search by '+searchmood;
    search.focus();
    search.value='';
    showData();
}
function searchdata(value){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
if (searchmood == 'title'){
        if (dataPro[i].title.includes(value.toLowerCase())){
              table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;

        }

}else{
    if (dataPro[i].category.includes(value.toLowerCase())){
              table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;

        }
  }
}
document.getElementById('tbody').innerHTML = table;
}