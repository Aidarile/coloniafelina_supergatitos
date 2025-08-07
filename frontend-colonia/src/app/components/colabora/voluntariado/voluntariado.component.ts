import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../../environments/environment';
declare const bootstrap: any;

@Component({
  selector: 'app-voluntariado',
  imports: [FormsModule],
  templateUrl: './voluntariado.component.html',
  styleUrl: './voluntariado.component.css'
})
export class VoluntariadoComponent {
  @ViewChild('formRef') formRef!: NgForm;

  formData = {
    from_name: '',
    from_email: '',
    subject: 'Voluntariado',
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
      this.mostrarToast('Formulario de voluntariado enviado correctamente.');
      this.formRef.resetForm();
    }).catch(error => {
      console.error('Error al enviar:', error);
      this.mostrarToast('Hubo un error. Intenta más tarde.');
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