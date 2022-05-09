import {en, enShift, enCapsShift, ru, ruShift, ruCapsShift, codeOfKey} from './keys.js';

let wrapper = '<div class="wrapper"><textarea class="output" value=""></textarea><div class="keyboard-wrapper"></div><div class="description"><p>Клавиатура создана в операционной системе Windows<br>Комбинация для переключения языка: ctrl + alt</p></div></div>'

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

if(localStorage.getItem('lang') === 'eng' || localStorage.getItem('lang') === null) {
    initKeys(en, codeOfKey)
} else if (localStorage.getItem('lang') === 'rus') {
    initKeys(ru, codeOfKey)
}





let keys = document.querySelectorAll('.keys')
let letterKeys = document.querySelectorAll('.key')
const keyPad = document.querySelector('.keyboard-wrapper')
const output = document.querySelector('.output')

let capsOn = false;
let rusOn = false 

if(keys && keyPad && output) {
    keys.forEach(key => {
        key.addEventListener('mousedown', function(){
            if(this.classList.contains('Backspace')) {
                let str = output.value;
                output.value = str.substring(0, (str.length-1));
            } else if(this.classList.contains('Space')) {
                output.value += ' ';
            } else if(this.classList.contains('Tab')) {
                output.value += '    ';
            } else if (this.classList.contains('CapsLock')) {
                this.classList.toggle('active')
                if (this.classList.contains('active')) {
                    letterKeys.forEach( key =>{
                        key.innerText = key.innerText.toUpperCase()
                        capsOn = true
                    })
                } else {
                    letterKeys.forEach( key =>{
                        key.innerText = key.innerText.toLowerCase()
                        capsOn = false
                    })
                }
            } else if (this.classList.contains('ShiftLeft') || this.classList.contains('ShiftRight')) {
                if (rusOn === false && capsOn === false) {
                    for(let i =0; i<en.length; i++) {
                        keys[i].innerText = enShift[i]
                    }
                        capsOn = true;
                } else if (rusOn === false && capsOn === true) {
                    for(let i =0; i<en.length; i++) {
                        keys[i].innerText = enCapsShift[i]
                    }
                        capsOn = false
                } else if (rusOn === true && capsOn === false) {
                    for(let i =0; i<en.length; i++) {
                        keys[i].innerText = ruShift[i]
                    }
                        capsOn = true
                } else {
                    for(let i =0; i<en.length; i++) {
                        keys[i].innerText = ruCapsShift[i]
                    }
                        capsOn = false
                }
            } else if (this.innerText.length < 2){
                output.value += this.innerText
            }
        })
        key.addEventListener('mouseup', function(){
            if (this.classList.contains('ShiftLeft') || this.classList.contains('ShiftRight')) {
                if (rusOn === false && capsOn === true) {
                    for(let i =0; i<en.length; i++) {
                        keys[i].innerText = en[i]
                    }
                        capsOn = false;
                } else if (rusOn === false && capsOn === false) {
                    for(let i =0; i<en.length; i++) {
                        if (en[i].length<2) keys[i].innerText = en[i].toUpperCase()
                    }
                        capsOn = true
                } else if (rusOn === true && capsOn === true) {
                    for(let i =0; i<en.length; i++) {
                        keys[i].innerText = ru[i]
                    }
                        capsOn = false
                } else {
                    for(let i =0; i<en.length; i++) {
                        if (ru[i].length<2) keys[i].innerText = ru[i].toUpperCase()
                    }
                        capsOn = true
                }
            }
        })
    })
}

let shiftOn = false

document.onkeydown = function (event) {
    let anyKey = document.querySelector('.keyboard-wrapper .keys[data="'+ event.code +'"]')
    if (event.code === 'CapsLock') {
        anyKey.classList.toggle('active');
        if(anyKey.classList.contains('active')) {
            letterKeys.forEach( key =>{
                key.innerText = key.innerText.toUpperCase()
                capsOn = true
            })
        } else {
            letterKeys.forEach( key =>{
                key.innerText = key.innerText.toLowerCase()
                capsOn = false
            })
        }
    } else {
        anyKey.classList.add('active');
    }
    if (event.code === 'Space') {
        output.value += ' ';
    } else if (anyKey.innerText.length < 2) {
        output.value += anyKey.innerText
    }
    if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && shiftOn === false) {
        if (rusOn === false && capsOn === false) {
            for(let i =0; i<en.length; i++) {
                keys[i].innerText = enShift[i]
            }
                capsOn = true;
        } else if (rusOn === false && capsOn === true) {
            for(let i =0; i<en.length; i++) {
                keys[i].innerText = enCapsShift[i]
            }
                capsOn = false
        } else if (rusOn === true && capsOn === false) {
            for(let i =0; i<en.length; i++) {
                keys[i].innerText = ruShift[i]
            }
                capsOn = true
        } else {
            for(let i =0; i<en.length; i++) {
                keys[i].innerText = ruCapsShift[i]
            }
                capsOn = false
        }
        shiftOn = true
    }
    if (event.code === 'AltLeft' || event.code === 'AltRight') event.preventDefault()
    if (event.code === 'Tab') {
        event.preventDefault()
        output.value += '    ';
    }

    document.onkeyup = function (event) {
        if (event.code === 'CapsLock') {
        } else {
            keys.forEach(key => {
                if (!key.classList.contains('CapsLock')) key.classList.remove('active')
            })
        }
        if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && shiftOn === true) {
            if (rusOn === false && capsOn === true) {
                for(let i =0; i<en.length; i++) {
                    keys[i].innerText = en[i]
                }
                    capsOn = false;
            } else if (rusOn === false && capsOn === false) {
                for(let i =0; i<en.length; i++) {
                    if (en[i].length<2) keys[i].innerText = en[i].toUpperCase()
                }
                    capsOn = true
            } else if (rusOn === true && capsOn === true) {
                for(let i =0; i<en.length; i++) {
                    keys[i].innerText = ru[i]
                }
                    capsOn = false
            } else {
                for(let i =0; i<en.length; i++) {
                    if (ru[i].length<2) keys[i].innerText = ru[i].toUpperCase()
                }
                    capsOn = true
            }
            shiftOn = false
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
    if (rusOn === true) {
        for(let i =0; i<en.length; i++) {
            keys[i].innerText = en[i]
        }
        rusOn = false ;
        localStorage.removeItem('lang')
        localStorage.setItem('lang', 'eng');
        console.log()
    } else {
        for(let i =0; i<ru.length; i++) {
            keys[i].innerText = ru[i]
        }
        rusOn = true;
        localStorage.removeItem('lang')
        localStorage.setItem('lang', 'rus');
    }
}

  changeLang(initKeyLang, "AltLeft", "ControlLeft");
  changeLang(initKeyLang, "AltRight","ControlRight");