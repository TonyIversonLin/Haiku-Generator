//var fs = require('fs');
//console.log(fs.readFileSync('./cmudict.txt'));
//console.log(fs);



/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////   SETING UP THE DICTIONARY DATABASE   ///////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');
//create the database structure which is an 2-D array with index of the element matching the 
//number of syllabas of the word. I created 15 slot for word that have syllabas up to 15
var library = [];
for(var i =0;i<=15;i++){
	library[i] = [];
}
// 


function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

function formatData(data){    
   var lines = data.toString().split("\n"),
       lineSplit
   lines.forEach(function(line){    
    lineSplit = line.split("  ");   
    idSyllables(lineSplit[0],lineSplit[1]); 
    //console.log("The word " + lineSplit[0] + " has this phoneme    layout: " + lineSplit[1]); 
  });
   	//checking the structure of the library
   	//for (var i = 0; i < library.length; i++) {
   		//console.log(library[i].length)
   	//} 
}
function idSyllables(word,syllabas){
	if(syllabas!==undefined && syllabas.match(/\d/gi)){   //We only put the word that has syllabas in to our library
	count = syllabas.match(/\d/gi).length;                //this will find the number of syllabas in each word
	//this will put the word into the rigth spot with the matching between the index of the libraray array and the number
	//of syllabas the word has.
	library[count].push(word);     
	}
}

//console.log(cmudictFile); // each line: word, the syllabas with number indicating the strength
formatData(cmudictFile);




///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////   CREATING THE FUNCTIONALITY (API) /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function createHaiku(structure){
	//console.log("This should log a haiku with the structure "+structure);
	console.log(structure);
	var result = [];
	structure.forEach(function(line){
		//this will deal with the 1-d array (one word each line)
		if(typeof(line)==="number") result.push(wordSelect(line));
		//this will deal with the 2-d array (multiple word each line)
		else{
			var temp = [];
			line.forEach(function(num){
				temp.push(wordSelect(num));
			});
			result.push(temp);
		}
	});
	return result;

}

function wordSelect(count){
	//this will pick a random word from our library corresponding to the require number of syllabas
	var max = library[count].length;
	var random = Math.floor(Math.random()*(max+1));
	//console.log(random);
	return library[count][random];
}


// createing the interface for the other program
module.exports = {
	createHaiku: createHaiku,
};
//or module.exports.createHaiku = createHaiku;
//console.log(module);