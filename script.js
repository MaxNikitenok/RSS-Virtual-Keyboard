let lineZeroEn = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61]
let lineZeroEnShift = [126, 33, 64, 35, 36, 37, 94, 38, 42, 40, 41, 95, 43]

let lineZeroRu = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61]
let lineZeroRuShift = [1025, 33, 34, 8470, 59, 37, 58, 63, 42, 40, 41, 95, 43]

let lineOneEn = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92]
let lineOneEnShift = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 123, 125, 124]

let lineOneRu = [1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92]
let lineOneRuShift = [1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 47]

let lineTwoEn = [97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39]
let lineTwoEnShift = [65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34]

let lineTwoRu = [97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39]
let lineTwoRuShift = [65, 83, 68, 70, 71, 72, 74, 75, 76, 58, 34]

let lineThreeEn = [122, 120, 99, 118, 98, 110, 109, 44, 46, 47]
let lineThreeEnShift = [90, 88, 67, 86, 66, 78, 77, 60, 62, 63]

let lineThreeRu = [122, 120, 99, 118, 98, 110, 109, 44, 46, 47]
let lineThreeRuShift = [90, 88, 67, 86, 66, 78, 77, 60, 62, 63]

/*document.onkeypress = function (event) {
    lineThreeRuShift.push(event.charCode);
    console.log(lineThreeRuShift)
}
*/
let wrapper = '<div class="wrapper"><div class="input-wrapper"><input type="text"></div><div class="keyboard-wrapper"><div class="line" id="line-zero"><div class="service-keys" id="backspace">backspace</div></div><div class="line" id="line-one"><div class="service-keys" id="tab">tab</div><div class="service-keys" id="del">del</div></div><div class="line" id="line-two"><div class="service-keys" id="caps-lock">caps lock</div><div class="service-keys" id="enter">enter</div></div><div class="line" id="line-three"><div class="service-keys shift" id="left-shift">shift</div><div class="service-keys shift" id="right-shift">shift</div></div><div class="line" id="line-four"><div class="service-keys ctrl" id="ctrl-left">ctrl</div><div class="service-keys" id="win">win</div><div class="service-keys alt" id="alt-left">alt</div><div class="service-keys" id="space"></div><div class="service-keys alt" id="alt-right">alt</div><div class="service-keys ctrl" id="ctrl-right">ctrl</div><div class="service-keys" id="page-left">l</div><div class="" id="up-down"><div class="page-up-down" id="page-up">u</div><div class="page-up-down" id="page-down">d</div></div><div class="service-keys" id="page-right">r</div></div></div></div>'

document.body.insertAdjacentHTML('afterbegin', wrapper)

const backspace = document.querySelector('#backspace')
const del = document.querySelector('#del')
const enter = document.querySelector('#enter')
const rightShift = document.querySelector('#right-shift')

function init(selector, arr) {
    let out = '';
    for(let i = 0; i < arr.length; i++) {
        out += '<div class="key">' + String.fromCharCode(arr[i]) + '</div>';
    }
    selector.insertAdjacentHTML('beforebegin', out);
}

init(backspace, lineZeroEn)
init(del, lineOneEn)
init(enter, lineTwoEn)
init(rightShift, lineThreeEn)