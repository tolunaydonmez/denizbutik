$(function () {
  var topSwiper = new Swiper(".swiper-container-top", {
    autoplay: {
      delay: 3000,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var midSwiper = new Swiper(".swiper-container-mid", {
    slidesPerView: 5,
    spaceBetween: 24,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var bottomSwiper = new Swiper(".swiper-container-bottom", {
    slidesPerView: 4,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  /* Back to Top */
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $("#myBtn").fadeIn();
    } else {
      $("#myBtn").fadeOut();
    }
  });
  $("#myBtn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500);
  });
});
