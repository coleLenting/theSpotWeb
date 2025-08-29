import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CartComponent } from './cart/cart.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }