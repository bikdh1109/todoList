const addBtn = document.querySelector('.fa-plus'); // 항목 추가 버튼
const input = document.querySelector('.footer_input'); // input 요소
const items = document.querySelector('.items'); // ul 요소
let progress = document.querySelector('.progress'); // progress

// li 요소 생성 함수
function createItem(text) {
  const itemRow = document.createElement('li');
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  itemRow.className = 'item';
  itemRow.innerHTML = `<span>${text}</span>
            <p>${month}월${day}일</p>
            <i class="fa-regular fa-circle-check"></i>
            <i class="fa-solid fa-trash-can"></i>`;

  //체크버튼 클릭시 클래스 추가 이벤트
  itemRow.querySelector('.fa-circle-check').addEventListener('click', () => {
    itemRow.classList.toggle('item_done');
    updateProgress();
  });

  //삭제 버튼 클릭시 itemRow 제거 이벤트
  itemRow.querySelector('.fa-trash-can').addEventListener('click', () => {
    itemRow.remove();
    updateProgress();
  });

  // setTimeout(() => itemRow.scrollIntoView({ block: 'center' }), 0);
  requestAnimationFrame(() => itemRow.scrollIntoView({ block: 'center' }), 0);

  return itemRow;
}
function updateProgress() {
  let total = items.childElementCount;
  const completed = document.getElementsByClassName('item_done');
  let percent = 0;
  if (total === 0) {
    percent = 0;
  } else {
    percent = (Math.round(completed.length) / total) * 100;
  }

  document.querySelector('.progress').style.width = percent + '%';
  document.querySelector('.progress-percent').innerHTML =
    Math.floor(percent) + '%';
}

function onAdd() {
  const text = input.value.trim();

  if (!text) {
    input.value = '';
    input.focus();
    return;
  }

  // li생성하는 함수 - createItem(text)
  // ul에 생성값을 추가함

  items.appendChild(createItem(text));

  input.value = '';
  input.focus();
  updateProgress();
}

// 이벤트 등록
addBtn.addEventListener('click', onAdd);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    onAdd();
  }
});

// input.addEventListener('keyup', (e) => {
//   e.key === 'Enter' && onAdd;
// });
