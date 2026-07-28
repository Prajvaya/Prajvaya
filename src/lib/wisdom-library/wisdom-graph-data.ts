import { ConceptNode } from "./types";

export const WISDOM_CONCEPT_GRAPH: ConceptNode[] = [
  {
    id: "duty",
    concept: "Duty & Action (Dharma & Karma)",
    description: "Aligning personal actions with cosmic order and moral responsibility without anxiety over external rewards.",
    relatedBooks: [
      {
        bookId: "gita",
        bookTitle: "The Bhagavad Gita",
        chapterTitle: "Chapter 2: Sankhya Yoga",
        quote: "You have a right to your duty, but never to the fruits of your action."
      },
      {
        bookId: "marcus_meditations",
        bookTitle: "Meditations",
        chapterTitle: "Book 2: On Duty",
        quote: "At dawn, when you have trouble getting out of bed, tell yourself: 'I have to go to work — as a human being.'"
      }
    ]
  },
  {
    id: "discipline",
    concept: "Discipline & Mind Mastery (Abhyasa)",
    description: "Training attention, curbing impulsive cravings, and cultivating unwavering internal composure.",
    relatedBooks: [
      {
        bookId: "patanjali_yoga",
        bookTitle: "Yoga Sutras of Patanjali",
        chapterTitle: "Chapter 1: Samadhi Pada",
        quote: "Yoga is the stillness of the modifications of the mind stream."
      },
      {
        bookId: "dhammapada",
        bookTitle: "The Dhammapada",
        chapterTitle: "Yamaka Vagga",
        quote: "Mind precedes all mental states. If a person speaks or acts with a pure mind, happiness follows."
      }
    ]
  },
  {
    id: "compassion",
    concept: "Compassion & Goodwill (Metta / Ahimsa)",
    description: "Dissolving malice, practicing non-harming, and expanding empathy to all living beings.",
    relatedBooks: [
      {
        bookId: "dhammapada",
        bookTitle: "The Dhammapada",
        chapterTitle: "Yamaka Vagga",
        quote: "Hatred is never stilled by hatred; by love alone is hatred stilled."
      },
      {
        bookId: "gita",
        bookTitle: "The Bhagavad Gita",
        chapterTitle: "Chapter 3: Karma Yoga",
        quote: "Work performed as a sacrifice for the collective good does not create psychological bondage."
      }
    ]
  },
  {
    id: "nature",
    concept: "Nature & Universal Rhythms (Prakriti)",
    description: "Recognizing ecological interdependence and living in harmony with cosmic natural law.",
    relatedBooks: [
      {
        bookId: "marcus_meditations",
        bookTitle: "Meditations",
        chapterTitle: "Book 2: On Duty",
        quote: "We were born to work together like feet, hands, and the rows of the upper and lower teeth."
      },
      {
        bookId: "gita",
        bookTitle: "The Bhagavad Gita",
        chapterTitle: "Chapter 3: Karma Yoga",
        quote: "The universe itself is kept in motion through mutual interdependence."
      }
    ]
  }
];
