import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {
  objectKeys = Object.keys;
  error:any = {invalid: false}

  arr = ["name1",  "name1"]
  socailFeedList: any = [{ FeedsName: 'Website', Link: '' }];
  id;
  isAdd = true
  text = "Add"
  url = environment.apiUrl + '/api/v1/json/'
  data: any = [{ FeedsName: '', Link: '' }];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http:HttpClient) {
		if(location.href.includes('edit')){
			this.isAdd = false
			this.text = 'Update'
			this.activatedRoute.queryParams.subscribe((params: Params) => {
				this.id = params.id;
				console.log(this.id, 'id')
				this.http.get(this.url + this.id).toPromise().then((res:any) => {
					this.data = res.data;
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

  addFeedList(index) {
  	this.data.push({ FeedsName: 'Website', Link: '' })
  }
  
  removeFeedList(index) {
  	this.data.splice(this.data.length - 1, 1);
  }

  print(){
  	console.log(this.data)
  }

  onSubmit() {
  	let obj = {
		"name": "abdul",
		"data": this.data
	}
  		if(this.isAdd == true){
  			this.http.post(this.url, obj).toPromise().then((res:any) => {
			this.router.navigate(['/jsonshow']);
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
			this.http.put(this.url + this.id + '/', obj).toPromise().then((res:any) => {
				this.router.navigate(['/jsonshow']);
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
