function areBracketsProperlyMatched(code_snippet) {
  // Write your code here
  let bracketsObj = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  let stack = [];

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

  return stack.length === 0;
}
code_snippet = "if (a[0] > b[1]) { doSomething(); }";
console.log(areBracketsProperlyMatched("()"));
console.log(areBracketsProperlyMatched("("));
console.log(areBracketsProperlyMatched("() {} []"));
console.log(areBracketsProperlyMatched(code_snippet));
