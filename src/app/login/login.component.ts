import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	username = '';
	data:any = {}
	password = '';
	error:any = {invalid: false}

	url = environment.apiUrl + "/rest-auth/login/";

	constructor(private http:HttpClient, private router: Router) { }

	ngOnInit() {
		if (localStorage.getItem('token')){
			this.router.navigate(['/data']);
		}
	}

	onSubmit(f: NgForm) {
		this.error.invalid = false;
		let formdata = {
			'email': f.value.username,
			'password': f.value.password,
		}

		this.http.post(this.url,formdata).toPromise().then((res:any) => {
			localStorage.setItem('token',res.key)
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