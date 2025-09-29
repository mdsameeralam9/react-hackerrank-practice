// 1. countResponseTimeRegressions
function countResponseTimeRegressions(responseTimes) {
    // Write your code here
   const n = responseTimes.length;
  if (n <= 1) return 0;

  let count = 0;
  let sumPrev = responseTimes[0]; // sum of elements before index 1

  for (let i = 1; i < n; i++) {
    const avgPrev = sumPrev / i;
    if (responseTimes[i] > avgPrev) count++;
    sumPrev += responseTimes[i];
  }
  return count;

}
console.log(countResponseTimeRegressions([100, 200, 150,300]));

// 2. isAlphabeticPalindrome
function isAlphabeticPalindrome(code) {
    // Write your code here
    code = code.toLowerCase();
    let filterStr = "";
    for(const char of code){
        if(char >= "a" && char <= "z"){
            filterStr += char
        }
    }
    
    return filterStr === filterStr.split("").reverse().join("")
}
console.log(isAlphabeticPalindrome("A1b2B!a"));

// 3. firstMissingPositive_sort
function firstMissingPositive_sort(nums) {
  nums.sort((a, b) => a - b); // [-1, 1, 3, 4]
  console.log(nums)
  let need = 1;
  for (const v of nums) {
    if (v < need) continue; // It skips the current loop
    if (v === need) need++; // second loop => 1+1 = 2
    else if (v > need) return need; // third loop => 2
  }
  return need;
}


console.log(firstMissingPositive_sort([3, 4, -1, 1]));

