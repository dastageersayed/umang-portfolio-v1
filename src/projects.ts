/**
 * Add a project: drop screenshots in public/shots/ and append an entry here.
 * `shots` are paths under public/. `scope` and `tools` are optional; leave them out when unsure.
 */
export type Project = {
  id: string
  title: string
  kind: string
  url?: string
  summary: string
  scope?: string
  tools?: string[]
  shots: string[]
}

const shots = (slug: string, n: number, ext = 'jpeg') => Array.from({ length: n }, (_, i) => `/shots/${slug}-${i + 1}.${ext}`)

export const projects: Project[] = [
  {
    id: 'smms',
    title: 'SMMS Web Suite',
    kind: 'Marine management, web and desktop',
    summary:
      'Shipping-industry platform that connects vessel crew with the shore office. Modules cover requisitions and approvals, planned maintenance (PMS), inventory, documents (DMS), safety, health, environment and quality (SHEQ), and vessel management (VEMS).',
    scope: 'Functional, UI, smoke, sanity, regression, integration and end-to-end testing, with Selenium regression automation and Postman and Swagger API checks.',
    shots: shots('smms', 1, 'png'),
  },
  {
    id: 'wize',
    title: 'Wize',
    kind: 'AI video and social media platform',
    summary:
      'Creates AI videos with avatars and ready-made templates, with avatar and voice libraries, a review queue for approvals, and a post calendar for scheduling social media.',
    scope: 'Functional and UI testing, plus checks of AI-generated output across varied inputs.',
    shots: shots('wize', 1, 'png'),
  },
  {
    id: 'metrobeauty',
    title: 'Metro Beauty',
    kind: 'Salon management platform',
    summary:
      'Runs a salon day to day: a dashboard, appointments, a calendar with date-wise views, booking management, and business settings, with onboarding that sets up the salon step by step.',
    scope: 'Functional, UI and regression testing, including the multi-step onboarding flow.',
    shots: shots('metrobeauty', 1, 'png'),
  },
  {
    id: 'userai',
    title: 'User AI',
    kind: 'AI assistant',
    summary: 'Chat assistant where users ask questions, generate images and keep their work in a library, with a Pro tier for upgraded users.',
    scope: 'Functional and UI testing, plus checks of AI responses across varied inputs.',
    shots: shots('userai', 1, 'png'),
  },
  {
    id: 'chathop',
    title: 'ChatHop',
    kind: 'AI chat application',
    summary: 'Conversational AI chat where users ask questions on any topic and get answers quickly, with saved chats, search and projects.',
    scope: 'Checks of AI responses for accuracy and relevance, plus functional and UI testing.',
    shots: shots('chathop', 1, 'png'),
  },
  {
    id: 'cooler',
    title: 'The Cooler Concierge',
    kind: 'Shopify storefront',
    summary:
      'Online shop for curated cooler packs filled with food and non-alcoholic drinks, in categories such as Indulgence, Sip & Spread, Concierge and Brunch, with product pages, FAQs and about pages.',
    scope: 'Functional and UI testing of browsing, pack selection and content pages.',
    shots: shots('cooler', 1, 'png'),
  },
  {
    id: 'mindgtc',
    title: 'MindGTC',
    kind: 'Web3 token and launch platform',
    url: 'https://mindgtc.com/',
    summary: 'Platform for creating tokens, liquidity pools, locks and airdrops from one dashboard.',
    scope: 'Functional, UI, regression, API and exploratory testing.',
    shots: shots('mindgtc', 2),
  },
  {
    id: 'washy',
    title: 'Washy AI',
    kind: 'AI content checker',
    url: 'https://www.washy.ai/',
    summary:
      'AI application where users sign in, submit text for analysis, and get AI-generated results. Features depend on the subscription plan, Pro unlocks more, and the app tracks how many analyses a user has left. It scores content against ten dimensions of value-washing.',
    scope: 'Functional and UI testing, plus checks of AI-generated results across varied inputs.',
    shots: shots('washy', 3),
  },
  {
    id: 'pressmegpt',
    title: 'PressMeGPT',
    kind: 'WordPress AI site builder',
    url: 'https://pressmegpt.com/',
    summary: 'AI website builder and theme generator for WordPress.',
    scope: 'Functional and UI testing, plus checks of AI-generated output across varied inputs.',
    shots: shots('pressmegpt', 3),
  },
  {
    id: 'besttherapist',
    title: 'Best Therapist',
    kind: 'Hypnotherapy practice platform (UAT build)',
    url: 'https://besttherapist-uat.vercel.app/',
    summary: 'Practice management site for hypnotherapists, tested on the UAT deployment.',
    scope: 'Functional, UI and regression testing.',
    shots: shots('besttherapist', 2),
  },
  {
    id: 'phoneskills',
    title: 'PhoneSkills AI',
    kind: 'AI call training',
    url: 'https://phone.ringringcloser.com/',
    summary: 'Sales reps practise phone calls with AI scenarios and get feedback.',
    shots: shots('ringring', 2),
  },
  {
    id: 'hfh',
    title: 'High Frequency Highway',
    kind: 'App help centre',
    url: 'https://highfrequencyhw.com/help/home-and-sounds/',
    summary: 'Help documentation for the app home screen and sounds.',
    scope: 'Functional and UI testing.',
    shots: shots('hfh', 3),
  },
  {
    id: 'afa',
    title: 'AFA Community',
    kind: 'Court booking, web scheduler',
    url: 'https://webscheduler.afa-sports.com/login/',
    summary: 'Court booking scheduler. Only the public sign-in page is shown.',
    scope: 'Manual functional, UI and regression testing on web and mobile.',
    shots: shots('afa', 1),
  },
  {
    id: 'scarves',
    title: 'Knitted Scarves',
    kind: 'WordPress storefront',
    url: 'https://adamk239.sg-host.com/',
    summary: 'Online shop for knitted scarves.',
    shots: shots('scarves', 3),
  },
  {
    id: 'kingdom',
    title: 'Kingdom of Pubertatem',
    kind: 'Site under construction',
    url: 'https://kingdomofpubertatem.com/',
    summary: 'Currently showing a maintenance page.',
    shots: shots('kingdom', 1),
  },
]
