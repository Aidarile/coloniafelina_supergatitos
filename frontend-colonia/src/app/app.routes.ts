import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { GatosComponent } from './components/gatos/gatos.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ColaboraComponent } from './components/colabora/colabora.component';
import { ErrorComponent } from './components/error/error.component';
import { VoluntariadoComponent } from './components/colabora/voluntariado/voluntariado.component';
import { DonacionesComponent } from './components/colabora/donaciones/donaciones.component';
import { ArticulosSolidariosComponent } from './components/colabora/articulos-solidarios/articulos-solidarios.component';
import { AdoptaacogeComponent } from './components/adoptaacoge/adoptaacoge.component';
import { AdoptaacogeFormComponent } from './components/adoptaacoge-form/adoptaacoge-form.component';
import { FinalesfelicesComponent } from './components/finalesfelices/finalesfelices.component';
import { MaterialComponent } from './components/colabora/donaciones/material/material.component';
import { LoginComponent } from './auth/login/login.component';
import { GatosAdminComponent } from './admin/gatos/gatos-admin.component';
import { ArticulosAdminComponent } from './admin/articulos/articulos-admin.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiasAdminComponent } from './admin/noticias/noticias-admin.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'inicio',
        pathMatch:'full'
    },      
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: 'gatos',
        component: GatosComponent
    },
    {
        path: 'historia',
        component: HistoriaComponent
    },
    {
        path: 'noticias',
        component: NoticiasComponent
    },
    {
        path: 'colabora',
        component: ColaboraComponent
    },
    {
        path: 'colabora/voluntariado',
        component: VoluntariadoComponent
    },
    {
        path: 'colabora/donaciones',
        component: DonacionesComponent
    },
    {
        path: 'colabora/articulos-solidarios',
        component: ArticulosSolidariosComponent
    },
    {
        path: 'colabora/donaciones/material',
        component: MaterialComponent
    },
    {
        path: 'adoptaacoge',
        component: AdoptaacogeComponent
    },
    {
        path: 'adoptaacoge/:nombre',
        component: AdoptaacogeFormComponent
    },
    {
        path: 'finalesfelices',
        component: FinalesfelicesComponent
    },
    {
        path: 'contacto',
        component: ContactoComponent
    },
    {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },    
    {
        path: 'gatos-admin', 
        component: GatosAdminComponent
    },
    {
        path: 'articulos-admin', 
        component: ArticulosAdminComponent
    },
    {
        path: 'noticias-admin', 
        component: NoticiasAdminComponent
    },
    {
        path:'**',
        component: ErrorComponent,
        pathMatch:'full'
    }
];
