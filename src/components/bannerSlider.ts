import Swiper, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

Swiper.use([Autoplay]);

const swiper = new Swiper(".swiper", {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
  },
});
