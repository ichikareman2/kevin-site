import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountdownComponent } from './countdown.component';
import { ClockComponent } from './clock/clock.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [{
  path: '',
  component: CountdownComponent,
  children: [
    {
      path: 'clock',
      component: ClockComponent
    },
    {
      path: '',
      component: FormComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountdownRoutingModule { }
