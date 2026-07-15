import React, { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const NOTIFICACIONES_MOCK = [
    { id: 1, texto: '"Wednesday" sigue en tendencia esta semana.', tiempo: 'Hace 2 h' },
    { id: 2, texto: 'Se agregaron nuevos episodios de "The Last of Us".', tiempo: 'Hace 5 h' },
    { id: 3, texto: '"Stranger Things" continúa entre las más vistas.', tiempo: 'Ayer' },
    { id: 4, texto: 'Nuevas series recomendadas para ti.', tiempo: 'Hace 2 días' },
  ];

  const [notificaciones] = useState(NOTIFICACIONES_MOCK);
  const [noLeidas, setNoLeidas] = useState(NOTIFICACIONES_MOCK.length);

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
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    const abriendo = !isNotificationsOpen;

    setIsNotificationsOpen(abriendo);
    setIsDropdownOpen(false);

    if (abriendo) {
      setNoLeidas(0);
    }
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
        <button
          className={styles.notificationBtn}
          onClick={toggleNotifications}
          style={{ position: 'relative' }}
          aria-label="Notificaciones del sistema"
        >
          <img 
            src="icons/notificacion.svg" 
            alt="Icono descriptivo de campana de notificaciones" 
            className={styles.toolIcon} 
          />
          {noLeidas > 0 && (
            <span className={styles.notificationBadge}>
              {noLeidas}
            </span>
          )}
        </button>

        {isNotificationsOpen && (
          <div className={`${styles.profileDropdown} ${styles.notificationsDropdown}`}>
            <h4 className={styles.notificationsTitle}>
              Notificaciones
            </h4>

            {notificaciones.length === 0 ? (
              <p className={styles.notificationEmpty}>
                No tienes notificaciones nuevas.
              </p>
            ) : (
              notificaciones.map((n, index) => (
                <div key={n.id}>
                  <div className={styles.notificationItem}>
                    <p className={styles.notificationText}>{n.texto}</p>
                    <span className={styles.notificationTime}>{n.tiempo}</span>
                  </div>

                  {index < notificaciones.length - 1 && (
                    <hr className={styles.notificationDivider} />
                  )}
                </div>
              ))
            )}
          </div>
        )}

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