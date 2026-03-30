declare global {
  interface Window {
    Splitting?: any;
  }
}

export function initCursor() {
  let mouseX = window.innerWidth / 2,
    mouseY = window.innerHeight / 2;

  const cursorEl = document.querySelector(".cursor") as HTMLElement;
  
  if (!cursorEl) return;

  let cursor = {
    el: cursorEl,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    w: 30,
    h: 30,
    update: function () {
      let l = this.x - this.w / 2;
      let t = this.y - this.h / 2;
      this.el.style.transform = "translate3d(" + l + "px," + t + "px, 0)";
    },
  };

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const link = document.querySelectorAll(
    "a, .swiper-pagination, .swiper-button-prev, .swiper-button-next, button, .button, .btn, .lnk"
  );
  link.forEach((linkItem) => {
    linkItem.addEventListener("mouseenter", () => {
      cursor.el.classList.add("cursor-zoom");
    });
    linkItem.addEventListener("mouseleave", () => {
      cursor.el.classList.remove("cursor-zoom");
    });
  });

  setInterval(move, 1000 / 60);
  function move() {
    cursor.x = lerp(cursor.x, mouseX, 0.1);
    cursor.y = lerp(cursor.y, mouseY, 0.1);
    cursor.update();
  }
  function lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end;
  }
}

export const activeAnimation = () => {
  const progress_inner = document.querySelectorAll(".scroll-animate"),
    triggerBottom = (window.innerHeight / 5) * 5 - 20;
  progress_inner.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      (box as HTMLElement).style.visibility = "visible";
      box.classList.add("animate__active");
    }
  });
};

