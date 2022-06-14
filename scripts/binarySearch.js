async function nearDuplicatesSearch(sortedArray, index) {
    let i = 1
    let indexs = [index]
    while (true) {
        if (index-i >= 0 && sortedArray[index-i] == sortedArray[index]) {
            indexs.push(index-i)
            i++
        }
        else break
    }
    i = 1
    while (true) {
        if (index+i <= sortedArray.length && sortedArray[index+i] == sortedArray[index]) {
            indexs.push(index+i)
            i++
        }
        else break
    }
    return indexs
}


async function binarySearch(sortedArray, key){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);
        await paintElementsRangeById(start, end+1, "red")
        await delay(speedOfSorting)
        await paintElementsRangeById(start, end+1, "rgb(72, 191, 132)")
        if (sortedArray[middle] === key) {
            let duplicatesIndexs = await nearDuplicatesSearch(sortedArray, middle)
            if (duplicatesIndexs.length > 1) await paintElementsRangeById(duplicatesIndexs[0], duplicatesIndexs.at(-1)+1, "red")
            paintElementsRangeById(middle, middle+1, "red")
            return middle;
        } else if (sortedArray[middle] < key) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return -1;
}