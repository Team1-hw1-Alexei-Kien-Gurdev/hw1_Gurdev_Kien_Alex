const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
//first button(hamilton ALgo):
let btn1 = document.getElementById("Hamilton algorithim");
//Second butto (Huntington-Hill)
let btn2 = document.getElementById("Huntington-Hill Algorthim");
btn1.addEventListener("click", function (e) 
{

  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;
    var givenRepresentative = +document.getElementById("represtNo").value;
    //Need two arrays:

    const arrOfNumbers = [];//(Array will holds population)
    const arrOfStates = [];//(array will holds names of states)
    const MinimumRep = [];//(Arrays holds the minimum number of reprsetative per state)
    
    let error=
    {
       lineNoError:" ",
       lines:0
    }
   
    csvToArray(text, arrOfNumbers, arrOfStates,error);
    if (givenRepresentative < arrOfStates.length) {
      document.getElementById("error").innerHTML = "The number of entered resprestative are less than number of states.Please re-Enter number of representative";
    }
    else 
    {
     
      Hamilton_Algorithm(arrOfNumbers, MinimumRep);
      //Print
      printOutput(arrOfNumbers, arrOfStates, MinimumRep);
      if(error.lineNoError>1)
      {
        document.getElementById("error").innerHTML="There is an error in file at line"+error.lineNoError;
      }
    }

  };
  reader.readAsText(input);
});
//Second algo:
btn2.addEventListener("click", function (e) {

  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
  let givenRepresentative = +document.getElementById("represtNo").value;
  reader.onload = function (e) {
    const text = e.target.result;

    //Need two arrays:
    const arrOfNumbers = [];//(Array will holds population)
    const arrOfStates = [];//(array will holds names of states)
    const MinimumRep = [];//(Arrays holds the minimum number of reprsetative per state)
    let error=
    {
       lineNoError:" ",
       lines:0
    }
    csvToArray(text, arrOfNumbers, arrOfStates,error);
    if (givenRepresentative < arrOfStates.length) {
      document.getElementById("error").innerHTML = "The number of entered resprestative are less than number of states.Please re-Enter number of representative";
    }
    else {
      Huntington_Hill_Algo(arrOfNumbers, arrOfStates, MinimumRep);
      //Print
      printOutput(arrOfNumbers, arrOfStates, MinimumRep);
      if(error.lineNoError>1)
      {
        document.getElementById("error").innerHTML="There is an error in file at line"+error.lineNoError;
      }
    };
  }
  reader.readAsText(input);
});
//This function :
// iterate through all the file and make arrays of different  names and numbers
function csvToArray(str, arrOfNumbers, arrOfStates, error, delimiter = ",") {

  let j = 0, //to iterate arr of Numbers
    k = 0;    //to iterate arr of states
  //skip the heading 
  let skip = 0;
  while (str[skip] != "\n") //skip  first line of which is heading in a file
  {
    skip++;
  }
  
  for (let i = skip; i < str.length; i++)
  {
    if(str[i]=='\n'){
      error.lines++;
    }
    if (i < str.length - 1 && str[i] == delimiter && str[i + 1] != ' ' && str[i + 1] != NaN) {
      //Until we get a number add that
      i++;
      let str2 = "";
      while (str[i] >= '0' && str[i] <= '9') {

        str2 += str[i];
        i++;
      }
      arrOfNumbers.push(str2);
      j++;
      if (str[i] == delimiter) {
        while (str[i] != "\n") //skip rest of the columns
        {
          i++;
        }
      }
    }
    else {
      if (str[i] == '\r'||str[i] == '\n') {
         error.lines++;
        continue;
      }
      let stateString = "";
      while (i < str.length && str[i] != delimiter && str[i]!='\n') {
        if (str[i] != "\n") {
          stateString += str[i];
        }
        i++;
      }
      if(i<str.length-1 && str[i]!='\n' && str[i]==delimiter && (str[i+1]>='0'&& str[i+1]<='9'))
      {
        error.lines++;
        arrOfStates.push(stateString);
      }
      else{
        //if the line is not pushed there is an error
        error.lineNoError+=error.lines+" ";
        
        while(str[i]!='\n'){
          i++;
        }
      }
      k++;
      i--;
    }
  }
}
function Hamilton_Algorithm(arrOfNumbers, MinimumRep) {
  var representative = +document.getElementById("represtNo").value;

  //First step: Calculate Total population:
  let totalPop = 0;
  for (let i = 0; i < arrOfNumbers.length; i++) {
    totalPop = Number(arrOfNumbers[i]) + totalPop;
  }
  //Second Step: calculate the average population per representative
  let avgPop = (totalPop / representative);

  //Third step:
  //This array holds the minimum respresentative
  const divide = [];
  const remain = [];
  const copyRemain = [];
  const floor = [];
  let countRep = 0;
  let leftRep = 0;
  for (let i = 0; i < arrOfNumbers.length; i++) {
    divide[i] = ((+arrOfNumbers[i]) / avgPop).toFixed(2);//This array stores values after dividing upto two decimal
    floor[i] = (Math.floor((+arrOfNumbers[i]) / avgPop));//This array stores floor values;
    remain[i] = (divide[i] - floor[i]).toFixed(2);
    copyRemain[i] = (divide[i] - floor[i]).toFixed(2);
    //count total representative
    countRep = countRep + floor[i];
    MinimumRep[i] = Math.floor((+arrOfNumbers[i]) / avgPop);
  }
  leftRep = representative - countRep;
  //Sort copyRemain and reverse(to get higest element at 0 index):
  copyRemain.sort();
  copyRemain.reverse();
  for (let i = 0; i < leftRep; i++) {
    let value = copyRemain[i];//largest value;
    let index = remain.indexOf(value);
    MinimumRep[index] += 1;
  }
}
//Second algo:
function Huntington_Hill_Algo(arrOfNumbers, arrOfStates, MinimumRep) {
  //We added 1 for each states
  for (let i = 0; i < arrOfStates.length; i++) {
    MinimumRep[i] = Number(1);
  }
  let givenRepresentative = +document.getElementById("represtNo").value;
  let leftRep = givenRepresentative - arrOfStates.length;
  var priority = [];
  //fill priority array:
  while (leftRep < givenRepresentative && leftRep > 0) {
    for (let i = 0; i < arrOfStates.length; i++) {
      let n = MinimumRep[i];
      let value = arrOfNumbers[i] / Math.sqrt(n * (n + 1));
      priority[i] = value;
    }
    //find the largest priority in array:
    let largestPriority = priority[0];
    let priorityIndex = 0;
    for (let i = 0; i < priority.length; i++) {
      if (largestPriority < priority[i]) {
        largestPriority = priority[i];
        priorityIndex = i;
      }
    }
    MinimumRep[priorityIndex] += 1;
    leftRep = leftRep - 1;
  }
}
//Output:
//This function will print all values on front part
function printOutput(arrOfNumbers, arrOfStates, MinimumRep) {
  document.getElementById("output").innerHTML = " ";
  document.getElementById("output").innerHTML = "States &nbsp;  Population      Minimum Representative<br>";
  const copyArrOfStates = [];
  for (let i = 0; i < arrOfStates.length; i++) {
    copyArrOfStates[i] = arrOfStates[i];
  }
  //Now sort
  copyArrOfStates.sort();
  for (let i = 0; i < arrOfStates.length; i++) {
    let value = copyArrOfStates[i];
    let index = arrOfStates.indexOf(value);
    document.getElementById("output").innerHTML += arrOfStates[index] + "  &nbsp;___  " + arrOfNumbers[index] + "&nbsp; ___" + MinimumRep[index] + " <br>";
  }
  document.getElementById("error").innerHTML=" ";
  
  var csvFile = document.getElementById("output").innerHTML;
  
  let filename = "exportCSV"; 

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
}
  }
}

