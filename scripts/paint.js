// function that colors elements in a given interval
async function paintElementsRangeById(start, end, color) {
    for (let i = start; i < end; i++) {
        await paintElementById(i, color)
        await delay(speedOfSorting)
    }
}

async function paintElementById(id, color) {
    document.getElementById(id).style.backgroundColor = color
    // playSound(500)
}