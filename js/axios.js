const apiPath = 'https://2023-engineer-camp.zeabur.app';
const list = document.querySelector('.list');
const pagination = document.querySelector('.pagination');


let worksData = []
let pagesData = {}

let data = {
  type: '',
  sort: 0,
  page: "1",
  search: '',
}


function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}&` : ''}${search ? `search=${search}` : ''}`
  axios.get(apiUrl)
    .then(function (res) {
      // console.log(res.data)
      worksData=res.data.ai_works.data;
      pagesData = res.data.ai_works.page.total_pages;
      if (worksData.length === 0) {
        return alert(`您輸入或選擇的關鍵字，沒有符合條件的卡片`)
      }
      console.log(worksData);
      // console.log(pagesData);
      rendercards(worksData)
      renderpaginator(pagesData)
      getCategories()
    })
}

getData(data);


// 作品選染至畫面
function rendercards(data) {
  let html = data.map((item) =>
    `<li class="card card-br d-column mb-lg br-sm">
      <div class="img">
        <img src="${item.imageUrl}"alt="ai image">
      </div>
      <div class="list-title px-sm">
        <h3 class="title title-font-900 font-sm mt-xs ">${item.title}</h3>
        <p class="content-p content-p-font my-sm">${item.description}</p>
      </div>
      <div class="list-ai d-flex-jfsp px-sm py-sm">
        <p class="fw-700">AI 模型</p>
        <span>${item.model}</span>
      </div>
      <div class="list-text d-flex-jfsp px-sm py-sm">
        <p>#${item.type}</p>
        <a href="${item.link}" target="_blank">
          <span class="material-icons card-icon">share</span>
        </a>
      </div>
    </li>
    `
  ).join("");
  if (data.length == 2 || data.length == 5) {
    html += `<li class="card d-column mb-lg br-sm"></li>`
  }
  list.innerHTML = html;
}

// 切換作品排序
const newToOld = document.querySelector(".new-to-old");
const oldToNew = document.querySelector(".old-to-new");
//  由新到舊 -> sort = 0
newToOld.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 0;
  getData(data);
});
//  由舊到新 -> sort = 1
oldToNew.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 1
  getData(data);
})

// 關鍵字搜尋
const search = document.querySelector('.search');
search.addEventListener('keydown', (e) => {
  const searchvalue = search.value.trim().toLowerCase();
  if (e.keyCode === 13) {
    data.search = searchvalue
    data.page = 1
    getData(data);
    if (searchvalue.length === 0) {
      return alert(`您輸入的關鍵字為空白，請重新輸入`)
    }
  }
})

//塞選btn
const filterAIMenu = document.querySelector(".filter-ai-model");
const filterTypeMenu = document.querySelector(".filter-type-model");
const filter = document.querySelector(".filter");
let filterMenu=[];
function getCategories() {
  let newAIData = worksData.map((item) => item.model);
  let aisorted = newAIData.filter(
    (item, index) => newAIData.indexOf(item) === index
  );
  renderCategories(aisorted);
}
function renderCategories(aisorted) {
  let str = '<li class="all-model-title font-xxs fw-700 mb-xxs">AI模型</li><li class="model d-flex-jfsp mb-xxs mouse-h" ><div class="model-content">所有模型</div><span class="check material-icons">check</span></li >';
  let html = aisorted
    .map((item) => `<li class="model d-flex-jfsp mb-xxs mouse-h">
                  <div class="model-content">${item}</div>
                  <span class="check material-icons">check</span>
                </li>`)
    .join("");
  filterAIMenu.innerHTML = str+html;
  modelMenu()
}

function modelMenu(){
  const model = document.querySelectorAll(".model");
  model.forEach((item) =>item.addEventListener("click", function (e) {
    const target = e.target
    if (target.matches('.model-content')) {
      if (!target.nextElementSibling.classList.contains("show")){
        filterMenu.push(target.textContent)
        filterbtnselect()
      }else{
        const index = filterMenu.findIndex((item) => item === target.textContent);
        // console.log(index)
        filterMenu.splice(index, 1)
        filterbtnselect()
      }
      target.nextElementSibling.classList.toggle("show");
      // console.log(target.textContent)
    } else if (target.matches('.model')){
      
      if (!target.lastElementChild.classList.contains("show")) {
        filterMenu.push(target.firstElementChild.textContent)
        filterbtnselect()
      } else {
        const index = filterMenu.findIndex((item) => item === target.firstElementChild.textContent);
        // console.log(index)
        filterMenu.splice(index, 1)
        filterbtnselect()
      }
      target.lastElementChild.classList.toggle("show");
      // console.log(target.firstElementChild.textContent)
    }
    })
  )
}

//塞選btn接API
function filterbtnselect(item){
  console.log(filterMenu)
  if (filterMenu.length === 0){
    data.type = '';
  }else{
    for (let i = 0; i < filterMenu.length;i++){
      data.type=filterMenu[i];
      // getData(data);
      // console.log(data.type)
    }
    // console.log(data.type)
  }

}

// 切換作品類型
const searchlistbtn = document.querySelectorAll('.searchlistbtn')
searchlistbtn.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.textContent === '全部') {
      data.type = '';
    } else {
      data.type = item.textContent;
    }
    getData(data)
  })
})

//建立分頁meau
function renderpaginator(amount) {
  let rawhtml = "";
  let str = '<li class="px-xs py-xs"><a href="#6">></a></li>';
  for (let newpage = 1; newpage <= amount; newpage++) {
    rawhtml += `<li class="px-xs py-xs mr-xs"><a href="#${newpage}" data-page="${newpage}">${newpage}</a></li>`
  }
  pagination.innerHTML = rawhtml + str;
}

//分頁點擊
pagination.addEventListener('click', function onpaginatorClicked(e) {
  if (e.target.tagName !== 'A') return
  const page = Number(e.target.dataset.page)
  data.page=page;
  getData(data);
})

