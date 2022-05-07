let En = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace'],
    ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'delete'],
    ['caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
    ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', ' ˄ ', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', ' ˂ ', ' ˅ ', ' ˃ ']
]
let EnShift = [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','backspace'],
    ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'delete'],
    ['caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter'],
    ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '˄', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', '˂', '˅', '˃']
]
let Ru = [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace'],
    ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'delete'],
    ['caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
    ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '˄', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', '˂', '˅', '˃']
]
let RuShift = [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+','backspace'],
    ['tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'delete'],
    ['caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter'],
    ['shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', ' ˄ ', 'shift'],
    ['ctrl', 'Alt', '', 'Alt', 'ctrl', ' ˂ ', ' ˅ ', ' ˃ ']
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



let wrapper = '<div class="wrapper"><pre class="output"></pre><div class="keyboard-wrapper"></div></div>'

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
            out += '<div class="service-key keys ' + (keycode[i]) + '" id="' + (keycode[i]) + '" data="' + (keycode[i]) + '">' + (arr[i]) + '</div>';
        }
    }
    document.querySelector('.keyboard-wrapper').insertAdjacentHTML('beforeEnd', out);
}



initKeys(En[0], codeOfKey[0])
initKeys(En[1], codeOfKey[1])
initKeys(En[2], codeOfKey[2])
initKeys(En[3], codeOfKey[3])
initKeys(En[4], codeOfKey[4])

let keys = document.querySelectorAll('.keys')
let letterKeys = document.querySelectorAll('.key')
let keyPad = document.querySelectorAll('.keyboard-wrapper')
const output = document.querySelector('.output')

if(keys && keyPad && output) {
    keys.forEach(key => {
        key.addEventListener('click', function(){
            //console.log(this.innerText);
            if(this.classList.contains('Backspace')) {
                let str = output.innerText;
                output.innerText = str.substring(0, (str.length-1));
            } else if(this.classList.contains('Space')) {
                output.innerText += ' ';
            } else if (this.classList.contains('CapsLock')) {
                this.classList.toggle('active')
                if (this.classList.contains('active')) {
                    letterKeys.forEach( key =>{
                        key.innerText = key.innerText.toUpperCase()
                    })
                } else {
                    letterKeys.forEach( key =>{
                        key.innerText = key.innerText.toLowerCase()
                    })
                }
            } else if (this.innerText.length < 2){
                output.innerText += this.innerText
            }
        })
    })
}

document.onkeydown = function (event) {
let anyKey = document.querySelector('.keyboard-wrapper .keys[data="'+ event.code +'"]')
    if (event.code === 'CapsLock') {
        anyKey.classList.toggle('active');
        if(anyKey.classList.contains('active')) {
            letterKeys.forEach( key =>{
                key.innerText = key.innerText.toUpperCase()
            })
        } else {
            letterKeys.forEach( key =>{
                key.innerText = key.innerText.toLowerCase()
            })
        }
    } else {
        anyKey.classList.add('active');
    }
    if (event.code === 'Space') {
        output.innerText += ' ';
    } else if (anyKey.innerText.length < 2) {
        output.innerText += anyKey.innerText
    }

    document.onkeyup = function (event) {
        if (event.code === 'CapsLock') {
        } else {
            anyKey.classList.remove('active');
        }
        
    }
}

