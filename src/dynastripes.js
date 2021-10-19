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
    const randomSeed = Math.trunc(Math.random() * 5_000_000);
    const svgString = encodeURIComponent(generateDynaStripes(randomSeed, 0, 0, 0, 25, 250, 0, 255, 25, 250));
    return `url("data:image/svg+xml,${svgString}")`;
}

function generatePlaceholderStripesDataUri() {
    const randomSeed = Math.trunc(Math.random() * 5_000_000);
    const zoom = randomIntFromInterval(randomSeed, 0, 100);
    const svgString = encodeURIComponent(generateDynaStripes(randomSeed, zoom, 0, 180, 25, 250, 0, 255, 25, 250));
    return `url("data:image/svg+xml,${svgString}")`;
}


function generateDynaStripes(randomSeed, zoom, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax) {
    console.log("Generating dynastripes: " + randomSeed + " " + zoom + " " + rotationMin + " "  + rotationMax + " " + widthMin + " " + widthMax + " " + paletteMin + " " + paletteMax + " " + speedMin + " " + speedMax)

    var xPos = 0;
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='" + generateViewBox(zoom) + "' clip-path='url(#clip)'>";
    // svg += "<defs><clipPath id='clip'><rect width='" + 2000 + "' height='" + 2000    + "'/></clipPath></defs>";
  
    while ((2000 - xPos) > 0) {

        var stripeWidth = randomIntFromInterval(randomSeed, widthMin, widthMax) * 2;

        if (stripeWidth > 2000 - xPos) {
            stripeWidth = 2000 - xPos;
        } else if ((2000 - xPos) - stripeWidth < widthMin) {
            stripeWidth += (2000 - xPos) - stripeWidth;
        }

        const rotationDegrees = randomIntFromInterval(randomSeed + 1, rotationMin, rotationMax);
        console.log("rotationDegrees: " + rotationDegrees);            
        // const radians = rotationDegrees * Math.PI / 180;
        // const rotatedWidthHeight = 2000 * Math.abs(Math.sin(radians)) + 2000 * Math.abs(Math.cos(radians));
        // maxWidthHeight = Math.max(maxWidthHeight, rotatedWidthHeight);

        var speed = randomIntFromInterval(randomSeed + 2, speedMin, speedMax) * 20;

        var currentRect = "<rect x='" + xPos + "' y='0' width='" + stripeWidth + "' height='2000' opacity='0.8' transform='rotate(" + rotationDegrees + " 1000 1000)'>";
        currentRect += "<animate begin= '0s' dur='" + speed + "ms' attributeName='fill' values='" + getColours(randomSeed + 3, paletteMin, paletteMax) + "' fill='freeze' repeatCount='indefinite'/>";
        currentRect += "</rect>";

        svg += currentRect + "\r\n";

        xPos += stripeWidth;
        randomSeed += 100;
    }

    // var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 2000'>";
    // console.log("maxWidthHeight: " + maxWidthHeight);
    // // viewBoxWidth = 2000 * Abs(Cos(Fi)) + 2000 * Abs(Sin(Fi))
    // // maxWidthHeight = 2000;
    // // const offset = 0; // (2000 - maxWidthHeight) / 2;

    // var offset = 0;    

    // // if (zoom) {
    // //     maxWidthHeight = 2830;
    // //     offset = -415;    
    // // } else {
    // //     maxWidthHeight = 2000;
    // // }

    // // const viewBox = offset + " " + offset + " " + maxWidthHeight + " " + maxWidthHeight;
 
    svg +=  "</svg>";

    return svg;
}

function generateViewBox(zoom) {
    zoom = zoom * 20;
    const widthHeight = 1000 + zoom;
    var viewBox = "";
    var offset = (zoom - 1000) / 2;
    if (zoom > 1000) {
        viewBox = "-" + offset + " -" + offset + " " + widthHeight + " " + widthHeight;
    } else {
        offset = (zoom === 1000 ? 0 : (1000 - zoom) / 2);
        viewBox = "" + offset + " " + offset + " " + widthHeight + " " + widthHeight;
    }

    console.log("viewBox: " + viewBox);
    return viewBox;
}

export default generateDynaStripes;
export { generateRandomStripesDataUri, generatePlaceholderStripesDataUri, generateDynaStripes };