async function merge(arr, start, mid, end)
{
    let start2 = mid + 1;
 
    // If the direct merge is already sorted
    if (arr[mid] <= arr[start2])
    {
        return;
    }
 
    // Two pointers to maintain start
    // of both arrays to merge
    while (start <= mid && start2 <= end)
    {
         
        // If element 1 is in right place
        if (arr[start] <= arr[start2])
        {
            start++;
        }
        else
        {
            let value = arr[start2];
            let index = start2;
 
            // Shift all the elements between element 1
            // element 2, right by 1.
            while (index != start)
            {
                await chart.paintBar(index, chart.colorBarSelect)
                await chart.changeBarHeight(index, 
                    chart.coverageInterval ? arr[index - 1] / chart.array.length * 100 : arr[index - 1] / chart.maxValue * 100)
                arr[index] = arr[index - 1];
                // playSound(frequency*index)
                await chart.paintBar(index, chart.colorBarDefault)
                index--;
            }
            arr[start] = value;
            await chart.paintBar(start, chart.colorBarSelect)
            await chart.changeBarHeight(index, 
                chart.coverageInterval ? value / chart.array.length * 100 : value / chart.maxValue * 100)
            // playSound(frequency*start)
            await delay(chart.iterationDelay)
            await chart.paintBar(start, chart.colorBarDefault)
            // Update all the pointers
            start++;
            mid++;
            start2++;
        }
    }
}
 
/* l is for left index and r is right index
of the sub-array of arr to be sorted */
async function mergeSort(arr, l, r)
{
    if (l < r)
    {
         
        // Same as (l + r) / 2, but avoids overflow
        // for large l and r
        let m = l + Math.floor((r - l) / 2);
 
        // Sort first and second halves
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
 
        await merge(arr, l, m, r);
    }
}