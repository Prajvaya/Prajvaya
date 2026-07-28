import { Book, DailyWisdom } from "./types";

export const WISDOM_BOOKS: Book[] = [
  // --- INDIAN WISDOM ---
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
          "Seek grounding counsel when personal bias clouds your perception of duty."
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
            explanation: "Arjuna suffered from Vishada (despondency) caused by the moral crisis of fighting his own kinsmen."
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
        content: `Lord Krishna speaks to the despairing Arjuna with firm clarity: "The wise grieve neither for the living nor for the dead. Never was there a time when I did not exist, nor you, nor all these kings; nor in the future shall any of us cease to be."\n\n"Just as the embodied soul continuously passes, in this body, from childhood to youth to old age, so the soul passes into another body at death. The calm person is not bewildered by these."\n\nKrishna then introduces the immortal formula for action: Karmanye vadhikaraste ma phaleshu kadachana (Chapter 2, Verse 47).\n\n"You have a right performing your prescribed duty, but never to the fruits of action. Never let the fruits of action be your motive, nor let your attachment be to inaction. Perform your work steadfast in Yoga, abandoning attachment, and staying balanced in success and failure."\n\nA person of steady wisdom (Stithaprajna) is not agitated by sorrow, nor enticed by pleasure. They control their senses through mindfulness and remain tranquil under all circumstances.`,
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
        content: `Arjuna asks: "If knowledge is superior to action, why do you urge me to engage in this terrible conflict?"\n\nKrishna replies: "No one can remain even for a moment without performing action. The biological body itself requires action to survive. But work performed as a sacrifice (Yajna) for the collective good does not create psychological bondage."\n\n"Do your duty efficiently, for action is superior to inaction. The universe itself is kept in motion through mutual interdependence (Prakriti cycle). Just as rain nourishes crops, and crops nourish beings, your work should contribute to the world wheel (Lokasangraha)."\n\nWork without selfish desire cleanses the mind and turns daily labor into a meditative practice.`,
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
    coverImage: "/assets/covers/patanjali_yoga.png",
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
        content: `Sutra 1.2: Yogas chitta vritti nirodhah\n"Yoga is the stillness of the modifications of the mind stream."\n\nSutra 1.3: Tada drashtuh svarupe vasthanam\n"Then the Seer abides in its true nature."\n\nPatanjali explains that the mind constantly creates ripples (Vrittis) through right knowledge, misconception, imagination, sleep, and memory. When we mistake ourselves for these mental ripples, we suffer. Through steady practice (Abhyasa) and non-attachment (Vairagya), the mind stream becomes crystal clear like a still lake.`,
        keyLessons: [
          "You are the observer of your thoughts, not the thoughts themselves.",
          "Abhyasa: Consistency in practice over a long period with devotion brings mental stability.",
          "Vairagya: Letting go of craving for temporary sensory stimulation calms mental anxiety."
        ],
        reflectionQuestions: [
          "When your mind is agitated, can you step back and observe the thought as an observer?"
        ]
      },
      {
        id: "yoga_ch2",
        chapterNumber: 2,
        title: "On Practice & The Eight Limbs (Sadhana Pada)",
        sanskritTitle: "साधनापाद",
        summary: "Patanjali outlines Kriya Yoga (action yoga) and the eight limbs of self-realization.",
        estimatedReadTimeMinutes: 18,
        content: `Sutra 2.29: Yama niyamasana pranayama pratyahara dharana dhyana samadhayo ashtavangani\n"The eight limbs of Yoga are: Yamas (ethical restraints), Niyamas (personal observances), Asana (posture), Pranayama (breath regulation), Pratyahara (sensory withdrawal), Dharana (concentration), Dhyana (meditation), and Samadhi (absorption)."\n\nPatanjali emphasizes that spiritual growth is not an abstract theory but a systematic science. The Yamas (non-violence, truthfulness, non-stealing, continence, non-possessiveness) build moral purity, while Niyamas (cleanliness, contentment, austerity, self-study, surrender) establish inner discipline.`,
        keyLessons: [
          "Ethics (Yama/Niyama) form the necessary foundation before meditation.",
          "Asana provides steady comfort for physical endurance.",
          "Pranayama regulates the nervous system and calms mental chatter."
        ],
        reflectionQuestions: [
          "Which of the 5 Yamas (Non-violence, Truth, Non-stealing, Continence, Non-greed) needs the most focus in your daily life?"
        ]
      }
    ]
  },
  {
    id: "arthashastra",
    title: "Arthashastra",
    sanskritTitle: "अर्थशास्त्रम्",
    author: "Chanakya (Kautilya)",
    category: "Indian Wisdom",
    coverImage: "/assets/covers/arthashastra.png",
    description: "The ancient Indian treatise on statecraft, economic policy, leadership ethics, strategic management, and public governance.",
    historicalContext: "Authored by Kautilya around 300 BCE during the establishment of the Mauryan Empire.",
    publicDomainLicense: "Public Domain",
    rating: 4.7,
    audioAvailable: true,
    totalEstReadMinutes: 140,
    chapters: [
      {
        id: "artha_ch1",
        chapterNumber: 1,
        title: "Duties of a Leader & Self-Control",
        sanskritTitle: "राजर्षिवृत्तम्",
        summary: "A leader's primary duty is the happiness of the people; self-mastery precedes governance.",
        estimatedReadTimeMinutes: 18,
        content: `Kautilya lays down the immortal law of servant leadership:\n\n> "In the happiness of his subjects lies the king's happiness; in their welfare his welfare. Whatever pleases himself he shall not consider as good, but whatever pleases his subjects he shall consider as good."\n\nBefore managing an enterprise or a state, a leader must master the six internal enemies: lust, anger, greed, vanity, arrogance, and foolhardiness. A leader who cannot govern their own desires will inevitably cause the ruin of their institution.`,
        keyLessons: [
          "Leadership is service: prioritize the growth and wellbeing of your team.",
          "Self-control (Indriya-jaya) is the bedrock of strategic decision-making.",
          "Discipline in daily routines creates organizational stability."
        ],
        reflectionQuestions: [
          "How do you ensure your personal ego does not override the collective good of your team?"
        ]
      },
      {
        id: "artha_ch2",
        chapterNumber: 2,
        title: "Economic Management & Treasury Protection",
        sanskritTitle: "कोषसंरक्षणम्",
        summary: "Sustainable revenue generation, avoiding waste, and protecting community wealth.",
        estimatedReadTimeMinutes: 16,
        content: `Kautilya explains that all public works, security, and welfare projects depend upon sound treasury management. Wealth should be generated ethically without over-taxing citizens or depleting natural reserves.\n\n"Just as fruit is gathered from a tree when ripe, so revenue should be collected from the state when due, without causing hardship to citizens." Wastefulness and corruption are condemned as economic sabotage.`,
        keyLessons: [
          "Financial sustainability enables long-term independence and public welfare.",
          "Avoid wasteful expenditure and manage resources with foresight.",
          "Ethics in financial dealings builds institutional trust."
        ],
        reflectionQuestions: [
          "How can you optimize your personal or business finances to eliminate unnecessary waste?"
        ]
      }
    ]
  },
  {
    id: "chanakya_niti",
    title: "Chanakya Niti",
    sanskritTitle: "चाणक्य नीति",
    author: "Chanakya",
    category: "Indian Wisdom",
    coverImage: "",
    description: "A pragmatic collection of aphorisms on life wisdom, human psychology, financial prudence, and strategic friendship.",
    historicalContext: "Compiled ancient maxims attributed to Chanakya for practical success and moral living.",
    publicDomainLicense: "Public Domain",
    rating: 4.8,
    audioAvailable: true,
    totalEstReadMinutes: 90,
    chapters: [
      {
        id: "niti_ch1",
        chapterNumber: 1,
        title: "Prudence & Character",
        sanskritTitle: "सद्गुणवर्णनम्",
        summary: "Maxims on building unshakeable personal integrity and evaluating human character.",
        estimatedReadTimeMinutes: 12,
        content: `A man is great by deeds, not by birth. Just as a snake is dangerous regardless of its size, a toxic companion damages peace regardless of their status.\n\n"Test a servant while in the discharge of his duty, a relative in difficulty, a friend in adversity, and a wife in misfortune."\n\nSave wealth for times of calamity; do not think that wealthy people are exempt from disaster. True education is that which produces humility and practical competence.`,
        keyLessons: [
          "Actions and daily conduct define character, not titles or origin.",
          "Financial discipline provides security against unpredictable crises.",
          "Evaluate true friends by their presence during challenging times."
        ],
        reflectionQuestions: [
          "What practical habit can you start today to build long-term personal resilience?"
        ]
      },
      {
        id: "niti_ch2",
        chapterNumber: 2,
        title: "Wisdom in Speech & Association",
        sanskritTitle: "वाणी शुद्धिः",
        summary: "The power of truthful speech and avoiding toxic company.",
        estimatedReadTimeMinutes: 14,
        content: `Silence is better than speech when words serve only to incite malice. Speak truth that is beneficial, agreeable, and non-injurious.\n\n"Do not reveal what you have thought upon doing, but by wise counsel keep it secret, being determined to carry it into execution."\n\nLearning without practice is like food without digestion—it turns into poison. Put your knowledge into daily action.`,
        keyLessons: [
          "Keep strategic plans quiet until execution is complete.",
          "Practice mindful speech: beneficial, truthful, and peaceful.",
          "Application converts passive knowledge into practical wisdom."
        ],
        reflectionQuestions: [
          "Have you been sharing your plans prematurely instead of executing them quietly?"
        ]
      }
    ]
  },
  {
    id: "upanishads",
    title: "The Upanishads (Isha & Kena)",
    sanskritTitle: "ईशावास्याद्युपनिषदः",
    author: "Vedic Rishis",
    category: "Indian Wisdom",
    coverImage: "/assets/covers/upanishads.png",
    description: "The mystical culmination of the Vedas exploring ultimate reality (Brahman), consciousness, and ecological oneness.",
    historicalContext: "Philosophical dialogues composed between 800 and 500 BCE laying the bedrock of Vedanta.",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 110,
    chapters: [
      {
        id: "up_isha",
        chapterNumber: 1,
        title: "Isha Upanishad: All is Pervaded by Divine Consciousness",
        sanskritTitle: "ईशावास्योपनिषत्",
        summary: "Harmonizing worldly engagement with spiritual awareness.",
        estimatedReadTimeMinutes: 15,
        content: `Verse 1: Isha vasyam idam sarvam yat kincha jagatyam jagat\n"All this—whatever moves in this changing universe—is enveloped by the Divine. Enjoy the world through renunciation of possessiveness; do not covet anyone's wealth."\n\nThe Isha Upanishad presents the supreme ecological truth: everything in existence is interconnected within one continuous field of consciousness. When we treat nature or fellow human beings as mere commodities to exploit, we create self-destructive imbalance. Enjoy life deeply, but hold material possessions with a light, non-possessive grip.`,
        keyLessons: [
          "Recognize the inherent sacredness and interconnectedness of all life.",
          "Practice non-possessive enjoyment (Tyaktena Bhunjitha).",
          "Combine outer activity with inner spiritual reflection."
        ],
        reflectionQuestions: [
          "How does viewing nature as an interconnected living system change your consumption habits?"
        ]
      },
      {
        id: "up_kena",
        chapterNumber: 2,
        title: "Kena Upanishad: By Whom is the Mind Directed?",
        sanskritTitle: "केनोपनिषत्",
        summary: "Inquiring into the ultimate source of thought, speech, and perception.",
        estimatedReadTimeMinutes: 14,
        content: `Keneshitam patati preshitam manah?\n"By whom impelled does the mind fly to its target? By whom directed does the breath move? By whom willed do people utter speech?"\n\nThe teacher answers: "It is the Ear of the ear, the Mind of the mind, the Speech of the speech, the Life of the life. That which cannot be comprehended by the mind, but by which the mind itself is comprehended—know That alone as Brahman, not this which people worship here."`,
        keyLessons: [
          "Consciousness is the foundational observer underlying all mental activity.",
          "True wisdom is recognizing the limitations of verbal definitions.",
          "Self-inquiry (Atma-Vichara) reveals deep inner tranquility."
        ],
        reflectionQuestions: [
          "Who is the silent observer witnessing your thoughts right now?"
        ]
      }
    ]
  },
  {
    id: "ramayana",
    title: "The Valmiki Ramayana",
    sanskritTitle: "वाल्मीकि रामायणम्",
    author: "Sage Valmiki",
    category: "Indian Wisdom",
    coverImage: "",
    description: "The epic journey of Rama exemplifying ideal duty, honor, devotion, leadership, and ethical endurance.",
    historicalContext: "Ancient Sanskrit epic of 24,000 verses celebrating virtue and righteousness (Dharma).",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 180,
    chapters: [
      {
        id: "ram_ayodhya",
        chapterNumber: 1,
        title: "Ayodhya Kanda: The Honor of Promise",
        sanskritTitle: "अयोध्याकाण्डम्",
        summary: "Rama willingly accepts exile to uphold truth and honor his father's vow.",
        estimatedReadTimeMinutes: 20,
        content: `When informed that he must give up the throne and live in exile for fourteen years in the forest, Prince Rama's face does not lose its calm composure. He accepts the decision without resentment, anger, or blame.\n\n"Truth is the foundation of righteous governance. If a kingdom is built on broken vows, its prosperity is hollow. Duty to family and truth precedes personal ambition."\n\nSita and Lakshmana insist on accompanying Rama into the forest, demonstrating that true love and loyalty share both hardship and joy.`,
        keyLessons: [
          "Integrity means honoring promises even when personal sacrifice is required.",
          "Emotional composure during unexpected turns of fate is the mark of true nobility.",
          "Loyalty is proven in difficult times."
        ],
        reflectionQuestions: [
          "How do you react when unexpected disruptions derail your personal plans?"
        ]
      },
      {
        id: "ram_sundara",
        chapterNumber: 2,
        title: "Sundara Kanda: Courage & Devotion of Hanuman",
        sanskritTitle: "सुन्दरकाण्डम्",
        summary: "Hanuman's leap across the ocean through unwavering courage and humility.",
        estimatedReadTimeMinutes: 22,
        content: `Faced with the vast ocean separating the search party from Lanka, Hanuman remembers his hidden inner strength. Encouraged by Jambavan, he expands his vision, takes a mighty leap, overcoming obstacles through intelligence, strength, and devotion.\n\nUpon finding Sita in the Ashoka Vatika, Hanuman delivers Rama's ring with profound humility, offering hope and reassurance that justice will prevail.`,
        keyLessons: [
          "Inner strength often lies dormant until awakened by noble purpose.",
          "Overcome formidable obstacles through combined intelligence and courage.",
          "True capability is accompanied by deep humility."
        ],
        reflectionQuestions: [
          "What self-limiting belief is preventing you from taking a bold leap forward?"
        ]
      }
    ]
  },
  {
    id: "mahabharata",
    title: "The Mahabharata",
    sanskritTitle: "महाभारतम्",
    author: "Maharsi Vyasa",
    category: "Indian Wisdom",
    coverImage: "",
    description: "The grandest epic of human drama exploring political strategy, justice, karma, duty, and human complexity.",
    historicalContext: "The longest epic poem in world literature containing 100,000 shlokas, including the Bhagavad Gita.",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 200,
    chapters: [
      {
        id: "mb_sabha",
        chapterNumber: 1,
        title: "Sabha Parva: The Perils of Uncontrolled Impulse",
        sanskritTitle: "सभापर्व",
        summary: "How unchecked addiction and arrogance lead to catastrophic conflict.",
        estimatedReadTimeMinutes: 22,
        content: `In the Assembly Hall of Hastinapura, Yudhishthira succumbs to the addictive game of dice against the treacherous Shakuni. Step by step, driven by pride and impulse, he wagers away his kingdom, wealth, brothers, and freedom.\n\nThe Mahabharata serves as a stern psychological warning: even noble human beings can be destroyed when they let addictive impulses override rational intellect (Buddhi).`,
        keyLessons: [
          "Never engage in high-stakes decisions when driven by pride or emotion.",
          "Addictive gambling or impulsive risk-taking clouds moral judgment.",
          "Recognize warning signs before minor lapses turn into systemic collapse."
        ],
        reflectionQuestions: [
          "What is one impulsive habit you need to set firm boundaries around?"
        ]
      },
      {
        id: "mb_shanti",
        chapterNumber: 2,
        title: "Shanti Parva: Bhishma's Discourse on Governance & Peace",
        sanskritTitle: "शान्तिपर्व",
        summary: "Grandfather Bhishma instructs Yudhishthira on duty, justice, and self-realization.",
        estimatedReadTimeMinutes: 25,
        content: `Lying upon his bed of arrows, the dying patriarch Bhishma imparts supreme wisdom on statecraft, ethics, and liberation to King Yudhishthira:\n\n"There is no duty higher than truth. Truth is the bedrock of righteousness. A king should protect all subjects equally, as a mother protects her child, without partiality or hatred."`,
        keyLessons: [
          "Truth (Satya) is the foundation of all enduring peace and justice.",
          "Compassionate impartiality builds public trust.",
          "Wisdom must be shared for future generations."
        ],
        reflectionQuestions: [
          "How can you uphold fairness and truth in your leadership or personal relationships?"
        ]
      }
    ]
  },
  {
    id: "rig_veda",
    title: "The Rig Veda (Selected Hymns)",
    sanskritTitle: "ऋग्वेद सूक्तानि",
    author: "Vedic Seers",
    category: "Indian Wisdom",
    coverImage: "",
    description: "Hymns of creation, cosmic order (Rta), fire, light, and universal harmony from humanity's oldest literature.",
    historicalContext: "Composed in early Vedic Sanskrit around 1500 BCE, preserving oral poetic chants.",
    publicDomainLicense: "Public Domain",
    rating: 4.8,
    audioAvailable: true,
    totalEstReadMinutes: 100,
    chapters: [
      {
        id: "rv_nasadiya",
        chapterNumber: 1,
        title: "Nasadiya Sukta: The Hymn of Creation",
        sanskritTitle: "नासदीय सूक्तम्",
        summary: "Profound philosophical questioning on the origin of existence.",
        estimatedReadTimeMinutes: 12,
        content: `Rig Veda 10.129:\n"Then was not non-existence nor existence: there was no realm of air, no sky beyond it. What covered it, and where? What was the shelter? Was water there, unfathomed depth of water?"\n\n"Who really knows? Who will here proclaim it? Whence was it produced? Whence is this creation? The Gods came afterwards, with the creation of this universe. Who then knows whence it has arisen?"\n\nThe Nasadiya Sukta demonstrates the supreme intellectual openness of Vedic seers—asking fundamental questions about cosmology with humility, reverence, and scientific curiosity.`,
        keyLessons: [
          "Embrace intellectual curiosity and honest questioning over dogmatic certainty.",
          "Acknowledge the mystery and vastness of the cosmos.",
          "Combine scientific inquiry with spiritual wonder."
        ],
        reflectionQuestions: [
          "How does staying curious and humble expand your understanding of the world?"
        ]
      },
      {
        id: "rv_purusha",
        chapterNumber: 2,
        title: "Purusha Sukta: The Cosmic Person & Unity of Life",
        sanskritTitle: "पुरुष सूक्तम्",
        summary: "The cosmos as a single living interconnected organism.",
        estimatedReadTimeMinutes: 15,
        content: `Rig Veda 10.90:\n"The Cosmic Being (Purusha) has a thousand heads, a thousand eyes, a thousand feet. Pervading the earth on every side, it extends beyond it."\n\n"From this Cosmic Person arose the sun, the moon, the winds, the seasons, and all living species." The Purusha Sukta conveys that humanity and nature are organic limbs of one universal body. Injuring any part of nature is injuring the collective self.`,
        keyLessons: [
          "All living beings are interconnected parts of one cosmic organism.",
          "Harm to nature is harm to ourselves.",
          "Live in reverence and gratitude for the earth's resources."
        ],
        reflectionQuestions: [
          "How does viewing humanity as one family alter your daily empathy?"
        ]
      }
    ]
  },

  // --- BUDDHISM ---
  {
    id: "dhammapada",
    title: "The Dhammapada",
    sanskritTitle: "धम्मपद",
    author: "Gautama Buddha",
    category: "Buddhism",
    coverImage: "/assets/covers/dhammapada.png",
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
      },
      {
        id: "dhamma_ch2",
        chapterNumber: 2,
        title: "Vigilance & Mindfulness (Appamada Vagga)",
        sanskritTitle: "अपमादवग्गो",
        summary: "Mindfulness is the path to the Deathless; unmindfulness is the path to death.",
        estimatedReadTimeMinutes: 14,
        content: `Mindfulness is the path to the Deathless; unmindfulness is the path to death. Those who are mindful do not die; those who are unmindful are as if already dead.\n\nBy effort, mindfulness, discipline, and self-control, let the wise person make for themselves an island which no flood can overwhelm.\n\nFoolish people indulge in heedlessness, but the wise person guards mindfulness as their greatest treasure.`,
        keyLessons: [
          "Mindfulness (Appamada) protects the mind against impulse and distraction.",
          "Build an inner island of stability through daily practice.",
          "Treat conscious attention as your most valuable asset."
        ],
        reflectionQuestions: [
          "How many times today did your mind wander into passive scrolling or distraction?"
        ]
      }
    ]
  },
  {
    id: "diamond_sutra",
    title: "The Diamond Sutra",
    sanskritTitle: "वज्रच्छेदिका प्रज्ञापारमिता सूत्र",
    author: "Mahayana Buddhist Tradition",
    category: "Buddhism",
    coverImage: "",
    description: "The classic text on non-attachment, emptiness (Sunyata), and cutting through illusion like a diamond blade.",
    historicalContext: "Translated into Chinese in 401 CE; the 868 CE block-printed copy is the world's oldest dated complete printed book.",
    publicDomainLicense: "Public Domain",
    rating: 4.8,
    audioAvailable: true,
    totalEstReadMinutes: 75,
    chapters: [
      {
        id: "diamond_ch1",
        chapterNumber: 1,
        title: "The Practice of Non-Abiding",
        sanskritTitle: "अप्रतिष्ठितचित्तम्",
        summary: "Giving and helping without attachment to self, receiver, or reward.",
        estimatedReadTimeMinutes: 14,
        content: `The Buddha taught Subhuti: "A Bodhisattva should practice generosity without abiding anywhere—without abiding in sights, sounds, smells, tastes, touches, or mental concepts. Why? Because when one practices generosity without attachment to signs, their merit is immeasurable like space."\n\n"So you should view all fleeting phenomena in this world:\nAs a tiny star, a mist, a bubble in a stream,\nAn autumn lightning flash, a flickering lamp, a phantom, and a dream."`,
        keyLessons: [
          "Help others quietly without needing public praise or ego validation.",
          "Recognize the impermanent, fleeting nature of material possessions and fame.",
          "Live fully in the present moment without clinging."
        ],
        reflectionQuestions: [
          "What expectation can you let go of today to feel inner lightness?"
        ]
      }
    ]
  },

  // --- JAIN PHILOSOPHY ---
  {
    id: "tattvartha_sutra",
    title: "Tattvartha Sutra",
    sanskritTitle: "तत्त्वार्थसूत्र",
    author: "Acharya Umaswati",
    category: "Jain Philosophy",
    coverImage: "",
    description: "The master text of Jain philosophy detailing non-violence (Ahimsa), non-possession (Aparigraha), and multi-sided truth (Anekantavada).",
    historicalContext: "Authored around 200 CE, accepted by all Jain traditions as the definitive manual of reality and ethics.",
    publicDomainLicense: "Public Domain",
    rating: 4.8,
    audioAvailable: true,
    totalEstReadMinutes: 85,
    chapters: [
      {
        id: "jain_ch1",
        chapterNumber: 1,
        title: "Anekantavada & Parasparopagraho Jivanam",
        sanskritTitle: "परस्परोपग्रहो जीवानाम्",
        summary: "Mutual interdependence of all living beings and intellectual humility.",
        estimatedReadTimeMinutes: 15,
        content: `Sutra 5.21: Parasparopagraho Jivanam\n"All life is bound together by mutual support and interdependence."\n\nAcharya Umaswati articulates the fundamental Jain ethic: no living being exists in isolation. Our breath, water, food, and existence rely on millions of visible and microscopic life forms. Therefore, Ahimsa (non-harming in thought, word, and deed) is the highest practical responsibility.\n\nFurthermore, Anekantavada teaches that truth has infinite facets. Conflicts arise when people claim their partial perspective is the sole absolute truth. Respecting multiple viewpoints fosters peace.`,
        keyLessons: [
          "Parasparopagraho Jivanam: Honor ecological interdependence in your daily choices.",
          "Anekantavada: Practice intellectual humility by listening to differing perspectives.",
          "Aparigraha: Reduce unnecessary material clutter to cultivate peace."
        ],
        reflectionQuestions: [
          "How can you practice non-violence in your speech during disagreement today?"
        ]
      }
    ]
  },

  // --- SIKH LITERATURE ---
  {
    id: "japji_sahib",
    title: "Japji Sahib",
    sanskritTitle: "जपुजी साहिब",
    author: "Guru Nanak Dev Ji",
    category: "Sikh Literature",
    coverImage: "",
    description: "The foundational composition of Guru Nanak Dev Ji on divine oneness (Ik Onkar), truth, humility, and selfless service (Sewa).",
    historicalContext: "Composed in the 15th century as the opening hymn of the Guru Granth Sahib.",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 70,
    chapters: [
      {
        id: "jap_ch1",
        chapterNumber: 1,
        title: "Ik Onkar & The Way of Truth",
        sanskritTitle: "ੴ सतिनामु",
        summary: "Living in harmony with divine cosmic order (Hukam).",
        estimatedReadTimeMinutes: 14,
        content: `Mool Mantar:\nIk Onkar Satnam Karta Purakh Nirbhau Nirvair Akal Murat Ajuni Saibhang Gurprasad\n"There is One Sovereign Divine Reality, Truth by Name, Creative Power, Without Fear, Without Enmity, Timeless Form, Unborn, Self-Existent."\n\nHow can one become truthful? How can the veil of illusion be torn away? By walking in harmony with the Divine Will (Hukam), as written in our very nature.\n\nTrue spiritual living requires Kirat Karo (honest labor), Naam Japo (remembrance of Divine Truth), and Vand Chhako (sharing earnings with those in need).`,
        keyLessons: [
          "Nirbhau & Nirvair: Live without fear and without hatred toward anyone.",
          "Perform honest work and share resources generously with your community.",
          "Surrender personal ego to align with universal truth."
        ],
        reflectionQuestions: [
          "In what area of life can you replace fear or hostility with peaceful goodwill?"
        ]
      }
    ]
  },

  // --- WORLD PHILOSOPHY ---
  {
    id: "marcus_meditations",
    title: "Meditations",
    sanskritTitle: "आत्मचिन्तनम्",
    author: "Marcus Aurelius",
    category: "World Philosophy",
    coverImage: "/assets/covers/marcus_meditations.png",
    description: "Private journal entries of the Roman Emperor on Stoic discipline, duty, impermanence, and internal strength.",
    historicalContext: "Written between 161 and 180 CE while commanding military campaigns along the Danube river frontier.",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 110,
    chapters: [
      {
        id: "marcus_b2",
        chapterNumber: 1,
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
      },
      {
        id: "marcus_b4",
        chapterNumber: 2,
        title: "Book 4: The Inner Retreat & Impermanence",
        sanskritTitle: "आन्तरिकविश्रामः",
        summary: "Retreat into your own soul; nowhere is quieter than your own mind.",
        estimatedReadTimeMinutes: 15,
        content: `People seek retreats for themselves—in the country, by the sea, or in the mountains. But this is unphilosophical, when you can at any moment retreat into your own soul. Nowhere can a person find a quieter or more untroubled retreat than in their own mind, especially if they have within themselves those thoughts which, when examined, bring immediate calm.\n\nRemember: time is a river, a violent current of events. No sooner is a thing brought to sight than it is swept away, and another takes its place, and this too will be swept away. Keep your principles simple and basic.`,
        keyLessons: [
          "Your mind is your ultimate peaceful sanctuary.",
          "Accept impermanence: everything passing through life is temporary.",
          "Keep your guiding moral principles simple."
        ],
        reflectionQuestions: [
          "When stressed, do you know how to retreat into inner quietness for 2 minutes?"
        ]
      }
    ]
  },
  {
    id: "enchiridion",
    title: "Enchiridion (The Stoic Handbook)",
    sanskritTitle: "स्टोइक मार्गदर्शिका",
    author: "Epictetus",
    category: "World Philosophy",
    coverImage: "",
    description: "A manual of Stoic ethical advice on mastering desire, handling adversity, and controlling what is within our power.",
    historicalContext: "Compiled by his student Arrian around 125 CE from Epictetus's oral lectures.",
    publicDomainLicense: "Public Domain",
    rating: 4.8,
    audioAvailable: true,
    totalEstReadMinutes: 65,
    chapters: [
      {
        id: "ep_ch1",
        chapterNumber: 1,
        title: "What is in Our Power vs What is Not",
        sanskritTitle: "स्वाधीनता च पराधीनता",
        summary: "The fundamental dichotomy of control.",
        estimatedReadTimeMinutes: 10,
        content: `Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions. Things not in our control are body, property, reputation, command, and, in one word, whatever are not our own actions.\n\nThe things in our control are by nature free, unrestrained, unhindered; but those not in our control are weak, slavish, restrained, belonging to others. Remember, then, that if you suppose that things which are slavish by nature are also free, you will be hindered.`,
        keyLessons: [
          "Categorize every problem: Is this within my direct control or not?",
          "Invest 100% of your energy in your thoughts, character, and choices.",
          "Accept external events with graceful equanimity."
        ],
        reflectionQuestions: [
          "What is one external event you are trying to control that is causing you unnecessary stress?"
        ]
      }
    ]
  },
  {
    id: "confucius_analects",
    title: "The Analects of Confucius",
    sanskritTitle: "論語 (कन्फ्यूशियस सूत्राणि)",
    author: "Confucius (Kong Fuzi)",
    category: "World Philosophy",
    coverImage: "",
    description: "Classical Chinese discourses on benevolence (Ren), filial piety, ritual harmony (Li), and ethical leadership.",
    historicalContext: "Compiled by disciples during the Warring States period (c. 475–221 BCE).",
    publicDomainLicense: "Public Domain",
    rating: 4.7,
    audioAvailable: true,
    totalEstReadMinutes: 105,
    chapters: [
      {
        id: "conf_ch1",
        chapterNumber: 1,
        title: "On Virtue & Moral Character",
        sanskritTitle: "仁 (Ren)",
        summary: "Cultivating empathy, self-reflection, and social harmony.",
        estimatedReadTimeMinutes: 14,
        content: `The Master said: "Is it not a pleasure to learn and frequently review what you have learned? Is it not delightful to have friends coming from distant lands? Is one not a noble person if they remain unruffled when unrecognized by others?"\n\n"Do not do to others what you would not want done to yourself."\n\nA noble person (Junzi) seeks self-improvement; a shallow person seeks demands on others. When you see a worthy person, endeavor to emulate them. When you see an unworthy person, examine your own inner character.`,
        keyLessons: [
          "The Silver Rule: Treat others as you wish to be treated.",
          "Continuous self-examination is key to character growth.",
          "True nobility comes from internal virtue, not wealth or status."
        ],
        reflectionQuestions: [
          "How often do you examine your own mistakes before blaming others?"
        ]
      }
    ]
  },
  {
    id: "tao_te_ching",
    title: "Tao Te Ching",
    sanskritTitle: "道德經 (लाओत्से मार्गः)",
    author: "Lao Tzu",
    category: "World Philosophy",
    coverImage: "",
    description: "The classic on the Way (Tao), natural flow, effortless action (Wu Wei), and gentle simplicity.",
    historicalContext: "Composed in ancient China around 6th century BCE.",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 80,
    chapters: [
      {
        id: "tao_ch1",
        chapterNumber: 1,
        title: "The Nameless Tao & Wu Wei",
        sanskritTitle: "無爲 (Wu Wei)",
        summary: "Flowing with natural laws without forcing outcomes.",
        estimatedReadTimeMinutes: 12,
        content: `The Tao that can be spoken is not the eternal Tao. The name that can be named is not the eternal name.\n\nWater is fluid, soft, and yielding. But water will wear away rock, which is rigid and cannot yield. As a rule, whatever is fluid, soft, and yielding will overcome whatever is rigid and hard.\n\nPractice Wu Wei (effortless action): work with natural rhythms rather than forcing outcomes against the grain. Be like water—nourish all things without striving.`,
        keyLessons: [
          "Wu Wei: Accomplish tasks by yielding and moving with natural momentum.",
          "Simplicity, patience, and compassion are your greatest treasures.",
          "Rigidity leads to breakage; flexibility leads to endurance."
        ],
        reflectionQuestions: [
          "Where in your life are you pushing too hard instead of flowing with patience?"
        ]
      }
    ]
  },

  // --- SPIRITUAL CLASSICS ---
  {
    id: "gibran_prophet",
    title: "The Prophet",
    sanskritTitle: "पैगम्बरः (खलील जिब्रान)",
    author: "Kahlil Gibran",
    category: "Spiritual Classics",
    coverImage: "",
    description: "Poetic prose essays on love, marriage, work, joy, sorrow, freedom, and friendship.",
    historicalContext: "Published in 1923, translated into over 100 languages as a timeless masterpiece of wisdom poetry.",
    publicDomainLicense: "Public Domain",
    rating: 4.9,
    audioAvailable: true,
    totalEstReadMinutes: 90,
    chapters: [
      {
        id: "gibran_ch1",
        chapterNumber: 1,
        title: "On Love, Work & Giving",
        sanskritTitle: "प्रेम च कार्यम्",
        summary: "Work is love made visible.",
        estimatedReadTimeMinutes: 14,
        content: `Then Almitra said, Speak to us of Love. And he raised his head and looked upon the people, and there fell a stillness upon them.\n\n"When love beckons to you, follow him, though his ways are hard and steep. And when his wings enfold you yield to him, though the sword hidden among his pinions may wound you."\n\nAnd what is it to work with love?\nIt is to weave the cloth with threads drawn from your heart, even as if your beloved were to wear that cloth. Work is love made visible.`,
        keyLessons: [
          "Work is love made visible: pour heart and care into whatever you build.",
          "Give freely without keeping score.",
          "Joy and sorrow are inseparable companions in human experience."
        ],
        reflectionQuestions: [
          "How can you bring a spirit of love and care into your work today?"
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
