'use client';

import { AvatarTraits, BACKGROUNDS } from '@/lib/avatar-generator';

interface AvatarPreviewProps {
  traits: AvatarTraits;
}

export function AvatarPreview({ traits }: AvatarPreviewProps) {
  const bgGradient = BACKGROUNDS.find(bg => bg.id === traits.background)?.gradient || 'from-indigo-900 to-purple-900';

  return (
    <div className={`relative w-full h-64 md:h-80 bg-gradient-to-br ${bgGradient} rounded-xl overflow-hidden flex items-center justify-center`}>
      {/* Avatar SVG */}
      <svg
        viewBox="0 0 200 200"
        className="w-48 h-48 drop-shadow-lg"
      >
        {/* Head */}
        <circle
          cx="100"
          cy="80"
          r="35"
          fill={traits.skinColor}
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* Hair */}
        <path
          d="M 65 50 Q 65 40, 100 35 Q 135 40, 135 50 Q 135 70, 100 75 Q 65 70, 65 50"
          fill={traits.hairColor}
          stroke="#2c3e50"
          strokeWidth="2"
        />

        {/* Eyes */}
        <circle
          cx="85"
          cy="75"
          r="4"
          fill={traits.eyeColor}
        />
        <circle
          cx="115"
          cy="75"
          r="4"
          fill={traits.eyeColor}
        />

        {/* Mouth */}
        <path
          d="M 90 95 Q 100 100, 110 95"
          stroke="#2c3e50"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Body - based on class */}
        {traits.class === 'warrior' && (
          <g>
            {/* Armor chest plate */}
            <rect
              x="75"
              y="110"
              width="50"
              height="45"
              fill="#c0392b"
              stroke="#2c3e50"
              strokeWidth="2"
              rx="4"
            />
            <line
              x1="100"
              y1="110"
              x2="100"
              y2="155"
              stroke="#2c3e50"
              strokeWidth="2"
            />
          </g>
        )}
        {traits.class === 'mage' && (
          <g>
            {/* Magical robes */}
            <path
              d="M 75 115 L 70 150 L 130 150 L 125 115 Z"
              fill="#6c5ce7"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <circle cx="100" cy="125" r="8" fill="#f39c12" opacity="0.8" />
          </g>
        )}
        {traits.class === 'rogue' && (
          <g>
            {/* Stealth outfit */}
            <path
              d="M 75 115 L 72 150 L 128 150 L 125 115 Z"
              fill="#34495e"
              stroke="#2c3e50"
              strokeWidth="2"
            />
            <path
              d="M 75 115 L 68 130 L 75 140"
              fill="#34495e"
              stroke="#2c3e50"
              strokeWidth="2"
            />
          </g>
        )}

        {/* Arms */}
        <g>
          <line
            x1="75"
            y1="125"
            x2="50"
            y2="130"
            stroke={traits.skinColor}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="125"
            y1="125"
            x2="150"
            y2="130"
            stroke={traits.skinColor}
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Hands */}
          <circle cx="50" cy="130" r="5" fill={traits.skinColor} stroke="#2c3e50" strokeWidth="1" />
          <circle cx="150" cy="130" r="5" fill={traits.skinColor} stroke="#2c3e50" strokeWidth="1" />
        </g>

        {/* Legs */}
        <g>
          <line
            x1="85"
            y1="155"
            x2="85"
            y2="180"
            stroke="#3d4a56"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="115"
            y1="155"
            x2="115"
            y2="180"
            stroke="#3d4a56"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Boots */}
          <circle cx="85" cy="180" r="4" fill="#2c3e50" />
          <circle cx="115" cy="180" r="4" fill="#2c3e50" />
        </g>

        {/* Accessories */}
        {traits.accessories.includes('crown') && (
          <g>
            <path
              d="M 70 40 L 80 25 L 90 35 L 100 22 L 110 35 L 120 25 L 130 40 Z"
              fill="#f39c12"
              stroke="#2c3e50"
              strokeWidth="1.5"
            />
          </g>
        )}
        {traits.accessories.includes('mask') && (
          <g>
            <path
              d="M 75 70 Q 85 65, 100 65 Q 115 65, 125 70"
              fill="#2c3e50"
              opacity="0.6"
              stroke="#2c3e50"
              strokeWidth="1.5"
            />
          </g>
        )}
        {traits.accessories.includes('goggles') && (
          <g>
            <circle cx="85" cy="75" r="6" fill="none" stroke="#f39c12" strokeWidth="2" />
            <circle cx="115" cy="75" r="6" fill="none" stroke="#f39c12" strokeWidth="2" />
            <line x1="91" y1="75" x2="109" y2="75" stroke="#f39c12" strokeWidth="2" />
          </g>
        )}
      </svg>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
