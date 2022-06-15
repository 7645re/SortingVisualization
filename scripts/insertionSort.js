async function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];

                paintElementById(j+1, colorNumbersSelect)
                paintElementById(j, colorNumbersSelect)
                await resideElementsById(j+1, j)
                await playSound(frequency * j)
                await delay(speedOfSorting)
                paintElementById(j+1, colorNumbersDefault)
                paintElementById(j, colorNumbersDefault)
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}