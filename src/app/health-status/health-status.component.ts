import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthStatusComponent implements OnInit {

  deviceOn:boolean = true;
  health:string='NOT AVAILABLE';
  showOptions = false;
  showSysStatus = false;
  showFNOL = false;
  showQuestions = false;
  message:string;
  claimNumber:string;

  constructor(private service:DataService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    

    this.service.getSensorHealth()
    .subscribe(
      (data) => {
        console.log('Health Data',data);
        if (data['status'] == 'good'){
          this.health = 'Normal';
        } else if (data['status'] == 'warning') {
          this.health = 'Warning';
          this.message = data['message']
        } else if (data['status'] == 'critical'){
          this.health = 'Critical';
          this.message = data['message']
        }
      },
      error => console.error('Health Error',error)
    );
  }

  showMessage(){
    if (this.health == 'Warning' || this.health == 'Critical'){
      return true;
    }
  }

  onOptionsClick(){
    this.service.getSensorHealth().subscribe(
      (data) => {
        let status = data['isvalveon'];
        if (status){
          this.deviceOn = true;
        } else {
          this.deviceOn = false;
        }
      }
    )
    this.showOptions = this.showOptions === true ? false : true;
  }

  onOSysStatusClick(){
    this.showSysStatus = this.showSysStatus === true ? false : true;
  }

  onFNOLClick(){
    
    this.showFNOL = this.showFNOL === true ? false : true;
    if (this.showFNOL){
      this.spinner.show();
      setTimeout(() => {
        let maximum = 100000
        let minimum = 900000
        var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        this.claimNumber = `F${randomnumber}`;
        this.spinner.hide();
      }, 2000);
    }
    
  }

  onQuestionsClick(){
    this.showQuestions = this.showQuestions === true ? false : true;
  }

  onSwitch(){
    this.deviceOn = this.deviceOn == true ? false: true;
    this.service.updateValveStatus(this.deviceOn).subscribe(
      (data) => {
        console.log('valve status return',data);
      }, (err) => {
        console.log('Error',err)
      }
    );
  }

}
