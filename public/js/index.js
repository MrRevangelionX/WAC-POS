const salir = document.getElementById('btnSalir');
const mesas = document.getElementById('btn_1');
const inventario = document.getElementById('btn_2');

salir.addEventListener('click', ()=>{
    window.location.href = '/logout'
})

mesas.addEventListener('click', ()=>{
    window.location.href = '/mesas';
})

inventario.addEventListener('click', ()=>{
    window.location.href = '/inventario';
})