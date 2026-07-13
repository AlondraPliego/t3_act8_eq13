import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  // Por defecto arranca unicamente con los iconos (colapsado)
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Arreglo de opciones con nombres de iconos descriptivos
  const menuItems = [
    { id: 'inicio', text: 'Inicio', icon: '/icons/iconoHome.png' },
    { id: 'tendencias', text: 'Tendencias', icon: '/icons/iconoTrends.png' },
    { id: 'favoritos', text: 'Favoritos', icon: '/icons/iconoFavorites.png' },
    { id: 'mi-lista', text: 'Mi lista', icon: '/icons/iconoMyList.png' },
    { id: 'configuracion', text: 'Configuración', icon: '/icons/iconoSettings.png' },
    { id: 'cerrar-sesion', text: 'Cerrar Sesión', icon: '/icons/iconoLogout.png' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      
      {/* Botón de Hamburguesa */}
      <div className={styles.hamburgerSection}>
        <button className={styles.hamburgerBtn} onClick={toggleSidebar} aria-label="Menu">
          <img 
            src="/icons/iconoMenu.png" 
            alt="Icono descriptivo menu hamburguesa" 
            className={styles.hamburgerIcon} 
          />
        </button>
      </div>

      {/* Lista de Navegación */}
      <nav className={styles.navMenu}>
        {menuItems.map((item) => (
          <button key={item.id} className={styles.navItem} title={item.text}>
            <div className={styles.iconWrapper}>
              <img 
                src={item.icon} 
                alt={`Icono descriptivo para ${item.text}`} 
                className={styles.menuIcon} 
              />
            </div>
            {/* El texto solo se renderiza/muestra visualmente si está expandido */}
            <span className={styles.menuText}>{item.text}</span>
          </button>
        ))}
      </nav>

    </aside>
  );
}