function saludar(){
    alert("Bienvenido a nuestra Biblioteca Municipal " + nombre);
}
function elegir(){
    opcionMenu = prompt("Elija una opción: \n 1: Reservar libro\n 2: Finalizar reserva\n 3: Salir sin reservar");
}
function reservarLibro(){
    opcionCategoria = prompt("Ingrese el tipo de libro que desea reservar: \n 1 - Novela \n 2 - Ficción \n 3 - Infantil ");
    if (opcionCategoria === "1"){
        const novelas = libros.filter((libro) => libro.categoria.includes("Novela"));
        novelas.forEach((novela) => {
            alert("Estas son las opciones, recuerde el número de id del libro que desea elegir: \n" + "id " + (novela.id) + ": " + (novela.nombre) + ", " + (novela.autor));
        });
        let idSeleccionado = prompt("Escriba el número de id del libro elegido: ");
        const novelaElegida = novelas.find((novela) => novela.id === idSeleccionado);
        if (novelaElegida){
            alert("Usted eligió el libro: " + novelaElegida.nombre + " de " + novelaElegida.autor);
            sumaLibro1 += 1;
            novelaElegida.reservar();
            console.log(novelaElegida);
        }
        else {
            alert("Usted no ingresó un número válido de id!") 
            reservarLibro();
        }
        elegir();
    }
    else if (opcionCategoria === "2"){
        const ficciones = libros.filter((libro) => libro.categoria.includes("Ficción"));
        ficciones.forEach((ficcion) => {
            alert("Estas son las opciones, recuerde el número de id del libro que desea elegir: \n" + "id " + (ficcion.id) + ": " + (ficcion.nombre) + ", " + (ficcion.autor));
        });
        let idSeleccionado = prompt("Escriba el número de id del libro elegido: ");
        const ficcionElegida = ficciones.find((ficcion) =>ficcion.id === idSeleccionado);
        if (ficcionElegida){
            alert("Usted eligió el libro: " + ficcionElegida.nombre + " de " + ficcionElegida.autor);
            sumaLibro2 += 1;
            ficcionElegida.reservar();
        }
        else {
            alert("Usted no ingresó un número válido de id!") 
            reservarLibro();
        }
        elegir();
    }
    else if(opcionCategoria === "3"){
        const infantiles = libros.filter((libro) => libro.categoria.includes("Infantil"));
        infantiles.forEach((infantil) => {
            alert("Estas son las opciones, recuerde el número de id del libro que desea elegir: \n" + "id " + (infantil.id) + ": " + (infantil.nombre) + ", " + (infantil.autor));
        });
        let idSeleccionado = prompt("Escriba el número de id del libro elegido: ");
        const infantilElegida = infantiles.find((infantil) =>infantil.id === idSeleccionado);
        if (infantilElegida){
            alert("Usted eligió el libro: " + infantilElegida.nombre + " de " + infantilElegida.autor);
            sumaLibro3 += 1;
            infantilElegida.reservar();
        }
        else {
            alert("Usted no ingresó un número válido de id!") 
            reservarLibro();
        }
        elegir();
        }
    else{
        alert("No ingresaste un número, vuelve a intentar");
        elegir();
    }
}
function finalizaReserva(){
    if(sumaLibro1 > 0 || sumaLibro2 > 0 || sumaLibro3 > 0){
        const seleccionados = libros.filter((libro) => libro.reservado);
        let sumaLibros = sumaLibro1 + sumaLibro2 + sumaLibro3;
        console.log(seleccionados);
        seleccionados.forEach((seleccionado) => {
            alert("Usted ha reservado: \n" + seleccionado.nombre + " de " + seleccionado.autor);
        });
        alert("Usted ha reservado un total de: " + sumaLibros + " libros\n" + "\n" + sumaLibro1 + " novelas " + "\n" + sumaLibro2 + " ficciones " + "\n" + sumaLibro3 + " infantiles ");
    }
    else{
        alert("Usted no ha reservado libros");
        opcion = "3"
    }
}
function saludarFinal(){
    alert("Gracias por ser parte de la Bliblioteca Municipal!");
}

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

let nombre = prompt("Ingrese su nombre: ");
let opcionMenu;
let opcionCategoria;
let sumaLibro1 = 0;
let sumaLibro2 = 0;
let sumaLibro3 = 0;
const libros = [];

libros.push(new Libro ("1", "La tía Cósima", "Florencia Bonelli", "Novela"));
libros.push(new Libro("2","Irulana y el Ogronte", "Graciela Montes", "Infantil"));
libros.push(new Libro ("3","Cornelia", "Florencia Etcheves", "Novela"));
libros.push(new Libro ("4","La Isla Bajo el Mar", "Isabel Allende", "Novela"));
libros.push(new Libro("5","La Leyenda del bicho Colorado", "Gustavo Roldan", "Infantil"));
libros.push(new Libro("6","Harry Potter y la Piedra Filosofal", "J.K.Rowling", "Ficción"));
libros.push(new Libro("7","El Evangelio Según Jesucristo", "José Saramago", "Novela"));
libros.push(new Libro("8","Sapo en Buenos Aires", "Gustavo Roldán", "Infantil"));
libros.push(new Libro("9","El problema de los tres Cuerpos", "Cixin Liu", "Ficción"));

saludar();
elegir();

while (opcionMenu !== "3"){
    if (opcionMenu === "1"){
        reservarLibro();
    }
    else if (opcionMenu === "2"){
        finalizaReserva();
        saludarFinal();
        opcionMenu = "3";
    }
    else {
        alert("No ingresaste un número, vuelve a intentar");
        elegir();
    }
}
if(opcionMenu === "3"){
    alert("Usted salió del sistema");
}

