import { Loader } from "./utils/loader";
export const run = () => {
  /*
    Load Swiper
 */
  Promise.all([
    Loader.css("https://unpkg.com/swiper/css/swiper.min.css"),
    Loader.js("https://unpkg.com/swiper/js/swiper.min.js")
  ])
    .then(messages => {
      console.log("Swiper Loaded!", messages);
      document.querySelector("body").classList.add("loaded");
      var distance = screen.width <= 600 ? 20 : 50;
      var swiper = new Swiper(".swiper-container", {
        slidesPerView: "auto",
        spaceBetween: distance,
        centeredSlides: true,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    })
    .catch(error => {
      console.error("Error Loading External Resources!", error);
    });
};
