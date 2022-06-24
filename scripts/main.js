var workFlow = document.getElementsByClassName("workflow")[0]
var sortAlgorithm = document.getElementsByClassName("sortAlgorithm")[0]
var sliderMaxNumber = document.getElementsByClassName("sliderMaxNumber")[0]
var buttonStartSort = document.getElementsByClassName("buttonStartSort")[0]
var sliderCountNumber = document.getElementsByClassName("sliderCountNumber")[0]
var sliderFrequency = document.getElementsByClassName("sliderFrequency")[0]
var sliderIterationDelay = document.getElementsByClassName("sliderIterationDelay")[0]
var sliderMaxNumberIndicator = document.getElementsByClassName("sliderMaxNumberIndicator")[0]
var sliderCountNumberIndicator = document.getElementsByClassName("sliderCountNumberIndicator")[0]
var sliderFrequencyIndicator = document.getElementsByClassName("sliderFrequencyIndicator")[0]
var sliderIterationDelayIndicator = document.getElementsByClassName("sliderIterationDelayIndicator")[0]
var coverageInterval = document.getElementById("coverageInterval")

let frequency = 0 // variable regulating the hertz of the sorting sound
var context = new (window.AudioContext || window.webkitAudioContext)(); // context for playing the sorting sound
var chart
var maxNumberDivHide = true

// Fcuntion for generate random number
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// function that sets the status of activity or inactivity for all buttons
async function setStatusButtonsSlides(status) {
    sliderMaxNumber.disabled = status
    buttonStartSort.disabled = status
    sliderCountNumber.disabled = status
    sliderIterationDelay.disabled = status
}

// delay function for creating animation
async function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2)
        }, delayInms);
    });
}

sliderMaxNumber.oninput = function () {
    sliderMaxNumberIndicator.innerHTML = "Max number: " + this.value
    chart.fill(sliderCountNumber.value, sliderMaxNumber.value)
    arrayIsSorted = false
}
sliderCountNumber.oninput = function () {
    sliderCountNumberIndicator.innerHTML = "Count of number: " + this.value
    chart.fill(sliderCountNumber.value, sliderMaxNumber.value)
    arrayIsSorted = false
}

coverageInterval.oninput = function () {
    if (maxNumberDivHide) {
        sliderMaxNumber.style.display = ""
        sliderMaxNumberIndicator.style.display = ""
        maxNumberDivHide = false
    }
    else {
        sliderMaxNumber.style.display = "none"
        sliderMaxNumberIndicator.style.display = "none"
        maxNumberDivHide = true
    }
    chart.coverageInterval = coverageInterval.checked
}

buttonStartSort.addEventListener("click", async function () {
    if (!chart.isSorted) {
        setStatusButtonsSlides(true)
        switch (sortAlgorithm.value) {
            case ("quickSort"):
                await chart.quickSort()
                break
            case ("insertionSort"):
                await chart.insertionSort()
                break
            case ("countingSort"):
                await chart.countingSort()
                break
            case ("cocktailSort"):
                await chart.cocktailSort()
                break
            case ("mergeSort"):
                await chart.mergeSort()
                break
        }
        setStatusButtonsSlides(false)
    }
})


sliderIterationDelay.oninput = function () {
    sliderIterationDelayIndicator.innerHTML = "Iteration delay: " + this.value
    chart.iterationDelay = parseInt(this.value)
}

sliderFrequency.oninput = function () {
    sliderFrequencyIndicator.innerHTML = "Frequency: " + this.value
    frequency = this.value
}

document.addEventListener("DOMContentLoaded", async function () {
    chart = new Chart({backgroundColor: "black", alignItems: "flex-end", maxValue: parseInt(sliderCountNumber.value)})
    chart.setup(workFlow)
    chart.fill(sliderCountNumber.value, sliderMaxNumber.value)
});