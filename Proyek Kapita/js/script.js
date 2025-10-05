function getWordValue(orientation, num){
  const inputs = Array.from(board.querySelectorAll(`input[data-word="${orientation}-${num}"]`));
  inputs.sort((a,b)=> parseInt(a.dataset.index)-parseInt(b.dataset.index));
  return inputs.map(i=> (i.value||'').toUpperCase()).join('');
}

function markWord(orientation,num,ok){
  const inputs = Array.from(board.querySelectorAll(`input[data-word="${orientation}-${num}"]`));
  inputs.forEach(inp=>{
    inp.classList.remove('correct','wrong');
    if(ok) inp.classList.add('correct'); else inp.classList.add('wrong');
  });
}

document.getElementById('checkBtn').addEventListener('click', ()=>{
  across.forEach(w=>{
    const val = getWordValue('across', w.num);
    markWord('across', w.num, val === w.answer);
  });
  down.forEach(w=>{
    const val = getWordValue('down', w.num);
    markWord('down', w.num, val === w.answer);
  });
  alert('✅ Pengecekan selesai — hijau = benar, merah = salah.');
});

document.getElementById('revealBtn').addEventListener('click', ()=>{
  across.forEach(w=>{
    w.answer.split('').forEach((ch,i)=>{
      const inp = board.querySelector(`input[data-word="across-${w.num}"][data-index="${i}"]`);
      if(inp) inp.value = ch;
    });
    markWord('across', w.num, true);
  });
  down.forEach(w=>{
    w.answer.split('').forEach((ch,i)=>{
      const inp = board.querySelector(`input[data-word="down-${w.num}"][data-index="${i}"]`);
      if(inp) inp.value = ch;
    });
    markWord('down', w.num, true);
  });
});

document.getElementById('clearBtn').addEventListener('click', ()=>{
  const inputs = board.querySelectorAll('input');
  inputs.forEach(i=>{
    i.value = '';
    i.classList.remove('correct','wrong');
  });
});

// Data soal
const across = [
  {num:5, row:3, col:7, clue:'5. Hitung hasil dari (-2) + 5=...', answer:'TIGA'},
  {num:7, row:5, col:6, clue:'7. Tentukan hasil dari 3 x 4=...', answer:'DUABELAS'},
  {num:9, row:7, col:7, clue:'9. Hitung hasil dari 9 + 9=...', answer:'DELAPANBELAS'},
  {num:10, row:9, col:6, clue:'10. Hitung 6 - 4=...', answer:'DUA'},
  {num:11, row:9, col:12, clue:'11. Tentukan tanda hasil dari (-9) x (-3)=...', answer:'POSITIF'},
  {num:12, row:12,col:1, clue:'12. Hitung hasil dari (-3)³=...', answer:'MINUSDUAPULUHTUJUH'}
];

const down = [
  {num:1, row:1, col:4, clue:'1. Hitung (-10) + (-10)=...', answer:'MINUSDUAPULUH'},
  {num:2, row:1, col:10, clue:'2.  Nilai mutlak dari -12 adalah...', answer:'DUABELAS'},
  {num:3, row:2, col:8, clue:'3. Diketahui nilai a=3, b=-1, dan c=-2, maka hasil dari 2a+b-4c adalah…', answer:'TIGABELAS'},
  {num:4, row:2, col:12, clue:'4. Jika  suhu air mula-mula 20°C dan setelah dipanaskan naik 60°C,maka suhu akhirnya adalah...', answer:'DELAPANPULUH'},
  {num:6, row:4, col:17, clue:'6.  Lawan dari bilangan positif', answer:'NEGATIF'},
  {num:8, row:7, col:2, clue:'8. Bilangan yang lebih kecil dari nol adalah...', answer:'NEGATIF'}
];

const board = document.getElementById('board');
const cols = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cols'));
const rows = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--rows'));

for(let r=1;r<=rows;r++){
  for(let c=1;c<=cols;c++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.pos = `${r}-${c}`;
    board.appendChild(cell);
  }
}

function getCell(row,col){
  return board.querySelector(`.cell[data-pos="${row}-${col}"]`);
}

function placeWord(word, orientation){
  const letters = word.answer.split('');
  letters.forEach((ch,i)=>{
    let r = word.row + (orientation === 'down' ? i : 0);
    let c = word.col + (orientation === 'across'? i : 0);
    const cell = getCell(r,c);
    if(!cell) return;

    if(!cell.querySelector('input')){
      const input = document.createElement('input');
      input.maxLength = 1;
      input.dataset.word = orientation + '-' + word.num;
      input.dataset.index = i;
      input.dataset.row = r;
      input.dataset.col = c;
      input.dataset.pos = `${r}-${c}`;
      cell.appendChild(input);

      if(i === 0 && !cell.querySelector('.num')){
        const numspan = document.createElement('div');
        numspan.className = 'num';
        numspan.textContent = word.num;
        cell.appendChild(numspan);
      }
    }
  });
}

across.forEach(w => placeWord(w,'across'));
down.forEach(w => placeWord(w,'down'));

// tampilkan clue
function renderClues(){
  const acrossBox = document.getElementById('across-clues');
  const downBox = document.getElementById('down-clues');
  across.forEach(w=>{
    const div = document.createElement('div');
    div.className = 'clue-item';
    div.innerHTML = `<span class="num">${w.num}.</span>${w.clue}`;
    acrossBox.appendChild(div);
  });
  down.forEach(w=>{
    const div = document.createElement('div');
    div.className = 'clue-item';
    div.innerHTML = `<span class="num">${w.num}.</span>${w.clue}`;
    downBox.appendChild(div);
  });
}
renderClues();

// 🎵 kontrol backsound
const backsound = document.getElementById('backsound');
document.getElementById('playMusic').addEventListener('click', ()=> backsound.play());
document.getElementById('pauseMusic').addEventListener('click', ()=> backsound.pause());

