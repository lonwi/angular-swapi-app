import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'characters', loadChildren: './pages/people/people.module#PeoplePageModule' },
  { path: 'characters/:id', loadChildren: './pages/person/person.module#PersonPageModule' },
  { path: 'movies', loadChildren: './pages/films/films.module#FilmsPageModule' },
  { path: 'movies/:id', loadChildren: './pages/film/film.module#FilmPageModule' },
  { path: 'planets', loadChildren: './pages/planets/planets.module#PlanetsPageModule' },
  { path: 'planets/:id', loadChildren: './pages/planet/planet.module#PlanetPageModule' },
  { path: 'species', loadChildren: './pages/species/species.module#SpeciesPageModule' },
  { path: 'species/:id', loadChildren: './pages/specie/specie.module#SpeciePageModule' },
  { path: 'starships', loadChildren: './pages/starships/starships.module#StarshipsPageModule' },
  { path: 'starships/:id', loadChildren: './pages/starship/starship.module#StarshipPageModule' },
  { path: 'vehicles', loadChildren: './pages/vehicles/vehicles.module#VehiclesPageModule' },
  { path: 'vehicles/:id', loadChildren: './pages/vehicle/vehicle.module#VehiclePageModule' },
  { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
