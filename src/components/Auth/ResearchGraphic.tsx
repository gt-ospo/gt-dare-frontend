interface ResearchGraphicProps {
  focus?: 'converse' | 'explore' | 'connect'
}

const ResearchGraphic = ({ focus = 'converse' }: ResearchGraphicProps) => (
  <svg
    viewBox='50 0 540 340'
    fill='none'
    className='h-full w-full'
    role='img'
    aria-label='An abstract woven globe representing connected ideas'
  >
    <defs>
      <radialGradient id='gt-idea-glow'>
        <stop stopColor='var(--dare-foreground)' stopOpacity='.2' />
        <stop offset='1' stopColor='var(--dare-foreground)' stopOpacity='0' />
      </radialGradient>
      <linearGradient
        id='gt-idea-thread'
        x1='160'
        y1='60'
        x2='480'
        y2='290'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='var(--dare-foreground)' stopOpacity='.15' />
        <stop
          offset='.48'
          stopColor='var(--dare-foreground)'
          stopOpacity='.85'
        />
        <stop offset='1' stopColor='var(--dare-foreground)' stopOpacity='.15' />
      </linearGradient>
    </defs>
    <ellipse cx='320' cy='170' rx='240' ry='165' fill='url(#gt-idea-glow)' />
    <g
      transform='rotate(-18 320 170)'
      stroke='url(#gt-idea-thread)'
      strokeWidth='1'
    >
      {Array.from({ length: 19 }, (_, index) => {
        const offset = index - 9
        const width = Math.sqrt(1 - (offset / 10) ** 2) * 160
        const y = 170 + offset * 13
        return (
          <path
            key={index}
            d={`M ${320 - width} ${y} C ${250 - width * 0.25} ${y - 65} ${390 + width * 0.25} ${y + 65} ${320 + width} ${y}`}
          />
        )
      })}
      {Array.from({ length: 13 }, (_, index) => {
        const offset = index - 6
        return (
          <ellipse
            key={index}
            cx='320'
            cy='170'
            rx={Math.abs(offset) * 23 + 5}
            ry='132'
            transform={`rotate(${offset * 5} 320 170)`}
          />
        )
      })}
      <ellipse
        cx='320'
        cy='170'
        rx='236'
        ry='58'
        transform='rotate(22 320 170)'
        strokeOpacity='.5'
      />
      <ellipse
        cx='320'
        cy='170'
        rx='218'
        ry='75'
        transform='rotate(-26 320 170)'
        strokeOpacity='.3'
      />
    </g>
    <g
      stroke='var(--dare-foreground)'
      strokeOpacity='.35'
      strokeDasharray='3 6'
    >
      <path d='M 146 82 L 220 124 M 478 84 L 410 128 M 475 267 L 401 233' />
    </g>
    <g fill='var(--dare)' stroke='var(--dare-foreground)' strokeOpacity='.4'>
      <rect
        fillOpacity={focus === 'converse' ? 1 : 0.25}
        x='78'
        y='52'
        width='114'
        height='58'
        rx='14'
      />
      <rect
        fillOpacity={focus === 'explore' ? 1 : 0.25}
        x='446'
        y='59'
        width='116'
        height='58'
        rx='14'
      />
      <rect
        fillOpacity={focus === 'connect' ? 1 : 0.25}
        x='438'
        y='244'
        width='124'
        height='58'
        rx='14'
      />
    </g>
    <g
      stroke='var(--dare-foreground)'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M 96 68 H 115 V 83 H 104 L 99 88 V 83 H 96 Z M 101 73 H 110 M 101 78 H 107' />
      <path d='M 463 73 H 475 L 481 79 V 97 H 463 Z M 475 73 V 79 H 481 M 468 84 H 476 M 468 89 H 476' />
      <rect x='455' y='257' width='8' height='8' rx='2' />
      <rect x='473' y='277' width='8' height='8' rx='2' />
      <path d='M 459 265 V 281 H 473 M 463 261 H 477 V 277' />
    </g>
    <g
      fill='var(--dare-foreground)'
      fontSize='11'
      fontFamily='inherit'
      fontWeight='500'
    >
      <text x='125' y='86'>
        Converse
      </text>
      <text x='490' y='92'>
        Explore
      </text>
      <text x='491' y='279'>
        Connect
      </text>
    </g>
    <g fill='var(--dare-foreground)'>
      <circle cx='110' cy='166' r='3' opacity='.8' />
      <circle cx='505' cy='114' r='4' opacity='.9' />
      <circle cx='416' cy='281' r='3' opacity='.65' />
      <circle cx='204' cy='47' r='2' opacity='.65' />
    </g>
  </svg>
)

export default ResearchGraphic
