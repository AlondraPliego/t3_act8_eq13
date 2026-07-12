import { useState } from 'react';
import Login from './components/Login/Login';
//import Navbar from './components/Navbar/Navbar';
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
            {/* Aquí colocaremos el Sidebar e izquierdo y la Zona Central "Play" */}
            <aside style={{ color: '#fff', padding: '20px' }}>[Aquí irá tu Sidebar]</aside>
            <main style={{ color: '#fff', padding: '20px', flex: 1 }}>[Aquí irá la Zona Central Play]</main>
          </div>
        </div>
      )}
    </>
  );
}

export default App;