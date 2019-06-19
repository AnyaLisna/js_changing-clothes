'use strict'

let initialState = {
  items: ['Apron', 'Belt', 'Cardigan', 'Dress', 'Earrings', 'Fur coat', 'Gloves', 'Hat'],
  value: '',
  item: '',
  index: null
}

function getNextStata(state = initialState, action) {
  switch (action.type) {
    case 'chooseItem': 
      return {
        ...state,
        item: action.item,
        index: state.items.indexOf(action.item)
      }
    case 'changeItem': 
      return {
        ...state,
        items: state.items.map((item) => {
          if(item === state.item) {
            return item = action.value
          } else {
            return item;
          }
        }).filter(item => item !== ''),
        item: '',
      }
    default: 
      return state;
  }
}

const store = Redux.createStore(getNextStata, initialState)

function render() {
  const state = store.getState();
  const list = document.querySelector('.container');
  list.innerHTML = '';
  state.items.forEach(item => {
    const row = document.createElement('section');

    if(item!==state.item) {
      const button = document.createElement('button');
      row.innerHTML = `<p>${item}</p>`;
      row.append(button);
      button.innerText = 'Edit';
      button.addEventListener('click', (event) => {
        store.dispatch({
          type: 'chooseItem',
          item: item,
        });
      })
    } else {
        const input = document.createElement('input');
        input.value = item;
        row.append(input);
        input.addEventListener('keypress', (event) => {
        store.dispatch({
          type: 'changeItem',
          value: event.target.value
        })
      })
    }
    list.append(row);
  })
}

store.subscribe(() => render())
render();
