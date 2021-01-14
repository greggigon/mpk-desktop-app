import { extractTasks } from '../app/utils/stringUtils';

describe('String utility functions', () => {
  describe('extract tasks', () => {
    it('should extract tasks that start with dash -[]', () => {
      const expectedTask = [{ done: false, content: 'test one', index: 0 }];
      expect(extractTasks('-[] test one')).toEqual(expectedTask);
      expect(extractTasks(' -[] test one')).toEqual(expectedTask);
      expect(extractTasks(' - [] test one')).toEqual(expectedTask);
      expect(extractTasks('- [] test one')).toEqual(expectedTask);
      expect(extractTasks('- []test one')).toEqual(expectedTask);
      expect(extractTasks('- [ ] test one')).toEqual(expectedTask);
      expect(extractTasks(' - [   ] test one')).toEqual(expectedTask);
    });

    it('should extract tasks that start with dash *[]', () => {
      const expectedTask = [{ done: false, content: 'test one', index: 0 }];
      expect(extractTasks('*[] test one')).toEqual(expectedTask);
      expect(extractTasks(' *[] test one')).toEqual(expectedTask);
      expect(extractTasks(' * [] test one')).toEqual(expectedTask);
      expect(extractTasks('* [] test one')).toEqual(expectedTask);
      expect(extractTasks('* []test one')).toEqual(expectedTask);
      expect(extractTasks('* [ ] test one')).toEqual(expectedTask);
      expect(extractTasks(' * [   ] test one')).toEqual(expectedTask);
    });

    it('should extract done tasks', () => {
      const expectedTask = [{ done: true, content: 'test one', index: 0 }];
      expect(extractTasks('*[x] test one')).toEqual(expectedTask);
      expect(extractTasks(' *[X] test one')).toEqual(expectedTask);
      expect(extractTasks('* [x] test one')).toEqual(expectedTask);
      expect(extractTasks('* [X] test one')).toEqual(expectedTask);
      expect(extractTasks('* [x]test one')).toEqual(expectedTask);
      expect(extractTasks('* [X] test one')).toEqual(expectedTask);
      expect(extractTasks(' * [x   ] test one')).toEqual(expectedTask);
    });

    it('should extract multiple tasks', () => {
      const expectedTask = [
        { done: true, content: 'task one', index: 0 },
        { done: true, content: 'task two', index: 1 },
        { done: false, content: 'task three', index: 2 },
      ];
      expect(
        extractTasks('*[x] task one\n -[x] task two\n -[] task three')
      ).toEqual(expectedTask);
      expect(
        extractTasks('- [x] task one\n *[ x] task two\n *[ ] task three')
      ).toEqual(expectedTask);
      expect(
        extractTasks('* [x ] task one\n - [ x ] task two\n -[   ] task three')
      ).toEqual(expectedTask);
    });
  });
});
