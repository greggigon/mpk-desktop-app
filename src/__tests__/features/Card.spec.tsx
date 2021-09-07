/**
 * @jest-environment jsdom
 */
/* eslint react/jsx-props-no-spreading: off, @typescript-eslint/ban-ts-comment: off */
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import * as boardSlice from '../../features/board/boardSlice';
import * as appSlice from '../../features/app/appSlice';
import Card from '../../components/Card';
import { createCard } from '../../model/cards';
import { Tag } from '../../model/board';

const tagObjects: Array<Tag> = [
  { name: 'TAG Z', id: '1', color: '#aaa' },
  { name: 'TAG A', id: '2', color: '#bbb' },
];
const tags = tagObjects.map((tag) => tag.id);
const tagsAsRecord: Record<string, Tag> = tagObjects.reduce((map, obj) => {
  map[obj.id] = obj;
  return map;
}, {});
const card = createCard('Title', 'Description', tags, 1);

function setup(
  preloadedState = {
    app: { showTagsOnCards: true, selectIfTasksShouldShow: false },
  }
) {
  const reducer = combineReducers({
    boards: boardSlice.default,
    app: appSlice.default,
  });
  const store = configureStore({
    reducer,
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Card card={card} tags={tagsAsRecord} onCardSelected={() => {}} />
    </Provider>
  );
}

describe('Card component', () => {
  it('should display tags on card in the alphabetical order', () => {
    setup();
    const tagsOnCard = screen.getAllByText(/TAG/);
    expect(tagsOnCard.length).toBe(2);
    expect(tagsOnCard[0].textContent).toEqual('TAG A');
    expect(tagsOnCard[1].textContent).toEqual('TAG Z');
  });
});
