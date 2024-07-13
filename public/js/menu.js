let totalValue = 0; // Variable global para almacenar el valor total de las notas

function showCategory(categoryId) {
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.style.display = 'none';
    });

    const selectedCategory = document.getElementById(categoryId);
    if (selectedCategory) {
        selectedCategory.style.display = 'flex';
    }
}

function addNoteToList(note) {
    const noteList = document.getElementById('noteList');
    const listItem = document.createElement('li');
    listItem.textContent = note;
    noteList.appendChild(listItem);

    // Incrementar el valor total por cada nota agregada
    totalValue += 0.25;
    updateTotalDisplay(); // Actualizar la visualización del total
}

function saveNotes() {
    const notes = [];
    const noteListItems = document.querySelectorAll('#noteList li');
    noteListItems.forEach(item => {
        notes.push(item.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function clearNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    localStorage.removeItem('notes');

    // Reiniciar el valor total
    totalValue = 0;
    updateTotalDisplay(); // Actualizar la visualización del total
}

function updateTotalDisplay() {
    const totalElement = document.getElementById('totalValue');
    totalElement.textContent = totalValue.toFixed(2); // Mostrar el total con dos decimales
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        const notes = JSON.parse(savedNotes);
        const noteList = document.getElementById('noteList');
        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = note;
            noteList.appendChild(listItem);
            
            // Añadir al valor total por cada nota cargada
            totalValue += 0.25;
        });
        updateTotalDisplay(); // Actualizar la visualización del total
    }
}

document.addEventListener('DOMContentLoaded', loadNotes);

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