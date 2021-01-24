/* eslint react/jsx-props-no-spreading: off, @typescript-eslint/ban-ts-comment: off */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import * as boardSlice from '../../app/features/board/boardSlice';
import * as appSlice from '../../app/features/app/appSlice';
import Card from '../../app/components/Card';
import { createCard } from '../../app/model/cards';
import { Tag } from '../../app/model/board';
import TagComponent from '../../app/components/Tag';

Enzyme.configure({ adapter: new Adapter() });

const tagObjects: Array<Tag> = [
  { name: 'Z', id: '1', color: '#aaa' },
  { name: 'A', id: '2', color: '#bbb' },
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

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Card card={card} tags={tagsAsRecord} onCardSelected={() => {}} />
      </Provider>
    );
  const component = getWrapper();
  return {
    store,
    component,
    tagsOnCard: component.find(TagComponent),
  };
}

describe('Card component', () => {
  it('should display tags on card in the alphabetical order', () => {
    const { tagsOnCard } = setup();
    expect(tagsOnCard).toHaveLength(2);
    expect(tagsOnCard.at(0).prop('label')).toBe('A');
    expect(tagsOnCard.at(1).prop('label')).toBe('Z');
  });
});
