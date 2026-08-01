import { FlashCard } from '../models/flash-card';

export const MOCK_FLASHCARDS: FlashCard[] = [
  {
    id: '1',
    word: 'abandon',
    meaning: 'to leave something behind',
    example: 'He abandoned the project.',
    level: 'B1',
    category: 'TOEIC',
    favorite: false,
  },
  {
    id: '2',
    word: 'ability',
    meaning: 'the power or skill to do something',
    example: 'She has the ability to learn quickly.',
    level: 'A2',
    category: 'General',
    favorite: true,
  },
];
