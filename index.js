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


