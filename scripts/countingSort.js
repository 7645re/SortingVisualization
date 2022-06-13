const findMaximum = arr => arr.reduce((acc, val) => val > acc ? val: acc, Number.MIN_VALUE)
const countingSort = (arr = []) => {
   const max = findMaximum(arr);
   const counts = new Array(max + 1);
   counts.fill(0);
   arr.forEach(value => counts[value]++);
   const res = [];
   let resultIndex = 0;
   counts.forEach((count, index) => {
      for (let i = 0; i < count; i++) {
         res[resultIndex] = index;
         resultIndex++;
      };
   });
   return res;
};