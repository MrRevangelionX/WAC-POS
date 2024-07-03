const salir = document.getElementById('btnSalir');
const pedidos = document.getElementById('btn_1');

salir.addEventListener('click', ()=>{
    window.location.href = '/logout'
})

pedidos.addEventListener('click', ()=>{
    window.location.href = '/mesas';
})