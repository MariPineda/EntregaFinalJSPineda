function validarNombre(nombre) {
    return nombre.trim().length > 0;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarPassword(password) {
    return password.length >= 8;
}

const obtenerLibros = async () => {
    try {
        const respuesta = await fetch ('./JSON/libros.json');
        if (!respuesta.ok) {
            throw new Error (`Error al obtener el listado de libros: Código error: ${respuesta.status}`);
        }
        const data = await respuesta.json();
        libros = Array.isArray(data) ? data : Object.values(data).flat();//
        return libros;
    } catch (error) {
        console.error (`Hubo problemas con el fetch: `, error);
        return [];
    }
};

const filtrarLibros = (categoria) => {
    return libros.filter((libro) => libro.categoria === categoria);
};

const mostrarCategoria = async (categoria) => {
    await obtenerLibros();
    console.log(libros);
    const librosFiltrados = filtrarLibros(categoria);
    const librosDiv = document.getElementById('books');
    librosDiv.innerHTML = '';
    librosFiltrados.forEach((libro, index) => {
        const libroDiv = document.createElement('div');
        libroDiv.classList.add('book-item');
        libroDiv.innerHTML = `
            ${index + 1}. ${libro.nombre} - ${libro.autor}
            <button class="button button-primary" data-index="${index}" data-categoria="${categoria}">Reservar</button>
        `;
        librosDiv.appendChild(libroDiv);
    });
    document.querySelectorAll('.book-item button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            const categoria = event.target.getAttribute('data-categoria');
            agregarReserva(index, categoria);
        });
    });
};

const agregarReserva = (index, categoria) => {
    const libro = filtrarLibros(categoria)[index];
    reservas.push(libro);
    libro.reservado = true;
    guardarReservasLocalStorage(); 
    mostrarReservas();
};

const mostrarReservas = () => {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    reservas.forEach((libro) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        Libro: ${libro.nombre}, Autor: ${libro.autor}
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `Total: ${calcularTotal()}`;
    cartItemsDiv.appendChild(totalDiv);
};

const calcularTotal = () => {
    return `Usted ha reservado:  ${reservas.length} libro/s` ;
};

const guardarReservasLocalStorage = () => {
    localStorage.setItem('reservas', JSON.stringify(reservas)) || []; 
};

const cargarReservasLocalStorage = () => {
    const reservasGuardado = localStorage.getItem('reservas');
    if (reservasGuardado) {
        reservas = JSON.parse(reservasGuardado);
        mostrarReservas(); 
    }
};

const finalizarReserva = () => { 
    reservas.length > 0 ? finalizarReservaSaludo() : FinalizarSinReservas(); 
};

let btnEliminarReservas = document.getElementById('btnEliminarReservas');
btnEliminarReservas.addEventListener('click', () => {
    borrarReserva()
})

const borrarReserva = () => {
    if (reservas.length === 0){
        Swal.fire({
            icon: "error",
            title: "Uy!!!...",
            text: "No ha reservado ningún libro!"
        });
        reservas = [];
        guardarReservasLocalStorage();  
        mostrarReservas();
    } else {
        Swal.fire({
            title: "Estás seguro de borrar tu reserva?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, deseo borrar la reserva!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Reserva borrada!",
                    text: "Tu reserva fue borrada!",
                    icon: "success"
                });
            reservas.pop();
            mostrarReservas();
            guardarReservasLocalStorage();
            }
        });
    }
}

const finalizarReservaSaludo = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Tus libros han sido reservados!",
        showConfirmButton: false,
        timer: 3000
    });
    reservas = [];
    guardarReservasLocalStorage();  
    mostrarReservas();
};

const FinalizarSinReservas = () => {
    Swal.fire({
        icon: "error",
        title: "Uy!!!...",
        text: "No ha reservado ningún libro!"
    });
    reservas = [];
    guardarReservasLocalStorage();  
    mostrarReservas();
};

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const { nombre, email, password } = event.target.elements; 

    document.getElementById('nombreError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    let valid = true;

    if (!validarNombre(nombre.value)) {
        document.getElementById('nombreError').textContent = 'Por favor, ingresa un nombre válido.';
        valid = false;
    }

    if (!validarEmail(email.value)) {
        document.getElementById('emailError').textContent = 'Por favor, ingresa un correo electrónico válido.';
        valid = false;
    }

    if (!validarPassword(password.value)) {
        document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 8 caracteres.';
        valid = false;
    }

    if (valid) {
        document.getElementById('registroForm').classList.add('hidden');
        document.getElementById('pantallaInicio').classList.add('hidden');
        document.getElementById('biblioteca').classList.remove('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    mostrarCategoria('Novela');
});

document.getElementById('btnFinalizarReserva').addEventListener('click', finalizarReserva);

document.getElementById('btnNovela').addEventListener('click', () => mostrarCategoria('Novela'));
document.getElementById('btnFiccion').addEventListener('click', () => mostrarCategoria('Ficción'));
document.getElementById('btnInfantil').addEventListener('click', () => mostrarCategoria('Infantil'));

let libros = [];
let reservas = [];

cargarReservasLocalStorage(); 
