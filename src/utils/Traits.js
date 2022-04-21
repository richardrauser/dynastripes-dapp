
function buildTraitsText(zoom, tintRed, tintGreen, tintBlue, tintAlpha, rotationDegrees, rotationRange, stripeWidthMin, stripeWidthMax, speedMin, speedMax) {

    // adjective
    var speed = getSpeed(tintAlpha, speedMin, speedMax);        
    //adjective
    var color = getColor(tintRed, tintGreen, tintBlue, tintAlpha);
    // noun
    var form = getForm(zoom, rotationDegrees, rotationRange, stripeWidthMin, stripeWidthMax);

    return speed + " " + color + " " + form;
}

function getSpeed(alpha, min, max) { 
    
    var speed = "";

    if (alpha > 130 && min > 220) {
        speed = "languid";
    } else if (alpha > 130 && min > 200) {
        speed = "pedestrian";
    } else {
        if (max <= 25 && alpha < 180) {
            speed = "manic";
        } else if (min === max) {
            if (max < 30) {
                speed = "blinking";
            } else if (max > 200) {
                speed = "throbbing";
            } else {
                speed = "pulsing";        
            }
        } else if (max < 35) {
            speed = "flashing";
        } else if (max < 70) {
            speed = "flickering";
        } else if (max < 105) {
            speed = "quivering";
        } else if (max < 150) {
            speed = "vibrating";
        } else if (min > 200) {
            speed = "meandering";
        } else if (min > 150) {
            speed = "drifting";
        } else if (min > 120) {
            speed = "flowing";
        } else if (min > 100) {
            speed = "shifting";
        } else if (max - min > 150) {
            speed = "scintillating";        
        } else {
            speed = "oscillating"; 
        } 

        if (alpha > 213) {
            speed = "gently " + speed;
        } else if (alpha > 200) {
            speed = "tepidly " + speed;
        } else if (alpha < 20) {
            speed = "magnificently " + speed;
        } else if (alpha < 50) {
            speed = "powerfully " + speed;
        }    
    }

    return speed;
}


function getColor(red, green, blue, alpha) { 
    var color = "";

    console.log("Red: " + red + " Green: "+ green + " Blue: " + blue);

    if (alpha > 127) {
        const difference = 150;
        if (alpha > 200 && red < 50 && green < 50 && blue < 50) {
            color = "gloomy";
        } else if (alpha > 200 && red > 200 && green > 200 && blue > 200) {
            color = "pale";
        } else if (red > green && red - green >= difference && red > blue && red - blue >= difference) {
            color = "red";
        } else if (green > red && blue === 0) {
            color = "green";
        } else if (green > red && green - red >= difference && green > blue && green - blue >= difference) {
            color = "green";
        } else if (blue > red && blue - red >= difference && blue > green && blue - green >= difference) {
            color = "blue";
        } else if (red === 255 && green === 0 && blue > 100) {
            color = "pink";
        } else if (red > green && red - green >= difference && blue > green && blue - green >= difference && red > 200) {
            color = "purple";
        } else if (red === 255 && blue === 0 && green > 200) {
            color = "yellow";
        } else if (red === 255 && blue === 0) {
            color = "orange";
        } else if (red === 0 && green < 200 && blue === 255) {
            color = "blue";
        } else if (blue > red && blue - red >= difference && green > red && green - red >= difference) {
            color = "cyan";
        } else {
            color = "saturated";
        }
    } else if (alpha === 0) {
        color = "kaleidoscopic";
    } else if (alpha < 25) {
        color = "chromatic";
    } else if (alpha < 50) {
        color = "vivid";
    } else if (alpha < 85) {
        color = "tinged";
    } else {
        color = "tinted"; // medium tint
    }

    return color;
}

function getForm(zoom, rotationDegrees, rotationRange, widthMin, widthMax) { 

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
        if (zoom < 20 && widthMin > 70 && rotationRange < 60 && rotationRange > 10) {
            form = "ribbons";
        } else if ( zoom < 20 && rotationRange < 30 && widthMin > 200) {
            form = "banners";
        } else if (zoom < 20 && widthMax < 75 && rotationRange < 60 && rotationRange > 10) {
            form = "streamers";
        } else if (widthMax < 60 && rotationRange > 130) {
            form = "laser beams";
        } else if (widthMax < 120 && rotationDegrees >= 45 && rotationDegrees < 135) {
            form = "beams";
        } else if (widthMax < 120 && rotationRange < 90) {
            form = "poles";
        } else if (rotationDegrees >= 45 && rotationDegrees < 135) {
            form = "streaks";
        } else { // rotation < 45 || rotation > 135
            form = "shafts";
        }
    } else if (zoom > 50 && widthMax < 60 && rotationRange < 30) {
        form = "match sticks";
    } else if (zoom > 50 && widthMax < 60 && rotationRange < 60) {
        form = "scattered match sticks";
    } else if (zoom > 50 && widthMin > 70 && widthMax < 110 && rotationRange > 10 && rotationRange < 40) {
        form = "twigs";
    } else if (zoom > 50 && widthMin > 70 && widthMax < 110 && rotationRange > 10 && rotationRange < 60) {
        form = "scattered twigs";
    } else if (zoom > 80 &&widthMax < 60 && rotationRange > 130) {
        form = "birds nest";
    } else if ( zoom > 70 && rotationRange < 70 && widthMin > 200 && (rotationDegrees <= 25 || rotationDegrees >= 155)) {
        form = "pillars";
    } else if ( zoom > 70 && rotationRange < 70 && widthMin > 200 && (rotationDegrees <= 115 && rotationDegrees >= 65)) {
        form = "bricks";
    } else if (zoom > 55 && widthMin > 70 && rotationRange >= 5 && rotationRange <= 30 && (rotationDegrees <= 10 || rotationDegrees >= 170)) {
        form = "cluttered books";
    } else if (zoom > 55 && widthMin > 70 && rotationRange <= 30 && rotationDegrees >= 80 && rotationDegrees <= 100) {
        form = "stacked books";
    } else if (zoom > 55 && widthMin > 70 && rotationRange < 60 && rotationDegrees >= 50 && rotationDegrees <= 130) {
        form = "tumbling books";
    } else if (zoom > 55 && widthMin > 50 && widthMax < 150 && rotationRange < 50 && rotationDegrees >= 80 && rotationDegrees <= 100) {
        form = "broken ladder";
    } else if (zoom > 55 && rotationRange > 10 && rotationRange < 60 && rotationDegrees >= 50 && rotationDegrees <= 130 && widthMax - widthMin >= 150) {
        form = "collapsing building";
    } else if (widthMin > 25 && widthMax < 200 && rotationRange <= 15) {
        form = "jitters";
    } else if (widthMin > 25 && widthMax < 200 && rotationRange <= 45) {
        form = "wobbles";
    } else if ( zoom > 50 && widthMin > 200) {
        form = "blocks";
    } else if ( zoom > 90 && widthMax - widthMin >= 150 && rotationRange > 150) {
        form = "masterpiece";
    } else if (rotationRange > 100 && widthMax < 150) {
        form = "lunacy";
    } else if (rotationRange < 60 && widthMin > 150) {
        form = "tranquility";
    } else if (widthMin > 120) {
        form = "bars";
    } else if (widthMax < 100 && rotationRange > 60) {
        form = "scattered lines";
    } else if (widthMax < 100) {
        form = "lines";
    } else if (zoom > 40 && rotationRange > 90) {
        form = "reverie";
    } else {
        form = "abstraction";
    }

    return form;
}


export default buildTraitsText;