import {en, enShift, ru, ruShift, codeOfKey} from './keys.js';

let wrapper = '<div class="wrapper"><textarea class="output" value=""></textarea><div class="keyboard-wrapper"></div></div>'

document.body.insertAdjacentHTML('afterbegin', wrapper)

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

initKeys(en, codeOfKey)

let keys = document.querySelectorAll('.keys')
let letterKeys = document.querySelectorAll('.key')
const keyPad = document.querySelector('.keyboard-wrapper')
const output = document.querySelector('.output')

if(keys && keyPad && output) {
    keys.forEach(key => {
        key.addEventListener('click', function(){
            if(this.classList.contains('Backspace')) {
                let str = output.value;
                output.value = str.substring(0, (str.length-1));
            } else if(this.classList.contains('Space')) {
                output.value += ' ';
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
                output.value += this.innerText
            }
        })
    })
}

document.onkeydown = function (event) {
    event.preventDefault()
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
        output.value += ' ';
    } else if(event.code === 'ArrowLeft' || event.code === 'ArrowDown' || event.code === 'ArrowRight' || event.code === 'ArrowUp') {
    } else if (anyKey.innerText.length < 2) {
        output.value += anyKey.innerText
    }
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        
        if (keyPad.classList.contains('rus')) {
            for(let i =0; i<en.length; i++) {
                keys[i].innerText = ruShift[i]
            }
        } else {
            for(let i =0; i<en.length; i++) {
            keys[i].innerText = enShift[i]
            }
        }
    }
    document.onkeyup = function (event) {
        if (event.code === 'CapsLock') {
        } else {
            keys.forEach(key => key.classList.remove('active'))
        }
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            if (keyPad.classList.contains('rus')) {
                for(let i =0; i<en.length; i++) {
                    keys[i].innerText = ru[i]
                }
            } else {
                for(let i =0; i<en.length; i++) {
                keys[i].innerText = en[i]
                }
            }
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
}

function initKeyLang() {
    if (keyPad.classList.contains('rus')) {
        for(let i =0; i<en.length; i++) {
            keys[i].innerText = en[i]
        }
    keyPad.classList.remove('rus');
    } else {
        for(let i =0; i<ru.length; i++) {
            keys[i].innerText = ru[i]
        }
        keyPad.classList.add('rus');
    }
}

  changeLang(initKeyLang, "AltLeft", "ControlLeft");
  changeLang(initKeyLang, "AltRight","ControlRight");