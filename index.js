// Simple: slower due to sort
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