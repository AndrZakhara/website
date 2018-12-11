let inputValue = '',
    selectedElement = '',
    previous = false,
    next = false,
    parent = false,
    parentNode = '',
    children = false,
    childrenNode = '';

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
  
  btnSearch.disabled = true;
  btnPrev.disabled = true;
  btnNext.disabled = true;
  btnParent.disabled = true;
  btnChildren.disabled = true;

  btnSearch.addEventListener('click', handleSearch);
  inputSearch.addEventListener('input', handleInput);
  btnParent.addEventListener('click', handleParent);

  document.body.insertAdjacentElement('afterBegin', mainAppWrapper);
}

const handleSearch = (e) => {
  inputValue = document.querySelector('.search-input').value;
  
  document.querySelector('.search-input').value = '';
  console.log(inputValue);
  addClass();
}
const handleInput = (e) => {  
  if(e.target.value === '') {
    document.querySelector('.search-btn').disabled = true;
  } 
  else {
    document.querySelector('.search-btn').disabled = false;
  };
}
const handleParent = () => {
  selectedElement.classList.remove('selected-element-search');
  selectedElement = parentNode;
  selectedElement.classList.add('selected-element-search');
  findRelative(selectedElement);
}

const addClass = () => {
  console.log('add class');
  console.log(selectedElement);
  
  if(selectedElement === '') {
    const selected = document.querySelector(inputValue);
    
    if (selected !== undefined && selected !== null) {
      selectedElement = selected;
      selectedElement.classList.add('selected-element-search');
      findRelative(selectedElement);
    }
    console.log(selectedElement); 
    
  } 
  else if(selectedElement !== null || selectedElement !== undefined) {
    selectedElement.classList.remove('selected-element-search');
    const selected = document.querySelector(inputValue);
    
    if (selected !== undefined && selected !== null) {
      selectedElement = selected;
      selectedElement.classList.add('selected-element-search');
      findRelative(selectedElement);
    }
  }

  document.querySelector('.search-btn').disabled = true;
  scrollToElement('.selected-element-search'); 
}
const removeClass = () => {
  if(selectedElement !== null || selectedElement !== undefined) {
    selectedElement.classList.remove('selected-element-search');
  }
}

function scrollToElement(theElement) {
    if (typeof theElement === "string") theElement = document.querySelector(theElement);
    var selectedPosX = 0;
    var selectedPosY = 0;
    while (theElement != null) {
        selectedPosX += theElement.offsetLeft;
        selectedPosY += theElement.offsetTop;
        theElement = theElement.offsetParent;
    }
    selectedPosY = selectedPosY-20;
    window.scrollTo(selectedPosX, selectedPosY);
}

function appInit() {
  createAppStructure();
}

function findRelative(element) {
  const tagNameParent = element.parentNode.tagName;
  const child = element.children[0];
  // console.log(element.childNodes);
  console.log(`tag: ${tagNameParent}`);
  console.log(`tagChild: ${child}`);

  if(element.parentNode !== undefined 
    && tagNameParent !== 'BODY'
    && tagNameParent !== 'HTML'
    && tagNameParent !== 'document'
    && tagNameParent !== undefined
    ) {
    console.log(element.parentNode);
    document.querySelector('.parent-btn').disabled = false;
    parentNode = element.parentNode;
  } else {
    document.querySelector('.parent-btn').disabled = true;
    parentNode = '';
  }
  if(child !== undefined) {    
    document.querySelector('.children-btn').disabled = false;
    childrenNode = child.tagName;
  } else {    
    document.querySelector('.children-btn').disabled = true;
    childrenNode = '';
  }
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
