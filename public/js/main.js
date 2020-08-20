var clockTarget = document.getElementById("clock")
var yearCopyRight = document.getElementById("year")
var input = document.getElementById("dataInput")
var button = document.getElementById("button")


button.addEventListener("click", (event) => {
    if (input.value === "") {
        alert("You should write a city!")
        event.preventDefault()
        input.focus()

    }
});


var clock = () => {
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    let second = date.getSeconds()

    clockTarget.textContent = hour + ":" + min + ":" + second
    yearCopyRight.textContent = date.getFullYear()
}
setInterval(clock, 1000)