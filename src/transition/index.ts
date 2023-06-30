interface Conf {
  name: string;
  enterFrom: null | string;
  enterActive: null | string;
  enterTo: null | string;
  leaveFrom: null | string;
  leaveActive: null | string;
  leaveTo: null | string;
}

function renderClass(name: string, prefix: string) {
  if (name) {
    return `${prefix}-${name}`;
  } else {
    return null;
  }
}

class Transition extends HTMLElement {
  #shadow: ShadowRoot | null = null;
  #conf: Conf = {
    name: "",
    enterFrom: null,
    enterActive: null,
    enterTo: null,
    leaveFrom: null,
    leaveActive: null,
    leaveTo: null,
  };
  #timer = null;
  constructor() {
    super();
    const template = document.createElement("template");

    const css = ``;

    const html = `<slot></slot>`;

    template.innerHTML = `
    <style>${css}</style>
    ${html}
    `;

    this.#shadow = this.attachShadow({
      mode: "open",
    });

    this.#shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["open"];
  }

  get open() {
    return this.getAttribute("open");
  }

  set open(val: string | undefined | null) {
    if (val) {
      this.setAttribute("open", val);
    } else {
      this.removeAttribute("open");
    }
  }

  connectedCallback() {
    const dataset = this.dataset;
    this.#conf.name = dataset.name || "";
    this.#conf.enterFrom = renderClass("enter-from", dataset["name"] as string);
    this.#conf.enterActive = renderClass(
      "enter-active",
      dataset["name"] as string
    );
    this.#conf.enterTo = renderClass("enter-to", dataset["name"] as string);
    this.#conf.leaveFrom = renderClass("leave-from", dataset["name"] as string);
    this.#conf.leaveActive = renderClass(
      "leave-active",
      dataset["name"] as string
    );
    this.#conf.leaveTo = renderClass("leave-to", dataset["name"] as string);
  }

  attributeChangedCallback(attr: string, val: any, oldVal: any) {
    switch (attr) {
      case "open":
        this.watchOpenHandler(oldVal, val);
        break;

      default:
        break;
    }
  }

  watchOpenHandler(val: any, oldVal: any) {
    if (val !== oldVal) {
      if (this.#timer !== null) {
        clearTimeout(this.#timer);
        this.#timer = null;
      }
      if (val !== null) {
        if (this.#conf.enterFrom) this.classList.add(this.#conf.enterFrom);
        this.style.display = "block";
        if (this.#conf.enterActive) this.classList.add(this.#conf.enterActive);

        requestAnimationFrame(() => {
          if (this.#conf.enterTo) this.classList.add(this.#conf.enterTo);
          if (this.#conf.enterFrom) this.classList.remove(this.#conf.enterFrom);
        });
        setTimeout(() => {
          if (this.#conf.enterTo) this.classList.remove(this.#conf.enterTo);
          if (this.#conf.enterActive)
            this.classList.remove(this.#conf.enterActive);
        }, 800);
      } else {
        if (this.#conf.leaveFrom) this.classList.add(this.#conf.leaveFrom);
        if (this.#conf.leaveActive) this.classList.add(this.#conf.leaveActive);

        requestAnimationFrame(() => {
          if (this.#conf.leaveTo) this.classList.add(this.#conf.leaveTo);
          if (this.#conf.leaveFrom) this.classList.remove(this.#conf.leaveFrom);
        });
        setTimeout(() => {
          if (this.#conf.leaveTo) this.classList.remove(this.#conf.leaveTo);
          if (this.#conf.leaveActive)
            this.classList.remove(this.#conf.leaveActive);
          this.style.display = "none";
        }, 800);
      }
    }
  }
}

export const defineComponent = (tag: string = "ivy-transition") => {
  if (window.customElements.get(tag)) {
    return;
  }
  window.customElements.define(tag, Transition);
};
