import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.brandSection}>
        <img 
          src="icons/tvIcon.png" 
          alt="Icono descriptivo de televisión clásica" 
          className={styles.tvIcon} 
        />
        <span className={styles.brandName}>MirateALGO!</span>
      </div>

      {/* LADO DERECHO: Centro de Control del Usuario */}
      <div className={styles.toolsSection} ref={dropdownRef}>
        
        {/* Botón de Notificaciones */}
        <button className={styles.notificationBtn} aria-label="Notificaciones del sistema">
          <img 
            src="icons/notificacion.svg" 
            alt="Icono descriptivo de campana de notificaciones" 
            className={styles.toolIcon} 
          />
        </button>

        {/* Botón de Perfil de Usuario */}
        <button 
          className={styles.userMenuTrigger} 
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          aria-label="Menú de perfil de usuario"
        >
          <img 
            src="icons/usuario.svg" 
            alt="Icono descriptivo de silueta de usuario" 
            className={styles.toolIcon} 
          />
          <span className={styles.userText}>Usuario</span>
        </button>

        {/* Menú Desplegable Flotante (Esquina Superior Derecha) */}
        {isDropdownOpen && (
          <div className={styles.profileDropdown}>
            {/* Foto de perfil del usuario centrada */}
            <div className={styles.avatarContainer}>
              <img 
                src="images/userProfileAvatar.png" 
                alt="Foto de perfil del usuario administrador centrada" 
                className={styles.profileImageAvatar} 
              />
            </div>

            {/* Detalles de Cuenta */}
            <h4 className={styles.userNameDisplay}>Usuario Invitado</h4>
            <p className={styles.userEmailDisplay}>usuario.demo@miratealgo.com</p>

            {/* Acción de Salida */}
            <button className={styles.logoutActionBtn} onClick={() => setIsDropdownOpen(false)}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>

    </nav>
  );
}