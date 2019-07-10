import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  url = 'https://route123.herokuapp.com/api/v1/'

   constructor(private router: Router, private activatedRoute: ActivatedRoute, private http:HttpClient) {
   		console.log(location.href)
		if(location.href.includes('edit')){
			this.isAdd = false
			this.text = 'Update'
			this.activatedRoute.queryParams.subscribe((params: Params) => {
				this.id = params.id;
				this.http.get(this.url + this.id,this.data).toPromise().then((res:any) => {
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

}
