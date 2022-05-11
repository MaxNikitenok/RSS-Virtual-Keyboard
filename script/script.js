import { en, enShift, enCapsShift, ru, ruShift, ruCapsShift, codeOfKey } from './keys.js';
import { getCaretPosition, setCaretPosition } from './delete.js';

const wrapper = '<div class="wrapper"><textarea class="output" value=""></textarea><div class="keyboard-wrapper"></div><div class="description"><p>Клавиатура создана в операционной системе Windows<br>Комбинация для переключения языка: ctrl + alt</p></div></div>';

document.body.insertAdjacentHTML('afterbegin', wrapper);

function initKeys(arr, keycode) {
  let out = '';
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].length === 1) {
      out += `<div class="key keys" data="${keycode[i]}">${arr[i]}</div>`;
    } else {
      out += `<div class="service-key keys ${keycode[i]}" id="${keycode[i]}" data="${keycode[i]}">${arr[i]}</div>`;
    }
  }
  document.querySelector('.keyboard-wrapper').insertAdjacentHTML('beforeEnd', out);
}

if (localStorage.getItem('lang') === 'eng' || localStorage.getItem('lang') === null) {
  initKeys(en, codeOfKey);
} else if (localStorage.getItem('lang') === 'rus') {
  initKeys(ru, codeOfKey);
}

const keys = document.querySelectorAll('.keys');
const letterKeys = document.querySelectorAll('.key');
const output = document.querySelector('.output');

let capsOn = false;
let rusOn = false;
let shiftOn = false;

keys.forEach((key) => {
  key.addEventListener('mousedown', function down() {
    if (this.classList.contains('Backspace')) {
      const str = output.value;
      let start = getCaretPosition(output).start;
      let end = getCaretPosition(output).end;
      output.value = str.substring(0, start - 1) + str.substring(end, output.value.length);
      start -= 1;
      end -= 1;
      setCaretPosition(output, start, end);
    } else if (this.classList.contains('Space')) {
      const str = output.value;
      let start = getCaretPosition(output).start;
      let end = getCaretPosition(output).end;
      output.value = str.substring(0, start) + ' ' + str.substring(end, output.value.length);
      start += 1;
      end += 1;
      setCaretPosition(output, start, end);
    } else if (this.classList.contains('Enter')) {
      const str = output.value;
      let start = getCaretPosition(output).start;
      let end = getCaretPosition(output).end;
      output.value = `${str.substring(0, start)}\n${str.substring(end, output.value.length)}`;
      start += 1;
      end += 1;
      setCaretPosition(output, start, end);
    } else if (this.classList.contains('Delete')){
      const str = output.value;
      let start = getCaretPosition(output).start;
      let end = getCaretPosition(output).end;
      output.value = str.substring(0, start) + str.substring(end + 1, output.value.length);
      setCaretPosition(output, start, end);
    } else if (this.classList.contains('Tab')) {
      const str = output.value;
      let start = getCaretPosition(output).start;
      let end = getCaretPosition(output).end;
      output.value = str.substring(0, start) + '    ' + str.substring(end, output.value.length);
      start += 4;
      end += 4;
      setCaretPosition(output, start, end);
    } else if (this.classList.contains('CapsLock')) {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        letterKeys.forEach((key) => {
          key.innerText = key.innerText.toUpperCase();
          capsOn = true;
        });
      } else {
        letterKeys.forEach((key) => {
          key.innerText = key.innerText.toLowerCase();
          capsOn = false;
        });
      }
    } else if (this.classList.contains('ShiftLeft') || this.classList.contains('ShiftRight')) {
      if (rusOn === false && capsOn === false) {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = enShift[i];
        }
        capsOn = true;
      } else if (rusOn === false && capsOn === true) {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = enCapsShift[i];
        }
        capsOn = false;
      } else if (rusOn === true && capsOn === false) {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = ruShift[i];
        }
        capsOn = true;
      } else {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = ruCapsShift[i];
        }
        capsOn = false;
      }
    } else if (this.innerText.length < 2) {
      const str = output.value;
      let start = getCaretPosition(output).start;
      let end = getCaretPosition(output).end;
      output.value = `${str.substring(0, start)}${this.innerText}${str.substring(end, output.value.length)}`;
      start += 1;
      end += 1;
      setCaretPosition(output, start, end);
    }
  });
  key.addEventListener('mouseup', function up() {
    if (this.classList.contains('ShiftLeft') || this.classList.contains('ShiftRight')) {
      if (rusOn === false && capsOn === true) {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = en[i];
        }
        capsOn = false;
      } else if (rusOn === false && capsOn === false) {
        for (let i = 0; i < en.length; i += 1) {
          if (en[i].length < 2) keys[i].innerText = en[i].toUpperCase();
        }
        capsOn = true;
      } else if (rusOn === true && capsOn === true) {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = ru[i];
        }
        capsOn = false;
      } else {
        for (let i = 0; i < en.length; i += 1) {
          if (ru[i].length < 2) keys[i].innerText = ru[i].toUpperCase();
        }
        capsOn = true;
      }
    }
    output.focus();
  });
});

document.onkeydown = function keydown(event) {
  const anyKey = document.querySelector(`.keyboard-wrapper .keys[data="${event.code}"]`);
  if (event.code === 'CapsLock') {
    anyKey.classList.toggle('active');
    if (anyKey.classList.contains('active')) {
      letterKeys.forEach((key) => {
        key.innerText = key.innerText.toUpperCase();
        capsOn = true;
      });
    } else {
      letterKeys.forEach((key) => {
        key.innerText = key.innerText.toLowerCase();
        capsOn = false;
      });
    }
  } else {
    anyKey.classList.add('active');
  }
  if (event.code === 'Space') {
    event.preventDefault();
    const str = output.value;
    let start = getCaretPosition(output).start;
    let end = getCaretPosition(output).end;
    output.value = str.substring(0, start) + ' ' + str.substring(end, output.value.length);
    setCaretPosition(output, start, end);
  }
  if (anyKey.innerText.length < 2) {
    event.preventDefault();
    const str = output.value;
    let start = getCaretPosition(output).start;
    let end = getCaretPosition(output).end;
    output.value = `${str.substring(0, start)}${anyKey.innerText}${str.substring(end, output.value.length)}`;
    start += 1;
    end += 1;
    setCaretPosition(output, start, end);
  }
  if ((event.code === 'ShiftLeft' || event.code === 'ShiftRight') && shiftOn === false) {
    if (rusOn === false && capsOn === false) {
      for (let i = 0; i < en.length; i += 1) {
        keys[i].innerText = enShift[i];
      }
      capsOn = true;
    } else if (rusOn === false && capsOn === true) {
      for (let i = 0; i < en.length; i += 1) {
        keys[i].innerText = enCapsShift[i];
      }
      capsOn = false;
    } else if (rusOn === true && capsOn === false) {
      for (let i = 0; i < en.length; i += 1) {
        keys[i].innerText = ruShift[i];
      }
      capsOn = true;
    } else {
      for (let i = 0; i < en.length; i += 1) {
        keys[i].innerText = ruCapsShift[i];
      }
      capsOn = false;
    }
    shiftOn = true;
  }
  if (event.code === 'AltLeft' || event.code === 'AltRight') event.preventDefault();
  if (event.code === 'Tab') {
    event.preventDefault();
    const str = output.value;
    let start = getCaretPosition(output).start;
    let end = getCaretPosition(output).end;
    output.value = `${str.substring(0, start)}    ${str.substring(end, output.value.length)}`;
    start += 4;
    end += 4;
    setCaretPosition(output, start, end);
  }
  output.focus();

  document.onkeyup = function up(ev) {
    if (ev.code !== 'CapsLock') {
      keys.forEach((key) => {
        if (!key.classList.contains('CapsLock')) key.classList.remove('active');
      });
    }
    if ((ev.code === 'ShiftLeft' || ev.code === 'ShiftRight') && shiftOn === true) {
      if (rusOn === false && capsOn === true) {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = en[i];
        }
        capsOn = false;
      } else if (rusOn === false && capsOn === false) {
        for (let i = 0; i < en.length; i += 1) {
          if (en[i].length < 2) keys[i].innerText = en[i].toUpperCase();
        }
        capsOn = true;
      } else if (rusOn === true && capsOn === true) {
        for (let i = 0; i < en.length; i += 1) {
          keys[i].innerText = ru[i];
        }
        capsOn = false;
      } else {
        for (let i = 0; i < en.length; i += 1) {
          if (ru[i].length < 2) keys[i].innerText = ru[i].toUpperCase();
        }
      }
      shiftOn = false;
    }
  };
};

function changeLang(fun, ...codes) {
  const pressed = new Set();
  document.addEventListener('keydown', function kd(event) {
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
    for (let i = 0; i < en.length; i += 1) {
      keys[i].innerText = en[i];
    }
    rusOn = false;
    localStorage.removeItem('lang');
    localStorage.setItem('lang', 'eng');
  } else {
    for (let i = 0; i < ru.length; i += 1) {
      keys[i].innerText = ru[i];
    }
    rusOn = true;
    localStorage.removeItem('lang');
    localStorage.setItem('lang', 'rus');
  }
}

changeLang(initKeyLang, 'AltLeft', 'ControlLeft');
changeLang(initKeyLang, 'AltRight', 'ControlRight');
