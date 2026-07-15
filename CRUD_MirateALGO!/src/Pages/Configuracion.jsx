import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Configuracion() {

    const [usuario, setUsuario] = useState({
        firstName: "",
        lastName: "",
        email: "",
        image: ""
    });

    useEffect(() => {

        const datos = localStorage.getItem("userData") || sessionStorage.getItem("userData");

        if (datos) {
            setUsuario(JSON.parse(datos));
        }

    }, []);

    const handleEliminarCuenta = () => {
        Swal.fire({
            title: "¿Eliminar tu cuenta?",
            text: `Se cerrará tu sesión y se borrarán tus datos locales, ${usuario.firstName || "usuario"}. Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#4A4849",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            background: "#2F2D2E",
            color: "#FFFFFF"
        }).then((result) => {
            if (result.isConfirmed) {
                // Limpiamos todo rastro de la sesión y del usuario
                localStorage.removeItem("token");
                localStorage.removeItem("userData");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userData");

                Swal.fire({
                    title: "Cuenta eliminada",
                    text: "Tu cuenta y tu sesión se cerraron correctamente.",
                    icon: "success",
                    confirmButtonColor: "#048BA8",
                    background: "#2F2D2E",
                    color: "#FFFFFF"
                }).then(() => {
                    // Al recargar, App.jsx detecta que ya no hay token y muestra el Login
                    window.location.reload();
                });
            }
        });
    };

    return (

        <div style={{ padding: "30px" }}>

            <h1> Configuración</h1>

            <br />

            <img
                src={
                    usuario.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="perfil"
                width="120"
                style={{ borderRadius: "50%" }}
            />

            <h2>{usuario.firstName} {usuario.lastName}</h2>

            <p><strong>Correo:</strong> {usuario.email}</p>

            <p><strong>Contraseña:</strong> ********</p>

            <button
                onClick={handleEliminarCuenta}
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