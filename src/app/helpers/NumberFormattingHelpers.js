export const FormatNumber = (numArg, digits = 2) => {
    let num = Math.round(numArg);
    if(num < 1000) return num;
    let units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    let floor = Math.floor(Math.abs(num).toString().length / 3);
    let value = +(num / Math.pow(1000, floor))
    return value.toFixed(value > 1 ? digits : 2) + units[floor - 1];
}