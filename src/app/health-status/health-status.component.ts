import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthStatusComponent implements OnInit {

  deviceOn:boolean = true;
  health:string;
  showOptions = false;
  showSysStatus = false;
  showFNOL = false;
  showQuestions = false;

  constructor(private service:DataService) { }

  ngOnInit() {
    this.service.getCosmosData()
    .subscribe(
      (data) => console.log('Raw Data',data), // success path
      error => console.error(error) // error path
    );

    this.service.getSensorHealth()
    .subscribe(
      (data) => {
        console.log('Health Data',data);
        if (data['status'] == 'good'){
          this.health = 'Normal';
        } else if (data['status'] == 'warning') {
          this.health = 'Warning';
        } else if (data['status'] == 'critical'){
          this.health = 'Critical';
        }
      },
      error => console.error('Health Error',error)
    );
  }

  onOptionsClick(){
    this.showOptions = this.showOptions === true ? false : true;
  }

  onOSysStatusClick(){
    this.showSysStatus = this.showSysStatus === true ? false : true;
  }

  onFNOLClick(){
    this.showFNOL = this.showFNOL === true ? false : true;
  }

  onQuestionsClick(){
    this.showQuestions = this.showQuestions === true ? false : true;
  }

  onSwitch(){
    this.deviceOn = this.deviceOn == true ? false: true;
  }

}
