import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FaBell, FaChevronDown } from "react-icons/fa";

function Navbar() {

    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

<<<<<<< HEAD
    const [notificaciones, setNotificaciones] = useState([]);

    const [usuario, setUsuario] = useState({
        nombre: "Usuario",
        correo: "usuario@miratealgo.com",
        foto: ""
    });

    useEffect(() => {

        const datos = localStorage.getItem("usuario");

        if (datos) {
            setUsuario(JSON.parse(datos));
        }

    }, []);

    useEffect(() => {

        async function obtenerNotificaciones() {

            try {

                const respuesta = await fetch("https://dummyjson.com/products?limit=5");

                const datos = await respuesta.json();

                setNotificaciones(datos.products);

            } catch (error) {

                console.log(error);

            }

        }

        obtenerNotificaciones();

    }, []);

    const cerrarSesion = () => {

        localStorage.removeItem("usuario");
        window.location.reload();

    };

    return (

        <header className={styles.navbar}>

            <div></div>

            <div className={styles.rightSection}>

                <button
                    className={styles.bell}
                    onClick={() => {
                        setMostrarNotificaciones(!mostrarNotificaciones);
                        setMostrarMenu(false);
                    }}
                >
                    <FaBell />
                </button>

                <div
                    className={styles.profile}
                    onClick={() => {
                        setMostrarMenu(!mostrarMenu);
                        setMostrarNotificaciones(false);
                    }}
                >

                    <img
                        src={
                            usuario.foto ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="perfil"
                    />

                    <span>{usuario.nombre}</span>

                    <FaChevronDown />

                </div>

                {mostrarMenu && (

                    <div className={styles.dropdown}>

                        <img
                            src={
                                usuario.foto ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="perfil"
                        />

                        <h3>{usuario.nombre}</h3>

                        <p>{usuario.correo}</p>

                        <button onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>

                    </div>

                )}

                {mostrarNotificaciones && (

                    <div className={styles.notifications}>

                        <h3>Notificaciones</h3>

                        {notificaciones.map((item) => (

                            <div
                                key={item.id}
                                className={styles.notificationItem}
                            >
                                🎬 {item.title}
                            </div>

                        ))}

                    </div>

                )}

=======
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
            src="icons/bellIcon.png" 
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
            src="icons/userIcon.png" 
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
>>>>>>> f754eb70009e455dfbb55bc6ad64dffecce4d2a7
            </div>

        </header>

    );

}

export default Navbar;