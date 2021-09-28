
// Generate random int, inclusive of min/max
function randomIntFromInterval(randomSeed, min, max) { 
    if (max <= min) {
        return min;
    }
    const value = randomSeed % (max - min) + min;
    //   var value =  Math.floor(Math.random() * (max - min + 1) + min);
      return value;
}

function colourWithPallette(randomSeed, min, max) {
    const red = randomIntFromInterval(randomSeed, min, max);
    const blue = randomIntFromInterval(randomSeed * 2, min, max);
    const green = randomIntFromInterval(randomSeed * 3, min, max);
    const colour = "rgb(" + red + ", " + blue + ", " + green + ")";
    console.log(colour);
    return colour;
}

function generateDynaStripes(randomSeed, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax) {

    console.log("Building dynastripes: " + rotationMin + " "  + rotationMax + " " + widthMin + " " + widthMax + " " + paletteMin + " " + paletteMax + " " + speedMin + " " + speedMax)
    var xPos = 0;
    const maxWidth = 2000;
    var allColorsXml = "";
    var allRectsXml = "";

    while ((maxWidth - xPos) > 0) {
        const opacity = 0.8;

        const rotationDegrees = randomIntFromInterval(randomSeed, rotationMin, rotationMax);
        const firstColour = colourWithPallette(randomSeed, paletteMin, paletteMax);
        const secondColour = colourWithPallette(randomSeed * 2, paletteMin, paletteMax);

        // var currentMaxWidth = Math.min(maxWidth, widthRemaining);
        var width = randomIntFromInterval(randomSeed, widthMin, widthMax) + 50;
        width = Math.min((maxWidth - xPos), width);

        var animateTime = randomIntFromInterval(randomSeed, speedMin, speedMax) * 10;

        const colourValues = firstColour + ";" + secondColour + ";" + firstColour;

        var currentRect = "<rect x='" + xPos + "' y='0' width='" + width + "' height='2000' shape-rendering='crispEdges' opacity='" + opacity + "' transform='rotate(" + rotationDegrees + " 1000 1000)'>";
        currentRect += "<animate begin= '0s' dur='" + animateTime + "ms' attributeName='fill' values='" + colourValues + "' fill='freeze' repeatCount='indefinite' />";
        currentRect += "</rect>";

        allRectsXml += currentRect + "\r\n";

        xPos += width;
        randomSeed += xPos;
    }

    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000'>";
    svg += allRectsXml;
    svg +=  "</svg>";

    return svg;
}

export default generateDynaStripes;