import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './panel/panel.component';
import { GatosAdminComponent } from './gatos/gatos-admin.component';
import { ArticulosAdminComponent } from './articulos/articulos-admin.component';


@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, FormsModule, PanelComponent, GatosAdminComponent, ArticulosAdminComponent]
})
export class AdminModule { }