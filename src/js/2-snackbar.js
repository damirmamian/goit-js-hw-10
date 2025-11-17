import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form")

function promiseMaker(delay, state) {
    return new Promise((resolve, reject) => {
        const timerID = setInterval(() => {
            if (state === "fulfilled") {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay)
    });
}

form.addEventListener("submit", event => {
    event.preventDefault()
    const delay = Number(event.currentTarget.elements.delay.value)
    const state = event.currentTarget.elements.state.value

    promiseMaker(delay, state)
        .then(delay => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        })
})
