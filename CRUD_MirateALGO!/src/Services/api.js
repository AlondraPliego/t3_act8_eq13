// LOGIN

const AUTH_URL = 'https://dummyjson.com/auth/login';

export async function loginUser(username, password) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 30,
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message === 'Invalid credentials' ? 'Usuario o contraseña incorrectos.' : data.message);
  }

  return data;
}

const TMDB_API_KEY = 'ac0bd5d0ec2bb3cb455738106df4c6aa';
const BASE_URL = 'https://api.themoviedb.org/3';

export const GENRE_MAP = {
  10759: 'Acción & Aventura', 16: 'Animación', 35: 'Comedia', 80: 'Crimen',
  99: 'Documental', 18: 'Drama', 10751: 'Familia', 10762: 'Kids',
  9648: 'Misterio', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasía',
  10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western'
};

const STATUS_MAP = {
  'Returning Series': 'En emisión',
  'Planned': 'Planeada',
  'In Production': 'En producción',
  'Ended': 'Finalizada',
  'Canceled': 'Cancelada',
  'Pilot': 'Piloto'
};


export async function fetchGenres() {
  const url = `${BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=es-ES`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al cargar géneros de TMDB');
  const data = await res.json();
  return data.genres || [];
}

export async function fetchSeriesDetails(id) {
  const url = `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=es-ES`;
  try {
    const res = await fetch(url);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export async function searchSeries(query, page) {
  const url = `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al buscar series en TMDB');
  return res.json();
}

export async function discoverSeries(page, filters, genresList) {
  let url = `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=es-ES&sort_by=popularity.desc&page=${page}`;

  if (filters.genero !== 'Todos') {
    const selectedGenreObj = genresList.find(g => g.name === filters.genero);
    if (selectedGenreObj) {
      url += `&with_genres=${selectedGenreObj.id}`;
    }
  }
  if (filters.año !== 'Todos') {
    url += `&first_air_date_year=${filters.año}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al consultar la lista general de TMDB');
  return res.json();
}

export async function adaptSeriesResults(results) {
  const detailPromises = results.map(item => fetchSeriesDetails(item.id));
  const detailedResults = await Promise.all(detailPromises);

  return results.map((item, index) => {
    const details = detailedResults[index];

    return {
      id: item.id,
      titulo: item.name,
      año: item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A',
      calificacion: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
      estado: details ? (STATUS_MAP[details.status] || details.status) : 'N/A',
      genero: item.genre_ids && item.genre_ids.length > 0 ? GENRE_MAP[item.genre_ids[0]] || 'Otros' : 'N/A',
      temporadas: details ? details.number_of_seasons : 'N/A',
      episodios: details ? details.number_of_episodes : 'N/A',
      canal: details && details.networks && details.networks.length > 0
        ? details.networks[0].name
        : (item.origin_country && item.origin_country.length > 0 ? item.origin_country[0] : 'N/A')
    };
  });
}

export async function fetchSeriesData({ page, search, filters, genresList }) {
  const data = search.trim() !== ''
    ? await searchSeries(search, page)
    : await discoverSeries(page, filters, genresList);

  if (!data.results) {
    return { series: [], totalPages: 1, totalRecords: 0 };
  }

  let series = await adaptSeriesResults(data.results);

  if (filters.estado !== 'Todos') {
    series = series.filter(serie => serie.estado.toLowerCase() === filters.estado.toLowerCase());
  }

  const rowsPerPage = 20;
  const totalPages = Math.min(data.total_pages, 500);
  const totalRecords = Math.min(data.total_results, totalPages * rowsPerPage);

  return { series, totalPages, totalRecords };
}

