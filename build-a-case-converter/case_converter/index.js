function getUpperCase(str) {
  return str.toUpperCase();
}

function getLowerCase(str) {
  return str.toLowerCase();
}
function getSentenceCase(str) {
    const string = getLowerCase(str);
    return getUpperCase(string[0]) + string.slice(1);
}

function getProperCase(str){
    const words = getLowerCase(str).split(" ");
    const finalstring = []
    words.forEach(word => {
        let lowerString = getLowerCase(word);
        let finalword= getUpperCase(word[0]) + lowerString.slice(1);
        finalstring.push(finalword);
    });
    console.log(finalstring.join(" "));
    
    return finalstring.join(" ");
}
module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase,
};
