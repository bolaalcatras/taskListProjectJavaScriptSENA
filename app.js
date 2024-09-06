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
const listaText = document.querySelector(".task-list")//padre
//const liTexto = document.querySelector(".task-item")//hijo
//const spanAction = liTexto.querySelector(".actions")
//const buttonDelete = document.querySelector(".delete")
//const buttonEdit = document.querySelector(".edit")


botonAdd.addEventListener("click", (e) => {

    

        e.preventDefault();//no deja que se recargue la pagina

        //creamos el li (task-item)
        const newLi = document.createElement('li'); //creo el li
        newLi.className = "task-item"; //le colocamos nombre a la clase
        newLi.textContent = ""; //le ponemos contenido al li

        const newSpan = document.createElement("span"); //creo el span
        newSpan.className = "actions"; //le colocamos nombre a la clase

        const newButtonDelete = document.createElement("button");//creamos el boton de eliminar
        newButtonDelete.className = "delete"; //le colocamos nombre a la clase
        newButtonDelete.textContent = "Eliminar"; //le ponemos un contenido al button

        const newButtonEdit = document.createElement("button");//creamos el boton de editar
        newButtonEdit.className = "edit"; //le colocamos nombre a la clase
        newButtonEdit.textContent = "Editar"; //le ponemos un contenido al button

        newSpan.append(newButtonDelete, newButtonEdit);//a la etiqueta span le ponemos los dos botones eliminar y editar
        newLi.appendChild(newSpan);//a la etiqueta li le ponemos la etiqueta span

        //evaluamos si el input tiene texto
        if (inputText.value != "") {

        const firstChildLi = newLi.childNodes[0].textContent; //buscamos el primer hijo del nodo de li que seria el texto
        const newContent = firstChildLi.textContent = inputText.value; //a la variable newContent le asignamos el contenido de input
        newLi.prepend(newContent); //al primer hijo de li le asignamos el nuevo contenido
        listaText.appendChild(newLi); //al ul le asignamos el nuevo li creado con el contenido

        inputText.value = ""; //limpio el input

    } else {
        alert("Completa el campo")
    }

        //boton de eliminar
        newButtonDelete.addEventListener("click", (e) => {
            e.preventDefault();
            if (newLi.parentNode) {//verifica si el li tiene un parentNode que en este caso seria task-list
                newLi.parentNode.removeChild(newLi);//si li tiene un padre, manda al padre a eliminar a su hijo(liTexto))
            }
        });


        //boton de editar
        newButtonEdit.addEventListener("click", edicion) //lamamos la funcion de edicon en el evento

        function edicion() {

            
            const contText = newLi.childNodes[0].textContent; //buscamos el texto del  li

            const newInput = document.createElement('input'); //creamos el input
            newInput.type = 'text';
            newInput.style = "width: 100%; height: 35px; border-radius: 5px; background-color: #f4f4f4; border: 1px solid;"
            newInput.value = contText.trim(); //le pasamos al input el valor del li

            newLi.childNodes[0].textContent = ""; //limpiamos el li
            newLi.insertBefore(newInput, newLi.childNodes[0]); //para insertar el input al primer hijo de li "new task"
            newButtonEdit.textContent = "Guardar" //cambiamos el nombre del boton por guardar

            newButtonEdit.removeEventListener("click", edicion); //removemos el evento de edicion apenas se haga click
            newButtonEdit.addEventListener("click", guardarEdicion); //añadimos el evento de guardarEdicion cuando se haga el otro click
        }


        function guardarEdicion() {

            const input = newLi.querySelector("input"); //seleccionamos el input que creamos
            if(input.value!=""){
            const contText = newLi.childNodes[0].textContent; //buscamos el texto de li

            const nuevoValor = contText.textContent = input.value; //se asignamos a la variable el contenido del input
            newLi.prepend(nuevoValor) //colocamos el contenido como primer hijo del nodo li
            newLi.removeChild(input) //removemos el input

            newButtonEdit.textContent = "Editar" //cambiamos el nombre del boton por crear


            newButtonEdit.removeEventListener("click", guardarEdicion); //removemos el evento de guardarEdicion apenas se haga click
            newButtonEdit.addEventListener("click", edicion); //añadimos el evento edicion cuando se haga el otro click
            }else{
                alert("no se puede dejar vacio el campo")
            }
        }

    


});



