import founderManeeshImage from '../assets/founder-maneesh.jpg'

export const STORAGE_KEY = 'maneesh-events-site-v1'
export const SESSION_KEY = 'maneesh-events-admin-v1'

export const LEGACY_PLACEHOLDER_EMAIL = 'kushwahamaneesh081@gmail.com'
export const LEGACY_PHONE_VARIANTS = ['+91 870 704 8205', '+91 98765 43210']

export const DEFAULT_SITE_DATA = {
  businessName: 'Maneesh Events',
  location: 'Chirgaon, Jhansi, Uttar Pradesh',
  hero: {
    badge: 'Premium event decoration studio',
    title: 'Birthday decoration, stage setup, backdrop styling, and family event decor.',
    description:
      'We design elegant entry, stage, cake table, and selfie-point setups for events that need a clean premium look.',
    primaryButtonLabel: 'Book Decoration',
    secondaryButtonLabel: 'View Showcase',
  },
  about: {
    title: 'Founder-led decoration planning for stylish and memorable celebrations.',
    description:
      'Maneesh Kushwaha leads every setup with a focus on clean styling, strong color balance, and a premium look that feels special in real photos and real family moments.',
    founder: {
      name: 'Maneesh Kushwaha',
      role: 'Founder, Maneesh Events',
      image: founderManeeshImage,
      story:
        'Maneesh Kushwaha built Maneesh Events to give families a decoration team they can trust for birthdays, anniversaries, baby showers, ring ceremonies, and home functions. His approach is simple: understand the celebration, match the mood, and create a setup that looks elegant from every angle.',
    },
    highlights: [
      'Birthday and kids party decoration',
      'Anniversary and ring ceremony setup',
      'Baby shower and welcome decor',
      'Stage, entry gate, and selfie corner styling',
    ],
    reasons: [
      'Founder involvement from planning to final setup',
      'Clean premium styling that looks strong in photos and reels',
      'Customized decoration ideas for family functions and small venues',
      'Reliable support for stage, entry, backdrop, and cake-table design',
    ],
  },
  contact: {
    founderName: 'Maneesh Kushwaha',
    phone: '+91 8707048205',
    whatsapp: '+91 8707048205',
    email: 'kushwahamaneesh081@gmail.com',
    instagram: 'https://www.instagram.com/manishevents2/',
    address: 'Chirgaon, Uttar Pradesh',
    note: 'Available for home events, banquet halls, school functions, and family celebrations.',
  },
  events: [
    {
      id: 'birthday-bliss',
      title: 'Birthday Bliss Setup',
      category: 'Birthday Decoration',
      description:
        'A cheerful balloon wall, themed cake table, welcome arch, and stage styling designed to make birthdays feel full of color and excitement.',
      videoUrl: '',
      images: [],
    },
    {
      id: 'anniversary-glow',
      title: 'Anniversary Glow Decor',
      category: 'Anniversary Celebration',
      description:
        'Elegant floral touches, warm lighting, romantic backdrops, and seating styling for intimate family celebrations and couple events.',
      videoUrl: '',
      images: [],
    },
    {
      id: 'family-festival',
      title: 'Family Function Decor',
      category: 'Home and Hall Events',
      description:
        'Flexible decoration plans for home functions, small halls, and festive gatherings with stage decor, entrance design, and photo corners.',
      videoUrl: '',
      images: [],
    },
  ],
}

export const HERO_STATS = [
  {
    title: 'Decor Types',
    copy: 'Birthday, anniversary, baby shower, welcome party',
  },
  {
    title: 'Setup Focus',
    copy: 'Stage, entry, backdrop, selfie point',
  },
  {
    title: 'Showcase',
    copy: 'Video preview on front and gallery inside',
  },
]

export const HERO_FLOATING_CARDS = [
  {
    eyebrow: 'Stage Styling',
    title: 'Balanced backdrops with lighting, balloons, and premium decor layers.',
  },
  {
    eyebrow: 'Photo Corners',
    title: 'Selfie points and cake tables designed for event photos and reels.',
  },
]
