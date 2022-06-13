
async function swap(array, leftIndex, rightIndex) {
    let temp = array[leftIndex]
    array[leftIndex] = array[rightIndex]
    array[rightIndex] = temp

    let firstElement = document.getElementById(leftIndex)
    let secondElement = document.getElementById(rightIndex)

    firstElement.style.backgroundColor = "red"
    secondElement.style.backgroundColor = "red"
    await resideElementsById(firstElement, secondElement)
    await delay(speedOfSorting)
    firstElement.style.backgroundColor = "rgb(72, 191, 132)"
    secondElement.style.backgroundColor = "rgb(72, 191, 132)"
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
