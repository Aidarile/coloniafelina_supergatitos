import { Component, ViewChild } from '@angular/core';
import emailjs from '@emailjs/browser';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
declare const bootstrap: any;

@Component({
  selector: 'app-material',
  imports: [FormsModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  @ViewChild('formRef') formRef!: NgForm;

  formData = {
    from_name: '',
    from_email: '',
    subject: 'Donación de material',
    message: '',
  };

  enviarFormulario() {
    if (this.formRef.invalid) return;

    emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplates.general,
      this.formData,
      environment.emailjsPublicKey
    ).then(() => {
      this.mostrarToast('Formulario de donación enviado correctamente.');
      this.formRef.resetForm();
    }).catch(error => {
      console.error('Error al enviar:', error);
      this.mostrarToast('Error al enviar el formulario.');
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