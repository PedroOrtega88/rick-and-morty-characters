document.addEventListener('DOMContentLoaded', () => {
    const botonPaginaAnterior = document.getElementById('prev-page');
    const botonPaginaSiguiente = document.getElementById('next-page');
    const listaPersonajes = document.getElementById('character-list');

    let paginaActual = 1;

    function obtenerPersonajes(pagina) {
        fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return respuesta.json();
            })
            .then((datos) => {
                mostrarPersonajes(datos.results);
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
            });
    }

    function mostrarPersonajes(personajes) {
        listaPersonajes.innerHTML = '';
        personajes.forEach((personaje) => {
            const tarjetaPersonaje = document.createElement('li');
            tarjetaPersonaje.classList.add('character-card');

            const imagen = document.createElement('img');
            imagen.src = personaje.image;
            imagen.alt = personaje.name;
            imagen.classList.add('character-image');

            const nombre = document.createElement('p');
            nombre.textContent = personaje.name;

            const especie = document.createElement('p');
            especie.textContent = personaje.species;

            tarjetaPersonaje.appendChild(imagen);
            tarjetaPersonaje.appendChild(nombre);
            tarjetaPersonaje.appendChild(especie);

            listaPersonajes.appendChild(tarjetaPersonaje);
        });
    }

  

    obtenerPersonajes(paginaActual);
    actualizarPaginacion();
});
