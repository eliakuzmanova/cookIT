import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './main/catalog/catalog.component';
import { ProfileComponent } from './main/profile/profile.component';
import { LoginComponent } from './main/auth/login/login.component';
import { RegisterComponent } from './main/auth/register/register.component';
import { DetailsComponent } from './main/details/details.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { CreateComponent } from './main/create/create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CatalogComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path:'create',
    component: CreateComponent,

  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
