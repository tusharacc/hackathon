import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthStatusComponent implements OnInit {

  deviceOn:boolean = true;
  health:string = "Warnning";
  showOptions = false;
  showSysStatus = false;
  showFNOL = false;
  showQuestions = false;

  constructor() { }

  ngOnInit() {
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
