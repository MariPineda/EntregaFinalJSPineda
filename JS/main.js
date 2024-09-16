const filtrarLibros = (categoria) => {
    return libros.filter((libro) => libro.categoria === categoria);
};

const mostrarCategoria = (categoria) => {
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
    localStorage.setItem('reservas', JSON.stringify(reservas));
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
    reservas.pop();
    mostrarReservas();
    guardarReservasLocalStorage();
})

const finalizarReservaSaludo = () => {
    const mensaje = document.createElement("p");
    mensaje.textContent = 'Gracias por ser parte de la biblioteca! Tus libros han sido reservados!';
    const saludoFinal = document.getElementById("saludoFinal");
    saludoFinal.parentNode.insertBefore(mensaje, saludoFinal);
    setTimeout(function() {
        mensaje.remove();
    }, 3000);
    reservas = [];
    guardarReservasLocalStorage();  
    mostrarReservas();
};

const FinalizarSinReservas = () => {
    const mensajeSinReservas = document.createElement("p");
    mensajeSinReservas.textContent = 'No ha reservado ningún libro!';
    const saludoFinal = document.getElementById("saludoFinal");
    saludoFinal.parentNode.insertBefore(mensajeSinReservas, saludoFinal);
    setTimeout(function() {
        mensajeSinReservas.remove();
    }, 3000);
    reservas = [];
    guardarReservasLocalStorage();  
    mostrarReservas();
};

const libros = [];

class Libro {
    constructor (id, nombre, autor, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.autor = autor;
        this.categoria = categoria;
        this.reservado = false;
    }
    reservar() {
        this.reservado = true;
    }
}

libros.push(new Libro ("1", "La tía Cósima", "Florencia Bonelli", "Novela"));
libros.push(new Libro("2","Irulana y el Ogronte", "Graciela Montes", "Infantil"));
libros.push(new Libro ("3","Cornelia", "Florencia Etcheves", "Novela"));
libros.push(new Libro ("4","La Isla Bajo el Mar", "Isabel Allende", "Novela"));
libros.push(new Libro("5","La Leyenda del bicho Colorado", "Gustavo Roldan", "Infantil"));
libros.push(new Libro("6","Harry Potter y la Piedra Filosofal", "J.K.Rowling", "Ficción"));
libros.push(new Libro("7","El Evangelio Según Jesucristo", "José Saramago", "Novela"));
libros.push(new Libro("8","Sapo en Buenos Aires", "Gustavo Roldán", "Infantil"));
libros.push(new Libro("9","El problema de los tres Cuerpos", "Cixin Liu", "Ficción"));

let reservas = [];

cargarReservasLocalStorage();  
mostrarCategoria('Novela');

document.getElementById('btnFinalizarReserva').addEventListener('click', finalizarReserva);

document.getElementById('btnNovela').addEventListener('click', () => mostrarCategoria('Novela'));
document.getElementById('btnFiccion').addEventListener('click', () => mostrarCategoria('Ficción'));
document.getElementById('btnInfantil').addEventListener('click', () => mostrarCategoria('Infantil'));