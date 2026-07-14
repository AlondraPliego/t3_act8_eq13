import FormEdit from '../forms/FormEdit';
import FormAdd from '../forms/FormAdd';
import React, { useState, useEffect, useRef } from 'react';
import styles from './MainContent.module.css';

const TMDB_API_KEY = 'ac0bd5d0ec2bb3cb455738106df4c6aa'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const GENRE_MAP = {
  10759: 'Acción & Aventura', 16: 'Animación', 35: 'Comedia', 80: 'Crimen',
  99: 'Documental', 18: 'Drama', 10751: 'Familia', 10762: 'Kids',
  9648: 'Misterio', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasía',
  10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western'
};

export default function MainContent() {
  // Referencias para atacar directamente los contenedores con scroll
  const mainContainerRef = useRef(null);
  const tableWrapperRef = useRef(null);
  const dropdownRefs = useRef({});

  const [hasToken, setHasToken] = useState(!!(localStorage.getItem('token') || sessionStorage.getItem('token')));
  const [seriesData, setSeriesData] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [serieAEditar, setSerieAEditar] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20; 
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchInput, setSearchInput] = useState(''); 
  const [activeSearch, setActiveSearch] = useState(''); 
  const [genresList, setGenresList] = useState([]);
  const [filters, setFilters] = useState({
    genero: 'Todos',
    año: 'Todos',
    estado: 'Todos'
  });

  // Metodo subir la barra de desplazamiento con animacion suave
  useEffect(() => {
    setTimeout(() => {
      const opcionesScroll = { top: 0, left: 0, behavior: 'smooth' };

      if (mainContainerRef.current) {
        mainContainerRef.current.scrollTo(opcionesScroll);
      }
      
      if (tableWrapperRef.current) {
        tableWrapperRef.current.scrollTo(opcionesScroll);
      }
      
      const appContentArea = document.querySelector('.content-area');
      if (appContentArea) {
        appContentArea.scrollTo(opcionesScroll);
      }
      
      window.scrollTo(opcionesScroll);
    }, 50);
  }, [currentPage]);

  useEffect(() => {
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const genresUrl = `${BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}&language=es-ES`;
    fetch(genresUrl)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.genres) {
          setGenresList(data.genres); 
        }
      })
      .catch(err => console.error("Error al cargar géneros de TMDB:", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    let url = '';
    if (activeSearch.trim() !== '') {
      url = `${BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(activeSearch)}&page=${currentPage}`;
    } else {
      url = `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=es-ES&sort_by=popularity.desc&page=${currentPage}`;
      
      if (filters.genero !== 'Todos') {
        const selectedGenreObj = genresList.find(g => g.name === filters.genero);
        if (selectedGenreObj) {
          url += `&with_genres=${selectedGenreObj.id}`;
        }
      }
      if (filters.año !== 'Todos') {
        url += `&first_air_date_year=${filters.año}`;
      }
    }
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Error al consultar la lista general de TMDB');
        return res.json();
      })
      .then(async (data) => {
        if (!data.results) return;
        const detailPromises = data.results.map(item => 
          fetch(`${BASE_URL}/tv/${item.id}?api_key=${TMDB_API_KEY}&language=es-ES`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null) 
        );

        const detailedResults = await Promise.all(detailPromises);

        const statusMap = {
          'Returning Series': 'En emisión',
          'Planned': 'Planeada',
          'In Production': 'En producción',
          'Ended': 'Finalizada',
          'Canceled': 'Cancelada',
          'Pilot': 'Piloto'
        };
        const adaptedData = data.results.map((item, index) => {
          const details = detailedResults[index];
          
          return {
            id: item.id,
            titulo: item.name,
            año: item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A',
            calificacion: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
            estado: details ? (statusMap[details.status] || details.status) : 'N/A',
            genero: item.genre_ids && item.genre_ids.length > 0 ? GENRE_MAP[item.genre_ids[0]] || 'Otros' : 'N/A',
            temporadas: details ? details.number_of_seasons : 'N/A',
            episodios: details ? details.number_of_episodes : 'N/A',
            canal: details && details.networks && details.networks.length > 0 
              ? details.networks[0].name 
              : (item.origin_country && item.origin_country.length > 0 ? item.origin_country[0] : 'N/A')
          };
        });

        let finalData = adaptedData;
        if (filters.estado !== 'Todos') {
          finalData = adaptedData.filter(serie => serie.estado.toLowerCase() === filters.estado.toLowerCase());
        }

        setSeriesData(finalData);
        const safeTotalPages = Math.min(data.total_pages, 500);
        setTotalPages(safeTotalPages);
        setTotalRecords(Math.min(data.total_results, safeTotalPages * rowsPerPage));
      })
      .catch(err => console.error("Error cargando los datos estructurados de TMDB:", err));

  }, [currentPage, activeSearch, filters]);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleSelectFilter = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setActiveSearch(''); 
    setSearchInput('');
    setCurrentPage(1); 
    setActiveDropdown(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setActiveSearch(searchInput);
      setFilters({ genero: 'Todos', año: 'Todos', estado: 'Todos' }); 
      setCurrentPage(1);
    }
  };

  const handleDelete = (serie) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar "${serie.titulo}" de la lista. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#4A4849',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#2F2D2E',
      color: '#FFFFFF'
    }).then((result) => {
      if (result.isConfirmed) {
        setSeriesData((seriesActuales) => 
          seriesActuales.filter((item) => item.id !== serie.id)
        );

        Swal.fire({
          title: '¡Eliminado!',
          text: 'El contenido ha sido eliminado de la tabla.',
          icon: 'success',
          confirmButtonColor: '#048BA8',
          background: '#2F2D2E',
          color: '#FFFFFF'
        });
      }
    });
  };

  const indexOfFirstRecord = totalRecords === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const indexOfLastRecord = Math.min(currentPage * rowsPerPage, totalRecords);

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeDropdown && !dropdownRefs.current[activeDropdown]?.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    const handleSessionChange = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      setHasToken(!!token);
    };
    window.addEventListener('session-changed', handleSessionChange);
    return () => window.removeEventListener('session-changed', handleSessionChange);
  }, []);

  if (!hasToken) {
    return (
      <div className={styles.unauthorizedContainer}>
        <div className={styles.unauthorizedCard}>
          <h2>Acceso Restringido</h2>
          <p>Es necesario iniciar sesión para visualizar el catálogo de series.</p>
          <button 
            className={styles.unauthorizedBtn} 
            onClick={() => window.location.reload()}
          >
            Ir al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    // Aplicamos la referencia al contenedor principal
    <div className={styles.mainContainer} ref={mainContainerRef}>
      
      <div className={styles.topControls}>
        <div className={styles.searchBox}>
          <img src="icons/searchIcon.svg" alt="Buscar" className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por nombre de serie y presionar Enter..." 
            className={styles.searchInput}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className={styles.filtersGroup}>
          <button className={styles.filterBtnIcon}>
            <img src="icons/filterIcon.svg" alt="Icono Filtro" className={styles.smallIcon} />
          </button>

          <div className={styles.dropdownContainer} ref={el => dropdownRefs.current['genero'] = el}>
            <button className={styles.filterBtn} onClick={() => toggleDropdown('genero')}>
                Género: {filters.genero}
            </button>
            {activeDropdown === 'genero' && (
                <ul className={styles.dropdownMenu}>
                <li onClick={() => handleSelectFilter('genero', 'Todos')}>Todos</li>
                {genresList.map((genre) => (
                    <li key={genre.id} onClick={() => handleSelectFilter('genero', genre.name)}>
                    {genre.name}
                    </li>
                ))}
                </ul>
            )}
          </div>

          <div className={styles.dropdownContainer} ref={el => dropdownRefs.current['año'] = el}>
            <button className={styles.filterBtn} onClick={() => toggleDropdown('año')}>
              Año: {filters.año}
            </button>
            {activeDropdown === 'año' && (
              <ul className={styles.dropdownMenu}>
                <li onClick={() => handleSelectFilter('año', 'Todos')}>Todos</li>
                <li onClick={() => handleSelectFilter('año', '2026')}>2026</li>
                <li onClick={() => handleSelectFilter('año', '2025')}>2025</li>
                <li onClick={() => handleSelectFilter('año', '2024')}>2024</li>
                <li onClick={() => handleSelectFilter('año', '2023')}>2023</li>
                <li onClick={() => handleSelectFilter('año', '2022')}>2022</li>
              </ul>
            )}
          </div>

          <div className={styles.dropdownContainer} ref={el => dropdownRefs.current['estado'] = el}>
            <button className={styles.filterBtn} onClick={() => toggleDropdown('estado')}>
              Estado: {filters.estado}
            </button>
            {activeDropdown === 'estado' && (
              <ul className={styles.dropdownMenu}>
                <li onClick={() => handleSelectFilter('estado', 'Todos')}>Todos</li>
                <li onClick={() => handleSelectFilter('estado', 'En emisión')}>En emisión</li>
                <li onClick={() => handleSelectFilter('estado', 'Finalizada')}>Finalizada</li>
                <li onClick={() => handleSelectFilter('estado', 'Cancelada')}>Cancelada</li>
              </ul>
            )}
          </div>
        </div>

        <div className={styles.globalActions}>
          <button className={styles.actionBtnTop} onClick={() => setIsAddOpen(true)}>
            <img src="icons/addIcon.png" alt="Añadir nuevo" />
          </button>
        </div>
      </div>

      {/* Aplicamos la segunda referencia al contenedor de la tabla */}
      <div className={styles.tableWrapper} ref={tableWrapperRef}>
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Año</th>
              <th>Calificación</th>
              <th>Estado</th>
              <th>Género</th>
              <th>Temporadas</th>
              <th>Canal/Red</th>
              <th>Episodios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {seriesData.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2.5rem', color: '#666' }}>
                  No se encontraron series que coincidan con los criterios establecidos.
                </td>
              </tr>
            ) : (
              seriesData.map((serie) => (
                <tr key={serie.id}>
                  <td style={{fontWeight: 'bold'}}>{serie.titulo}</td>
                  <td>{serie.año}</td>
                  <td>{serie.calificacion}</td>
                  <td>{serie.estado}</td>
                  <td>{serie.genero}</td>
                  <td>{serie.temporadas}</td>
                  <td>{serie.canal}</td>
                  <td>{serie.episodios}</td>
                  <td>
                    <div className={styles.rowActionsContainer}>
                      <img src="icons/heart.svg" alt="Favorito" className={styles.actionIcon} />
                      <img src="icons/editar.png" alt="Editar elemento" className={styles.actionIcon} onClick={() => {
                        setSerieAEditar(serie); 
                        setIsEditOpen(true);
                    }} />
                      <img 
                        src="icons/eliminar.png" 
                        alt="Eliminar elemento" 
                        className={styles.actionIcon} 
                        onClick={() => handleDelete(serie)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationFooter}>
        <div className={styles.paginationInfo}>
          <span>Filas por página</span>
          <select value={rowsPerPage} disabled className={styles.rowsSelect}>
            <option value={20}>20 </option>
          </select>
          <span>Mostrando {indexOfFirstRecord}-{indexOfLastRecord} de {totalRecords}</span>
        </div>

        <div className={styles.paginationControls}>
          <button 
            className={styles.arrowBtn} 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <img src="icons/izquierda.svg" alt="Anterior" />
          </button>
          
          {renderPageNumbers().map(num => (
            <button 
              key={num} 
              className={`${styles.pageNumberBtn} ${currentPage === num ? styles.activePage : ''}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <button 
            className={styles.arrowBtn} 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <img src="icons/derecha.svg" alt="Siguiente" />
          </button>
        </div>
      </div>
      
      <FormEdit 
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        elementoSeleccionado={serieAEditar}
        onEditElement={(datosActualizados) => {
          setSeriesData((seriesActuales) => 
            seriesActuales.map((serie) => 
              serie.id === datosActualizados.id ? datosActualizados : serie
            )
          );
        }}
      />

      <FormAdd 
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddElement={(nuevaSerie) => {
          setSeriesData((seriesActuales) => [nuevaSerie, ...seriesActuales]);
        }}
      />
    </div>
  );
}