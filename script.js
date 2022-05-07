let En = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace'],
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'delete'],
    ['caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'U', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', 'L', 'D', 'R']
]
let EnShift = [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','backspace'],
    ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'delete'],
    ['caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter'],
    ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'U', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', 'L', 'D', 'R']
]
let Ru = [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace'],
    ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'delete'],
    ['caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
    ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'U', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', 'L', 'D', 'R']
]
let RuShift = [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+','backspace'],
    ['tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'delete'],
    ['caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter'],
    ['shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'U', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', 'L', 'D', 'R']
]

let codeOfKey = [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal','Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
    ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
]

//document.onkeyup = function (event) {
//    keysKey.push(event.key);
//    console.log(keysKey)
//}



let wrapper = '<div class="wrapper"><pre class="input"></pre><div class="keyboard-wrapper"></div></div>'

document.body.insertAdjacentHTML('afterbegin', wrapper)

//function initServisKeys(arr, keycode) {
   // let out = '';
 //   for(let i = 0; i < arr.length; i++) {
        //out += '<div class="service-key keys" id="' + (keycode[i]) + '" data="' + (keycode[i]) + '">' + (arr[i]) + ///'</div>';
//    }
//    document.querySelector('.keyboard-wrapper').insertAdjacentHTML('afterBegin', out);
//}

function initKeys(arr, keycode) {
    let out = '';
    for(let i = 0; i < arr.length; i++) {
        if (arr[i].length === 1) {
            out += '<div class="key keys" data="' + (keycode[i]) + '">' + arr[i] + '</div>';
        } else {
            out += '<div class="service-key keys" id="' + (keycode[i]) + '" data="' + (keycode[i]) + '">' + (arr[i]) + '</div>';
        }
    }
    document.querySelector('.keyboard-wrapper').insertAdjacentHTML('beforeEnd', out);
}

const backspace = document.querySelector('#Backspace')
const del = document.querySelector('#Delete')
const enter = document.querySelector('#Enter')
const rightShift = document.querySelector('#ShiftRight')
const output = document.querySelector('.keyinput')

initKeys(En[0], codeOfKey[0])
initKeys(En[1], codeOfKey[1])
initKeys(En[2], codeOfKey[2])
initKeys(En[3], codeOfKey[3])
initKeys(En[4], codeOfKey[4])

document.onkeydown = function (event) {
    //console.log(event);
    document.querySelector('.keyboard-wrapper .keys[data="'+ event.code +'"]').classList.add('active');
}

document.onkeyup = function (event) {
    document.querySelector('.keyboard-wrapper .keys[data="'+ event.code +'"]').classList.remove('active');
}



 