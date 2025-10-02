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

//-------------------------------------Day 1 End---------------------------------------

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

//-------------------------------------Day 2 End---------------------------------------
// 3. firstMissingPositive_sort
// Simple: slower due to sort
function firstMissingPositive_sort1(nums) {
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

// Simple: extra space allowed
function firstMissingPositive_set2(nums) {
  const s = new Set();
  for (const v of nums) if (v > 0) s.add(v);
 console.log(s)
  let x = 1;
  while (true) {
    if (!s.has(x)) return x;
    x++;
  }
}


function firstMissingPositive_set3(arr){
  // remove deblicate and 
  arr = [...new Set(arr)];
  console.log(1, arr)
  // remove negative and zero value
 arr = arr.filter(v => v > 0);
  console.log(2, arr)
 // sort
 arr = arr.sort((a,b) => a-b);
  console.log(3, arr)

  // check for positvie
  let need = 1;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if(need === element) need++;
    else return need;
  }

  return need;
}


function firstMissingPositive_set4(arr){
  // check for positvie
  let need = {};
  for (let index = 0; index < arr.length; index++) {
    need[arr[index]] = 1
  }

  for (let index = 1; index < arr.length; index++) {
    if(!need[index]) return index;
  }

  return arr.length+1;
}

console.log(firstMissingPositive_set4([3,3,1,2,3, 4, -1, 12]));
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