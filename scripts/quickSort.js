
async function swap(array, leftIndex, rightIndex) {
    let temp = array[leftIndex]
    array[leftIndex] = array[rightIndex]
    array[rightIndex] = temp

    paintElementById(leftIndex, colorNumbersSelect)
    paintElementById(rightIndex, colorNumbersSelect)
    await resideElementsById(leftIndex, rightIndex)
    await playSound(frequency * leftIndex)
    await delay(speedOfSorting)
    paintElementById(leftIndex, colorNumbersDefault)
    paintElementById(rightIndex, colorNumbersDefault)
}

async function partition(array, left, right) {
    // We take the middle element as the pivot of the array in the interval (left, right)
    let pivot = array[Math.floor((left + right) / 2)]
    let i = left
    let j = right
    while (i <= j) {
        while (array[i] < pivot) i++
        while (array[j] > pivot) j--
        if (i <= j) {
            await swap(array, i, j)
            i++
            j--
        }
    }
    return i
}

async function quickSort(array, left, right) {
    let pivot // index of pivot element
    pivot = await partition(array, left, right);
    if (left < pivot - 1) {
        await quickSort(array, left, pivot - 1);
    }
    if (pivot < right) { 
        await quickSort(array, pivot, right);
    }
}