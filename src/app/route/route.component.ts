import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  data = [];
	url = environment.apiUrl + "/api/v1/route/";
  routes = []

	constructor(private http:HttpClient, private router: Router) { }

  ngOnInit() {
  	this.getdata();
  }

  getdata(){
  	    this.http.get(this.url).toPromise().then((res:any) => {
        this.data = res;
      }
      );
  }

  edit(id){
  	this.router.navigate(["/edit-route"], { queryParams: { "id": id} })
  }

  remove(id){
  	Swal.fire({
  title: 'Are you sure?',
  text: 'You will not be able to recover that record!',
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
      'Your record has been deleted.',
      'success'
    )
	},
	(err:any)=> {
		if(err.status == 500) {
			Swal.fire(
		      'Sorry',
		      'You cannot delete that Route because that route has data. First remove data of that route',
		      'error'
		    )
		}
	}
	);
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your record is safe :)',
      'error'
    )
  }
})
  }
  logout(){
    let logoutUrl = environment.apiUrl + '/rest-auth/logout/'
    this.http.post(logoutUrl, {}).toPromise().then((res:any) => {
      localStorage.setItem('token', '');
      this.router.navigate(['/'])
    },
    (err:any)=> {
      localStorage.setItem('token', '');
      this.router.navigate(['/'])
    }
    );
  }
}