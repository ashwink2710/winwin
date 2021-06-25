import { Component, OnInit, OnDestroy } from '@angular/core';
import { AvailabilityService } from './availability.service';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  centers:any[] = [];
  interval:any;
  constructor(private cowin: AvailabilityService){

  }

  ngOnInit(){
    this.interval = setInterval(()=>{
      this.getAvailability();
    },60000)
  }

  getAvailability(){
    this.cowin.getAvailability().pipe(
      map((data:any)=> {return data.centers}))
      .subscribe(
      (data:any)=>{
        //console.log(data);
        this.centers = data.filter((hInfo:any)=>{
            //return this.checkIfFirstDoseAvailable(hInfo.sessions);
            hInfo.sessions = hInfo.sessions.filter((sData:any)=>{
                return sData.available_capacity_dose1 >= 3 && sData.min_age_limit == 18
            })
            return hInfo.sessions.length > 0;
        });
        this.centers.map((availbleData)=>{
          let count = availbleData.sessions.reduce((sum:any,availableCount:any)=> 
          {
            return sum+availableCount.available_capacity_dose1  
          },0)
          availbleData.count = count;
          return availbleData;
        })
        //console.log(this.centers);
      }
    )
  }

  checkIfFirstDoseAvailable(data:any): boolean{
    let sessionData = data.filter((sessionData:any)=>{
      sessionData.available_capacity_dose1 >= 3 && sessionData.min_age_limit == 18
    })
    // for(let i=0;i<data.length;i++){
    //   if((data[i].available_capacity_dose1 >= 3 && data[i].min_age_limit == 18))
    //     return true;
    // }
    // return false;
    return sessionData.length > 0 ? true : false;
  }

  ngOnDestroy(){
    console.log("Destroyed called");
    this.interval.clearInterval();
  }

}
