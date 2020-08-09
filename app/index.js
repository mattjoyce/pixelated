import clock from "clock";
import * as util from "../common/utils";
import document from "document";
import { preferences } from "user-settings";
import { dayHistory, today, goals } from "user-activity";
import { battery } from "power";
import { FitFont } from '../common/fitfont'
import { me as appbit } from "appbit";



// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//const heartRate = document.getElementById("heartRate");

const dayLbl  = new FitFont({ id:'dayLbl',  font:'pixelmix_20',  halign: 'start'});
const monthLbl  = new FitFont({ id:'monthLbl',  font:'pixelmix_20',  halign: 'end'});
const hourLbl = new FitFont({ id:'hourLbl', font:'pixelmix_60', halign: 'start'});
const stepsLbl  = new FitFont({ id:'stepsLbl',  font:'pixelmix_20',  halign: 'start'});
const batterypercentLbl  = new FitFont({ id:'batterypercentLbl',  font:'pixelmix_20',  halign: 'end'});
const goalpercentLbl  = new FitFont({ id:'goalpercentLbl',  font:'pixelmix_20',  halign: 'end'});

const backgroundcolour="#0b0b1a"; 
const bg=document.getElementById('bg');
bg.style.fill=backgroundcolour;

const rectBlueMask = document.getElementById('bluemask');
const rectRedMask = document.getElementById('redmask');
const rectGreenMask = document.getElementById('greenmask');
const rectYellowMask = document.getElementById('yellowmask');
rectBlueMask.style.fill=backgroundcolour;
rectRedMask.style.fill=backgroundcolour;
rectGreenMask.style.fill=backgroundcolour;
rectYellowMask.style.fill=backgroundcolour;

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let hours = evt.date.getHours();

  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(evt.date.getMinutes());

  hourLbl.text = hours + ':' + mins;
  dayLbl.text = `${dayNames[evt.date.getDay()]}`;
  monthLbl.text = `${monthNames[evt.date.getMonth()]}`+ ' ' + `${evt.date.getDate()}`;
  
  if(battery.chargeLevel<=25){
    batterypercentLbl.style.fill="red"    
  } else {
        batterypercentLbl.style.fill="white"        
  }
  batterypercentLbl.text = `${battery.chargeLevel}` + '%';
  
  
  if (appbit.permissions.granted("access_activity")) {
     stepsLbl.text = `Steps ${today.adjusted.steps}`;

     //update steps and goals
     // steps and goal percent
     let p = Math.round((today.adjusted.steps / goals.steps)*100);
     if(p>100) {goalpercentLbl.style.fill="gold"}
       else {goalpercentLbl.style.fill="white"}
     goalpercentLbl.text = `${p}` + '%';

     util.calcualte_masksize(rectBlueMask,today.adjusted.steps,goals.steps);
     util.calcualte_masksize(rectRedMask,today.adjusted.calories,goals.calories);
     util.calcualte_masksize(rectGreenMask,today.adjusted.elevationGain,goals.elevationGain);
     util.calcualte_masksize(rectYellowMask,today.adjusted.activeMinutes,goals.activeMinutes);

     //util.calcualte_masksize(rectBlueMask,8654,10000);
     //util.calcualte_masksize(rectRedMask,2400,3500);
     //util.calcualte_masksize(rectGreenMask,4,8);
     //util.calcualte_masksize(rectYellowMask,2,30);    
    
     console.log(today.adjusted.steps / goals.steps);
     console.log(today.adjusted.calories / goals.calories);
     console.log(today.adjusted.elevationGain / goals.elevationGain);
     console.log(today.adjusted.activeMinutes / goals.activeMinutes);
   }
}