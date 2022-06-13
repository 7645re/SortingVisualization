async function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];

                let firstElement = document.getElementById(j+1)
                let secondElement = document.getElementById(j)
            
                firstElement.style.backgroundColor = "red"
                secondElement.style.backgroundColor = "red"
                await resideElementsById(firstElement, secondElement)
                await delay(speedOfSorting)
                firstElement.style.backgroundColor = "rgb(72, 191, 132)"
                secondElement.style.backgroundColor = "rgb(72, 191, 132)"


                j--;
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}