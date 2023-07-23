import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './main/catalog/catalog.component';
import { ProfileComponent } from './main/profile/profile.component';
import { LoginComponent } from './main/auth/login/login.component';
import { RegisterComponent } from './main/auth/register/register.component';
import { DetailsComponent } from './main/details/details.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { CreateComponent } from './main/create/create.component';
import { LogoutComponent } from './main/auth/logout/logout.component';
import { EditProfileComponent } from './main/edit-profile/edit-profile.component';
import { EditRecipeComponent } from './main/edit-recipe/edit-recipe.component';

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
    component: ProfileComponent,
  },
  {
    path: 'edit/profile',
    component: EditProfileComponent,
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
    path: 'recipe/edit/:id',
    component: EditRecipeComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
    
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
