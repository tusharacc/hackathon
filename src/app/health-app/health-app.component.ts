import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { faPlus, faMinus, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-health-app',
  templateUrl: './health-app.component.html',
  styleUrls: ['./health-app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthAppComponent implements OnInit {
  icon = faMinus;
  deviceCmdIcon = faToggleOn;
  subscription: Subscription;
  devices:{};
  devicesArr:Array<string>=['device1'];
  health:string = "Normal"
  show:boolean=true;
  showData:boolean=false;
  type;
  data;
  options;

  constructor(private service:DataService) { 
    
  }

  showDataGraph(item){
    console.log('Devices',this.devices[item])
    this.type = 'line';
    this.data = {
      labels: ["0 - 50", "51 - 80", "> 80"],
      datasets: [
        {
          label: "Humidity Distribution",
          data: [this.devices[item][0], this.devices[item][1], this.devices[item][2]]
        }
      ]
    };
    this.options = {
      responsive: true,
      maintainAspectRatio: false
    };

  }

  showGraph(item){
    this.showData = true;
    this.showDataGraph(item);
  }

  ngOnInit() {
    this.subscription = this.service.getData().subscribe(
      (data) => {
        this.health = this.analyzeData(data);
      });

  }

  humidityResult(humidity){
    if (humidity < 50){
      return 'Normal';
    } else if (humidity > 50 && humidity < 80){
      return 'Warning';
    } else {
      return 'Critical';
    }

  }

  getDeviceDetails(){
    //this.show=true;

  }

  toggleHealth(){
    this.icon = this.icon == faPlus ? faMinus : faPlus;
    this.show = this.icon !== faPlus;
  }

  switchOn(deviceName){
    console.log("Switched On")
  }

  
  switchOff(deviceName){
    console.log("Switched Off")
  }


  analyzeData(data):string{
    console.log('data from python',data);
    let health = 'Normal';
    let devices = {};
    for (let item in data){
      console.log(data[item]);
      let deviceId = data[item]['deviceId'];
      if (deviceId in devices){
        //console.log(true);
        let humidityInd = this.humidityResult(data[item]['humidity'])
        //console.log(humidityInd)
        if (humidityInd == 'Normal'){
          devices[deviceId][0] = devices[deviceId][0] + 1;
        } else if (humidityInd == 'Warning'){
          devices[deviceId][1] = devices[deviceId][1] + 1;
        } else if (humidityInd == 'Critical'){
          devices[deviceId][2] = devices[deviceId][2] + 1;
        }
        console.log('DEvices',devices);
      } else {
        devices[deviceId] = [0,0,0]
        let humidityInd = this.humidityResult(data[item]['humidity'])
        //console.log(humidityInd)
        if (humidityInd == 'Normal'){
          devices[deviceId][0] = devices[deviceId][0] + 1;
        } else if (humidityInd == 'Warning'){
          devices[deviceId][1] = devices[deviceId][1] + 1;
        } else if (humidityInd == 'Critical'){
          devices[deviceId][2] = devices[deviceId][2] + 1;
        }
        console.log('False ',devices);
      }
      for (let key in devices){
        let total = devices[key].reduce(this.returnSum)
        if (devices[key][2]*100/total > 10){
          health = 'Critical';
        } else if (devices[key][1]*100/total > 30) {
          health = 'Warning';
        }
        console.log(health);
      }
    }
    this.devices = devices;
    console.log('Updated the data',this.devices)
    return health;
  }

  returnSum(total,val){
    return total + val
  }
      
}
