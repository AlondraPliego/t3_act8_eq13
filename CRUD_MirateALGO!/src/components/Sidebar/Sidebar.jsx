import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './Sidebar.module.css';

export default function Sidebar({
  paginaActual,
  setPaginaActual
}) {
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
          <Icon icon="mdi:menu" className={styles.hamburgerIcon} width={24} height={24} />
        </button>
      </div>

      {/* Lista de Navegación */}
      <nav className={styles.navMenu}>
        {menuItems.map((item) => (
          <button
  key={item.id}
  className={`${styles.navItem} ${
    paginaActual === item.id ? styles.active : ""
  }`}
  onClick={() => setPaginaActual(item.id)}
>
            <div className={styles.itemContent}>
              <img
                src={item.icon}
                alt={`Icono descriptivo para ${item.text}`}
                className={styles.menuIcon}
                width={24}
                height={24}
              />
              <span className={styles.menuText}>{item.text}</span>
            </div>
          </button>
        ))}
      </nav>

    </aside>
  );
}