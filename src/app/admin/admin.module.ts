import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@shared/shared.module';
import { DialogComponent } from '@shared/components/dialog/dialog-ui.component';
import { ImagePickerComponent } from '@shared/components/image-picker/image-picker.component';
import { StarsComponent } from '@shared/components/stars/stars.component';

@NgModule({
  declarations: [AdminRoutingModule.Component],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ImagePickerComponent,
    StarsComponent,
  ],
})
export class AdminModule {}
