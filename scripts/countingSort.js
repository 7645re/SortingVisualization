async function countingSort(arr, maxNum){
   let counts = new Array(maxNum + 1);
   counts.fill(0)
   for (let i = 0; i < arr.length; i++) {
      paintElementById(i, "red")
      await playSound(frequency*i)
      await delay(speedOfSorting)
      paintElementById(i, "rgb(72, 191, 132)")
      counts[arr[i]]++
   }
   let sortedArrayIndex = 0;
   for (let i = 0; i < counts.length; i++) {
      for (let j = 0; j < counts[i]; j++) {
         arr[sortedArrayIndex] = i;
         paintElementById(sortedArrayIndex, "red")
         numbers[sortedArrayIndex].firstChild.textContent = i
         numbers[sortedArrayIndex].style.height = i / maxNum * 100 + "%"
         await playSound(frequency*sortedArrayIndex)
         await delay(speedOfSorting)
         paintElementById(sortedArrayIndex, "rgb(72, 191, 132)")
         sortedArrayIndex++
      }
   }
   return arr;
};