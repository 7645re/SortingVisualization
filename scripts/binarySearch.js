async function binarySearch(sortedArray, key){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        await paintElementsRangeById(start, end+1, "red")
        await delay(speedOfSorting)
        await paintElementsRangeById(start, end+1, "rgb(72, 191, 132)")
        if (sortedArray[middle] === key) {
            // found the key
            await paintElementsRangeById(middle, middle+1, "red")
            return middle;
        } else if (sortedArray[middle] < key) {
            // continue searching to the right
            start = middle + 1;
        } else {
            // search searching to the left
            end = middle - 1;
        }
    }
	// key wasn't found
    return -1;
}