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

let totalValue = 0; // Variable global para almacenar el valor total de las notas

function showCategory(category) {
    // Limpiar el contenido anterior
    const content = document.getElementById('content');
    content.innerHTML = '';

    // Realizar la solicitud para obtener productos de la categoría
    axios.get(`http://localhost:3000/productos/${category}`)
        .then(response => {
            const productos = response.data;
            console.log(productos);
            productos.forEach(producto => {
                const noteButton = document.createElement('button');
                noteButton.className = 'note-btn';
                noteButton.textContent = producto.item_name;
                noteButton.onclick = () => addNoteToList(producto.item_name, producto.item_unit_price);
                content.appendChild(noteButton);
            });
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
}

function addNoteToList(note, singleValue) {
    const noteList = document.getElementById('noteList');
    const listItem = document.createElement('li');
    listItem.textContent = `${note} - $${singleValue.toFixed(2)}`;
    noteList.appendChild(listItem);

    // Incrementar el valor total por cada nota agregada
    totalValue += singleValue;
    updateTotalDisplay(); // Actualizar la visualización del total
}

function saveNotes() {
    const notes = [];
    const noteListItems = document.querySelectorAll('#noteList li');
    noteListItems.forEach(item => {
        notes.push(item.textContent);
    });
    localStorage.setItem('notes' + id, JSON.stringify(notes));
    localStorage.setItem('totalValue' + id, totalValue);
}

function clearNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    localStorage.removeItem('notes' + id);
    localStorage.removeItem('totalValue' + id);

    // Reiniciar el valor total
    totalValue = 0;
    updateTotalDisplay(); // Actualizar la visualización del total
}

function updateTotalDisplay() {
    const totalElement = document.getElementById('totalValue');
    totalElement.textContent = totalValue.toFixed(2); // Mostrar el total con dos decimales
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes' + id);
    const savedTotalValue = localStorage.getItem('totalValue' + id);
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        const noteList = document.getElementById('noteList');
        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = note;
            noteList.appendChild(listItem);
        });
    }
    if (savedTotalValue) {
        totalValue = parseFloat(savedTotalValue);
        updateTotalDisplay();
    }
}

document.addEventListener('DOMContentLoaded', loadNotes);