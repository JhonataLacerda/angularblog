import { Usuarios } from './../../../models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/guard/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { map, Observable } from 'rxjs';


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  allUsers: Usuarios[]=[];

  private url: string = 'http://localhost:8080';
  constructor(private chartsData: DashboardChartsData, private authService:AuthService, private http:HttpClient) {

  }


  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  async ngOnInit() {
    this.initCharts();
    this.fetchUsers();
  }


  private fetchUsers(){

    this.authService.fetchUsers().subscribe((data)=>{
      this.allUsers=data;
    })

   }


  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value),
    this.initCharts();
  }
}

