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
      //Algo:
      Hamilton_Algorithm(arrOfNumbers,MinimumRep);
      //Print
     printOutput(arrOfNumbers,arrOfStates,MinimumRep);
  };
  reader.readAsText(input);
  
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
      k++;
      i--;
    }
  }
}
function Hamilton_Algorithm(arrOfNumbers,MinimumRep)
{
  var representative=+document.getElementById("represtNo").value ;
  
   //First step: Calculate Total population:
   let totalPop=0;
   for(let i=0; i<arrOfNumbers.length; i++){
        totalPop=Number(arrOfNumbers[i])+totalPop;
   }
   //Second Step: calculate the average population per representative
  let avgPop=(totalPop/representative);

  //Third step:
  //This array holds the minimum respresentative
     const divide=[];
     const remain=[];
     const copyRemain=[];
     const floor=[];
     let countRep=0;
     let leftRep=0;
    for(let i=0; i<arrOfNumbers.length; i++)
    {
      divide[i]=((+arrOfNumbers[i])/avgPop).toFixed(2);//This array stores values after dividing upto two decimal
     floor[i]=(Math.floor((+arrOfNumbers[i])/avgPop));//This array stores floor values;
     remain[i]=(divide[i]-floor[i]).toFixed(2);
     copyRemain[i]=(divide[i]-floor[i]).toFixed(2);
      //count total representative
     countRep=countRep+floor[i];
     MinimumRep[i]=Math.floor((+arrOfNumbers[i])/avgPop);
    }
    leftRep=representative-countRep;
   //Sort copyRemain and reverse(to get higest element at 0 index):
   copyRemain.sort();
   copyRemain.reverse();
   for(let i=0; i<leftRep; i++)
   {
    let value=copyRemain[i];//largest value;
    let index=remain.indexOf(value);
    MinimumRep[index]+=1;
   } 
}
//Output:
//This function will print all values on front part
function printOutput(arrOfNumbers,arrOfStates,MinimumRep)
{
  document.getElementById("output").innerHTML=" ";
  document.getElementById("output").innerHTML="States &nbsp;  Population      Minimum Representative(Hamilton)<br>";
  const copyArrOfStates=[];
  for(let i=0; i<arrOfStates.length; i++)
  {
    copyArrOfStates[i]=arrOfStates[i];
  }
  //Now sort
  copyArrOfStates.sort();
  
  for(let i=0; i<arrOfStates.length; i++)
  {
    let value=copyArrOfStates[i];
    let index=arrOfStates.indexOf(value);
    document.getElementById("output").innerHTML+=arrOfStates[index]+"  &nbsp;___  "+arrOfNumbers[index]+"&nbsp; ___"+MinimumRep[index]+" <br>";
  }

}