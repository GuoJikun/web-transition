import "./style.css";
import { defineComponent } from "./transition/index";

defineComponent();

document.querySelector("#btn")?.addEventListener("click", () => {
  const target = document.querySelector("#target");
  const open = target?.getAttribute("open");
  console.log(open);
  if (open !== null) {
    target?.removeAttribute("open");
  } else {
    target?.setAttribute("open", "open");
  }
});

document.querySelector("#open")?.addEventListener("click", () => {
  requestAnimationFrame(() => {
    document.querySelector("#test")?.classList.add("slide-fade-enter-from");
    document.querySelector("#test")?.classList.add("slide-fade-enter-active");

    document.querySelector("#test")?.classList.add("open");
    document.querySelector("#test")?.classList.remove("hide");
    requestAnimationFrame(() => {
      document
        .querySelector("#test")
        ?.classList.remove("slide-fade-enter-from");
    });

    setTimeout(() => {
      document
        .querySelector("#test")
        ?.classList.remove("slide-fade-enter-active");
    }, 800);
  });
});

document.querySelector("#hide")?.addEventListener("click", () => {
  document.querySelector("#test")?.classList.add("slide-fade-leave-from");
  document.querySelector("#test")?.classList.add("slide-fade-leave-active");

  requestAnimationFrame(() => {
    document.querySelector("#test")?.classList.add("slide-fade-leave-to");
    document.querySelector("#test")?.classList.remove("slide-fade-leave-from");
  });
  setTimeout(() => {
    document
      .querySelector("#test")
      ?.classList.remove("slide-fade-leave-active");
    document.querySelector("#test")?.classList.remove("slide-fade-leave-to");
    document.querySelector("#test")?.classList.add("hide");
  }, 800);
});
