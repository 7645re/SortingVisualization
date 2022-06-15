// the problem of indexing elements that are swapped for animation
// possible solution methods:
// non-recursive sorting
// creating a structure object with a stored index
// to recreate elements in the range each time
function mergeSort(array) {
    const half = array.length / 2
    // Base case or terminating case
    if(array.length < 2){
        return array 
    }
    
    const left = array.splice(0, half)
    return merge(mergeSort(left),mergeSort(array))
  }
function merge(left, right) {
    let arr = []
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {
            arr.push(left.shift())  
        } else {
            arr.push(right.shift()) 
        }
    }
    
    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [ ...arr, ...left, ...right ]
}