async function countingSort(arr, maxNum){
   maxNum = parseInt(maxNum)
   let counts = new Array(maxNum + 1);
   counts.fill(0)
   for (let i = 0; i < arr.length; i++) {
      chart.paintBar(i, chart.colorBarSelect)
      playSound(frequency*i)
      await delay(IterationDelay)
      chart.paintBar(i, chart.colorBarDefault)
      counts[arr[i]]++
   }
   let sortedArrayIndex = 0;
   for (let i = 0; i < counts.length; i++) {
      for (let j = 0; j < counts[i]; j++) {
         arr[sortedArrayIndex] = i;
         chart.paintBar(sortedArrayIndex, chart.colorBarSelect)
         chart.changeBarHeight(sortedArrayIndex, i / maxNum * 100)
         playSound(frequency*i)
         await delay(chart.iterationDelay)
         chart.paintBar(sortedArrayIndex, chart.colorBarDefault)
         sortedArrayIndex++
      }
   }
   return arr;
};