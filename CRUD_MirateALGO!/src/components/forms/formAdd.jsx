import React, { useState } from 'react';
import Swal from 'sweetalert2'; // <-- Importación directa de SweetAlert2
import styles from './forms.module.css';

export default function FormAdd({ isOpen, onClose, onAddElement }) {
  const [formData, setFormData] = useState({
    titulo: '',
    año: '',
    calificacion: '',
    estado: 'Emision',
    genero: 'Comedia',
    temporadas: '',
    canal: '',
    episodios: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      titulo: '',
      año: '',
      calificacion: '',
      estado: 'Emision',
      genero: 'Comedia',
      temporadas: '',
      canal: '',
      episodios: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // SweetAlert2 preguntando si estás seguro
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a añadir la serie "${formData.titulo}" al catálogo.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#048BA8', // Tono cian de tus botones
      cancelButtonColor: '#4A4849',  // Gris oscuro
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'Cancelar',
      background: '#2F2D2E',         
      color: '#FFFFFF'
    }).then((result) => {
      if (result.isConfirmed) {
        if (onAddElement) onAddElement(formData);
        
        Swal.fire({
          title: '¡Añadido!',
          text: 'El contenido se agregó correctamente.',
          icon: 'success',
          confirmButtonColor: '#048BA8',
          background: '#2F2D2E',
          color: '#FFFFFF'
        });
        
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

        <form onSubmit={handleSubmit} className={styles.formBody}>
          
          <div className={styles.formGroup}>
            <label>Titulo</label>
            <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required placeholder="Ej: Harry Potter" />
          </div>

          <div className={styles.formGroup}>
            <label>Año</label>
            <input type="number" name="año" value={formData.año} onChange={handleChange} required placeholder="Ej: 1980" />
          </div>

          <div className={styles.formGroup}>
            <label>Calificación</label>
            <input type="number" step="0.1" name="calificacion" value={formData.calificacion} onChange={handleChange} required placeholder="Ej: 8.9" />
          </div>

          <div className={styles.formGroup}>
            <label>Estado</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="Emision">Emision</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Genero</label>
            <select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="Comedia">Comedia</option>
              <option value="Terror">Terror</option>
              <option value="Drama">Drama</option>
              <option value="Ciencia-Ficción">Ciencia-Ficción</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Temporadas</label>
            <input type="number" name="temporadas" value={formData.temporadas} onChange={handleChange} required placeholder="Ej: 4" />
          </div>

          <div className={styles.formGroup}>
            <label>Canal</label>
            <input type="text" name="canal" value={formData.canal} onChange={handleChange} required placeholder="Ej: NETFLIX" />
          </div>

          <div className={styles.formGroup}>
            <label>Episodios</label>
            <input type="number" name="episodios" value={formData.episodios} onChange={handleChange} required placeholder="Ej: 56" />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.addBtn}>AÑADIR</button>
            <button type="button" className={styles.clearBtn} onClick={handleClear}>LIMPIAR</button>
          </div>

        </form>
      </div>
    </div>
  );
}