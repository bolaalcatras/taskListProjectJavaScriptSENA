//ejecutar la accion cuando presione la tecla enter
const enterKey = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    which: 13,
    keyCode: 13,
});


const form = document.querySelector("form");
const inputText = form.querySelector("input");
const botonAdd = form.querySelector("button");
const listaText = document.querySelector(".task-list")//hijo
const liTexto = document.querySelector(".task-item")//padre
const spanAction = liTexto.querySelector(".actions")
const buttonDelete = document.querySelector(".delete")
const buttonEdit = document.querySelector(".edit")


botonAdd.addEventListener("click", (e) => {

    if (inputText.value != "") {

        e.preventDefault();//no deja que se recargue la pagina

        const newLi = document.createElement('li'); //creo el li
        newLi.className = "task-item"; //le colocamos nombre a la clase
        newLi.textContent = " "; //le ponemos contenido al li
        
        const newSpan = document.createElement("span"); //creo el span
        newSpan.className = "actions"; //le colocamos nombre a la clase

        const newButtonDelete = document.createElement("button");//creamos el boton de eliminar
        newButtonDelete.className = "delete"; //le colocamos nombre a la clase
        newButtonDelete.textContent = "Eliminar"; //le ponemos un contenido al button

        const newButtonEdit = document.createElement("button");//creamos el boton de editar
        newButtonDelete.className = "edit"; //le colocamos nombre a la clase
        newButtonEdit.textContent = "Editar"; //le ponemos un contenido al button


        const clonedLi = liTexto.cloneNode(true); //clono task-item 
        const actionsCloned = spanAction.cloneNode(true) //clono las actions

        clonedLi.textContent = ""; //limpio el clon task-item

        clonedLi.textContent = inputText.value, actionsCloned; //le paso el valor de input y el clon de actions


        listaText.appendChild(clonedLi); //coloco el clon de task-item dentro de task-list
        clonedLi.appendChild(actionsCloned); //coloco el clon de actions dentro de task-item

        inputText.value = ""; //limpio el input

        const buttonDeleteClon = actionsCloned.querySelector(".delete")

        //boton de eliminar el li clon
        buttonDeleteClon.addEventListener("click", (e) => {
            e.preventDefault();
            if (clonedLi.parentNode) {//verifica si el li-clon tiene un parentNode que en este caso seria task-list
                clonedLi.parentNode.removeChild(clonedLi);//si li-clon tiene un padre, manda al padre a eliminar a su hijo(clonedLi)
            }
        });


        //boton de eliminar el li original
        buttonDelete.addEventListener("click", (e) => {
            e.preventDefault();
            if (liTexto.parentNode) {//verifica si el li tiene un parentNode que en este caso seria task-list
                liTexto.parentNode.removeChild(liTexto);//si li tiene un padre, manda al padre a eliminar a su hijo(liTexto))
            }
        });


        //boton de editar el li 
        buttonEdit.addEventListener("click", edicion) //lamamos la funcion de edicon en el evento


        function edicion() {

            const contText = liTexto.childNodes[0].textContent; //buscamos el texto del  li

            const newInput = document.createElement('input'); //creamos el input
            newInput.type = 'text';
            newInput.style = "width: 100%; height: 35px; border-radius: 5px; background-color: #f4f4f4; border: 1px solid;"
            newInput.value = contText.trim(); //le pasamos al input el valor del li

            liTexto.childNodes[0].textContent = ""; //limpiamos el li
            liTexto.insertBefore(newInput, liTexto.childNodes[0]); //para insertar el input al primer hijo de li "new task"
            buttonEdit.textContent = "Guardar" //cambiamos el nombre del boton por guardar

            buttonEdit.removeEventListener("click", edicion); //removemos el evento de edicion apenas se haga click
            buttonEdit.addEventListener("click", guardarEdicion); //añadimos el evento de guardarEdicion cuando se haga el otro click
        }


        function guardarEdicion() {

            const contText = liTexto.childNodes[0].textContent; //buscamos el texto de li

            const input = liTexto.querySelector("input"); //seleccionamos el input que creamos
            const nuevoValor = contText.textContent = input.value; //se asignamos a la variable el contenido del input
            liTexto.prepend(nuevoValor) //colocamos el contenido como primer hijo del nodo li
            liTexto.removeChild(input) //removemos el input

            buttonEdit.textContent = "Crear" //cambiamos el nombre del boton por crear


            buttonEdit.removeEventListener("click", guardarEdicion); //removemos el evento de guardarEdicion apenas se haga click
            buttonEdit.addEventListener("click", edicion); //añadimos el evento edicion cuando se haga el otro click

        }

        //buscamos el boton clon
        const buttonEditClon = actionsCloned.querySelector(".edit")

        //llamamos la funcion edicion
        buttonEditClon.addEventListener("click", edicionClon)

        function edicionClon() {

            const contText = clonedLi.childNodes[0].textContent; //buscamos el texto del  li

            const newInput = document.createElement('input'); //creamos el input
            newInput.type = 'text';
            newInput.style = "width: 100%; height: 35px; border-radius: 5px; background-color: #f4f4f4; border: 1px solid;"
            newInput.value = contText.trim(); //le pasamos al input el valor del li

            clonedLi.childNodes[0].textContent = ""; //limpiamos el li
            clonedLi.insertBefore(newInput, clonedLi.childNodes[0]); //para insertar el input al primer hijo de li "new task"
            buttonEditClon.textContent = "Guardar" //cambiamos el nombre del boton por guardar

            buttonEditClon.removeEventListener("click", edicionClon); //removemos el evento de edicion apenas se haga click
            buttonEditClon.addEventListener("click", guardarEdicionClon); //añadimos el evento de guardarEdicion cuando se haga el otro click
        }

        function guardarEdicionClon() {

            const contText = clonedLi.childNodes[0].textContent; //buscamos el texto de li

            const input = clonedLi.querySelector("input"); //seleccionamos el input que creamos
            const nuevoValor = contText.textContent = input.value; //se asignamos a la variable el contenido del input
            clonedLi.prepend(nuevoValor) //colocamos el contenido como primer hijo del nodo li
            clonedLi.removeChild(input) //removemos el input

            buttonEditClon.textContent = "Crear" //cambiamos el nombre del boton por crear

            buttonEditClon.removeEventListener("click", guardarEdicionClon); //removemos el evento de guardarEdicion apenas se haga click
            buttonEditClon.addEventListener("click", edicionClon); //añadimos el evento edicion cuando se haga el otro click

        }





    } else {
        alert("Completa el campo")
    }


});



