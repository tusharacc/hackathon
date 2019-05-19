import { Component, OnInit } from '@angular/core';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../data.service';

@Component({
  selector: 'app-system-status',
  templateUrl: './system-status.component.html',
  styleUrls: ['./system-status.component.css']
})
export class SystemStatusComponent implements OnInit {

  icon = faChevronDown;
  type;options;data
  rawData:Array<{}>;
  show:boolean=true;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.pullData();
    
  }

  pullData(frequency=null){
    this.service.getData(frequency).subscribe((data) => {
      this.rawData = data;
      this.showData();
    })
  }

  getData(frequency){
    this.pullData(frequency);
  }

  showData(){

    console.log('I am clicked',this.rawData);
    let dtLabels = this.rawData.map(data => {
      let dt = new Date(data["_timesteamp"]);
      return dt.getUTCHours() + ":" + dt.getUTCMinutes() + ":" + dt.getUTCSeconds();
    });
    let humidity = this.rawData.map((data) => data["humidity"]);

    console.log('date labels',dtLabels);
    console.log('humidity',humidity);
    
    this.type = 'line';
    this.data = {
      labels: dtLabels,
      datasets: [
        {
          label: "Humidity Distribution",
          data: humidity,
          borderColor: 'rgba(136, 213, 255)',
          fill:true,
          backgroundColor:'rgba(136, 213, 255,0.4)'
        }
      ]
    };
    this.options = {
      elements: {
        point:{
            radius: 0
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };
    this.show=true;
  }
  

}
