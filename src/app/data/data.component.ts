import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2'
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { ExportToCsv } from 'export-to-csv';
// import jsPDF from 'jspdf';
// import autotable from 'jspdf';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  data = [];
  config: any;
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

  options:any = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Data',
    filename: 'data',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

	constructor(private http:HttpClient, private router: Router, private exportAsService: ExportAsService) { }

  ngOnInit() {
    this.http.get(environment.apiUrl + '/api/v1/route/').toPromise().then((res:any) => {
        this.routes = res;
      }
      );
	  this.getdata();
    this.config = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.data.length
    };
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
			if(err.status == 401) {
			}
		}
		);
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your data is safe :)',
      'error'
    )
  }
})
  }

  save_csv(){
    const csvExporter = new ExportToCsv(this.options);
    csvExporter.generateCsv(this.data);
  }

  save_png(){
    this.exportAsService.save(this.exportAsConfig2, 'Data').subscribe(() => {
    });
  }

  save_pdf(){
    this.convert()
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

  pageChanged(event){
    this.config.currentPage = event;
  }

      convert() {

        var doc = new jsPDF();
        doc.autoTable({
           columnStyles: {europe: {halign: 'center'}}, // European countries centered
           body: this.data,
    columns: [
          {header: 'Route', dataKey: 'route'}, {header: 'Bill', dataKey: 'bill'},
          {header: 'Expense', dataKey: 'exp'}, {header: 'Salary', dataKey: 'salary'},
          {header: 'Petrol', dataKey: 'petrol'}, {header: 'Income Tax', dataKey: 'income_tax'},
          {header: 'PRA', dataKey: 'pra'}, {header: 'Cheque', dataKey: 'cheque'},
          {header: 'Income', dataKey: 'income'}, {header: 'Total Expense', dataKey: 'total_expense'},

      ]
     })
        doc.save('data.pdf');

      }

}
