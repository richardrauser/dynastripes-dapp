
// Generate random int, inclusive of min/max
function randomIntFromInterval(min, max) { 
      var value =  Math.floor(Math.random() * (max - min + 1) + min);

    // alert(min + ", " + max + ", " + value);

      return value;
}

function colourWithBasePallette(base) {
				
    const min = 1.5 * base;// 55;
    const max = 255; //155;
    const red = randomIntFromInterval(min, max);
    const blue = randomIntFromInterval(min, max);
    const green = randomIntFromInterval(min, max);
        
    return "rgb(" + red + ", " + blue + ", " + green + ")";
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

        const userSelectedPallette = 45; // randomIntFromInterval(0, 100);
        const firstColour = colourWithBasePallette(userSelectedPallette);
        const secondColour = colourWithBasePallette(userSelectedPallette);

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