import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '@shared/shared.module';
import { StarsComponent } from '@shared/components/stars/stars.component';

@NgModule({
  declarations: [UserRoutingModule.Components],
  imports: [CommonModule, UserRoutingModule, SharedModule, StarsComponent],
})
export class UserModule {}
