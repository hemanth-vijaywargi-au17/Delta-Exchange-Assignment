function filterByCompany(arrayOfSelections, membersArray) {
  return membersArray.filter((obj) =>
    arrayOfSelections.includes(obj.company.toLowerCase())
  );
}

export default filterByCompany;
