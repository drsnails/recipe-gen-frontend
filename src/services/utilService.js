
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

