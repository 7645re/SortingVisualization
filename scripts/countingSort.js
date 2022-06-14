async function countingSort(arr, maxNum){
   let counts = new Array(maxNum + 1);
   counts.fill(0)
   for (let i = 0; i < arr.length; i++) {
      numbers[i].style.backgroundColor = "red"
      await delay(speedOfSorting)
      numbers[i].style.backgroundColor = "rgb(72, 191, 132)"
      counts[arr[i]]++
   }
   let sortedArrayIndex = 0;
   for (let i = 0; i < counts.length; i++) {
      for (let j = 0; j < counts[i]; j++) {
         arr[sortedArrayIndex] = i;
         numbers[sortedArrayIndex].style.backgroundColor = "red"
         numbers[sortedArrayIndex].style.height = i / maxNum * 100 + "%"
         await delay(speedOfSorting)
         numbers[sortedArrayIndex].style.backgroundColor = "rgb(72, 191, 132)"
         sortedArrayIndex++
      }
   }
   return arr;
};