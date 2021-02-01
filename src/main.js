// 자바스크립트는 어플리케이션의 비즈니스 로직을 담당
// data.json 파일을 이용해서 동적으로 요소를 추가

// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}
// loadItems() 함수는 fetch를 이용해서
// 데이터(items)를 동적으로받아온 다음에
// 받아온 데이터가 성공적이면 json으로 변환하고
// json 안에 있는 items들을 return 한다

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

// 버튼이 클릭되었을 때 처리되는 함수
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

// main
loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
