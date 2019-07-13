import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss']
})
export class EditRouteComponent implements OnInit {
error:any = {invalid: false}
  invalid = false
  isAdd = true
  text = "Add"
  id;
  data:any = {}
  url = environment.apiUrl + '/api/v1/route/'
  routes:any [] = []

   constructor(private router: Router, private activatedRoute: ActivatedRoute, private http:HttpClient) {
		if(location.href.includes('edit')){
			this.isAdd = false
			this.text = 'Update'
			this.activatedRoute.queryParams.subscribe((params: Params) => {
				this.id = params.id;
				this.http.get(this.url + this.id).toPromise().then((res:any) => {
					this.data = res;
		},
		(err:any)=> {
			if(err.status == 400) {
				this.error.error = "Credientials are not valid";
				this.error.invalid = true
			}
		}
		);
			});
		}
	}

  ngOnInit() {
  }

  	onSubmit(f: NgForm) {
  		if(this.isAdd == true){
  			this.http.post(this.url,this.data).toPromise().then((res:any) => {
			this.router.navigate(['/route']);
		},
		(err:any)=> {
			if(err.status == 400) {
				this.error.error = "Credientials are not valid";
				this.error.invalid = true
			}
		}
		);
  		}
		else {
			this.http.put(this.url + this.id + '/', this.data).toPromise().then((res:any) => {
				this.router.navigate(['/route']);
		},
		(err:any)=> {
			if(err.status == 400) {
				this.error.error = "Credientials are not valid";
				this.error.invalid = true
			}
		}
		);
		}
	}

}
