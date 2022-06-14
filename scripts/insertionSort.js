async function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];

                paintElementById(j+1, "red")
                paintElementById(j, "red")
                await resideElementsById(j+1, j)
                await playSound(frequency * j)
                await delay(speedOfSorting)
                paintElementById(j+1, "rgb(72, 191, 132)")
                paintElementById(j, "rgb(72, 191, 132)")
                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}