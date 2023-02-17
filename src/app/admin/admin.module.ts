import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminRoutingModule.Component],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
