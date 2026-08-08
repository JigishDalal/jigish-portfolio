export type PortfolioCategory = 'Mobile App' | 'Web App' | 'Fullstack' | 'Open Source';

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  tech: string[];
  links: {
    live?: string;
    github?: string;
    playstore?: string;
    appstore?: string;
  };
  coverColor: string;
  featured: boolean;
  year: string;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'Mobile App',
  'Web App',
  'Fullstack',
  'Open Source',
];

const defaultPortfolio: PortfolioItem[] = [
  {
    id: '1',
    title: 'Always CPR',
    category: 'Mobile App',
    description:
      'Full-featured training management app for CPR centers. Manages courses, homework, instructor scheduling, and real-time location tracking with offline support.',
    tech: ['Flutter', 'Dart', 'REST API', 'Location Services', 'Firebase'],
    links: { appstore: '#', playstore: '#' },
    coverColor: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    featured: true,
    year: '2024',
  },
  {
    id: '2',
    title: 'TinyBit',
    category: 'Mobile App',
    description:
      'Role-based family productivity app for parents and children. Features custom alarm systems, task assignments, repeat scheduling, and completion tracking.',
    tech: ['Flutter', 'Dart', 'Local Notifications', 'RBAC', 'SQLite'],
    links: { playstore: '#' },
    coverColor: 'linear-gradient(135deg, #22d3ee, #6366f1)',
    featured: true,
    year: '2023',
  },
  {
    id: '3',
    title: 'EMED Rescue',
    category: 'Mobile App',
    description:
      'Critical care emergency response app with one-tap panic button for immediate communication with responders. Optimized for sub-second response times.',
    tech: ['Flutter', 'Dart', 'Real-time API', 'WebSockets', 'Firebase FCM'],
    links: { playstore: '#', appstore: '#' },
    coverColor: 'linear-gradient(135deg, #ef4444, #f97316)',
    featured: true,
    year: '2023',
  },
  {
    id: '4',
    title: 'ZinniaX IONM',
    category: 'Fullstack',
    description:
      'AI-powered Point-of-Sale system with edge detection camera integration for inventory management. Increased system stability to 90% uptime.',
    tech: ['Angular', 'Spring Boot', 'AI Camera SDK', 'MySQL', 'REST APIs'],
    links: {},
    coverColor: 'linear-gradient(135deg, #10b981, #6366f1)',
    featured: false,
    year: '2024',
  },
  {
    id: '5',
    title: 'M-CTS Banking',
    category: 'Mobile App',
    description:
      'Mobile Cheque Truncation System for SCB, IDFC, and Axis Bank. Enterprise-grade banking app with multi-layer security and address verification workflow.',
    tech: ['Android', 'Kotlin', 'Java', 'Banking APIs', 'Encryption'],
    links: {},
    coverColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    featured: false,
    year: '2022',
  },
  {
    id: '6',
    title: 'Portfolio Website',
    category: 'Web App',
    description:
      'This very portfolio — built with React, Three.js, and Framer Motion. Features a 3D animated hero, static blog, and admin panel.',
    tech: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'Vite'],
    links: { live: '/', github: '#' },
    coverColor: 'linear-gradient(135deg, #a855f7, #ec4899)',
    featured: false,
    year: '2024',
  },
  {
    id: '7',
    title: 'VentureCheck',
    category: 'Web App',
    description:
      'A comprehensive tracking and analysis platform for new ventures. App details and plans with animations.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Node.js', 'PostgreSQL'],
    links: { live: '/projects/venturecheck', github: 'https://github.com/JigishDalal/ventureCheck' },
    coverColor: 'linear-gradient(135deg, #3b82f6, #10b981)',
    featured: true,
    year: '2024',
  },
];

const STORAGE_KEY = 'jigish_portfolio_items';

export function getPortfolioItems(): PortfolioItem[] {
  let items = [...defaultPortfolio];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PortfolioItem[];
      if (parsed.length > 0) {
        // Keep stored items but append any new default items that aren't in storage yet
        const storedIds = new Set(parsed.map(i => i.id));
        const newItems = defaultPortfolio.filter(i => !storedIds.has(i.id));
        items = [...parsed, ...newItems];
        
        // Save back if we added new items
        if (newItems.length > 0) {
          savePortfolioItems(items);
        }
        return items;
      }
    }
  } catch { }
  return items;
}

export function savePortfolioItems(items: PortfolioItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getFeaturedItems(): PortfolioItem[] {
  return getPortfolioItems().filter(i => i.featured);
}
