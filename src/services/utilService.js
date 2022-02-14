import { functionsIn } from "lodash";

export function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


export const checkFields = (fields, isSign) => {
    const missingFields = Object.keys(fields).filter(field => {
        if (!isSign && field === 'email') return false
        return !fields[field]
    }).join(', ')
    return missingFields
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




export const reOrderList = (list, destIdx, sourceIdx) => {
    list = [...list]
    const [source] = list.splice(sourceIdx, 1)
    list.splice(destIdx, 0, source)
    return list
}


// export const reOrderList = (list, destIdx, sourceIdx) => {
//     const newList = []
//     for (let i = 0; i < list.length; i++) {
//         if (destIdx >= sourceIdx) {

//             if (i >= sourceIdx && i < destIdx) {
//                 newList.push(list[i + 1])
//             } else if (i === destIdx) {
//                 newList.push(list[sourceIdx])
//             } else {
//                 newList.push(list[i])
//             }
//         } else {
//             if (i > destIdx && i <= sourceIdx) {
//                 newList.push(list[i - 1])
//             } else if (i === destIdx) {
//                 newList.push(list[sourceIdx])
//             } else {
//                 newList.push(list[i])
//             }
//         }

//     }

//     return newList
// }


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


export const refreshTokenSetup = (res) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        console.log('newAuthRes:', newAuthRes);
        // saveUserToken(newAuthRes.access_token);  <-- save new token
        localStorage.setItem('authToken', newAuthRes.id_token);

        // Setup the other timer after the first one
        setTimeout(refreshToken, refreshTiming);
    };

    // Setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
};

export const copyToClipboard = (text) => navigator.clipboard.writeText(text);

export const sleep = (time = 0) => new Promise((resolve) => setTimeout(resolve, time))

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export const capitalizeSentence = sentence => sentence.split(' ').map(capitalize).join(' ')

export const goToTop = () => window.scrollTo(0, 0);





export const getAmountToScale = (from, to) => {
    const fromAmount = _convertToGrams(from)
    const toAmount = _convertToGrams(to)

    if (!fromAmount || !toAmount) return null
    return (fromAmount / toAmount).toFixed(2)
}


function _convertToGrams({ name, amount, units }) {

    name = name.trim().toLocaleLowerCase()

    if (units === 'g') return amount

    if (units === 'Kg') return amount * 1000

    if (units === 'oz') return amount * 28.35



    // * if units = 'Units' than the amount will stay the same
    amount = _convertToMl(amount, units)

    const ingredientMap = ingredientsDataMap[name]

    // * if we have data on this ingredient we'll do some more calculations based on its name
    if (ingredientMap) {

        if (units === 'units') {
            const { wightPerUnit } = ingredientMap
            amount *= wightPerUnit

        } else { // * its most likely a liquid, so well calculate based on density (g/ml)
            const { density } = ingredientMap
            amount *= density
        }
    } else {
        if (units === 'units') return null
    }


    return amount
}


function _convertToMl(amount, units) {

    if (units === 'L') {
        amount *= 1000
    } else if (units === 'cup') {
        amount *= 236.588
    } else if (units === 'oz') {
        amount *= 28.35
    } else if (units === 'tableSpoon') {
        amount *= 14.7868
    } else if (units === 'teaSpoon') {
        amount *= 4.92892
    }

    return amount
}

function formatStrForMapping(str) {
    const strs = str.split(' ')
    if (strs.length === 1) {
        // if ()
    }
}

const ingredientsDataMap = {

    water: {
        density: 1
    },

    'מים': {
        density: 1
    },

    vinegar: {
        density: 1.01
    },

    'חומץ': {
        density: 1.01
    },

    oil: {
        density: 0.917
    },

    'olive oil': {
        density: 0.917
    },

    'שמן זית': {
        density: 0.917
    },

    'שמן': {
        density: 0.917
    },

    milk: {
        density: 1.03
    },

    'חלב': {
        density: 1.03
    },

    maple: {
        density: 1.37
    },

    'maple syrup': {
        density: 1.37
    },
    'סירופ מייפל': {
        density: 1.37
    },

    'מייפל': {
        density: 1.37
    },

    honey: {
        density: 1.424
    },
    'דבש': {
        density: 1.424
    },

    mirin: {
        density: 1.05
    },
    'מירין': {
        density: 1.05
    },

    flour: {
        density: 0.79

    },
    'קמח': {
        density: 0.79

    },

    salt: {
        density: 2.16
    },
    
    'מלח': {
        density: 2.16
    },

    sugar: {
        density: 1.59
    },

    'סוכר': {
        density: 1.59
    },

    egg: {
        wightPerUnit: 49
    },

    eggs: {
        wightPerUnit: 49
    },

    'ביצים': {
        wightPerUnit: 49
    },
    'ביצה': {
        wightPerUnit: 49
    },

    garlic: {
        wightPerUnit: 4.5
    },
    
    'שום': {
        wightPerUnit: 4.5
    },

    'garlic clove': {
        wightPerUnit: 4.5
    },

    'שיני שום': {
        wightPerUnit: 4.5
    },

    'garlic bulb': {
        wightPerUnit: 59
    },

    'ראש שום': {
        wightPerUnit: 59
    },

    onion: {
        wightPerUnit: 150
    },

    'בצל': {
        wightPerUnit: 150
    },

    onions: {
        wightPerUnit: 150
    },


}




