
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

export const getIdxEquality = (currIdx, ingIdx) => {
    if (ingIdx === null) return ''
    if (currIdx === ingIdx) {
        return 'equal'
    }

    if (currIdx > ingIdx) {
        return 'smaller'
    }


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



export const reOrderList = (list, destIdx, sourceIdx) => {
    const newList = []
    for (let i = 0; i < list.length; i++) {
        if (destIdx >= sourceIdx) {

            if (i >= sourceIdx && i < destIdx) {
                newList.push(list[i + 1])
            } else if (i === destIdx) {
                newList.push(list[sourceIdx])
            } else {
                newList.push(list[i])
            }
        } else {
            if (i > destIdx && i <= sourceIdx) {
                newList.push(list[i - 1])
            } else if (i === destIdx) {
                newList.push(list[sourceIdx])
            } else {
                newList.push(list[i])
            }
        }

    }

    return newList
}


export const selectText = ({ target }) => {
    window.setTimeout(function () {
        var sel, range;
        if (window.getSelection && document.createRange) {
            range = document.createRange();
            range.selectNodeContents(target);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (document.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(target);
            range.select();
        }
    }, 1);
};

export const copyToClipboard = (text) => navigator.clipboard.writeText(text);

export const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time))