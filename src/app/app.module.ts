import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataComponent } from './data/data.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { AddComponent } from './add/add.component';
import { RouteComponent } from './route/route.component';
import { EditRouteComponent } from './edit-route/edit-route.component'
import { ExportAsModule } from 'ngx-export-as';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { JsonComponent } from './json/json.component';
import {AngularTreeGridModule} from 'angular-tree-grid';
import { JsonShowComponent } from './json-show/json-show.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataComponent,
    AddComponent,
    RouteComponent,
    EditRouteComponent,
    JsonComponent,
    JsonShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ExportAsModule,
    NgbModule,
    AngularTreeGridModule,
    NgxPaginationModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
