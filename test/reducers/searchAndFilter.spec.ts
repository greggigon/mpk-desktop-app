import searchReducer, {
  cleanFilter,
  clearSearchAndFilter,
  searchForText,
  filterOnTags,
  Filter,
} from '../../app/features/searchAndFilter/search';
import { createTag } from '../../app/model/board';

describe('Search and Filter operations', () => {
  const homeTag = createTag('home', '', '');
  const workTag = createTag('work', '', '');

  describe('using text search', () => {
    it('should activate clean filter and set search text', () => {
      const state = cleanFilter;
      const action = {
        type: searchForText,
        payload: { search: 'searched text' },
      };
      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeTruthy();
      expect(result.search).toEqual('searched text');
    });
    it('should clear search filter if sent search text is empty', () => {
      const state: Filter = {
        filterOrSearch: true,
        search: 'blahblah',
        tags: [],
      };
      const action = {
        type: searchForText,
        payload: { search: '' },
      };
      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeFalsy();
      expect(result.search).toEqual('');
    });
    it('should modify existing search filter', () => {
      const state: Filter = {
        filterOrSearch: true,
        search: 'blahblah',
        tags: [],
      };
      const action = {
        type: searchForText,
        payload: { search: 'foobar' },
      };
      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeTruthy();
      expect(result.search).toEqual('foobar');
      expect(result.tags).toEqual([]);
    });
  });

  describe('using tags filtering', () => {
    it('should activate clean filter with tags filter', () => {
      const state = cleanFilter;
      const action = {
        type: filterOnTags,
        payload: { tags: [homeTag] },
      };

      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeTruthy();
      expect(result.tags.length).toEqual(1);
      expect(result.tags[0]).toEqual(homeTag);
    });

    it('should clean filter when empty list of tags is sent', () => {
      const state: Filter = {
        filterOrSearch: true,
        search: '',
        tags: [workTag],
      };
      const action = {
        type: filterOnTags,
        payload: { tags: [] },
      };
      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeFalsy();
      expect(result.tags.length).toEqual(0);
    });

    it('should modify tags on exising filter', () => {
      const state: Filter = {
        filterOrSearch: true,
        search: '',
        tags: [workTag],
      };
      const action = {
        type: filterOnTags,
        payload: { tags: [workTag, homeTag] },
      };
      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeTruthy();
      expect(result.tags.length).toEqual(2);
    });
  });

  describe('cleaning all filters', () => {
    it('should clean existing filter with search text', () => {
      const state: Filter = {
        filterOrSearch: true,
        search: 'asdasdasd',
        tags: [],
      };
      const action = {
        type: clearSearchAndFilter,
        payload: {},
      };
      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeFalsy();
      expect(result).toEqual(cleanFilter);
    });
    it('should clean existing tags filter', () => {
      const state: Filter = {
        filterOrSearch: true,
        search: '',
        tags: [homeTag],
      };
      const action = {
        type: clearSearchAndFilter,
        payload: {},
      };
      const result: Filter = searchReducer(state, action);

      expect(result.filterOrSearch).toBeFalsy();
      expect(result).toEqual(cleanFilter);
    });
  });
});
