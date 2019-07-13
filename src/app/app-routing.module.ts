import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DataComponent } from './data/data.component'
import { AddComponent } from './add/add.component'
import { RouteComponent } from './route/route.component'
import { EditRouteComponent } from './edit-route/edit-route.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'data', component: DataComponent },
  { path: 'route', component: RouteComponent },
  { path: 'add', component: AddComponent },
  { path: 'add-route', component: EditRouteComponent },
  { path: 'edit', component: AddComponent },
  { path: 'edit-route', component: EditRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
