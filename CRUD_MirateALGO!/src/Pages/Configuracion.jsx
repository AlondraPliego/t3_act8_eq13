import { useEffect, useState } from "react";

function Configuracion() {

    const [usuario, setUsuario] = useState({
        nombre: "",
        correo: "",
        foto: ""
    });

    useEffect(() => {

        const datos = localStorage.getItem("usuario");

        if (datos) {
            setUsuario(JSON.parse(datos));
        }

    }, []);

    return (

        <div style={{ padding: "30px" }}>

            <h1>⚙️ Configuración</h1>

            <br />

            <img
                src={
                    usuario.foto ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="perfil"
                width="120"
                style={{ borderRadius: "50%" }}
            />

            <h2>{usuario.nombre}</h2>

            <p><strong>Correo:</strong> {usuario.correo}</p>

            <p><strong>Contraseña:</strong> ********</p>

            <button
                style={{
                    marginTop: "20px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    cursor: "pointer"
                }}
            >
                Eliminar cuenta
            </button>

        </div>

    );

}

export default Configuracion;