import { Routes } from '@angular/router';
import { LoginComponent } from '../../autentifikacija/login';
import { RegisterComponent } from '../../autentifikacija/register';
import { ProfilComponent } from './component/search-dialog/search-dialog/profil/profil';
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./component/navbar/navbar/movie/movies/movies.component').then(
        (m) => m.MoviesComponent
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./component/movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profil', component: ProfilComponent },
  { path: '', redirectTo: 'profil', pathMatch: 'full' },
  {
    path: 'korpa',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent)
  }

];
