/**
 * Case study data — maps to CaseStudyCard and CaseStudyPage.
 * Each entry has a summary (for the card) + a `detail` block (for the full page).
 */
export const caseStudies = [
  {
    id: 'altech',
    categorySlug: 'ux-design',
    thumbnail: '/case-altech.png',
    title: 'Altech-HK — 3D Immersive Experience',
    description:
      'Designing a high-impact 3D experience that transforms complex systems into intuitive, interactive storytelling.',
    tags: ['UX & Product Direction', 'Art Direction', '3D Interaction Design'],
    duration: '1–2 months',
    role: 'Creative Lead',
    href: null,
    links: [
      { label: 'Visit Link', url: 'https://3d.altech.hk/' },
      { label: 'Awwwards', url: 'https://www.awwwards.com/sites/altech-it-solution-company' },
    ],
    detail: {
      hero: {
        title: 'Altech-HK — 3D Immersive Experience Platform',
        subtitle:
          'A 3D immersive website designed under tight timelines to communicate a complex ecosystem through clarity, motion, and interaction.',
      },
      role: 'Creative Lead, UX/UI, Art Direction, System Thinking',
      timeline: '1–2 months',
      whatILed: [
        'UX & Product Direction',
        'End-to-end Experience Design',
        'Visual & Art Direction',
        '3D Interaction Concept',
        'Design System Structuring',
        'Cross-team Collaboration',
      ],
      impact: [
        'Awwwards Honorable Mention',
        'Increased inbound interest and engagement',
        'Elevated brand perception',
        'Built a scalable interaction framework',
      ],
      problem: {
        heading: 'The real challenge wasn\'t visual — it was cognitive.',
        body: 'How do we make users understand a complex system instantly, without overwhelming them?',
      },
      directions: {
        exploring: [
          '3D storytelling vs traditional UI',
          'Guided flow vs free exploration',
          'Cinematic vs functional',
        ],
        final: 'A 3D-first guided experience that reduces cognitive load.',
      },
      design: [
        'Central 3D object as interaction anchor',
        'Minimal UI, maximum clarity',
        'Motion used as narrative',
        'Layered information instead of dumping content',
      ],
      systemThinking: [
        'Modular components',
        'Reusable interaction patterns',
        'Structured content hierarchy',
        'Built for scale, not just delivery.',
      ],
      collaboration: [
        'Tight loop with developers',
        'Early alignment on feasibility',
        'Close work with 3D artists',
      ],
      reflection:
        'Design isn\'t about making things look complex.\nIt\'s about making complexity disappear.',
    },
  },
  {
    id: 'aws-football',
    categorySlug: 'ux-design',
    thumbnail: '/case-aws.png',
    title: 'Agentic Football — AI-Powered Game Experience',
    description:
      'A playful, system-driven football experience where AI agents actively assist players, transforming chaotic gameplay into coordinated, intuitive interactions.',
    tags: ['Game UX', 'AI System Thinking', 'Creative Direction'],
    duration: '2 months',
    role: 'Creative Lead',
    href: null,
    links: [],
    detail: {
      hero: {
        title: 'Agentic Football — AI-Powered Game Experience',
        subtitle:
          'A playful, system-driven football experience where AI agents actively assist players, transforming chaotic gameplay into coordinated, intuitive interactions.',
      },
      role: 'Creative Lead, Game UX, AI System Design, Visual Direction',
      timeline: '2 months',
      whatILed: [
        'Game UX & Interaction Design',
        'AI Agent System Thinking',
        'Gameplay Flow Design',
        'Visual Direction (Stylized / Pixel World)',
        'Prototype Direction & Iteration',
      ],
      impact: [
        'Translated AI concepts into intuitive gameplay interactions',
        'Demonstrated AI agents as active participants, not passive tools',
        'Built a playable prototype bridging product thinking and entertainment',
        'Established a foundation for agent-based interactive systems',
      ],
      problem: {
        heading: 'AI is often invisible.\nBut invisibility creates distance.',
        body: 'So the challenge was: How do we make AI felt, not just functional?',
      },
      directions: {
        exploring: [
          'Different levels of AI visibility vs subtlety',
          'Testing playful vs assistive agent behaviors',
          'Exploring how far AI can act without removing player control',
        ],
        final: 'Simple and readable game environment — immediate AI response with clear cause-and-effect between player and system.',
      },
      design: [
        'Simple and readable game environment',
        'Exaggerated interactions for clarity and feedback',
        'Immediate response from AI actions',
        'Clear cause-and-effect between player and system',
      ],
      systemThinking: [
        'Player Input → AI Interpretation → Action → Feedback',
        'Modular agent behaviors',
        'Reusable gameplay logic',
        'Expandable system for future agent roles',
      ],
      collaboration: [],
      reflection:
        'AI shouldn\'t replace the player.\nIt should make the player feel stronger.',
    },
  },
  {
    id: 'mocaverse',
    categorySlug: 'ux-design',
    thumbnail: '/case-mocaverse.png',
    title: 'Mocaverse — Digital Identity Experience',
    description:
      'Transforming abstract digital identity into a bold, visual-driven experience system.',
    tags: ['Creative Direction', 'Visual Design', 'UX Thinking'],
    duration: '6 months',
    role: 'Creative Direction',
    href: null,
    links: [],
    detail: {
      hero: {
        title: 'Mocaverse — Digital Identity Experience',
        subtitle:
          'A visually driven project focused on expressing digital identity through strong art direction and structured design language.',
      },
      role: 'Creative Direction, Visual Design, UX Thinking',
      timeline: '6 months',
      whatILed: [
        'Visual Direction',
        'UI & Layout System',
        'Brand Expression',
        'Creative Exploration',
      ],
      impact: [
        'Strengthened brand presence',
        'Delivered high-impact visual storytelling',
        'Created a cohesive design language',
      ],
      problem: {
        heading: 'Identity is abstract.',
        body: 'So the challenge was: How do we make identity felt, not just explained?',
      },
      directions: {
        exploring: [
          'Multiple visual directions explored',
          'Composition and layout iteration',
          'Balancing clarity with expression',
        ],
        final: 'Strong hierarchy, bold contrast, minimal but intentional UI — with rhythm-driven layouts.',
      },
      design: [
        'Strong hierarchy',
        'Bold contrast',
        'Minimal but intentional UI',
        'Rhythm-driven layouts',
      ],
      systemThinking: [
        'Reusable visual patterns',
        'Consistent layout logic',
        'Scalable structure',
      ],
      collaboration: [],
      reflection:
        'Visuals are not decoration.\nThey are the fastest way to communicate meaning.',
    },
  },
]

export const getCaseStudyById = (id) =>
  caseStudies.find((cs) => cs.id === id) ?? null
