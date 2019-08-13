import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DataComponent } from './data/data.component'
import { AddComponent } from './add/add.component'
import { RouteComponent } from './route/route.component'
import { EditRouteComponent } from './edit-route/edit-route.component'
import { JsonComponent } from './json/json.component'
import { JsonShowComponent } from './json-show/json-show.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'data', component: DataComponent },
  { path: 'route', component: RouteComponent },
  { path: 'add', component: AddComponent },
  { path: 'add-route', component: EditRouteComponent },
  { path: 'edit', component: AddComponent },
  { path: 'edit-route', component: EditRouteComponent },
  { path: 'add-json', component: JsonComponent },
  { path: 'edit-json', component: JsonComponent },
  { path: 'jsonshow', component: JsonShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
