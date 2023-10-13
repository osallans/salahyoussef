export const WEEKDAYS=[{name:'Sunday',shortName:"Sun"},
{name:'Monday',shortName: "Mon"},
{name:"Tuesday",shortName:"Tue"},
{name:"Wednesday",shortName:"Wed"},
{name:"Thursday",shortName:"Thu"},
{name:"Friday",shortName:"Fri"},
{name:'Saturday',shortName:"Sat"}];

export const MONTHS=[
    {name:"January" , shortName:"Jan"},
    {name:"February" , shortName:"Feb"},
    {name:"March" , shortName:"Mar"},
    {name:"April" , shortName:"Apr"},
    {name:"May" , shortName:"May"},
    {name:"June" , shortName:"Jun"},
    {name:"July" , shortName:"Jul"},
    {name:"August" , shortName:"Aug"},
    {name:"September" , shortName:"Sep"},
    {name:"October" , shortName:"Oct"},
    {name:"November" , shortName:"Nov"},
    {name:"December" , shortName:"Dec"}
];
/**
*
*@param date: date to add days to
*@param days: number of days
*
**Add Days to a date
*
*/
export function addDays(date: Date, days: number): Date {
    let mydate: Date = new Date();
    mydate.setFullYear(date.getFullYear());
    mydate.setDate(date.getDate());
    mydate.setMonth(date.getMonth());
    mydate.setDate(date.getDate() + (days));
    return mydate;
}
/**
*
*@param date: date inside the required week
*@param year: year number if the required year is not the same year of the date
*
*returns the week number of a date in a year
*/
export function getWeekNumber(date:Date , year?:number) {
    var onejan = new Date(year?year:date.getFullYear(),0,1);
  return Math.ceil((((date.valueOf() - onejan.valueOf()) / 86400000) + onejan.getDay()+1)/7);
}

/**
*
*@param date: date in the same week of the required date
*@param dayOrderInWeek: Number to represent the order of day ( 0 -> sunday , 1-> monday .. etc)
*
*gets the date by its day number of the week
*/
export function DateOf(date, dayOrderInWeek) {
    let currentDay = date.getDay(); // day order in the week
    return addDays(date, (dayOrderInWeek - currentDay));
}

/**
*
*@param startDate
*@param endDate
*
*Count the days between 2 dates
*/
export function daysBetween(startDate: Date, endDate: Date) {
    var diff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    return diffDays;
}
/**
* 
* @param weekNumber 
* @param year 
* 
* Takes the week number and the year and returns and array of the days in that week.
*/
export function getWeek(weekNumber, year){
    weekNumber--;
    let firstDayInYear = new Date(year, 0, 1); //gets the first day in the year
    let day1 = firstDayInYear.getDay(); //gets the number of that day in the week
    let firstDayinWeek = new Date(firstDayInYear);
    firstDayinWeek.setDate(firstDayInYear.getDate() - day1 + weekNumber*7); //sets it to the first day in the week
    let week = [];
    
    //adds 7 days to the week[]
    for(let i=0; i<7; i++){
    let tempDate = new Date(firstDayinWeek);
    tempDate.setDate(tempDate.getDate() + i);
    //if(year == tempDate.getFullYear()) //removes days that are not in the given year
    week.push({date:tempDate});
    }
    return week;
}
/**
* 
* @param month 
* @param year 
* 
* Takes the month number and the year and returns 2D array of the days in that week.
*/
export function getWeeks(month,year){
    let weeks=[];
    let day1 = new Date(year, month, 1);
    
    let lastday= addDays(new Date(year, month+1, 0),1);
    
    for(let i=0;day1< lastday;i++){
      weeks[i]=[];
      let d=null;
      for(d = DateOf(day1,0) ; d<DateOf(day1,7); d=addDays(d, 1)){
        weeks[i].push({date:d});
      }
      day1=d;
    }
    return weeks;
  }
/**
* 
* @param order : 0 - > Sunday , 1-> Monday
* 
* takes the day order and returns its name
*/
  export function getDayName(order){
      return WEEKDAYS[order];
  }
/**
* 
* @param date1 
* @param date2 
* 
* Takes 2 dates compares against date without considering time and returns 1 if the first is greater , -1 if smaller , 0 if same date
*/
/*
  export function compareDatesNotime(date1 , date2){
      if(date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) return 0;
      if(date1>date2) return 1;
      if(date2>date1) return -1;
  }
  */
/**
* 
* @param time 
* 
* Takes Time String to return it as Date
*/
  export function getTimeAsDate(time: string) {
    return new Date(0, 0, 0, Number(time.substring(0,2)), Number(time.substring(3,5)), 0, 0);
  }
