import { Component } from '@angular/core';
import { ApiRequestService } from './service/api-request.service';
import { Irequest } from './service/irequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
     request_data: Irequest = {"id":"0","name": "Kevin","surname": "Matseke","start_date": "12/08/1994","end_date": "12/10/1994", "days_taken": ""};
     req: Irequest[] = [];

    constructor(private request: ApiRequestService){
        this.appGetRequests();
    }
    
    appGetRequests(){
       this.request.getRequests().subscribe(
         (data: Irequest[])=>{
           console.table(data);
           this.req = data;
          }
       );
    }


    appPostRequests(){
       this.request.postRequest(this.request_data).subscribe();
    }
}
