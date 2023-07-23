import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CatalogComponent } from './main/catalog/catalog.component';
import { ProfileComponent } from './main/profile/profile.component';
import { LoginComponent } from './main/auth/login/login.component';
import { RegisterComponent } from './main/auth/register/register.component';
import { DetailsComponent } from './main/details/details.component';
import { NotFoundComponent } from './main/not-found/not-found.component';
import { DetailsService } from './main/details/details.service';
import { CreateComponent } from './main/create/create.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './main/auth/logout/logout.component';
import { AuthenticateComponent } from './main/auth/authenticate/authenticate.component';
import { EditProfileComponent } from './main/edit-profile/edit-profile.component';
import { EditRecipeComponent } from './main/edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CatalogComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    DetailsComponent,
    NotFoundComponent,
    CreateComponent,
    LogoutComponent,
    AuthenticateComponent,
    EditProfileComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DetailsService,AuthenticateComponent,],
  bootstrap: [AppComponent]
})
export class AppModule { }
