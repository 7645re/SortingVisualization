// function that colors elements in a given interval
async function paintElementsRangeById(start, end, color) {
    for (let i = start; i < end; i++) {
        await paintElementById(i, color)
        await delay(speedOfSorting)
    }
}

async function paintElementById(id, color) {
    document.getElementById(id).style.backgroundColor = color
}

async function finalizeElementsPaint(color) {
    for (let i = 0; i < numbers.length; i++) {
        paintElementById(i, color)
        await delay(speedOfSorting/2)
    }
    for (let i = 0; i < numbers.length; i++) {
        paintElementById(i, colorNumbersDefault)
        await delay(speedOfSorting/2)
    }
}
