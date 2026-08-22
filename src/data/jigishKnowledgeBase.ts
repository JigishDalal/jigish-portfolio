export interface KnowledgeCategory {
  id: string;
  topic: string;
  keywords: string[];
  response: string;
  bulletPoints?: string[];
  suggestedFollowUps?: string[];
}

export const JIGISH_KNOWLEDGE_BASE: KnowledgeCategory[] = [
  {
    id: 'bio_experience',
    topic: 'Background & Summary',
    keywords: [
      'who', 'jigish', 'about', 'summary', 'background', 'years', 'experience',
      'history', 'role', 'senior', 'developer', 'engineer', 'architect'
    ],
    response: "Hi! I'm Jigish Dalal, a Senior Mobile & Systems Engineer with 8+ years of experience building high-performance mobile products and scalable real-time architectures. I specialize in Flutter, native Android, and modern full-stack web applications.",
    bulletPoints: [
      '8+ years of professional software engineering delivery',
      'Specialized in Flutter, Android (Kotlin/Java), & React/TypeScript',
      'Shipped 10+ production applications across App Store & Play Store',
      'Experience in Fintech, Healthcare, Enterprise POS, & Real-Time Workflows'
    ],
    suggestedFollowUps: ['What is your Flutter experience?', 'Which projects have you built?', 'Are you available for hire?']
  },
  {
    id: 'skills_tech',
    topic: 'Skills & Tech Stack',
    keywords: [
      'skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'language',
      'languages', 'framework', 'frameworks', 'tool', 'tools', 'dart', 'kotlin',
      'java', 'typescript', 'react', 'bloc', 'provider', 'riverpod', 'redux', 'node', 'firebase'
    ],
    response: "Jigish's technical toolkit is centered on mobile engineering and modern full-stack systems:",
    bulletPoints: [
      'Mobile: Flutter, Dart, Android (Kotlin / Java), iOS (Swift basics), React Native',
      'Architecture & State: BLoC, Provider, Riverpod, Clean Architecture, MVVM',
      'Web & Backend: TypeScript, React, Node.js, WebGL, GraphQL, REST APIs',
      'Cloud & Data: Firebase (Auth, Firestore, Hosting, Crashlytics), PostgreSQL, SQL',
      'DevOps & Tools: Git, CI/CD pipelines, App Store Connect, Google Play Console'
    ],
    suggestedFollowUps: ['Tell me about your Flutter experience', 'Have you worked with Firebase?', 'What industries have you worked in?']
  },
  {
    id: 'flutter_mobile',
    topic: 'Flutter & Mobile Craft',
    keywords: [
      'flutter', 'dart', 'mobile', 'ios', 'android', 'app', 'apps', 'playstore',
      'appstore', 'native', 'performance', 'animation', 'ui', 'ux'
    ],
    response: "Flutter & native mobile development are Jigish's core superpowers. He has architected and delivered production apps used by thousands of daily users.",
    bulletPoints: [
      'Cross-platform iOS & Android apps built with single Dart codebase',
      'Custom micro-animations, 60fps UI performance profiling & zero-lag rendering',
      'Complex offline-first data sync, local SQLite/Isar storage, and background services',
      'End-to-end publishing pipeline: certificates, code signing, and release logs'
    ],
    suggestedFollowUps: ['Which industries have you worked in?', 'Show me your key projects', 'Is Jigish available for hire?']
  },
  {
    id: 'projects_portfolio',
    topic: 'Key Projects',
    keywords: [
      'project', 'projects', 'work', 'works', 'portfolio', 'venturecheck', 'app',
      'built', 'created', 'developed', 'case', 'studies'
    ],
    response: "Jigish has delivered diverse flagship products across mobile and web:",
    bulletPoints: [
      'VentureCheck: AI-assisted startup analysis and investment verification platform',
      'Banking & Fintech App: Real-time transactions, secure auth, biometric login & wallet management',
      'POS & Retail System: Offline-first point-of-sale terminal with Bluetooth receipt printing',
      'Emergency Medical Dispatch: Low-latency emergency response tracker with live GPS positioning'
    ],
    suggestedFollowUps: ['Which industries have you worked in?', 'What is your availability?', 'How can I contact Jigish?']
  },
  {
    id: 'industries_domains',
    topic: 'Industry Experience',
    keywords: [
      'industry', 'industries', 'domain', 'domains', 'fintech', 'banking', 'finance',
      'healthcare', 'medical', 'pos', 'retail', 'enterprise', 'productivity'
    ],
    response: "Jigish's domain expertise spans regulated, high-reliability industries:",
    bulletPoints: [
      'Fintech & Banking: High-security authentication, PCI-DSS considerations, transaction logs',
      'Healthcare & Emergency: HIPAA-conscious data flows, real-time geolocation tracking',
      'Enterprise & POS: Multi-tenant SaaS workflows, offline transaction queuing, hardware integrations',
      'Productivity & AI: Intelligent document search, automated report generators, and AI assistants'
    ],
    suggestedFollowUps: ['What tech stack do you use?', 'Are you available for hire?', 'How can I contact Jigish?']
  },
  {
    id: 'availability_hire',
    topic: 'Availability & Engagement',
    keywords: [
      'available', 'availability', 'hire', 'hiring', 'freelance', 'contract',
      'fulltime', 'full-time', 'job', 'opportunity', 'remote', 'work', 'start', 'join'
    ],
    response: "Yes! Jigish is currently available for select new opportunities — including full-time senior engineering roles, high-impact contract work, or technical consulting.",
    bulletPoints: [
      'Immediate / short notice availability',
      'Open to Remote, Hybrid, or Contract arrangements',
      'Flexible with international team timezones (US, Europe, Asia)',
      'Fastest way to get in touch: jigishdalal@gmail.com'
    ],
    suggestedFollowUps: ['How can I contact Jigish?', 'What is your experience level?', 'What projects have you built?']
  },
  {
    id: 'contact_info',
    topic: 'Contact & Links',
    keywords: [
      'contact', 'email', 'reach', 'github', 'linkedin', 'connect', 'message',
      'send', 'talk', 'mail', 'phone'
    ],
    response: "You can reach out to Jigish directly through any of these channels:",
    bulletPoints: [
      'Email: jigishdalal@gmail.com',
      'GitHub: github.com/jigishdalal',
      'LinkedIn: linkedin.com/in/jigishdalal',
      'Or click the "Send Request" button in the hero section to open a direct message'
    ],
    suggestedFollowUps: ['What is your tech stack?', 'Are you available for hire?', 'What projects have you built?']
  },
  {
    id: 'philosophy_craft',
    topic: 'Philosophy & Engineering Craft',
    keywords: [
      'philosophy', 'craft', 'quality', 'architecture', 'clean', 'testing',
      'methodology', 'approach', 'design', 'performance'
    ],
    response: "Jigish believes software should be fast, reliable, and visually delightful:",
    bulletPoints: [
      'Clean Code & Modular Architecture: Maintainable BLoC/MVVM patterns with strong test coverage',
      'Performance-First: 60fps smooth animations and minimal memory footprints',
      'User-Centric Craft: Thoughtful micro-interactions that make applications feel alive',
      'Pragmatic Delivery: Shipping production value quickly without cutting architectural corners'
    ],
    suggestedFollowUps: ['What tech stack do you use?', 'Tell me about your experience', 'How can I contact Jigish?']
  }
];

export const DEFAULT_PROMPTS = [
  { label: 'Core Tech Stack', query: 'What is your core tech stack?' },
  { label: 'Flutter Experience', query: 'Tell me about your Flutter & mobile experience.' },
  { label: 'Key Projects', query: 'What flagship projects have you built?' },
  { label: 'Industry Expertise', query: 'Which industries have you worked in?' },
  { label: 'Current Availability', query: 'Are you available for hire or contracts?' },
  { label: 'Contact Info', query: 'How can I contact Jigish?' }
];
