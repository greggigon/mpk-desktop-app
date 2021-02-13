import { Card } from '../../model/cards';
import { Tag } from '../../model/board';

const containingAny = (
  tagsOnCard: Array<string>,
  searchTags: Array<string>
) => {
  for (let i = 0; i < searchTags.length; i += 1) {
    if (tagsOnCard && tagsOnCard.includes(searchTags[i])) {
      return true;
    }
  }
  return false;
};

export const filterCardByTags = (cards: Array<Card>, tags: Array<Tag>) => {
  const tagIds = tags.map((t) => t.id);
  return cards.filter((card) => containingAny(card.tags, tagIds));
};

export const searchCardsByText = (cards: Array<Card>, searchText: string) => {
  return cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchText.toLowerCase()) ||
      (card.description &&
        card.description.toLowerCase().includes(searchText.toLowerCase()))
  );
};
