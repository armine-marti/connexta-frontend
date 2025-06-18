import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './auth/login/login.component';
import {LayoutComponent} from './component/layout/layout.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ContactsComponent} from './component/contacts/contacts.component';
import {RegisterComponent} from './auth/register/register.component';
import {EditContactComponent} from './component/contacts/edit-contact/edit-contact.component';
import {AddContactComponent} from './component/contacts/add-contact/add-contact.component';
import {UsersComponent} from './component/users/users.component';
import {EditUserComponent} from './component/users/edit-user/edit-user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'contacts/edit/:id',
    component: EditContactComponent
  },
  {
    path: 'contacts/create',
    component: AddContactComponent
  },
  {
    path: 'admin',
    component: UsersComponent
  },
  {
    path: 'admin/edit/:id',
    component: EditUserComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
