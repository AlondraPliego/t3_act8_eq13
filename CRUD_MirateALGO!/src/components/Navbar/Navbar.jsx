import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import styles from './Navbar.module.css';

// Ícono de campana embebido en SVG: así nunca se rompe aunque falte bellIcon.png
const BELL_ICON_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`
  );

// Notificaciones de ejemplo, estilo Netflix: solo texto y tiempo, sin ir a otra página
const NOTIFICACIONES_MOCK = [
  { id: 1, texto: '🔥 "Wednesday" sigue en tendencia esta semana.', tiempo: 'Hace 2 h' },
  { id: 2, texto: '🎬 Se agregaron nuevos episodios de "The Last of Us".', tiempo: 'Hace 5 h' },
  { id: 3, texto: '⭐ "Stranger Things" continúa entre las más vistas.', tiempo: 'Ayer' },
  { id: 4, texto: '📺 Nuevas series recomendadas para ti.', tiempo: 'Hace 2 días' },
];

export default function Navbar() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificaciones] = useState(NOTIFICACIONES_MOCK);
  const [noLeidas, setNoLeidas] = useState(NOTIFICACIONES_MOCK.length);

  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    foto: ""
  });

  const dropdownRef = useRef(null);

  useEffect(() => {

    const datos = localStorage.getItem("usuario");

    if (datos) {
      setUsuario(JSON.parse(datos));
    }

  }, []);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsNotificationsOpen(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    const abriendo = !isNotificationsOpen;
    setIsNotificationsOpen(abriendo);
    setIsDropdownOpen(false);

    // Al abrir la campanita, se marcan como leídas (como en Netflix)
    if (abriendo) {
      setNoLeidas(0);
    }
  };

  const cerrarSesion = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Volverás a la pantalla de inicio de sesión.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#048BA8',
      cancelButtonColor: '#4A4849',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#2F2D2E',
      color: '#FFFFFF'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        sessionStorage.removeItem("token");

        // Al recargar, App.jsx ya no encuentra token y muestra el Login
        window.location.reload();
      }
    });
  };

  return (

    <nav className={styles.navbarContainer}>

      <div className={styles.brandSection}>
        <img
          src="icons/tvIcon.png"
          alt="TV"
          className={styles.tvIcon}
        />

        <span className={styles.brandName}>
          MirateALGO!
        </span>
      </div>

      <div
        className={styles.toolsSection}
        ref={dropdownRef}
      >

        {/* BOTÓN NOTIFICACIONES */}

        <button
          className={styles.notificationBtn}
          onClick={toggleNotifications}
          style={{ position: 'relative' }}
        >
          <img
            src="icons/bellIcon.png"
            alt="Campana"
            className={styles.toolIcon}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = BELL_ICON_FALLBACK; }}
          />
          {noLeidas > 0 && (
            <span className={styles.notificationBadge}>{noLeidas}</span>
          )}
        </button>

        {isNotificationsOpen && (

          <div className={`${styles.profileDropdown} ${styles.notificationsDropdown}`}>

            <h4 className={styles.notificationsTitle}>
              🔔 Notificaciones
            </h4>

            {notificaciones.length === 0 ? (
              <p className={styles.notificationEmpty}>No tienes notificaciones nuevas.</p>
            ) : (
              notificaciones.map((n, index) => (
                <div key={n.id}>
                  <div className={styles.notificationItem}>
                    <p className={styles.notificationText}>{n.texto}</p>
                    <span className={styles.notificationTime}>{n.tiempo}</span>
                  </div>
                  {index < notificaciones.length - 1 && <hr className={styles.notificationDivider} />}
                </div>
              ))
            )}

          </div>

        )}

        {/* BOTÓN USUARIO */}

        <button
          className={styles.userMenuTrigger}
          onClick={toggleDropdown}
        >

          <img
            src={
              usuario.foto ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Usuario"
            className={styles.toolIcon}
            style={{
              borderRadius: "50%"
            }}
          />

          <span className={styles.userText}>
            {usuario.nombre || "Usuario"}
          </span>

        </button>

        {isDropdownOpen && (

          <div className={styles.profileDropdown}>

            <div className={styles.avatarContainer}>

              <img
                src={
                  usuario.foto ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Perfil"
                className={styles.profileImageAvatar}
              />

            </div>

            <h4 className={styles.userNameDisplay}>
              {usuario.nombre}
            </h4>

            <p
              style={{
                fontSize: "13px",
                marginBottom: "20px",
                color: "#ccc"
              }}
            >
              {usuario.correo}
            </p>

            <button
              className={styles.logoutActionBtn}
              onClick={cerrarSesion}
            >
              Cerrar Sesión
            </button>

          </div>

        )}

      </div>

    </nav>

  );

}