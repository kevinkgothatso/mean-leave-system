import { Component } from '@angular/core';
import { ApiRequestService } from './services/api-request.service';
import { Irequest } from './interfaces/irequest';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //varaiable to hold data temporarily
  req: Irequest[] = [];

  //anual leave
  annualLeaveDays: number = 15;

  constructor(private request: ApiRequestService) {
    this.appGetRequests();
  }


  requestGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    start_date: new FormControl(),
    end_date: new FormControl(),
    days_taken: new FormControl(),
    days_left: new FormControl(),
    leave_type: new FormControl(),
    reason: new FormControl(),
  });

  //getting form data
  appGetRequests() {
    this.request.getRequests().subscribe(
      (data: Irequest[]) => {
        console.table(data);
        this.req = data;
      }
    );
  }



  //posting form data
  appPostRequests() {
    let data: Irequest = {
      "name": this.getName().value, "surname": this.getSurname().value, "start_date": this.getStartDate().value,
      "end_date": this.getEndDate().value, "days_taken": this.calculateDaysTaken(), "days_left": this.getDaysLeft(),
      "leave_type": this.getLeaveType().value, "reason": this.getReason().value
    };

    this.request.postRequest(data).subscribe()
  }


  //getters
  getName(): AbstractControl {
    return this.requestGroup.controls.name;
  }
  getSurname(): AbstractControl {
    return this.requestGroup.controls.surname;
  }
  getReason(): AbstractControl {
    return this.requestGroup.controls.reason;
  }
  getStartDate(): AbstractControl {
    return this.requestGroup.controls.start_date;
  }
  getEndDate(): AbstractControl {
    return this.requestGroup.controls.end_date;
  }

  getLeaveType(): AbstractControl {
    return this.requestGroup.controls.leave_type;
  }

  //Calculating Days taken
  calculateDaysTaken(): number {
    const msInDay = 24 * 60 * 60 * 1000;

    let endDate = new Date(this.getEndDate().value);
    let startDate = new Date(this.getStartDate().value);

    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay)
  }


  //Calculating Days  Left
  getDaysLeft(): number {
    return (this.annualLeaveDays - this.calculateDaysTaken());
  }


  //test if end date and start date are null
  isDateNull(): boolean {
    if (this.getEndDate().dirty && this.getStartDate().dirty) {
      return true;
    }
    else { return false }
  }
}


