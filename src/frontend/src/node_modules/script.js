const _R = document.getElementById('temp'),
_O = document.querySelector('output'),
_F = _R.parentNode,
OPTS = ['min', 'max'];

let val = +_R.value;

function update(s) {
  if (val !== +_R[OPTS[.5 * (1 + s)]]) {
    val += s;

    _F.style.setProperty('--val', val);
    _R.setAttribute('value', val);
    _O.textContent = val;
  }
};

addEventListener('click', e => {
  const _T = e.target;

  if (_T.tagName.toLowerCase() === 'button') {
    e.preventDefault();
    update(+_T.style.getPropertyValue('--s'));
  }
}, false);

_R.addEventListener('change', e => {
  update(+_R.value - val);
}, false);