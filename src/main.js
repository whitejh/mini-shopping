// 자바스크립트는 어플리케이션의 비즈니스 로직을 담당
// data.json 파일을 이용해서 동적으로 요소를 추가
// loadItems() 함수는 fetch를 이용해서
// 데이터(items)를 동적으로받아온 다음에
// 받아온 데이터가 성공적이면 json으로 변환하고
// json 안에 있는 items들을 return 한다

// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json") //경로를 지정하면 간단하게 데이터 받아옴
    .then((response) => response.json()) //성공하면  response 객체 전달, response의 API인 .json()을 이용해서 response 바디를 json의 object로 변환
    .then((json) => json.items); //json의 items 데이터들만 전달됨
}

// Update the list with the given items
function displayItems(items) {
  //받아온 items 데이터를 html요소로 변환해서 페이지에 표시
  const container = document.querySelector(".items"); //items의 변수 설정
  container.innerHTML = items.map((item) => createHTMLString(item)).join(""); // 각각 데이터를 html의 li 태그로 변환, map() : 한가지 배열을 다른 배열로 변환
}
//.join()을 하면 한가지의 큰 문자열로 만들 수 있다 = li들이 계속 반복해서 들어가 있는 문자열

// Create HTML list item from the given data item
function createHTMLString(item) {
  // 문자열 반환할 때 사용
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `; // 문자열의 부분은 json 파일의 데이터에서 가져와서 다르게 표기
}

// Handle Button Click (화면에서 버튼이 클릭되었을 때 data-key, data-value값 출력)
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key; // event안에 target안에 dataset안에 key
  const value = dataset.value;

  if (key == null || value == null) {
    // 필터링할 정보가 없는 경우
    return;
  }

  const filtered = items.filter((item) => item[key] === value); //key와 value 둘다 들어있다면, displayItems()이용해서 해당 데이터의 key와 value만 보여지게 함
  displayItems(filtered); // 버튼 클릭하면 화면에 필터링된 items들만 화면에 보여짐
}
//filter(): 배열에서 특정한 데이터만 다시 추출해서 새로운 작은 배열 만듦
//item에 있는 key에 해당하는 값 === value 같을 때만 골라서 displayItems로 전달

function setEventListeners(items) {
  const logo = document.querySelector(".logo"); //이벤트의 위임: 이벤트들이 들어있는 container에 이벤트를 등록, 한곳에서만 핸들링 할 수 있게 함
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items)); //로고가 선택되면 모든 아이템이 보여짐. 전에 만든 함수 사용
  buttons.addEventListener("click", (event) => onButtonClick(event, items)); //버튼 클릭하면 이벤트 처리. 이벤트가 발생한 event 인자로 전달. items도 인자로 전달
}

// main (함수 호출하는 부분 먼저 만들기)
loadItems() //JSON에 있는 데이터를 동적으로 받아와서 items 전달해줌. 시간이 걸리기 때문에 promise를 리턴
  .then((items) => {
    //Promise 성공적으로 되면 items 받아옴
    displayItems(items); //items들을 HTML에 보여줌
    setEventListeners(items); //버튼 누르면 필터링하는 함수
  })
  .catch(console.log); //예외처리 (실패하면 에러 메세지 출력)
