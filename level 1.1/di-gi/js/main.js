$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
      loop: true,
      nav: true,
      navText: [
        '<i class="fa-solid fa-angle-left fa-2x"></i>',
        '<i class="fa-solid fa-angle-right fa-2x"></i>'
      ],
      autoWidth: true,
      items: 1,
      autoplay: true,
      autoplayTimeout: 3500,
      autoplayHoverPause: true
    });
  });