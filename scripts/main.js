var numbers = document.getElementsByClassName("number")
var boxOfNumber = document.getElementsByClassName("box")[0]
var workFlow = document.getElementsByClassName("workflow")[0]
var sortAlgorithm = document.getElementsByClassName("sortAlgorithm")[0]
var sliderMaxNumber = document.getElementsByClassName("sliderMaxNumber")[0]
var buttonStartSort = document.getElementsByClassName("buttonStartSort")[0]
var sliderCountNumber = document.getElementsByClassName("sliderCountNumber")[0]
var sliderSpeedSorting = document.getElementsByClassName("sliderSpeedSorting")[0]
var buttonBinarySearch = document.getElementsByClassName("buttonBinarySearch")[0]
var buttonDeleteDuplicate = document.getElementsByClassName("buttonDeleteDuplicates")[0]
var numberForBinarySearch = document.getElementsByClassName("numberForBinarySearch")[0]
var sliderMaxNumberIndicator = document.getElementsByClassName("sliderMaxNumberIndicator")[0]
var sliderCountNumberIndicator = document.getElementsByClassName("sliderCountNumberIndicator")[0]
var sliderSpeedSortingIndicator = document.getElementsByClassName("sliderSpeedSortingIndicator")[0]

let array // The main array to be used in sorting
var speedOfSorting = 10 // a variable with which you can adjust the speed of the sorting animation
var arrayIsSorted = false // a flag that remembers whether the array is sorted or not
var duplicatesIsDeleted = false // a flag that remembers whether duplicates have already been removed from the array
var suffixs = ["", "k", "M", "G", "T", "P", "E"]; // suffixes that are used to shorten large numbers


// Fcuntion for generate random number
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
        element.style.height = parseInt(element.style.height) + (height - parseInt(element.style.height)) / 100 * 50 + "%"
        setTimeout(grow, 35, element, height);
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
        // assign the block identifier the same as the order of the number in the array, 
        // so that I can then use this identifier when moving blocks
        numberDiv = document.createElement("div")
        numberDiv.style.height = 0
        numberDiv.id = i
        numberDiv.className = "number"
        numberDiv.style.order = i
        boxOfNumber.appendChild(numberDiv);

        // a hint that will pop up when you hover over the block
        numberDivToolTip = document.createElement("span")
        numberDivToolTip.textContent = array[i]
        numberDivToolTip.className = "tooltiptext"
        numberDiv.appendChild(numberDivToolTip);

        // calling a recursive function with settimeout to create a block growth animation
        // array[i] / max Element * 100 is a formula for calculating the percentage ratio of the block height to the total space in height
        setTimeout(grow, 50, numberDiv, array[i] / maxElement * 100);
    }
}

async function resideElementsById(firstElement, secondElement) {
    // using the order property, we will change the order of the number blocks
    let tempOrder = firstElement.style.order
    firstElement.style.order = secondElement.style.order
    secondElement.style.order = tempOrder

    // you also need to change the ids of the blocks, because the numbers have also changed their ids
    let tempId = firstElement.id
    firstElement.id = secondElement.id
    secondElement.id = tempId
}

// function that colors elements in a given interval
async function paintElementsRangeById(start, end, color) {
    for (let i = start; i < end; i++) {
        document.getElementById(i).style.backgroundColor = color
        await delay(speedOfSorting)
    }
}

// function that sets the status of activity or inactivity for all buttons
async function setStatusButtonsSlides(status) {
    sliderMaxNumber.disabled = status
    buttonStartSort.disabled = status
    sliderCountNumber.disabled = status
    sliderSpeedSorting.disabled = status
    buttonBinarySearch.disabled = status
}

// function that removes duplicates from an array (and also removes duplicate blocks)
async function deleteDuplicates(array) {
    if (!duplicatesIsDeleted) {
        duplicatesIsDeleted = true
        let numbersCount = {}
        let duplicateElement
        let uniqueList = []
        for (let i = 0; i < array.length; i++) {
            if (numbersCount[array[i]] === undefined) {
                numbersCount[array[i]] = 1
                uniqueList.push(array[i])
            }
            else {
                duplicateElement = document.getElementById(i)
                duplicateElement.style.backgroundColor = "red"
                await delay(speedOfSorting)
                duplicateElement.remove()
            }
        }
        let i = 0
        Array.from(numbers).forEach(element => {
            element.id = i
            element.style.order = i
            i++
        });
        for (let i = 0; i < uniqueList.length; i++) {
            numbers[i].firstChild.textContent = uniqueList[i]
            numbers[i].style.height = uniqueList[i] / parseInt(sliderMaxNumber.value) * 100 + "%"
        }
        boxOfNumber.style.justifyContent = "center"
        return uniqueList
    }
    else return array
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
    array = new Array(sliderCountNumber.value)
    duplicatesIsDeleted = false
    arrayIsSorted = false
    fillArrayAndCreateBlock(array, sliderCountNumber.value, sliderMaxNumber.value)
}
sliderCountNumber.oninput = function () {
    sliderCountNumberIndicator.innerHTML = "Count of number: " + this.value
    array = new Array(sliderCountNumber.value)
    duplicatesIsDeleted = false
    arrayIsSorted = false
    fillArrayAndCreateBlock(array, sliderCountNumber.value, sliderMaxNumber.value)
}
buttonStartSort.addEventListener("click", async function () {
    if (!arrayIsSorted) {
        arrayIsSorted = true
        setStatusButtonsSlides(true)
        switch (sortAlgorithm.value) {
            case ("quickSort"):
                await quickSort(array, 0, array.length - 1)
                break
            case ("insertionSort"):
                await insertionSort(array)
                break
            case ("countingSort"):
                array = await countingSort(array, parseInt(sliderMaxNumber.value))
                break
        }
        setStatusButtonsSlides(false)
    }
})

buttonBinarySearch.addEventListener("click", async function () {
    setStatusButtonsSlides(true)
    await binarySearch(array, parseInt(numberForBinarySearch.value))
    setStatusButtonsSlides(false)
})

buttonDeleteDuplicate.addEventListener("click", async function () {
    array = Array.from(await deleteDuplicates(array))
    sliderCountNumberIndicator.innerHTML = "Count of number: " + array.length
    sliderCountNumber.value = array.length
})

sliderSpeedSorting.oninput = function () {
    sliderSpeedSortingIndicator.innerHTML = "Speed of sorting: " + this.value
    speedOfSorting = this.value
}

document.addEventListener("DOMContentLoaded", function () {
    array = new Array(sliderCountNumber.value)
    fillArrayAndCreateBlock(array, sliderCountNumber.value, sliderMaxNumber.value)
    numberForBinarySearch.value = array[getRandomInt(array.length - 1)]
});