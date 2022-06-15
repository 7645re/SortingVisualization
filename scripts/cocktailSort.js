async function cocktailSort(arr) {
	let start = 0, end = arr.length, swapped = true;

	while (swapped) {
		swapped = false;
		for (let i = start; i < end - 1; i++) {
			if (arr[i] > arr[i+1]) {
				let temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
				swapped = true;
                paintElementById(i, colorNumbersSelect)
                paintElementById(i+1, colorNumbersSelect)
                await resideElementsById(i, i+1)
                await playSound(frequency)
                await delay(speedOfSorting)
                paintElementById(i, colorNumbersDefault)
                paintElementById(i+1, colorNumbersDefault)
			}
		}

		end--;
		if (!swapped)
			break;
    
		swapped = false;
		for (let i = end - 1; i > start; i--) {
			if (arr[i - 1] > arr[i]) {
				let temp = arr[i];
				arr[i] = arr[i - 1];
				arr[i - 1] = temp;
				swapped = true;
                paintElementById(i, colorNumbersSelect)
                paintElementById(i-1, colorNumbersSelect)
                await resideElementsById(i, i-1)
                await playSound(frequency * i)
                await delay(speedOfSorting)
                paintElementById(i, colorNumbersDefault)
                paintElementById(i-1, colorNumbersDefault)
			}
		}

		start++;
	}

	return arr;
}