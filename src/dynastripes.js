function convertToHex(decimalDigit) {
				
    switch(decimalDigit) {
        case 10:
            return 'A';
            break;
        case 11:
            return 'B';
            break;
        case 12:
            return 'C';
            break;
        case 13:
            return 'D';
            break;
        case 14:
            return 'E';
            break;
        case 15:
            return 'F';
            break;
        default:
            return decimalDigit.toString();
    }
    
}			

function getRandomColor() {
    var digitMin = 4;
    var digitMax = 15;
    
    var firstChar = convertToHex(randomIntFromInterval(digitMin, digitMax));
    var secondChar = convertToHex(randomIntFromInterval(digitMin, digitMax));
    var thirdChar = convertToHex(randomIntFromInterval(digitMin, digitMax));
    var fourthChar = convertToHex(randomIntFromInterval(digitMin, digitMax));
    var fifthChar = convertToHex(randomIntFromInterval(digitMin, digitMax));
    var sixthChar = convertToHex(randomIntFromInterval(digitMin, digitMax));
    
    
    var hexVal = firstChar + secondChar + thirdChar + fourthChar + fifthChar + sixthChar;
    
    // alert(hexVal);

    return '#' + hexVal;
}

// Generate random int, inclusive of min/max
function randomIntFromInterval(min, max) { 
      var value =  Math.floor(Math.random() * (max - min + 1) + min);

    // alert(min + ", " + max + ", " + value);

      return value;
}

function generateDynaStripes() {

    var widthRemaining = 2000;
    const minWidth = 50;
    const maxWidth = 400;
    var currentXPos = 0;
    var allColorsXml = "";
    var allRectsXml = "";

    while (widthRemaining > 0) {

        var className = "bar" + currentXPos;
        var firstColour = getRandomColor();
        var secondColour = getRandomColor();

        // var currentMaxWidth = Math.min(maxWidth, widthRemaining);
        var currentWidth = randomIntFromInterval(minWidth, maxWidth);
        currentWidth = Math.min(widthRemaining, currentWidth);

        var animateTime = randomIntFromInterval(500, 2000);

        const colourValues = firstColour + ";" + secondColour + ";" + firstColour;

        var currentRect = "<rect x='" + currentXPos + "' y='0' width='" + currentWidth + "' height='2000' shape-rendering='crispEdges'>";
        currentRect += "<animate begin= '0s' dur='" + animateTime + "ms' attributeName='fill' values='" + colourValues + "' fill='freeze' repeatCount='indefinite' />";
        currentRect += "</rect>";

        allRectsXml += currentRect + "\r\n";

        currentXPos += currentWidth;
        widthRemaining -= currentWidth;
    }

    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000'>";
    svg += allRectsXml;
    svg +=  "</svg>";

    return svg;
}
 export default generateDynaStripes;