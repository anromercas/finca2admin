import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'todo-details/:id',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },
  {
    path: 'todo-details',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },
  {
    path: 'todo-list/:idcomunidad',
    loadChildren: () => import('./pages/todo-list/todo-list.module').then( m => m.TodoListPageModule)
  },
  {
    path: 'comunidad-details',
    loadChildren: () => import('./pages/comunidad-details/comunidad-details.module').then( m => m.ComunidadDetailsPageModule)
  },
  {
    path: 'comunidad-details/:id',
    loadChildren: () => import('./pages/comunidad-details/comunidad-details.module').then( m => m.ComunidadDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
