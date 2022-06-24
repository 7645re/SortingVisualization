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

				chart.paintBar(i, chart.colorBarSelect)
				chart.paintBar(i+1, chart.colorBarSelect)
				await chart.swap(i, i+1)
				playSound(frequency * i)
                await delay(chart.iterationDelay)
				chart.paintBar(i, chart.colorBarDefault)
				chart.paintBar(i+1, chart.colorBarDefault)
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

				chart.paintBar(i, chart.colorBarSelect)
				chart.paintBar(i-1, chart.colorBarSelect)
				await chart.swap(i, i-1)
				playSound(frequency * i)
                await delay(chart.iterationDelay)
				chart.paintBar(i, chart.colorBarDefault)
				chart.paintBar(i-1, chart.colorBarDefault)
			}
		}

		start++;
	}

	return arr;
}