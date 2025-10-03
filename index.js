function binarySearch(nums, target) {
  // Write your code here
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}
const nums = [2, 4, 6, 8, 10, 12, 14, 16] //[1, 2, 3, 4, 5]
const target = 16 //3 => 2
console.log(binarySearch(nums, target))