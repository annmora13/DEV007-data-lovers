import { filtrarPorAnyo, filtrarByDirector, getFilmById, searchFilmsByName, orderMovies,  } from '../src/data.js';


describe('filtrarPorAnyo', () => {
  it('is a function', () => {
    expect(typeof filtrarPorAnyo).toBe("function");
  });
});

describe('retunr films by year selec', () => {
  it('returns only movies the year select`', () => {
    const films = [
      {
        "title": "Castle in the Sky",
        "release_date": "1986",
      },
      {
        "title": "My Neighbor totoro",
        "release_date": "1988",
      }
    ]
    
    const dataFiltered =
      [
        {
          "title": "My Neighbor totoro",
          "release_date": "1988",
        }
      ]
      ;
    expect(filtrarPorAnyo(films, "1988")).toStrictEqual(dataFiltered);
  });
});

describe('getFilmById', () => {
  it('is a function', () => {
    expect(typeof getFilmById).toBe("function");
  });
});


describe('retunr films by director selec', () => {
  it('returns only movies the director select`', () => {
    const films = [
      {
        "title": "Castle in the Sky",
        "director": "Hayao Miyazaki",
      },
      {
        "title": "Grave of the Fireflies",
        "director": "Isao Takahata",
      }
    ]
    
    const dataFiltered =
      [
        {
          "title": "Castle in the Sky",
          "director": "Hayao Miyazaki",
        }
      ]
      ;
    expect(filtrarByDirector(films, "Hayao Miyazaki")).toStrictEqual(dataFiltered);
  });
});
  
describe('retunr films by director selec', () => {
  it('returns only movies the director select`', () => {
    const films = [
      {
        "title": "My Neighbors the Yamadas",
        "director": "Isao Takahata",
      },
      {
        "title": "The Cat Returns",
        "director": "Hiroyuki Morita",
      }
    ]
    
    const dataFiltered =
      [
        {
          "title": "The Cat Returns",
          "director": "Hiroyuki Morita",
        }
      ]
      ;
    expect(filtrarByDirector(films, "Hiroyuki Morita")).toStrictEqual(dataFiltered);
  });
});



describe('retunr films when usuasrio write', () => {
  it('retunr films when usuasrio write', () => {
    const films = [
      {
        "title": "My Neighbors the Yamadas",
      },
      {
        "title": "The Cat Returns",
      }
    ]
    
    const dataFiltered =
      [
        {
          "title": "The Cat Returns",
        }
      ]
      ;
    expect(searchFilmsByName(films, "The Cat")).toStrictEqual(dataFiltered);
  });
});
  

describe('retunr films A-Z', () => {
  it('retunr films when usuasrio select A-Z', () => {
    const films = [
      {
        "title": "Howl's Moving Castle",
      },
      {
        "title": "Tales from Earthsea",
      }
    ]
    
    const dataFiltered =
      [
        {
          "title": "Howl's Moving Castle",
        },
        {
          "title": "Tales from Earthsea",
        }
      ]
      ;
    expect(orderMovies(films, "AZ")).toStrictEqual(dataFiltered);
  });
});
  
