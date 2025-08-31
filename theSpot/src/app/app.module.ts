import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Pages
import { HomeComponent } from './pages/home/home.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';

//Components
import { MoviePosterCarouselComponent } from './components/movie-poster-carousel/movie-poster-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemListComponent,
    CartComponent,
    AdminPanelComponent,
    ProfileComponent,
    LandingPageComponent,
    AuthenticationComponent,
    MoviePosterCarouselComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor, 
    multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }