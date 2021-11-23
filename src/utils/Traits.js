export function getTextTraits(zoom, tintRed, tintGreen, tintBlue, tintAlpha, rotationMin, rotationMax, stripeWidthMin, stripeWidthMax, speedMin, speedMax) {
    var form;

    if (rotationMin === rotationMax) {
        if (zoom > 50 && rotationMax % 90 === 0) {
            form = "perfect square";
        } else if ((rotationMax === 45 || rotationMax === 135) && zoom > 91) {
            form = "perfect diamond";
        } else if (zoom <= 50 && rotationMax === 90) {
            form = "horizontal stripes";
        } else if (zoom <= 50 && rotationMax % 180 === 0) {
            form = "vertical stripes";
        } else if (zoom <= 25) {
            form = "diagonal stripes";
        } else {
            form = "rotated square";
        }
    } else if (rotationMax - rotationMin < 30 && stripeWidthMin > 200 && zoom < 20) {
        form = "big fat stripes";
    } else if (stripeWidthMax < 60 && rotationMax - rotationMin < 30) {
        form = "match sticks";
    } else if (stripeWidthMax < 60 && rotationMax - rotationMin > 130 && zoom < 30) {
        form = "laser beams";
    } else if (stripeWidthMax < 60 && rotationMax - rotationMin > 130 && zoom > 80) {
        form = "birds nest";
    } else if (zoom > 60 && stripeWidthMin > 180 && rotationMax - rotationMin < 30 && rotationMax - rotationMin > 5 && (rotationMin > 160 || rotationMax < 30)) {
        form = "cluttered books";
    } else if (stripeWidthMin > 180 && rotationMax - rotationMin <= 30 && rotationMin > 75 && rotationMax < 105) {
        form = "stacked books";
    } else if (stripeWidthMin > 50 && stripeWidthMax < 150 && rotationMax - rotationMin < 50 && rotationMin > 35 &&  rotationMax < 145 && zoom > 55) {
        form = "broken ladder";
    } else if (stripeWidthMin > 200 && zoom > 70) {
        form = "giant pillars";
    } else if (stripeWidthMin > 70 && zoom < 20 && rotationMax - rotationMin < 60 && rotationMax - rotationMin > 10) {
        form = "ribbons";
    } else if (stripeWidthMax < 75 && zoom < 20 && rotationMax - rotationMin < 60 && rotationMax - rotationMin > 10) {
        form = "streamers";
    } else if (stripeWidthMin > 25 && stripeWidthMax < 200 && rotationMax - rotationMin < 15) {
        form = "jittery";
    } else if (stripeWidthMax < 40) {
        form = "twiglets";
    } else if (zoom > 50 && rotationMax - rotationMin < 60 && rotationMin >= 50 && rotationMax <= 130 && stripeWidthMax - stripeWidthMin >= 100) {
        form = "collapsing";
    } else if (stripeWidthMin > 200 && zoom > 50) {
        form = "blocky";
    } else if (rotationMax - rotationMin > 100 && stripeWidthMax < 150) {
        form = "wild";
    } else if (rotationMax - rotationMin < 100 && stripeWidthMin > 150) {
        form = "tame";
    } else if (stripeWidthMin > 150) {
        form = "thick";
    } else if (stripeWidthMax < 100) {
        form = "thin";
    } else {
        form = "abstract";
    }

    var colourWay; 

    if (tintAlpha > 127) {
        const difference = 150;
        if (tintAlpha > 200 && tintRed < 50 && tintGreen < 50 && tintBlue < 50) {
            colourWay = "doom and gloom";
        } else if (tintAlpha > 200 && tintRed > 200 && tintGreen > 200 && tintBlue > 200) {
            colourWay = "seen a ghost";
        } else if (tintRed > tintGreen && tintRed - tintGreen >= difference && tintRed > tintBlue && tintRed - tintBlue >= difference) {
            colourWay = "reds";
        } else if (tintGreen > tintRed && tintGreen - tintRed >= difference && tintGreen > tintBlue && tintGreen - tintBlue >= difference) {
            colourWay = "greens";
        } else if (tintBlue > tintRed && tintBlue - tintRed >= difference && tintBlue > tintGreen && tintBlue - tintGreen >= difference) {
            colourWay = "blues";
        } else if (tintRed > tintGreen && tintRed - tintGreen >= difference && tintBlue > tintGreen && tintBlue - tintGreen >= difference) {
            colourWay = "violets";
        } else if (tintRed > tintBlue && tintRed - tintBlue >= difference && tintGreen > tintBlue && tintGreen - tintBlue >= difference) {
            colourWay = "yellows";
        } else if (tintBlue > tintRed && tintBlue - tintRed >= difference && tintGreen > tintRed && tintGreen - tintRed >= difference) {
            colourWay = "cyans";
        } else {
            colourWay = "heavy tint";
        }
    } else if (tintAlpha === 0) {
        colourWay = "super dynamic";
    } else if (tintAlpha < 40) {
        colourWay = "vivid";
    } else if (tintAlpha < 80) {
        colourWay = "light tint";
    } else {
        colourWay = "medium tint";
    }

    var speed;

    if (speedMax <= 25 && tintAlpha < 180) {
        speed = "call the police";
    } else if (speedMin === speedMax) {
         if (speedMin === speedMax && speedMax < 30) {
            speed = "blinking";
        } else if (speedMin === speedMax && speedMax > 200) {
            speed = "slow pulse";
        } else if (speedMin === speedMax) {
            speed = "pulse";        
        }
    } else if (speedMax < 50) {
        speed = "flickering";
    } else if (speedMax < 100) {
        speed = "scintillating";
    } else if (speedMin > 200) {
        speed = "pedestrian";
    } else if (speedMin > 150) {
        speed = "sleepy";
    } else {
        speed = "shifting";
    }
    
    var descriptiveTraits;

    if (form.length > 0) {
        descriptiveTraits = form + ", ";
    }
    if (speed.length > 0) {
        descriptiveTraits += speed + ", "; 
    }
    if (colourWay.length > 0) {
        descriptiveTraits += colourWay; 
    }

    return descriptiveTraits;
}

export default getTextTraits;