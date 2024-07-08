const btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',()=>{
    window.location.href = '/';
})

function MesaClick(mesaID, mesaStatus){
    console.log('Mesa ' + mesaID);
    location.href='/mesa/' + mesaID;
}