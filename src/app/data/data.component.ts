import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  data = [];
	url = "https://route123.herokuapp.com/api/v1/";

	constructor(private http:HttpClient, private router: Router) { }

  ngOnInit() {
	this.getdata();
	
  }

  getdata(){
  		this.http.get(this.url).toPromise().then((res:any) => {
			console.log(res)
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

}
