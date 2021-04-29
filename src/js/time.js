const refs = {
  btnStart: document.querySelector('.start'),
  btnStop : document.querySelector('.stop'),
  spanDays: document.querySelector('[data-value="days"]'),
  spanHours: document.querySelector('[data-value="hours"]'),
  spanMinutes: document.querySelector('[data-value="mins"]'),
  spanSeconds: document.querySelector('[data-value="secs"]'),
   
}

let intervalId = null
 
class CountdownTimer {
  constructor({ targetDate }) {
    this.targetDate = targetDate;
  }



  startTime() {

    refs.btnStart.setAttribute('disabled', 'true')


     intervalId =  setInterval(() => {
      const currentDate = Date.now();
      const startTimer =  this.targetDate.getTime()-currentDate;
    
      const days = this.pad(Math.floor(startTimer / (1000 * 60 * 60 * 24)));
      const hours = this.pad(Math.floor((startTimer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins = this.pad(Math.floor((startTimer % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((startTimer % (1000 * 60)) / 1000));
      
      changeInterfaces({ days, hours, mins, secs });
  
    }, 1000);
    
  }

  stopTime() {
    clearInterval(intervalId);
     refs.btnStart.removeAttribute('disabled')
   }
   
    pad(value) {
    return String(value).padStart(2, '0');
  }

};

const timer = new CountdownTimer({
  targetDate: new Date('Nov 1, 2021'),
});

refs.btnStart.addEventListener('click', timer.startTime.bind(timer)
);
refs.btnStop.addEventListener('click',timer.stopTime.bind(timer));


function changeInterfaces(time) {
  refs.spanDays.textContent = time.days;
  refs.spanHours.textContent = time.hours;
  refs.spanMinutes.textContent = time.mins;
  refs.spanSeconds.textContent = time.secs;
};

timer.startTime();