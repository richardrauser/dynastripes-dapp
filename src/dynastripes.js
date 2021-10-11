import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// Generate random int, inclusive of min/max
function randomIntFromInterval(randomSeed, min, max) { 
    if (max <= min) {
        return min;
    }
    const abiCodedSeed = ethers.utils.defaultAbiCoder.encode(["uint"], [randomSeed]);
    const hash = ethers.utils.keccak256(abiCodedSeed);
    const seed = BigNumber.from(hash);
    
    const value = seed.mod(BigNumber.from(max - min)).add(BigNumber.from(min));
    //   var value =  Math.floor(Math.random() * (max - min + 1) + min);
      return value.toNumber();
}

function getColours(randomSeed, paletteMin, paletteMax) {
    const firstColour = getColour(randomSeed, paletteMin, paletteMax);
    const secondColour = getColour(randomSeed + 10, paletteMin, paletteMax);
    const colourValues = firstColour + ";" + secondColour + ";" + firstColour;
    return colourValues;
}

function getColour(randomSeed, min, max) {
    const red = randomIntFromInterval(randomSeed, min, max);
    const blue = randomIntFromInterval(randomSeed + 1, min, max);
    const green = randomIntFromInterval(randomSeed + 2, min, max);
    const colour = "rgb(" + red + ", " + blue + ", " + green + ")";
    return colour;
}

function generateRandomStripesDataUri() {
    const randomSeed = Math.trunc(Math.random() * 500000000);
    const svgString = encodeURIComponent(generateDynaStripes(randomSeed, 0, 0, 0, 255, 0, 255, 20, 255));
    return `url("data:image/svg+xml,${svgString}")`;
}

function generateDynaStripes(randomSeed, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax) {

    console.log("Building dynastripes: " + rotationMin + " "  + rotationMax + " " + widthMin + " " + widthMax + " " + paletteMin + " " + paletteMax + " " + speedMin + " " + speedMax)
    var xPos = 0;
    const maxWidth = 2000;
    var allRectsXml = "";
    const opacity = 0.8;

    while ((maxWidth - xPos) > 0) {

        var stripeWidth = randomIntFromInterval(randomSeed, widthMin, widthMax) * 2;

        if (stripeWidth > maxWidth - xPos) {
            stripeWidth = maxWidth - xPos;
        } else if ((maxWidth - xPos) - stripeWidth < widthMin) {
            stripeWidth += (maxWidth - xPos) - stripeWidth;
        }

        const rotationDegrees = randomIntFromInterval(randomSeed + 1, rotationMin, rotationMax);
        var speed = randomIntFromInterval(randomSeed + 2, speedMin, speedMax) * 20;

        var currentRect = "<rect x='" + xPos + "' y='0' width='" + stripeWidth + "' height='2000' shape-rendering='crispEdges' opacity='" + opacity + "' transform='rotate(" + rotationDegrees + " 1000 1000)'>";
        currentRect += "<animate begin= '0s' dur='" + speed + "ms' attributeName='fill' values='" + getColours(randomSeed + 3, paletteMin, paletteMax) + "' fill='freeze' repeatCount='indefinite' />";
        currentRect += "</rect>";

        allRectsXml += currentRect + "\r\n";

        xPos += stripeWidth;
        randomSeed += 100;
    }

    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000'>";
    svg += allRectsXml;
    svg +=  "</svg>";

    return svg;
}

export default generateDynaStripes;
export { generateRandomStripesDataUri, generateDynaStripes };