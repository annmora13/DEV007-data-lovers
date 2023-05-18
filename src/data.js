// estas funciones son de ejemplo



//se crea funcion filtro por año
export function filtrarPorAnyo(data, date) {
  const datafiltrada = data.filter(pelicula => pelicula.release_date === date)
  return datafiltrada
    
}

export function filtrarByDirector(data, director){
  const datafiltrada = data.filter(film => film.director === director)
  return datafiltrada
}


export function getFilmById(data, filmId) {
  const films = data.filter(film => film.id === filmId) 
  return films[0]
}


//se crea funion buscar por nombre de la pelicula
export function searchFilmsByName(data,nombreBuscar) {
  const dataFiltrada = data.filter(film => film.title.toLowerCase().includes(nombreBuscar.toLowerCase()))//include sirve para comparar si un string esta en otro string
  return dataFiltrada
}

//se crea funcion para ordenar de forma alfabetica, ascdente
export function orderMovies(data,orderType) {
  const dataFiltrada = data.sort((a, b) =>{
    const nameA = a.title;
    const nameB = b.title;
    if(nameA < nameB){
      return -1;
    }else{
      return 1
    }
    
  })
  if(orderType === "AZ"){
    return dataFiltrada
  } else {
    return dataFiltrada.reverse()
  }
}