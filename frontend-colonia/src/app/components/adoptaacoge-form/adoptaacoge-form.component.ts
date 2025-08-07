import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import emailjs from '@emailjs/browser';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';
declare const bootstrap: any;

@Component({
  selector: 'app-adoptaacoge-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './adoptaacoge-form.component.html',
  styleUrl: './adoptaacoge-form.component.css',
  standalone: true,
})
export class AdoptaacogeFormComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;

  nombreGato = '';
  mostrarModal = true;

  formData: any = {
    from_name: '',
    from_email: '',
    telefono: '',
    subject: '',
    tipo_acogida: '',
    motivacion: '',
    animales_casa: '',
    experiencia_gatos: '',
    protecciones: '',
    sobre_ti: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.nombreGato = this.route.snapshot.paramMap.get('nombre') || '';
    this.formData.subject = `Adoptar/Acoger a: ${this.nombreGato}`;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  enviarFormulario(): void {
    if (this.formRef.invalid) return;

    emailjs.send(
      environment.emailjsServiceId,
      environment.emailjsTemplates.adopta,
      this.formData,
      environment.emailjsPublicKey
    ).then(() => {
      this.mostrarToast('Formulario de adopción/acogida enviado correctamente.');
      this.formRef.resetForm();
    }).catch(error => {
      console.error('Error al enviar:', error);
      this.mostrarToast('Ocurrió un error al enviar el formulario.');
    });
  }

  mostrarToast(mensaje: string): void {
    const toastEl = document.getElementById('successToast');
    if (toastEl) {
      const body = toastEl.querySelector('.toast-body');
      if (body) body.textContent = mensaje;

      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000
      });

      toast.show();
    }
  }
}