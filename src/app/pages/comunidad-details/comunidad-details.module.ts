import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunidadDetailsPageRoutingModule } from './comunidad-details-routing.module';

import { ComunidadDetailsPage } from './comunidad-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunidadDetailsPageRoutingModule
  ],
  declarations: [ComunidadDetailsPage]
})
export class ComunidadDetailsPageModule {}
