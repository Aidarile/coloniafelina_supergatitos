import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { GatosAdminComponent } from './gatos/gatos-admin.component';
import { ArticulosAdminComponent } from './articulos/articulos-admin.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'gatos', component: GatosAdminComponent },
      { path: 'articulos', component: ArticulosAdminComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}