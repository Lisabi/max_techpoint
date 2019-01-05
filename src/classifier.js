/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

let output = {
  noOfGroups: 0
};
let members = [];
let counter = 1;

function classifier(input) {
  let now = new Date();
  let inputSort = input.sort(function(a, b) {
    return new Date(b.dob) - new Date(a.dob);
  });

  //Build a new array with the computed age property
  let inputMap = inputSort.map(function(input) {
    return {
      ...input,
      age: now.getFullYear() - new Date(input.dob).getFullYear()
    };
  });

  inputMap.forEach(function(content) {
    if (check(members, content) && members.length < 3) {
      members.push(content);
    } else {
      buildOutput(members, counter);

      members = [];
      members.push(content);
      counter++;
    }

    //Fall back for last remaining element
    buildOutput(members, counter);
  });

  output["noOfGroups"] = counter;
  return output;
}

function buildOutput(members, counter) {
  output["group" + counter] = {};
  output["group" + counter]["members"] = members;
  output["group" + counter]["oldest"] = getMaxAge(members);
  output["group" + counter]["sum"] = getSumAge(members);
  output["group" + counter]["regNos"] = getRegNos(members);
}

function getMaxAge(members) {
  //sort the array in descending order, and pick the first element's age
  let sortArray = members.sort(function(a, b) {
    return b.age - a.age;
  });

  return sortArray[0].age;
}

function getSumAge(members) {
  let sum = 0;
  members.forEach(function(member) {
    sum += parseInt(member.age);
  });

  return sum;
}

function getRegNos(members) {
  let regNos = [];
  members
    .sort(function(a, b) {
      return a.regNo - b.regNo;
    })
    .forEach(function(memeber) {
      regNos.push(parseInt(memeber.regNo));
    });

  return regNos;
}

/*
 * Check  all the elements in the members array and make sure
 * none of the element's age difference is more than 5
 */

function check(members, currentArray) {
  let differenceBound = 5;
  return members.every(function(array) {
    let calc = Math.abs(array.age - currentArray.age);
    if (calc < differenceBound) {
      return true;
    }
    return false;
  });
}

module.exports = classifier;
