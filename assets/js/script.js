let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let deleteAll = document.getElementById('deleteAll');
let search = document.getElementById('search');
let scrollToTop = document.getElementsByName('scroll');
let mood = 'create';
let tmp;

// get total 
function getTotal(){
    if (price.value != ''){
        let result =  (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML = result;
        total.style.backgroundColor = 'green';
    }else{
        total.innerHTML = '0';
        total.style.backgroundColor = 'red';
    };
};

// creat && save localstorage (the bist way to save data in localstorage is ARRAY)
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
};
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
    };
    // count
    // clean data
    if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i = 0; i < newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            };
        }else{
    
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        };
    }else{
        clearData();
    }
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
};

// clear inputs after creating
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};

// read
function showData(){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td> ${i + 1} </td>
            <td> ${dataPro[i].title} </td>
            <td> ${dataPro[i].price} </td>
            <td> ${dataPro[i].taxes} </td>
            <td> ${dataPro[i].ads} </td>
            <td> ${dataPro[i].discount} </td>
            <td> ${dataPro[i].total} </td>
            <td> ${dataPro[i].category} </td>
            <td><button onclick="updateData(${i})" id="update"> update </button></td>
            <td><button onclick="deleteData(${i})" id="delete"> delete </button></td>
        </tr>`
    };
    document.getElementById('tbody').innerHTML = table;
    if(dataPro.length > 0){
        deleteAll.innerHTML = `<button onclick="clearAll()"> Delete All(${dataPro.length}) </button>`;
    }else{
        deleteAll.innerHTML = '';
    };
    getTotal();
};
showData()

// delete (ones);
function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
};

// clear all
function clearAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
};

// update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Up Date'
    category.value = dataPro[i].category;
    mood = 'upDate';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
};

// search
let searchMood = 'title';
function getSearchMood(id){
    if(id === 'search-title'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    };
    search.placeholder = 'search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();

};
function searchData(value){
    let table = '';
    if(searchMood === 'title'){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td> ${i + 1} </td>
                    <td> ${dataPro[i].title} </td>
                    <td> ${dataPro[i].price} </td>
                    <td> ${dataPro[i].taxes} </td>
                    <td> ${dataPro[i].ads} </td>
                    <td> ${dataPro[i].discount} </td>
                    <td> ${dataPro[i].total} </td>
                    <td> ${dataPro[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update"> update </button></td>
                    <td><button onclick="deleteData(${i})" id="delete"> delete </button></td>
                </tr>`;
            };
        };
    }else{
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].category.includes(value)){
                table += `
                <tr>
                    <td> ${i + 1} </td>
                    <td> ${dataPro[i].title} </td>
                    <td> ${dataPro[i].price} </td>
                    <td> ${dataPro[i].taxes} </td>
                    <td> ${dataPro[i].ads} </td>
                    <td> ${dataPro[i].discount} </td>
                    <td> ${dataPro[i].total} </td>
                    <td> ${dataPro[i].category} </td>
                    <td><button onclick="updateData(${i})" id="update"> update </button></td>
                    <td><button onclick="deleteData(${i})" id="delete"> delete </button></td>
                </tr>`;
            };
        };
    };
    document.getElementById('tbody').innerHTML = table;
};

//scroll to top
function ToTop(){
    scroll({
        top: 0,
        behavior: 'smooth',
    });
};