import { filtrarPorAnyo, filtrarByDirector, searchFilmsByName, orderMovies, getFilmById } from './data.js'
import data from "./data/ghibli/ghibli.js";

//se crea la variable que guarda toda la data
const dataStudioGhibli = data.films;

//se crea la variable que contiene todas las peliculas
const cardContainer = document.getElementById("card-container");
const cardCharacters = document.getElementById("card-characters");
const cardVehicles = document.getElementById("card-vehicles");
const cardPlaces = document.getElementById("card-places");
const modal = document.getElementById("modal");
const modalInfo = document.getElementById("modal-info");
const close = document.getElementById("close");
const cardTitle = document.getElementById("card-title");


//se obtienen los elementos de las opciones de busqueda
const selectDirector = document.getElementById("select-director");
const selectYear = document.getElementById("select-year");
const inputBuscar = document.getElementById("search");
const selectOrderMovies = document.getElementById("order-movies");


//muestra las peliculas
function showMovies(films) {
  cardContainer.innerHTML = "";

  films.forEach((film) => {
    //se muestra las peliculas, se combina HTML en el JS con las comillas invertidas
    //se pone el mismo id a los 3 elementos, titulo, imagen, div para identificar el evento del click
    const divFilm = document.createElement("div");
    divFilm.innerHTML = `<p class="title-card" id="${film.title}">${film.title}</p>
        <img class="card" src="${film.poster}" id="${film.id}">`;

    cardContainer.appendChild(divFilm);

    //se le pone evento al click cuando el usuario seleccione una pelicula y se ejecute la funcion de mostrar los personaje de la pelicula
    divFilm.addEventListener("click", () => {
      showInfoFilm(film.id);
    });
  });
}

function showSelect(films) {


  //Aquí creamos variables para los directores unicos y años
  const directoresUnicos = [];
  const filmYear = [];

  films.forEach((film) => {
    //Aqui preguntamos si nuestra variable directores unicos tiene el director
    //Si no lo tiene, le agregamos el director
    //se utiliza la función include
    if (!directoresUnicos.includes(film.director)) {
      directoresUnicos.push(film.director);
      //Aquí creamos el elemento llamado opcion y llamamos option
      const option = document.createElement("option");
      option.value = film.director;
      option.text = film.director;

      //Aquí hacemos un openchild que abre un elemnto hijo a un elemto padre que es un select- es parecido a lo del inner.HTML
      selectDirector.appendChild(option);
    }

    //Aqui preguntamos si nuestra variable años tiene el añ0o
    //Si no lo tiene, le agregamos el año
    //se utiliza la función include
    if (!filmYear.includes(film.release_date)) {
      filmYear.push(film.release_date);
      //Aquí creamos el elemento llamado opcion y llamamos option
      const option = document.createElement("option");
      option.value = film.release_date;
      option.text = film.release_date;
      //Aquí hacemos un openchild que abre un elemnto hijo a un elemto padre que es un select- es parecido a lo del inner.HTML
      selectYear.appendChild(option);
    }
  });
}


function showInfoFilm(filmId) {
  cardContainer.innerHTML = "";
  cardCharacters.innerHTML = "<h2>Personajes<hr><br></h2>";

  //se crea la variable que guarda la pelicula con todos los atributos(personajes-lugares-vehiculos)
  const filmSelected = getFilmById(dataStudioGhibli, filmId);

  const divTitle = document.createElement("div");
  divTitle.innerHTML = `
    <h1 class="title-film">${filmSelected.title.toUpperCase()}<br><br></h1>
    <p class="description">${filmSelected.description}</p>
  `;
  cardTitle.appendChild(divTitle);

  //Aqui muestra los personajes correspondientes a la pelicula
  filmSelected.people.forEach((character) => {
    const divCharacter = document.createElement("div");
    divCharacter.innerHTML = `
        <p class="title-card">${character.name}</p><br><br>
        <img class="card" src =${character.img} >
        `;
    cardCharacters.appendChild(divCharacter);
    divCharacter.addEventListener("click", () => {
      showInfoCharacter(character);
    });
  });

  cardPlaces.innerHTML = "<h2>Lugares<hr></h2>";
  filmSelected.locations.forEach((location) => {
    const optionLocation = `
      <div id="information-card>
        <div name="location" id=${location.name}>
        <p class="title-card">${location.name}</p>
        <img class="card" src=${location.img}>
        </div>
      </div>
        `;

    cardPlaces.innerHTML += optionLocation;
  });

  if (filmSelected.vehicles.length > 0) {
    cardVehicles.innerHTML = "<h2>Vehiculos<hr></h2>";

    filmSelected.vehicles.forEach((vehicle) => {
      const optionVehicle = `
            <div name="vehicle" id=${vehicle.name}>
            <p class="title-card">${vehicle.name}</p>
            <img class="card" src=${vehicle.img}>
            </div>
            `;
      cardVehicles.innerHTML += optionVehicle;
    });
  }
}

function showInfoCharacter(character) {
  const info = `
    <p class="title-card"><b>${character.name.toUpperCase()}</b></p><br><br>
    <p><b>Gender:</b> ${character.gender}</p>
    <p><b>Age:</b> ${character.age}</p>
    <p><b>Eye Color:</b> ${character.eye_color}</p>
    <p><b>Hair Color:</b> ${character.hair_color}</p>
    <p><b>Specie:</b> ${character.specie}</p>

    `
  modalInfo.innerHTML = info
  modal.classList.add('show');

  close.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  
   
}

//Aqui llamamos la funcion cuando el usuario de click
selectDirector.addEventListener("change", (e) => {
  cardCharacters.innerHTML = "";
  cardPlaces.innerHTML = "";
  cardVehicles.innerHTML = "";
  cardTitle.innerHTML = "";
  const directorSelected = e.target.value;//targe es el elemento que disparo el evento
  const filmsByDirector = filtrarByDirector(dataStudioGhibli, directorSelected);
  showMovies(filmsByDirector)
});

selectYear.addEventListener("change", (e) => {
  cardCharacters.innerHTML = "";
  cardPlaces.innerHTML = "";
  cardVehicles.innerHTML = "";
  cardTitle.innerHTML = "";
  const yearSlected = e.target.value;
  const resultFilterYear = filtrarPorAnyo(dataStudioGhibli, yearSlected);
  showMovies(resultFilterYear);
});



inputBuscar.addEventListener("input", () => {
  cardCharacters.innerHTML = "";
  cardPlaces.innerHTML = "";
  cardVehicles.innerHTML = "";
  cardTitle.innerHTML = "";
  const filterName = searchFilmsByName(dataStudioGhibli, inputBuscar.value);
  if (filterName.length === 0) {
    alert("No se encontraron resultados");
  }
  showMovies(filterName);
});

selectOrderMovies.addEventListener("change", (e) => {
  cardCharacters.innerHTML = "";
  cardPlaces.innerHTML = "";
  cardVehicles.innerHTML = "";
  cardTitle.innerHTML = "";
  const orderType = e.target.value;
  const resultOrderMovies = orderMovies(dataStudioGhibli, orderType);
  showMovies(resultOrderMovies);
});



//Proporcionando datos a la tabla de indicadores
// Obtener los datos de la API

fetch("./data/ghibli/ghibli.json")
  .then((response) => response.json())
  .then((data) => {

    // Agregar los encabezados de la tabla
    const table = document.getElementById("table");

    const headers = data.films;
    // console.log(data.films[0].title);
    // console.log(data.films);

    //llamamos a la tabla, creamos una fila y la añadimos a la tabla
    headers.forEach((headerText) => {
      //const header = document.createElement("td");
      //console.log(headerText.title);
      const row = document.createElement("tr");

      //creando el tabledata pasandole los datos en conjunto a la tabla
      row.innerHTML = `
        <td>${headerText.title}</td>
        <td>${headerText.description}</td>
        <td>${headerText.rt_score}</td>
        <td>${headerText.director}</td>
        <td>${headerText.producer}</td>
        <td>${headerText.release_date}</td>

        `;
      table.append(row);
    });
    // Agregar la tabla al documento
    document.body.appendChild(table);
  });


// se muestran las peliculas y las opciones para los filtros de director y año
showMovies(dataStudioGhibli);
showSelect(dataStudioGhibli);

