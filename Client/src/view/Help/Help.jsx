import React, { useRef } from 'react'
import emailjs from "@emailjs/browser"

import styles from "./Help.module.css"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Help = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const name = form.current.user_name.value;
    const email = form.current.user_email.value;
    const message = form.current.message.value;

    // Realizar validaciones
    if (!name || !email || !message) {
      Swal.fire({
        title: 'Alerta!',
        text: 'Completar todos los campos',
        icon: 'warning',
        confirmButtonText: 'Ok'
      })
      return;
    }

    // Validar el formato del correo electrónico usando una expresión regular simple
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
            title: 'Alerta!',
            text: 'Por favor, ingresa un correo electrónico válido',
            icon: 'warning',
            position: 'center',
            confirmButtonText: 'Ok'
          })
      return;
    }

    // Si todas las validaciones pasan, enviar el formulario
    const urlUSer = import.meta.env.VITE_USERSERVICER;
    const urlServise = import.meta.env.VITE_TEMPLATEEMAIL;
    
    emailjs
      .sendForm(urlUSer , urlServise, form.current, '1LZEauZPTMLf39Fyv')
      .then(
        (result) => {
          console.log(result.text);
          
          Swal.fire({
            title: 'Exito',
            text: 'Enviado con exito',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className={styles.containerHelp} >
        <form ref={form} onSubmit={sendEmail} className={styles.containerForm}>
         <span className={styles.title}>Form Ayuda</span>
         <span className={styles.title2}>Como podemos ayudarte?</span>
     
         <input type='text' name='user_name' placeholder='Name' className={styles.input} />
     
         <input type='text' name='user_email' placeholder='Email' className={styles.input} />
     
         <textarea placeholder='Message' name="message" className={styles.inputT} />
 
         <button value="Send" className={styles.btnS}>Enviar</button>
        </form>
    </div>
  )
}

export default Help;