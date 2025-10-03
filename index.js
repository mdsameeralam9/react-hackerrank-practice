function findFirstOccurrence(nums, target) {
  // Write your code here

  let left = 0,
    right = nums.length - 1,
    ans = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      ans = mid;
      right = mid - 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}
