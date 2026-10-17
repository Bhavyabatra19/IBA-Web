/**
 * The Red Club hero's graphic: a graduation cap in IBA Red floating over
 * the shared stage (HoloStage), with what the club offers rising around it
 * as floating cards — programmes, labs, projects, placements. Original
 * artwork in the style of the other inner heroes.
 */

import HoloStage from './HoloStage'

const CARDS = [
  { label: 'PROGRAMMES', icon: <path d="M4 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4Z M20 5h-5a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h5Z" /> },
  { label: 'LABS', icon: <path d="M9 3h6 M10 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4A1.5 1.5 0 0 0 19 19l-5-10V3 M7.5 15h9" /> },
  { label: 'PROJECTS', icon: <path d="M8 7l-5 5 5 5 M16 7l5 5-5 5 M14 4l-4 16" /> },
  { label: 'PLACEMENTS', icon: <path d="M3 8h18v12H3Z M9 8V5h6v3 M3 13h18" /> },
]

export default function RedClubHolo() {
  return (
    <HoloStage id="rch" cards={CARDS}>
      <defs>
        <linearGradient id="rch-board" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff4a50" />
          <stop offset="0.55" stopColor="#d71920" />
          <stop offset="1" stopColor="#7a0c11" />
        </linearGradient>
        <linearGradient id="rch-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1d1d21" />
          <stop offset="0.5" stopColor="#3a3a40" />
          <stop offset="1" stopColor="#0b0b0c" />
        </linearGradient>
        <linearGradient id="rch-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f4" />
          <stop offset="1" stopColor="#9a9aa0" />
        </linearGradient>
      </defs>

      {/* a small plate on the pedestal, under the cap */}
      <ellipse cx="300" cy="392" rx="70" ry="20" className="rch__plate" />
      <ellipse cx="300" cy="388" rx="70" ry="20" className="rch__plate-ring" />

      {/* the cap, floating */}
      <g className="rch__cap">
        {/* the skull cap, under the board */}
        <path d="M232 296V336C232 366 368 366 368 336V296" fill="url(#rch-body)" className="rch__body" />
        <path d="M232 336C232 366 368 366 368 336" className="rch__rim" />
        {/* the board: an isometric square, lit from the top left */}
        <polygon points="186,292 300,254 414,292 300,330" fill="url(#rch-board)" className="rch__board" />
        <polygon points="186,292 300,330 300,338 186,300" className="rch__board-edge" />
        <polygon points="300,330 414,292 414,300 300,338" className="rch__board-edge rch__board-edge--dark" />
        {/* a sheen across the board */}
        <path d="M214 286L300 258L330 268L244 296Z" className="rch__sheen" />
        {/* the button and the tassel */}
        <circle cx="300" cy="292" r="5" fill="url(#rch-gold)" />
        <path d="M300 292L394 300V340" className="rch__cord" />
        <path d="M388 340h12l3 22h-18Z" fill="url(#rch-gold)" />
      </g>
    </HoloStage>
  )
}
