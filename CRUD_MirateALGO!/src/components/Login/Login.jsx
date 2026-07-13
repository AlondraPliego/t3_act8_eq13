import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí manejarías la lógica de inicio de sesión
    console.log({ email, password, rememberMe });
   if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.loginCard}>
        
        {/* Sección del Formulario */}
        <div className={styles.formSection}>
          <h1 className={styles.title}>Iniciar Sesión</h1>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                id="email"
                placeholder="Correo" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input 
                type="password" 
                id="password"
                placeholder="Contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.customCheckbox}></span>
                Recordarme
              </label>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Entrar
            </button>
          </form>

          {/* Divisor */}
          <div className={styles.divider}>
            <span>O continuar con</span>
          </div>

          {/* Botones de Redes Sociales */}
          <div className={styles.socialGroup}>
            <button className={styles.socialBtn} aria-label="Iniciar sesión con Google">
              <img src="/icons/googlelogo.svg" alt="Google Icon" className={styles.socialIcon} />
            </button>
            <button className={styles.socialBtn} aria-label="Iniciar sesión con Facebook">
              <img src="/icons/facebooklogo.svg" alt="Facebook Icon" className={styles.socialIcon} />
            </button>
            <button className={styles.socialBtn} aria-label="Iniciar sesión con Apple">
              <img src="/icons/applelogo.svg" alt="Apple Icon" className={styles.socialIcon} />
            </button>
          </div>
        </div>

        {/* Sección de la Imagen de Portada */}
        <div className={styles.imageSection}>
          <img 
            src="/img/imagenlogin.jpg"
            alt="AMC Cinema Entrance Billboard" 
            className={styles.coverImage}
          />
        </div>

      </div>
    </div>
  );
}