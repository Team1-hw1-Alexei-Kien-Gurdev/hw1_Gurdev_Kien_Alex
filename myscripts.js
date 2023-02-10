const myForm = document.getElementById("myForm");
      const csvFile = document.getElementById("csvFile");
myForm.addEventListener("submit", function (e)
{
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
  
  reader.onload = function (e) {
    const text = e.target.result;
    //Need two arrays:
    const arrOfNumbers = [];//(Array will holds population)
     const arrOfStates = [];//(array will holds names of states)
     const MinimumRep=[];//(Arrays holds the minimum number of reprsetative per state)
     csvToArray(text,arrOfNumbers,arrOfStates);
  };
  reader.readAsText(input);
  input.writeOnFile(data);
});

//This function :
// iterate through all the file and make arrays of different  names and numbers
function csvToArray(str, arrOfNumbers,arrOfStates,delimiter = ",") {

  let j = 0, //to iterate arr of Numbers
  k = 0;    //to iterate arr of states
  //skip the heading 
  let skip=0;
  while(str[skip]!="\n") //skip until first line of heading in a file
  {
    skip++;
  }
  for (let i = skip; i < str.length; i++) {
    if (str[i] == delimiter) {
      //Until we get a number add that
      i++;
      let str2 = "";
      while (str[i] >= '0' && str[i] <= '9') {

        str2 += str[i];
        i++;
      }
      arrOfNumbers.push(str2);
      console.log(arrOfNumbers[j]);
      j++;
    }
    else {
      let stateString = "";
      while (i<str.length &&str[i] != delimiter) 
      {
        if(str[i]!="\n"){
          stateString += str[i];
        }
        i++; 
      }
      arrOfStates.push(stateString);
      console.log(arrOfStates[k]);
      k++;
      i--;
    }
  }
}
