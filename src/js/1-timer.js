import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector("#datetime-picker")
const start = document.querySelector("[data-start]")
const days = document.querySelector("[data-days]")
const hours = document.querySelector("[data-hours]")
const minutes = document.querySelector("[data-minutes]")
const seconds = document.querySelector("[data-seconds]")

let userSelectedDate = null

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        const selectedDate = selectedDates[0]
        if (selectedDate < new Date()) {
            start.setAttribute("disabled", '')
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
        } else {
            userSelectedDate = selectedDate
            start.removeAttribute("disabled")
        }
    },
};

flatpickr(input, options)

start.addEventListener("click", () => {
    input.setAttribute("disabled", '')

    const timerId = setInterval(() => {
        let difference = userSelectedDate - new Date()
        if (difference <= 0) {
            clearInterval(timerId)
            input.removeAttribute("disabled")
            iziToast.success({
                message: 'Countdown finished!',
                position: 'topRight',
            });
        } else {
            start.setAttribute("disabled", '')

            const time = convertMs(difference)
            days.textContent = addLeadingZero(time.days)
            hours.textContent = addLeadingZero(time.hours)
            minutes.textContent = addLeadingZero(time.minutes)
            seconds.textContent = addLeadingZero(time.seconds)
        }
    }, 1000)
})

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
    return String(num).padStart(2, '0');
}