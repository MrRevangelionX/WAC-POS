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

let botonesHTML = '';
if (myStatus=='Libre') {
  botonesHTML = `<button onclick="aperturarMesa(${myID})">Aperturar Mesa</button>`;
} else {
  botonesHTML = `<a href="/mesa/${myID}/hamburguesas" class="table-button">Hamburguesas</a>`;
}

const main = document.getElementById('main');
main.innerHTML = botonesHTML;

function aperturarMesa(id) {
    fetch('/mesa/' + id, { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo aperturar la mesa');
        }
        location.reload(); // Recargar la página para actualizar la vista
      })
      .catch(error => {
        console.error('Error al aperturar la mesa:', error);
      });
  }