export function getCaretPosition(area) {
  if (area.selectionStart || area.selectionStart === '0') {
    return {
      start: area.selectionStart,
      end: area.selectionEnd,
    };
  } else {
    return {
      start: 0,
      end: 0,
    };
  }
}

export function setCaretPosition(area, start, end) {
  area.focus();
  area.setSelectionRange(start, end);
}
