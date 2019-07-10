import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DataComponent } from './data/data.component'
import { AddComponent } from './add/add.component'


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'data', component: DataComponent },
  { path: 'add', component: AddComponent },
  { path: 'edit', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
