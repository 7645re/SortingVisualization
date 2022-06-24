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

        await chart.paintBarRange(start, end+1, chart.colorBarSelect)
        playSound(frequency)
        await delay(chart.iterationDelay)
        await chart.paintBarRange(start, end+1, chart.colorBarDefault)

        if (sortedArray[middle] === key) {
            let duplicatesIndexs = await nearDuplicatesSearch(sortedArray, middle)
            // the array with indexes needs to be sorted because there may be a problem with the type [60, 59, 62]
            // and we will have elements with indexes 60, 61, 62 filled in and the index 59 will be skipped
            duplicatesIndexs.sort()
            if (duplicatesIndexs.length > 1) await chart.paintBarRange(duplicatesIndexs[0], duplicatesIndexs.at(-1)+1, chart.colorBarSelect)
            chart.paintBarRange(middle, middle+1, chart.colorBarSelect)
            return middle;
        } else if (sortedArray[middle] < key) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return -1;
}