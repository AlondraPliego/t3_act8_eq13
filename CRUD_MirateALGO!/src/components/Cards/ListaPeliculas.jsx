import { useEffect, useState } from "react";

function ListaPeliculas({ titulo, mensaje, limit = 5 }) {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function obtenerDatos() {
      try {
        setCargando(true);

        const respuesta = await fetch("https://api.tvmaze.com/shows");

        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los datos.");
        }

        const datos = await respuesta.json();

        setPeliculas(datos.slice(0, limit));
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }

    obtenerDatos();
  }, [limit]);

  if (cargando) {
    return (
      <div style={{ padding: "30px", color: "white" }}>
        <h2>Cargando...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px", color: "white" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", color: "white" }}>

      <h1>{titulo}</h1>

      <p
        style={{
          marginTop: "10px",
          marginBottom: "30px",
          color: "#bdbdbd"
        }}
      >
        {mensaje}
      </p>

      {peliculas.map((pelicula) => (

        <div
          key={pelicula.id}
          style={{
            marginBottom: "25px",
            borderBottom: "1px solid #555",
            paddingBottom: "15px"
          }}
        >

          <h2>{pelicula.name}</h2>

          <p>
            <strong>Género:</strong>{" "}
            {pelicula.genres.length > 0
              ? pelicula.genres.join(", ")
              : "Sin género"}
          </p>

          <p>
            <strong>Idioma:</strong> {pelicula.language}
          </p>

          <p>
            <strong>Estado:</strong> {pelicula.status}
          </p>

        </div>

      ))}

    </div>
  );
}

export default ListaPeliculas;