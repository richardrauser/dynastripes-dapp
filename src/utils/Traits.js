

function buildTraitsText(_zoom, _tintRed, _tintGreen, _tintBlue, _tintAlpha, _rotationDegrees, _rotationRange, _stripeWidthMin, _stripeWidthMax, _speedMin, _speedMax) {

        // adjective
        var speed;

        if (_speedMax <= 25 && _tintAlpha < 180) {
            speed = "manic";
        } else if (_speedMin == _speedMax) {
            if (_speedMax < 30) {
                speed = "blinking";
            } else if (_speedMax > 200) {
                speed = "throbbing";
            } else {
                speed = "pulsing";        
            }
        } else if (_speedMax < 35) {
            speed = "quivering";
        } else if (_speedMax < 100) {
            speed = "flickering";
        } else if (_speedMax < 150) {
            speed = "vibrating";
        } else if (_speedMin > 200) {
            speed = "languid";
        } else if (_speedMin > 150) {
            speed = "pedestrian";
        } else if (_speedMax - _speedMin > 150) {
            speed = "scintillating";        
        } else {
            speed = "oscillating";
        } 
        
         //adjective
        var colourWay; 

        if (_tintAlpha > 127) {
            const difference = 150;
            if (_tintAlpha > 200 && _tintRed < 50 && _tintGreen < 50 && _tintBlue < 50) {
                colourWay = "gloomy";
            } else if (_tintAlpha > 200 && _tintRed > 200 && _tintGreen > 200 && _tintBlue > 200) {
                colourWay = "pale";
            } else if (_tintRed > _tintGreen && _tintRed - _tintGreen >= difference && _tintRed > _tintBlue && _tintRed - _tintBlue >= difference) {
                colourWay = "red";
            } else if (_tintGreen > _tintRed && _tintGreen - _tintRed >= difference && _tintGreen > _tintBlue && _tintGreen - _tintBlue >= difference) {
                colourWay = "green";
            } else if (_tintBlue > _tintRed && _tintBlue - _tintRed >= difference && _tintBlue > _tintGreen && _tintBlue - _tintGreen >= difference) {
                colourWay = "blue";
            } else if (_tintRed > _tintGreen && _tintRed - _tintGreen >= difference && _tintBlue > _tintGreen && _tintBlue - _tintGreen >= difference) {
                colourWay = "violet";
            } else if (_tintRed > _tintBlue && _tintRed - _tintBlue >= difference && _tintGreen > _tintBlue && _tintGreen - _tintBlue >= difference) {
                colourWay = "yellow";
            } else if (_tintBlue > _tintRed && _tintBlue - _tintRed >= difference && _tintGreen > _tintRed && _tintGreen - _tintRed >= difference) {
                colourWay = "cyan";
            } else {
                colourWay = "saturated";
            }
        } else if (_tintAlpha == 0) {
            colourWay = "kaleidoscopic";
        } else if (_tintAlpha < 25) {
            colourWay = "chromatic";
        } else if (_tintAlpha < 50) {
            colourWay = "vivid";
        } else if (_tintAlpha < 85) {
            colourWay = "tinged";
        } else {
            colourWay = "tinted"; // medium tint
        }

        // noun
        var form;
        _rotationDegrees = _rotationDegrees % 180; // because forms rotated 180 degrees are the same.

        if (_rotationRange == 0) {
            if (_zoom > 50 && _rotationDegrees % 90 == 0) {
                form = "perfect square";
            } else if (_zoom > 91 && (_rotationDegrees == 45 || _rotationDegrees == 135)) {
                form = "perfect diamond";
            } else if (_zoom <= 50 && _rotationDegrees == 0) {
                form = "vertical stripes";
            } else if (_zoom <= 50 && _rotationDegrees % 90 == 0) {
                form = "horizontal stripes";
            } else if (_zoom <= 25) {
                form = "diagonal stripes";
            } else {
                form = "rotated square";
            }
        } else if (_zoom < 30) {
            if (_zoom < 20 && _stripeWidthMin > 70 && _rotationRange < 60 && _rotationRange > 10) {
                form = "ribbons";
            } else if ( _zoom < 20 && _rotationRange < 30 && _stripeWidthMin > 200) {
                form = "banners";
            } else if (_zoom < 20 && _stripeWidthMax < 75 && _rotationRange < 60 && _rotationRange > 10) {
                form = "streamers";
            } else if (_stripeWidthMax < 60 && _rotationRange > 130) {
                form = "laser beams";
            } else if (_stripeWidthMin > 120) {
                form = "streaks";
            } else if (_stripeWidthMax < 120) {
                form = "poles";
            } else {
                form = "shafts";
            }
        } else if (_zoom > 50 && _stripeWidthMax < 60 && _rotationRange < 30) {
            form = "match sticks";
        } else if (_zoom > 50 && _stripeWidthMax < 110 && _stripeWidthMin > 70 && _rotationRange < 60) {
            form = "french fries";
        } else if (_zoom > 80 &&_stripeWidthMax < 60 && _rotationRange > 130) {
            form = "birds nest";
        } else if ( _zoom > 70 && _rotationRange < 70 && _stripeWidthMin > 200 && (_rotationDegrees <= 25 || _rotationDegrees >= 155)) {
            form = "pillars";
        } else if ( _zoom > 70 && _rotationRange < 70 && _stripeWidthMin > 200 && (_rotationDegrees <= 115 && _rotationDegrees >= 65)) {
            form = "bricks";
        } else if (_zoom > 60 && _stripeWidthMin > 70 && _rotationRange <= 30 && _rotationRange >= 5 && (_rotationDegrees <= 5 || _rotationDegrees >= 175)) {
            form = "cluttered books";
        } else if (_zoom > 55 && _stripeWidthMin > 70 && _rotationRange <= 30 && _rotationDegrees >= 85 && _rotationDegrees <= 95) {
            form = "stacked books";
        } else if (_zoom > 55 && _stripeWidthMin > 50 && _stripeWidthMax < 150 && _rotationRange < 50 && _rotationDegrees >= 80 && _rotationDegrees <= 100) {
            form = "broken ladder";
        } else if (_stripeWidthMin > 25 && _stripeWidthMax < 200 && _rotationRange <= 15) {
            form = "jitters";
        } else if (_stripeWidthMax < 40) {
            form = "twiglets";
        } else if (_zoom > 60 && _rotationRange < 60 && _rotationDegrees >= 50 && _rotationDegrees <= 130 && _stripeWidthMax - _stripeWidthMin >= 150) {
            form = "collapsing building";
        } else if ( _zoom > 50 && _stripeWidthMin > 200) {
            form = "blocks";
        } else if ( _zoom > 90 && _stripeWidthMax - _stripeWidthMin >= 150 && _rotationRange > 150) {
            form = "masterpiece";
        } else if (_rotationRange > 100 && _stripeWidthMax < 150) {
            form = "lunacy";
        } else if (_rotationRange < 60 && _stripeWidthMin > 150) {
            form = "tranquility";
        } else if (_stripeWidthMin > 120) {
            form = "bars";
        } else if (_stripeWidthMax < 100) {
            form = "lines";
        } else {
            form = "abstraction";
        }

    var descriptiveTraits = "";

    if (speed.length > 0) {
        descriptiveTraits += speed + " "; 
    }
    if (colourWay.length > 0) {
        descriptiveTraits += colourWay + " "; 
    }
    if (form.length > 0) {
        descriptiveTraits += form;
    }

    return descriptiveTraits;
}

export default buildTraitsText;