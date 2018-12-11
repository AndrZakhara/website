let inputValue = '';
let selectedElement = '';

function createAppStructure() {
  const inputSearch = createElement('input', { className: 'search-input', type: 'text', placeholder: 'Selector' });
  const btnSearch = createElement('input', { className: 'search-btn', type: 'button', value: 'search' });
   
  const btnPrev = createElement('input', { className: 'prev-btn', type: 'button', value: 'Prev' });
  const btnNext = createElement('input', { className: 'next-btn', type: 'button', value: 'Next' });
  const btnParent = createElement('input', { className: 'parent-btn', type: 'button', value: 'Parent' });
  const btnChildren = createElement('input', { className: 'children-btn', type: 'button', value: 'Children' });
  
  const textFieldWrapper = createElement('div', { className: 'text-field-wrapper' }, inputSearch, btnSearch);
  const btnWrapper = createElement('div', { className: 'btn-wrapper' }, btnPrev, btnNext, btnParent, btnChildren);
  
  const mainAppWrapper = createElement('div', { className: 'selector-search-app' }, textFieldWrapper, btnWrapper);

  btnSearch.addEventListener('click', onclickSearch);

  document.body.insertAdjacentElement('afterBegin', mainAppWrapper);
}

const onclickSearch = (e) => {
  inputValue = document.querySelector('.search-input').value;
  
  document.querySelector('.search-input').value = '';
  console.log(inputValue);
  addClass();
}

const addClass = () => {
  console.log('add class');
  console.log(selectedElement);
  
  if(selectedElement === '') {
    const selected = document.querySelector(inputValue);
    
    if (selected !== undefined && selected !== null) {
      selectedElement = selected;
      selectedElement.classList.add('selected-element-search');
    }
    console.log(selectedElement); 
    
  } 
  else if(selectedElement !== null || selectedElement !== undefined) {
    selectedElement.classList.remove('selected-element-search');
    const selected = document.querySelector(inputValue);
    
    if (selected !== undefined && selected !== null) {
      selectedElement = selected;
      selectedElement.classList.add('selected-element-search');
    }
  }
 
}
const removeClass = () => {
  console.log('remove class');
}

function appInit() {
  createAppStructure();
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

document.addEventListener("DOMContentLoaded", appInit);
