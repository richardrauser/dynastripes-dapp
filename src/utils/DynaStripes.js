import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

// Generate random int, inclusive of min/max, using same method as Solidity code
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

function generateRandomStripesDataUri() {
    const randomSeed = Math.trunc(Math.random() * 5_000_000);
    // const randomZoom = randomIntFromInterval(randomSeed, 0, 100);
    // const svgString = encodeURIComponent(generateDynaStripes(randomSeed, randomZoom, null, 0, 180, 25, 250, 0, 255, 25, 250));

    const svgString = encodeURIComponent(generateDynaStripes(randomSeed, 0, null, 0, 0, 25, 250, 25, 250));
    return `url("data:image/svg+xml,${svgString}")`;
}

function generateDynaStripes(randomSeed, zoom, tintColour, rotationMin, rotationMax, widthMin, widthMax, speedMin, speedMax) {
    console.log("Generating dynastripes: " + randomSeed + " " + zoom + " " + rotationMin + " "  + rotationMax + " " + widthMin + " " + widthMax + " " + speedMin + " " + speedMax)

    if (tintColour === null) {
        tintColour = { r: 0, g: 0, b: 0, a: 0 };
    }

    const viewBoxClipRect = getViewBoxClipRect(zoom);
    const viewBox = viewBoxClipRect[0];
    const clipRect = viewBoxClipRect[1];
    const rendering = rotationMin === rotationMax ? 'crispEdges' : 'auto';
    const defs = "<defs><clipPath id='masterClip'><rect " + clipRect + "/></clipPath></defs>";
    const rects = getRects(randomSeed, tintColour, rotationMin, rotationMax, widthMin, widthMax, speedMin, speedMax);

    return "<svg xmlns='http://www.w3.org/2000/svg' viewBox='" + viewBox + "' shape-rendering='" + rendering + "'>" + defs + "<g clip-path='url(#masterClip)'>" + rects + "</g></svg>";
}

function getViewBoxClipRect(zoom) {
    zoom = zoom * 20;
    const widthHeight = 1000 + zoom;
    var viewBox = "";
    var clipRect = "";
    var offset = (zoom - 1000) / 2;
    if (zoom > 1000) {
        viewBox = "-" + offset + " -" + offset + " " + widthHeight + " " + widthHeight;
        clipRect = "x='-" + offset + "' y='-" + offset  + "' width='" + widthHeight + "' height='" + widthHeight + "'";
        
    } else {
        offset = (zoom === 1000 ? 0 : (1000 - zoom) / 2);
        viewBox = "" + offset + " " + offset + " " + widthHeight + " " + widthHeight;
        clipRect = "x='" + offset + "' y='" + offset + "' width='" + widthHeight + "' height='" + widthHeight + "'";
    }

    return [viewBox, clipRect];
}

function getRects(randomSeed, tintColour, rotationMin, rotationMax, widthMin, widthMax, speedMin, speedMax) {
    var xPos = 0;
    var rects = "";

    while ((2000 - xPos) > 0) {

        var stripeWidth = randomIntFromInterval(randomSeed, widthMin, widthMax) * 2;

        if (stripeWidth > 2000 - xPos) {
            stripeWidth = 2000 - xPos;
        } else if ((2000 - xPos) - stripeWidth < widthMin) {
            stripeWidth += (2000 - xPos) - stripeWidth;
        }

        const rotation = randomIntFromInterval(randomSeed + 1, rotationMin, rotationMax);
        const speed = randomIntFromInterval(randomSeed + 2, speedMin, speedMax) * 20;
        const firstColour = getColour(randomSeed + 3, tintColour);
        const secondColour = getColour(randomSeed + 13, tintColour);
        const colours = firstColour + ";" + secondColour + ";" + firstColour;
    
        var currentRect = "<rect x='" + xPos + "' y='0' width='" + stripeWidth + "' height='2000' fill='" + firstColour + "' opacity='0.8' transform='rotate(" + rotation + " 1000 1000)'>";
        currentRect += "<animate begin= '0s' dur='" + speed + "ms' attributeName='fill' values='" + colours + "' fill='freeze' repeatCount='indefinite'/>";
        currentRect += "</rect>";

        rects += currentRect + "\r\n";

        xPos += stripeWidth;
        randomSeed += 100;
    }
 
    return rects;
}

function getColour(randomSeed, tintColour) {
    const redRandom = randomIntFromInterval(randomSeed, 0, 255);
    const greenRandom = randomIntFromInterval(randomSeed + 2, 0, 255);
    const blueRandom = randomIntFromInterval(randomSeed + 1, 0, 255);

    const redTint = tintColour.r;
    const greenTint = tintColour.g;
    const blueTint = tintColour.b;
    const alpha = tintColour.a;

    // alpha blending
    const red = redRandom + (redTint - redRandom) * alpha;
    const green = greenRandom + (greenTint - greenRandom) * alpha;
    const blue = blueRandom + (blueTint - blueRandom) * alpha;

    const finalColour = "rgb(" + red + ", " + green + ", " + blue + ")";

    return finalColour;
}

export default generateDynaStripes;
export { generateRandomStripesDataUri, generateDynaStripes };