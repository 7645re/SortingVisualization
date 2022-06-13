var boxOfNumber = document.getElementsByClassName("box")[0]
var sliderMaxNumber = document.getElementsByClassName("sliderMaxNumber")[0]
var sliderCountNumber = document.getElementsByClassName("sliderCountNumber")[0]
var sliderSpeedSorting = document.getElementsByClassName("sliderSpeedSorting")[0]
var buttonQuickSort = document.getElementsByClassName("buttonQuickSort")[0]
var buttonInsertionSort = document.getElementsByClassName("buttonInsertionSort")[0]
var workFlow = document.getElementsByClassName("workflow")[0]
var sliderMaxNumberIndicator = document.getElementsByClassName("sliderMaxNumberIndicator")[0]
var sliderCountNumberIndicator = document.getElementsByClassName("sliderCountNumberIndicator")[0]
var sliderSpeedSortingIndicator = document.getElementsByClassName("sliderSpeedSortingIndicator")[0]
var suffixs = ["", "k", "M", "G", "T", "P", "E"];
var speedOfSorting = 10
let array
let flag = true


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Function to reduce the number using prefixes
function abbreviateNumber(number) {
    let tier = Math.log10(Math.abs(number)) / 3 | 0;
    if (tier == 0) return number;
    let suffix = suffixs[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = number / scale;
    return scaled.toFixed(1) + suffix;
}

// Function for creating block growth animation
function grow(element, height) {
    if (parseInt(element.style.height) < height & (height - parseInt(element.style.height)) > 2) {
        element.style.height = parseInt(element.style.height) + (height-parseInt(element.style.height))/100*50 + "%"
        setTimeout(grow, 50, element, height);
    }
}

function fillArrayAndCreateBlock(array, length, maxElement) {
    // delete old blocks with numbers 
    workFlow.removeChild(boxOfNumber)
    boxOfNumber = document.createElement("div")
    boxOfNumber.className = "box"
    workFlow.appendChild(boxOfNumber)
    let numberDiv // block element
    let numberDivToolTip // the element that will be displayed when hovering over the block element
    for (let i = 0; i < length; i++) {
        // filling an array with random numbers
        array[i] = getRandomInt(maxElement)
        // creating and describing a block element
        numberDiv = document.createElement("div")
        // the width of the block is calculated using the formula: space size / number of blocks / space size * 100
        // space size / number of blocks = size of one block
        // size of one block / free space * 100 = the percentage of its ratio to free space
        numberDiv.style.width = (boxOfNumber.clientWidth / length) / boxOfNumber.clientWidth * 100 + "%"
        numberDiv.style.height = 0
        // numberDiv.style.left = 0
        // assign the block identifier the same as the order of the number in the array, 
        // so that I can then use this identifier when moving blocks
        numberDiv.id = i
        numberDiv.className = "number"
        numberDiv.style.order = i
        // I use the percentage ratio to shift the blocks from the left edge so that when the screen narrows and expands, the order of the blocks is preserved
        // numberDiv.style.left = i * (boxOfNumber.clientWidth / length) / boxOfNumber.clientWidth * 100 + "%"

        // if you need to show the number in the block itself, then uncomment the line below (it may have failures)
        // abbreviated Number(array[i]) is a function that will shorten the length of a number using a logarithm and suffixes in the form of letters
        // Example: 1000 = 1k, 1000000 = 1M
        // if ((boxOfNumber.clientWidth / length - numberDivMargin * 2) >= 37) numberDiv.textContent = abbreviateNumber(array[i])

        // a hint that will pop up when you hover over the block
        numberDivToolTip = document.createElement("span")
        numberDivToolTip.textContent = array[i]
        numberDivToolTip.className = "tooltiptext"
        numberDiv.appendChild(numberDivToolTip);
        boxOfNumber.appendChild(numberDiv);

        // calling a recursive function with settimeout to create a block growth animation
        // array[i] / max Element * 100 is a formula for calculating the percentage ratio of the block height to the total space in height
        setTimeout(grow, 50, numberDiv, array[i] / maxElement * 100);
    }
}

async function resideElementsById(firstElement, secondElement) {
    let tempOrder = firstElement.style.order
    firstElement.style.order = secondElement.style.order
    secondElement.style.order = tempOrder

    let tempId = firstElement.id
    firstElement.id = secondElement.id
    secondElement.id = tempId
} 

sliderMaxNumber.oninput = function() {
    sliderMaxNumberIndicator.innerHTML = "Max number: " + this.value
    array = new Array(sliderCountNumber.value)
    fillArrayAndCreateBlock(array, sliderCountNumber.value, sliderMaxNumber.value)
}
sliderCountNumber.oninput = function() {
    sliderCountNumberIndicator.innerHTML = "Count of number: " + this.value
    array = new Array(sliderCountNumber.value)
    fillArrayAndCreateBlock(array, sliderCountNumber.value, sliderMaxNumber.value)
}
buttonQuickSort.addEventListener("click", async function() {
    sliderMaxNumber.disabled = true
    sliderCountNumber.disabled = true
    sliderSpeedSorting.disabled = true
    buttonInsertionSort.disabled = true
    buttonQuickSort.disabled = true
    await quickSort(array, 0, array.length - 1) 
    buttonQuickSort.disabled = false
    buttonInsertionSort.disabled = false
    sliderMaxNumber.disabled = false
    sliderCountNumber.disabled = false
    sliderSpeedSorting.disabled = false 
})
buttonInsertionSort.addEventListener("click", async function() {
    sliderMaxNumber.disabled = true
    sliderCountNumber.disabled = true
    sliderSpeedSorting.disabled = true
    buttonInsertionSort.disabled = true
    buttonQuickSort.disabled = true
    await insertionSort(array)
    buttonInsertionSort.disabled = false
    buttonQuickSort.disabled = false
    sliderMaxNumber.disabled = false
    sliderCountNumber.disabled = false
    sliderSpeedSorting.disabled = false
})
sliderSpeedSorting.oninput = function() {
    sliderSpeedSortingIndicator.innerHTML = "Speed of sorting: " + this.value
    speedOfSorting = this.value
    array = new Array(sliderCountNumber.value)
    fillArrayAndCreateBlock(array, sliderCountNumber.value, sliderMaxNumber.value)
}

async function delay(delayInms) {
    return new Promise(resolve  => {
      setTimeout(() => {
        resolve(2)
      }, delayInms);
    });
  }
