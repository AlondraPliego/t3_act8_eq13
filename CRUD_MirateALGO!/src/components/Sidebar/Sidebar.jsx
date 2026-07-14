import styles from "./Sidebar.module.css";

<<<<<<< HEAD
import {
  FaHome,
  FaFire,
  FaHeart,
  FaList,
  FaCog,
  FaBars,
} from "react-icons/fa";
=======
export default function Sidebar() {
  // Estado para controlar si el menú está expandido o colapsado
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Menú con sus nombres correspondientes y rutas de iconos descriptivos
  const menuItems = [
    { id: 'inicio', text: 'Inicio', icon: 'icons/iconoHome.png' },
    { id: 'tendencias', text: 'Tendencias', icon: 'icons/iconoTrends.png' },
    { id: 'favoritos', text: 'Favoritos', icon: 'icons/iconoFavorites.png' },
    { id: 'mi-lista', text: 'Mi lista', icon: 'icons/iconoMyList.png' },
    { id: 'configuracion', text: 'Configuración', icon: 'icons/iconoSettings.png' },
    { id: 'cerrar-sesion', text: 'Cerrar Sesión', icon: 'icons/iconoLogout.png' },
  ];
>>>>>>> f754eb70009e455dfbb55bc6ad64dffecce4d2a7

function Sidebar({ seccion, setSeccion, abierto, setAbierto }) {
  return (
<<<<<<< HEAD
    <aside
      className={`${styles.sidebar} ${!abierto ? styles.closed : ""}`}
    >
      <div className={styles.logo}>
        {abierto && <h2>MirateALGO!</h2>}
=======
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
>>>>>>> f754eb70009e455dfbb55bc6ad64dffecce4d2a7
      </div>

      <button
        className={styles.menuBtn}
        onClick={() => setAbierto(!abierto)}
      >
        <FaBars />
      </button>

      <nav>
        <button
          className={seccion === "inicio" ? styles.active : ""}
          onClick={() => setSeccion("inicio")}
        >
          <FaHome />
          {abierto && <span>Inicio</span>}
        </button>

        <button
          className={seccion === "tendencias" ? styles.active : ""}
          onClick={() => setSeccion("tendencias")}
        >
          <FaFire />
          {abierto && <span>Tendencias</span>}
        </button>

        <button
          className={seccion === "favoritos" ? styles.active : ""}
          onClick={() => setSeccion("favoritos")}
        >
          <FaHeart />
          {abierto && <span>Favoritos</span>}
        </button>

        <button
          className={seccion === "lista" ? styles.active : ""}
          onClick={() => setSeccion("lista")}
        >
          <FaList />
          {abierto && <span>Mi lista</span>}
        </button>

        <button
          className={seccion === "configuracion" ? styles.active : ""}
          onClick={() => setSeccion("configuracion")}
        >
          <FaCog />
          {abierto && <span>Configuración</span>}
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;