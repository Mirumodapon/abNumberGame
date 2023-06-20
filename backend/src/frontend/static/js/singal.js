const startBtn = document.querySelector('#start');
const enterBtn = document.querySelector('#enter');
const resetBtn = document.querySelector('#reset');
const setup = document.querySelector('#setup');
const spinner = document.querySelector('#spinner');
const gameRegion = document.querySelector('#game-region');
const ansInput = document.querySelector('#ans');
const tableBody = document.querySelector('#result');

var times = 1;
var isBingo = false;

(function () {
  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', reset);
  enterBtn.addEventListener('click', submit);
  ansInput.addEventListener('keydown', (event) => event.key === 'Enter' && submit());

  fetch('/api/signal/gaming', { method: 'get', credentials: 'same-origin' })
    .then((resp) => resp.json())
    .then(({ gaming }) => void (gaming ? _continue() : reset()));
})();

function _continue() {
  setup.style.display = 'none';
  spinner.style.display = 'none';
  gameRegion.style.display = 'block';
  resetBtn.style.display = 'none';
  enterBtn.disabled = false;

  ansInput.focus();
}

function start() {
  setup.style.display = 'none';
  spinner.style.display = 'block';

  fetch('/api/signal/new', { method: 'put', credentials: 'same-origin' }).then(
    (x) => void _continue()
  );
}

function reset() {
  setup.style.display = 'flex';
  spinner.style.display = 'none';
  gameRegion.style.display = 'none';
  tableBody.innerHTML = '';
  resetBtn.style.display = 'none';
  times = 1;
  isBingo = false;
}

function submit() {
  if (isBingo) return;
  enterBtn.disabled = true;
  enterBtn.innerHTML =
    '<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>';

  const value = ansInput.value;

  fetch(`/api/signal/${value}`, { method: 'get', credentials: 'same-origin' })
    .then((resp) => resp.json())
    .then((data) => {
      const { msg, bingo, invalid } = data;
      const _class = `${bingo ? 'text-success' : ''} ${invalid ? 'text-danger' : ''}`;
      const item = `<tr class="${_class}"><td scope="row">${times++}</td><td>${value}</td><td>${msg}</td></tr>`;
      tableBody.innerHTML += item;
      return bingo;
    })
    .then((bingo) => {
      if (bingo) {
        enterBtn.innerHTML = 'Bingo';
        resetBtn.style.display = 'inline';
        isBingo = true;
      } else {
        enterBtn.innerHTML = 'Enter';
        enterBtn.disabled = false;
      }

      ansInput.value = '';
    });
}
