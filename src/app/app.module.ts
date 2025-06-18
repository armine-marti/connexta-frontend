import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {ComponentComponent} from './component/component.component';
import {UserService} from './core/service/user.service';
import {UserAuthService} from './core/service/user-auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutComponent} from './component/layout/layout.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ContactsComponent} from './component/contacts/contacts.component';
import {RouterModule} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {ContactService} from './core/service/contact.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {EditContactComponent} from './component/contacts/edit-contact/edit-contact.component';
import {AddContactComponent} from './component/contacts/add-contact/add-contact.component';
import {ContactFormComponent} from './shared/contact-form/contact-form.component';
import {UsersComponent} from './component/users/users.component';
import {UserFormComponent} from './shared/user-form/user-form.component';
import {EditUserComponent} from './component/users/edit-user/edit-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ComponentComponent,
    LayoutComponent,
    DashboardComponent,
    ContactsComponent,
    RegisterComponent,
    EditContactComponent,
    AddContactComponent,
    ContactFormComponent,
    UsersComponent,
    UserFormComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    UserAuthService,
    ContactService,


    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
