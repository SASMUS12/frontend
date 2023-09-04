const currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
const amOrPm = hours >= 12 ? 'PM' : 'AM';

if (hours > 12) {
  hours -= 12;
}

if (minutes < 10) {
  minutes = 0 + minutes;
}

const formattedTime = `${hours}:${minutes} ${amOrPm}`;

export default formattedTime;
