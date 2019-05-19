import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-health-status',
  templateUrl: './health-status.component.html',
  styleUrls: ['./health-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthStatusComponent implements OnInit {

  deviceOn: boolean = true;
  health: string = "Warning";
  showOptions = false;
  showSysStatus = false;
  showFNOL = false;
  showQuestions = false;
  claimNumber = "123456789";

  constructor() { }

  ngOnInit() {
  }

  onOptionsClick() {
    this.showOptions = this.showOptions === true ? false : true;
  }

  onOSysStatusClick() {
    this.showSysStatus = this.showSysStatus === true ? false : true;
  }

  onFNOLClick() {
    this.showFNOL = this.showFNOL === true ? false : true;
  }

  onQuestionsClick() {
    this.showQuestions = this.showQuestions === true ? false : true;
  }

  onSwitch() {
    this.deviceOn = this.deviceOn == true ? false : true;
  }
  getBackgroundColor() {
    if (this.health === 'Warning') {
      return {
        "background": "#FFB617",
        "border-top": "5px solid #ff6600"
      };

    }
    else if (this.health === 'Critical') {
      return {
        "background": "#FF0000",
        "border-top": "5px solid #FFB617"
      };

    } else if (this.health === 'Normal') {
      return {
        "background": "#6E27C5",
        "border-top": "5px solid #01C1D6"
      };

    }

  }
}
