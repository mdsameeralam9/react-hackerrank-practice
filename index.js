function maximizeNonOverlappingMeetings(meetings) {
  // need sorting so we can come to know which meeting ends first 
  // so we count the meet without overlappings
 meetings = meetings.sort((a,b) => a[1]-b[1]);
  let count = 0;
  let lastEnd = -1;

  for(const meet of meetings){
    const [start,end] = meet;
    if(start >=lastEnd) {
      count++;
      lastEnd = end;
    }
  }

  return count
}

console.log(maximizeNonOverlappingMeetings([[1, 3], [2, 4], [5, 7], [6, 8]])); // 2
