// Verbatim from COPY.md (v3, Sep 27 2026). Only change: straight apostrophes set as typographic ones.

export const site = {
  url: 'https://vishnusudhan.com',
  name: 'Vishnu Sudhan',
  title: 'Vishnu Sudhan · Partnerships and Alliances, Chennai',
  description:
    'I’m Vishnu Sudhan, Partnerships and Alliances at Digitraly in Chennai. I started in SEO, worked as a freelance marketer, and build partnerships meant to last.',
  jobTitle: 'Partnerships and Alliances',
  org: 'Digitraly',
  city: 'Chennai',
  email: 'hello@vishnusudhan.com',
  linkedin: 'https://www.linkedin.com/in/vishnu-sudhan/',
  linkedinLabel: 'linkedin.com/in/vishnu-sudhan',
};

export const hero = {
  eyebrow: 'A conversation with Vishnu Sudhan',
  line1: ['Understand', 'the', 'goal.'],
  line2: ['Then', 'do', 'the', 'work.'],
  chipsLabel: 'Ask me something',
};

export interface Exchange {
  id: string;
  q: string;
  a: string[];
}

export const qa = {
  hello: {
    id: 'q-hello',
    q: 'Hi. Tell me about yourself.',
    a: [
      'I’m Vishnu Sudhan. Partnerships and Alliances at Digitraly, based in Chennai, 4.5+ years in. Most people get here through sales. I got here through SEO.',
    ],
  },
  work: {
    id: 'q-do',
    q: 'So, what do you currently do?',
    a: [
      'I build and run partnerships for Digitraly across aviation, fintech and healthcare in APAC. Quietly one of the more complex spaces to work in. Every partner brings its own layer of compliance before anyone even talks numbers.',
    ],
  },
  who: {
    id: 'q-who',
    q: 'Who do you actually partner with?',
    a: [
      'It depends on the business need. Sometimes it’s a product worth reselling, sometimes staff augmentation, sometimes a tender that needs a partner to qualify for it. Underneath most of it is a network of CMMI Level 5 partners, companies rated at the top for how reliably they deliver.',
      'And when things get messy, I don’t wait for the job description to catch up. If something needs doing and would otherwise drop, I pick it up.',
    ],
  },
  seo: {
    id: 'q-seo',
    q: 'How did an SEO intern end up in partnerships?',
    a: [
      'One step at a time, and by learning to understand the purpose of a task before starting it. I started as an SEO intern at Joy Technologies and worked up to team lead. As an intern, I did what the brief said. By the time I led the team, I’d check what was already known first, ask only what was missing, and pass it on clean so nobody had to guess. That habit came with me into Partnerships and Alliances.',
    ],
  },
  marketer: {
    id: 'q-marketer',
    q: 'You joined as a marketer. How did you end up in partnerships?',
    a: [
      'Might trace back to my Economics degree, funnily enough. It was offered to me after six months as a Digital Marketing Executive, and I took it. What pulled me in was getting closer to how a business actually thinks: how stakeholders see their vision, and talking directly with the people who make the decisions. That part still excites me.',
    ],
  },
  freelance: {
    id: 'q-free',
    q: 'Have you worked as a freelancer?',
    a: [
      'Yes, twice. Once before I joined Joy Technologies, and again after I left Joy, before Digitraly. Both times I worked on websites, SEO, social media and lead generation for an NGO, a real estate firm and a marketing agency. Two moments from that work:',
    ],
  },
  principles: {
    id: 'q-non',
    q: 'What’s non-negotiable for you?',
    a: ['Three things. Everything else is detail.'],
  },
  proof: {
    id: 'q-cert',
    q: 'Can you share some of your notable certificates you’ve earned?',
    a: [
      'Sure, 15+ so far. A few that stuck with me:',
      'Outside all of that, I’m teaching myself to code. Zero background, just wanted to see how far AI could take someone starting from nothing. There’s a working app prototype to show for it.',
    ],
  },
  reach: {
    id: 'q-reach',
    q: 'How do I reach you?',
    a: ['If you’re looking for a long-term partner, or want to work together, reach out.'],
  },
} satisfies Record<string, Exchange>;

// Hero shortcuts: one per section, in page order. Labels can be shorter than the question.
export const chips = [
  { id: qa.work.id, label: 'What do you currently do?' },
  { id: qa.seo.id, label: qa.seo.q },
  { id: qa.freelance.id, label: qa.freelance.q },
  { id: qa.principles.id, label: qa.principles.q },
  { id: qa.proof.id, label: 'Can you share your notable certificates?' },
  { id: qa.reach.id, label: qa.reach.q },
];

export const partnershipLine = {
  label: 'A partnership, over time',
  cue: 'scroll ↓',
  caption: 'The line doesn’t end at the edge of this card.',
  stamp: 'Most people stop here',
  nodes: [
    { at: 0.02, label: 'First meeting', kind: 'start' },
    { at: 0.26, label: 'Signed', kind: 'signed' },
    { at: 0.5, label: 'Showing up', kind: 'dot' },
    { at: 0.7, label: 'Still talking', kind: 'dot' },
    { at: 0.9, label: 'Years later', kind: 'end' },
  ],
} as const;

export const career = {
  label: 'Career, forwarded',
  caption: 'Hatched stops are freelance. No gaps.',
  stops: [
    { role: 'Freelance', org: 'Websites, SEO, social, lead gen', note: 'Before Joy Technologies.', tag: 'Freelance', freelance: true },
    { role: 'SEO Intern', org: 'Joy Technologies', note: 'Did what the brief said.' },
    { role: 'Team Lead', org: 'Joy Technologies', note: 'Checked what was known. Asked only what was missing.' },
    { role: 'Freelance', org: 'NGO, real estate, marketing agency', note: 'After Joy, before Digitraly.', tag: 'Freelance', freelance: true },
    { role: 'Digital Marketing Executive', org: 'Digitraly', note: 'Six months in, partnerships was offered.' },
    { role: 'Partnerships and Alliances', org: 'Digitraly', note: 'Now.', tag: 'Current' },
  ],
};

export const flips = [
  {
    label: '01 · The rebuild',
    front: 'Their idea wouldn’t hold up',
    back: 'A client came in with a fixed idea for their website. We tested it early, it didn’t hold up, and I made the case to scrap it and start over. They weren’t sold at first. They are now.',
  },
  {
    label: '02 · The daily posting ask',
    front: 'They wanted posts daily',
    back: 'A client wanted social posts every single day. I didn’t have the bandwidth and said so, and the client wasn’t happy. I owned that, found the root cause, and learned to use AI for ideas and scheduling so it wouldn’t happen again.',
  },
];

export const principles = [
  { title: 'Understand the purpose first.', desc: 'I ask until I understand the purpose. But I look first, so I only ask what isn’t already out there.' },
  { title: 'Think long term.', desc: 'I plan every partnership for year three, not just the first deal.' },
  { title: 'The business goal decides.', desc: 'Not the brief, not the deliverable, not how good it looks. Did it move the business?' },
];

export const certificates = [
  { name: 'Microsoft: AI Business Professional', note: 'Less about the tools, more about where AI actually changes a business decision.' },
  { name: 'Google Play Academy: Store Listing Certificate', note: 'Went in expecting checkbox content. Came out understanding what actually gets an app noticed.' },
  { name: 'MSDE Skill India: Generative AI Bootcamp', note: 'Government-run, hands-on, not a weekend badge.' },
  { name: 'Harvard Business School Online: Financial Accounting', note: 'Not my background, but partnership decisions get easier when you can read a balance sheet.' },
  { name: 'Google: Fundamentals of Digital Marketing', note: 'Where it all started, long before SEO or partnerships.' },
];

export const build = {
  name: 'app-prototype',
  label: 'build status',
  steps: [
    { name: 'Idea', state: 'sent', done: 1 },
    { name: 'Prototype', state: 'delivered', done: 2 },
    { name: 'Beta', state: 'sending…', done: 0 },
  ],
};

export const composer = {
  placeholder: 'Write to Vishnu…',
  hint: 'opens your email',
  subject: 'Hi Vishnu',
};

export const footer = {
  lead: 'I’m glad you made it here.',
  close: 'Say hello.',
  line: 'Economics, Loyola College · Master’s, Bharathiar University · Rotaract, Club Service Director then Treasurer · Chennai',
};

export const chapters = {
  hello: { n: '01', title: 'Hello' },
  path: { n: '02', title: 'The path' },
  freelance: { n: '03', title: 'Freelance' },
  principles: { n: '04', title: 'Non-negotiables' },
  proof: { n: '05', title: 'Proof' },
  contact: { n: '06', title: 'Contact' },
};

// FAQPage answers: every Guest question with its full answer text.
export function faqAnswers(): { q: string; a: string }[] {
  const join = (parts: string[]) => parts.join(' ');
  return [
    { q: qa.hello.q, a: join(qa.hello.a) },
    { q: qa.work.q, a: join(qa.work.a) },
    { q: qa.who.q, a: join(qa.who.a) },
    { q: qa.seo.q, a: join(qa.seo.a) },
    { q: qa.marketer.q, a: join(qa.marketer.a) },
    {
      q: qa.freelance.q,
      a: join([...qa.freelance.a, ...flips.map((f) => `${f.front}: ${f.back}`)]),
    },
    {
      q: qa.principles.q,
      a: join([...qa.principles.a, ...principles.map((p, i) => `${i + 1}. ${p.title} ${p.desc}`)]),
    },
    {
      q: qa.proof.q,
      a: join([qa.proof.a[0]!, ...certificates.map((c) => `${c.name}: ${c.note}`), qa.proof.a[1]!]),
    },
    { q: qa.reach.q, a: join([...qa.reach.a, site.email, site.linkedinLabel]) },
  ];
}
