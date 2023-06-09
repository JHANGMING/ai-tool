/*Swiper*/
function initSwiper() {
  /* 
  id="comment-swiper" 區塊是我想要使用 swiper 套件的範圍
  要抓取 id "#comment-swiper"
  */
  const swiper = new Swiper("#comment-swiper", {
    /*  預設要顯示幾個卡片 */
    slidesPerView: 1,
    /* 斷點設定 */
    breakpoints: {
      /* 螢幕寬度大於等於 992px 時切換為 3 欄 */
      992: {
        slidesPerView: 3
      },
      /* 螢幕寬度大於等於 768px 時切換為 2 欄 */
      768: {
        slidesPerView: 2
      },
      /* 更小都顯示 1 欄 */
      0: {
        slidesPerView: 1
      }
    },
    /* 卡片元素的間隔 */
    spaceBetween: 20,
    pagination: {
      /* 我想將分頁圓點綁在哪個 class */
      el: ".swiper-pagination",
      /* 將輪播設定為可以點擊分頁圓點來切換圖片 */
      clickable: true
    }
  });
}

initSwiper();

/*dropdown-btn*/
/* 開起選單 */
$(".dropdown-btn").click(function (e) {
  $(".dropdown-menu").toggleClass("show");
});


/* 篩選選單 */
$(".filter").click(function (e) {
  $(".all-model").toggleClass("show");
});

/* check */
$('.model').click(function (e) {
  $(this).find(".check").toggleClass("show");
});

/*  切換按鈕文字  */
$(".new-to-old").click(function (e) {
  e.preventDefault();
  $(".dropdown-menu").toggleClass("show");
  $(".dropdown-btnText").text($(".new-to-old").text());
});

$(".old-to-new").click(function (e) {
  e.preventDefault();
  $(".dropdown-menu").toggleClass("show");
  $(".dropdown-btnText").text($(".old-to-new").text());
});

/*  常見問題 展開  */
$('.question-item').click(function (e) { // 選擇具有 '.qa-item' 的元素，點擊時執行以下代碼
  $(this).toggleClass('active');  // 將 '.qa-item' 切換為 active 樣式，若已有 active 樣式則刪除此樣式
  $(this).find('.collapse-content p').toggleClass('show'); // 尋找 '.collapse-content p' 切換 'show' 樣式，若已經有此樣式則刪除樣式
});


/* Navbar */
$(".header-btn").click(function (e) {
  $(".header-collapse").toggleClass("show");
});

/* scrollToTop */
$(document).ready(function () {
  $("#scrollToTop").click(function (e) {
    $("html,body").animate({ scrollTop: 0 }, 1000);
  });
});