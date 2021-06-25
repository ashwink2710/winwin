import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor(private http: HttpClient, private datepipe: DatePipe) { }

  getAvailability(date=new Date()){
    let latest_date =this.datepipe.transform(date, 'dd-MM-yyyy');
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=539&date=${latest_date}`)
 }

}
