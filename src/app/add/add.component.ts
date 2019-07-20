import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  error:any = {invalid: false}
  invalid = false
  isAdd = true
  text = "Add"
  id;
  data:any = {}
  url = environment.apiUrl + '/api/v1/data/'
  routes:any [] = []

   constructor(private router: Router, private activatedRoute: ActivatedRoute, private http:HttpClient) {
		this.http.get(environment.apiUrl + '/api/v1/route/').toPromise().then((res:any) => {
			this.routes = res;
			console.log(res);
		},
		(err:any)=> {
			if(err.status == 400) {
				this.error.error = "Credientials are not valid";
				this.error.invalid = true
			}
		}
		);
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
  		this.data['route'] = parseInt(this.data['route'])
  		if(this.isAdd == true){
  			this.http.post(this.url,this.data).toPromise().then((res:any) => {
			this.router.navigate(['/data']);
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
			this.router.navigate(['/data']);
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
