// Maneja el scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 0; // Ajusta el desplazamiento si es necesario

        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

// Cambio de Modo
const btnSwitch = document.querySelector('#switch');

document.addEventListener('DOMContentLoaded', () => {
    // Cargar el estado del tema oscuro desde el almacenamiento local
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        btnSwitch.classList.add('active');
    }
});

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');

    // Guardar el estado del tema oscuro en el almacenamiento local
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Funcionalidad para los botones de desplazamiento
document.addEventListener('DOMContentLoaded', function () {
    const listaProductos = document.querySelector('.lista-productos');
    const btnScrollLeft = document.querySelector('.btn-scroll-left');
    const btnScrollRight = document.querySelector('.btn-scroll-right');

    function updateButtons() {
        if (listaProductos.scrollLeft === 0) {
            btnScrollLeft.classList.remove('show');
        } else {
            btnScrollLeft.classList.add('show');
        }
        if (listaProductos.scrollWidth === listaProductos.clientWidth + listaProductos.scrollLeft) {
            btnScrollRight.classList.remove('show');
        } else {
            btnScrollRight.classList.add('show');
        }
    }

    updateButtons();
    listaProductos.addEventListener('scroll', updateButtons);

    // Funcionalidad para los botones de desplazamiento
    btnScrollLeft.addEventListener('click', () => {
        listaProductos.scrollBy({
            left: -300, 
            behavior: 'smooth'
        });
    });

    btnScrollRight.addEventListener('click', () => {
        listaProductos.scrollBy({
            left: 300, 
            behavior: 'smooth'
        });
    });
});

// Función para alternar entre los formularios de inicio de sesión y registro
function toggleForms() {
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    if (loginFormContainer.style.display === 'none') {
        loginFormContainer.style.display = 'block';
        registerFormContainer.style.display = 'none';
    } else {
        loginFormContainer.style.display = 'none';
        registerFormContainer.style.display = 'block';
    }
}