import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'people', loadChildren: './pages/people/people.module#PeoplePageModule' },
  { path: 'planets', loadChildren: './pages/planets/planets.module#PlanetsPageModule' },
  { path: 'films', loadChildren: './pages/films/films.module#FilmsPageModule' },
  { path: 'species', loadChildren: './pages/species/species.module#SpeciesPageModule' },
  { path: 'starships', loadChildren: './pages/starships/starships.module#StarshipsPageModule' },
  { path: 'vehicles', loadChildren: './pages/vehicles/vehicles.module#VehiclesPageModule' },
  { path: 'starship', loadChildren: './pages/starship/starship.module#StarshipPageModule' },
  { path: 'vehicle', loadChildren: './pages/vehicle/vehicle.module#VehiclePageModule' },
  { path: 'person', loadChildren: './pages/person/person.module#PersonPageModule' },
  { path: 'film', loadChildren: './pages/film/film.module#FilmPageModule' },
  { path: 'planet', loadChildren: './pages/planet/planet.module#PlanetPageModule' },
  { path: 'specie', loadChildren: './pages/specie/specie.module#SpeciePageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
