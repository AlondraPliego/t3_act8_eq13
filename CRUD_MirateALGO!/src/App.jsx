import { useState } from 'react';
import Login from './components/Login/Login';
import Navbar from './components/Login/Navbar/Navbar';
import Sidebar from './components/Login/Sidebar/Sidebar';
import './App.css';

function App() {
  // Estado para controlar si el usuario ya inició sesión
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para simular el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        // Si no está autenticado, muestra el Login pasándole la función de éxito
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        // Si está autenticado, muestra la estructura de la Pantalla Principal
        <div className="main-layout">
          <Navbar />
          <div className="content-container">
  <Sidebar />

  <main className="main-play-content">
    <h1 style={{ color: '#fff' }}>Zona Central Play</h1>
  </main>
</div>
        </div>
      )}
    </>
  );
}

export default App;