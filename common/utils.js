// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function calcualte_masksize(thisrect,actual,goal){
  let pc=actual/goal;
  if(pc>=1) { pc=1; } 
  console.log(pc);
  let w=250*(1-pc);
  thisrect.width=w;
  thisrect.x=290-w;
}
