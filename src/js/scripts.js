function createNewElement(element, selector) {

  let el = document.createElement(element);
  el.classList.add(selector);
  // document.body.appendChild(el);
  document.body.insertAdjacentElement('afterBegin', el);
  console.log(el);
}

function appInit() {
  console.log('app init');
  createNewElement('div', 'selector-search-app');
}

function createElement(tag, props, ...children) {

  const element = document.createElement(tag);

  Object.keys(props).forEach(key => (element[key] = props[key]));

  children.forEach(child => {

    if (typeof child === "string") {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
}

const span = createElement(
  "span", { className: "result-value" },
  'Hi!!!'
);
const paragraph = createElement(
  "p", { className: "temperature-value" },
  "Вы ввели: ",
  span
);

console.log(paragraph);
document.addEventListener("DOMContentLoaded", appInit);
