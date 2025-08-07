import { Component, ViewChild } from '@angular/core';
import emailjs from '@emailjs/browser';
import { NgForm, FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
declare const bootstrap: any;

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  @ViewChild('formRef') formRef!: NgForm;

  formData = {
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  };

  enviarFormulario() {
    if (this.formRef.invalid) return;

    emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplates.general,
      this.formData,
      environment.emailjsPublicKey
    ).then(() => {
      this.mostrarToast('Mensaje enviado correctamente.');
      this.formRef.resetForm();
    }).catch(error => {
      console.error('Error al enviar:', error);
      this.mostrarToast('Hubo un error. Intenta de nuevo.');
    });
  }

  mostrarToast(mensaje: string): void {
    const toastEl = document.getElementById('successToast');
    if (toastEl) {
      const body = toastEl.querySelector('.toast-body');
      if (body) body.textContent = mensaje;

      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000,
      });

      toast.show();
    }
  }
}