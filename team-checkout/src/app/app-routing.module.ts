import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BasketButtonComponent} from "./basket-button/basket-button.component";


const routes: Routes = [
  { path: 'basketButton', component: BasketButtonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
