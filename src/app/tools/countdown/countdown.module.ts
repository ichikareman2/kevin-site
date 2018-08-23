import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountdownRoutingModule } from './countdown-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CountdownComponent } from './countdown.component';
import { FormComponent } from './form/form.component';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  imports: [
    CommonModule,
    CountdownRoutingModule,
    SharedModule
  ],
  declarations: [CountdownComponent, FormComponent, ClockComponent]
})
export class CountdownModule { }
