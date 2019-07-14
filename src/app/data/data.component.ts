import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2'
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  data = [];
	url = environment.apiUrl + "/api/v1/data/";
  routes = []
  exportAsConfig: ExportAsConfig = {
    type: 'csv', // the type you want to download
    elementId: 'data', // the id of html/table element
  }
  exportAsConfig2: ExportAsConfig = {
    type: 'png', // the type you want to download
    elementId: 'data', // the id of html/table element
  }
	constructor(private http:HttpClient, private router: Router, private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + '/api/v1/route/').toPromise().then((res:any) => {
        this.routes = res;
      }
      );
	  this.getdata();
  }

  getdata(){
  		this.http.get(this.url).toPromise().then((res:any) => {
			for (var i = res.length - 1; i >= 0; i--) {
        for (var j = this.routes.length - 1; j >= 0; j--) {
          if (res[i]['route'] == this.routes[j]['id']){
            res[i]['route'] = this.routes[j]['route']
          }
        }
      }
      this.data = res;

		},
		(err:any)=> {
			if(err.status == 401) {
			}
		}
		);
    
  }

  edit(id){
  	this.router.navigate(["/edit"], { queryParams: { "id": id} })
  }

  remove(id){
  	console.log(id)
  	Swal.fire({
  title: 'Are you sure?',
  text: 'You will not be able to recover this imaginary file!',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
  	this.http.delete(this.url + id).toPromise().then((res:any) => {
	this.getdata();
    Swal.fire(
      'Deleted!',
      'Your imaginary file has been deleted.',
      'success'
    )

		},
		(err:any)=> {
			if(err.status == 401) {
			}
		}
		);
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
})
  }

  save_csv(){
    this.exportAsService.save(this.exportAsConfig, 'Data').subscribe(() => {
    });
  }

  save_png(){
    this.exportAsService.save(this.exportAsConfig2, 'Data').subscribe(() => {
    });
  }

}
