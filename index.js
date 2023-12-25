let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let disc=document.getElementById('disc');
let totaal=document.getElementById('total');
let count=document.getElementById('count');
let Category=document.getElementById('Category');
let Create=document.getElementById('Create');
let clear = document.getElementById('deleteAll')
let serch =document.getElementById("serch")
let tmp;
let mood ="create"
let stitle =document.getElementById("stitle")
let scategory =document.getElementById("scategory")
// console.log(title,price,taxes,ads,disc,totaal,count,Category,Create)
function sums(){
    if(price.value != ""){
        let result=+price.value + +taxes.value + +ads.value - +disc.value
        totaal.textContent=result
        totaal.style.background='green'
    }else{
        totaal.textContent=''
        totaal.style.background='#f10'
    }
}

let product=[]
if(localStorage.product != null){
    product = JSON.parse(localStorage.getItem("product"));
}else{
    product=[]
}


Create.onclick=function(){
    let newProduct={
        titel:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        disc:disc.value,
        total:totaal.innerHTML,
        count:count.value,
        Category:Category.value.toLowerCase(),
    }
    if(title.value !="" && price.value != "" && count.value<100){
            if(mood==="create"){
    if(newProduct.count > 1){
        for(let i=0 ; i<newProduct.count; i++){
            product.push(newProduct)
        }
    }else{
        product.push(newProduct)
    }
    }else{
        product[tmp]=newProduct
        mood='create'
        count.style.display='block'
        Create.innerHTML='create'
    }
    cleeear()
    }

    localStorage.setItem("product",JSON.stringify(product))
    addToTable();
}


function cleeear(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    disc.value="";
    totaal.innerHTML="";
    count.value="";
    Category.value="";
}

function deleteAll(){
deletebtn.onclick=function(){
    localStorage.clear()
}
}
function addToTable(){
    sums()
    let table=""
    for(let i=0;i<product.length;i++){
        table +=`
            <tr>
            <td>${i+1}</td>
            <td>${product[i].titel}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].disc}</td>
            <td>${product[i].total}</td>
            <td>${product[i].Category}</td>
            <td><button id="update" onclick="updatedata(${i})">update</button></td>
            <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
            </tr>
        `
    }
    let lenofarray=product.length
    // console.log(lenofarray)
    document.getElementById('tbody').innerHTML=table
    if(product.length > 0 ){
        clear.style.display='block'
        clear.innerText= `Clear All Item (s) ${lenofarray}`
    }else{
        clear.style.display='none'
    }
}
addToTable();
function deleteitem(i){
    product.splice(i,1);
    localStorage.product= JSON.stringify(product)
    localStorage.removeItem(i)
    addToTable();
}
clear.onclick=function(){
    product=[];
    localStorage.clear();
    addToTable()
}

function updatedata(i){
    title.value=product[i].titel
    price.value=product[i].price
    taxes.value=product[i].taxes
    ads.value=product[i].ads
    disc.value=product[i].disc
    sums()
    count.style.display='none'
    Category.value=product[i].Category
    Create.innerHTML='update'
    mood="update"
    tmp=i
    scroll({
        top:0,
        behavior:"smooth"
    })
    addToTable()
}

// stitle.onclick= function(){
//     for(let i=0; i< product.length ; i++){
//         if(serch.value === product[i].titel){
//             addToTable()
//             console.log(product[i])
//             // console.log(product)

            
//         }
//     }
// }
// scategory.onclick= function(){
//     for(let i=0; i< product.length ; i++){
//         if(serch.value === product[i].Category){
//             addToTable()
//             console.log(product[i])
//             // console.log(product)

            
//         }
//     }
// }

let moodsearch = 'titel'
function searchmood(id){
    if(id=="titel"){
        moodsearch="Titel"
        serch.placeholder='Search By Title'
    }else{
        moodsearch="Category"
        console.log(moodsearch)
    }
    serch.placeholder='Search By '+moodsearch
    serch.focus()
    serch.value=""
    addToTable()
}
function searchdata(value){
    let table=''
    for(let i=0;i<product.length;i++){
    if(moodsearch==="Titel"){
            if(product[i].titel.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${product[i].titel}</td>
                <td>${product[i].price}</td>
                <td>${product[i].taxes}</td>
                <td>${product[i].ads}</td>
                <td>${product[i].disc}</td>
                <td>${product[i].total}</td>
                <td>${product[i].Category}</td>
                <td><button id="update" onclick="updatedata(${i})">update</button></td>
                <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
                </tr>
            `
        }   
            else{
            // table='no products'
        }
    }
    
    else if(moodsearch==="Category"){
            if(product[i].Category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${product[i].titel}</td>
                <td>${product[i].price}</td>
                <td>${product[i].taxes}</td>
                <td>${product[i].ads}</td>
                <td>${product[i].disc}</td>
                <td>${product[i].total}</td>
                <td>${product[i].Category}</td>
                <td><button id="update" onclick="updatedata(${i})">update</button></td>
                <td><button id="delete" onclick="deleteitem(${i})">delete</button></td>
                </tr>
            `
    }

}else{
    table='gg'
}
document.getElementById('tbody').innerHTML=table
}
}
    
