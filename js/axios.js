const apiPath = 'https://2023-engineer-camp.zeabur.app';
const list = document.querySelector('.list');
let worksData = []
let pagesData = {}

let data = {
  type: '',
  sort: 0,
  page: 1,
  search: '',
}

function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}&` : ''}${search ? `search=${search}` : ''}`
  axios.get(apiUrl)
    .then(function (res) {
      // console.log(res.data)
      worksData = res.data.ai_works.data;
      pagesData = res.data.ai_works.page;


      rendercards()
    })
}

getData(data);

// 作品選染至畫面
function rendercards() {
  let html=worksData.map((item) =>
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
  if (worksData.length == 2 || worksData.length == 5) {
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

// 搜尋
const search = document.querySelector('.search');
search.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    data.search = search.value
    data.page = 1
    getData(data);
  }
})

// const filterMenu = document.querySelector(".filter-menu");
// const filter = document.querySelector(".filter");
// function getCategories() {
//   let newworksData = worksData.map((item) => item.type);
//   let sorted = newworksData.filter(
//     (item, index) => newworksData.indexOf(item) === index
//   );
//   renderCategories(sorted);
// }
// function renderCategories(sorted) {
//   let str = '<li class="mb-xxs"><a href="#全部">全部</a></li>';
//   let html = sorted
//     .map((item) => `<li class="mb-xxs"><a href="#${item}">${item}</a></li>`)
//     .join("");
//   filterMenu.innerHTML = str+html;
// }

// filter.addEventListener('click', (e) => {
//   e.preventDefault();
//   getCategories()
//   console.log(e)
//   // if (item.textContent === '全部') {
//   //   data.type = '';
//   // } else {
//   //   data.type = item.textContent;
//   // }
//   // getData(data)
// })

