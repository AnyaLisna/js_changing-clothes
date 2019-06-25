'use strict'

const initialState = {
  items: ['Apron', 'Belt', 'Cardigan', 'Dress', 'Earrings', 'Fur coat', 'Gloves', 'Hat'],
  value: '',
  item: '',
}

const CHOOSE_ITEM = 'choose_item';
const CHANGE_ITEM = 'change_item';

function chooseItem(item) {
  return {
    type: CHOOSE_ITEM,
    item,
  };
}

function changeItem(data, value, editItem) {
  const newData = [...data];
  return {
    type: CHANGE_ITEM,
    data: newData.map((item) => {
      if (item === editItem) {
        return (item = value);
      }
      return item;
    }).filter(item => item !== ''),
    item: '',
  };
}

function getNextStata(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_ITEM:
      return {
        ...state,
        item: action.item,
      };
    case CHANGE_ITEM:
      return {
        ...state,
        items: action.data,
        item: action.item,
      };
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
        store.dispatch(chooseItem(item));
      })
    } else {
        const input = document.createElement('input');
        input.value = item;
        row.append(input);
        input.addEventListener('keydown', (event) => {
          if(event.keyCode === 13) {
            store.dispatch(changeItem(state.items, event.target.value, state.item))
          }
      })
    }
    list.append(row);
  })
}

store.subscribe(() => render())
render();
