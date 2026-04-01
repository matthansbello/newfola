import SwiperCore, {
  Autoplay,
  EffectCreative,
  EffectFade,
  Grid,
} from "swiper";

SwiperCore.use([
  EffectFade,
  Autoplay,
  Grid,
  EffectCreative,
]);

export const home1SliderProps = {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  effect: "fade" as const,
  fadeEffect: {
    crossFade: true,
  },
};

export const HomeGridSliderProps = {
  slidesPerView: 3,
  spaceBetween: 50,
  centeredSlides: true,
  speed: 1000,
  loop: true,
  mousewheel: true,
  preventInteractionOnTransition: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    },
  },
};

export const HomeGridFullySliderProps = {
  slidesPerView: 3,
  spaceBetween: 0,
  centeredSlides: true,
  speed: 1000,
  loop: true,
  mousewheel: true,
  preventInteractionOnTransition: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    },
  },
};

export const jsTestimonials = {
  slidesPerView: 2,
  spaceBetween: 50,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    },
  },
};

export const ourWorkCarousel = {
  slidesPerView: "auto" as const,
  spaceBetween: 100,
  speed: 700,
  loop: false,
  pagination: false,
  breakpoints: {
    0: {
      spaceBetween: 30,
    },
    768: {
      spaceBetween: 50,
    },
    1200: {
      spaceBetween: 100,
    },
  },
};

