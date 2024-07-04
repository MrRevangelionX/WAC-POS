const btnSalir = document.getElementById('btnSalir');

btnSalir.addEventListener('click',()=>{
    window.location.href = '/';
});

let table = new DataTable('#myTable', {
    responsive: true,
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-MX.json',
    },
});