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
     "days_taken": 3,"days_left": 3,"leave_type": "#3","reason": "#3"};
     
     req: Irequest[] = [];

     annualLeaveDays: number = 15;

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
      //  this.request.postRequest(this.request_data).subscribe()
      let data: string = this.getName()+","+this.getSurname()+","+this.getStartDate().value+","+ this.getEndDate().value+
      +","+this.calculateDaysTaken()+","+this.getDaysLeft()+","+this.getLeaveType()+this.getReason();
      
      console.log(this.calculateDaysTaken());
      console.log(data);
      console.log("name: "+this.getName());
      console.log("surname: "+this.getSurname());
      console.log("start day: "+this.getStartDate().value);
      console.log("end day:"+this.getEndDate().value);
      console.log("days taken: "+this.calculateDaysTaken());
      console.log("Days Left "+this.getDaysLeft());
      console.log("leave type: "+this.getLeaveType());
      console.log("reason: "+this.getReason());

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
      return this.requestGroup.controls.start_date;
    }
    getEndDate(): AbstractControl{
      return this.requestGroup.controls.end_date;
    }

    getLeaveType(): AbstractControl{
      return this.requestGroup.controls.leave_type.value;
    }

    //Days taken
    calculateDaysTaken(): number{
        const msInDay = 24 * 60 * 60 * 1000;

       let endDate = new Date(this.getEndDate().value);
       let startDate = new Date(this.getStartDate().value);

        return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay)
    }

    getDaysLeft():number{
      return (this.annualLeaveDays-this.calculateDaysTaken());
    }

}


