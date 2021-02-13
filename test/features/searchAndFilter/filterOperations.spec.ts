import {
  filterCardByTags,
  searchCardsByText,
} from '../../../app/features/searchAndFilter/filterOperations';
import { createCard } from '../../../app/model/cards';
import { Tag, createTag } from '../../../app/model/board';

describe('Filtering cards', () => {
  const tagWork = createTag('work', '', '');
  const tagHome = createTag('home', '', '');

  const cards = [
    createCard(
      'This is card with title number one',
      'This is some long description containing description one',
      [tagHome.id],
      1
    ),
    createCard(
      'This is card with title number two',
      'One description containing description two.',
      [tagWork.id],
      2
    ),
    createCard(
      'This is card with title number three',
      'This is some long description containing description three',
      [tagHome.id, tagWork.id],
      3
    ),
    createCard('This is card with title number four', undefined, [], 4),
    createCard('This is card with title number four', '', undefined, 5),
  ];

  describe('search by text in titles and description', () => {
    it('should leave cards that contain search term in titles', () => {
      const result = searchCardsByText(cards, 'number one');
      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual('This is card with title number one');
    });

    it('should leave cards that contain search term in descritpion', () => {
      const result = searchCardsByText(cards, 'description two');
      expect(result.length).toEqual(1);
      expect(result[0].title).toEqual('This is card with title number two');
    });

    it('should leave cards with title and descripton containing search term', () => {
      const result = searchCardsByText(cards, 'one');
      expect(result.length).toEqual(2);
      expect(result[0].title).toEqual('This is card with title number one');
      expect(result[1].title).toEqual('This is card with title number two');
    });
  });

  describe('filter cards by containing one of the tags', () => {
    it('should leave cards that contain a single tag', () => {
      const result = filterCardByTags(cards, [tagHome]);
      expect(result.length).toEqual(2);
      expect(result[0].title).toEqual('This is card with title number one');
      expect(result[1].title).toEqual('This is card with title number three');
    });

    it('should leave cards containing all selected tags', () => {
      const result = filterCardByTags(cards, [tagHome, tagWork]);
      expect(result.length).toEqual(3);
    });
  });
});
