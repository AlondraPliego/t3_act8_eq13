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

  // Menú con sus nombres correspondientes e íconos de Iconify (set Material Design Icons)
  const menuItems = [
    { id: 'inicio', text: 'Inicio', icon: 'mdi:home' },
    { id: 'tendencias', text: 'Tendencias', icon: 'mdi:trending-up' },
    { id: 'favoritos', text: 'Favoritos', icon: 'mdi:heart' },
    { id: 'mi-lista', text: 'Mi lista', icon: 'mdi:playlist-play' },
    { id: 'configuracion', text: 'Configuración', icon: 'mdi:cog' },
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
              <Icon
                icon={item.icon}
                className={styles.menuIcon}
                width={24}
                height={24}
              />
              {/* El texto siempre está en el HTML, pero el CSS controla su aparición */}
              <span className={styles.menuText}>{item.text}</span>
            </div>
          </button>
        ))}
      </nav>

    </aside>
  );
}