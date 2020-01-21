import convert from 'convert-units';
import {
    CLOUD,
    SUN,
    RAIN,
    SNOW,
    THUNDER,
    DRIZZLE
} from './../../constants/weathers';

export const getTemp = kelvin => {
    return Number(convert(kelvin).from('K').to('C').toFixed(0));
}

export const getWeatherState = weather_data => {
    const { id } = weather_data;

    if (id < 300) {
        return THUNDER;
    } else if (id < 400) {
        return DRIZZLE;
    } else if (id < 600) {
        return RAIN;
    } else if (id < 700) {
        return SNOW;
    } else if (id < 800) {
        return SUN;
    } else {
        return CLOUD;
    }

}

 