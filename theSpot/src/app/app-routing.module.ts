import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { HomeComponent } from './pages/home/home.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemListComponent, canActivate: [AuthGuard] },
  { path: 'movie/:id', component: MovieDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }