
export function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


export const checkFields = (fields) => {
    const missingFields = Object.keys(fields).filter(field => !fields[field]).join(', ')
    return missingFields
}






export const getAmountToScale = (from, to) => {
    const fromAmount = _convertToGrams(from)
    const toAmount = _convertToGrams(to)
    return (fromAmount / toAmount).toFixed(2)
}

const _convertToGrams = ({ amount, units }) => {

    if (units === 'L' || units === 'Kg') {
        amount *= 1000
    } else if (units === 'cup') {
        amount *= 128
    } else if (units === 'oz') {
        amount *= 28.35
    } else if (units === 'tableSpoon') {
        amount *= 14.7868
    } else if (units === 'teaSpoon') {
        amount *= 4.92892
    }


    return amount
}