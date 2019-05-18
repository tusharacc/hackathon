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

  constructor() { }

  ngOnInit() {
  }

}
