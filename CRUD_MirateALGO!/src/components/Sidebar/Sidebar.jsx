import styles from "./Sidebar.module.css";

import {
  FaHome,
  FaFire,
  FaHeart,
  FaList,
  FaCog,
  FaBars,
} from "react-icons/fa";

function Sidebar({ seccion, setSeccion, abierto, setAbierto }) {
  return (
    <aside
      className={`${styles.sidebar} ${!abierto ? styles.closed : ""}`}
    >
      <div className={styles.logo}>
        {abierto && <h2>MirateALGO!</h2>}
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