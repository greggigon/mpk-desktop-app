/* eslint jest/expect-expect: off, jest/no-test-callback: off */
import { ClientFunction, Selector } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);

const assertNoConsoleErrors = async (t) => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

const selectFirstBoard = async (t) => {
  const firstBoardSelector = await Selector(
    'div[class^=Side] button:first-child'
  );
  const boardTitle = await firstBoardSelector.getAttribute('title');
  await t.click(firstBoardSelector);
  return boardTitle;
};

fixture`Board`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async (t) => {
  const boardTitle = await selectFirstBoard(t);
  await t.expect(getPageTitle()).eql(boardTitle);
});
