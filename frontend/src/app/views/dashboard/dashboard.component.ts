import { filter } from 'rxjs/operators';
import { Usuarios } from './../../../models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/core/guard/auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {Posts} from '../../../models/Posts'


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  title="pagination";
  page:number=1;
  count:number=0;
  tableSize:number = 3;
  tableSizes:any = [5,10,15,20];
  POSTS:any;
  allUsers: Usuarios[]=[];
  searchText = "";
  listOfContacts:any ;




  ALLPOSTS:Posts[]=[];



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
    this.fetchPosts();
    this.showText();


  }



  private fetchUsers(){

    this.authService.fetchUsers().subscribe((data)=>{
      this.allUsers=data;
    })


   }
   isReadMore = false;
   showText() {
    this.isReadMore = !this.isReadMore
 }


  private fetchPosts(){

    this.authService.fetchPosts().subscribe((data)=>{
      this.POSTS= data;

    })

   }

   onTableDataChange(event:any){
    this.page = event;
    this.fetchPosts();
   }

   onTableDataSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.page=1;
    this.fetchPosts();
   }


  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value),
    this.initCharts();
  }

search(e:Event):void{
  const target = e.target as HTMLInputElement
  const value = target.value;

  this.POSTS = this.ALLPOSTS.filter((POSTS)=>{
     return POSTS.titulo.toLocaleLowerCase().includes(value);
  });

}

}
