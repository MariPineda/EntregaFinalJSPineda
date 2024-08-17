function saludar(){
    alert("Bienvenido a nuestra Biblioteca Municipal " + nombre);
}
function elegir(){
    opcion = prompt("Elija una opción: \n 1: reservar libro\n 2: finalizar reserva\n 3: salir sin reservar");
}
function reservarLibro(){
    libro = prompt("Ingrese el número del libro que desea reservar: \n 1 - La tía Cósima \n 2 - Cornelia \n 3 - La Isla Bajo el Mar "
    );
    if (libro === "1"){
        alert("Elegiste reservar " + libro1);
        sumalibro1 += 1;
        elegir();
    }
    else if (libro === "2"){
        alert("Elegiste reservar " + libro2);
        sumalibro2 += 1;
        elegir();
    }
    else if(libro === "3"){
        alert("Elegiste reservar " + libro3);
        sumalibro3 += 1;
        elegir();
    }
    else{
        alert("No ingresaste un número, vuelve a intentar");
        elegir();
    }
}
function finalizaReserva(){
    if(sumalibro1 > 0 || sumalibro2 > 0 || sumalibro3 > 0){
        alert("Usted ha reservado: \n" + sumalibro1 + " libro/s de " + libro1 + "\n" + sumalibro2 + " libro/s de " + libro2 + "\n" + sumalibro3 + " libro/s de" + libro3);
    }
    else{
        alert("Usted no ha reservado libros");
        opcion = "3"
    }
}
function saludarFinal(){
    alert("Gracias por ser parte de la Bliblioteca Municipal!");
}

let nombre = prompt("Ingrese su nombre: ");
let opcion;
let libro; 
let libro1 = "La tía Cósima";
let libro2 = "Cornelia";
let libro3 = "La Isla Bajo el Mar";
let sumalibro1 = 0;
let sumalibro2 = 0;
let sumalibro3 = 0;

saludar();
elegir();

while (opcion !== "3"){
    if (opcion === "1"){
        reservarLibro();
    }
    else if (opcion === "2"){
        finalizaReserva();
        saludarFinal();
        opcion = "3";
    }
    else {
        alert("No ingresaste un número, vuelve a intentar");
        elegir();
    }
}

if(opcion === "3"){
    alert("Usted salió del sistema");
}


