// environment.example.ts - Plantilla de configuración para EmailJS (dejar como --> environment.ts)

export const environment = {
  production: false,

  // ID del servicio proporcionado por EmailJS
  emailjsServiceId: 'tu_service_id',

  // Clave pública de EmailJS (en Account > API Keys)
  emailjsPublicKey: 'tu_public_key',

  // Templates personalizados para distintos formularios
  emailjsTemplates: {
    general: 'tu_template_general', // Contacto, voluntariado, material
    adopta: 'tu_template_adopta' // Formulario de adopciones/acogidas
  }
};
