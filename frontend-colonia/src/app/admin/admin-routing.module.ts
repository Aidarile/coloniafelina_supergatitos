import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { GatosAdminComponent } from './gatos/gatos-admin.component';
import { ArticulosAdminComponent } from './articulos/articulos-admin.component';
import { AuthGuard } from '../auth/auth.guard';
import { NoticiasAdminComponent } from './noticias/noticias-admin.component';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'gatos', component: GatosAdminComponent },
      { path: 'articulos', component: ArticulosAdminComponent },
      { path: 'noticias', component: NoticiasAdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}