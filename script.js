let En = [
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'delete',
    'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter',
    'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', ' ˄ ', 'shift',
    'ctrl', 'Alt', '', 'Alt', 'ctrl', ' ˂ ', ' ˅ ', ' ˃ '
]
let EnShift = [
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+','backspace',
    'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'delete',
    'caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
    'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '˄', 'shift',
    'ctrl', 'Alt', '', 'Alt', 'ctrl', '˂', '˅', '˃'
]
let Ru = [
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=','backspace',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'delete',
    'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
    'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '˄', 'shift',
    'ctrl', 'Alt', '', 'Alt', 'ctrl', '˂', '˅', '˃'
]
let RuShift = [
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+','backspace',
    'tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'delete',
    'caps lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
    'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', ' ˄ ', 'shift',
    'ctrl', 'Alt', '', 'Alt', 'ctrl', ' ˂ ', ' ˅ ', ' ˃ '
]

let codeOfKey = [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal','Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
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



initKeys(En, codeOfKey)

let keys = document.querySelectorAll('.keys')
let letterKeys = document.querySelectorAll('.key')
const keyPad = document.querySelector('.keyboard-wrapper')
const output = document.querySelector('.output')
const capsLock = document.querySelector('#CapsLock')

if(keys && keyPad && output) {
    keys.forEach(key => {
        key.addEventListener('click', function(){
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
            } else if (this.innerText === '˂' || this.innerText === '˃' || this.innerText === '˄' || this.innerText === '˅') {
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
    } else if(event.code === 'ArrowLeft' || event.code === 'ArrowDown' || event.code === 'ArrowRight' || event.code === 'ArrowUp') {
    } else if (anyKey.innerText.length < 2) {
        output.innerText += anyKey.innerText
    }
    document.onkeyup = function (event) {
        if (event.code === 'CapsLock') {
        } else {
            
            keys.forEach(key => key.classList.remove('active'))
        }
        
    }
    
}

function changeLang(fun, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();

      fun();
    });

    function del () {
      document.querySelector('#ShiftLeft').classList.remove('active')
      document.querySelector('#AltLeft').classList.remove('active')
    };

    setInterval(del, 1000)

  }

  changeLang(
    () => {
        if (keyPad.classList.contains('rus')) {
            for(let i =0; i<En.length; i++) {
                keys[i].innerText = En[i]
        }
        keyPad.classList.remove('rus');
        capsLock.classList.remove('active');
        } else {
            for(let i =0; i<Ru.length; i++) {
            keys[i].innerText = Ru[i]
    }
    keyPad.classList.add('rus');
    capsLock.classList.remove('active');
        }
},
    "AltLeft",
    "ShiftLeft"
  );
