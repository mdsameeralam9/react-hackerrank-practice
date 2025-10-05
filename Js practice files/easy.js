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
console.log(countResponseTimeRegressions([100, 200, 150, 300]));

//-------------------------------------Day 1 End---------------------------------------

// 2. isAlphabeticPalindrome
function isAlphabeticPalindrome(code) {
  // Write your code here
  code = code.toLowerCase();
  let filterStr = "";
  for (const char of code) {
    if (char >= "a" && char <= "z") {
      filterStr += char;
    }
  }

  return filterStr === filterStr.split("").reverse().join("");
}
console.log(isAlphabeticPalindrome("A1b2B!a"));

//-------------------------------------Day 2 End---------------------------------------
// 3. firstMissingPositive_sort
// Simple: slower due to sort
function firstMissingPositive_sort1(nums) {
  nums.sort((a, b) => a - b); // [-1, 1, 3, 4]
  console.log(nums);
  let need = 1;
  for (const v of nums) {
    if (v < need) continue; // It skips the current loop
    if (v === need) need++; // second loop => 1+1 = 2
    else if (v > need) return need; // third loop => 2
  }
  return need;
}

// Simple: extra space allowed
function firstMissingPositive_set2(nums) {
  const s = new Set();
  for (const v of nums) if (v > 0) s.add(v);
  console.log(s);
  let x = 1;
  while (true) {
    if (!s.has(x)) return x;
    x++;
  }
}

function firstMissingPositive_set3(arr) {
  // remove deblicate and
  arr = [...new Set(arr)];
  console.log(1, arr);
  // remove negative and zero value
  arr = arr.filter((v) => v > 0);
  console.log(2, arr);
  // sort
  arr = arr.sort((a, b) => a - b);
  console.log(3, arr);

  // check for positvie
  let need = 1;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (need === element) need++;
    else return need;
  }

  return need;
}

function firstMissingPositive_set4(arr) {
  // check for positvie
  let need = {};
  for (let index = 0; index < arr.length; index++) {
    need[arr[index]] = 1;
  }

  for (let index = 1; index < arr.length; index++) {
    if (!need[index]) return index;
  }

  return arr.length + 1;
}

console.log(firstMissingPositive_set4([3, 3, 1, 2, 3, 4, -1, 12]));
//-------------------------------------Day 3 End---------------------------------------

// 4. isNonTrivialRotation
// rotate each char from 0 index to last of String and compare from each rotation from second strin
// ie both are same at any point then return true or false
function isNonTrivialRotation1(s, t) {
  return s.length === t.length && (s + s).includes(t);
}

function isNonTrivialRotation2(s, t) {
  if (s.length !== t.length) return false;
  const n = s.length;
  for (let k = 0; k < n; k++) {
    const rot = s.slice(k) + s.slice(0, k);
    if (rot === t) return true;
  }
  return false;
}

function isNonIdenticalRotation3(s1, s2) {
  if (s1.length !== s2.length) return 0;
  if (s1 === s2) return 0;
  const doubled = s1 + s1;
  return doubled.includes(s2) ? 1 : 0;
}
// console.log(1, isNonIdenticalRotation3("abcd", "cdab")); // true
// console.log(2, isNonIdenticalRotation3("abcde", "cdeab")); // true
// console.log(3, isNonIdenticalRotation3("e", "r")); // false
// console.log(4, isNonIdenticalRotation3("ab", "ac")); // false
//console.log(5, isNonIdenticalRotation3("geeks for geeks", "for geeks geeks")); //false

//-------------------------------------Day 4 End---------------------------------------

// 5. Lookup with Binary Search
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
const nums = [2, 4, 6, 8, 10, 12, 14, 16]; //[1, 2, 3, 4, 5]
const target = 16; //3 => 2
console.log(binarySearch(nums, target));

// findFirstOccurrence of target, array can have repeated element
// so if found in mid the move right to left to get the first index or previous index of mid
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

//-------------------------------------Day 5 End---------------------------------------
// maximizeNonOverlappingMeetings 
// soltion for sort the sub arr from from endTime or second Value
// declare var for count and endTime initial with -value
// now use loop and get current value- get start and endTime
// compare start >= end => count++=> 1st count count++ after that make end to endTime Variable to
// comapre with next start time
function maximizeNonOverlappingMeetings(meetings) {
  if (!Array.isArray(meetings) || meetings.length === 0) return 0;
  // need sorting so we can come to know which meeting ends first 
  // so we count the meet without overlappings
  meetings.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = -Infinity; // for keep track for end time

  for (let i = 0; i < meetings.length; i++) {
    const [start, end] = meetings[i];
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }

  return count;
}

console.log(maximizeNonOverlappingMeetings([[1, 3], [2, 4], [5, 7], [6, 8]])); // 2

// solution: areBracketsProperlyMatched
// 1. define "bracketsObj" so can hold opening value and key and end value
// 2. stack to hold openeing value and clear this at when we found end value
// 3. loop to iterate each word and check if closing bracket so can remove elem from stack and match the end, if not then return
// 4. push in stack for each opening value only and while compare get last value so compare and pop arr 
function areBracketsProperlyMatched(code_snippet) {
  // Write your code here
  //  //Space complexity: O(1) for look-up
  let bracketsObj = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  let stack = []; //Space complexity: O(n)

  // Time complexity: O(n)
  for (const char of code_snippet) {
    if ([")", "(", "{", "}", "[", "]"].includes(char)) {
      if (bracketsObj[char]) {
        if (bracketsObj[char] !== stack.pop()) {
          return false;
        }
      } else {
        stack.push(char);
      }
    }
  }

  // return stack.length === 0 ? 1 : 0; 
  return stack.length === 0;
}
console.log(areBracketsProperlyMatched("if (a[0] > b[1]) { doSomething(); }")); // 1
console.log(areBracketsProperlyMatched("int x = 42; // no brackets here"));     // 1
console.log(areBracketsProperlyMatched("() {} []"));                            // 1
console.log(areBracketsProperlyMatched("([)]"));                                 // 0
console.log(areBracketsProperlyMatched("(]"));                                   // 0
// Time complexity: O(n) and Space complexity: O(n)
//-------------------------------------Day 6 End---------------------------------------