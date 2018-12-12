(function () {
  let inputValue = '',
    selectedElement = '',
    previousNode = '',
    nextNode = '',
    parentNode = '',
    childrenNode = '';

  function createApp() {
    const inputSearch = createElement('input', {className: 'search-input', type: 'text', placeholder: 'Selector'});
    const btnSearch = createElement('input', {className: 'search-btn', type: 'button', value: 'search'});

    const btnPrev = createElement('input', {className: 'prev-btn', type: 'button', value: 'Prev'});
    const btnNext = createElement('input', {className: 'next-btn', type: 'button', value: 'Next'});
    const btnParent = createElement('input', {className: 'parent-btn', type: 'button', value: 'Parent'});
    const btnChildren = createElement('input', {className: 'children-btn', type: 'button', value: 'Children'});
    const btnClose = createElement('input', {className: 'close-btn', type: 'button', value: 'x'});

    const textFieldWrapper = createElement('div', {className: 'text-field-wrapper'}, inputSearch, btnSearch);
    const btnWrapper = createElement('div', {className: 'btn-wrapper'}, btnPrev, btnNext, btnParent, btnChildren, btnClose);

    const mainAppWrapper = createElement('div', {className: 'search-app-wrapper'}, textFieldWrapper, btnWrapper);

    btnSearch.disabled = true;
    btnPrev.disabled = true;
    btnNext.disabled = true;
    btnParent.disabled = true;
    btnChildren.disabled = true;

    btnSearch.addEventListener('click', handleSearch);
    inputSearch.addEventListener('input', handleInput);
    btnParent.addEventListener('click', handleParent);
    btnChildren.addEventListener('click', handleChildren);
    btnNext.addEventListener('click', handleNext);
    btnPrev.addEventListener('click', handlePrevious);
    btnClose.addEventListener('click', handleClose);

    document.body.insertAdjacentElement('beforeend', mainAppWrapper);

    dragBlock('.search-app-wrapper');
  }

  const handleSearch = () => {
    inputValue = document.querySelector('.search-input').value;
    document.querySelector('.search-input').value = '';
    document.querySelector('.search-btn').disabled = true;

    // try {
      if (selectedElement === '') {
        const selected = document.querySelector(inputValue);

        if (selected !== undefined && selected !== null) {
          selectedElement = selected;
          selectedElement.classList.add('selected-element-search');
          findRelative(selectedElement);
        }
      }
      else if (selectedElement !== null && selectedElement !== undefined) {
        selectedElement.classList.remove('selected-element-search');
        const selected = document.querySelector(inputValue);

        if (selected !== undefined && selected !== null) {
          selectedElement = selected;
          selectedElement.classList.add('selected-element-search');
          findRelative(selectedElement);
        }
      } 
      else if(selected !== null) {
        document.querySelector('.search-btn').disabled = true;
        document.querySelector('.prev-btn').disabled = true;
        document.querySelector('.next-btn').disabled = true;
        document.querySelector('.parent-btn').disabled = true;
        document.querySelector('.children-btn').disabled = true;
    }

    document.querySelector('.search-btn').disabled = true;

    scrollToElement('.selected-element-search');
  };

  const handleInput = (e) => {
    (e.target.value === '')
      ? document.querySelector('.search-btn').disabled = true
      : document.querySelector('.search-btn').disabled = false
  };

  const handleParent = () => {
    helperForHandler(parentNode);
  };

  const handleChildren = () => {
    helperForHandler(childrenNode);
  };

  const handleNext = () => {
    helperForHandler(nextNode);
  };

  const handlePrevious = () => {
    helperForHandler(previousNode);
  };

  const handleClose = () => {
    el = '';
    document.querySelector('.search-app-wrapper').remove();
    selectedElement !== '' ? selectedElement.classList.remove('selected-element-search') : false;
  };

  const helperForHandler = (newSelected) => {
    selectedElement.classList.remove('selected-element-search');
    selectedElement = newSelected;
    selectedElement.classList.add('selected-element-search');

    findRelative(selectedElement);
    scrollToElement('.selected-element-search');
  };

  function scrollToElement(theElement) {
    let selectedPosX = 0;
    let selectedPosY = 0;

    if (typeof theElement === "string") theElement = document.querySelector(theElement);

    while (theElement !== null) {
      selectedPosX += theElement.offsetLeft;
      selectedPosY += theElement.offsetTop;
      theElement = theElement.offsetParent;
    }

    selectedPosY = selectedPosY - 20;
    window.scrollTo(selectedPosX, selectedPosY);
  }

  function findRelative(element) {
    const tagNameParent = element.parentNode.tagName.toLowerCase();
    const child = element.children[0];
    console.log(tagNameParent);
    if (
      element.parentNode !== undefined
      && tagNameParent !== 'body'
      && tagNameParent !== 'html'
      && tagNameParent !== 'document'
      && tagNameParent !== undefined
    ) {
      document.querySelector('.parent-btn').disabled = false;
      parentNode = element.parentNode;
    }
    else {
      document.querySelector('.parent-btn').disabled = true;
      parentNode = '';
    }

    if (child !== undefined) {
      document.querySelector('.children-btn').disabled = false;
      childrenNode = child;
    }
    else {
      document.querySelector('.children-btn').disabled = true;
      childrenNode = '';
    }

    siblingArr = [].slice.call(element.parentNode.children);

    if (siblingArr.length > 1) {
      siblingArr.forEach((item, index, arr) => {

        if (item.classList.contains('selected-element-search')) {

          if (index >= 1) {
            previousNode = arr[index - 1];
            document.querySelector('.prev-btn').disabled = false;
          } else {
            previousNode = '';
            document.querySelector('.prev-btn').disabled = true;
          }

          if (index === arr.length - 1) {
            nextNode = '';
            document.querySelector('.next-btn').disabled = true;
          } else {
            nextNode = arr[index + 1];
            document.querySelector('.next-btn').disabled = false;
          }
        }
      })
    } else {
      previousNode = '';
      document.querySelector('.prev-btn').disabled = true;
      document.querySelector('.next-btn').disabled = true;
    }
  }

  function dragBlock(selector) {
    let element = document.querySelector(selector);

      element.onmousedown = function(e) {

      let coords = getCoords(element);
      let shiftX = e.pageX - coords.left;
      let shiftY = e.pageY - coords.top;

      element.style.zIndex = 1000; 

      function moveAt(e) {
        element.style.left = e.pageX - shiftX + 'px';
        element.style.top = e.pageY - shiftY + 'px';
      }

      document.onmousemove = function(e) {
        moveAt(e);
      };

      element.onmouseup = function() {
        document.onmousemove = null;
        element.onmouseup = null;
      };

    }

    element.ondragstart = function() {
      return false;
    };

    function getCoords(elem) {  
      let box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
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

  document.addEventListener("DOMContentLoaded", createApp);
}());
