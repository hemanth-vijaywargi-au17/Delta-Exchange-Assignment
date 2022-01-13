function sortByStatus(status, array) {
  let arr = [...array];
  let x = status;
  let y = x === "active" ? "closed" : "active";
  function compare(a, b) {
    a = a.status.toLowerCase();
    b = b.status.toLowerCase();
    if (a === x && b === y) {
      return -1;
    } else if (a === x && b === y) {
      return 0;
    } else if (a === y && b === x) {
      return 1;
    }
  }
  return arr.sort(compare);
}

export default sortByStatus;
