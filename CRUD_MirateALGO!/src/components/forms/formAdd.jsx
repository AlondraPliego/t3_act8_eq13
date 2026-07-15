import React, { useState, useEffect } from 'react';
import styles from './forms.module.css';

export default function FormAdd({ isOpen, onClose, onAddElement }) {
  const estadoInicial = {
    titulo: '',
    año: '',
    calificacion: '',
    estado: 'Emision',
    genero: 'Comedia',
    temporadas: '',
    canal: '',
    episodios: ''
  };

  const [formData, setFormData] = useState(estadoInicial);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(estadoInicial);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleClear = () => {
    setFormData(estadoInicial);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validacion de campos vacios
    const hasEmptyFields = Object.values(formData).some(val => String(val).trim() === '');
    
    if (hasEmptyFields) {
      setError('Es necesario rellenar todos los campos.');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a añadir la serie "${formData.titulo}" al catálogo.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#048BA8', 
      cancelButtonColor: '#4A4849',  
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'Cancelar',
      background: '#2F2D2E',         
      color: '#FFFFFF'
    }).then((result) => {
      if (result.isConfirmed) {
        if (onAddElement) {
          onAddElement({ ...formData, id: Date.now() });
        }
        
        Swal.fire({
          title: '¡Añadido!',
          text: 'El contenido se agregó correctamente.',
          icon: 'success',
          confirmButtonColor: '#048BA8',
          background: '#2F2D2E',
          color: '#FFFFFF'
        });
        
        handleClear();
        onClose(); 
      }
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>AÑADIR CONTENIDO</h2>
          <button className={styles.closeBtn} onClick={onClose}>X</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.formBody} noValidate autoComplete="off">
          
          <div className={styles.formGroup}>
            <label>Titulo</label>
            <input type="text" id="titulo" value={formData.titulo} onChange={handleChange} autoComplete="off" placeholder="Ej: Harry Potter" />
          </div>

          <div className={styles.formGroup}>
            <label>Año</label>
            <input type="number" id="año" value={formData.año} onChange={handleChange} autoComplete="off" placeholder="Ej: 1980" />
          </div>

          <div className={styles.formGroup}>
            <label>Calificación</label>
            <input type="number" step="0.1" id="calificacion" value={formData.calificacion} onChange={handleChange} autoComplete="off" placeholder="Ej: 8.9" />
          </div>

          <div className={styles.formGroup}>
            <label>Estado</label>
            <select id="estado" value={formData.estado} onChange={handleChange}>
              <option value="Emision">Emision</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Genero</label>
            <select id="genero" value={formData.genero} onChange={handleChange}>
              <option value="Comedia">Comedia</option>
              <option value="Terror">Terror</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia-Ficción">Ciencia-Ficción</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Temporadas</label>
            <input type="number" id="temporadas" value={formData.temporadas} onChange={handleChange} autoComplete="off" placeholder="Ej: 4" />
          </div>

          <div className={styles.formGroup}>
            <label>Canal</label>
            <input type="text" id="canal" value={formData.canal} onChange={handleChange} autoComplete="off" placeholder="Ej: NETFLIX" />
          </div>

          <div className={styles.formGroup}>
            <label>Episodios</label>
            <input type="number" id="episodios" value={formData.episodios} onChange={handleChange} autoComplete="off" placeholder="Ej: 56" />
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formActions}>
            <button type="submit" className={styles.addBtn}>AÑADIR</button>
            <button type="button" className={styles.clearBtn} onClick={handleClear}>LIMPIAR</button>
          </div>

        </form>
      </div>
    </div>
  );
}