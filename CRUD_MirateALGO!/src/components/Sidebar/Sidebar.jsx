import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  // Estado para controlar si el menú está expandido o colapsado
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };


  const menuItems = [
    { id: 'inicio', text: 'Inicio', icon: 'icons/homelogo.svg' },
    { id: 'tendencias', text: 'Tendencias', icon: 'icons/trendlogo.svg' },
    { id: 'favoritos', text: 'Favoritos', icon: 'icons/favlogo.svg' },
    { id: 'mi-lista', text: 'Mi lista', icon: 'icons/mylistlogo.svg' },
    { id: 'configuracion', text: 'Configuración', icon: 'icons/settingslogo.svg' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      
      {/* Botón de Hamburguesa */}
      <div className={styles.hamburgerSection}>
        <button className={styles.hamburgerBtn} onClick={toggleSidebar} aria-label="Abrir menú">
          <img 
            src="icons/iconoMenu.png" 
            alt="Icono descriptivo menu hamburguesa" 
            className={styles.hamburgerIcon} 
          />
        </button>
      </div>

      {/* Lista de Navegación */}
      <nav className={styles.navMenu}>
        {menuItems.map((item) => (
          <button key={item.id} className={styles.navItem} Skinner-text={item.text}>
            <div className={styles.itemContent}>
              <img 
                src={item.icon} 
                alt={`Icono descriptivo para ${item.text}`} 
                className={styles.menuIcon} 
              />
              <span className={styles.menuText}>{item.text}</span>
            </div>
          </button>
        ))}
      </nav>

    </aside>
  );
}