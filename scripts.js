const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];


const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4')


let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDate = new Date(tempYear, tempMonth, tempDay + 13, 11, 30, 0)

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];

const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;


// Future time in ms

const futureTime = futureDate.getTime(); // .getTime returns the date in ms.

const getRemainingTime = () => {
    const today = new Date().getTime();
    const t = futureTime - today;

    // Values in ms
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMin = 60*1000;

    //Calculate all values
    let days = t / oneDay;
    days = Math.floor(days);
    let hour = Math.floor((t % oneDay) / oneHour);
    let min = Math.floor((t & oneHour) / oneMin);
    let sec = Math.floor((t % oneMin) / 1000);

    //Set values array:

    const values = [days, hour, min, sec];

    const format = item => {
        if(item < 10) {
            return item = `0${item}`
        }
        return item;
    }

    items.forEach((item,index) => {
        item.innerHTML = format(values[index]);
    });
    
    if(t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h3 class="expired">sorry, this giveaway has expired</h3>`
    }

}

// Countdown

let countdown = setInterval(getRemainingTime, 1000)

getRemainingTime();
