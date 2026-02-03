export interface AvatarTraits {
  class: 'warrior' | 'mage' | 'rogue';
  skinColor: string;
  hairColor: string;
  eyeColor: string;
  accessories: string[];
  background: string;
}

export const AVATAR_CLASSES = [
  {
    id: 0,
    name: 'Warrior',
    description: 'Strong and resilient, excels in combat',
    color: '#ff6b35',
    stats: { health: 120, power: 70, defense: 60, speed: 40 },
  },
  {
    id: 1,
    name: 'Mage',
    description: 'Master of magic, powerful spells',
    color: '#6c5ce7',
    stats: { health: 80, power: 100, defense: 40, speed: 60 },
  },
  {
    id: 2,
    name: 'Rogue',
    description: 'Swift and cunning, master of stealth',
    color: '#00b894',
    stats: { health: 90, power: 75, defense: 50, speed: 85 },
  },
];

export const SKIN_COLORS = [
  '#f8d7a1',
  '#f5c69f',
  '#f1a679',
  '#e8915e',
  '#d9704d',
  '#c67a52',
  '#b5724d',
];

export const HAIR_COLORS = [
  '#2c3e50',
  '#8b4513',
  '#d4af37',
  '#c0392b',
  '#e74c3c',
  '#9b59b6',
  '#3498db',
];

export const EYE_COLORS = [
  '#2c3e50',
  '#8b7355',
  '#16a085',
  '#2980b9',
  '#c0392b',
  '#f39c12',
];

export const ACCESSORIES = [
  { id: 'none', name: 'None' },
  { id: 'crown', name: 'Crown' },
  { id: 'mask', name: 'Mask' },
  { id: 'goggles', name: 'Goggles' },
  { id: 'headband', name: 'Headband' },
  { id: 'hat', name: 'Hat' },
  { id: 'hood', name: 'Hood' },
];

export const BACKGROUNDS = [
  { id: 'space', name: 'Space', gradient: 'from-indigo-900 via-purple-900 to-black' },
  { id: 'forest', name: 'Forest', gradient: 'from-green-900 via-green-700 to-green-900' },
  { id: 'ocean', name: 'Ocean', gradient: 'from-blue-900 via-blue-700 to-cyan-900' },
  { id: 'sunset', name: 'Sunset', gradient: 'from-orange-600 via-red-500 to-purple-600' },
  { id: 'neon', name: 'Neon', gradient: 'from-pink-600 via-purple-600 to-cyan-600' },
  { id: 'lava', name: 'Lava', gradient: 'from-red-900 via-orange-700 to-yellow-600' },
];

export function generateRandomAvatar(): AvatarTraits {
  const randomClass = AVATAR_CLASSES[Math.floor(Math.random() * AVATAR_CLASSES.length)];
  const randomSkin = SKIN_COLORS[Math.floor(Math.random() * SKIN_COLORS.length)];
  const randomHair = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)];
  const randomEye = EYE_COLORS[Math.floor(Math.random() * EYE_COLORS.length)];
  const randomAccessory = ACCESSORIES[Math.floor(Math.random() * ACCESSORIES.length)];
  const randomBg = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

  return {
    class: randomClass.name.toLowerCase() as 'warrior' | 'mage' | 'rogue',
    skinColor: randomSkin,
    hairColor: randomHair,
    eyeColor: randomEye,
    accessories: randomAccessory.id === 'none' ? [] : [randomAccessory.id],
    background: randomBg.id,
  };
}

export function generateAvatarName(): string {
  const firstNames = [
    'Arix', 'Blaze', 'Cipher', 'Drake', 'Echo', 'Fury', 'Glint', 'Hero',
    'Iris', 'Jester', 'Kaos', 'Luna', 'Mythic', 'Nova', 'Omega', 'Phoenix',
    'Quest', 'Raven', 'Sage', 'Titan', 'Utopia', 'Vortex', 'Wraith', 'Zenith'
  ];

  const lastNames = [
    'Seeker', 'Slayer', 'Stalker', 'Storm', 'Strike', 'Strength', 'Striker',
    'Strife', 'String', 'Stroke', 'Swarm', 'Sway', 'Swift', 'Whirl', 'Wisp',
    'Wrath', 'Wreck', 'Wright'
  ];

  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${first}${last}`;
}
