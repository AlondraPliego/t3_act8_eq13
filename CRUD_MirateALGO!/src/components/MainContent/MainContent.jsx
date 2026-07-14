import Tendencias from "../../Pages/Tendencias";
import Favoritos from "../../Pages/Favoritos";
import MiLista from "../../Pages/MiLista";
import Configuracion from "../../Pages/Configuracion";

function MainContent({ seccion }) {

    switch (seccion) {

        case "tendencias":
            return <Tendencias />;

        case "favoritos":
            return <Favoritos />;

        case "lista":
            return <MiLista />;

        case "configuracion":
            return <Configuracion />;

        default:
            return (

                <div style={{ padding: "30px" }}>

                    <h1>🏠 Inicio</h1>

                    <p>
                        Aquí aparecerá la tabla CRUD realizada por el resto del equipo.
                    </p>

                </div>

            );

    }

}

export default MainContent;