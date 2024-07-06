const btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',()=>{
    window.location.href = '/mesas';
})

const url = location.href.split('?');
const params = url[1].split('&');
const param1 = params[0].split('=');
const param2 = params[1].split('=');
const myID = param1[1];
const myStatus = param2[1];

const mesa = document.getElementById('Mesa');
mesa.innerText = 'Mesa ' + myID;

if (myStatus=='Libre'){
    const main = document.getElementById('main');
    main.innerHTML = "<button type='button' class='btn btn-success' id='OpenTable' onclick='openTable(myID)'>Aperturar Mesa</button>";
}

function openTable(id){
    location.href='/menu/' + id;
}