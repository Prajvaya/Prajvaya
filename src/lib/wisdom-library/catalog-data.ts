import { Book, DailyWisdom } from "./types";

export const WISDOM_BOOKS: Book[] = [
  {
    id: "gita",
    title: "The Bhagavad Gita",
    sanskritTitle: "श्रीमद्भगवद्गीता",
    author: "Maharsi Vyasa",
    category: "Indian Wisdom",
    coverImage: "/assets/gita_cover.png",
    description: "The supreme dialogue on duty (Dharma), self-realization, emotional equanimity, and active engagement in the world without mental anxiety.",
    historicalContext: "Composed in classical India as part of Mahabharata, presenting a synthesis of Samkhya, Yoga, Vedantic non-dualism, and Karma discipline.",
    publicDomainLicense: "Public Domain (Verified Open Translation)",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 125,
    chapters: [
      {
        id: "gita_ch1",
        chapterNumber: 1,
        title: "Arjuna's Despondency (Arjuna Vishada Yoga)",
        sanskritTitle: "अर्जुनविषादयोग",
        summary: "Arjuna faces emotional paralysis on the battlefield of Kurukshetra, caught between moral conflict and duty.",
        estimatedReadTimeMinutes: 15,
        content: `On the sacred plain of Kurukshetra, gathered for war, the conflict between righteousness and unrighteousness comes to a head. Seeing his own kinsmen, teachers, and loved ones arrayed against each other, Prince Arjuna drops his bow Gandiva in profound grief.\n\n"My limbs sink, my mouth is parched, my body trembles, and my hair stands on end. I see no good in killing my own people in battle. What is victory, what is kingdom, what is happiness itself if purchased with the destruction of our own family?"\n\nArjuna represents the modern human being: intelligent, capable, yet overwhelmed when life forces an agonizing choice between comfort and moral duty. Feeling incapable of making a decision, he sits down in his chariot, refusing to act.`,
        keyLessons: [
          "Recognize that moral dilemmas and emotional paralysis are natural human experiences.",
          "Avoid making major life decisions while in a state of high emotional overwhelm.",
          "Seek grounding counsel when personal bias cloud your perception of duty."
        ],
        reflectionQuestions: [
          "What is one situation in your life where conflict between comfort and duty caused you indecision?",
          "How do you distinguish between genuine compassion and fear of taking responsibility?"
        ],
        quiz: [
          {
            question: "Why did Arjuna drop his bow on the battlefield?",
            options: [
              "He ran out of arrows",
              "He was overcome with emotional paralysis and moral conflict",
              "He was injured in battle",
              "He wanted to surrender to the enemy"
            ],
            correctIndex: 1,
            explanation: "Arjuna suffered from 'Vishada' (despondency) caused by the moral crisis of fighting his own kinsmen."
          }
        ]
      },
      {
        id: "gita_ch2",
        chapterNumber: 2,
        title: "The Yoga of Knowledge (Sankhya Yoga)",
        sanskritTitle: "सांख्ययोग",
        summary: "Krishna reveals the eternal nature of the Self (Atman) and the master principle of Nishkama Karma (detached duty).",
        estimatedReadTimeMinutes: 20,
        content: `Lord Krishna speaks to the despairing Arjuna with firm clarity: "The wise grieve neither for the living nor for the dead. Never was there a time when I did not exist, nor you, nor all these kings; nor in the future shall any of us cease to be."\n\n"Just as the embodied soul continuously passes, in this body, from childhood to youth to old age, so the soul passes into another body at death. The calm person is not bewildered by these."\n\nKrishna then introduces the immortal formula for action: **Karmanye vadhikaraste ma phaleshu kadachana** (Chapter 2, Verse 47).\n\n"You have a right performing your prescribed duty, but never to the fruits of action. Never let the fruits of action be your motive, nor let your attachment be to inaction. Perform your work steadfast in Yoga, abandoning attachment, and staying balanced in success and failure."\n\nA person of steady wisdom (*Stithaprajna*) is not agitated by sorrow, nor enticed by pleasure. They control their senses through mindfulness and remain tranquil under all circumstances.`,
        keyLessons: [
          "The core eternal Self (consciousness) is unaffected by surface changes, failures, or physical stress.",
          "Nishkama Karma: Dedicate 100% of your focus to effort; release outcome anxiety.",
          "Equanimity (Samatvam): True mastery is remaining calm in both praise and criticism."
        ],
        reflectionQuestions: [
          "What outcome are you currently worrying about that is draining your present energy?",
          "How can you shift your mindset from 'What will I get?' to 'What is my best effort right now?'"
        ],
        quiz: [
          {
            question: "What does 'Karmanye vadhikaraste ma phaleshu kadachana' teach?",
            options: [
              "Always demand rewards before starting work",
              "Focus 100% on duty/effort and release attachment to outcome",
              "Avoid working altogether",
              "Only work when victory is guaranteed"
            ],
            correctIndex: 1,
            explanation: "It advises focusing entirely on input and duty while remaining detached from future results."
          }
        ]
      },
      {
        id: "gita_ch3",
        chapterNumber: 3,
        title: "The Yoga of Action (Karma Yoga)",
        sanskritTitle: "कर्मयोग",
        summary: "Why action is necessary for all living beings, and how selfless work converts daily activity into spiritual growth.",
        estimatedReadTimeMinutes: 18,
        content: `Arjuna asks: "If knowledge is superior to action, why do you urge me to engage in this terrible conflict?"\n\nKrishna replies: "No one can remain even for a moment without performing action. The biological body itself requires action to survive. But work performed as a sacrifice (*Yajna*) for the collective good does not create psychological bondage."\n\n"Do your duty efficiently, for action is superior to inaction. The universe itself is kept in motion through mutual interdependence (*Prakriti cycle*). Just as rain nourishes crops, and crops nourish beings, your work should contribute to the world wheel (*Lokasangraha*)."\n\nWork without selfish desire cleanses the mind and turns daily labor into a meditative practice.`,
        keyLessons: [
          "Inaction causes stagnation; disciplined work builds mental strength.",
          "Lokasangraha: Direct your personal talents toward uplifting the broader community.",
          "Selfless service purifies the ego and eliminates internal conflict."
        ],
        reflectionQuestions: [
          "In what way does your daily job or routine serve the broader community?",
          "How can you perform one mundane chore today as a selfless contribution?"
        ]
      }
    ]
  },
  {
    id: "patanjali_yoga",
    title: "Yoga Sutras of Patanjali",
    sanskritTitle: "पतञ्जलि योगसूत्राणि",
    author: "Sage Patanjali",
    category: "Indian Wisdom",
    coverImage: "/assets/gita_cover.png",
    description: "The foundational text of classical Raja Yoga detailing the eight-limbed path (Ashtanga Yoga) to master the mind stream.",
    historicalContext: "Cataloged around 400 CE, compiling oral meditative traditions into 196 terse aphorisms (sutras).",
    publicDomainLicense: "Public Domain",
    rating: 4.8,
    audioAvailable: true,
    totalEstReadMinutes: 95,
    chapters: [
      {
        id: "yoga_ch1",
        chapterNumber: 1,
        title: "On Contemplation (Samadhi Pada)",
        sanskritTitle: "समाधिपाद",
        summary: "Defines Yoga as the cessation of mental fluctuations (Chitta Vritti Nirodha).",
        estimatedReadTimeMinutes: 15,
        content: `**Sutra 1.2**: *Yogas chitta vritti nirodhah*\n"Yoga is the stillness of the modifications of the mind stream."\n\n**Sutra 1.3**: *Tada drashtuh svarupe vasthanam*\n"Then the Seer abides in its true nature."\n\nPatanjali explains that the mind constantly creates ripples (*Vrittis*) through right knowledge, misconception, imagination, sleep, and memory. When we mistake ourselves for these mental ripples, we suffer. Through steady practice (*Abhyasa*) and non-attachment (*Vairagya*), the mind stream becomes crystal clear like a still lake.`,
        keyLessons: [
          "You are the observer of your thoughts, not the thoughts themselves.",
          "Abhyasa: Consistency in practice over a long period with devotion brings mental stability.",
          "Vairagya: Letting go of craving for temporary sensory stimulation calms mental anxiety."
        ],
        reflectionQuestions: [
          "When your mind is agitated, can you step back and observe the thought as an observer?"
        ]
      }
    ]
  },
  {
    id: "dhammapada",
    title: "The Dhammapada",
    sanskritTitle: "धम्मपद",
    author: "Gautama Buddha",
    category: "Buddhism",
    coverImage: "/assets/gita_cover.png",
    description: "Verses of Truth on mindfulness, ethical conduct, self-mastery, and the elimination of mental suffering.",
    historicalContext: "Part of the Pali Tipitaka, compiling 423 ethical verses spoken by Gautama Buddha.",
    publicDomainLicense: "Public Domain",
    rating: 4.8,
    audioAvailable: true,
    totalEstReadMinutes: 80,
    chapters: [
      {
        id: "dhamma_ch1",
        chapterNumber: 1,
        title: "The Twin Verses (Yamaka Vagga)",
        sanskritTitle: "यमकवग्गो",
        summary: "Mind precedes all mental states; mind is their chief; they are mind-made.",
        estimatedReadTimeMinutes: 12,
        content: `Mind precedes all mental states. Mind is their chief; they are mind-made. If a person speaks or acts with an impure mind, suffering follows them like the wheel that follows the foot of the ox.\n\nMind precedes all mental states. Mind is their chief; they are mind-made. If a person speaks or acts with a pure mind, happiness follows them like their never-departing shadow.\n\n"He abused me, he struck me, he overpowered me, he robbed me"—in those who harbor such thoughts, hatred is never stilled. Hatred is never appeased by hatred in this world; by love alone is hatred appeased. This is an eternal law.`,
        keyLessons: [
          "Your perception and internal narrative shape your emotional reality.",
          "Resentment harms the person holding it far more than the person targeted.",
          "Cultivate active goodwill (Metta) to dissolve malice."
        ],
        reflectionQuestions: [
          "What negative thought loop have you been harboring that is bringing self-made suffering?"
        ]
      }
    ]
  },
  {
    id: "marcus_meditations",
    title: "Meditations",
    sanskritTitle: "आत्मचिन्तनम् (Stoic Reflections)",
    author: "Marcus Aurelius",
    category: "World Philosophy",
    coverImage: "/assets/gita_cover.png",
    description: "Private journal entries of the Roman Emperor on Stoic discipline, duty, impermanence, and internal strength.",
    historicalContext: "Written between 161 and 180 CE while commanding military campaigns along the Danube river frontier.",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 110,
    chapters: [
      {
        id: "marcus_b2",
        chapterNumber: 2,
        title: "Book 2: On Duty & Inner Citadel",
        sanskritTitle: "कर्तव्यम् च आन्तरिकदुर्गम्",
        summary: "Reminders on waking up to serve, ignoring petty slights, and keeping the soul untainted.",
        estimatedReadTimeMinutes: 14,
        content: `When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and the ugliness of evil, and I have recognized that the wrongdoer has a nature related to my own.\n\nNone of them can hurt me, for no one can implicate me in ugliness. Nor can I be angry at my relative or hate him. We were born to work together like feet, hands, and the rows of the upper and lower teeth.\n\nDo not waste the remainder of your life in thoughts about others, unless you are seeking some mutual benefit. Confine your attention to your own governing mind.`,
        keyLessons: [
          "Expect difficult social encounters and prepare your mind in advance.",
          "Your moral character (dignity) cannot be damaged by another person's bad behavior.",
          "Focus entirely on what is within your direct control."
        ],
        reflectionQuestions: [
          "How much time do you spend worrying about other people's opinions or behavior?"
        ]
      }
    ]
  }
];

export const DAILY_WISDOM_TODAY: DailyWisdom = {
  date: "Today's Contemplation",
  bookTitle: "The Bhagavad Gita (Chapter 2, Verse 47)",
  passage: "Karmanye vadhikaraste ma phaleshu kadachana. You have a right performing your prescribed duty, but never to the fruits of action.",
  explanation: "When you focus 100% on the quality of your effort right now and surrender outcome anxiety, performance increases and mental stress dissolves.",
  reflectionQuestion: "What is one task today you can perform with full devotion without worrying about the outcome?",
  actionPrompt: "Dedicate 30 uninterrupted minutes to your primary priority without checking notifications or results."
};
