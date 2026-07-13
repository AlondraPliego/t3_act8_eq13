import React, { useState, useEffect, useRef } from 'react';
import styles from './MainContent.module.css';

export default function MainContent() {
  // ==========================================
  // ESTADOS DE LA APLICACIÓN
  // ==========================================
  const [seriesData, setSeriesData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Filtros
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filters, setFilters] = useState({
    genero: 'Todos',
    año: 'Todos',
    estado: 'Todos'
  });

  const dropdownRefs = useRef({});

  // ==========================================
  // ZONA PARA TU CONSUMO DE API
  // ==========================================
  useEffect(() => {
    /* 
      Aquí vas a desarrollar el código para traer tus datos reales.
      Ejemplo de cómo lo harías:
      
      fetch(`tu-api.com/series?page=${currentPage}&limit=${rowsPerPage}`)
        .then(res => res.json())
        .then(data => {
          setSeriesData(data.results);
          setTotalRecords(data.total);
        });
    */

    // MOCK DATA: Datos de prueba basados en tu imagen para maquetación inicial
    const mockData = [
      { id: 1, titulo: 'Breaking Bad', año: 2008, calificacion: 8.9, estado: 'Finalizada', genero: 'Drama/Crimen', temporadas: 5, canal: 'AMC', episodios: 62 },
      { id: 2, titulo: 'Stranger Things', año: 2016, calificacion: 8.6, estado: 'Finalizada', genero: 'Ciencia Fi', temporadas: 5, canal: 'NETFLIX', episodios: 42 },
      { id: 3, titulo: 'The Office', año: 2005, calificacion: 8.7, estado: 'Finalizada', genero: 'Comedia', temporadas: 9, canal: 'NBC', episodios: 201 },
      { id: 4, titulo: 'Game of Thrones', año: 2011, calificacion: 8.4, estado: 'Finalizada', genero: 'Fantasía', temporadas: 8, canal: 'HBO', episodios: 73 },
      { id: 5, titulo: 'The Mandalorian', año: 2019, calificacion: 8.5, estado: 'Finalizada', genero: 'Ciencia Fi', temporadas: 3, canal: 'DISNEY +', episodios: 24 },
    ];
    
    setSeriesData(mockData);
    setTotalRecords(250); // Simulación de base de datos grande
  }, [currentPage, rowsPerPage, filters]); // Se vuelve a ejecutar si cambias página, cantidad o filtros

  // ==========================================
  // LÓGICA DE INTERFAZ (Paginación y Menús)
  // ==========================================
  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Regresa a la página 1 al cambiar la cantidad de filas
  };

  // Cálculos dinámicos para el texto inferior
  const indexOfFirstRecord = (currentPage - 1) * rowsPerPage + 1;
  const indexOfLastRecord = Math.min(currentPage * rowsPerPage, totalRecords);

  // Cerrar dropdowns si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeDropdown && !dropdownRefs.current[activeDropdown]?.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  return (
    <div className={styles.mainContainer}>
      
      {/* 1. BARRA SUPERIOR DE NAVEGACIÓN Y FILTROS */}
      <div className={styles.topControls}>
        
        {/* Buscador */}
        <div className={styles.searchBox}>
          <img src="/icons/searchIcon.png" alt="Buscar" className={styles.searchIcon} />
          <input type="text" placeholder="Buscar por nombre de serie ..." className={styles.searchInput} />
        </div>

        {/* Filtros Desplegables */}
        <div className={styles.filtersGroup}>
          <button className={styles.filterBtnIcon}>
            <img src="/icons/filterIcon.png" alt="Icono Filtro" className={styles.smallIcon} />
          </button>

          {/* Menú Género */}
          <div className={styles.dropdownContainer} ref={el => dropdownRefs.current['genero'] = el}>
            <button className={styles.filterBtn} onClick={() => toggleDropdown('genero')}>
              Genero: {filters.genero}
            </button>
            {activeDropdown === 'genero' && (
              <ul className={styles.dropdownMenu}>
                <li>Terror</li>
                <li>Drama</li>
                <li>Comedia</li>
                <li>Ciencia-Ficción</li>
              </ul>
            )}
          </div>

          {/* Menú Año */}
          <div className={styles.dropdownContainer} ref={el => dropdownRefs.current['año'] = el}>
            <button className={styles.filterBtn} onClick={() => toggleDropdown('año')}>
              Año: {filters.año}
            </button>
            {activeDropdown === 'año' && (
              <ul className={styles.dropdownMenu}>
                <li>2000's</li>
                <li>2011</li>
                <li>2016</li>
                <li>2026</li>
              </ul>
            )}
          </div>

          {/* Menú Estado */}
          <div className={styles.dropdownContainer} ref={el => dropdownRefs.current['estado'] = el}>
            <button className={styles.filterBtn} onClick={() => toggleDropdown('estado')}>
              Estado: {filters.estado}
            </button>
            {activeDropdown === 'estado' && (
              <ul className={styles.dropdownMenu}>
                <li>Finalizada</li>
                <li>Cancelado</li>
                <li>En emisión</li>
                <li>Nueva Temporada</li>
              </ul>
            )}
          </div>
        </div>

        {/* Botones de Acción Globales */}
        <div className={styles.globalActions}>
          <button className={styles.actionBtnTop}><img src="/icons/trashTopIcon.png" alt="Eliminar seleccionados" /></button>
          <button className={styles.actionBtnTop}><img src="/icons/addTopIcon.png" alt="Añadir nuevo" /></button>
          <button className={styles.actionBtnTop}><img src="/icons/editTopIcon.png" alt="Edición rápida" /></button>
        </div>
      </div>

      {/* 2. TABLA PRINCIPAL */}
      <div className={styles.tableWrapper}>
        <table className={styles.customTable}>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Año</th>
              <th>Calificación</th>
              <th>Estado</th>
              <th>Genero</th>
              <th>Temporadas</th>
              <th>Canal</th>
              <th>Episodios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {seriesData.map((serie) => (
              <tr key={serie.id}>
                <td style={{fontWeight: 'bold'}}>{serie.titulo}</td>
                <td>{serie.año}</td>
                <td>{serie.calificacion}</td>
                <td>{serie.estado}</td>
                <td>{serie.genero}</td>
                <td>{serie.temporadas}</td>
                <td>{serie.canal}</td>
                <td>{serie.episodios}</td>
                <td className={styles.rowActions}>
                  <img src="/icons/heartIcon.png" alt="Favorito" className={styles.actionIcon} />
                  {/* Botones de edición/eliminación PARTICULARES por fila */}
                  <img src="/icons/editRowIcon.png" alt="Editar elemento" className={styles.actionIcon} />
                  <img src="/icons/trashRowIcon.png" alt="Eliminar elemento" className={styles.actionIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. PAGINACIÓN INFERIOR */}
      <div className={styles.paginationFooter}>
        
        {/* Selector y Texto dinámico */}
        <div className={styles.paginationInfo}>
          <span>Filas por página</span>
          <select value={rowsPerPage} onChange={handleRowsChange} className={styles.rowsSelect}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>Mostrando {indexOfFirstRecord}-{indexOfLastRecord} de {totalRecords}</span>
        </div>

        {/* Controles de números de página */}
        <div className={styles.paginationControls}>
          <button className={styles.arrowBtn} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
            <img src="/icons/leftArrow.png" alt="Anterior" />
          </button>
          
          {/* Ejemplo de páginas (Puedes hacer un map dinámico aquí) */}
          {[1, 2, 3, 4, 5, 6, 7].map(num => (
            <button 
              key={num} 
              className={`${styles.pageNumberBtn} ${currentPage === num ? styles.activePage : ''}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <button className={styles.arrowBtn} onClick={() => setCurrentPage(p => p + 1)}>
            <img src="/icons/rightArrow.png" alt="Siguiente" />
          </button>
        </div>

      </div>

    </div>
  );
}