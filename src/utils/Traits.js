
function buildTraitsText(zoom, tintRed, tintGreen, tintBlue, tintAlpha, rotationDegrees, rotationRange, stripeWidthMin, stripeWidthMax, speedMin, speedMax) {

    // adjective
    var speed = getSpeed(tintAlpha, speedMin, speedMax);        
    //adjective
    var color = getColor(tintRed, tintGreen, tintBlue, tintAlpha);
    // noun
    var form = getForm(zoom, rotationDegrees, rotationRange, stripeWidthMin, stripeWidthMax);

    return speed + " " + color + " " + form;
}

function getSpeed(tintAlpha, speedMin, speedMax) { 
    
    var speed = "";

    if (tintAlpha > 130 && speedMin > 220) {
        speed = "languid";
    } else if (tintAlpha > 130 && speedMin > 200) {
        speed = "pedestrian";
    } else {
        if (speedMax <= 25 && tintAlpha < 180) {
            speed = "manic";
        } else if (speedMin === speedMax) {
            if (speedMax < 30) {
                speed = "blinking";
            } else if (speedMax > 200) {
                speed = "throbbing";
            } else {
                speed = "pulsing";        
            }
        } else if (speedMax < 35) {
            speed = "flashing";
        } else if (speedMax < 70) {
            speed = "flickering";
        } else if (speedMax < 105) {
            speed = "quivering";
        } else if (speedMax < 150) {
            speed = "vibrating";
        } else if (speedMax - speedMin > 150) {
            speed = "scintillating";        
        } else {
            speed = "oscillating";
        } 

        if (tintAlpha > 213) {
            speed = "gently " + speed;
        } else if (tintAlpha > 200) {
            speed = "tepidly " + speed;
        } else if (tintAlpha < 20) {
            speed = "magnificently " + speed;
        } else if (tintAlpha < 50) {
            speed = "powerfully " + speed;
        }    
    }

    return speed;
}


function getColor(tintRed, tintGreen, tintBlue, tintAlpha) { 
    var color = "";

    console.log("Red: " + tintRed + " Green: "+ tintGreen + " Blue: " + tintBlue);

    if (tintAlpha > 127) {
        const difference = 150;
        if (tintAlpha > 200 && tintRed < 50 && tintGreen < 50 && tintBlue < 50) {
            color = "gloomy";
        } else if (tintAlpha > 200 && tintRed > 200 && tintGreen > 200 && tintBlue > 200) {
            color = "pale";
        } else if (tintRed > tintGreen && tintRed - tintGreen >= difference && tintRed > tintBlue && tintRed - tintBlue >= difference) {
            color = "red";
        } else if (tintGreen > tintRed && tintBlue === 0) {
            color = "green";
        } else if (tintGreen > tintRed && tintGreen - tintRed >= difference && tintGreen > tintBlue && tintGreen - tintBlue >= difference) {
            color = "green";
        } else if (tintBlue > tintRed && tintBlue - tintRed >= difference && tintBlue > tintGreen && tintBlue - tintGreen >= difference) {
            color = "blue";
        } else if (tintRed === 255 && tintGreen === 0 && tintBlue > 100) {
            color = "pink";
        } else if (tintRed > tintGreen && tintRed - tintGreen >= difference && tintBlue > tintGreen && tintBlue - tintGreen >= difference && tintRed > 200) {
            color = "purple";
        // } else if (tintRed > tintBlue && tintRed - tintBlue >= difference && tintGreen > tintBlue && tintGreen - tintBlue >= difference) {            
        } else if (tintRed === 255 && tintBlue === 0 && tintGreen > 200) {
            color = "yellow";
        } else if (tintRed === 255 && tintBlue === 0) {
            color = "orange";
        } else if (tintRed === 0 && tintGreen < 200 && tintBlue === 255) {
            color = "blue";
        } else if (tintBlue > tintRed && tintBlue - tintRed >= difference && tintGreen > tintRed && tintGreen - tintRed >= difference) {
            color = "cyan";
        } else {
            color = "saturated";
        }
    } else if (tintAlpha === 0) {
        color = "kaleidoscopic";
    } else if (tintAlpha < 25) {
        color = "chromatic";
    } else if (tintAlpha < 50) {
        color = "vivid";
    } else if (tintAlpha < 85) {
        color = "tinged";
    } else {
        color = "tinted"; // medium tint
    }

    return color;
}

function getForm(zoom, rotationDegrees, rotationRange, stripeWidthMin, stripeWidthMax) { 

    var form = "";
    rotationDegrees = rotationDegrees % 180; // because forms rotated 180 degrees are the same.

    if (rotationRange === 0) {
        if (zoom > 50 && rotationDegrees % 90 === 0) {
            form = "perfect square";
        } else if (zoom > 91 && (rotationDegrees === 45 || rotationDegrees === 135)) {
            form = "perfect diamond";
        } else if (zoom <= 50 && rotationDegrees === 0) {
            form = "vertical stripes";
        } else if (zoom <= 50 && rotationDegrees % 90 === 0) {
            form = "horizontal stripes";
        } else if (zoom <= 25) {
            form = "diagonal stripes";
        } else {
            form = "rotated square";
        }
    } else if (zoom < 30) {
        if (zoom < 20 && stripeWidthMin > 70 && rotationRange < 60 && rotationRange > 10) {
            form = "ribbons";
        } else if ( zoom < 20 && rotationRange < 30 && stripeWidthMin > 200) {
            form = "banners";
        } else if (zoom < 20 && stripeWidthMax < 75 && rotationRange < 60 && rotationRange > 10) {
            form = "streamers";
        } else if (stripeWidthMax < 60 && rotationRange > 130) {
            form = "laser beams";
        } else if (stripeWidthMax < 120 && rotationDegrees >= 45 && rotationDegrees < 135) {
            form = "beams";
        } else if (stripeWidthMax < 120 && rotationRange < 90) {
            form = "poles";
        } else if (rotationDegrees >= 45 && rotationDegrees < 135) {
            form = "streaks";
        } else { // rotation < 45 || rotation > 135
            form = "shafts";
        }
    } else if (zoom > 50 && stripeWidthMax < 60 && rotationRange < 30) {
        form = "match sticks";
    } else if (zoom > 50 && stripeWidthMax < 60 && rotationRange < 60) {
        form = "scattered match sticks";
    } else if (zoom > 50 && stripeWidthMin > 70 && stripeWidthMax < 110 && rotationRange > 10 && rotationRange < 40) {
        form = "twigs";
    } else if (zoom > 50 && stripeWidthMin > 70 && stripeWidthMax < 110 && rotationRange > 10 && rotationRange < 60) {
        form = "scattered twigs";
    } else if (zoom > 80 &&stripeWidthMax < 60 && rotationRange > 130) {
        form = "birds nest";
    } else if ( zoom > 70 && rotationRange < 70 && stripeWidthMin > 200 && (rotationDegrees <= 25 || rotationDegrees >= 155)) {
        form = "pillars";
    } else if ( zoom > 70 && rotationRange < 70 && stripeWidthMin > 200 && (rotationDegrees <= 115 && rotationDegrees >= 65)) {
        form = "bricks";
    } else if (zoom > 55 && stripeWidthMin > 70 && rotationRange >= 5 && rotationRange <= 30 && (rotationDegrees <= 10 || rotationDegrees >= 170)) {
        form = "cluttered books";
    } else if (zoom > 55 && stripeWidthMin > 70 && rotationRange <= 30 && rotationDegrees >= 80 && rotationDegrees <= 100) {
        form = "stacked books";
    } else if (zoom > 55 && stripeWidthMin > 70 && rotationRange < 60 && rotationDegrees >= 50 && rotationDegrees <= 130) {
        form = "tumbling books";
    } else if (zoom > 55 && stripeWidthMin > 50 && stripeWidthMax < 150 && rotationRange < 50 && rotationDegrees >= 80 && rotationDegrees <= 100) {
        form = "broken ladder";
    } else if (zoom > 55 && rotationRange > 10 && rotationRange < 60 && rotationDegrees >= 50 && rotationDegrees <= 130 && stripeWidthMax - stripeWidthMin >= 150) {
        form = "collapsing building";
    } else if (stripeWidthMin > 25 && stripeWidthMax < 200 && rotationRange <= 15) {
        form = "jitters";
    } else if (stripeWidthMin > 25 && stripeWidthMax < 200 && rotationRange <= 45) {
        form = "wobbles";
    } else if ( zoom > 50 && stripeWidthMin > 200) {
        form = "blocks";
    } else if ( zoom > 90 && stripeWidthMax - stripeWidthMin >= 150 && rotationRange > 150) {
        form = "masterpiece";
    } else if (rotationRange > 100 && stripeWidthMax < 150) {
        form = "lunacy";
    } else if (rotationRange < 60 && stripeWidthMin > 150) {
        form = "tranquility";
    } else if (stripeWidthMin > 120) {
        form = "bars";
    } else if (stripeWidthMax < 100 && rotationRange > 60) {
        form = "scattered lines";
    } else if (stripeWidthMax < 100) {
        form = "lines";
    } else if (zoom > 40 && rotationRange > 90) {
        form = "reverie";
    } else {
        form = "abstraction";
    }

    return form;
}


export default buildTraitsText;