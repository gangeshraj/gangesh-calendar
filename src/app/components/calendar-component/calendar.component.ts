

import { DOCUMENT } from '@angular/common'; 
import { Component, OnInit, OnDestroy,Inject,Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'calendar-widget',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit,OnDestroy {


  source:"KULDPS";
  destination:"MYR";
  locale:any="en-gb"
  currency:any="INR";
  myDate_helper: Date = new Date();
  oneWayRadioChecked:boolean=false;
  twoWayRadioChecked:boolean=true;
  calendarDataStructure:any=[];
  calendarDataStructureDesktop:any=[]
  today_milliseconds:any=new Date(new Date(this.myDate_helper.getFullYear(),this.myDate_helper.getMonth(),this.myDate_helper.getDate())).getTime();
  dayCode={"Mon":0,"Tue":1,"Wed":2,"Thu":3,"Fri":4,"Sat":5,"Sun":6};
  monthCode={"Jan":0,"Feb":1,"Mar":2,"Apr":3,"May":4,"Jun":5,"Jul":6,"Aug":7,"Sep":8,"Oct":9,"Nov":10,"Dec":11};
  viewPortWidth:string;
  arrowLeftHide:boolean=true;
  arrowRightHide:boolean=false;
  calendarVisibility:boolean=false;
  startMilliSecondSelected:string=undefined;
  endMilliSecondSelected:string=undefined;
  buttonDisabled=true;

  departDate:string;
  //departDate:string=Date.now().toLocaleString('en-gb')

  returnDate:string="Return Date";

  

  constructor(private httpClient: HttpClient,
              private renderer:Renderer2,
              @Inject(DOCUMENT) private document: any)
            {
              // this.getservice()
              // .subscribe(data => {
              //   console.log(data);
              // });
            }


  
  


  todayDate=()=>{


  }








  //this.today_milliseconds=new Date(today_milliseconds).getTime();

  isDisable=(milliSeconds:number)=>{

    if((milliSeconds>=this.today_milliseconds && milliSeconds<=(this.today_milliseconds+449*86400000))){
      return false;
    }
    return true;
  }

  hideCalendar=()=>{
    this.calendarVisibility=true;
  }


  leftArrowClick=()=>{

    if(this.calendarDataStructureDesktop[0]===this.calendarDataStructure[0])
      return;
    if(this.calendarDataStructureDesktop[0]===this.calendarDataStructure[1])
      {
          this.calendarDataStructureDesktop[1]=this.calendarDataStructureDesktop[0];
          this.calendarDataStructureDesktop[0]=this.calendarDataStructure[0];
          this.arrowLeftHide=true;
      }
    else{
      let indexOf:number=this.calendarDataStructure.indexOf(this.calendarDataStructureDesktop[1])
      if(indexOf===this.calendarDataStructure.length-1)
          this.arrowRightHide=false;
      this.calendarDataStructureDesktop[1]=this.calendarDataStructureDesktop[0];
      this.calendarDataStructureDesktop[0]=this.calendarDataStructure[indexOf-2];
    } 

  }

  rightArrowClick=()=>{

    if(this.calendarDataStructureDesktop[1]===this.calendarDataStructure[this.calendarDataStructure.length-1])
      {
        //console.log("1st")
        return;
      } 
    if(this.calendarDataStructureDesktop[1]===this.calendarDataStructure[this.calendarDataStructure.length-2])
      {
        console.log("beforeError");
        this.arrowRightHide=true;
          this.calendarDataStructureDesktop[0]=this.calendarDataStructureDesktop[1];
          this.calendarDataStructureDesktop[1]=this.calendarDataStructure[this.calendarDataStructure.length-1];
      }
    else{

      let indexOf:number=this.calendarDataStructure.indexOf(this.calendarDataStructureDesktop[1])
      if(indexOf===1)
          this.arrowLeftHide=false;
      this.calendarDataStructureDesktop[0]=this.calendarDataStructureDesktop[1];
      this.calendarDataStructureDesktop[1]=this.calendarDataStructure[indexOf+1];
    }

  }
  

  makeCalendarData=()=>{
    
    for(let i=0;i<16;++i){//FOR FROM This month and forwaard  16 MONTHS

      //detail of 1st day of this month split in four=>todaysMonth1stDay month date year
      this.calendarDataStructure
      .push (
              (((new Date(this.myDate_helper.getFullYear()
                ,this.myDate_helper.getMonth()+i,
                1)
              ).toString()).split(" ")
              .splice(0,4))
              //.push((new Date(this.myDate_helper.getFullYear(),this.myDate_helper.getMonth()+i+1,0)).toString())
            );

      //than that index which is currently going on added the total no of days in this month
      this.calendarDataStructure[i]
      .push((new Date(this.myDate_helper.getFullYear(),this.myDate_helper.getMonth()+i+1,0)).toString().split(" ")[2])


      // than that index which is currently going on added an array of size 42 in 
      // our calendar representation of months with 7 cols and 6 rows and containing days and fare
      let array_42_for_calendar_date_fare=[]
      for(let i=0;i<42;++i){
          array_42_for_calendar_date_fare.push(new Array(undefined , undefined))
      }
      this.calendarDataStructure[i].push(array_42_for_calendar_date_fare);

      
      //this will be place for fare
      //this.calendarDataStructure[i].push(undefined);

    }

    //console.log(this.calendarDataStructure[0][5][0]===this.calendarDataStructure[0][5][1])


  }






  arrangeDays=()=>{
    for(let i=0;i<16;++i){

      let start_day_index:number= this.dayCode[this.calendarDataStructure[i][0]];
      let end_day_value:number= Number(this.calendarDataStructure[i][4]);

      let k:number=1;
      for(let j=start_day_index;j<start_day_index+end_day_value;j++,k+=1){
            this.calendarDataStructure[i][5][j][0]=k;
      }

    }

  }

  makeDesktopCalendarData=()=>{
      this.calendarDataStructureDesktop.push(this.calendarDataStructure[0])
      this.calendarDataStructureDesktop.push(this.calendarDataStructure[1])
  }

    
  // fetchFares=()=>{
  //   console.log("fetching")
  //   this.httpClient.get("https://k.apiairasia.com/availabledates/api/v1/pricecalendar/0/0/"+this.source
  //   +"/"+this.destination+ "/DPS/2018-03-01/1/18",{
  //     observe:'body'
  //   })
  //   .pipe(map(
  //     (fares)=>{
  //       console.log(fares)
  //     }
  //   )
  // )

  // }




  // fetchFares=()=>{
  //   console.log("fetching")
  //   return this.httpClient.get("https://k.apiairasia.com/availabledates/api/v1/pricecalendar/0/0/MYR/KUL/DPS/2018-03-01/1/18",{
  //     observe:'body'
  //   })
  //   .pipe(map(
  //     (fares)=>{
  //       console.log("here received")
  //       console.log(fares)
  //       return fares;
  //     }
  //   )
  // )
  // .pipe(
  //   catchError(error => {
  //     console.log("error receivd")
  //     return throwError("ok")
  // })
  // )

  // }


  rangeFunction:any=()=>{
    console.log("ok")
    let c:number=+(new Date(2018,10,20))
    var ad=this.document.getElementById(c)
    //console.log(ad)
    ad.classList.add('left_extreme_outside_range')
    ad.children[0].classList.add('left_extreme_inside_range');
    var bd=this.document.getElementById(c+86400000)
    bd.classList.add('middle_range')
    var cd=this.document.getElementById((c+2*86400000))
    cd.classList.add('right_extreme_outside_range')
    cd.children[0].classList.add('right_extreme_inside_range')
    // ad.style.backgroundColor='white'
  }



  ngOnChanges(){
    //this.rangeFunction();
  }

  ngAfterViewInit(){
    this.rangeFunction();
    // var a=document.getElementById("d1559327400000").parentElement.parentElement.children[0];
    // console.log(a)
    // a.scrollIntoView();
  }


  inFormat:any=(format:string,dayMS)=>{

    let day=""+((""+new Date(dayMS).getDate()).length>1?""+new Date(dayMS).getDate():"0"+new Date(dayMS).getDate())
    let month=""+((""+(new Date(dayMS).getMonth()+1)).length>1?""+(new Date(dayMS).getMonth()+1):"0"+(new Date(dayMS).getMonth()+1))
    let year=""+new Date(dayMS).getFullYear();

    switch(format){
      case 'dd/mm/yyyy':
                      return day+"/"+month+"/"+year
      case 'mm/dd/yyyy':
                      return month+"/"+day+"/"+year
    }
  }


  //((+(new Date()))+7*86400000)
  populateDateFields=(departDateMS=((+(this.myDate_helper))+7*86400000),returnDateMS=((+(this.myDate_helper))+10*86400000))=>{
    // this.departDate=""+((""+this.myDate_helper.getDate()).length>1?""+this.myDate_helper.getDate():"0"+this.myDate_helper.getDate())
    // +"/"+((""+(this.myDate_helper.getMonth()+1)).length>1?""+(this.myDate_helper.getMonth()+1):"0"+(this.myDate_helper.getMonth()+1))
    // +"/"+this.myDate_helper.getFullYear();

    if(this.locale==='en-gb'){
      this.departDate=this.inFormat('dd/mm/yyyy',departDateMS)
      this.returnDate=this.inFormat('dd/mm/yyyy',returnDateMS)
    }
    else{
      this.departDate=this.inFormat('mm/dd/yyyy',departDateMS)
      this.returnDate=this.inFormat('mm/dd/yyyy',returnDateMS)
    }

  }



  ngOnInit(){
    this.makeCalendarData();
    this.arrangeDays();
    this.makeDesktopCalendarData();
    this.oneWayRadioChecked=false;
    this.twoWayRadioChecked=true;
    this.setViewPortWidth()
    this.arrowLeftHide=true;
    this.arrowRightHide=false;
    //this.fetchFares();
    //this.rangeFunction();
    // this.locale=locale;
    this.populateDateFields();
    this.rangeFunction();
  }


  makeRange=()=>{

    if(this.oneWayRadioChecked===true){



    }
    else{



    }


  }



  setViewPortWidth=()=>{
    if(window.innerWidth<=600)
      this.viewPortWidth="mobile";
    else if(window.innerWidth>=601 && window.innerWidth<=700)
      this.viewPortWidth="tablet";
    else
      this.viewPortWidth="desktop"
    this.rangeFunction();
  }



  returnMilliSeconds=(year,month,day)=>{
    
      return +(new Date(year,month,day));
  }



  radioClicked=(radioRefrenceName:string)=> {

    if(radioRefrenceName==='two_way'){
        if(this.twoWayRadioChecked===true){
            return;
        }
        else{
          this.twoWayRadioChecked=!this.twoWayRadioChecked;
          this.oneWayRadioChecked=!this.oneWayRadioChecked;
        }
        this.populateDateFields();
    }

    if(radioRefrenceName==='one_way'){
      if(this.oneWayRadioChecked===true){
          return;
      }
      else{
        this.twoWayRadioChecked=!this.twoWayRadioChecked;
        this.oneWayRadioChecked=!this.oneWayRadioChecked;
      }
      this.returnDate='One Way'
    }

  }








  ngOnDestroy(){

  }


}



