const addr = location.href.split('/');
const id = addr[4];

const btnSalir = document.getElementById('btnSalir');
btnSalir.addEventListener('click',()=>{
    window.location.href = '/mesas';
})

const mesa = document.getElementById('Mesa');
mesa.innerHTML = "<h2>TOMA DE PEDIDOS || MESA " + id + "</h2>";

const btnCerrar = document.getElementById('clearMesa');
btnCerrar.addEventListener('click', ()=>{
  window.location.href = '/closeTable/' + id
})