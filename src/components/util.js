/**
 * Given the current sentence with spaces and the start and end,
 * return a list of words in the current sentence by trimming it 
 * and the splitting it by space
 */
export const getCurrentWords = (currentSentence) => {
  // Remove start and end space
  var trimmedSentence = currentSentence.trim();
  return trimmedSentence.split(" ");
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const hasDuplicates = (array) => {
  return (new Set(array)).size !== array.length;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isEmptyOrWhitespace = (str) => {
  return str === null || str.match(/^ *$/) !== null;
};

//https://stackoverflow.com/questions/35352638/react-how-to-get-parameter-value-from-query-string/53079875#53079875
export const getQueryVariable = (variable) => {
  // return false;
  var query = window.location.search.substring(1);
  //   console.log(query); //"app=article&act=news_content&aid=160990"
  var vars = query.split("&");
  //   console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    //  console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return false;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Repeatedly shuffle the given array in a way that the first shuffled item does not repeat the last shuffled item
 * and join all these shuffled arrays together to create a new array with a length greater than given minimum
 * Be aware that this can cause a infinite loop if all numbers are the same.
 * @param {Array} array The array that will be continuously shuffled and joined together.
 * @param {integer} minLength minimum length of created joined array
 */
export function shuffleJoinArray(array, minLength) {
  var result = [];

  // Handle case when all numbers are the same
  if (array.every( (val, i, arr) => val === arr[0]) ) {
    while (result.length < minLength) {
      result.push(array[0])
    }
    return result;
  }
  
  while (result.length < minLength) {
    var shuffledArray = shuffle(array);
    // keep shuffling if first item in shuffled array is the last item in result
    while (
      result.length > 0 &&
      shuffledArray[0] === result[result.length - 1]
    ) {
      shuffledArray = shuffle(array);
    }
    result = result.concat(shuffledArray);
  }

  return result;
}

/**
 * Return number of words in list of sentences separated by space. E.g. ["cat here", "dog there"] returns 4
 * @param {Array} sentences List of sentences e.g. ["cat here", "dog there"]
 */
export function countWordsInList(sentences) {
  var count = 0;
  sentences.forEach(sentence => {
    var words = sentence.split(" ");
    count += words.length;
  });
  return count;
}

/**
 * Given a list that is not empty, return the first item
 */
export const getFirstListItemIfNotNull = (items) => {
  if (items !== null && items.length > 0) {
    return items[0];
  }

  return;
}

/**
 * Replace last word in currentInput
 */
export const getInputLastWordReplaced = (wordToReplace, currentInput) => {
  // var currentInput = this.props.input;
  var inputArray = currentInput.split(" ");

  // Remove last word
  inputArray.pop();
  // Replace last word
  var newInput = (inputArray.join(" ") + " " + wordToReplace).trim();
  return newInput;
};

/**
 * Use pythagoras to return the distance between two screen coordinates
 */
export const getClickDistance = (oldX, oldY, newX, newY) => {
  var deltaX = oldX - newX;
  var deltaY = oldY - newY;
  var distance = Math.sqrt((deltaX ** 2) + (deltaY ** 2))
  return distance;
}

/**
 * Get index difficulty ID = Math.log2((amplitude/width) + 1);
 */
export const getIndexDifficulty = (amplitude, width) => {
  return Math.log2((amplitude / width) + 1);
}

export function isDevPersonalised(devUserId){
  return devUserId % 2 === 0;
}