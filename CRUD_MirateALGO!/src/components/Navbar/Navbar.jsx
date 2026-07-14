import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);

  // Leemos los datos del usuario que guardo el Login
  useEffect(() => {
    const datosGuardados = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    if (datosGuardados) {
      try {
        setUserData(JSON.parse(datosGuardados));
      } catch (error) {
        console.error("Error al leer los datos del usuario:", error);
      }
    }
  }, []);

  // Cerrar el menú si se click el botón
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

  // cerrar Sesion sin recargar la pagina
  const handleLogout = () => {
    // Elimina lo guardado en local y session storage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');

    // Actualizar estado local para mostrar "Usuario Invitado"
    setUserData(null);
    setIsDropdownOpen(false);

    window.dispatchEvent(new Event('session-changed'));
  };

  // Uusuario que usamos de prueba y cuando no se inicio sesión
  const nombreMostrar = userData ? `${userData.firstName} ${userData.lastName}` : "Invitado";
  const emailMostrar = userData ? userData.email : "invitado@miratealgo.com";
  const imagenMostrar = userData ? userData.image : "icons/invitadologo.svg";
  const usuarioCorto = userData ? userData.username : "Usuario";

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
          <span className={styles.userText}>{usuarioCorto}</span>
        </button>

        {/* Menú Desplegable Flotante (Esquina Superior Derecha) */}
        {isDropdownOpen && (
          <div className={styles.profileDropdown}>
            {/* Foto de perfil del usuario centrada */}
            <div className={styles.avatarContainer}>
              <img 
                src={imagenMostrar} 
                alt="Foto de perfil del usuario centrada" 
                className={styles.profileImageAvatar} 
              />
            </div>

            {/* Detalles de Cuenta reales de DummyJSON */}
            <h4 className={styles.userNameDisplay}>{nombreMostrar}</h4>
            <p className={styles.userEmailDisplay}>{emailMostrar}</p>

            {/* Acción de Salida real */}
            <button className={styles.logoutActionBtn} onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>

    </nav>
  );
}