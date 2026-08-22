import { JIGISH_KNOWLEDGE_BASE } from '../data/jigishKnowledgeBase';

export interface SmartAnswer {
  topic: string;
  mainText: string;
  bulletPoints: string[];
  suggestedFollowUps: string[];
}

/**
 * Tokenize and normalize user query text.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1);
}

/**
 * Process a user question using 100% client-side natural language processing.
 * Evaluates intent scores, handles multi-topic queries, and synthesizes natural responses.
 */
export function processQuestion(userQuery: string): SmartAnswer {
  const query = userQuery.trim();
  if (!query) {
    return getFallbackAnswer();
  }

  const tokens = tokenize(query);

  // Greetings check
  const isGreeting = tokens.some(t => ['hi', 'hello', 'hey', 'greetings', 'sup', 'hola'].includes(t));
  if (isGreeting && tokens.length <= 3) {
    return {
      topic: 'Welcome',
      mainText: "Hello! I'm Jigish's Portfolio AI Guide. Ask me anything about Jigish's mobile engineering experience, technical skills, launched projects, or availability!",
      bulletPoints: [
        '8+ Years of Mobile & Full-Stack Development',
        'Expert in Flutter, Android, & Modern Architectures',
        'Available for new projects & opportunities'
      ],
      suggestedFollowUps: ['What is your tech stack?', 'Tell me about your Flutter experience', 'Are you available for hire?']
    };
  }

  // Score each category in the knowledge base
  const scoredCategories = JIGISH_KNOWLEDGE_BASE.map(cat => {
    let score = 0;

    cat.keywords.forEach(keyword => {
      const kwTokens = tokenize(keyword);
      kwTokens.forEach(kwToken => {
        if (tokens.includes(kwToken)) {
          score += 2;
        } else if (tokens.some(t => t.startsWith(kwToken) || kwToken.startsWith(t))) {
          score += 1;
        }
      });
    });

    return { category: cat, score };
  }).sort((a, b) => b.score - a.score);

  const topMatch = scoredCategories[0];

  // If we have a strong match (score >= 2)
  if (topMatch && topMatch.score >= 2) {
    const cat = topMatch.category;

    // Check for a secondary high-scoring category (multi-topic merge)
    const secondMatch = scoredCategories[1];
    if (secondMatch && secondMatch.score >= 2 && secondMatch.score >= topMatch.score * 0.7) {
      const cat2 = secondMatch.category;
      return {
        topic: `${cat.topic} & ${cat2.topic}`,
        mainText: `${cat.response}\n\nAdditionally regarding ${cat2.topic.toLowerCase()}: ${cat2.response}`,
        bulletPoints: [
          ...(cat.bulletPoints || []),
          ...(cat2.bulletPoints || [])
        ].slice(0, 5),
        suggestedFollowUps: Array.from(new Set([
          ...(cat.suggestedFollowUps || []),
          ...(cat2.suggestedFollowUps || [])
        ])).slice(0, 3)
      };
    }

    return {
      topic: cat.topic,
      mainText: cat.response,
      bulletPoints: cat.bulletPoints || [],
      suggestedFollowUps: cat.suggestedFollowUps || [
        'What is your core tech stack?',
        'Which projects have you built?',
        'How can I contact Jigish?'
      ]
    };
  }

  // Weak or ambiguous match fallback
  return getFallbackAnswer(query);
}

function getFallbackAnswer(originalQuery = ''): SmartAnswer {
  if (originalQuery) {
    return {
      topic: 'Portfolio Guide Assistant',
      mainText: `I am specialized specifically as Jigish's personal Portfolio Guide! While I can't answer general trivia or off-topic questions, I can tell you all about Jigish's 8+ years of engineering experience, Flutter & mobile craft, launched projects, or availability. What would you like to know about Jigish's work?`,
      bulletPoints: [
        'Core Tech: Flutter, Dart, Android (Kotlin/Java), React, TypeScript',
        '8+ Years shipping scalable production mobile & web applications',
        'Experience in Fintech, Healthcare, & Enterprise POS platforms',
        'Direct Contact: jigishdalal@gmail.com'
      ],
      suggestedFollowUps: [
        'What is Jigish\'s core tech stack?',
        'Tell me about your Flutter experience',
        'Is Jigish available for hire?'
      ]
    };
  }

  return {
    topic: 'Portfolio Guide Assistant',
    mainText: `Choose a quick prompt below or ask any question about Jigish's experience, technical stack, key projects, or availability.`,
    bulletPoints: [
      'Core Tech: Flutter, Dart, Android (Kotlin/Java), React, TypeScript',
      '8+ Years shipping production mobile & web applications',
      'Specialized in Fintech, Healthcare, & Enterprise POS systems',
      'Available for full-time roles, contracts, and technical consulting'
    ],
    suggestedFollowUps: [
      'What is your core tech stack?',
      'Tell me about your Flutter experience',
      'How can I contact Jigish?'
    ]
  };
}
