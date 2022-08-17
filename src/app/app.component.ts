import { Component } from '@angular/core';
import { ApiRequestService } from './service/api-request.service';
import { Irequest } from './service/irequest';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
     request_data: Irequest = {"id":"0","name": "Kevin","surname": "Matseke","start_date": "12/08/1994","end_date": "12/10/1994", 
     "days_taken": "#3","days_left": "#3","leave_type": "#3","reason": "#3"};
     req: Irequest[] = [];

    constructor(private request: ApiRequestService){
        this.appGetRequests();
    }


    requestGroup = new FormGroup({
      name: new FormControl(),
      surname: new FormControl(),
      start_date: new FormControl(),
      end_date: new FormControl(),
      days_taken: new FormControl(),
      days_left: new FormControl(), //dont show
      leave_type: new FormControl(), //dont show
      reason: new FormControl(), //dont show
    });


    appGetRequests(){
       this.request.getRequests().subscribe(
         (data: Irequest[])=>{
           console.table(data);
           this.req = data;
          }
       );
    }
  

   

    appPostRequests(){
      //  this.request.postRequest(this.request_data).subscribe();
      console.log(this.getName());
      console.log(this.getSurname());
      console.log(this.getEndDate());
      console.log(this.getLeaveType());
      console.log(this.getReason());
      console.log(this.getStartDate());
    }


   //getters
    getName(): AbstractControl{
      return this.requestGroup.controls.name.value;
    }
    getSurname(): AbstractControl{
      return this.requestGroup.controls.surname.value;
    }
    getReason(): AbstractControl{
      return this.requestGroup.controls.reason.value;
    }
     getStartDate(): AbstractControl{
      return this.requestGroup.controls.start_date.value;
    }
    getEndDate(): AbstractControl{
      return this.requestGroup.controls.end_date.value;
    }

    getLeaveType(): AbstractControl{
      return this.requestGroup.controls.leave_type.value;
    }
}


