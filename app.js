"use strict";
/* Ink Over PDF — type on top of a PDF with sound and tiny sparks.
 * Layout of this file:
 *   1. Effect + sound data (spark styles, key sound packs)
 *   2. Settings model (Moods + a handful of basics)
 *   3. Typing feedback (spark engine, sound engine)
 *   4. PDF viewer + notes
 */

// ---------------------------------------------------------------- 1. data
const EFFECT_PRESETS = {
  "soft-spark": {
    label: "Soft Spark",
    description: "A calm default: one warm glint, faint dust, and a tiny letter settle.",
    particles: 5,
    life: 520,
    core: 0.968,
    spread: 31.5,
    lift: 7,
    glyphX: -1.44,
    glyphY: 1.26,
    glyphScale: 1.024,
    glyphRotate: 0.5,
    special: 0.18,
    primary: "#d98f71",
    secondary: "#ffd8ad",
    aura: "rgba(217, 143, 113, 0.2)"
  },
  "cyber-pink": {
    label: "Cyber Pink",
    description: "Fashion-neon typing: local magenta/cyan ghosting and tiny data sparks.",
    particles: 6,
    life: 420,
    core: 1.274,
    spread: 35.1,
    lift: 2.8,
    glyphX: 2.43,
    glyphY: 0,
    glyphScale: 1.008,
    glyphRotate: 0,
    special: 0.27,
    primary: "#ff62c7",
    secondary: "#6fe8ff",
    aura: "rgba(255, 98, 199, 0.26)"
  },
  "candy-pop": {
    label: "Candy Pop",
    description: "Glossy, cushioned, cute: a soft squash-pop with tiny round specks.",
    particles: 7,
    life: 560,
    core: 1.392,
    spread: 33.3,
    lift: 4.2,
    glyphX: -0.45,
    glyphY: 2.25,
    glyphScale: 1.056,
    glyphRotate: -0.9,
    special: 0.21,
    primary: "#f39ab8",
    secondary: "#ffcf70",
    aura: "rgba(243, 154, 184, 0.22)"
  },
  electric: {
    label: "Electric",
    description: "Fast and sharp: tiny lightning cuts and a quick energetic snap.",
    particles: 7,
    life: 350,
    core: 1.416,
    spread: 40.7,
    lift: 1.4,
    glyphX: 1.89,
    glyphY: -0.63,
    glyphScale: 1.012,
    glyphRotate: 1.1,
    special: 0.3,
    primary: "#906fff",
    secondary: "#ffe45f",
    aura: "rgba(144, 111, 255, 0.26)"
  },
  "star-dust": {
    label: "Star Dust",
    description: "Dreamy night-study shimmer with tiny points that drift upward.",
    particles: 8,
    life: 760,
    core: 1.086,
    spread: 37,
    lift: 18.2,
    glyphX: -0.81,
    glyphY: 0.36,
    glyphScale: 1.02,
    glyphRotate: 0.76,
    special: 0.255,
    primary: "#9f86d8",
    secondary: "#ffe3a4",
    aura: "rgba(159, 134, 216, 0.22)"
  },
  ink: {
    label: "Ink",
    description: "Quiet analog tactility: soft-to-sharp glyph settling with tiny ink flecks.",
    particles: 5,
    life: 800,
    core: 1.227,
    spread: 22.2,
    lift: 1.4,
    glyphX: -0.45,
    glyphY: 1.8,
    glyphScale: 1.012,
    glyphRotate: -0.36,
    special: 0.15,
    primary: "#7e6650",
    secondary: "#c1ab8d",
    aura: "rgba(126, 102, 80, 0.16)"
  },
  bubble: {
    label: "Bubble",
    description: "A tiny pressure ripple and translucent bubbles, soft and adorable.",
    particles: 6,
    life: 620,
    core: 1.322,
    spread: 31.5,
    lift: 11.2,
    glyphX: 0,
    glyphY: 2.16,
    glyphScale: 1.04,
    glyphRotate: 0.32,
    special: 0.195,
    primary: "#7ec7c1",
    secondary: "#f8b7ce",
    aura: "rgba(126, 199, 193, 0.2)"
  },
  pixel: {
    label: "Pixel",
    description: "Clean retro snap: microscopic pixels split away and vanish quickly.",
    particles: 7,
    life: 390,
    core: 1.086,
    spread: 27.8,
    lift: 0,
    glyphX: 1.53,
    glyphY: 0,
    glyphScale: 1,
    glyphRotate: 0,
    special: 0.24,
    primary: "#5fb7ff",
    secondary: "#ff84cf",
    aura: "rgba(95, 183, 255, 0.2)"
  },
  "crystal-glass": {
    label: "Crystal Glass",
    description: "A refined glint with tiny prism shards and almost transparent shine.",
    particles: 6,
    life: 610,
    core: 1.133,
    spread: 33.3,
    lift: 8.4,
    glyphX: -0.54,
    glyphY: 0.54,
    glyphScale: 1.016,
    glyphRotate: 0.56,
    special: 0.27,
    primary: "#95d9ff",
    secondary: "#f0d7ff",
    aura: "rgba(149, 217, 255, 0.2)"
  },
  constellation: {
    label: "Constellation",
    description: "A quiet miniature star map that appears beside the caret and dissolves.",
    particles: 7,
    life: 720,
    core: 0.968,
    spread: 38.9,
    lift: 9.8,
    glyphX: -0.99,
    glyphY: 0.27,
    glyphScale: 1.016,
    glyphRotate: -0.48,
    special: 0.3,
    primary: "#7f8ee8",
    secondary: "#fff0a4",
    aura: "rgba(127, 142, 232, 0.2)"
  },
  "paper-fiber": {
    label: "Paper Fiber",
    description: "Tiny paper fibers and dry tactile dust, perfect for long reading notes.",
    particles: 6,
    life: 650,
    core: 1.038,
    spread: 25.9,
    lift: 4.2,
    glyphX: -0.36,
    glyphY: 1.44,
    glyphScale: 1.008,
    glyphRotate: -0.32,
    special: 0.135,
    primary: "#a98b68",
    secondary: "#ecd8b6",
    aura: "rgba(169, 139, 104, 0.14)"
  },
  "moon-pearl": {
    label: "Moon Pearl",
    description: "Soft pearly dots and a small moonlit gleam, calm but quietly magical.",
    particles: 6,
    life: 700,
    core: 1.062,
    spread: 33.3,
    lift: 12.6,
    glyphX: -0.63,
    glyphY: 0.72,
    glyphScale: 1.024,
    glyphRotate: 0.36,
    special: 0.225,
    primary: "#b8bddf",
    secondary: "#fff7ce",
    aura: "rgba(184, 189, 223, 0.2)"
  },
  "aurora-veil": {
    label: "Aurora Veil",
    description: "Iridescent ribbons slide through the newest glyph with a soft glassy afterglow.",
    particles: 7,
    life: 680,
    core: 1.12,
    spread: 26.5,
    lift: 4.2,
    glyphX: -0.42,
    glyphY: 0.18,
    glyphScale: 1.018,
    glyphRotate: -0.24,
    special: 0.255,
    primary: "#6edeea",
    secondary: "#c7a8ff",
    aura: "rgba(110, 222, 234, 0.22)"
  },
  "firefly-glow": {
    label: "Orbit Pulse",
    description: "Tiny orbital rings and satellite dots snap around the newest glyph.",
    particles: 8,
    life: 650,
    core: 1.16,
    spread: 22.4,
    lift: 2.2,
    glyphX: 0.54,
    glyphY: -0.18,
    glyphScale: 1.014,
    glyphRotate: 0.42,
    special: 0.27,
    primary: "#55e6b5",
    secondary: "#8ea1ff",
    aura: "rgba(85, 230, 181, 0.22)"
  },
  "petal-bloom": {
    label: "Origami Fold",
    description: "Folded paper facets flip open with a crisp little hinge bounce.",
    particles: 8,
    life: 620,
    core: 1.2,
    spread: 20.8,
    lift: 2.8,
    glyphX: -0.72,
    glyphY: 0.54,
    glyphScale: 1.028,
    glyphRotate: -0.84,
    special: 0.25,
    primary: "#8aa7ff",
    secondary: "#ffc36f",
    aura: "rgba(138, 167, 255, 0.2)"
  },
  "neon-rain": {     // a lone neon tube in a rainy night: pink/cyan, rain falling through the glow at one angle, wet reflection, puddle ripples
    own: [[84, 229, 255], [255, 114, 210]],
    shimmer: null,
    shed: { gap: 14, shape: "rain", size: [8, 13], speed: [420, 500], angle: -0.2, nodrag: true, upstream: [28, 84], life: [340, 470] },
    rest: { count: 2, shape: "ripple", size: [6, 8], speed: [0, 0], life: [1000, 1300], scatter: 11 },
    line: { halo: 2.5, core: 1.35, flicker: true, rim: [84, 229, 255], reflect: true }
  },
  "laser-etch": {
    label: "Laser Etch",
    description: "A razor-thin laser line engraves through the glyph with tiny hot chips.",
    particles: 7,
    life: 420,
    core: 1.16,
    spread: 18.5,
    lift: 0.6,
    glyphX: 0.95,
    glyphY: -0.2,
    glyphScale: 1.01,
    glyphRotate: -0.72,
    special: 0.29,
    primary: "#ff5a57",
    secondary: "#ffe46b",
    aura: "rgba(255, 90, 87, 0.24)"
  },
  "keycap-pop": {
    label: "Keycap Pop",
    description: "A tiny keycap frame compresses around the character and rebounds.",
    particles: 6,
    life: 520,
    core: 1.24,
    spread: 16.5,
    lift: 1.2,
    glyphX: 0,
    glyphY: 1.05,
    glyphScale: 1.048,
    glyphRotate: 0.05,
    special: 0.2,
    primary: "#7fb3a6",
    secondary: "#ffb86f",
    aura: "rgba(127, 179, 166, 0.18)"
  },
  "magnetic-flip": {
    label: "Magnetic Flip",
    description: "Two colored poles tug the glyph sideways before it snaps back.",
    particles: 8,
    life: 460,
    core: 1.18,
    spread: 21,
    lift: 0,
    glyphX: 1.2,
    glyphY: 0,
    glyphScale: 1.012,
    glyphRotate: 1.2,
    special: 0.26,
    primary: "#e85d75",
    secondary: "#3dd6c6",
    aura: "rgba(232, 93, 117, 0.22)"
  },
  "mosaic-shift": {
    label: "Mosaic Shift",
    description: "Tiny colored tiles click out of the glyph and slot back into place.",
    particles: 9,
    life: 500,
    core: 1.1,
    spread: 18,
    lift: 1,
    glyphX: -0.85,
    glyphY: 0.4,
    glyphScale: 1.018,
    glyphRotate: -0.4,
    special: 0.25,
    primary: "#4fa3ff",
    secondary: "#ffca5f",
    aura: "rgba(79, 163, 255, 0.2)"
  },
  "ripple-lens": {
    label: "Ripple Lens",
    description: "A glassy lens ripple bends the character locally like a clear drop.",
    particles: 6,
    life: 680,
    core: 1.28,
    spread: 17,
    lift: 2,
    glyphX: -0.28,
    glyphY: 0.42,
    glyphScale: 1.032,
    glyphRotate: 0.12,
    special: 0.18,
    primary: "#75d0da",
    secondary: "#f4d3ff",
    aura: "rgba(117, 208, 218, 0.18)"
  },
  "plasma-thread": {
    label: "Plasma Thread",
    description: "Fine luminous threads stitch across the new glyph, then recoil.",
    particles: 8,
    life: 560,
    core: 1.12,
    spread: 23,
    lift: 2,
    glyphX: 1,
    glyphY: -0.35,
    glyphScale: 1.012,
    glyphRotate: 0.56,
    special: 0.28,
    primary: "#39d3ff",
    secondary: "#ff7f9f",
    aura: "rgba(57, 211, 255, 0.23)"
  }
};


const SOUND_PACKS = {
  "deep-thock": {
    label: "Deep Thock",
    model: "thock",
    master: 0.82,
    duration: 0.118,
    attack: 0.0052,
    drive: 1.38,
    depthPitchDrop: 0.18,
    finalLowpass: 0.12,
    pitchVariance: 0.012,
    resonances: [
      { freq: 112, gain: 0.54, decay: 0.07 },
      { freq: 178, gain: 0.38, decay: 0.052 },
      { freq: 286, gain: 0.18, decay: 0.032 }
    ],
    transient: { gain: 0.055, decay: 0.012, color: 0.04 },
    thump: { freq: 68, gain: 0.22, decay: 0.06 }
  },
  "soft-wood": {
    label: "Soft Wood Dok",
    model: "wood",
    master: 0.76,
    duration: 0.096,
    attack: 0.0032,
    drive: 1.12,
    depthPitchDrop: 0.11,
    finalLowpass: 0.2,
    pitchVariance: 0.014,
    resonances: [
      { freq: 166, gain: 0.38, decay: 0.052 },
      { freq: 264, gain: 0.32, decay: 0.037 },
      { freq: 418, gain: 0.13, decay: 0.023 }
    ],
    transient: { gain: 0.095, decay: 0.0075, color: 0.105 },
    woodHollow: { freq: 92, gain: 0.12, decay: 0.058 }
  },
  "creamy-keys": {
    label: "Creamy Keys",
    model: "cream",
    master: 0.78,
    duration: 0.13,
    attack: 0.011,
    drive: 0.94,
    depthPitchDrop: 0.16,
    finalLowpass: 0.09,
    pitchVariance: 0.008,
    resonances: [
      { freq: 132, gain: 0.44, decay: 0.082 },
      { freq: 214, gain: 0.27, decay: 0.062 },
      { freq: 324, gain: 0.09, decay: 0.04 }
    ],
    transient: { gain: 0.024, decay: 0.02, color: 0.026 },
    cushion: { gain: 0.2, decay: 0.052 }
  },
  "pebble-tok": {
    label: "Pebble Tok",
    model: "stone",
    master: 0.68,
    duration: 0.076,
    attack: 0.0018,
    drive: 1.08,
    depthPitchDrop: 0.07,
    finalLowpass: 0.26,
    pitchVariance: 0.012,
    resonances: [
      { freq: 238, gain: 0.31, decay: 0.03 },
      { freq: 386, gain: 0.26, decay: 0.022 },
      { freq: 612, gain: 0.08, decay: 0.013 }
    ],
    transient: { gain: 0.074, decay: 0.0052, color: 0.17 },
    ceramic: { freq: 480, gain: 0.06, decay: 0.018 }
  },
  "paper-type": {
    label: "Paper Type",
    model: "paper",
    master: 0.64,
    duration: 0.108,
    attack: 0.005,
    drive: 0.98,
    depthPitchDrop: 0.09,
    finalLowpass: 0.19,
    pitchVariance: 0.014,
    resonances: [
      { freq: 162, gain: 0.24, decay: 0.052 },
      { freq: 286, gain: 0.16, decay: 0.034 },
      { freq: 470, gain: 0.055, decay: 0.018 }
    ],
    transient: { gain: 0.035, decay: 0.01, color: 0.08 },
    paper: { gain: 0.14, decay: 0.064, color: 0.45 }
  },
  "velvet-thock": {
    label: "Velvet Thock",
    model: "felt",
    master: 0.78,
    duration: 0.128,
    attack: 0.010,
    drive: 1.0,
    depthPitchDrop: 0.17,
    finalLowpass: 0.11,
    pitchVariance: 0.01,
    resonances: [
      { freq: 124, gain: 0.5, decay: 0.075 },
      { freq: 196, gain: 0.34, decay: 0.064 },
      { freq: 292, gain: 0.15, decay: 0.04 }
    ],
    transient: { gain: 0.032, decay: 0.018, color: 0.04 },
    thump: { freq: 70, gain: 0.16, decay: 0.062 },
    felt: { gain: 0.13, decay: 0.058, color: 0.032 }
  },
  "mahogany-dok": {
    label: "Mahogany Box Dok",
    model: "wood",
    master: 0.74,
    duration: 0.104,
    attack: 0.0038,
    drive: 1.16,
    depthPitchDrop: 0.11,
    finalLowpass: 0.19,
    pitchVariance: 0.017,
    resonances: [
      { freq: 178, gain: 0.43, decay: 0.052 },
      { freq: 276, gain: 0.35, decay: 0.038 },
      { freq: 414, gain: 0.13, decay: 0.025 }
    ],
    transient: { gain: 0.1, decay: 0.008, color: 0.095 },
    woodHollow: { freq: 96, gain: 0.115, decay: 0.062 },
    stamp: { freq: 134, gain: 0.07, delay: 0.007, decay: 0.032 }
  },
  "bamboo-dock": {
    label: "Bamboo Dock",
    model: "bamboo",
    master: 0.66,
    duration: 0.082,
    attack: 0.0025,
    drive: 1.2,
    depthPitchDrop: 0.075,
    finalLowpass: 0.27,
    pitchVariance: 0.018,
    resonances: [
      { freq: 238, gain: 0.35, decay: 0.033 },
      { freq: 358, gain: 0.28, decay: 0.026 },
      { freq: 510, gain: 0.11, decay: 0.018 }
    ],
    transient: { gain: 0.115, decay: 0.0058, color: 0.13 },
    woodHollow: { freq: 142, gain: 0.07, decay: 0.043 },
    scissor: { gain: 0.026, decay: 0.01, color: 0.22 }
  },
  "felt-mute": {
    label: "Felt Puff",
    model: "felt",
    master: 0.76,
    duration: 0.118,
    attack: 0.011,
    drive: 0.96,
    depthPitchDrop: 0.16,
    finalLowpass: 0.085,
    pitchVariance: 0.009,
    resonances: [
      { freq: 132, gain: 0.42, decay: 0.07 },
      { freq: 218, gain: 0.25, decay: 0.055 },
      { freq: 330, gain: 0.09, decay: 0.034 }
    ],
    transient: { gain: 0.025, decay: 0.018, color: 0.035 },
    felt: { gain: 0.14, decay: 0.058, color: 0.028 },
    cushion: { gain: 0.09, decay: 0.044 }
  },
  "marble-tok": {
    label: "Marble Bead Tok",
    model: "stone",
    master: 0.61,
    duration: 0.078,
    attack: 0.0022,
    drive: 1.12,
    depthPitchDrop: 0.065,
    finalLowpass: 0.34,
    pitchVariance: 0.012,
    resonances: [
      { freq: 250, gain: 0.31, decay: 0.029 },
      { freq: 420, gain: 0.29, decay: 0.024 },
      { freq: 640, gain: 0.08, decay: 0.014 }
    ],
    transient: { gain: 0.08, decay: 0.0052, color: 0.16 },
    ceramic: { freq: 445, gain: 0.065, decay: 0.022 }
  },
  "porcelain-dotok": {
    label: "Porcelain Dotok",
    model: "porcelain",
    master: 0.58,
    duration: 0.088,
    attack: 0.0028,
    drive: 1.08,
    depthPitchDrop: 0.06,
    finalLowpass: 0.32,
    pitchVariance: 0.014,
    resonances: [
      { freq: 305, gain: 0.26, decay: 0.033 },
      { freq: 515, gain: 0.22, decay: 0.026 },
      { freq: 720, gain: 0.055, decay: 0.016 }
    ],
    transient: { gain: 0.073, decay: 0.006, color: 0.13 },
    ceramic: { freq: 620, gain: 0.048, decay: 0.02 },
    stamp: { freq: 198, gain: 0.034, delay: 0.009, decay: 0.026 }
  },
  "library-laptop": {
    label: "Library Laptop",
    model: "scissor",
    master: 0.56,
    duration: 0.058,
    attack: 0.002,
    drive: 1.0,
    depthPitchDrop: 0.04,
    finalLowpass: 0.42,
    pitchVariance: 0.012,
    resonances: [
      { freq: 198, gain: 0.2, decay: 0.02 },
      { freq: 330, gain: 0.15, decay: 0.016 },
      { freq: 520, gain: 0.055, decay: 0.011 }
    ],
    transient: { gain: 0.046, decay: 0.0045, color: 0.18 },
    scissor: { gain: 0.088, decay: 0.0085, color: 0.28 },
    felt: { gain: 0.032, decay: 0.026, color: 0.05 }
  },
  "rainy-window": {
    label: "Rain Window Grain",
    model: "rain",
    master: 0.62,
    duration: 0.112,
    attack: 0.006,
    drive: 0.98,
    depthPitchDrop: 0.13,
    finalLowpass: 0.16,
    pitchVariance: 0.014,
    resonances: [
      { freq: 156, gain: 0.33, decay: 0.057 },
      { freq: 246, gain: 0.25, decay: 0.044 },
      { freq: 388, gain: 0.09, decay: 0.027 }
    ],
    transient: { gain: 0.034, decay: 0.012, color: 0.07 },
    rain: { gain: 0.12, decay: 0.06, color: 0.28 },
    cushion: { gain: 0.032, decay: 0.04 }
  },
  "pencil-paper": {
    label: "Pencil Paper Scratch",
    model: "scratch",
    master: 0.58,
    duration: 0.096,
    attack: 0.004,
    drive: 1.02,
    depthPitchDrop: 0.07,
    finalLowpass: 0.28,
    pitchVariance: 0.014,
    resonances: [
      { freq: 210, gain: 0.24, decay: 0.036 },
      { freq: 348, gain: 0.16, decay: 0.028 },
      { freq: 570, gain: 0.05, decay: 0.017 }
    ],
    transient: { gain: 0.044, decay: 0.0065, color: 0.12 },
    paper: { gain: 0.14, decay: 0.06, color: 0.48 },
    scissor: { gain: 0.035, decay: 0.008, color: 0.25 }
  },
  "ink-stamp": {
    label: "Ink Stamp Thud",
    model: "stamp",
    master: 0.7,
    duration: 0.12,
    attack: 0.007,
    drive: 1.1,
    depthPitchDrop: 0.14,
    finalLowpass: 0.14,
    pitchVariance: 0.011,
    resonances: [
      { freq: 148, gain: 0.4, decay: 0.065 },
      { freq: 232, gain: 0.23, decay: 0.047 },
      { freq: 374, gain: 0.08, decay: 0.026 }
    ],
    transient: { gain: 0.036, decay: 0.014, color: 0.05 },
    stamp: { freq: 92, gain: 0.16, delay: 0.006, decay: 0.052 },
    paper: { gain: 0.035, decay: 0.06, color: 0.3 }
  },
  "rubber-dome": {
    label: "Rubber Dome Pock",
    model: "rubber",
    master: 0.66,
    duration: 0.104,
    attack: 0.0065,
    drive: 0.98,
    depthPitchDrop: 0.12,
    finalLowpass: 0.13,
    pitchVariance: 0.01,
    resonances: [
      { freq: 150, gain: 0.35, decay: 0.052 },
      { freq: 238, gain: 0.22, decay: 0.043 },
      { freq: 360, gain: 0.08, decay: 0.025 }
    ],
    transient: { gain: 0.045, decay: 0.012, color: 0.065 },
    membrane: { gain: 0.16, decay: 0.045, bend: 0.55 }
  },
  "muted-typewriter": {
    label: "Damped Typebar",
    model: "typebar",
    master: 0.6,
    duration: 0.092,
    attack: 0.0027,
    drive: 1.18,
    depthPitchDrop: 0.08,
    finalLowpass: 0.26,
    pitchVariance: 0.016,
    resonances: [
      { freq: 190, gain: 0.31, decay: 0.033 },
      { freq: 310, gain: 0.24, decay: 0.025 },
      { freq: 490, gain: 0.08, decay: 0.015 }
    ],
    transient: { gain: 0.092, decay: 0.0055, color: 0.17 },
    scissor: { gain: 0.072, decay: 0.008, color: 0.28 },
    stamp: { freq: 118, gain: 0.06, delay: 0.013, decay: 0.03 }
  },
  "milk-keycap": {
    label: "Milky Keycap Thock",
    model: "cream",
    master: 0.7,
    duration: 0.1,
    attack: 0.0075,
    drive: 1.04,
    depthPitchDrop: 0.11,
    finalLowpass: 0.14,
    pitchVariance: 0.012,
    resonances: [
      { freq: 160, gain: 0.39, decay: 0.056 },
      { freq: 252, gain: 0.28, decay: 0.045 },
      { freq: 380, gain: 0.11, decay: 0.028 }
    ],
    transient: { gain: 0.055, decay: 0.012, color: 0.06 },
    cushion: { gain: 0.11, decay: 0.04 },
    felt: { gain: 0.055, decay: 0.042, color: 0.04 }
  },
  "walnut-keys": {
    label: "Walnut Hollow Dok",
    model: "wood",
    master: 0.72,
    duration: 0.108,
    attack: 0.0044,
    drive: 1.12,
    depthPitchDrop: 0.13,
    finalLowpass: 0.17,
    pitchVariance: 0.015,
    resonances: [
      { freq: 138, gain: 0.39, decay: 0.062 },
      { freq: 232, gain: 0.31, decay: 0.047 },
      { freq: 350, gain: 0.12, decay: 0.029 }
    ],
    transient: { gain: 0.082, decay: 0.0085, color: 0.09 },
    woodHollow: { freq: 84, gain: 0.12, decay: 0.07 },
    thump: { freq: 74, gain: 0.08, decay: 0.052 }
  },
  "snow-soft": {
    label: "Snow Muffle",
    model: "snow",
    master: 0.6,
    duration: 0.132,
    attack: 0.012,
    drive: 0.9,
    depthPitchDrop: 0.15,
    finalLowpass: 0.075,
    pitchVariance: 0.008,
    resonances: [
      { freq: 128, gain: 0.32, decay: 0.082 },
      { freq: 202, gain: 0.2, decay: 0.066 },
      { freq: 310, gain: 0.07, decay: 0.04 }
    ],
    transient: { gain: 0.012, decay: 0.022, color: 0.024 },
    felt: { gain: 0.205, decay: 0.084, color: 0.022 },
    rain: { gain: 0.01, decay: 0.08, color: 0.08 }
  },
  "studio-linear": {
    label: "Studio Linear Thock",
    model: "linear",
    master: 0.7,
    duration: 0.09,
    attack: 0.0048,
    drive: 1.14,
    depthPitchDrop: 0.1,
    finalLowpass: 0.2,
    pitchVariance: 0.011,
    resonances: [
      { freq: 176, gain: 0.42, decay: 0.044 },
      { freq: 278, gain: 0.26, decay: 0.033 },
      { freq: 438, gain: 0.08, decay: 0.02 }
    ],
    transient: { gain: 0.065, decay: 0.007, color: 0.095 },
    cushion: { gain: 0.065, decay: 0.028 },
    stamp: { freq: 104, gain: 0.035, delay: 0.006, decay: 0.024 }
  },
  "book-edge": {
    label: "Book Edge Tap",
    model: "book",
    master: 0.64,
    duration: 0.114,
    attack: 0.0052,
    drive: 0.98,
    depthPitchDrop: 0.1,
    finalLowpass: 0.15,
    pitchVariance: 0.011,
    resonances: [
      { freq: 126, gain: 0.34, decay: 0.068 },
      { freq: 210, gain: 0.26, decay: 0.048 },
      { freq: 332, gain: 0.08, decay: 0.028 }
    ],
    transient: { gain: 0.038, decay: 0.013, color: 0.06 },
    paper: { gain: 0.082, decay: 0.07, color: 0.36 },
    woodHollow: { freq: 76, gain: 0.075, decay: 0.068 }
  },
  "silicone-pop": {
    label: "Silicone Soft Pop",
    model: "silicone",
    master: 0.66,
    duration: 0.116,
    attack: 0.008,
    drive: 0.92,
    depthPitchDrop: 0.16,
    finalLowpass: 0.09,
    pitchVariance: 0.008,
    resonances: [
      { freq: 118, gain: 0.32, decay: 0.074 },
      { freq: 186, gain: 0.22, decay: 0.056 },
      { freq: 282, gain: 0.06, decay: 0.034 }
    ],
    transient: { gain: 0.02, decay: 0.018, color: 0.026 },
    membrane: { gain: 0.2, decay: 0.058, bend: 0.82 }
  },
  "carbon-thock": {
    label: "Carbon Fiber Thock",
    model: "carbon",
    master: 0.72,
    duration: 0.094,
    attack: 0.0038,
    drive: 1.2,
    depthPitchDrop: 0.12,
    finalLowpass: 0.18,
    pitchVariance: 0.009,
    resonances: [
      { freq: 104, gain: 0.42, decay: 0.052 },
      { freq: 182, gain: 0.3, decay: 0.036 },
      { freq: 305, gain: 0.13, decay: 0.021 }
    ],
    transient: { gain: 0.06, decay: 0.0068, color: 0.075 },
    thump: { freq: 62, gain: 0.14, decay: 0.046 }
  },
  "matte-glass": {
    label: "Matte Glass Tok",
    model: "glass",
    master: 0.54,
    duration: 0.082,
    attack: 0.0018,
    drive: 1.02,
    depthPitchDrop: 0.05,
    finalLowpass: 0.3,
    pitchVariance: 0.01,
    resonances: [
      { freq: 218, gain: 0.24, decay: 0.028 },
      { freq: 384, gain: 0.22, decay: 0.021 },
      { freq: 620, gain: 0.055, decay: 0.013 }
    ],
    transient: { gain: 0.048, decay: 0.0048, color: 0.14 },
    ceramic: { freq: 545, gain: 0.04, decay: 0.016 }
  },
  "neon-capsule": {
    label: "Neon Capsule Pop",
    model: "neon",
    master: 0.58,
    duration: 0.084,
    attack: 0.0025,
    drive: 1.06,
    depthPitchDrop: 0.08,
    finalLowpass: 0.22,
    pitchVariance: 0.015,
    resonances: [
      { freq: 154, gain: 0.26, decay: 0.036 },
      { freq: 298, gain: 0.18, decay: 0.022 },
      { freq: 520, gain: 0.045, decay: 0.012 }
    ],
    transient: { gain: 0.052, decay: 0.0055, color: 0.11 },
    membrane: { gain: 0.072, decay: 0.026, bend: 0.28 }
  },
  "velvet-cloud": {
    label: "Velvet Cloud Thud",
    model: "snow",
    master: 0.62,
    duration: 0.142,
    attack: 0.014,
    drive: 0.86,
    depthPitchDrop: 0.18,
    finalLowpass: 0.065,
    pitchVariance: 0.007,
    resonances: [
      { freq: 104, gain: 0.32, decay: 0.09 },
      { freq: 168, gain: 0.22, decay: 0.072 },
      { freq: 260, gain: 0.06, decay: 0.046 }
    ],
    transient: { gain: 0.008, decay: 0.026, color: 0.02 },
    felt: { gain: 0.23, decay: 0.09, color: 0.018 },
    rain: { gain: 0.006, decay: 0.08, color: 0.04 }
  },
  "rosewood-desk": {
    label: "Rosewood Desk Dok",
    model: "wood",
    master: 0.72,
    duration: 0.112,
    attack: 0.004,
    drive: 1.1,
    depthPitchDrop: 0.13,
    finalLowpass: 0.16,
    pitchVariance: 0.015,
    resonances: [
      { freq: 144, gain: 0.42, decay: 0.06 },
      { freq: 238, gain: 0.32, decay: 0.044 },
      { freq: 372, gain: 0.1, decay: 0.026 }
    ],
    transient: { gain: 0.078, decay: 0.009, color: 0.078 },
    woodHollow: { freq: 82, gain: 0.14, decay: 0.072 },
    stamp: { freq: 116, gain: 0.045, delay: 0.008, decay: 0.032 }
  },
  "opal-glass": {
    label: "Opal Glass Tok",
    model: "glass",
    master: 0.52,
    duration: 0.088,
    attack: 0.002,
    drive: 1.0,
    depthPitchDrop: 0.045,
    finalLowpass: 0.31,
    pitchVariance: 0.011,
    resonances: [
      { freq: 188, gain: 0.22, decay: 0.034 },
      { freq: 336, gain: 0.22, decay: 0.024 },
      { freq: 540, gain: 0.055, decay: 0.014 }
    ],
    transient: { gain: 0.04, decay: 0.006, color: 0.11 },
    ceramic: { freq: 470, gain: 0.034, decay: 0.018 }
  },
  "holo-pixel": {
    label: "Holo Pixel Tok",
    model: "neon",
    master: 0.5,
    duration: 0.064,
    attack: 0.0018,
    drive: 1.02,
    depthPitchDrop: 0.055,
    finalLowpass: 0.26,
    pitchVariance: 0.017,
    resonances: [
      { freq: 176, gain: 0.2, decay: 0.024 },
      { freq: 318, gain: 0.15, decay: 0.016 },
      { freq: 480, gain: 0.04, decay: 0.009 }
    ],
    transient: { gain: 0.045, decay: 0.0048, color: 0.1 },
    membrane: { gain: 0.052, decay: 0.018, bend: 0.18 }
  }
};

const KEY_SHAPES = {
  normal: { freq: 1, duration: 1, body: 1, transient: 1, gain: 1, decay: 1 },
  space: { freq: 0.76, duration: 1.2, body: 1.18, transient: 0.72, gain: 0.94, decay: 1.12 },
  enter: { freq: 0.72, duration: 1.28, body: 1.28, transient: 0.9, gain: 1.08, decay: 1.18, secondary: true },
  backspace: { freq: 1.07, duration: 0.78, body: 0.78, transient: 0.88, gain: 0.86, decay: 0.72 }
};



// ------------------------------------------------------------ 2. settings
const PREF_KEY = "ink-over-pdf-prefs-v2";
const NOTES_PREFIX = "ink-over-pdf-notes-v1:";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

// Every stack ends in the same Korean-capable fallbacks, so if a font slice is still downloading
// the placeholder glyph looks like its neighbours instead of a random system font.
const KR_SANS = '"Pretendard Variable", Pretendard, "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif';
const KR_SERIF = '"Noto Serif KR", "Apple SD Myungjo", "Batang", serif';
const KR_MONO = '"Nanum Gothic Coding", "D2Coding", ui-monospace, monospace';
// css: substring of the <link> that provides the face (checked once on load); lazy faces declared in styles.css have none
// and are verified the first time they are picked. adjust: evens out fonts drawn small for their nominal size.
const fontDef = (group, label, family, o = {}) => ({
  group, label, family, adjust: o.adjust || 1, css: o.css || "", stack: `"${family}", ${o.fallback || KR_SANS}`
});
const G = "fonts.googleapis.com";

const FONTS = {
  // 산세리프
  sans: fontDef("산세리프", "Pretendard 프리텐다드", "Pretendard Variable", { css: "pretendardvariable" }),
  suit: fontDef("산세리프", "SUIT 수트", "SUIT Variable", { css: "SUIT-Variable" }),
  wanted: fontDef("산세리프", "Wanted Sans 원티드산스", "Wanted Sans Variable", { css: "WantedSansVariable" }),
  spoqa: fontDef("산세리프", "Spoqa Han Sans Neo 스포카", "Spoqa Han Sans Neo", { css: "SpoqaHanSansNeo" }),
  nanumSquare: fontDef("산세리프", "나눔스퀘어", "NanumSquare", { css: "nanumsquare.css" }),
  nanumSquareRound: fontDef("산세리프", "나눔스퀘어라운드", "NanumSquareRound", { css: "nanumsquareround" }),
  plexKr: fontDef("산세리프", "IBM Plex Sans KR", "IBM Plex Sans KR", { css: G }),
  notoSans: fontDef("산세리프", "Noto Sans 본고딕", "Noto Sans KR", { css: G }),
  // 명조·바탕
  batang: fontDef("명조·바탕", "고운바탕", "Gowun Batang", { css: G, fallback: KR_SERIF }),
  maruBuri: fontDef("명조·바탕", "마루부리 MaruBuri", "MaruBuri", { css: "maru-buri", fallback: KR_SERIF }),
  ridiBatang: fontDef("명조·바탕", "리디바탕 RIDIBatang", "RIDIBatang", { css: "RIDIBatang", fallback: KR_SERIF }),
  serif: fontDef("명조·바탕", "Noto Serif 본명조", "Noto Serif KR", { css: G, fallback: KR_SERIF }),
  nanumMyeongjo: fontDef("명조·바탕", "나눔명조", "Nanum Myeongjo", { css: G, fallback: KR_SERIF }),
  hahmlet: fontDef("명조·바탕", "함렛 Hahmlet", "Hahmlet", { css: G, fallback: KR_SERIF }),
  diphylleia: fontDef("명조·바탕", "디필레이아 Diphylleia", "Diphylleia", { css: G, fallback: KR_SERIF }),
  songMyung: fontDef("명조·바탕", "송명", "Song Myung", { css: G, fallback: KR_SERIF }),
  // 부드러운·귀여운
  dodum: fontDef("부드러운·귀여운", "고운돋움", "Gowun Dodum", { css: G }),
  orbit: fontDef("부드러운·귀여운", "오르빗 Orbit", "Orbit", { css: G }),
  dongle: fontDef("부드러운·귀여운", "동글 Dongle", "Dongle", { css: G, adjust: 1.32 }),
  cafe24: fontDef("부드러운·귀여운", "카페24 써라운드", "Cafe24Ssurround"),
  hiMelody: fontDef("부드러운·귀여운", "하이멜로디", "Hi Melody", { css: G, adjust: 1.1 }),
  gamja: fontDef("부드러운·귀여운", "감자꽃", "Gamja Flower", { css: G, adjust: 1.1 }),
  jua: fontDef("부드러운·귀여운", "주아", "Jua", { css: G }),
  singleDay: fontDef("부드러운·귀여운", "싱글데이", "Single Day", { css: G, adjust: 1.05 }),
  poorStory: fontDef("부드러운·귀여운", "푸어스토리", "Poor Story", { css: G, adjust: 1.08 }),
  cuteFont: fontDef("부드러운·귀여운", "귀여운 폰트", "Cute Font", { css: G, adjust: 1.1 }),
  omyu: fontDef("부드러운·귀여운", "오뮤 다예쁨체", "omyu_pretty", { adjust: 1.05 }),
  binggrae: fontDef("부드러운·귀여운", "빙그레체", "Binggrae"),
  // 손글씨
  hand: fontDef("손글씨", "개구 Gaegu", "Gaegu", { css: G, adjust: 1.12 }),
  kyobo: fontDef("손글씨", "교보손글씨 2019", "KyoboHand"),
  penScript: fontDef("손글씨", "나눔손글씨 펜", "Nanum Pen Script", { css: G, adjust: 1.3 }),
  ownglyph: fontDef("손글씨", "온글잎 박다현체", "Ownglyph_ParkDaHyun", { adjust: 1.15 }),
  leeSeoyun: fontDef("손글씨", "이서윤체", "LeeSeoyun", { adjust: 1.1 }),
  // 디스플레이
  gmarket: fontDef("디스플레이", "지마켓산스", "GmarketSans", { css: "GmarketSans" }),
  bagel: fontDef("디스플레이", "베이글팻원 Bagel Fat One", "Bagel Fat One", { css: G }),
  gasoek: fontDef("디스플레이", "가속 Gasoek One", "Gasoek One", { css: G }),
  grandiflora: fontDef("디스플레이", "그랜디플로라 Grandiflora One", "Grandiflora One", { css: G, fallback: KR_SERIF }),
  // 코드
  mono: fontDef("코드", "JetBrains Mono", "JetBrains Mono", { css: G, fallback: KR_MONO }),
};

// ---- Hangul font preloading
// Google's Korean fonts are cut into many unicode-range slices that download lazily. The first time you type a
// syllable (or a bare jamo like ㅎ mid-composition) from a slice that hasn't arrived yet, the browser paints it in a
// fallback font for a moment — that's the "different typeface popping in". So we fetch every slice we're likely to
// need up front: jamo first, then the 2,350 everyday syllables (KS X 1001) in small idle-time batches.
const fontPreload = { done: new Set(), syllables: null };

function hangulSyllables() {
  if (fontPreload.syllables) return fontPreload.syllables;
  let list = [];
  try {
    const dec = new TextDecoder("euc-kr");
    for (let hi = 0xb0; hi <= 0xc8; hi++) {
      const bytes = [];
      for (let lo = 0xa1; lo <= 0xfe; lo++) bytes.push(hi, lo);
      list.push(...Array.from(dec.decode(new Uint8Array(bytes))));
    }
  } catch (e) {
    for (let c = 0xac00; c <= 0xd7a3; c += 5) list.push(String.fromCharCode(c)); // sparse sample still hits most slices
  }
  fontPreload.syllables = list.filter((ch) => ch >= "\uac00" && ch <= "\ud7a3");
  return fontPreload.syllables;
}

// A face that can't be loaded would silently render as the fallback, so take it out of the picker instead.
function dropFont(key, announce) {
  const font = FONTS[key];
  if (!font || font.missing || key === defaultPrefs.font) return;
  font.missing = true;
  const opt = refs.fontSelect && refs.fontSelect.querySelector(`option[value="${key}"]`);
  if (opt) {
    const group = opt.parentElement;
    opt.remove();
    if (group && group.tagName === "OPTGROUP" && !group.children.length) group.remove();
  }
  if (state.prefs.font === key) {
    if (announce) toast(`"${font.label}" 폰트를 불러오지 못해 기본 폰트로 바꿨어요.`);
    setPrefs({ font: defaultPrefs.font });
  }
}

function ensureFontReady(key) {
  const font = FONTS[key];
  if (!font || font.missing || !document.fonts || !document.fonts.load || fontPreload.done.has(key)) return;
  fontPreload.done.add(key);
  const spec = `400 18px "${font.family}"`;
  const jamo = "ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
  const basics = " .,!?-~()[]0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const preloadRest = () => {
    const all = hangulSyllables();
    const step = 160;
    let i = 0;
    const next = () => {
      if (i >= all.length) return;
      const chunk = all.slice(i, i + step).join("");
      i += step;
      document.fonts.load(spec, chunk).catch(() => {}).then(() => {
        (window.requestIdleCallback || ((fn) => setTimeout(fn, 80)))(next);
      });
    };
    next();
  };
  document.fonts.load(spec, jamo + basics).then((faces) => {
    if (!faces || !faces.length) dropFont(key, true);
    else preloadRest();
  }, () => dropFont(key, true));
}

// Cheap check on load: a font whose stylesheet failed to download never shows up in the picker.
function pruneMissingFonts() {
  Object.entries(FONTS).forEach(([key, font]) => {
    if (!font.css) return;
    const link = document.querySelector(`link[href*="${font.css}"]`);
    if (!link || !link.sheet) dropFont(key, false);
  });
  if (refs.fontSelect) refs.fontSelect.value = state.prefs.font;
  ensureFontReady(state.prefs.font);
}

// One pick sets spark style + key sound + font + ink color. Everything stays editable.
const MOODS = {
  "cozy-paper":  { label: "Cozy Paper",  note: "Warm glint, pencil on paper", effectMode: "soft-spark", soundPack: "pencil-paper",     font: "batang", color: "#2c2420" },
  "quiet-ink":   { label: "Quiet Ink",   note: "Soft ink drops, typewriter",  effectMode: "ink",        soundPack: "muted-typewriter", font: "maruBuri",  color: "#1f3a8f" },
  "starlight":   { label: "Starlight",   note: "Tiny stars, glass taps",      effectMode: "star-dust",  soundPack: "opal-glass",       font: "dodum",  color: "#6a3fb0" },
  "candy-pop":   { label: "Candy Pop",   note: "Bubbly pops, silicone keys",  effectMode: "candy-pop",  soundPack: "silicone-pop",     font: "hand",   color: "#b32b2b" },
  "rainy-day":   { label: "Rainy Day",   note: "Ripples, rain on a window",   effectMode: "ripple-lens", soundPack: "rainy-window",    font: "hand",   color: "#1f3a8f" },
  "night-code":  { label: "Night Code",  note: "Neon sparks, deep thock",     effectMode: "cyber-pink", soundPack: "deep-thock",       font: "mono",   color: "#6a3fb0" }
};

const defaultPrefs = {
  mood: "cozy-paper",
  effectEnabled: true,
  effectMode: "soft-spark",
  soundEnabled: true,
  soundPack: "pencil-paper",
  volume: 0.38,
  intensity: 0.8,
  font: "batang",
  fontSize: 18,
  color: "#2c2420",
  reviewLook: "laser",
  reviewColor: "coral",
  reviewFx: "none",
  reviewBrush: "laser",
  reviewSize: "m",
  reviewLens: "spot",
  reviewLensSize: "m"
};

// Names the spark/sound engines fall back to.
const defaultSettings = { soundPack: "deep-thock", effectMode: "soft-spark" };

const refs = {};
const state = {
  prefs: loadPrefs(),
  settings: {},          // engine-facing values derived from prefs
  doc: null, pages: [], notes: [], noteKey: "", fileName: "",
  fit: 1, zoom: 1, typeTool: false, activeNote: null, currentPage: 1
};
const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
const reducedMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

let lastTactileAt = 0;
let typingStreak = 0;
let lastStreakAt = 0;
let lastStreakRewardAt = 0;
let typingSpeedFactor = 0;
let recentKeyIntervals = [];
let caretHideTimer = 0;
let toastTimer = 0;
let saveTimer = 0;
const STREAK_REWARD_STEP = 24;

function clamp(value, min, max) {
  const safe = Number.isFinite(value) ? value : min;
  return Math.min(max, Math.max(min, safe));
}
function clamp01(value) { return clamp(value, 0, 1); }

function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(PREF_KEY) || "{}");
    const prefs = { ...defaultPrefs, ...saved };
    if (!MOODS[prefs.mood]) prefs.mood = "";
    if (!EFFECT_PRESETS[prefs.effectMode]) prefs.effectMode = defaultPrefs.effectMode;
    if (!SOUND_PACKS[prefs.soundPack]) prefs.soundPack = defaultPrefs.soundPack;
    if (!FONTS[prefs.font]) prefs.font = defaultPrefs.font;
    prefs.volume = clamp01(Number(prefs.volume));
    prefs.intensity = clamp01(Number(prefs.intensity));
    prefs.fontSize = clamp(Number(prefs.fontSize), 8, 36);
    if (!("reviewLook" in saved)) {                      // first run of Review 2.0: start from the Ember look
      prefs.reviewLook = "laser"; prefs.reviewColor = "coral"; prefs.reviewFx = "none"; prefs.reviewBrush = "laser"; prefs.reviewSize = "m";
    }
    if (typeof prefs.reviewLook !== "string") prefs.reviewLook = "laser";
    if (typeof prefs.reviewColor !== "string") prefs.reviewColor = defaultPrefs.reviewColor;
    if (typeof prefs.reviewFx !== "string") prefs.reviewFx = "none";
    if (!["laser", "comet", "veil", "ribbon", "glitter", "sparkle", "dazzle", "gloss", "glossy", "jelly", "cream", "crumb", "puff", "ganache", "matcha", "aura", "slash", "magma", "chrome", "biscuit"].includes(prefs.reviewBrush)) prefs.reviewBrush = "laser";
    if (!["s", "m", "l"].includes(prefs.reviewSize)) prefs.reviewSize = "m";
    if (!["spot", "ruler", "off"].includes(prefs.reviewLens)) prefs.reviewLens = "spot";
    if (!["s", "m", "l"].includes(prefs.reviewLensSize)) prefs.reviewLensSize = "m";
    return prefs;
  } catch (error) {
    return { ...defaultPrefs };
  }
}

function savePrefs() {
  try { localStorage.setItem(PREF_KEY, JSON.stringify(state.prefs)); } catch (error) { /* storage may be blocked */ }
}

// One "effect strength" slider drives every legacy knob the spark engine reads.
function deriveSettings() {
  const p = state.prefs;
  const k = p.intensity;
  const reduced = reducedMotionQuery.matches;
  state.settings = {
    soundEnabled: p.soundEnabled, soundPack: p.soundPack, volume: p.volume,
    variation: 0.45, soundDepth: 0.68,
    effectEnabled: p.effectEnabled && !reduced, effectMode: p.effectMode,
    effectIntensity: clamp(0.35 + k * 0.65, 0.05, 1),
    glyphMotion: k, particleAmount: k * 0.95, glowAmount: k * 0.95,
    specialFrequency: 0.36, shakeAmount: 0.3 * k, effectSpeed: 0.5,
    reduceMotion: reduced
  };
}

function applyPrefs() {
  deriveSettings();
  const p = state.prefs;
  const effect = EFFECT_PRESETS[p.effectMode];
  const body = document.body;
  body.dataset.effect = p.effectMode;
  body.style.setProperty("--note-font", FONTS[p.font].stack);
  body.style.setProperty("--font-adjust", String(FONTS[p.font].adjust || 1));
  ensureFontReady(p.font);
  body.style.setProperty("--note-size", `${p.fontSize}px`);
  body.style.setProperty("--note-color", p.color);
  body.style.setProperty("--effect-primary", effect.primary);
  body.style.setProperty("--effect-secondary", effect.secondary);
  body.style.setProperty("--effect-aura", effect.aura);
  body.style.setProperty("--glow", `${Math.round(6 + state.settings.glowAmount * 16)}px`);
  syncControls();
  syncReviewDock();
  soundEngine.ensurePack(p.soundPack);
}

function setPrefs(patch, options = {}) {
  Object.assign(state.prefs, patch);
  if (!options.keepMood && !("mood" in patch)) state.prefs.mood = matchingMood();
  applyPrefs();
  savePrefs();
  if (options.relayout) layoutNotes();
}

// Highlights a Mood only while the current values still match it exactly.
function matchingMood() {
  const p = state.prefs;
  const hit = Object.entries(MOODS).find(([, m]) =>
    m.effectMode === p.effectMode && m.soundPack === p.soundPack && m.font === p.font && m.color === p.color);
  return hit ? hit[0] : "";
}

function applyMood(id) {
  const mood = MOODS[id];
  if (!mood) return;
  setPrefs({ mood: id, effectMode: mood.effectMode, soundPack: mood.soundPack, font: mood.font, color: mood.color });
  // Let the new sound speak for itself right away.
  soundEngine.play("normal");
  const rect = refs.tryNote.getBoundingClientRect();
  if (rect.width && state.settings.effectEnabled) {
    spawnEffectBurst(state.settings.effectMode, {
      x: rect.left + 28, y: rect.top + rect.height / 2, glyphWidth: 10, glyphHeight: 18,
      settings: state.settings, isSpecial: true, keyType: "normal", effectLevel: state.settings.effectIntensity,
      speedScale: 1, scale: 1, streak: 0
    });
  }
}

function fillSelect(select, source, labelOf) {
  select.innerHTML = "";
  Object.entries(source).forEach(([value, data]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labelOf(data);
    select.append(option);
  });
}

// Fonts grouped by feel (고딕 / 명조·바탕 / 손글씨 / 개성 / 코드); each option previews in its own typeface.
function fillFontSelect() {
  refs.fontSelect.innerHTML = "";
  const groups = {};
  Object.entries(FONTS).forEach(([key, font]) => {
    if (!groups[font.group]) {
      groups[font.group] = document.createElement("optgroup");
      groups[font.group].label = font.group;
      refs.fontSelect.append(groups[font.group]);
    }
    const option = document.createElement("option");
    option.value = key;
    option.textContent = font.label;
    option.style.fontFamily = font.stack;
    groups[font.group].append(option);
  });
}

function buildMoodGrid() {
  refs.moodGrid.innerHTML = "";
  Object.entries(MOODS).forEach(([id, mood]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mood";
    button.dataset.mood = id;
    button.style.setProperty("--dot", EFFECT_PRESETS[mood.effectMode].primary);
    const name = document.createElement("strong");
    name.textContent = mood.label;
    const note = document.createElement("small");
    note.textContent = mood.note;
    button.append(name, note);
    button.addEventListener("click", () => applyMood(id));
    refs.moodGrid.append(button);
  });
}

function syncControls() {
  const p = state.prefs;
  refs.effectEnabled.checked = p.effectEnabled;
  refs.soundEnabled.checked = p.soundEnabled;
  refs.intensityRange.value = String(Math.round(p.intensity * 100));
  refs.intensityReadout.textContent = `${Math.round(p.intensity * 100)}%`;
  refs.volumeRange.value = String(Math.round(p.volume * 100));
  refs.volumeReadout.textContent = `${Math.round(p.volume * 100)}%`;
  refs.fontSelect.value = p.font;
  refs.fontSizeRange.value = String(p.fontSize);
  refs.fontSizeReadout.textContent = `${p.fontSize} px`;
  refs.effectModeSelect.value = p.effectMode;
  refs.soundPackSelect.value = p.soundPack;
  refs.inkColorRow.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.setAttribute("aria-pressed", String(swatch.dataset.color === p.color));
  });
  refs.moodGrid.querySelectorAll(".mood").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mood === p.mood));
  });
}

function setSettingsOpen(open) {
  document.body.classList.toggle("settings-open", open);
  refs.settingsPanel.inert = !open;
  refs.settingsToggleBtn.setAttribute("aria-expanded", String(open));
  if (open) refs.closeSettingsBtn.focus({ preventScroll: true });
  else if (document.activeElement && refs.settingsPanel.contains(document.activeElement)) refs.settingsToggleBtn.focus({ preventScroll: true });
}

// ------------------------------------------------------ 3. typing feedback
// Typing feedback (sound on keydown for low latency, sparks on input so the
// caret is already at its final position — this also covers Korean IME).

function typingRoot() { return state.activeNote; }

function caretRect() {
  const root = typingRoot();
  const selection = window.getSelection();
  if (!root || !selection || !selection.rangeCount) return null;
  const range = selection.getRangeAt(0).cloneRange();
  if (!root.contains(range.startContainer)) return null;
  range.collapse(true);
  const fontSize = parseFloat(getComputedStyle(root).fontSize) || 18;
  const rect = range.getClientRects()[0];
  if (rect && (rect.height || rect.width)) return { left: rect.left, top: rect.top, height: rect.height || fontSize * 1.3 };
  // Empty line / end after a line break: fall back to the box edge.
  const box = root.getBoundingClientRect();
  const empty = !root.textContent;
  return { left: box.left, top: empty ? box.top : box.bottom - fontSize * 1.3, height: fontSize * 1.3 };
}

function updateCaretGlow() {
  const rect = caretRect();
  if (!rect || !state.settings.effectEnabled) return;
  refs.caretGlow.style.left = `${rect.left}px`;
  refs.caretGlow.style.top = `${rect.top}px`;
  refs.caretGlow.style.height = `${Math.max(18, rect.height)}px`;
  refs.caretGlow.classList.add("active");
  window.clearTimeout(caretHideTimer);
  caretHideTimer = window.setTimeout(() => refs.caretGlow.classList.remove("active"), 230);
}

function keyTypeFromInput(event, fallback) {
  const type = event.inputType || "";
  if (type.startsWith("delete")) return "backspace";
  if (type === "insertParagraph" || type === "insertLineBreak") return "enter";
  if (type === "insertText" && event.data === " ") return "space";
  return fallback || "normal";
}

function fireTypingFx(keyType, glyph) {
  const s = state.settings;
  const now = performance.now();
  registerKeystrokeInterval(now);
  lastTactileAt = now;
  updateTypingStreak(now, keyType);
  if (!s.effectEnabled || s.particleAmount <= 0.01) return;
  const rect = caretRect();
  if (!rect) return;
  updateCaretGlow();

  const effect = EFFECT_PRESETS[s.effectMode] || EFFECT_PRESETS[defaultSettings.effectMode];
  const seed = Math.floor(now * 10) + Math.floor(Math.random() * 1000);
  const keyScale = keyType === "enter" ? 1.25 : keyType === "space" ? 0.82 : keyType === "backspace" ? 0.56 : 1;
  const specialChance = clamp(effect.special * (0.28 + s.specialFrequency * 1.72) * s.effectIntensity + Math.min(0.22, typingStreak * 0.006), 0, 0.95);
  const isSpecial = seeded01(seed, 77) < specialChance;
  const glyphWidth = Math.max(8, rect.height * 0.52);
  // The caret sits just after the newest character, so the burst starts at that character's right side.
  spawnEffectBurst(s.effectMode, {
    x: rect.left - glyphWidth * 0.22, y: rect.top + rect.height * 0.55,
    glyphWidth, glyphHeight: rect.height, settings: s, isSpecial, keyType,
    effectLevel: s.effectIntensity, speedScale: 1.18 - s.effectSpeed * 0.46,
    scale: keyScale, streak: typingStreak
  });
  if (glyph) spawnGhostGlyph(glyph, rect, isSpecial);
}

// A faint copy of the just-typed character that lifts off and fades: decorative only, never touches the note text.
function spawnGhostGlyph(glyph, rect, isSpecial) {
  const root = typingRoot();
  if (!root) return;
  const ghost = document.createElement("span");
  ghost.className = `ghost-glyph${isSpecial ? " is-special" : ""}`;
  ghost.textContent = glyph;
  const style = getComputedStyle(root);
  ghost.style.fontFamily = style.fontFamily;
  ghost.style.fontSize = style.fontSize;
  ghost.style.left = `${rect.left - (parseFloat(style.fontSize) || 18) * 0.55}px`;
  ghost.style.top = `${rect.top}px`;
  ghost.style.height = `${rect.height}px`;
  ghost.style.lineHeight = `${rect.height}px`;
  refs.inkLayer.append(ghost);
  ghost.addEventListener("animationend", () => ghost.remove(), { once: true });
  const ghosts = refs.inkLayer.querySelectorAll(".ghost-glyph");
  if (ghosts.length > 12) ghosts[0].remove();
}


// ---- spark engine (canvas particles)
const fx = { canvas: null, ctx: null, dpr: 1, particles: [], running: false, maxParticles: 320 };

function initFxCanvas() {
  fx.canvas = refs.fxCanvas;
  if (!fx.canvas) return;
  fx.ctx = fx.canvas.getContext("2d");
  resizeFxCanvas();
  window.addEventListener("resize", resizeFxCanvas);
  window.visualViewport?.addEventListener("resize", resizeFxCanvas);
  window.visualViewport?.addEventListener("scroll", resizeFxCanvas);
}

function resizeFxCanvas() {
  if (!fx.canvas) return;
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
  fx.dpr = Math.min(window.devicePixelRatio || 1, 2);
  fx.canvas.width = Math.max(1, Math.round(viewportWidth * fx.dpr));
  fx.canvas.height = Math.max(1, Math.round(viewportHeight * fx.dpr));
  fx.canvas.style.width = `${viewportWidth}px`;
  fx.canvas.style.height = `${viewportHeight}px`;
}

function ensureFxLoop() {
  if (!fx.ctx || fx.running) return;
  fx.running = true;
  requestAnimationFrame(fxTick);
}

function fxTick(now) {
  if (!fx.ctx) {
    fx.running = false;
    return;
  }
  fx.ctx.setTransform(fx.dpr, 0, 0, fx.dpr, 0, 0);
  fx.ctx.clearRect(0, 0, fx.canvas.width / fx.dpr, fx.canvas.height / fx.dpr);
  let alive = 0;
  for (let i = fx.particles.length - 1; i >= 0; i -= 1) {
    const p = fx.particles[i];
    const t = (now - p.start) / p.life;
    if (t >= 1) {
      fx.particles.splice(i, 1);
      continue;
    }
    alive += 1;
    renderFxParticle(fx.ctx, p, Math.max(0, t));
  }
  if (alive > 0) {
    requestAnimationFrame(fxTick);
  } else {
    fx.running = false;
  }
}

const FX_ALPHA_CURVE = [
  [0, 0],
  [0.1, 1],
  [0.72, 0.82],
  [1, 0]
];
const FX_SIZE_CURVE = [
  [0, 0.25],
  [0.22, 1.15],
  [0.42, 0.9],
  [1, 0.42]
];

function sampleFxCurve(keyframes, t) {
  if (t <= keyframes[0][0]) return keyframes[0][1];
  for (let i = 1; i < keyframes.length; i += 1) {
    const [t1, v1] = keyframes[i];
    if (t <= t1) {
      const [t0, v0] = keyframes[i - 1];
      const local = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
      return v0 + (v1 - v0) * local;
    }
  }
  return keyframes[keyframes.length - 1][1];
}

function addFxParticle(p) {
  if (fx.particles.length >= fx.maxParticles) fx.particles.splice(0, fx.particles.length - fx.maxParticles + 1);
  fx.particles.push(p);
}

function renderFxParticle(ctx, p, t) {
  const alpha = clamp01(sampleFxCurve(p.alphaKeyframes || FX_ALPHA_CURVE, t)) * p.peakAlpha;
  if (alpha <= 0.005) return;
  if (p.shape === "line") {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = "round";
    if (p.glow) {
      ctx.shadowBlur = p.glow;
      ctx.shadowColor = p.colorB || p.colorA;
    }
    ctx.strokeStyle = p.colorA;
    ctx.lineWidth = p.size;
    ctx.beginPath();
    ctx.moveTo(p.x1, p.y1);
    ctx.lineTo(p.x2, p.y2);
    ctx.stroke();
    ctx.restore();
    return;
  }
  const elapsedSec = (t * p.life) / 1000;
  const px = p.x + p.vx * elapsedSec + 0.5 * (p.ax || 0) * elapsedSec * elapsedSec;
  const py = p.y + p.vy * elapsedSec + 0.5 * (p.ay || 0) * elapsedSec * elapsedSec;
  const sizeScale = sampleFxCurve(p.sizeKeyframes || FX_SIZE_CURVE, t);
  const size = Math.max(0.3, p.size * sizeScale);
  const rotation = (p.rotation || 0) + (p.rotSpeed || 0) * elapsedSec;
  ctx.save();
  ctx.translate(px, py);
  if (rotation) ctx.rotate((rotation * Math.PI) / 180);
  ctx.globalAlpha = alpha;
  if (p.glow) {
    ctx.shadowBlur = p.glow;
    ctx.shadowColor = p.colorB || p.colorA;
  }
  drawFxShape(ctx, p, size);
  ctx.restore();
}

function drawStarPath(ctx, outerR, innerR, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function fillFxRadial(ctx, s, colorA, colorB, hotCenter) {
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(s / 2, 0.5));
  g.addColorStop(0, hotCenter || "#ffffff");
  g.addColorStop(0.4, colorA);
  g.addColorStop(1, colorB || colorA);
  ctx.fillStyle = g;
  ctx.fill();
}

function hexToRgba(hex, alpha) {
  const clean = String(hex).replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = Number.parseInt(full, 16) || 0;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function roundedRectPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawFxShape(ctx, p, s) {
  switch (p.shape) {
    case "star8":
      drawStarPath(ctx, s / 2, s * 0.42, 8);
      fillFxRadial(ctx, s, p.colorA, p.colorB);
      break;
    case "star4":
      drawStarPath(ctx, s / 2, s * 0.18, 4);
      fillFxRadial(ctx, s, p.colorA, p.colorB);
      break;
    case "diamond":
      ctx.beginPath();
      ctx.moveTo(0, -s / 2);
      ctx.lineTo(s / 2, 0);
      ctx.lineTo(0, s / 2);
      ctx.lineTo(-s / 2, 0);
      ctx.closePath();
      ctx.fillStyle = p.colorA;
      ctx.fill();
      break;
    case "dot":
      ctx.beginPath();
      ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      fillFxRadial(ctx, s, p.colorA, "transparent", p.colorA);
      break;
    case "square":
      ctx.shadowBlur = 0;
      ctx.fillStyle = p.colorA;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      if (p.extra && p.extra.trail) {
        ctx.globalAlpha *= 0.32;
        ctx.fillRect(-s / 2 - p.extra.trail[0], -s / 2 - p.extra.trail[1], s, s);
        ctx.globalAlpha *= 0.55;
        ctx.fillRect(-s / 2 - p.extra.trail[0] * 2, -s / 2 - p.extra.trail[1] * 2, s, s);
      }
      break;
    case "shard": {
      ctx.beginPath();
      ctx.moveTo(-s / 2, -s * 0.1);
      ctx.lineTo(s / 2, 0);
      ctx.lineTo(-s / 2, s * 0.1);
      ctx.closePath();
      const grad = ctx.createLinearGradient(-s / 2, 0, s / 2, 0);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.55, p.colorA);
      grad.addColorStop(1, p.colorB || p.colorA);
      ctx.fillStyle = grad;
      ctx.fill();
      if (p.extra && p.extra.specular) {
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = Math.max(0.5, s * 0.05);
        ctx.beginPath();
        ctx.moveTo(-s * 0.3, -s * 0.02);
        ctx.lineTo(s * 0.35, 0);
        ctx.stroke();
      }
      break;
    }
    case "bolt": {
      const pts = p.extra.points || [];
      if (pts.length < 2) break;
      const thin = Boolean(p.extra.thin);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      const tracePath = () => {
        ctx.beginPath();
        pts.forEach(([bx, by], i) => {
          if (i === 0) ctx.moveTo(bx * s, by * s);
          else ctx.lineTo(bx * s, by * s);
        });
      };
      const baseGlow = p.glow || 0;
      // outer soft glow pass -- wide, blurred, translucent
      ctx.save();
      ctx.shadowBlur = baseGlow * 1.7;
      ctx.shadowColor = p.colorA;
      ctx.strokeStyle = hexToRgba(p.colorA, 0.5);
      ctx.lineWidth = Math.max(2, s * (thin ? 0.22 : 0.32));
      tracePath();
      ctx.stroke();
      ctx.restore();
      // mid saturated core -- the bolt's real color
      ctx.shadowBlur = baseGlow * 0.65;
      ctx.shadowColor = p.colorB || p.colorA;
      ctx.strokeStyle = p.colorB || p.colorA;
      ctx.lineWidth = Math.max(1, s * (thin ? 0.1 : 0.15));
      tracePath();
      ctx.stroke();
      // inner hot-white core -- crisp, unblurred, reads as the actual spark
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#fffef6";
      ctx.lineWidth = Math.max(0.4, s * (thin ? 0.035 : 0.05));
      tracePath();
      ctx.stroke();
      break;
    }
    case "bubble":
      ctx.beginPath();
      ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(p.colorA, 0.24);
      ctx.fill();
      ctx.lineWidth = Math.max(0.6, s * 0.055);
      ctx.strokeStyle = hexToRgba(p.colorB || p.colorA, 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-s * 0.16, -s * 0.18, s * 0.11, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();
      break;
    case "ring":
      ctx.beginPath();
      ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      ctx.lineWidth = Math.max(0.8, s * 0.045);
      ctx.strokeStyle = p.colorA;
      ctx.stroke();
      break;
    case "lens": {
      const lg = ctx.createRadialGradient(-s * 0.16, -s * 0.18, 0, 0, 0, Math.max(s * 0.56, 0.5));
      lg.addColorStop(0, "rgba(255,255,255,0.7)");
      lg.addColorStop(0.34, hexToRgba(p.colorA, 0.2));
      lg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.52, s * 0.38, 0, 0, Math.PI * 2);
      ctx.fillStyle = lg;
      ctx.fill();
      ctx.lineWidth = Math.max(0.6, s * 0.035);
      ctx.strokeStyle = hexToRgba(p.colorB || p.colorA, 0.68);
      ctx.stroke();
      ctx.globalAlpha *= 0.46;
      ctx.beginPath();
      ctx.arc(-s * 0.18, -s * 0.14, s * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      break;
    }
    case "orbit": {
      const extra = p.extra || {};
      const start = extra.start ?? -Math.PI * 0.34;
      const end = extra.end ?? start + Math.PI * 1.42;
      const og = ctx.createLinearGradient(-s / 2, -s * 0.16, s / 2, s * 0.16);
      og.addColorStop(0, "transparent");
      og.addColorStop(0.22, p.colorA);
      og.addColorStop(0.72, p.colorB || p.colorA);
      og.addColorStop(1, "transparent");
      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(0.75, s * 0.055);
      ctx.strokeStyle = og;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.5, s * 0.24, 0, start, end);
      ctx.stroke();
      if (extra.satellite) {
        const sx = Math.cos(end) * s * 0.5;
        const sy = Math.sin(end) * s * 0.24;
        const satR = Math.max(1, s * 0.09);
        const sat = ctx.createRadialGradient(sx - satR * 0.3, sy - satR * 0.35, 0, sx, sy, satR * 1.4);
        sat.addColorStop(0, "#ffffff");
        sat.addColorStop(0.46, p.colorB || p.colorA);
        sat.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(sx, sy, satR, 0, Math.PI * 2);
        ctx.fillStyle = sat;
        ctx.fill();
      }
      break;
    }
    case "fiber":
      ctx.strokeStyle = p.colorA;
      ctx.lineWidth = Math.max(0.6, s * 0.16);
      ctx.beginPath();
      ctx.moveTo(-s / 2, 0);
      ctx.lineTo(s / 2, 0);
      ctx.stroke();
      break;
    case "pearl": {
      ctx.beginPath();
      ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      const pg = ctx.createRadialGradient(-s * 0.15, -s * 0.15, 0, 0, 0, Math.max(s / 2, 0.5));
      pg.addColorStop(0, "#ffffff");
      pg.addColorStop(0.5, p.colorA);
      pg.addColorStop(1, p.colorB || p.colorA);
      ctx.fillStyle = pg;
      ctx.fill();
      break;
    }
    case "ribbon": {
      const w = s * 1.85;
      const h = Math.max(2, s * 0.28);
      const rg = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      rg.addColorStop(0, "transparent");
      rg.addColorStop(0.18, p.colorA);
      rg.addColorStop(0.58, p.colorB || p.colorA);
      rg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.bezierCurveTo(-w * 0.28, -h, w * 0.22, -h * 0.8, w / 2, 0);
      ctx.bezierCurveTo(w * 0.18, h * 0.9, -w * 0.24, h, -w / 2, 0);
      ctx.closePath();
      ctx.fillStyle = rg;
      ctx.fill();
      ctx.globalAlpha *= 0.45;
      ctx.strokeStyle = "rgba(255,255,255,0.78)";
      ctx.lineWidth = Math.max(0.45, h * 0.14);
      ctx.beginPath();
      ctx.moveTo(-w * 0.38, -h * 0.08);
      ctx.bezierCurveTo(-w * 0.12, -h * 0.52, w * 0.18, -h * 0.38, w * 0.38, -h * 0.04);
      ctx.stroke();
      break;
    }
    case "petal": {
      const pg = ctx.createLinearGradient(0, -s * 0.56, 0, s * 0.5);
      pg.addColorStop(0, "#fff7fa");
      pg.addColorStop(0.46, p.colorA);
      pg.addColorStop(1, p.colorB || p.colorA);
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.56);
      ctx.bezierCurveTo(s * 0.44, -s * 0.2, s * 0.34, s * 0.32, 0, s * 0.54);
      ctx.bezierCurveTo(-s * 0.34, s * 0.28, -s * 0.4, -s * 0.18, 0, -s * 0.56);
      ctx.closePath();
      ctx.fillStyle = pg;
      ctx.fill();
      ctx.globalAlpha *= 0.38;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = Math.max(0.45, s * 0.035);
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.38);
      ctx.quadraticCurveTo(s * 0.06, 0, 0, s * 0.36);
      ctx.stroke();
      break;
    }
    case "fold": {
      const w = s * 0.95;
      const h = s * 0.78;
      const fg = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      fg.addColorStop(0, "#ffffff");
      fg.addColorStop(0.46, p.colorA);
      fg.addColorStop(1, p.colorB || p.colorA);
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -h * 0.12);
      ctx.lineTo(-w * 0.08, -h * 0.52);
      ctx.lineTo(w * 0.5, -h * 0.02);
      ctx.lineTo(-w * 0.02, h * 0.52);
      ctx.closePath();
      ctx.fillStyle = fg;
      ctx.fill();
      ctx.globalAlpha *= 0.42;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = Math.max(0.45, s * 0.035);
      ctx.beginPath();
      ctx.moveTo(-w * 0.08, -h * 0.48);
      ctx.lineTo(-w * 0.02, h * 0.48);
      ctx.moveTo(-w * 0.42, -h * 0.08);
      ctx.lineTo(w * 0.36, -h * 0.02);
      ctx.stroke();
      break;
    }
    case "keycap": {
      const w = s * 1.08;
      const h = s * 0.78;
      const kg = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
      kg.addColorStop(0, "#ffffff");
      kg.addColorStop(0.42, p.colorA);
      kg.addColorStop(1, p.colorB || p.colorA);
      roundedRectPath(ctx, -w / 2, -h / 2, w, h, Math.max(2, s * 0.18));
      ctx.fillStyle = kg;
      ctx.fill();
      ctx.lineWidth = Math.max(0.7, s * 0.05);
      ctx.strokeStyle = "rgba(255,255,255,0.78)";
      ctx.stroke();
      ctx.globalAlpha *= 0.4;
      roundedRectPath(ctx, -w * 0.34, -h * 0.25, w * 0.68, h * 0.46, Math.max(1, s * 0.1));
      ctx.strokeStyle = hexToRgba(p.colorA, 0.65);
      ctx.stroke();
      break;
    }
    case "needle": {
      const w = s * 1.05;
      const h = Math.max(2, s * 0.24);
      const ng = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      ng.addColorStop(0, p.colorA);
      ng.addColorStop(0.5, "#ffffff");
      ng.addColorStop(1, p.colorB || p.colorA);
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.lineTo(-w * 0.08, -h / 2);
      ctx.lineTo(w / 2, 0);
      ctx.lineTo(-w * 0.08, h / 2);
      ctx.closePath();
      ctx.fillStyle = ng;
      ctx.fill();
      break;
    }
    case "tile": {
      const w = s * 0.82;
      const tg = ctx.createLinearGradient(-w / 2, -w / 2, w / 2, w / 2);
      tg.addColorStop(0, "#ffffff");
      tg.addColorStop(0.34, p.colorA);
      tg.addColorStop(1, p.colorB || p.colorA);
      roundedRectPath(ctx, -w / 2, -w / 2, w, w, Math.max(1, s * 0.08));
      ctx.fillStyle = tg;
      ctx.fill();
      ctx.globalAlpha *= 0.38;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-w * 0.36, -w * 0.36, w * 0.72, Math.max(0.8, w * 0.08));
      break;
    }
    case "laser": {
      const w = s * 1.7;
      const h = Math.max(1, s * 0.1);
      const lg = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      lg.addColorStop(0, "transparent");
      lg.addColorStop(0.22, p.colorA);
      lg.addColorStop(0.5, "#ffffff");
      lg.addColorStop(0.78, p.colorB || p.colorA);
      lg.addColorStop(1, "transparent");
      ctx.fillStyle = lg;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.globalAlpha *= 0.58;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-w * 0.12, -h * 1.1, w * 0.24, h * 2.2);
      break;
    }
    case "plasma": {
      const w = s * 1.55;
      const h = Math.max(2, s * 0.32);
      const pg = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      pg.addColorStop(0, "transparent");
      pg.addColorStop(0.2, p.colorA);
      pg.addColorStop(0.5, "#ffffff");
      pg.addColorStop(0.8, p.colorB || p.colorA);
      pg.addColorStop(1, "transparent");
      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(0.9, s * 0.08);
      ctx.strokeStyle = pg;
      ctx.beginPath();
      ctx.moveTo(-w / 2, 0);
      ctx.bezierCurveTo(-w * 0.24, -h, w * 0.18, h, w / 2, 0);
      ctx.stroke();
      break;
    }
    case "streak": {
      const w = Math.max(1.2, s * 0.16);
      const h = s * 1.45;
      const sg = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
      sg.addColorStop(0, "transparent");
      sg.addColorStop(0.24, p.colorB || p.colorA);
      sg.addColorStop(0.52, "#ffffff");
      sg.addColorStop(0.78, p.colorA);
      sg.addColorStop(1, "transparent");
      ctx.fillStyle = sg;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      break;
    }
    case "smoke": {
      const sg = ctx.createRadialGradient(-s * 0.12, -s * 0.15, 0, 0, 0, Math.max(s * 0.55, 0.5));
      sg.addColorStop(0, hexToRgba(p.colorB || "#ffffff", 0.52));
      sg.addColorStop(0.48, hexToRgba(p.colorA, 0.32));
      sg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.52, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha *= 0.42;
      ctx.beginPath();
      ctx.arc(-s * 0.18, s * 0.03, s * 0.34, 0, Math.PI * 2);
      ctx.arc(s * 0.22, -s * 0.08, s * 0.28, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "comet": {
      const w = s * 1.9;
      const h = Math.max(2, s * 0.38);
      const cg = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
      cg.addColorStop(0, "transparent");
      cg.addColorStop(0.28, p.colorA);
      cg.addColorStop(0.62, "#fff8e8");
      cg.addColorStop(0.82, p.colorB || p.colorA);
      cg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.moveTo(-w * 0.5, -h * 0.08);
      ctx.bezierCurveTo(-w * 0.18, -h * 0.9, w * 0.38, -h * 0.58, w * 0.5, 0);
      ctx.bezierCurveTo(w * 0.28, h * 0.58, -w * 0.18, h * 0.72, -w * 0.5, h * 0.08);
      ctx.closePath();
      ctx.fillStyle = cg;
      ctx.fill();
      ctx.globalAlpha *= 0.58;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(w * 0.34, 0, Math.max(0.9, h * 0.32), 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "ember": {
      const eg = ctx.createLinearGradient(0, -s * 0.55, 0, s * 0.5);
      eg.addColorStop(0, "#fff8dc");
      eg.addColorStop(0.5, p.colorB || p.colorA);
      eg.addColorStop(1, p.colorA);
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.56);
      ctx.bezierCurveTo(s * 0.42, -s * 0.1, s * 0.2, s * 0.42, 0, s * 0.52);
      ctx.bezierCurveTo(-s * 0.24, s * 0.36, -s * 0.34, -s * 0.08, 0, -s * 0.56);
      ctx.closePath();
      ctx.fillStyle = eg;
      ctx.fill();
      break;
    }
    default:
      ctx.beginPath();
      ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      ctx.fillStyle = p.colorA;
      ctx.fill();
  }
}

// ---- per-preset burst builders -------------------------------------
// ctxOpts: { x, y, settings, isSpecial, keyType, effectLevel, speedScale,
//            scale (key-type particle multiplier) }

function fxRand(min, max) {
  return min + Math.random() * (max - min);
}

function fxCount(base, opts) {
  const n = Math.round(base * (0.45 + opts.settings.particleAmount * 1.15) * opts.scale * (opts.isSpecial ? 1.5 : 1));
  return clamp(n, 0, 22);
}

function fxGlow(opts, base) {
  return base * (0.4 + opts.settings.glowAmount * 1.3) * (0.7 + opts.effectLevel * 0.5);
}

function midpointDisplaceBolt(p0, p1, depth, roughness, out) {
  if (depth <= 0) {
    out.push(p1);
    return;
  }
  const dx = p1[0] - p0[0];
  const dy = p1[1] - p0[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const disp = (Math.random() * 2 - 1) * roughness * len;
  const mx = (p0[0] + p1[0]) / 2 + nx * disp;
  const my = (p0[1] + p1[1]) / 2 + ny * disp;
  const mid = [mx, my];
  midpointDisplaceBolt(p0, mid, depth - 1, roughness * 0.62, out);
  midpointDisplaceBolt(mid, p1, depth - 1, roughness * 0.62, out);
}

// Generates a jagged fractal lightning bolt as normalized points (roughly -1..1),
// scaled to pixels at render time by the particle's `size`. A proper recursive
// midpoint-displacement produces authentic angular zig-zag instead of a soft
// wandering scribble.
function generateBoltPoints(angle, length, depth, roughness) {
  const start = [0, 0];
  const end = [Math.cos(angle) * length, Math.sin(angle) * length];
  const out = [start];
  midpointDisplaceBolt(start, end, depth, roughness, out);
  return out;
}

function buildStarDustBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  // IMPACT: one crisp bright star, flashing tiny -> bright -> settle.
  addFxParticle({
    start: performance.now(),
    life: (isSpecial ? 640 : 520) * speedScale,
    x,
    y,
    vx: 0,
    vy: -6,
    size: fxRand(isSpecial ? 24 : 16, isSpecial ? 32 : 21),
    rotation: fxRand(-20, 20),
    rotSpeed: fxRand(-40, 40),
    shape: "star8",
    colorA: "#ffe9b8",
    colorB: "#b79bf0",
    glow: fxGlow(opts, 10),
    peakAlpha: 0.95,
    sizeKeyframes: [
      [0, 0.12],
      [0.16, 1.25],
      [0.3, 0.95],
      [1, 0.55]
    ]
  });
  // BURST: organic mixed-shape scatter, biased upward/diagonal.
  const count = clamp(fxCount(10, opts), 8, 16);
  const shapes = ["star4", "star8", "dot", "diamond"];
  for (let i = 0; i < count; i += 1) {
    const isTrail = i < Math.min(4, Math.round(count * 0.35));
    const biasAngle = fxRand(-160, -20) * (Math.PI / 180);
    const angle = Math.random() < 0.72 ? biasAngle + fxRand(-0.5, 0.5) : Math.random() * Math.PI * 2;
    const speed = fxRand(28, 90);
    const big = Math.random() < 0.12;
    addFxParticle({
      start: performance.now(),
      life: (isTrail ? fxRand(420, 700) : fxRand(260, 420)) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (isTrail ? 18 : 4),
      ax: 0,
      ay: isTrail ? -14 : 4,
      size: big ? fxRand(9, 13) : fxRand(2.4, 6),
      rotation: fxRand(0, 360),
      rotSpeed: fxRand(-90, 90),
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      colorA: Math.random() < 0.5 ? "#fff3d6" : "#e7d9ff",
      colorB: Math.random() < 0.5 ? "#ffcf7a" : "#9f86d8",
      glow: fxGlow(opts, big ? 6 : 3),
      peakAlpha: fxRand(0.7, 1)
    });
  }
}

function buildCyberPinkBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  addFxParticle({
    start: performance.now(),
    life: 160 * speedScale,
    x,
    y,
    vx: 0,
    vy: 0,
    size: fxRand(14, 20),
    rotation: 0,
    shape: "diamond",
    colorA: "#ffe9fb",
    peakAlpha: 0.85,
    glow: fxGlow(opts, 9),
    sizeKeyframes: [
      [0, 0.3],
      [0.3, 1.1],
      [1, 0]
    ],
    alphaKeyframes: [
      [0, 0.9],
      [0.35, 0.6],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(7, opts), 5, 12);
  for (let i = 0; i < count; i += 1) {
    const isSquare = Math.random() < 0.4;
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(60, 150);
    addFxParticle({
      start: performance.now(),
      life: fxRand(180, 320) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed * 0.5,
      ax: -Math.cos(angle) * speed * 0.9,
      ay: 8,
      size: isSquare ? fxRand(2.5, 4.5) : fxRand(9, 16),
      rotation: fxRand(0, 360),
      rotSpeed: fxRand(-260, 260),
      shape: isSquare ? "square" : "shard",
      colorA: Math.random() < 0.5 ? "#ff62c7" : "#6fe8ff",
      colorB: Math.random() < 0.5 ? "#ff9fe0" : "#b6f6ff",
      glow: fxGlow(opts, 5),
      peakAlpha: fxRand(0.75, 1),
      sizeKeyframes: [
        [0, 1],
        [0.7, 1],
        [1, 0]
      ]
    });
  }
  if (isSpecial) {
    addFxParticle({
      start: performance.now(),
      life: 140 * speedScale,
      x,
      y,
      vx: 0,
      vy: 0,
      size: fxRand(30, 46),
      rotation: fxRand(-6, 6),
      shape: "shard",
      colorA: "#eafcff",
      colorB: "#6fe8ff",
      glow: fxGlow(opts, 8),
      peakAlpha: 0.8,
      extra: { specular: true },
      sizeKeyframes: [
        [0, 0.4],
        [0.25, 1],
        [1, 1]
      ]
    });
  }
}

function buildElectricBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;

  // IMPACT: an instant hot-white flash, then a violet afterglow halo a beat
  // behind it, giving the strike a sense of depth instead of one flat dot.
  addFxParticle({
    start: performance.now(),
    life: 95 * speedScale,
    x,
    y,
    vx: 0,
    vy: 0,
    size: fxRand(20, 26) * (isSpecial ? 1.3 : 1),
    shape: "dot",
    colorA: "#ffffff",
    peakAlpha: 1,
    glow: fxGlow(opts, 16),
    sizeKeyframes: [
      [0, 0.1],
      [0.12, 1.4],
      [0.4, 0.55],
      [1, 0]
    ],
    alphaKeyframes: [
      [0, 1],
      [0.3, 0.82],
      [1, 0]
    ]
  });
  addFxParticle({
    start: performance.now(),
    life: 175 * speedScale,
    x,
    y,
    vx: 0,
    vy: 0,
    size: fxRand(32, 42),
    shape: "dot",
    colorA: "#c9b3ff",
    peakAlpha: 0.5,
    glow: fxGlow(opts, 10),
    sizeKeyframes: [
      [0, 0.28],
      [0.25, 1.08],
      [1, 0.22]
    ],
    alphaKeyframes: [
      [0, 0.7],
      [0.5, 0.3],
      [1, 0]
    ]
  });

  // MAIN BOLTS: proper fractal midpoint-displacement geometry (sharp,
  // angular zig-zag) instead of a soft cumulative random walk, rendered as
  // a layered glow -> saturated core -> hot-white pass for a premium look.
  const boltCount = clamp(1 + (isSpecial ? 1 : 0), 1, 2);
  for (let b = 0; b < boltCount; b += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const length = fxRand(0.85, 1.2);
    const points = generateBoltPoints(angle, length, 3, 0.6);
    addFxParticle({
      start: performance.now(),
      life: fxRand(115, 175) * speedScale,
      x,
      y,
      vx: 0,
      vy: 0,
      size: fxRand(27, 37),
      shape: "bolt",
      colorA: "#906fff",
      colorB: "#ffe45f",
      glow: fxGlow(opts, 11),
      peakAlpha: 1,
      extra: { points },
      sizeKeyframes: [
        [0, 0.5],
        [0.12, 1],
        [0.6, 0.94],
        [1, 0]
      ],
      // sharp rise, a real mid-life flicker dip, then a hard cut -- reads
      // as an electrical discharge rather than a smooth particle fade.
      alphaKeyframes: [
        [0, 1],
        [0.32, 0.8],
        [0.48, 1],
        [0.68, 0.42],
        [0.78, 0.9],
        [1, 0]
      ]
    });

    // one thinner branch fork off a mid-point of the main bolt
    if (Math.random() < 0.88) {
      const idx = 1 + Math.floor(Math.random() * Math.max(1, points.length - 2));
      const originPt = points[idx];
      const branchAngle = angle + (Math.random() < 0.5 ? 1 : -1) * fxRand(0.5, 1.15);
      const branchPts = generateBoltPoints(branchAngle, length * fxRand(0.35, 0.58), 2, 0.55).map(
        ([bx, by]) => [bx + originPt[0], by + originPt[1]]
      );
      addFxParticle({
        start: performance.now(),
        life: fxRand(85, 135) * speedScale,
        x,
        y,
        vx: 0,
        vy: 0,
        size: fxRand(19, 27),
        shape: "bolt",
        colorA: "#906fff",
        colorB: "#ffe45f",
        glow: fxGlow(opts, 7),
        peakAlpha: 0.82,
        extra: { points: branchPts, thin: true },
        sizeKeyframes: [
          [0, 0.6],
          [0.2, 1],
          [1, 0]
        ],
        alphaKeyframes: [
          [0, 0.9],
          [0.5, 0.36],
          [1, 0]
        ]
      });
    }
  }

  const sparks = clamp(fxCount(6, opts), 4, 10);
  for (let i = 0; i < sparks; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(60, 150);
    addFxParticle({
      start: performance.now(),
      life: fxRand(220, 380) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      ax: -Math.cos(angle) * speed * 1.5,
      ay: -Math.sin(angle) * speed * 1.5,
      size: fxRand(1.6, 4),
      shape: "dot",
      colorA: Math.random() < 0.5 ? "#ffe45f" : "#c9b3ff",
      glow: fxGlow(opts, 4),
      peakAlpha: fxRand(0.75, 1)
    });
  }
}

function buildCandyPopBurst(opts) {
  const { x, y, speedScale } = opts;
  addFxParticle({
    start: performance.now(),
    life: 320 * speedScale,
    x,
    y,
    vx: 0,
    vy: 0,
    size: fxRand(16, 22),
    shape: "bubble",
    colorA: "#f39ab8",
    colorB: "#ffcf70",
    glow: fxGlow(opts, 5),
    peakAlpha: 0.9,
    sizeKeyframes: [
      [0, 0.2],
      [0.22, 1.2],
      [0.4, 0.9],
      [1, 0.5]
    ]
  });
  const count = clamp(fxCount(8, opts), 6, 13);
  const palette = ["#f8b7ce", "#ffcf70", "#c9f0d8", "#c9e0ff", "#ffe0c2"];
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(40, 110);
    addFxParticle({
      start: performance.now(),
      life: fxRand(340, 560) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 10,
      ax: 0,
      ay: 90,
      size: fxRand(3.5, 8),
      rotation: fxRand(0, 360),
      rotSpeed: fxRand(-120, 120),
      shape: Math.random() < 0.3 ? "bubble" : "dot",
      colorA: palette[Math.floor(Math.random() * palette.length)],
      glow: fxGlow(opts, 3),
      peakAlpha: fxRand(0.75, 1),
      sizeKeyframes: [
        [0, 0.3],
        [0.35, 1.25],
        [0.55, 1],
        [1, 0.4]
      ]
    });
  }
}

function buildPixelBurst(opts) {
  const { x, y, speedScale } = opts;
  const count = clamp(fxCount(9, opts), 6, 12);
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [0.7, 0.7],
    [-0.7, 0.7],
    [0.7, -0.7],
    [-0.7, -0.7]
  ];
  for (let i = 0; i < count; i += 1) {
    const [dx, dy] = dirs[i % dirs.length];
    const speed = fxRand(90, 190);
    addFxParticle({
      start: performance.now(),
      life: fxRand(150, 240) * speedScale,
      x,
      y,
      vx: dx * speed,
      vy: dy * speed,
      size: fxRand(3, 6),
      rotation: 0,
      shape: "square",
      colorA: Math.random() < 0.5 ? "#5fb7ff" : "#ff84cf",
      glow: 0,
      peakAlpha: 1,
      extra: { trail: [dx * 2.2, dy * 2.2] },
      sizeKeyframes: [
        [0, 1],
        [0.78, 1],
        [1, 0]
      ],
      alphaKeyframes: [
        [0, 1],
        [0.78, 1],
        [1, 0]
      ]
    });
  }
}

function buildCrystalBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  addFxParticle({
    start: performance.now(),
    life: 220 * speedScale,
    x,
    y,
    vx: 0,
    vy: 0,
    size: fxRand(14, 18),
    shape: "diamond",
    colorA: "#ffffff",
    peakAlpha: 0.9,
    glow: fxGlow(opts, 8),
    sizeKeyframes: [
      [0, 0.2],
      [0.2, 1.2],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(7, opts), 5, 11);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(45, 110);
    addFxParticle({
      start: performance.now(),
      life: fxRand(260, 420) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      ax: -Math.cos(angle) * speed * 0.7,
      ay: -Math.sin(angle) * speed * 0.7,
      size: fxRand(6, 13),
      rotation: (angle * 180) / Math.PI,
      rotSpeed: fxRand(-40, 40),
      shape: "shard",
      colorA: "#95d9ff",
      colorB: "#f0d7ff",
      glow: fxGlow(opts, 4),
      peakAlpha: fxRand(0.75, 1),
      extra: { specular: true }
    });
  }
  if (isSpecial) {
    addFxParticle({
      start: performance.now(),
      life: 260 * speedScale,
      x,
      y,
      vx: 0,
      vy: 0,
      size: fxRand(50, 74),
      rotation: fxRand(0, 360),
      shape: "shard",
      colorA: "#ffffff",
      colorB: "#c8e8ff",
      glow: fxGlow(opts, 6),
      peakAlpha: 0.6,
      extra: { specular: true },
      sizeKeyframes: [
        [0, 0.4],
        [0.3, 1],
        [1, 1]
      ]
    });
  }
}

function buildConstellationBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const count = clamp(fxCount(8, opts), 6, 11);
  const points = [];
  const now = performance.now();

  // A single bright anchor star right at the impact point, larger and
  // sharper than the rest, so the little star map reads as centered on
  // the character rather than a diffuse scatter.
  addFxParticle({
    start: now,
    life: fxRand(620, 820) * speedScale,
    x,
    y,
    vx: 0,
    vy: -5,
    size: fxRand(isSpecial ? 8.5 : 6.5, isSpecial ? 11 : 8.5),
    shape: "star4",
    colorA: "#eef1ff",
    colorB: "#fff3ab",
    glow: fxGlow(opts, 8),
    peakAlpha: 1,
    sizeKeyframes: [
      [0, 0.15],
      [0.16, 1.2],
      [0.5, 0.85],
      [1, 0.4]
    ],
    // twinkle: bright entrance, settle, then a distinct delayed second
    // flicker partway through life before fading -- a real twinkle
    // rather than a single fade.
    alphaKeyframes: [
      [0, 0],
      [0.1, 1],
      [0.32, 0.55],
      [0.5, 0.95],
      [0.62, 0.5],
      [1, 0]
    ]
  });

  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const distance = fxRand(16, 56);
    const px = x + Math.cos(angle) * distance;
    const py = y + Math.sin(angle) * distance;
    const life = fxRand(560, 900) * speedScale;
    const twinkleAt = fxRand(0.45, 0.7);
    points.push({ x: px, y: py, life });
    addFxParticle({
      start: now,
      life,
      x: px,
      y: py,
      vx: 0,
      vy: -6,
      size: fxRand(3.5, 7),
      shape: "star4",
      colorA: "#dfe3ff",
      colorB: "#fff0a4",
      glow: fxGlow(opts, 6),
      peakAlpha: fxRand(0.75, 1),
      sizeKeyframes: [
        [0, 0.2],
        [0.18, 1.1],
        [1, 0.5]
      ],
      // each star has its own delayed twinkle beat so the whole map
      // shimmers in a staggered, alive way instead of fading in unison.
      alphaKeyframes: [
        [0, 0],
        [0.14, 1],
        [Math.max(0.16, twinkleAt - 0.16), 0.4],
        [twinkleAt, 0.9],
        [Math.min(0.94, twinkleAt + 0.18), 0.35],
        [1, 0]
      ]
    });
  }

  // more, brighter connecting lines so the constellation shape reads
  // clearly instead of a faint scatter.
  const links = Math.min(6, Math.max(3, count - 3));
  const usedPairs = new Set();
  for (let i = 0; i < links; i += 1) {
    const a = points[Math.floor(Math.random() * points.length)];
    const b = points[Math.floor(Math.random() * points.length)];
    if (!a || !b || a === b) continue;
    const pairKey = a.x + "," + a.y + "-" + b.x + "," + b.y;
    if (usedPairs.has(pairKey)) continue;
    usedPairs.add(pairKey);
    addFxParticle({
      start: now,
      life: Math.min(a.life, b.life) * 0.92,
      shape: "line",
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      size: 1.1,
      colorA: "rgba(226, 228, 255, 0.68)",
      glow: fxGlow(opts, 3),
      peakAlpha: 0.68,
      alphaKeyframes: [
        [0, 0],
        [0.22, 1],
        [0.78, 0.55],
        [1, 0]
      ]
    });
  }
}

function buildBubbleBurst(opts) {
  const { x, y, speedScale } = opts;
  addFxParticle({
    start: performance.now(),
    life: 300 * speedScale,
    x,
    y,
    vx: 0,
    vy: 0,
    size: fxRand(18, 26),
    shape: "ring",
    colorA: "#7ec7c1",
    peakAlpha: 0.6,
    sizeKeyframes: [
      [0, 0.2],
      [1, 1.6]
    ],
    alphaKeyframes: [
      [0, 0.7],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(6, opts), 4, 10);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(-Math.PI, 0);
    const speed = fxRand(20, 55);
    addFxParticle({
      start: performance.now(),
      life: fxRand(420, 680) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed * 0.6,
      vy: -Math.abs(Math.sin(angle) * speed) - 16,
      ax: 0,
      ay: -6,
      size: fxRand(6, 14),
      shape: "bubble",
      colorA: Math.random() < 0.5 ? "#7ec7c1" : "#f8b7ce",
      glow: fxGlow(opts, 2),
      peakAlpha: fxRand(0.6, 0.9)
    });
  }
}

function buildInkBurst(opts) {
  const { x, y, speedScale } = opts;
  addFxParticle({
    start: performance.now(),
    life: 480 * speedScale,
    x,
    y,
    vx: 0,
    vy: 4,
    size: fxRand(10, 15),
    shape: "dot",
    colorA: "#7e6650",
    peakAlpha: 0.5,
    sizeKeyframes: [
      [0, 0.3],
      [0.3, 1.3],
      [1, 1.7]
    ],
    alphaKeyframes: [
      [0, 0.5],
      [0.4, 0.35],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(4, opts), 2, 7);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(15, 40);
    addFxParticle({
      start: performance.now(),
      life: fxRand(300, 480) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + 6,
      size: fxRand(1.6, 3.4),
      shape: "dot",
      colorA: "#7e6650",
      peakAlpha: fxRand(0.4, 0.7)
    });
  }
}

function buildPaperFiberBurst(opts) {
  const { x, y, speedScale } = opts;
  const count = clamp(fxCount(5, opts), 3, 8);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(20, 55);
    addFxParticle({
      start: performance.now(),
      life: fxRand(340, 540) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 8,
      ax: 0,
      ay: 20,
      size: fxRand(5, 11),
      rotation: fxRand(0, 360),
      rotSpeed: fxRand(-70, 70),
      shape: "fiber",
      colorA: "#a98b68",
      peakAlpha: fxRand(0.4, 0.7)
    });
  }
}

function buildMoonPearlBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  addFxParticle({
    start: performance.now(),
    life: 420 * speedScale,
    x,
    y,
    vx: 0,
    vy: -4,
    size: fxRand(isSpecial ? 20 : 14, isSpecial ? 26 : 18),
    shape: "pearl",
    colorA: "#b8bddf",
    colorB: "#fff7ce",
    glow: fxGlow(opts, 6),
    peakAlpha: 0.85,
    sizeKeyframes: [
      [0, 0.25],
      [0.25, 1.2],
      [1, 0.6]
    ]
  });
  const count = clamp(fxCount(6, opts), 4, 9);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(20, 55);
    addFxParticle({
      start: performance.now(),
      life: fxRand(400, 640) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 12,
      ax: 0,
      ay: -8,
      size: fxRand(3, 7),
      shape: "pearl",
      colorA: "#dfe3f7",
      colorB: "#fff7ce",
      glow: fxGlow(opts, 3),
      peakAlpha: fxRand(0.6, 0.9)
    });
  }
}

function buildAuroraVeilBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  addFxParticle({
    start: now,
    life: fxRand(420, 560) * speedScale,
    x,
    y,
    vx: 0,
    vy: -3,
    size: fxRand(isSpecial ? 30 : 24, isSpecial ? 42 : 34),
    rotation: fxRand(-10, 10),
    rotSpeed: fxRand(-18, 18),
    shape: "ribbon",
    colorA: "#6edeea",
    colorB: "#c7a8ff",
    glow: fxGlow(opts, 7),
    peakAlpha: 0.88,
    sizeKeyframes: [
      [0, 0.18],
      [0.22, 1.08],
      [0.72, 0.92],
      [1, 0.36]
    ],
    alphaKeyframes: [
      [0, 0],
      [0.12, 1],
      [0.72, 0.58],
      [1, 0]
    ]
  });
  const ribbonCount = clamp(fxCount(5, opts), 4, 8);
  for (let i = 0; i < ribbonCount; i += 1) {
    const angle = fxRand(-0.72, 0.72) + (i % 2 ? 0 : Math.PI);
    const speed = fxRand(18, 48);
    addFxParticle({
      start: now + i * 12,
      life: fxRand(380, 620) * speedScale,
      x: x + fxRand(-6, 6),
      y: y + fxRand(-5, 5),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      ax: -Math.cos(angle) * speed * 0.38,
      ay: -4,
      size: fxRand(18, 34),
      rotation: (angle * 180) / Math.PI + fxRand(-16, 16),
      rotSpeed: fxRand(-24, 24),
      shape: "ribbon",
      colorA: Math.random() < 0.5 ? "#6edeea" : "#b4f0d8",
      colorB: Math.random() < 0.5 ? "#c7a8ff" : "#f7d7ff",
      glow: fxGlow(opts, 4.5),
      peakAlpha: fxRand(0.56, 0.82)
    });
  }
  const moteCount = clamp(fxCount(5, opts), 4, 9);
  for (let i = 0; i < moteCount; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(20, 62);
    addFxParticle({
      start: now + i * 9,
      life: fxRand(420, 680) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 12,
      ax: -Math.cos(angle) * speed * 0.3,
      ay: -8,
      size: fxRand(2.5, 5.8),
      shape: Math.random() < 0.62 ? "pearl" : "star4",
      colorA: "#d7fff6",
      colorB: Math.random() < 0.5 ? "#6edeea" : "#c7a8ff",
      glow: fxGlow(opts, 3.5),
      peakAlpha: fxRand(0.62, 0.9)
    });
  }
}

function buildFireflyGlowBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  addFxParticle({
    start: now,
    life: fxRand(420, 620) * speedScale,
    x,
    y,
    vx: 1.5,
    vy: -5,
    size: fxRand(isSpecial ? 34 : 26, isSpecial ? 48 : 36),
    rotation: fxRand(-14, 14),
    rotSpeed: fxRand(68, 128),
    shape: "orbit",
    colorA: "#55e6b5",
    colorB: "#8ea1ff",
    glow: fxGlow(opts, 9),
    peakAlpha: 0.86,
    sizeKeyframes: [
      [0, 0.18],
      [0.18, 1.05],
      [0.58, 0.92],
      [1, 0.36]
    ],
    alphaKeyframes: [
      [0, 0],
      [0.12, 1],
      [0.46, 0.62],
      [0.72, 0.28],
      [1, 0]
    ],
    extra: { start: -Math.PI * 0.2, end: Math.PI * 1.32, satellite: true }
  });
  const count = clamp(fxCount(10, opts), 7, 16);
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + fxRand(-0.32, 0.32);
    const tangent = angle + Math.PI / 2;
    const speed = fxRand(24, 68);
    const radius = fxRand(6, isSpecial ? 18 : 14);
    const isRing = i % 5 === 0;
    addFxParticle({
      start: now + i * 10,
      life: fxRand(360, 720) * speedScale,
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius * 0.42,
      vx: Math.cos(tangent) * speed * 0.54 + Math.cos(angle) * speed * 0.16,
      vy: Math.sin(tangent) * speed * 0.32 + Math.sin(angle) * speed * 0.08 - 6,
      ax: -Math.cos(angle) * speed * 0.14,
      ay: -3,
      size: isRing ? fxRand(8, isSpecial ? 17 : 13) : fxRand(2.4, isSpecial ? 6.8 : 5.4),
      rotation: (angle * 180) / Math.PI + fxRand(-24, 24),
      rotSpeed: fxRand(44, 120),
      shape: isRing ? "orbit" : Math.random() < 0.62 ? "dot" : "pearl",
      colorA: Math.random() < 0.58 ? "#55e6b5" : "#ecfff7",
      colorB: Math.random() < 0.5 ? "#8ea1ff" : "#b5c1ff",
      glow: fxGlow(opts, isRing ? 4.8 : 5.5),
      peakAlpha: fxRand(0.58, 0.92),
      alphaKeyframes: [
        [0, 0],
        [0.14, 1],
        [0.42, 0.46],
        [0.64, 0.9],
        [0.82, 0.28],
        [1, 0]
      ],
      extra: { start: -Math.PI * 0.35, end: Math.PI * 1.08, satellite: isRing && Math.random() < 0.65 }
    });
  }
}

function buildPetalBloomBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  addFxParticle({
    start: now,
    life: 300 * speedScale,
    x,
    y,
    vx: -3,
    vy: 2,
    size: fxRand(isSpecial ? 26 : 19, isSpecial ? 36 : 27),
    rotation: fxRand(-34, -14),
    rotSpeed: fxRand(-64, -28),
    shape: "fold",
    colorA: "#8aa7ff",
    colorB: "#ffc36f",
    glow: fxGlow(opts, 5.8),
    peakAlpha: 0.76,
    sizeKeyframes: [
      [0, 0.28],
      [0.2, 1.08],
      [0.58, 0.86],
      [1, 0.24]
    ],
    alphaKeyframes: [
      [0, 0.82],
      [0.38, 0.62],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(9, opts), 6, 14);
  for (let i = 0; i < count; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const angle = fxRand(-Math.PI * 0.9, Math.PI * 0.15) + side * 0.18;
    const speed = fxRand(24, 78);
    const isFacet = Math.random() < 0.74;
    addFxParticle({
      start: now + i * 9,
      life: fxRand(300, 620) * speedScale,
      x: x + side * fxRand(1, 6),
      y: y + fxRand(-2, 5),
      vx: Math.cos(angle) * speed * 0.62 + side * fxRand(3, 14),
      vy: Math.sin(angle) * speed * 0.36 - fxRand(6, 20),
      ax: side * fxRand(-7, 10),
      ay: 18,
      size: fxRand(5, isSpecial ? 13 : 10),
      rotation: (angle * 180) / Math.PI + fxRand(-46, 46),
      rotSpeed: side * fxRand(70, 170),
      shape: isFacet ? "fold" : Math.random() < 0.5 ? "diamond" : "shard",
      colorA: Math.random() < 0.58 ? "#8aa7ff" : "#eef2ff",
      colorB: Math.random() < 0.5 ? "#ffc36f" : "#b8c7ff",
      glow: fxGlow(opts, isFacet ? 2.4 : 3.4),
      peakAlpha: fxRand(0.58, 0.88),
      sizeKeyframes: [
        [0, 0.34],
        [0.24, 1],
        [0.66, 0.72],
        [1, 0.16]
      ],
      alphaKeyframes: [
        [0, 0],
        [0.18, 0.95],
        [0.68, 0.38],
        [1, 0]
      ]
    });
  }
}

function buildNeonRainBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  const glyphWidth = Math.max(8, opts.glyphWidth || 12);
  const glyphHeight = Math.max(18, opts.glyphHeight || 24);
  addFxParticle({
    start: now,
    life: 115 * speedScale,
    x: x + fxRand(-glyphWidth * 0.12, glyphWidth * 0.12),
    y,
    vx: 0,
    vy: 0,
    size: fxRand(glyphHeight * (isSpecial ? 1.15 : 0.95), glyphHeight * (isSpecial ? 1.45 : 1.22)),
    rotation: 0,
    shape: "streak",
    colorA: "#54e5ff",
    colorB: "#ff72d2",
    glow: fxGlow(opts, 12),
    peakAlpha: 0.92,
    sizeKeyframes: [
      [0, 0.18],
      [0.24, 1],
      [1, 0.22]
    ],
    alphaKeyframes: [
      [0, 1],
      [0.55, 0.66],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(8, opts), 5, 11);
  for (let i = 0; i < count; i += 1) {
    const lane = count <= 1 ? 0 : (i / (count - 1) - 0.5);
    const laneJitter = fxRand(-0.16, 0.16);
    const speed = fxRand(64, 124);
    const xLane = x + (lane + laneJitter) * glyphWidth * 0.86;
    addFxParticle({
      start: now + i * 6,
      life: fxRand(130, 260) * speedScale,
      x: xLane,
      y: y - glyphHeight * fxRand(0.36, 0.62),
      vx: fxRand(-2, 2),
      vy: speed,
      ax: 0,
      ay: -speed * 0.36,
      size: fxRand(glyphHeight * 0.42, glyphHeight * 0.86),
      rotation: fxRand(-3, 3),
      shape: Math.random() < 0.72 ? "streak" : "square",
      colorA: Math.random() < 0.5 ? "#54e5ff" : "#ff72d2",
      colorB: Math.random() < 0.5 ? "#ffffff" : "#9ef5ff",
      glow: fxGlow(opts, 5.5),
      peakAlpha: fxRand(0.68, 1),
      sizeKeyframes: [
        [0, 0.72],
        [0.62, 1],
        [1, 0]
      ],
      alphaKeyframes: [
        [0, 0],
        [0.12, 1],
        [0.72, 0.82],
        [1, 0]
      ],
      extra: { trail: [0, -3] }
    });
  }
}

function buildVelvetSmokeBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  addFxParticle({
    start: now,
    life: fxRand(560, 760) * speedScale,
    x,
    y,
    vx: 0,
    vy: -8,
    ax: 0,
    ay: -4,
    size: fxRand(isSpecial ? 28 : 20, isSpecial ? 40 : 30),
    rotation: fxRand(-8, 8),
    rotSpeed: fxRand(-16, 16),
    shape: "smoke",
    colorA: "#8d8092",
    colorB: "#efe6f0",
    glow: fxGlow(opts, 2),
    peakAlpha: 0.64,
    sizeKeyframes: [
      [0, 0.22],
      [0.36, 1],
      [1, 1.82]
    ],
    alphaKeyframes: [
      [0, 0],
      [0.18, 0.8],
      [0.62, 0.42],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(7, opts), 5, 11);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(-Math.PI, 0);
    const speed = fxRand(10, 34);
    addFxParticle({
      start: now + i * 20,
      life: fxRand(620, 980) * speedScale,
      x: x + fxRand(-4, 4),
      y: y + fxRand(-2, 7),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 7,
      ax: fxRand(-4, 4),
      ay: -3,
      size: fxRand(8, isSpecial ? 20 : 16),
      rotation: fxRand(0, 360),
      rotSpeed: fxRand(-18, 18),
      shape: "smoke",
      colorA: "#8d8092",
      colorB: Math.random() < 0.5 ? "#d7c7da" : "#f2e9ef",
      glow: 0,
      peakAlpha: fxRand(0.32, 0.58),
      sizeKeyframes: [
        [0, 0.42],
        [0.5, 1.18],
        [1, 1.9]
      ],
      alphaKeyframes: [
        [0, 0],
        [0.2, 0.72],
        [0.72, 0.26],
        [1, 0]
      ]
    });
  }
}

function buildEmberGlowBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  addFxParticle({
    start: now,
    life: fxRand(170, 260) * speedScale,
    x,
    y,
    vx: 9,
    vy: -8,
    size: fxRand(isSpecial ? 30 : 22, isSpecial ? 42 : 31),
    rotation: fxRand(-38, -24),
    rotSpeed: fxRand(-14, 18),
    shape: "comet",
    colorA: "#ff9b5c",
    colorB: "#7de7ff",
    glow: fxGlow(opts, 12),
    peakAlpha: 0.94,
    sizeKeyframes: [
      [0, 0.2],
      [0.16, 1.12],
      [0.46, 0.68],
      [1, 0.18]
    ],
    alphaKeyframes: [
      [0, 1],
      [0.32, 0.72],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(9, opts), 6, 14);
  const direction = -Math.PI * 0.22;
  for (let i = 0; i < count; i += 1) {
    const tail = i / Math.max(1, count - 1);
    const angle = direction + fxRand(-0.32, 0.24);
    const speed = fxRand(38, 112);
    const isComet = Math.random() < 0.34;
    addFxParticle({
      start: now + i * 7,
      life: fxRand(190, 460) * speedScale,
      x: x - Math.cos(direction) * tail * fxRand(5, 18) + fxRand(-2, 2),
      y: y - Math.sin(direction) * tail * fxRand(4, 14) + fxRand(-2, 3),
      vx: Math.cos(angle) * speed * (isComet ? 0.7 : 0.48),
      vy: Math.sin(angle) * speed * (isComet ? 0.68 : 0.45) - 4,
      ax: -Math.cos(direction) * speed * 0.18,
      ay: 18,
      size: isComet ? fxRand(9, isSpecial ? 19 : 14) : fxRand(2.4, isSpecial ? 7 : 5.8),
      rotation: (direction * 180) / Math.PI + fxRand(-12, 16),
      rotSpeed: fxRand(-44, 44),
      shape: isComet ? "comet" : Math.random() < 0.55 ? "shard" : "dot",
      colorA: Math.random() < 0.58 ? "#ff9b5c" : "#ffd1a0",
      colorB: Math.random() < 0.42 ? "#7de7ff" : "#fff5db",
      glow: fxGlow(opts, isComet ? 5.4 : 4.2),
      peakAlpha: fxRand(0.62, 0.96),
      sizeKeyframes: [
        [0, 0.36],
        [0.2, 1],
        [0.68, 0.48],
        [1, 0.12]
      ],
      alphaKeyframes: [
        [0, 0],
        [0.12, 1],
        [0.58, 0.55],
        [1, 0]
      ]
    });
  }
}

function buildLaserEtchBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  const glyphWidth = Math.max(8, opts.glyphWidth || 12);
  const glyphHeight = Math.max(18, opts.glyphHeight || 24);
  const sizeBase = Math.max(glyphWidth, glyphHeight);
  const rotation = fxRand(-16, -9);
  addFxParticle({
    start: now,
    life: 120 * speedScale,
    x,
    y: y - glyphHeight * 0.02,
    vx: 0,
    vy: 0,
    size: sizeBase * (isSpecial ? 1.55 : 1.25),
    rotation,
    shape: "laser",
    colorA: "#ff5a57",
    colorB: "#ffe46b",
    glow: fxGlow(opts, 13),
    peakAlpha: 0.96,
    sizeKeyframes: [
      [0, 0.12],
      [0.18, 1],
      [1, 0.22]
    ],
    alphaKeyframes: [
      [0, 1],
      [0.46, 0.74],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(7, opts), 5, 11);
  for (let i = 0; i < count; i += 1) {
    const along = count <= 1 ? 0 : i / (count - 1) - 0.5;
    const side = i % 2 === 0 ? -1 : 1;
    const chipAngle = (-Math.PI * 0.1) + side * fxRand(0.56, 1.05);
    const speed = fxRand(24, 74);
    addFxParticle({
      start: now + i * 5,
      life: fxRand(140, 300) * speedScale,
      x: x + along * glyphWidth * 1.18 + fxRand(-1.5, 1.5),
      y: y - along * glyphHeight * 0.34 + fxRand(-1, 1),
      vx: Math.cos(chipAngle) * speed * 0.52,
      vy: Math.sin(chipAngle) * speed * 0.38,
      ax: -Math.cos(chipAngle) * speed * 0.3,
      ay: 18,
      size: fxRand(2.4, isSpecial ? 7 : 5.4),
      rotation: rotation + side * fxRand(28, 74),
      rotSpeed: side * fxRand(90, 180),
      shape: Math.random() < 0.64 ? "shard" : "dot",
      colorA: Math.random() < 0.58 ? "#ff5a57" : "#fff0a4",
      colorB: "#ffe46b",
      glow: fxGlow(opts, 4.8),
      peakAlpha: fxRand(0.66, 0.94),
      sizeKeyframes: [
        [0, 0.45],
        [0.22, 1],
        [1, 0.12]
      ]
    });
  }
}

function buildKeycapPopBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  const glyphWidth = Math.max(8, opts.glyphWidth || 12);
  const glyphHeight = Math.max(18, opts.glyphHeight || 24);
  addFxParticle({
    start: now,
    life: 260 * speedScale,
    x,
    y: y + glyphHeight * 0.06,
    vx: 0,
    vy: 0,
    size: Math.max(glyphWidth * 1.55, glyphHeight * (isSpecial ? 1.12 : 0.92)),
    rotation: fxRand(-3, 3),
    shape: "keycap",
    colorA: "#f7fffa",
    colorB: "#7fb3a6",
    glow: fxGlow(opts, 4.2),
    peakAlpha: 0.7,
    sizeKeyframes: [
      [0, 0.62],
      [0.18, 1.08],
      [0.42, 0.9],
      [1, 0.36]
    ],
    alphaKeyframes: [
      [0, 0.8],
      [0.36, 0.58],
      [1, 0]
    ]
  });
  const count = clamp(fxCount(6, opts), 4, 9);
  for (let i = 0; i < count; i += 1) {
    const cornerX = i % 2 === 0 ? -1 : 1;
    const cornerY = i % 3 === 0 ? -1 : 1;
    const speed = fxRand(18, 48);
    addFxParticle({
      start: now + i * 12,
      life: fxRand(190, 380) * speedScale,
      x: x + cornerX * glyphWidth * fxRand(0.18, 0.52),
      y: y + cornerY * glyphHeight * fxRand(0.08, 0.32),
      vx: cornerX * speed * 0.52,
      vy: cornerY * speed * 0.28 - 6,
      ax: -cornerX * speed * 0.36,
      ay: 22,
      size: fxRand(3.4, isSpecial ? 8 : 6),
      rotation: fxRand(-12, 12),
      rotSpeed: cornerX * fxRand(40, 120),
      shape: Math.random() < 0.58 ? "keycap" : "tile",
      colorA: Math.random() < 0.5 ? "#7fb3a6" : "#ffb86f",
      colorB: "#fff7e4",
      glow: fxGlow(opts, 2.6),
      peakAlpha: fxRand(0.5, 0.82)
    });
  }
}

function buildMagneticFlipBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  const glyphWidth = Math.max(8, opts.glyphWidth || 12);
  const glyphHeight = Math.max(18, opts.glyphHeight || 24);
  [-1, 1].forEach((side) => {
    addFxParticle({
      start: now,
      life: fxRand(210, 340) * speedScale,
      x: x + side * glyphWidth * 0.56,
      y: y - glyphHeight * 0.02,
      vx: -side * fxRand(8, 18),
      vy: 0,
      size: fxRand(isSpecial ? 9 : 6, isSpecial ? 14 : 10),
      shape: "dot",
      colorA: side < 0 ? "#e85d75" : "#3dd6c6",
      colorB: "#ffffff",
      glow: fxGlow(opts, 7),
      peakAlpha: 0.9,
      sizeKeyframes: [
        [0, 0.3],
        [0.24, 1.15],
        [1, 0.36]
      ]
    });
  });
  const count = clamp(fxCount(8, opts), 6, 12);
  for (let i = 0; i < count; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const arc = fxRand(-0.42, 0.42);
    const speed = fxRand(26, 70);
    addFxParticle({
      start: now + i * 8,
      life: fxRand(180, 380) * speedScale,
      x: x + side * glyphWidth * fxRand(0.1, 0.48),
      y: y + fxRand(-glyphHeight * 0.22, glyphHeight * 0.22),
      vx: -side * speed * 0.5,
      vy: Math.sin(arc) * speed * 0.28,
      ax: side * speed * 0.28,
      ay: 0,
      size: fxRand(7, isSpecial ? 17 : 13),
      rotation: side < 0 ? 0 : 180,
      rotSpeed: side * fxRand(120, 240),
      shape: Math.random() < 0.72 ? "needle" : "orbit",
      colorA: "#e85d75",
      colorB: "#3dd6c6",
      glow: fxGlow(opts, 4.8),
      peakAlpha: fxRand(0.58, 0.9),
      alphaKeyframes: [
        [0, 0],
        [0.16, 1],
        [0.62, 0.5],
        [1, 0]
      ],
      extra: { start: -Math.PI * 0.2, end: Math.PI * 1.18 }
    });
  }
}

function buildMosaicShiftBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  const glyphWidth = Math.max(8, opts.glyphWidth || 12);
  const glyphHeight = Math.max(18, opts.glyphHeight || 24);
  const count = clamp(fxCount(10, opts), 7, 14);
  for (let i = 0; i < count; i += 1) {
    const col = (i % 3) - 1;
    const row = Math.floor(i / 3) % 3 - 1;
    const popX = col * glyphWidth * fxRand(0.2, 0.44);
    const popY = row * glyphHeight * fxRand(0.12, 0.28);
    addFxParticle({
      start: now + i * 5,
      life: fxRand(180, 390) * speedScale,
      x: x + popX * 0.22,
      y: y + popY * 0.18,
      vx: popX * fxRand(1.4, 2.8),
      vy: popY * fxRand(1.2, 2.2),
      ax: -popX * fxRand(2.6, 4),
      ay: -popY * fxRand(2.2, 3.6),
      size: fxRand(4, isSpecial ? 9 : 7),
      rotation: fxRand(-10, 10),
      rotSpeed: fxRand(-90, 90),
      shape: Math.random() < 0.76 ? "tile" : "square",
      colorA: Math.random() < 0.5 ? "#4fa3ff" : "#ffca5f",
      colorB: Math.random() < 0.5 ? "#85e0a3" : "#ff8fab",
      glow: fxGlow(opts, 3.4),
      peakAlpha: fxRand(0.62, 0.92),
      sizeKeyframes: [
        [0, 0.8],
        [0.4, 1],
        [1, 0.28]
      ],
      alphaKeyframes: [
        [0, 0],
        [0.12, 1],
        [0.7, 0.64],
        [1, 0]
      ]
    });
  }
}

function buildRippleLensBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  const glyphWidth = Math.max(8, opts.glyphWidth || 12);
  const glyphHeight = Math.max(18, opts.glyphHeight || 24);
  const base = Math.max(glyphWidth * 1.5, glyphHeight * 0.9);
  for (let i = 0; i < (isSpecial ? 3 : 2); i += 1) {
    addFxParticle({
      start: now + i * 70,
      life: fxRand(360, 620) * speedScale,
      x,
      y,
      vx: 0,
      vy: -2,
      size: base + i * 8,
      rotation: fxRand(-6, 6),
      shape: "lens",
      colorA: "#75d0da",
      colorB: "#f4d3ff",
      glow: fxGlow(opts, 3.6),
      peakAlpha: 0.62 - i * 0.1,
      sizeKeyframes: [
        [0, 0.32],
        [0.34, 1.08],
        [1, 1.34]
      ],
      alphaKeyframes: [
        [0, 0],
        [0.18, 1],
        [0.62, 0.38],
        [1, 0]
      ]
    });
  }
  const count = clamp(fxCount(5, opts), 3, 8);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const radius = fxRand(2, Math.max(glyphWidth, glyphHeight) * 0.46);
    addFxParticle({
      start: now + i * 18,
      life: fxRand(300, 520) * speedScale,
      x: x + Math.cos(angle) * radius,
      y: y + Math.sin(angle) * radius * 0.58,
      vx: Math.cos(angle) * fxRand(4, 18),
      vy: Math.sin(angle) * fxRand(2, 12) - 5,
      ax: -Math.cos(angle) * fxRand(6, 14),
      ay: -2,
      size: fxRand(3, isSpecial ? 8 : 6),
      shape: Math.random() < 0.55 ? "lens" : "pearl",
      colorA: "#eaffff",
      colorB: Math.random() < 0.5 ? "#75d0da" : "#f4d3ff",
      glow: fxGlow(opts, 2.8),
      peakAlpha: fxRand(0.42, 0.72)
    });
  }
}

function buildPlasmaThreadBurst(opts) {
  const { x, y, isSpecial, speedScale } = opts;
  const now = performance.now();
  const glyphWidth = Math.max(8, opts.glyphWidth || 12);
  const glyphHeight = Math.max(18, opts.glyphHeight || 24);
  const count = clamp(fxCount(8, opts), 6, 12);
  for (let i = 0; i < count; i += 1) {
    const lane = i / Math.max(1, count - 1) - 0.5;
    const side = i % 2 === 0 ? -1 : 1;
    const rotation = fxRand(-18, 18) + side * 4;
    const speed = fxRand(18, 58);
    addFxParticle({
      start: now + i * 8,
      life: fxRand(230, 470) * speedScale,
      x: x + lane * glyphWidth * 0.78,
      y: y + fxRand(-glyphHeight * 0.22, glyphHeight * 0.22),
      vx: side * speed * 0.38,
      vy: fxRand(-16, 10),
      ax: -side * speed * 0.36,
      ay: 3,
      size: fxRand(isSpecial ? 14 : 10, isSpecial ? 26 : 18),
      rotation,
      rotSpeed: side * fxRand(60, 160),
      shape: Math.random() < 0.78 ? "plasma" : "fiber",
      colorA: Math.random() < 0.55 ? "#39d3ff" : "#b7f7ff",
      colorB: Math.random() < 0.5 ? "#ff7f9f" : "#fff0a8",
      glow: fxGlow(opts, 6.2),
      peakAlpha: fxRand(0.62, 0.94),
      alphaKeyframes: [
        [0, 0],
        [0.12, 1],
        [0.52, 0.64],
        [1, 0]
      ]
    });
  }
}

function buildSoftSparkBurst(opts) {
  const { x, y, speedScale } = opts;
  addFxParticle({
    start: performance.now(),
    life: 340 * speedScale,
    x,
    y,
    vx: 0,
    vy: -4,
    size: fxRand(12, 17),
    shape: "star8",
    colorA: "#ffe6c8",
    colorB: "#d98f71",
    glow: fxGlow(opts, 5),
    peakAlpha: 0.85,
    sizeKeyframes: [
      [0, 0.2],
      [0.22, 1.15],
      [1, 0.5]
    ]
  });
  const count = clamp(fxCount(6, opts), 4, 9);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(20, 55);
    addFxParticle({
      start: performance.now(),
      life: fxRand(280, 460) * speedScale,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 10,
      ax: 0,
      ay: -4,
      size: fxRand(2.4, 5.5),
      shape: "dot",
      colorA: "#ffd8ad",
      glow: fxGlow(opts, 2.5),
      peakAlpha: fxRand(0.6, 0.9)
    });
  }
}

const BURST_BUILDERS = {
  "soft-spark": buildSoftSparkBurst,
  "cyber-pink": buildCyberPinkBurst,
  "candy-pop": buildCandyPopBurst,
  electric: buildElectricBurst,
  "star-dust": buildStarDustBurst,
  ink: buildInkBurst,
  bubble: buildBubbleBurst,
  pixel: buildPixelBurst,
  "crystal-glass": buildCrystalBurst,
  constellation: buildConstellationBurst,
  "paper-fiber": buildPaperFiberBurst,
  "moon-pearl": buildMoonPearlBurst,
  "aurora-veil": buildAuroraVeilBurst,
  "firefly-glow": buildFireflyGlowBurst,
  "petal-bloom": buildPetalBloomBurst,
  "neon-rain": buildNeonRainBurst,
  "velvet-smoke": buildVelvetSmokeBurst,
  "ember-glow": buildEmberGlowBurst,
  "laser-etch": buildLaserEtchBurst,
  "keycap-pop": buildKeycapPopBurst,
  "magnetic-flip": buildMagneticFlipBurst,
  "mosaic-shift": buildMosaicShiftBurst,
  "ripple-lens": buildRippleLensBurst,
  "plasma-thread": buildPlasmaThreadBurst
};

function spawnEffectBurst(mode, opts) {
  if (!fx.ctx) return;
  const builder = BURST_BUILDERS[mode] || buildSoftSparkBurst;
  builder(opts);
  ensureFxLoop();
}

// ---- typing rhythm + streak reward
// Tracks the rolling gap between recent keystrokes so motion/glow/particles
// can respond a little to how fast someone is typing, without any visible
// speed readout. Smoothed rather than snapping, and decays quickly back to
// neutral after a pause.
function registerKeystrokeInterval(now) {
  if (lastTactileAt) {
    const interval = now - lastTactileAt;
    if (interval > 0 && interval < 900) {
      recentKeyIntervals.push(interval);
      if (recentKeyIntervals.length > 6) recentKeyIntervals.shift();
    } else {
      recentKeyIntervals = [];
    }
  }
  if (recentKeyIntervals.length >= 2) {
    const avg = recentKeyIntervals.reduce((sum, value) => sum + value, 0) / recentKeyIntervals.length;
    const target = clamp01((260 - avg) / (260 - 90));
    typingSpeedFactor = typingSpeedFactor * 0.65 + target * 0.35;
  } else {
    typingSpeedFactor *= 0.85;
  }
}

// A quiet visual reward for a sustained fast streak: a small extra sparkle
// burst at the caret, tinted to the active FX. No numbers, no combo UI.
function maybeSpawnStreakReward(now, keyType) {
  const settings = state.settings;
  if (keyType === "backspace") return;
  if (settings.reduceMotion || !settings.effectEnabled || settings.particleAmount <= 0.01) return;
  if (typingStreak < STREAK_REWARD_STEP || typingStreak % STREAK_REWARD_STEP !== 0) return;
  if (now - lastStreakRewardAt < 3200) return;
  lastStreakRewardAt = now;
  requestAnimationFrame(spawnStreakRewardBurst);
}

function spawnStreakRewardBurst() {
  if (!fx.ctx) return;
  const rect = caretRect();
  if (!rect) return;
  const settings = state.settings;
  const effect = EFFECT_PRESETS[settings.effectMode] || EFFECT_PRESETS[defaultSettings.effectMode];
  const x = rect.left;
  const y = rect.top + rect.height * 0.4;
  const count = clamp(Math.round(5 * (0.5 + settings.particleAmount)), 3, 9);
  for (let i = 0; i < count; i += 1) {
    const angle = fxRand(0, Math.PI * 2);
    const speed = fxRand(14, 46);
    addFxParticle({
      start: performance.now() + i * 16,
      life: fxRand(420, 720),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 14,
      ax: 0,
      ay: -6,
      size: fxRand(3, 7),
      shape: Math.random() < 0.5 ? "star8" : "dot",
      colorA: effect.secondary,
      colorB: effect.primary,
      glow: fxGlow({ settings, effectLevel: 1 }, 4),
      peakAlpha: fxRand(0.55, 0.85)
    });
  }
  ensureFxLoop();
}

function updateTypingStreak(now, keyType) {
  // Lightweight combo tracking for the reward system: fast consecutive
  // keystrokes build a streak, which nudges special-moment bursts to show
  // up a little more often. No visible counter, no score UI.
  if (keyType === "backspace") {
    typingStreak = Math.max(0, typingStreak - 3);
  } else if (now - lastStreakAt < 550) {
    typingStreak += 1;
  } else {
    typingStreak = 1;
  }
  lastStreakAt = now;
  maybeSpawnStreakReward(now, keyType);
}


// ---- sound engine (synthesized key sounds)
const soundEngine = {
  ctx: null,
  master: null,
  buffers: new Map(),
  activeVoices: 0,

  unlock() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass({ latencyHint: "interactive" });
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);
      this.ensurePack(state.settings.soundPack);
      window.setTimeout(() => this.warmRemainingPacks(), 50);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  },

  warmRemainingPacks() {
    if (!this.ctx) return;
    const packNames = Object.keys(SOUND_PACKS);
    const warmNext = (index) => {
      if (!this.ctx || index >= packNames.length) return;
      this.ensurePack(packNames[index]);
      window.setTimeout(() => warmNext(index + 1), 12);
    };
    warmNext(0);
  },

  cacheKey(packName) {
    const depthBucket = Math.round(state.settings.soundDepth * 20) / 20;
    return `${packName}:${depthBucket.toFixed(2)}`;
  },

  ensurePack(packName) {
    if (!this.ctx) return;
    const key = this.cacheKey(packName);
    if (this.buffers.has(key)) return;
    const pack = SOUND_PACKS[packName] || SOUND_PACKS[defaultSettings.soundPack];
    const packBuffers = {};
    ["normal", "space", "backspace", "enter"].forEach((type) => {
      packBuffers[type] = Array.from({ length: 8 }, (_, index) =>
        createPhysicalKeyBuffer(this.ctx, pack, type, index, state.settings.soundDepth)
      );
    });
    this.buffers.set(key, packBuffers);
  },

  updateMaster() {
    if (!this.master) return;
    this.master.gain.setTargetAtTime(0.9, this.ctx.currentTime, 0.01);
  },

  play(type) {
    const settings = state.settings;
    if (!settings.soundEnabled || settings.volume <= 0) return;
    this.unlock();
    if (!this.ctx || !this.master) return;
    const packName = settings.soundPack;
    this.ensurePack(packName);
    const pack = SOUND_PACKS[packName] || SOUND_PACKS[defaultSettings.soundPack];
    const buffers = this.buffers.get(this.cacheKey(packName));
    if (!buffers || !buffers[type]) return;

    const variation = settings.variation;
    const variants = buffers[type];
    const index = variation < 0.04 ? 0 : Math.floor(Math.random() * variants.length);
    const source = this.ctx.createBufferSource();
    const gain = this.ctx.createGain();
    const keyShape = KEY_SHAPES[type] || KEY_SHAPES.normal;
    const voiceTrim = Math.max(0.68, 1 - Math.max(0, this.activeVoices - 5) * 0.035);
    const randomGain = 1 + (Math.random() * 2 - 1) * variation * 0.09;
    const randomRate = 1 + (Math.random() * 2 - 1) * variation * pack.pitchVariance;

    source.buffer = variants[index];
    source.playbackRate.value = randomRate;
    gain.gain.value = settings.volume * pack.master * keyShape.gain * voiceTrim * randomGain;
    source.connect(gain);
    gain.connect(this.master);
    this.activeVoices += 1;
    source.onended = () => {
      this.activeVoices = Math.max(0, this.activeVoices - 1);
    };
    source.start(this.ctx.currentTime);
  }
};

function createPhysicalKeyBuffer(ctx, pack, keyType, variantIndex, depthAmount) {
  const sampleRate = ctx.sampleRate;
  const shape = KEY_SHAPES[keyType] || KEY_SHAPES.normal;
  const depth = clamp01(depthAmount);
  const variant = variantIndex === 0 ? 0 : seededSigned(variantIndex, 1);
  const duration = pack.duration * shape.duration * (1 + variant * 0.04);
  const length = Math.max(1, Math.floor(sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  const pitchScale = shape.freq * (1 - depth * pack.depthPitchDrop) * (1 + variant * 0.014);
  const bodyDepth = 0.82 + depth * 0.64;
  const transientDepth = 1 - depth * 0.34;
  const phaseBase = seeded01(variantIndex, 2) * Math.PI * 2;
  let lowNoise = 0;
  let midNoise = 0;
  let highNoise = 0;
  let grainNoise = 0;
  let finalLow = 0;
  const frame = {
    pack,
    shape,
    pitchScale,
    bodyDepth,
    transientDepth,
    phaseBase,
    variantIndex,
    t: 0,
    white: 0,
    white2: 0,
    white3: 0,
    lowNoise: 0,
    midNoise: 0,
    highNoise: 0,
    grainNoise: 0
  };

  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const white = deterministicNoise(i, variantIndex + 17);
    const white2 = deterministicNoise(i * 3 + 11, variantIndex + 43);
    const white3 = deterministicNoise(i * 7 + 23, variantIndex + 71);
    lowNoise += (white - lowNoise) * 0.04;
    midNoise += (lowNoise - midNoise) * 0.18;
    highNoise += (white2 - highNoise) * 0.28;
    grainNoise += (white3 - grainNoise) * 0.46;

    frame.t = t;
    frame.white = white;
    frame.white2 = white2;
    frame.white3 = white3;
    frame.lowNoise = lowNoise;
    frame.midNoise = midNoise;
    frame.highNoise = highNoise;
    frame.grainNoise = grainNoise;

    let sample = renderSoundModel(pack.model || "thock", frame);

    if (shape.secondary) {
      const delayed = t - 0.012;
      if (delayed > 0) {
        const env = Math.exp(-delayed / 0.027) * 0.1;
        sample += Math.sin(Math.PI * 2 * 104 * pitchScale * delayed + phaseBase) * env * bodyDepth;
      }
    }

    const fadeOut = 1 - Math.pow(i / length, 2.2);
    const soft = softClip(sample * pack.drive, pack.drive) * fadeOut;
    finalLow += (soft - finalLow) * pack.finalLowpass;
    data[i] = clamp(finalLow * 0.82, -1, 1);
  }

  return buffer;
}

function renderSoundModel(model, frame) {
  switch (model) {
    case "wood":
      return renderWoodTap(frame);
    case "bamboo":
      return renderBambooTap(frame);
    case "cream":
      return renderCreamTap(frame);
    case "stone":
      return renderStoneTap(frame);
    case "porcelain":
      return renderPorcelainTap(frame);
    case "paper":
      return renderPaperTap(frame);
    case "felt":
      return renderFeltTap(frame);
    case "snow":
      return renderSnowTap(frame);
    case "scissor":
      return renderScissorTap(frame);
    case "rain":
      return renderRainTap(frame);
    case "scratch":
      return renderScratchTap(frame);
    case "stamp":
      return renderStampTap(frame);
    case "rubber":
      return renderRubberTap(frame);
    case "typebar":
      return renderTypebarTap(frame);
    case "linear":
      return renderLinearThock(frame);
    case "book":
      return renderBookEdgeTap(frame);
    case "silicone":
      return renderSiliconePop(frame);
    case "carbon":
      return renderCarbonThock(frame);
    case "glass":
      return renderMatteGlassTap(frame);
    case "neon":
      return renderNeonCapsulePop(frame);
    case "thock":
    default:
      return renderDeepThock(frame);
  }
}

function renderDeepThock(frame) {
  const pack = frame.pack;
  const thump = pack.thump || { freq: 72, gain: 0.16, decay: 0.052 };
  let sample = resonanceSum(frame, 1.08, 1.05, 1.14, 0.15);
  sample += sineBody(frame, thump.freq, thump.gain * 1.25, 0.006, thump.decay * frame.shape.decay, 0.05, -0.08);
  sample += coloredTransient(frame, pack.transient.gain, 0.0018, pack.transient.decay, "low") * 0.8;
  return sample;
}

function renderWoodTap(frame) {
  const pack = frame.pack;
  const hollow = pack.woodHollow || { freq: 96, gain: 0.1, decay: 0.055 };
  let sample = resonanceSum(frame, 0.82, 0.62, 0.92, 0.28);
  sample += sineBody(frame, hollow.freq, hollow.gain * 1.3, 0.0025, hollow.decay * frame.shape.decay, 0.35, 0.04);
  sample += coloredTransient(frame, pack.transient.gain * 1.12, 0.0012, pack.transient.decay, "wood");
  if (pack.stamp) {
    sample += delayedSineBody(frame, pack.stamp.delay, pack.stamp.freq, pack.stamp.gain * 0.75, 0.002, pack.stamp.decay, 0.6);
  }
  return sample;
}

function renderBambooTap(frame) {
  const pack = frame.pack;
  const hollow = pack.woodHollow || { freq: 140, gain: 0.08, decay: 0.04 };
  let sample = resonanceSum(frame, 0.72, 0.45, 0.72, 0.38);
  sample += sineBody(frame, hollow.freq, hollow.gain * 1.05, 0.0018, hollow.decay * frame.shape.decay, 0.48, 0.02);
  sample += coloredTransient(frame, pack.transient.gain * 1.18, 0.0009, pack.transient.decay, "bamboo");
  if (pack.scissor) {
    sample += coloredTransient(frame, pack.scissor.gain * 0.35, 0.0008, pack.scissor.decay, "scissor");
  }
  return sample;
}

function renderCreamTap(frame) {
  const pack = frame.pack;
  const cushion = pack.cushion || { gain: 0.14, decay: 0.04 };
  let sample = resonanceSum(frame, 0.76, 1.7, 1.22, 0.04);
  sample += sineBody(frame, 86, cushion.gain * 0.75, 0.014, cushion.decay * frame.shape.decay, 0.1, -0.05);
  sample += (frame.lowNoise * 0.7 + frame.midNoise * 0.3) * cushion.gain * 0.34 * hitEnvelope(frame.t, 0.012, cushion.decay, 1.8) * frame.shape.body * frame.bodyDepth;
  sample += coloredTransient(frame, pack.transient.gain * 0.6, 0.006, pack.transient.decay, "felt");
  return sample;
}

function renderStoneTap(frame) {
  const pack = frame.pack;
  const ceramic = pack.ceramic || { freq: 480, gain: 0.05, decay: 0.018 };
  let sample = resonanceSum(frame, 0.62, 0.36, 0.68, 0.55);
  sample += sineBody(frame, ceramic.freq, ceramic.gain * 1.05, 0.0012, ceramic.decay * frame.shape.decay, 0.8, 0.015);
  sample += coloredTransient(frame, pack.transient.gain * 1.12, 0.00075, pack.transient.decay, "stone");
  return sample;
}

function renderPorcelainTap(frame) {
  const pack = frame.pack;
  const ceramic = pack.ceramic || { freq: 610, gain: 0.045, decay: 0.018 };
  let sample = resonanceSum(frame, 0.48, 0.34, 0.82, 0.72);
  sample += sineBody(frame, ceramic.freq, ceramic.gain * 1.2, 0.001, ceramic.decay * frame.shape.decay, 0.9, 0.01);
  sample += delayedSineBody(frame, 0.006, ceramic.freq * 0.62, ceramic.gain * 0.46, 0.001, ceramic.decay * 1.3, 0.2);
  sample += coloredTransient(frame, pack.transient.gain * 0.9, 0.0008, pack.transient.decay, "stone");
  return sample;
}

function renderPaperTap(frame) {
  const pack = frame.pack;
  const paper = pack.paper || { gain: 0.1, decay: 0.052, color: 0.42 };
  let sample = resonanceSum(frame, 0.42, 1.05, 0.95, 0.18);
  const texture = (frame.highNoise - frame.grainNoise * 0.52 + frame.white3 * 0.035);
  sample += texture * paper.gain * hitEnvelope(frame.t, 0.004, paper.decay * frame.shape.decay, 0.9) * frame.shape.transient;
  sample += coloredTransient(frame, pack.transient.gain, 0.0025, pack.transient.decay, "paper");
  return sample;
}

function renderFeltTap(frame) {
  const pack = frame.pack;
  const felt = pack.felt || { gain: 0.12, decay: 0.058 };
  let sample = resonanceSum(frame, 0.48, 1.8, 1.34, 0.02);
  if (pack.thump) {
    sample += sineBody(frame, pack.thump.freq, pack.thump.gain * 0.82, 0.012, pack.thump.decay * frame.shape.decay, 0.05, -0.04);
  }
  sample += (frame.lowNoise * 0.86 + frame.midNoise * 0.14) * felt.gain * hitEnvelope(frame.t, 0.013, felt.decay * frame.shape.decay, 1.75) * frame.shape.body * frame.bodyDepth;
  sample += coloredTransient(frame, pack.transient.gain * 0.38, 0.007, pack.transient.decay, "felt");
  return sample;
}

function renderSnowTap(frame) {
  const pack = frame.pack;
  const felt = pack.felt || { gain: 0.18, decay: 0.08 };
  let sample = resonanceSum(frame, 0.28, 2.1, 1.55, 0.0);
  sample += (frame.lowNoise * 0.92 + frame.midNoise * 0.08) * felt.gain * 0.82 * hitEnvelope(frame.t, 0.017, felt.decay * frame.shape.decay, 2.0) * frame.shape.body * frame.bodyDepth;
  sample += coloredTransient(frame, pack.transient.gain * 0.18, 0.014, pack.transient.decay, "felt");
  return sample;
}

function renderScissorTap(frame) {
  const pack = frame.pack;
  const scissor = pack.scissor || { gain: 0.08, decay: 0.008 };
  let sample = resonanceSum(frame, 0.26, 0.48, 0.58, 0.45);
  sample += coloredTransient(frame, scissor.gain * 1.12, 0.0007, scissor.decay, "scissor");
  sample += delayedNoise(frame, 0.0038, scissor.gain * 0.52, 0.0007, scissor.decay * 0.9, "scissor");
  sample += sineBody(frame, 250, scissor.gain * 0.22, 0.001, scissor.decay * 1.8, 0.3, 0.0);
  return sample;
}

function renderRainTap(frame) {
  const pack = frame.pack;
  const rain = pack.rain || { gain: 0.1, decay: 0.06 };
  let sample = resonanceSum(frame, 0.28, 1.3, 1.05, 0.18);
  const droplet = Math.pow(Math.max(0, frame.white3 * 0.5 + 0.5), 5) * 2 - 0.45;
  const grain = frame.grainNoise * 0.62 + droplet * 0.12;
  sample += grain * rain.gain * hitEnvelope(frame.t, 0.006, rain.decay * frame.shape.decay, 1.08) * frame.shape.transient;
  if (pack.cushion) {
    sample += sineBody(frame, 94, pack.cushion.gain * 0.36, 0.01, pack.cushion.decay * frame.shape.decay, 0.0, -0.05);
  }
  sample += coloredTransient(frame, pack.transient.gain * 0.5, 0.004, pack.transient.decay, "paper");
  return sample;
}

function renderScratchTap(frame) {
  const pack = frame.pack;
  const paper = pack.paper || { gain: 0.12, decay: 0.055 };
  const scratch = (Math.abs(frame.highNoise - frame.grainNoise) * 1.5 - 0.48) + frame.white2 * 0.04;
  let sample = resonanceSum(frame, 0.3, 0.85, 0.75, 0.28);
  sample += scratch * paper.gain * hitEnvelope(frame.t, 0.0025, paper.decay * frame.shape.decay, 0.75) * frame.shape.transient;
  if (pack.scissor) {
    sample += coloredTransient(frame, pack.scissor.gain * 0.5, 0.0009, pack.scissor.decay, "scissor");
  }
  sample += coloredTransient(frame, pack.transient.gain * 0.55, 0.0012, pack.transient.decay, "paper");
  return sample;
}

function renderStampTap(frame) {
  const pack = frame.pack;
  const stamp = pack.stamp || { freq: 92, gain: 0.14, delay: 0.006, decay: 0.05 };
  let sample = resonanceSum(frame, 0.5, 1.05, 1.22, 0.08);
  sample += delayedSineBody(frame, stamp.delay, stamp.freq, stamp.gain * 1.6, 0.0035, stamp.decay * frame.shape.decay, 0.3);
  sample += delayedNoise(frame, stamp.delay + 0.0025, 0.045, 0.002, 0.04, "paper");
  if (pack.paper) {
    sample += (frame.grainNoise * 0.25 + frame.highNoise * 0.15) * pack.paper.gain * 0.36 * hitEnvelope(frame.t, 0.006, pack.paper.decay, 1.05);
  }
  sample += coloredTransient(frame, pack.transient.gain * 0.55, 0.004, pack.transient.decay, "low");
  return sample;
}

function renderRubberTap(frame) {
  const pack = frame.pack;
  const membrane = pack.membrane || { gain: 0.14, decay: 0.045, bend: 0.5 };
  const bend = 1 + Math.exp(-frame.t / 0.018) * membrane.bend;
  let sample = resonanceSum(frame, 0.34, 1.25, 1.05, 0.03);
  sample += Math.sin(Math.PI * 2 * 92 * frame.pitchScale * bend * frame.t + frame.phaseBase * 0.5) * membrane.gain * hitEnvelope(frame.t, 0.009, membrane.decay * frame.shape.decay, 1.35) * frame.shape.body * frame.bodyDepth;
  sample += (frame.lowNoise * 0.72 + frame.midNoise * 0.28) * membrane.gain * 0.3 * hitEnvelope(frame.t, 0.01, membrane.decay, 1.4);
  sample += coloredTransient(frame, pack.transient.gain * 0.45, 0.005, pack.transient.decay, "felt");
  return sample;
}

function renderTypebarTap(frame) {
  const pack = frame.pack;
  const stamp = pack.stamp || { freq: 118, gain: 0.055, delay: 0.012, decay: 0.028 };
  let sample = resonanceSum(frame, 0.44, 0.45, 0.72, 0.35);
  sample += coloredTransient(frame, pack.transient.gain * 1.05, 0.0007, pack.transient.decay, "scissor");
  sample += delayedSineBody(frame, stamp.delay, stamp.freq, stamp.gain * 1.2, 0.0015, stamp.decay * frame.shape.decay, 0.55);
  sample += delayedNoise(frame, stamp.delay + 0.001, 0.032, 0.0009, 0.014, "wood");
  return sample;
}

function renderLinearThock(frame) {
  const pack = frame.pack;
  let sample = resonanceSum(frame, 0.88, 0.86, 0.88, 0.18);
  if (pack.cushion) {
    sample += sineBody(frame, 96, pack.cushion.gain * 0.55, 0.006, pack.cushion.decay * frame.shape.decay, 0.0, -0.03);
  }
  if (pack.stamp) {
    sample += delayedSineBody(frame, pack.stamp.delay, pack.stamp.freq, pack.stamp.gain * 0.72, 0.0018, pack.stamp.decay, 0.28);
  }
  sample += coloredTransient(frame, pack.transient.gain * 0.9, 0.0015, pack.transient.decay, "low");
  return sample;
}

function renderBookEdgeTap(frame) {
  const pack = frame.pack;
  const paper = pack.paper || { gain: 0.08, decay: 0.07 };
  const hollow = pack.woodHollow || { freq: 76, gain: 0.06, decay: 0.06 };
  let sample = resonanceSum(frame, 0.48, 1.0, 1.28, 0.12);
  sample += sineBody(frame, hollow.freq, hollow.gain, 0.009, hollow.decay * frame.shape.decay, 0.2, -0.04);
  sample += (frame.grainNoise * 0.46 + frame.highNoise * 0.22) * paper.gain * hitEnvelope(frame.t, 0.007, paper.decay * frame.shape.decay, 1.25);
  sample += coloredTransient(frame, pack.transient.gain * 0.7, 0.004, pack.transient.decay, "paper");
  return sample;
}

function renderSiliconePop(frame) {
  const pack = frame.pack;
  const membrane = pack.membrane || { gain: 0.18, decay: 0.058, bend: 0.7 };
  const bend = 1 + Math.exp(-frame.t / 0.021) * membrane.bend;
  let sample = resonanceSum(frame, 0.24, 1.8, 1.42, 0.0);
  sample += Math.sin(Math.PI * 2 * 78 * frame.pitchScale * bend * frame.t + frame.phaseBase * 0.32) * membrane.gain * hitEnvelope(frame.t, 0.012, membrane.decay * frame.shape.decay, 1.55) * frame.bodyDepth;
  sample += (frame.lowNoise * 0.76 + frame.midNoise * 0.24) * membrane.gain * 0.3 * hitEnvelope(frame.t, 0.012, membrane.decay, 1.8);
  sample += coloredTransient(frame, pack.transient.gain * 0.32, 0.009, pack.transient.decay, "felt");
  return sample;
}

function renderCarbonThock(frame) {
  const pack = frame.pack;
  const thump = pack.thump || { freq: 62, gain: 0.12, decay: 0.044 };
  let sample = resonanceSum(frame, 0.92, 0.62, 0.82, 0.44);
  sample += sineBody(frame, thump.freq, thump.gain * 1.22, 0.0035, thump.decay * frame.shape.decay, 0.18, -0.03);
  sample += coloredTransient(frame, pack.transient.gain * 0.96, 0.0009, pack.transient.decay, "low");
  sample += delayedNoise(frame, 0.0026, pack.transient.gain * 0.32, 0.0008, 0.008, "scissor");
  return sample;
}

function renderMatteGlassTap(frame) {
  const pack = frame.pack;
  const ceramic = pack.ceramic || { freq: 540, gain: 0.035, decay: 0.016 };
  let sample = resonanceSum(frame, 0.38, 0.42, 0.74, 0.66);
  sample += sineBody(frame, ceramic.freq, ceramic.gain * 0.95, 0.001, ceramic.decay * frame.shape.decay, 0.9, 0.008);
  sample += delayedSineBody(frame, 0.005, ceramic.freq * 0.58, ceramic.gain * 0.34, 0.001, ceramic.decay * 1.2, 0.28);
  sample += coloredTransient(frame, pack.transient.gain * 0.78, 0.0008, pack.transient.decay, "stone");
  return sample;
}

function renderNeonCapsulePop(frame) {
  const pack = frame.pack;
  const membrane = pack.membrane || { gain: 0.06, decay: 0.026, bend: 0.24 };
  const chirp = 1 + Math.exp(-frame.t / 0.012) * membrane.bend;
  let sample = resonanceSum(frame, 0.42, 0.5, 0.74, 0.6);
  sample += Math.sin(Math.PI * 2 * 126 * frame.pitchScale * chirp * frame.t + frame.phaseBase * 0.7) * membrane.gain * hitEnvelope(frame.t, 0.003, membrane.decay * frame.shape.decay, 1.0);
  sample += delayedNoise(frame, 0.0016, pack.transient.gain * 0.64, 0.0007, 0.006, "scissor");
  sample += coloredTransient(frame, pack.transient.gain * 0.62, 0.001, pack.transient.decay, "stone");
  return sample;
}

function resonanceSum(frame, gainScale, attackScale, decayScale, phaseShift) {
  const pack = frame.pack;
  return pack.resonances.reduce((sum, layer, layerIndex) => {
    const drift = 1 + seededSigned(frame.variantIndex, layerIndex + 5) * 0.007;
    const freq = layer.freq * frame.pitchScale * drift;
    const env = hitEnvelope(frame.t, pack.attack * attackScale, layer.decay * frame.shape.decay * decayScale, 1.14);
    const phase = frame.phaseBase * (0.36 + layerIndex * 0.19) + phaseShift;
    const fundamental = Math.sin(Math.PI * 2 * freq * frame.t + phase);
    const lowerBody = Math.sin(Math.PI * 2 * freq * 0.5 * frame.t + phase * 0.43) * 0.1;
    return sum + (fundamental + lowerBody) * layer.gain * env;
  }, 0) * gainScale * frame.shape.body * frame.bodyDepth;
}

function sineBody(frame, freq, gain, attack, decay, phase, bend) {
  const bendScale = 1 + Math.exp(-frame.t / 0.02) * bend;
  const env = hitEnvelope(frame.t, attack, decay, 1.12);
  return Math.sin(Math.PI * 2 * freq * frame.pitchScale * bendScale * frame.t + frame.phaseBase + phase) * gain * env * frame.shape.body * frame.bodyDepth;
}

function delayedSineBody(frame, delay, freq, gain, attack, decay, phase) {
  const t = frame.t - delay;
  if (t <= 0) return 0;
  const env = hitEnvelope(t, attack, decay, 1.05);
  return Math.sin(Math.PI * 2 * freq * frame.pitchScale * t + frame.phaseBase + phase) * gain * env * frame.shape.body * frame.bodyDepth;
}

function coloredTransient(frame, gain, attack, decay, color) {
  return transientSource(frame, color) * gain * hitEnvelope(frame.t, attack, decay * frame.shape.decay, 0.85) * frame.shape.transient * frame.transientDepth;
}

function delayedNoise(frame, delay, gain, attack, decay, color) {
  const t = frame.t - delay;
  if (t <= 0) return 0;
  return transientSource(frame, color) * gain * hitEnvelope(t, attack, decay * frame.shape.decay, 0.85) * frame.shape.transient * frame.transientDepth;
}

function transientSource(frame, color) {
  switch (color) {
    case "wood":
      return frame.lowNoise * 0.42 + frame.midNoise * 0.58;
    case "bamboo":
      return frame.midNoise * 0.58 + frame.highNoise * 0.22 + frame.lowNoise * 0.2;
    case "stone":
      return frame.midNoise * 0.48 + frame.highNoise * 0.34 + frame.white2 * 0.045;
    case "paper":
      return frame.highNoise * 0.42 + frame.grainNoise * 0.46 + frame.white3 * 0.035;
    case "felt":
      return frame.lowNoise * 0.82 + frame.midNoise * 0.18;
    case "scissor":
      return frame.midNoise * 0.58 + frame.highNoise * 0.34 + frame.white2 * 0.035;
    case "low":
    default:
      return frame.lowNoise * 0.86 + frame.midNoise * 0.14;
  }
}

function hitEnvelope(t, attack, decay, power) {
  const safeAttack = Math.max(0.00045, attack);
  const safeDecay = Math.max(0.001, decay);
  return Math.pow(1 - Math.exp(-t / safeAttack), power) * Math.exp(-t / safeDecay);
}

function softClip(value, drive) {
  return Math.tanh(value * drive) / Math.tanh(drive);
}

function deterministicNoise(index, seed) {
  const value = Math.sin((index + 1) * (12.9898 + seed * 0.137) * 78.233) * 43758.5453123;
  return (value - Math.floor(value)) * 2 - 1;
}

function seeded01(seed, salt) {
  const value = Math.sin((seed + 1) * 999 + salt * 37.33) * 10000;
  return value - Math.floor(value);
}

function seededSigned(seed, salt) {
  return seeded01(seed, salt) * 2 - 1;
}



// Wires sound + sparks onto any editable element (PDF notes and the Studio test box).
function attachTyping(el, hooks = {}) {
  let composing = false;
  let lastKeydownAt = 0;
  let lastKeyType = "normal";

  el.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key;
    let type = null;
    if (key === "Backspace" || key === "Delete") type = "backspace";
    else if (key === "Enter") type = "enter";
    else if (key === " ") type = "space";
    else if (key.length === 1 || key === "Process" || key === "Unidentified") type = "normal";
    if (!type) return;
    lastKeydownAt = performance.now();
    lastKeyType = type;
    soundEngine.play(type);
  });

  // Soft keyboards often skip keydown: make sure they still get a sound.
  el.addEventListener("beforeinput", (event) => {
    if (performance.now() - lastKeydownAt > 80 && !event.isComposing) {
      soundEngine.play(keyTypeFromInput(event, "normal"));
    }
  });

  el.addEventListener("compositionstart", () => { composing = true; });
  el.addEventListener("compositionend", (event) => {
    composing = false;
    const last = (event.data || "").slice(-1);
    if (last && state.settings.effectEnabled) {
      const rect = caretRect();
      if (rect) spawnGhostGlyph(last, rect, false);
    }
  });

  el.addEventListener("input", (event) => {
    const type = keyTypeFromInput(event, performance.now() - lastKeydownAt < 120 ? lastKeyType : "normal");
    const glyph = !composing && !event.isComposing && event.inputType === "insertText" && event.data && event.data.trim() ? event.data.slice(-1) : "";
    fireTypingFx(type, glyph);
    if (hooks.onInput) hooks.onInput();
  });

  el.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text/plain");
    document.execCommand("insertText", false, text);
  });
}

// ---------------------------------------------------------- 4. PDF viewer
function toast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => refs.toast.classList.remove("show"), 2800);
}

async function openPdf(file) {
  if (!file) return;
  if (!(file.type === "application/pdf" || /\.pdf$/i.test(file.name))) {
    toast("That file isn't a PDF. Choose a .pdf file.");
    return;
  }
  if (!window.pdfjsLib) {
    toast("The PDF engine didn't load. Check your connection and reload.");
    return;
  }
  try {
    toast("Opening…");
    const data = new Uint8Array(await file.arrayBuffer());
    const doc = await pdfjsLib.getDocument({ data }).promise;
    flushNotes();
    state.doc = doc;
    state.fileName = file.name;
    state.noteKey = `${NOTES_PREFIX}${file.name}:${file.size}:${doc.numPages}`;
    state.notes = loadNotes();
    state.zoom = 1;
    // Show the stage first: the fit-to-width math needs a real, measurable width.
    refs.uploadStage.hidden = true;
    refs.pdfStage.hidden = false;
    refs.inkToolbar.hidden = false;
    refs.pdfNameLabel.textContent = file.name;
    await buildPages();
    refs.pdfScroll.scrollTop = 0;
    updatePageReadout();
    toast(state.notes.length ? "Welcome back — your notes are restored." : "Press T, then click the page to type.");
  } catch (error) {
    console.error(error);
    toast(error && error.name === "PasswordException" ? "This PDF is password-protected." : "Couldn't open that PDF. It may be damaged.");
  } finally {
    refs.pdfInput.value = "";
  }
}

async function buildPages() {
  refs.pdfScroll.innerHTML = "";
  if (state.observer) state.observer.disconnect();
  state.pages = [];
  const total = state.doc.numPages;
  const pdfPages = await Promise.all(Array.from({ length: total }, (_, i) => state.doc.getPage(i + 1)));
  state.observer = new IntersectionObserver(onPageVisibility, { root: refs.pdfScroll, rootMargin: "900px 0px" });
  pdfPages.forEach((page, index) => {
    const el = document.createElement("div");
    el.className = "pdf-page";
    el.dataset.page = String(index + 1);
    const canvas = document.createElement("canvas");
    const layer = document.createElement("div");
    layer.className = "note-layer";
    el.append(canvas, layer);
    refs.pdfScroll.append(el);
    const entry = { index: index + 1, page, el, canvas, layer, base: page.getViewport({ scale: 1 }), renderedKey: "", task: null, visible: false };
    el.__entry = entry;
    state.pages.push(entry);
    state.observer.observe(el);
    layer.addEventListener("pointerdown", (event) => onLayerPointerDown(event, entry));
    // Stop the browser's follow-up mousedown from stealing focus from the note we just created.
    layer.addEventListener("mousedown", (event) => { if (state.typeTool && !event.target.closest(".note-wrap")) event.preventDefault(); });
  });
  computeFit();
  layoutPages();
  state.notes.forEach(renderNote);
}

function computeFit() {
  const first = state.pages[0];
  if (!first) return;
  const available = Math.max(280, refs.pdfScroll.clientWidth - (window.innerWidth < 700 ? 16 : 64));
  state.fit = clamp(available / first.base.width, 0.3, 1.8);
}

function layoutPages() {
  const scale = state.fit * state.zoom;
  state.pages.forEach((entry) => {
    const width = entry.base.width * scale;
    const height = entry.base.height * scale;
    entry.el.style.width = `${width}px`;
    entry.el.style.height = `${height}px`;
    entry.el.style.setProperty("--k", (width / 800).toFixed(4));
    entry.renderedKey = entry.renderedKey && entry.visible ? entry.renderedKey : "";
  });
  refs.zoomReadout.textContent = `${Math.round(state.zoom * 100)}%`;
  state.pages.filter((entry) => entry.visible).forEach(renderPage);
}

function onPageVisibility(changes) {
  changes.forEach((change) => {
    const entry = change.target.__entry;
    entry.visible = change.isIntersecting;
    if (entry.visible) renderPage(entry);
    else releasePage(entry);
  });
}

function releasePage(entry) {
  if (entry.task) { try { entry.task.cancel(); } catch (error) { /* already finished */ } entry.task = null; }
  entry.canvas.width = entry.canvas.height = 0;
  entry.renderedKey = "";
}

async function renderPage(entry) {
  const scale = state.fit * state.zoom;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pixelCap = 16e6 / (entry.base.width * entry.base.height);
  const renderScale = Math.min(scale * dpr, Math.sqrt(pixelCap));
  const key = renderScale.toFixed(3);
  if (entry.renderedKey === key) return;
  entry.renderedKey = key;
  if (entry.task) { try { entry.task.cancel(); } catch (error) { /* ignore */ } }
  const viewport = entry.page.getViewport({ scale: renderScale });
  const off = document.createElement("canvas");
  off.width = Math.floor(viewport.width);
  off.height = Math.floor(viewport.height);
  entry.task = entry.page.render({ canvasContext: off.getContext("2d"), viewport });
  try {
    await entry.task.promise;
    if (entry.renderedKey !== key) return;
    entry.canvas.width = off.width;
    entry.canvas.height = off.height;
    entry.canvas.getContext("2d").drawImage(off, 0, 0);
  } catch (error) {
    if (error && error.name === "RenderingCancelledException") return;
    entry.renderedKey = "";
    console.error(error);
  }
}

function setZoom(next) {
  const target = clamp(next, ZOOM_STEPS[0], ZOOM_STEPS[ZOOM_STEPS.length - 1]);
  if (target === state.zoom) return;
  const scroll = refs.pdfScroll;
  const ratio = scroll.scrollHeight ? (scroll.scrollTop + scroll.clientHeight / 2) / scroll.scrollHeight : 0;
  state.zoom = target;
  layoutPages();
  scroll.scrollTop = ratio * scroll.scrollHeight - scroll.clientHeight / 2;
}

function stepZoom(direction) {
  const steps = ZOOM_STEPS;
  const current = steps.findIndex((value) => value >= state.zoom - 0.001);
  const index = clamp((current < 0 ? steps.length - 1 : current) + direction, 0, steps.length - 1);
  setZoom(steps[index]);
}

function updatePageReadout() {
  if (!state.pages.length) return;
  const mid = refs.pdfScroll.scrollTop + refs.pdfScroll.clientHeight * 0.4;
  let current = 1;
  for (const entry of state.pages) {
    if (entry.el.offsetTop <= mid) current = entry.index; else break;
  }
  state.currentPage = current;
  refs.pageReadout.textContent = `${current} / ${state.pages.length}`;
}

function goToPage(index) {
  const entry = state.pages[clamp(index, 1, state.pages.length) - 1];
  if (entry) refs.pdfScroll.scrollTo({ top: entry.el.offsetTop - 76, behavior: reducedMotionQuery.matches ? "auto" : "smooth" });
}

// ------------------------------------------------------------------ notes
function loadNotes() {
  try {
    const list = JSON.parse(localStorage.getItem(state.noteKey) || "[]");
    return Array.isArray(list) ? list.filter((n) => n && typeof n.text === "string") : [];
  } catch (error) {
    return [];
  }
}

function scheduleSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(flushNotes, 400);
}

function flushNotes() {
  window.clearTimeout(saveTimer);
  if (!state.noteKey) return;
  try {
    if (state.notes.length) localStorage.setItem(state.noteKey, JSON.stringify(state.notes));
    else localStorage.removeItem(state.noteKey);
  } catch (error) {
    toast("Couldn't save notes in this browser.");
  }
}

function makeEditable(el) {
  el.setAttribute("contenteditable", "plaintext-only");
  if (el.contentEditable !== "plaintext-only") {
    el.setAttribute("contenteditable", "true");
    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        document.execCommand("insertLineBreak");
      }
    });
  }
  el.spellcheck = false;
}

function noteText(el) {
  return el.innerText.replace(/\n+$/, "");
}

function createNoteAt(entry, x, y) {
  const note = { id: `n${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`, page: entry.index, x, y, text: "" };
  state.notes.push(note);
  const wrap = renderNote(note);
  wrap.querySelector(".ink-note").focus();
}

function renderNote(note) {
  const entry = state.pages[note.page - 1];
  if (!entry) return null;
  const wrap = document.createElement("div");
  wrap.className = "note-wrap";
  wrap.dataset.id = note.id;
  wrap.style.left = `${note.x * 100}%`;
  wrap.style.top = `${note.y * 100}%`;
  const handle = document.createElement("span");
  handle.className = "note-handle";
  handle.title = "Drag to move";
  const el = document.createElement("div");
  el.className = "ink-note";
  el.textContent = note.text;
  makeEditable(el);
  wrap.append(handle, el);
  entry.layer.append(wrap);

  attachTyping(el, { onInput: () => { note.text = noteText(el); scheduleSave(); } });
  el.addEventListener("focus", () => { state.activeNote = el; wrap.classList.add("is-editing"); refs.placeHint.hidden = true; });
  el.addEventListener("blur", () => {
    wrap.classList.remove("is-editing");
    if (state.activeNote === el) state.activeNote = null;
    if (!noteText(el).trim()) removeNote(note, wrap);
    else { note.text = noteText(el); scheduleSave(); }
    updateHint();
  });
  el.addEventListener("keydown", (event) => { if (event.key === "Escape") el.blur(); });
  handle.addEventListener("pointerdown", (event) => dragNote(event, note, wrap, entry));
  return wrap;
}

function removeNote(note, wrap) {
  state.notes = state.notes.filter((n) => n !== note);
  wrap.remove();
  scheduleSave();
}

function layoutNotes() { /* note size follows --note-size and --k in CSS */ }

function dragNote(event, note, wrap, entry) {
  event.preventDefault();
  const handle = event.currentTarget;
  handle.setPointerCapture(event.pointerId);
  wrap.classList.add("is-dragging");
  const move = (e) => {
    const box = entry.layer.getBoundingClientRect();
    note.x = clamp((e.clientX - box.left) / box.width, 0, 0.98);
    note.y = clamp((e.clientY - box.top) / box.height, 0, 0.99);
    wrap.style.left = `${note.x * 100}%`;
    wrap.style.top = `${note.y * 100}%`;
  };
  const end = () => {
    handle.removeEventListener("pointermove", move);
    handle.removeEventListener("pointerup", end);
    handle.removeEventListener("pointercancel", end);
    wrap.classList.remove("is-dragging");
    scheduleSave();
  };
  handle.addEventListener("pointermove", move);
  handle.addEventListener("pointerup", end);
  handle.addEventListener("pointercancel", end);
}

function onLayerPointerDown(event, entry) {
  if (!state.typeTool || event.target.closest(".note-wrap")) return;
  event.preventDefault();
  const box = entry.layer.getBoundingClientRect();
  createNoteAt(entry, clamp((event.clientX - box.left) / box.width, 0, 0.96), clamp((event.clientY - box.top) / box.height, 0, 0.98));
}


// ------------------------------------------------------------------ review: laser trail + focus lens
// Both effects live on two fixed, pointer-events:none canvases above the PDF and below the toolbar. Nothing here
// touches the note DOM or storage (only the 3 look settings are remembered), so a trail is never saved and
// typing / notes / zoom behave exactly as before.
// ================================================================== REVIEW 3.0
// A reading light with real material. Hover leaves a short beam, press-and-drag circles something (it lingers ~3 s),
// click pings a spot. Everything is temporary and never stored. The room dims around a lens (spotlight or reading
// ruler), the desk takes a faint tint of the beam, and the beam is *made of something*: laser light, a comet, glitter,
// cut gemstones, lip oil, whipped cream, cookie crumb, jelly... A Look sets material + colour + accent in one tap.
const REVIEW = {
  sizes: { s: 0.74, m: 1, l: 1.45 },
  lens: {
    sizes: {
      s: { clear: 72, feather: 190, band: 20, bandFeather: 90 },
      m: { clear: 92, feather: 230, band: 28, bandFeather: 110 },
      l: { clear: 118, feather: 280, band: 40, bandFeather: 140 }
    },
    dim: { spot: 0.10, ruler: 0.12 }, scale: 0.25
  },
  // rgb = solid colour; grad = stops that flow along the beam (period = ms per cycle); scatter = pick a random stop per gem
  colors: [
    { id: "coral",    group: "classic", label: "Coral",     rgb: [255, 104, 78] },
    { id: "rose",     group: "classic", label: "Rose",      rgb: [233, 84, 134] },
    { id: "amber",    group: "classic", label: "Amber",     rgb: [244, 160, 32] },
    { id: "mint",     group: "classic", label: "Mint",      rgb: [34, 190, 150] },
    { id: "sky",      group: "classic", label: "Sky",       rgb: [60, 140, 250] },
    { id: "violet",   group: "classic", label: "Violet",    rgb: [140, 100, 238] },
    { id: "graphite", group: "classic", label: "Graphite",  rgb: [64, 66, 78] },
    { id: "nude",     group: "milky",   label: "Nude pink",   rgb: [232, 176, 176] },
    { id: "bcoral",   group: "milky",   label: "Beige coral", rgb: [230, 160, 136] },
    { id: "dusty",    group: "milky",   label: "Dusty rose",  rgb: [196, 120, 134] },
    { id: "soy",      group: "milky",   label: "Soy milk",    rgb: [238, 222, 204] },
    { id: "scream",   group: "sweet",   label: "Strawberry cream", rgb: [255, 172, 192] },
    { id: "biscuit",  group: "sweet",   label: "Biscuit",   rgb: [210, 152, 86] },
    { id: "grape",    group: "sweet",   label: "Grape jelly", rgb: [148, 92, 210] },
    { id: "marsh",    group: "sweet",   label: "Marshmallow", rgb: [250, 232, 220] },
    { id: "ganache",  group: "sweet",   label: "Ganache",   rgb: [72, 42, 32] },
    { id: "matcha",   group: "sweet",   label: "Matcha",    rgb: [156, 184, 114] },
    { id: "glam",     group: "shine",   label: "Glam pink", rgb: [232, 84, 158] },
    { id: "rosegold", group: "shine",   label: "Rose gold", rgb: [226, 146, 134] },
    { id: "champagne",group: "shine",   label: "Champagne", rgb: [232, 190, 104] },
    { id: "silver",   group: "shine",   label: "Silver",    rgb: [226, 235, 250] },
    { id: "ki",       group: "game",    label: "Ki gold",   rgb: [255, 170, 44] },
    { id: "lava",     group: "game",    label: "Lava",      rgb: [255, 104, 28] },
    { id: "steel",    group: "game",    label: "Steel",     rgb: [184, 196, 214] },
    { id: "ice",      group: "game",    label: "Ice blade", rgb: [132, 210, 255] },
    { id: "iris",  group: "flow", label: "Iris",  period: 4000, grad: [[255, 138, 138], [255, 211, 106], [147, 224, 143], [111, 202, 255], [182, 144, 255], [255, 138, 138]] },
    { id: "holo",  group: "flow", label: "Holo",  period: 5200, grad: [[255, 168, 214], [190, 170, 255], [140, 214, 255], [160, 240, 214], [255, 230, 160], [255, 168, 214]] },
    { id: "gems",  group: "flow", label: "Gemstones", period: 6000, scatter: true, grad: [[222, 38, 70], [236, 58, 160], [244, 168, 30], [150, 208, 50], [30, 168, 110], [30, 188, 220], [50, 100, 230], [140, 70, 210], [222, 38, 70]] },
    { id: "flame", group: "flow", label: "Flame", period: 2600, grad: [[255, 236, 130], [255, 150, 40], [255, 72, 30], [255, 150, 40], [255, 236, 130]] },
    { id: "pearl", group: "flow", label: "Pearl", period: 7000, grad: [[255, 206, 222], [214, 206, 255], [176, 226, 255], [255, 244, 214], [255, 206, 222]] },
    { id: "auto",  group: "auto", label: "Auto — the accent's own colours" }
  ],
  // Materials. Soft-sprite layers (R radius, stops alpha ramp, white/mix tint, stride, per-layer taper/fade) are stamped
  // along a smooth curve; `kind` adds the signature pass. taper = [tail thinness, falloff], speedW = slow strokes swell,
  // fast ones thin, alphaPow = how long the beam holds brightness before fading (low = holds, then drops).
  brushes: {
    laser: { label: "Laser", life: 1050, taper: [0.92, 0.3], speedW: 0, alphaPow: 0.36, layers: [
      { R: 9,    stops: [[0, 0.08], [0.5, 0.035], [1, 0]],   stride: 3, white: 0 },
      { R: 3.8,  stops: [[0, 0.78], [0.6, 0.42], [1, 0]],    stride: 1, white: 0.05 },
      { R: 1.55, stops: [[0, 1], [0.8, 0.97], [1, 0]],       stride: 1, white: 0.4 }
    ] },
    comet: { label: "Comet", kind: "comet", life: 2100, taper: [0.05, 1], speedW: 0, alphaPow: 0.8,
      dust: { shape: "speck", every: 20, prob: 0.8, size: [1.1, 2.5], life: 1500, spread: 2.6 }, layers: [
      { R: 22,  stops: [[0, 0.075], [0.4, 0.045], [0.8, 0.012], [1, 0]], stride: 3, white: 0,    fade: 0.85, taper: [0.12, 1.15] },
      { R: 7.5, stops: [[0, 0.34], [0.55, 0.25], [0.9, 0.07], [1, 0]],   stride: 1, white: 0.1,  fade: 1.4,  taper: [0.02, 2.3] },
      { R: 2.8, stops: [[0, 0.92], [0.6, 0.6], [1, 0]],                  stride: 1, white: 0.78, fade: 2.6,  taper: [0.02, 3.4] }
    ] },
    veil: { label: "Veil", life: 2200, taper: [0.5, 0.5], speedW: 0.1, layers: [
      { R: 30,  stops: [[0, 0.05], [0.5, 0.032], [0.85, 0.01], [1, 0]], stride: 4, white: 0 },
      { R: 13,  stops: [[0, 0.12], [0.5, 0.085], [1, 0]],               stride: 2, white: 0 },
      { R: 2.2, stops: [[0, 0.55], [0.6, 0.3], [1, 0]],                 stride: 1, white: 0.6 }
    ] },
    ribbon: { label: "Ribbon", life: 1800, taper: [0.3, 0.7], speedW: 0.7, layers: [
      { R: 11,  stops: [[0, 0.04], [0.6, 0.015], [1, 0]],               stride: 3, white: 0 },
      { R: 5.4, stops: [[0, 0.62], [0.6, 0.55], [0.9, 0.2], [1, 0]],    stride: 1, white: 0 },
      { R: 2.2, stops: [[0, 0.7], [0.6, 0.4], [1, 0]],                  stride: 1, white: 0.6 }
    ] },
    glitter: { label: "Glitter", kind: "glitter", life: 2000, taper: [0.5, 0.5], speedW: 0.05, layers: [
      { R: 12,  stops: [[0, 0.05], [0.45, 0.03], [0.8, 0.008], [1, 0]], stride: 3, white: 0 },
      { R: 5.4, stops: [[0, 0.5], [0.75, 0.45], [0.95, 0.16], [1, 0]],   stride: 1, white: 0.08, mix: [[70, 18, 52], 0.1] }
    ] },
    sparkle: { label: "Sparkle", kind: "glitter", flash: true, life: 2000, taper: [0.5, 0.5], speedW: 0.05,
      flare: { shape: "glint", every: 22, prob: 0.9, size: [2.4, 9.5], life: 600, spread: 1.15 }, layers: [
      { R: 12,  stops: [[0, 0.05], [0.45, 0.03], [0.8, 0.008], [1, 0]], stride: 3, white: 0 },
      { R: 5.4, stops: [[0, 0.5], [0.75, 0.45], [0.95, 0.16], [1, 0]],   stride: 1, white: 0.08, mix: [[70, 18, 52], 0.1] }
    ] },
    dazzle: { label: "Dazzling", kind: "gems", life: 2100, taper: [0.35, 0.6], speedW: 0,
      flare: { shape: "prism", every: 64, prob: 0.42, size: [5.5, 10], life: 720, spread: 0.9 }, layers: [
      { R: 12,  stops: [[0, 0.04], [0.5, 0.02], [1, 0]], stride: 4, white: 0 }
    ] },
    gloss: { label: "Lip Oil", kind: "gloss", life: 2000, taper: [0.35, 0.6], speedW: 0.25, layers: [
      { R: 8.2, stops: [[0, 0], [0.55, 0], [0.76, 0.3], [0.92, 0.36], [1, 0]],      stride: 1, white: 0, mix: [[104, 58, 66], 0.34] },
      { R: 6.8, stops: [[0, 0.21], [0.7, 0.19], [0.93, 0.1], [1, 0]],               stride: 1, white: 0.36 },
      { R: 4.2, stops: [[0, 0.34], [1, 0]],                                          stride: 1, white: 0.72 }
    ] },
    glossy: { label: "Gloss", kind: "gloss", smooth: true, life: 2000, taper: [0.35, 0.6], speedW: 0.25, layers: [
      { R: 8.2, stops: [[0, 0], [0.55, 0], [0.76, 0.3], [0.92, 0.36], [1, 0]],      stride: 1, white: 0, mix: [[104, 58, 66], 0.34] },
      { R: 6.8, stops: [[0, 0.21], [0.7, 0.19], [0.93, 0.1], [1, 0]],               stride: 1, white: 0.36 },
      { R: 4.2, stops: [[0, 0.34], [1, 0]],                                          stride: 1, white: 0.72 }
    ] },
    jelly: { label: "Jelly", kind: "jelly", life: 2100, taper: [0.45, 0.6], speedW: 0.2, layers: [
      { R: 9.4, stops: [[0, 0], [0.5, 0], [0.76, 0.46], [0.92, 0.56], [1, 0]],      stride: 1, white: 0, mix: [[40, 6, 64], 0.5] },
      { R: 7.9, stops: [[0, 0.36], [0.78, 0.34], [0.95, 0.2], [1, 0]],              stride: 1, white: 0.02 },
      { R: 5.0, stops: [[0, 0.5], [1, 0]],                                           stride: 1, white: 0.5 }
    ] },
    cream: { label: "Cream", kind: "cream", life: 2400, taper: [0.55, 0.5], speedW: 0, layers: [] },
    puff: { label: "Marshmallow", kind: "puff", life: 2500, taper: [0.55, 0.5], speedW: 0, layers: [] },
    ganache: { label: "Ganache", kind: "ganache", life: 2300, taper: [0.45, 0.6], speedW: 0.18, layers: [
      { R: 8.6, stops: [[0, 0], [0.5, 0], [0.74, 0.55], [0.92, 0.72], [1, 0]],      stride: 1, white: 0, mix: [[16, 7, 5], 0.62] },
      { R: 7.2, stops: [[0, 0.97], [0.82, 0.95], [0.96, 0.55], [1, 0]],             stride: 1, white: 0 },
      { R: 4.6, stops: [[0, 0.36], [1, 0]],                                          stride: 1, white: 0.12, mix: [[196, 134, 98], 0.2] }
    ] },
    matcha: { label: "Matcha", kind: "matcha", life: 2300, taper: [0.5, 0.5], speedW: 0.1, layers: [
      { R: 13,   stops: [[0, 0.26], [0.6, 0.18], [1, 0]],                           stride: 2, white: 0.62 },
      { R: 8.2,  stops: [[0, 0.7], [0.72, 0.62], [0.94, 0.16], [1, 0]],             stride: 1, white: 0.02 },
      { R: 4.2,  stops: [[0, 0.4], [1, 0]],                                          stride: 1, white: 0, mix: [[56, 88, 38], 0.4] }
    ] },
    aura: { label: "Aura", kind: "aura", life: 1500, taper: [0.2, 1], speedW: 0, alphaPow: 0.9, layers: [
      { R: 22,  stops: [[0, 0.09], [0.4, 0.05], [0.8, 0.012], [1, 0]],              stride: 3, white: 0,    fade: 0.7, taper: [0.3, 0.8] },
      { R: 7.5, stops: [[0, 0.5], [0.55, 0.35], [0.9, 0.1], [1, 0]],                stride: 1, white: 0.1,  fade: 1.0, taper: [0.2, 1.1] },
      { R: 2.6, stops: [[0, 1], [0.7, 0.9], [1, 0]],                                stride: 1, white: 0.85, fade: 1.2, taper: [0.15, 1.2] }
    ] },
    slash: { label: "Slash", kind: "slash", life: 720, taper: [1, 1], speedW: 0, layers: [] },
    magma: { label: "Magma", kind: "magma", life: 2200, taper: [0.45, 0.6], speedW: 0.12, layers: [
      { R: 18,  stops: [[0, 0.08], [0.5, 0.04], [1, 0]],                            stride: 3, white: 0, fade: 0.9 },
      { R: 7.6, stops: [[0, 0.9], [0.8, 0.86], [0.96, 0.5], [1, 0]],                stride: 1, white: 0, mix: [[28, 15, 15], 0.88] }
    ] },
    chrome: { label: "Chrome", kind: "chrome", life: 2000, taper: [0.4, 0.6], speedW: 0.2, layers: [
      { R: 8.2, stops: [[0, 0], [0.52, 0], [0.74, 0.7], [0.93, 0.86], [1, 0]],      stride: 1, white: 0, mix: [[16, 20, 34], 0.72] },
      { R: 6.8, stops: [[0, 0.95], [0.84, 0.92], [0.97, 0.5], [1, 0]],              stride: 1, white: 0 }
    ] },
    crumb: { label: "Cookie", kind: "crumb", life: 2400, taper: [0.5, 0.5], speedW: 0.06, layers: [
      { R: 8.2, stops: [[0, 0], [0.5, 0], [0.72, 0.66], [0.93, 0.74], [1, 0]],      stride: 1, white: 0, mix: [[94, 50, 22], 0.62] },
      { R: 6.4, stops: [[0, 0.92], [0.84, 0.88], [0.97, 0.42], [1, 0]],             stride: 1, white: 0.08, mix: [[226, 172, 98], 0.16] }
    ] }
  },
  tabs: [["light", "Light"], ["shine", "Shine"], ["sweet", "Sweet"], ["game", "Game"]],
  looks: [
    { id: "laser",  group: "light", label: "Laser",  title: "Laser pointer",  color: "coral",    fx: "none",         brush: "laser",   size: "m" },
    { id: "comet",  group: "light", label: "Comet",  title: "Comet",          color: "sky",      fx: "star-dust",    brush: "comet",   size: "m" },
    { id: "aurora", group: "light", label: "Aurora", title: "Aurora",         color: "iris",     fx: "aurora-veil",  brush: "veil",    size: "m" },
    { id: "origami",group: "light", label: "Origami",title: "Origami paper",  color: "rose",     fx: "petal-bloom",  brush: "ribbon",  size: "m" },
    { id: "ink",    group: "light", label: "Ink",    title: "Ink brush",      color: "graphite", fx: "ink",          brush: "ribbon",  size: "m" },
    { id: "neon",   group: "light", label: "Neon",   title: "Midnight neon",  color: "rose",     fx: "neon-rain",    brush: "laser",   size: "m" },
    { id: "pixel",  group: "light", label: "Pixel",  title: "Pixel",          color: "violet",   fx: "pixel",        brush: "laser",   size: "m" },
    { id: "soap",   group: "light", label: "Bubble", title: "Soap bubbles",   color: "sky",      fx: "bubble",       brush: "veil",    size: "m" },
    { id: "glitter",  group: "shine", label: "Glitter",  title: "Glitter",       color: "glam",      fx: "none", brush: "glitter", size: "m" },
    { id: "rosegold", group: "shine", label: "Rose Gold",title: "Rose-gold glitter", color: "rosegold", fx: "star-dust",  brush: "sparkle", size: "m" },
    { id: "dazzle",   group: "shine", label: "Dazzling", title: "Dazzling gemstones", color: "gems",   fx: "crystal-glass", brush: "dazzle", size: "m" },
    { id: "diamond",  group: "shine", label: "Diamond",  title: "Diamond crystals",  color: "silver",    fx: "star-dust",  brush: "dazzle",  size: "m" },
    { id: "lipoil",   group: "shine", label: "Lip Oil",  title: "Lip oil",       color: "nude",      fx: "none",    brush: "gloss",   size: "m" },
    { id: "pearl",    group: "shine", label: "Pearl",    title: "Pearl gloss",   color: "pearl",     fx: "moon-pearl",  brush: "glossy",   size: "m" },
    { id: "cream",  group: "sweet", label: "Cream",  title: "Strawberry cream", color: "scream",  fx: "sw-berry",  brush: "cream", size: "m" },
    { id: "cookie", group: "sweet", label: "Cookie", title: "Choc-chip cookie", color: "biscuit", fx: "sw-crumbs", brush: "crumb", size: "m" },
    { id: "jelly",  group: "sweet", label: "Jelly",  title: "Grape jelly",      color: "grape",   fx: "none",  brush: "jelly", size: "m" },
    { id: "mallow", group: "sweet", label: "Mallow", title: "Marshmallow / meringue", color: "marsh", fx: "none", brush: "puff", size: "m" },
    { id: "ganache",group: "sweet", label: "Ganache",title: "Chocolate ganache", color: "ganache", fx: "none",  brush: "ganache", size: "m" },
    { id: "matcha", group: "sweet", label: "Matcha", title: "Matcha latte cream", color: "matcha", fx: "none", brush: "matcha", size: "m" },
    { id: "aura",   group: "game", label: "Aura",   title: "Energy aura",   color: "ki",     fx: "firefly-glow", brush: "aura",   size: "m" },
    { id: "slash",  group: "game", label: "Slash",  title: "Blade slash",   color: "ice",    fx: "none",         brush: "slash",  size: "m" },
    { id: "magma",  group: "game", label: "Magma",  title: "Molten magma",  color: "lava",   fx: "ember-glow",   brush: "magma",  size: "m" },
    { id: "chrome", group: "game", label: "Chrome", title: "Liquid metal",  color: "steel",  fx: "none",         brush: "chrome", size: "m" },
    { id: "storm",  group: "game", label: "Storm",  title: "Thunder",       color: "violet", fx: "electric",     brush: "comet",  size: "m" }
  ],
  penLife: 3200, pingLife: 760
};
Object.entries(REVIEW.brushes).forEach(([id, b]) => b.layers.forEach((L, i) => { L.id = `${id}${i}`; }));
const RV_SOFT = { id: "soft", R: 10, stops: [[0, 0.85], [0.5, 0.5], [1, 0]], white: 0 };
const RV_SPEC = { id: "spec", R: 3, stops: [[0, 0.95], [0.45, 0.6], [1, 0]], white: 1 };
const RV_DARK = { id: "dark", R: 10, stops: [[0, 0.5], [0.55, 0.25], [1, 0]], white: 0, mix: [[40, 20, 30], 0.9] };
const IRIS = Array.from({ length: 24 }, (_, i) => {   // 24 hue buckets (HSL s=.7 l=.6), pre-converted to rgb
  const h = i / 24, a = 0.28;
  const f = (n) => { const k = (n + h * 12) % 12; return Math.round(255 * (0.6 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); };
  return [f(0), f(8), f(4)];
});
const review = {
  on: false, hinted: false, raf: 0, lastFrame: 0, inside: false,
  pts: [], breakNext: true, hasFilter: false, down: false, curL: 1050, curPen: false,
  sx: 0, sy: 0, st: 0, rx: 0, ry: 0, prx: 0, pry: 0,        // low-pass filter state + last raw pointer
  mx: 0, my: 0, pmx: 0, pmy: 0, lx: 0, ly: 0, lensReady: false, lensSpeed: 0, lensPulseT: -9999,
  lampA: 0, lampX: 0, lampY: 0, lastMoveT: 0, restFired: true, emitT: 0, emitAcc: 0, gap: 24,
  parts: [], pings: [], pal: null, tint: [16, 18, 24], bb: null, now: 0, panelOpen: false,
  tab: "light", lastLook: null, dockTimer: 0, dockHover: false, matKey: "", lookTabs: {},
  lensCtx: null, trailCtx: null, dpr: 1, w: 0, h: 0, lw: 0, lh: 0, box: null,
  vx: [], vy: [], vt: [], vl: [], vs: [], va: [], vnx: [], vny: [], vi: [], vc: [], vw: [],
  sprites: new Map(), tiles: new Map(), gems: new Map(), dollops: new Map(), styles: new Map()
};

const REVIEW_CSS = `
.tool-pill { height: 36px; display: inline-flex; align-items: center; gap: 8px; padding: 0 12px 0 11px; border: 0; border-radius: 10px;
  background: transparent; font-size: 12px; font-weight: 650; letter-spacing: .09em; line-height: 1; transition: background .15s, color .15s; }
.tool-pill:hover { background: rgba(38,39,44,.08); }
.pill-dot { width: 7px; height: 7px; border-radius: 50%; background: #b9bac1; flex: none; transition: background .3s, box-shadow .3s; }
.tool-pill[aria-pressed="true"] { background: var(--chrome-ink); color: #fff; }
.tool-pill[aria-pressed="true"] .pill-dot { background: rgb(var(--rv, 255,125,95)); box-shadow: 0 0 0 3px rgba(var(--rv, 255,125,95), .28); }
.review-lens, .review-trail { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.review-lens { z-index: 8; opacity: 0; transition: opacity .45s ease; }
.review-lens.on { opacity: 1; }
.review-trail { z-index: 9; }
body, .pdf-stage { transition: background-color .7s ease; }
body.review-mode .pdf-page { cursor: default; box-shadow: 0 1px 2px rgba(0,0,0,.4), 0 28px 64px -18px rgba(0,0,0,.72); }
body.review-mode .toast { top: 208px; }

/* dock: shelves + lens + tune / look thumbnails / tune panel */
.review-dock { position: fixed; z-index: 19; top: 68px; left: 50%; transform: translate(-50%, -8px); display: flex; flex-direction: column;
  width: min(560px, calc(100vw - 16px)); padding: 10px 14px 12px; background: var(--chrome); border-radius: 22px; backdrop-filter: blur(18px);
  box-shadow: 0 16px 40px -14px rgba(0,0,0,.55), 0 0 0 1px rgba(255,255,255,.45) inset;
  opacity: 0; visibility: hidden; transition: opacity .28s, transform .32s var(--ease), visibility 0s linear .28s; }
body.review-mode .review-dock { opacity: 1; visibility: visible; transform: translate(-50%, 0); transition: opacity .28s, transform .32s var(--ease); }
body.review-mode .review-dock.away { opacity: 0; transform: translate(-50%, -10px); pointer-events: none; transition: opacity .5s, transform .5s var(--ease); }
.rv-head { display: flex; align-items: center; gap: 10px; }
.rv-spacer { flex: 1; }
.rv-seg { display: flex; gap: 2px; padding: 2px; border-radius: 11px; background: rgba(38,39,44,.07); flex: none; }
.rv-seg button { min-width: 28px; height: 26px; padding: 0 10px; border: 0; border-radius: 9px; background: transparent; display: grid; place-items: center;
  font-size: 11.5px; font-weight: 650; color: var(--chrome-soft); transition: background .15s, color .15s, box-shadow .15s; }
.rv-seg button svg { width: 15px; height: 15px; }
.rv-seg button:hover { color: var(--chrome-ink); }
.rv-seg button[aria-pressed="true"] { background: #fff; color: var(--chrome-ink); box-shadow: 0 1px 3px rgba(0,0,0,.2); }
.rv-tune { height: 30px; padding: 0 12px; border: 0; border-radius: 10px; background: rgba(38,39,44,.07); font-size: 12px; font-weight: 650; flex: none; }
.rv-tune[aria-expanded="true"] { background: var(--chrome-ink); color: #fff; }
.rv-looks { display: flex; gap: 6px; margin-top: 11px; overflow-x: auto; scrollbar-width: none; justify-content: center; }
.rv-looks::-webkit-scrollbar { display: none; }
.rv-look { flex: none; display: grid; justify-items: center; gap: 5px; padding: 0; border: 0; background: transparent; }
.rv-look[hidden] { display: none; }
.rv-look canvas, .rv-mat canvas { display: block; border-radius: 11px; background: #f4f1ec; box-shadow: inset 0 0 0 1px rgba(38,39,44,.1);
  transition: transform .2s var(--ease), box-shadow .2s; }
.rv-look:hover canvas, .rv-mat:hover canvas { transform: translateY(-1px); }
.rv-look[aria-pressed="true"] canvas, .rv-mat[aria-pressed="true"] canvas { box-shadow: 0 0 0 2px var(--chrome), 0 0 0 3.5px var(--chrome-ink); }
.rv-cap { max-width: 62px; font-size: 10.5px; font-weight: 600; color: var(--chrome-soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .15s; }
.rv-look[aria-pressed="true"] .rv-cap, .rv-mat[aria-pressed="true"] .rv-cap { color: var(--chrome-ink); }
.rv-panel { display: grid; gap: 15px; overflow: hidden; max-height: 0; opacity: 0;
  margin-top: 0; padding-top: 0; border-top: 1px solid transparent; transition: max-height .36s var(--ease), opacity .2s, margin .36s var(--ease), padding .36s var(--ease); }
.rv-panel.open { max-height: 520px; opacity: 1; margin-top: 12px; padding-top: 14px; border-top-color: var(--line); overflow-y: auto; }
.rv-panel h4 { margin: 0 0 8px; font-size: 11.5px; font-weight: 650; color: var(--chrome-soft); letter-spacing: .03em; }
.rv-mats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px 6px; justify-items: center; }
.rv-mat { display: grid; justify-items: center; gap: 4px; padding: 0; border: 0; background: transparent; }
.rv-colors { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; }
.rv-gap { width: 9px; flex: none; }
.dock-swatch { flex: none; width: 22px; height: 22px; padding: 0; border-radius: 50%; border: 2px solid #f6f4f0; background: var(--c, #999);
  box-shadow: 0 0 0 1px var(--line); color: #fff; font-size: 10px; font-weight: 700; line-height: 1; transition: transform .15s var(--ease), box-shadow .15s; }
.dock-swatch:hover { transform: scale(1.14); }
.dock-swatch[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--chrome-ink); }
.dock-swatch.flow { background: var(--grad); }
.dock-swatch[data-v="auto"] { background: #3a3c44; }
.rv-two { display: grid; grid-template-columns: 1fr auto; gap: 14px; align-items: end; }
.rv-panel select { height: 30px; padding: 0 9px; font-size: 12.5px; border-radius: 10px; width: 100%; }
.rv-pair { display: flex; gap: 10px; align-items: center; }
.rv-pair small { font-size: 11px; color: var(--chrome-soft); font-weight: 650; }
@media (max-width: 760px) {
  .pill-label { display: none; }
  .tool-pill { padding: 0 11px; }
  .rv-mats { grid-template-columns: repeat(3, 1fr); }
  .rv-two { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) { .review-lens, body, .pdf-stage { transition-duration: .01ms; } }
`;

const RV_ICONS = {
  spot: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="1.6" fill="currentColor"/></svg>',
  ruler: '<svg viewBox="0 0 16 16"><rect x="1.5" y="5.2" width="13" height="5.6" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  off: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4.4 11.6 11.6 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
};

// If index.html / styles.css are older than app.js (a common deploy mix-up) the missing pieces are created here, and all
// review styling lives in this file, so REVIEW cannot silently die or look unstyled.
function ensureReviewDom() {
  const make = (tag, props, parent) => { const el = document.createElement(tag); Object.assign(el, props); (parent || document.body).append(el); return el; };
  if (!document.getElementById("reviewCss")) make("style", { id: "reviewCss", textContent: REVIEW_CSS }, document.head);
  if (!document.getElementById("reviewBtn")) {
    const cluster = refs.typeToolBtn && refs.typeToolBtn.parentElement;
    const b = make("button", { id: "reviewBtn", type: "button", className: "tool-pill", title: "Review (R)" }, cluster || document.body);
    b.setAttribute("aria-pressed", "false");
    b.innerHTML = '<span class="pill-dot" aria-hidden="true"></span><span class="pill-label">REVIEW</span>';
    if (cluster && refs.typeToolBtn) refs.typeToolBtn.after(b);
  }
  if (!document.getElementById("reviewLens")) make("canvas", { id: "reviewLens", className: "review-lens" });
  if (!document.getElementById("reviewTrail")) make("canvas", { id: "reviewTrail", className: "review-trail" });
  if (!document.getElementById("reviewDock")) { const d = make("div", { id: "reviewDock", className: "review-dock" }); d.inert = true; }
  ["reviewBtn", "reviewLens", "reviewTrail", "reviewDock"].forEach((id) => { refs[id] = document.getElementById(id); });
}

// prefs saved by earlier Review versions may name looks / colours / accents that no longer exist
function rvNormalizePrefs() {
  const p = state.prefs;
  if (!REVIEW.colors.some((c) => c.id === p.reviewColor)) p.reviewColor = "coral";
  if (!REVIEW.brushes[p.reviewBrush]) p.reviewBrush = "laser";
  p.reviewFx = rvResolveFx(p.reviewFx);
  if (p.reviewLook !== "custom" && !REVIEW.looks.some((l) => l.id === p.reviewLook)) p.reviewLook = "custom";
}

function initReview() {
  ensureReviewDom();
  // bind the button first so it keeps working even if something below fails
  refs.reviewBtn.addEventListener("click", () => setReview(!review.on));
  rvNormalizePrefs();
  review.lensCtx = refs.reviewLens.getContext("2d");
  review.trailCtx = refs.reviewTrail.getContext("2d");
  buildReviewDock();
  reviewResize();
  let timer = 0;
  window.addEventListener("resize", () => { window.clearTimeout(timer); timer = window.setTimeout(reviewResize, 100); });
  const stage = refs.pdfScroll;
  stage.addEventListener("pointermove", onReviewMove, { passive: true });
  stage.addEventListener("pointerdown", onReviewDown, { passive: true });
  stage.addEventListener("pointerleave", onReviewLeave, { passive: true });
  window.addEventListener("pointerup", onReviewUp);
  window.addEventListener("pointercancel", onReviewUp);
  window.addEventListener("blur", () => { onReviewLeave(); onReviewUp(); });
  syncReviewDock();
}

// ---- the dock: shelves (Light / Shine / Sweet) · lens · Tune. Look and material tiles are live thumbnails drawn with
// the same renderer as the beam, so what you see in the dock is what you get on the page.
function buildReviewDock() {
  const dock = refs.reviewDock;
  if (dock.dataset.rvBound) return;                 // built once; init running twice must not stack listeners
  dock.dataset.rvBound = "1";
  dock.innerHTML = "";
  dock.setAttribute("aria-label", "Review options");
  const gradCss = (c) => `conic-gradient(from 210deg, ${c.grad.map((s) => `rgb(${s})`).join(", ")})`;
  const tabs = REVIEW.tabs.map(([id, label]) => `<button type="button" data-tab="${id}" aria-pressed="false">${label}</button>`).join("");
  const looks = REVIEW.looks.map((l) => `
    <button type="button" class="rv-look" data-look="${l.id}" data-group="${l.group}" aria-pressed="false" title="${l.title || l.label}" aria-label="${l.title || l.label} look">
      <canvas data-w="58" data-h="34" aria-hidden="true"></canvas><span class="rv-cap">${l.label}</span></button>`).join("");
  const mats = Object.entries(REVIEW.brushes).map(([id, b]) => `
    <button type="button" class="rv-mat" data-v="${id}" aria-pressed="false" aria-label="${b.label} material">
      <canvas data-w="88" data-h="34" aria-hidden="true"></canvas><span class="rv-cap">${b.label}</span></button>`).join("");
  const seg = (pref, items) => `<div class="rv-seg" role="group" data-pref="${pref}">${items.map(([v, label, title]) =>
    `<button type="button" data-v="${v}" aria-pressed="false" title="${title || label}">${label}</button>`).join("")}</div>`;
  let lastGroup = "";
  const swatches = REVIEW.colors.map((c) => {
    const gap = lastGroup && lastGroup !== c.group ? '<i class="rv-gap"></i>' : "";
    lastGroup = c.group;
    const bg = c.grad ? `style="--grad:${gradCss(c)}"` : c.rgb ? `style="--c:rgb(${c.rgb.join(",")})"` : "";
    return `${gap}<button type="button" class="dock-swatch${c.grad ? " flow" : ""}" data-pref="reviewColor" data-v="${c.id}" title="${c.label}" aria-label="${c.label}" aria-pressed="false" ${bg}>${c.id === "auto" ? "A" : ""}</button>`;
  }).join("");
  const fxOptions = `<option value="none">None — beam only</option>` + RV_ACCENT_GROUPS.map(([label, keys]) =>
    `<optgroup label="${label}">${keys.map((k) => `<option value="${k}">${rvAccentLabel(k)}</option>`).join("")}</optgroup>`).join("");
  dock.innerHTML = `
    <div class="rv-head">
      <div class="rv-seg" role="group" aria-label="Shelves">${tabs}</div>
      <span class="rv-spacer"></span>
      <div class="rv-seg" role="group" data-pref="reviewLens" aria-label="Lens">
        <button type="button" data-v="spot" aria-pressed="false" title="Spotlight (L)">${RV_ICONS.spot}</button>
        <button type="button" data-v="ruler" aria-pressed="false" title="Reading ruler (L)">${RV_ICONS.ruler}</button>
        <button type="button" data-v="off" aria-pressed="false" title="No lens (L)">${RV_ICONS.off}</button>
      </div>
      <button type="button" class="rv-tune" id="rvTune" aria-expanded="false">Tune</button>
    </div>
    <div class="rv-looks" role="group" aria-label="Looks">${looks}</div>
    <div class="rv-panel" id="rvPanel" inert>
      <section><h4>Material</h4><div class="rv-mats" data-pref="reviewBrush">${mats}</div></section>
      <section><h4>Color</h4><div class="rv-colors">${swatches}</div></section>
      <section class="rv-two">
        <div><h4>Accent</h4><select id="rvFx" aria-label="Accent effect">${fxOptions}</select></div>
        <div><h4>Size</h4><div class="rv-pair">
          <small>Beam</small>${seg("reviewSize", [["s", "S", "Thin"], ["m", "M", "Medium"], ["l", "L", "Thick"]])}
          <small>Lens</small>${seg("reviewLensSize", [["s", "S", "Small ([)"], ["m", "M", "Medium"], ["l", "L", "Large (])"]])}
        </div></div>
      </section>
    </div>`;
  dock.addEventListener("pointerenter", () => { review.dockHover = true; wakeDock(); });
  dock.addEventListener("pointerleave", () => { review.dockHover = false; wakeDock(); });
  dock.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-tab]");
    if (tab) { review.tab = tab.dataset.tab; syncReviewDock(); return; }
    const look = event.target.closest(".rv-look");
    if (look) { applyLook(look.dataset.look); return; }
    if (event.target.closest("#rvTune")) { setTunePanel(!review.panelOpen); return; }
    const b = event.target.closest("[data-v]");
    if (!b) return;
    const group = b.dataset.pref ? b : b.closest("[data-pref]");
    if (!group) return;
    const key = group.dataset.pref;
    const patch = { [key]: b.dataset.v };
    if (["reviewColor", "reviewFx", "reviewBrush", "reviewSize"].includes(key)) patch.reviewLook = "custom";
    setPrefs(patch, { keepMood: true });
  });
  dock.querySelector("#rvFx").addEventListener("change", (event) => setPrefs({ reviewFx: event.target.value, reviewLook: "custom" }, { keepMood: true }));
}

function setTunePanel(open) {
  review.panelOpen = open;
  const panel = refs.reviewDock.querySelector("#rvPanel");
  panel.classList.toggle("open", open);
  panel.inert = !open;
  refs.reviewDock.querySelector("#rvTune").setAttribute("aria-expanded", String(open));
  if (open) renderMaterialPreviews();
  wakeDock();
}

function applyLook(id) {
  const l = REVIEW.looks.find((x) => x.id === id);
  if (!l) return;
  setPrefs({ reviewLook: l.id, reviewColor: l.color, reviewFx: l.fx, reviewBrush: l.brush, reviewSize: l.size }, { keepMood: true });
}

// the dock steps aside while you read and returns when the pointer visits the top edge, a key is used, or Tune is open
function wakeDock() {
  const dock = refs.reviewDock;
  if (!dock) return;
  dock.classList.remove("away");
  window.clearTimeout(review.dockTimer);
  if (!review.on) return;
  review.dockTimer = window.setTimeout(() => {
    if (!review.panelOpen && !review.dockHover) dock.classList.add("away");
  }, 2800);
}

function syncReviewDock() {
  if (!refs.reviewDock || !state.prefs || !refs.reviewDock.querySelector("#rvFx")) return;
  rvNormalizePrefs();
  const p = state.prefs, d = refs.reviewDock;
  if (p.reviewLook !== review.lastLook) {             // follow the look onto its shelf; browsing shelves by hand is left alone
    review.lastLook = p.reviewLook;
    const l = REVIEW.looks.find((x) => x.id === p.reviewLook);
    if (l) review.tab = l.group;
  }
  d.querySelectorAll("[data-tab]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tab === review.tab)));
  d.querySelectorAll(".rv-look").forEach((b) => {
    b.hidden = b.dataset.group !== review.tab;
    b.setAttribute("aria-pressed", String(b.dataset.look === p.reviewLook));
  });
  d.querySelectorAll("[data-pref]").forEach((group) => {
    if (group.tagName === "BUTTON") group.setAttribute("aria-pressed", String(p[group.dataset.pref] === group.dataset.v));
    else group.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(p[group.dataset.pref] === b.dataset.v)));
  });
  d.querySelector("#rvFx").value = p.reviewFx;
  review.styles.clear();
  review.parts.length = 0;
  refs.reviewLens.classList.toggle("on", review.on && review.inside && p.reviewLens !== "off");
  applyReviewAtmosphere();
  renderLookPreviews();
  if (review.panelOpen) renderMaterialPreviews();
  if (review.on) { wakeDock(); scheduleReview(); }
}

// ---- thumbnails: a little stroke drawn by the real renderer
function reviewPreview(cv, brushId, colorId, scale) {
  const brush = REVIEW.brushes[brushId];
  if (!brush || !cv) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = Number(cv.dataset.w) || 60, H = Number(cv.dataset.h) || 34;
  if (cv.width !== Math.round(W * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = `${W}px`; cv.style.height = `${H}px`; }
  const c = cv.getContext("2d");
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, cv.width, cv.height);
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const now = 100000, life = brush.life, pts = [];
  const N = 44;
  for (let i = 0; i < N; i++) {                        // an S-curve; the tail is old, the head is fresh
    const u = i / (N - 1);
    pts.push({ x: W * (0.1 + 0.8 * u), y: H * (0.52 + 0.2 * Math.sin(u * 5.6 - 0.9)), t: now - (1 - u) * life * 0.72, b: i === 0, l: life, pen: false });
  }
  const saved = { dpr: review.dpr, now: review.now, pal: review.pal, bb: review.bb, w: review.w, h: review.h };
  try {
    review.dpr = dpr; review.now = now; review.w = W; review.h = H;
    review.bb = { x0: 0, y0: 0, x1: 0, y1: 0 };
    review.pal = rvPaletteFor(colorId, "none");
    paintStrokes(c, pts, now, { brush, pal: review.pal, st: null, sizeMul: scale, flick: 1 });
    const head = pts[pts.length - 1];
    paintLamp(c, { brush, pal: review.pal, sizeMul: scale, st: null }, head.x, head.y, 1, now);
  } finally {
    review.dpr = saved.dpr; review.now = saved.now; review.pal = saved.pal; review.bb = saved.bb; review.w = saved.w; review.h = saved.h;
  }
}

function renderLookPreviews() {
  if (!refs.reviewDock) return;
  const key = `${review.tab}|${review.dpr}`;
  refs.reviewDock.querySelectorAll(".rv-look").forEach((b) => {
    if (b.hidden || b.dataset.drawn === key) return;
    const l = REVIEW.looks.find((x) => x.id === b.dataset.look);
    if (!l) return;
    b.dataset.drawn = key;
    reviewPreview(b.querySelector("canvas"), l.brush, l.color, 0.5);
  });
}

function renderMaterialPreviews() {
  if (!refs.reviewDock) return;
  const key = `${state.prefs.reviewColor}|${review.dpr}`;
  if (review.matKey === key) return;
  review.matKey = key;
  refs.reviewDock.querySelectorAll(".rv-mat").forEach((b) => reviewPreview(b.querySelector("canvas"), b.dataset.v, state.prefs.reviewColor === "auto" ? "coral" : state.prefs.reviewColor, 0.62));
}

// the room takes on a faint tint of the beam colour: desk, lens shade and the pill's dot
function applyReviewAtmosphere() {
  const rgb = rvPaletteFor(state.prefs.reviewColor, state.prefs.reviewFx).base || [255, 125, 95], body = document.body;
  body.style.setProperty("--rv", rgb.join(","));
  if (review.on) {
    const d = rvMix([24, 25, 30], rgb, 0.07);
    body.style.setProperty("--desk", `rgb(${d.join(",")})`);
  } else body.style.removeProperty("--desk");
}

function reviewResize() {
  review.w = window.innerWidth; review.h = window.innerHeight;
  review.dpr = Math.min(window.devicePixelRatio || 1, 2);
  const t = refs.reviewTrail;
  t.width = Math.round(review.w * review.dpr); t.height = Math.round(review.h * review.dpr);
  const sc = REVIEW.lens.scale;
  review.lw = Math.max(2, Math.ceil(review.w * sc)); review.lh = Math.max(2, Math.ceil(review.h * sc));
  refs.reviewLens.width = review.lw; refs.reviewLens.height = review.lh;
  review.box = null;
  if (review.on) scheduleReview();
}

function setReview(on) {
  on = !!on;
  if (on === review.on) return;
  if (on && state.typeTool) setTypeTool(false);     // Review and the type tool are mutually exclusive
  review.on = on;
  refs.reviewBtn.setAttribute("aria-pressed", String(on));
  if (refs.reviewDock) refs.reviewDock.inert = !on;
  document.body.classList.toggle("review-mode", on);
  if (on) {
    reviewResize();
    if (!review.hinted) { review.hinted = true; toast("Review — 움직이면 빛이 따라와요 · 누른 채 드래그하면 오래 남고 · 클릭하면 핑 ✦"); }
  } else {
    review.pts.length = 0; review.parts.length = 0; review.pings.length = 0; review.emitAcc = 0;
    review.inside = false; review.lensReady = false; review.breakNext = true; review.hasFilter = false; review.down = false; review.lampA = 0;
    refs.reviewLens.classList.remove("on");
    clearTrailCanvas();
    setTunePanel(false);
  }
  applyReviewAtmosphere();
  updateHint();
  wakeDock();
  if (on) scheduleReview();
}

// ---- pointer input -> low-pass filtered points
// Raw mouse coordinates are integers and jitter by a pixel or two, which reads as a wobbly line once it is drawn thick.
// A speed-adaptive exponential filter (heavier when slow, nearly transparent when fast) removes that without making the
// head feel laggy; Catmull-Rom then turns the filtered points into a continuous curve.
function reviewBrush() { return REVIEW.brushes[state.prefs.reviewBrush] || REVIEW.brushes.laser; }

function onReviewMove(event) {
  if (!review.on || event.pointerType === "touch") return;
  const now = performance.now();
  const overPage = !!(event.target.closest && event.target.closest(".pdf-page"));
  if (overPage) {
    const list = event.getCoalescedEvents ? event.getCoalescedEvents() : null;
    const evs = list && list.length ? list : [event];
    for (let i = 0; i < evs.length; i++) {
      const e = evs[i];
      let t = e.timeStamp || now;
      if (t > now || now - t > 120) t = now;
      feedTrail(e.clientX, e.clientY, t);
    }
    if (review.pts.length > 900) { review.pts.splice(0, review.pts.length - 900); review.pts[0].b = true; }
    review.lastMoveT = now; review.restFired = false;
  } else {
    review.breakNext = true; review.hasFilter = false;   // never join a stroke across the desk / gaps between pages
  }
  if (event.clientY < 150) wakeDock();
  review.mx = event.clientX; review.my = event.clientY;
  if (!review.inside) {
    review.inside = true; review.lensReady = false; review.pmx = review.mx; review.pmy = review.my;
    if (state.prefs.reviewLens !== "off") refs.reviewLens.classList.add("on");
  }
  scheduleReview();
}

// press = a "ping" ring + a held pen stroke (lingers ~3 s); release returns to the short hover beam
function onReviewDown(event) {
  if (!review.on || event.button !== 0 || event.pointerType === "touch") return;
  if (!(event.target.closest && event.target.closest(".pdf-page"))) return;
  const now = performance.now();
  review.down = true; review.breakNext = true; review.hasFilter = false;
  feedTrail(event.clientX, event.clientY, now);
  review.mx = event.clientX; review.my = event.clientY;
  if (!review.inside) { review.inside = true; review.lensReady = false; if (state.prefs.reviewLens !== "off") refs.reviewLens.classList.add("on"); }
  review.pings.push({ x: event.clientX, y: event.clientY, t0: now, seed: Math.random() * 100 });
  review.lensPulseT = now;
  review.lastMoveT = now; review.restFired = true;
  const st = reviewStyle(state.prefs.reviewFx);
  if (st && st.rest && !reducedMotionQuery.matches) {
    for (let i = 0; i < st.rest.count; i++) spawnReviewParticle(st.rest, st, event.clientX, event.clientY, now, 0, 0, 0, true);
  }
  scheduleReview();
}

function onReviewUp() {
  if (!review.down) return;
  review.down = false; review.breakNext = true; review.hasFilter = false;
}

function feedTrail(x, y, t) {
  if (!review.hasFilter || review.breakNext) {
    review.sx = x; review.sy = y; review.st = t; review.rx = review.prx = x; review.ry = review.pry = y;
    review.hasFilter = true; review.breakNext = false;
    review.curPen = review.down;
    review.curL = reducedMotionQuery.matches ? 700 : review.down ? REVIEW.penLife : reviewBrush().life;
    review.pts.push({ x, y, t, b: true, l: review.curL, pen: review.curPen, sid: Math.random() * 997 });
    return;
  }
  stepTrailFilter(x, y, t);
}

function stepTrailFilter(x, y, t) {
  const dt = Math.min(80, Math.max(0.5, t - review.st));
  const speed = Math.hypot(x - review.prx, y - review.pry) / dt;       // px per ms
  const tau = 14 + 52 * Math.exp(-speed * 1.3);                         // ms: ~66 when crawling, ~15 when fast
  const a = 1 - Math.exp(-dt / tau);
  review.sx += (x - review.sx) * a; review.sy += (y - review.sy) * a;
  review.st = t; review.prx = review.rx = x; review.pry = review.ry = y;
  const last = review.pts[review.pts.length - 1];
  if (!last) { review.pts.push({ x: review.sx, y: review.sy, t, b: true, l: review.curL, pen: review.curPen, sid: Math.random() * 997 }); return; }
  if (Math.hypot(review.sx - last.x, review.sy - last.y) >= 0.7) review.pts.push({ x: review.sx, y: review.sy, t, b: false, l: review.curL, pen: review.curPen });
}

// each stroke fades from its tail; strokes with different lifetimes (hover vs pen) expire independently
function pruneTrail(now) {
  const pts = review.pts, n = pts.length;
  let w = 0, i = 0;
  while (i < n) {
    let e = i + 1;
    while (e < n && !pts[e].b) e++;
    let j = i;
    while (j < e && now - pts[j].t > pts[j].l) j++;
    let removed = 0;                                   // arc length of the expired tail: keeps arc-anchored materials from sliding
    for (let k = i; k < j && k + 1 < e; k++) removed += Math.hypot(pts[k + 1].x - pts[k].x, pts[k + 1].y - pts[k].y);
    const baseArc = (pts[i].arc || 0) + removed, sid = pts[i].sid;
    for (let k = j; k < e; k++) { const p = pts[k]; if (k === j && j > i) { p.b = true; p.arc = baseArc; p.sid = sid; } pts[w++] = p; }
    i = e;
  }
  pts.length = w;
}

function onReviewLeave() {
  review.breakNext = true; review.hasFilter = false;
  if (!review.inside) return;
  review.inside = false;
  refs.reviewLens.classList.remove("on");
}

function scheduleReview() {
  if (!review.raf) review.raf = requestAnimationFrame(reviewFrame);
}

function clearTrailCanvas() {
  const c = review.trailCtx;
  if (!c) return;
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, refs.reviewTrail.width, refs.reviewTrail.height);
  review.box = null;
}

function reviewFrame(now) {
  review.raf = 0;
  if (!review.on) return;
  const dt = Math.min(64, review.lastFrame ? now - review.lastFrame : 16);
  review.lastFrame = now;
  let more = false;
  review.pal = reviewPalette();
  review.tint = rvMix([14, 15, 20], review.pal.base, 0.14);

  if (review.inside) {
    const sp = Math.hypot(review.mx - review.pmx, review.my - review.pmy) / Math.max(1, dt);
    review.pmx = review.mx; review.pmy = review.my;
    review.lensSpeed += (Math.min(1, sp / 2.2) - review.lensSpeed) * (1 - Math.exp(-dt / 140));
    if (!review.lensReady) { review.lx = review.mx; review.ly = review.my; review.lensReady = true; }
    const k = 1 - Math.exp(-dt / 34);
    review.lx += (review.mx - review.lx) * k; review.ly += (review.my - review.ly) * k;
    drawLens(now);
    more = true;                                   // the pointer lamp breathes while the pointer is on the page
  }

  // let the filtered head settle onto the pointer when the mouse slows down or stops
  if (review.hasFilter && !review.breakNext && review.pts.length &&
      Math.hypot(review.rx - review.sx, review.ry - review.sy) > 0.35) {
    stepTrailFilter(review.rx, review.ry, now);
  }
  const lampTarget = review.hasFilter ? 1 : 0;
  review.lampA += (lampTarget - review.lampA) * (1 - Math.exp(-dt / 110));
  if (review.hasFilter) { review.lampX = review.sx; review.lampY = review.sy; }
  if (Math.abs(lampTarget - review.lampA) < 0.01) review.lampA = lampTarget;

  emitAlongLine(now);
  drawTrail(now);
  if (review.pts.length || review.parts.length || review.pings.length || review.lampA > 0.02) more = true;
  if (more) review.raf = requestAnimationFrame(reviewFrame); else review.lastFrame = 0;
}

// ---- the lens: dims the room around a clear zone. Spot = round, Ruler = a band to read one line at a time.
// It "breathes": slightly wider while the pointer moves fast, a soft swell on click.
function drawLens(now) {
  const mode = state.prefs.reviewLens;
  const c = review.lensCtx;
  if (!c || mode === "off") return;
  const L = REVIEW.lens, s = L.scale, spec = L.sizes[state.prefs.reviewLensSize] || L.sizes.m;
  const t = review.tint, dim = L.dim[mode] || 0.1;
  const col = (a) => `rgba(${t[0]},${t[1]},${t[2]},${a.toFixed(4)})`;
  const sm = (x) => x * x * (3 - 2 * x);
  const pulse = Math.max(0, 1 - (now - review.lensPulseT) / 520);
  const mult = (1 + 0.22 * pulse * pulse) * (1 + 0.08 * review.lensSpeed);
  c.clearRect(0, 0, review.lw, review.lh);
  let g;
  if (mode === "ruler") {
    const y = review.ly * s, half = spec.band * s * mult, ramp = spec.bandFeather * s;
    g = c.createLinearGradient(0, y - half - ramp, 0, y + half + ramp);
    const rf = ramp / (2 * (half + ramp));
    for (let i = 0; i <= 10; i++) {
      const u = i / 10;
      g.addColorStop(u * rf, col(dim * (1 - sm(u))));
      g.addColorStop(1 - rf + u * rf, col(dim * sm(u)));
    }
  } else {
    const x = review.lx * s, y = review.ly * s, r0 = spec.clear * s * mult;
    g = c.createRadialGradient(x, y, r0, x, y, r0 + spec.feather * s);
    for (let i = 0; i <= 10; i++) g.addColorStop(i / 10, col(dim * sm(i / 10)));   // smoothstep: no visible edge
  }
  c.fillStyle = g;
  c.fillRect(0, 0, review.lw, review.lh);
}

// ---- colour helpers
function hexToRgbArray(hex) {
  const clean = String(hex || "").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((ch) => ch + ch).join("") : clean;
  const n = Number.parseInt(full, 16);
  return Number.isNaN(n) ? [255, 104, 78] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rvMix(a, b, t) { return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)]; }
function rvHash(n) { const h = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return h - Math.floor(h); }
function rvRgba(a, al) { return `rgba(${a[0]},${a[1]},${a[2]},${al})`; }
function rvGrad(grad, phase) {
  const n = grad.length - 1, p = (((phase % 1) + 1) % 1) * n, i = Math.min(n - 1, Math.floor(p));
  let f = p - i; f = f * f * (3 - 2 * f);
  return rvMix(grad[i], grad[i + 1], f);
}
function rvComplement(rgb) { return [255 - rgb[0], Math.min(255, 255 - rgb[1] + 40), Math.min(255, 255 - rgb[2] + 40)]; }

// palette for one beam: base = representative colour (desk tint, lens shade), grad flows along the beam
function rvPaletteFor(id, fxKey) {
  if (id === "auto") {
    const m = rvMeta(fxKey);
    return { auto: true, grad: null, base: hexToRgbArray(m.primary), p1: hexToRgbArray(m.primary), p2: hexToRgbArray(m.secondary) };
  }
  const d = REVIEW.colors.find((c) => c.id === id) || REVIEW.colors[0];
  if (d.grad) return { auto: false, grad: d.grad, period: d.period, scatter: !!d.scatter, base: d.grad[1] };
  return { auto: false, grad: null, base: d.rgb };
}
function reviewPalette() { return rvPaletteFor(state.prefs.reviewColor, state.prefs.reviewFx); }
function rvAt(pal, t) { return pal.grad ? rvGrad(pal.grad, t / pal.period) : pal.base; }

// ---- soft sprites (radial ramps), cached per colour
function reviewSprite(def, rgb, gain = 1) {
  const q = (v) => (v & 0xf8) | 4;                   // quantise so soft random tints share sprites
  const r0 = q(rgb[0]), g0 = q(rgb[1]), b0 = q(rgb[2]);
  const key = `${def.id}:${r0},${g0},${b0}:${gain.toFixed(2)}:${review.dpr}`;
  let cv = review.sprites.get(key);
  if (cv) return cv;
  const px = Math.max(4, Math.ceil(def.R * 2 * review.dpr));
  cv = document.createElement("canvas");
  cv.width = cv.height = px;
  const c = cv.getContext("2d");
  const r = px / 2;
  let col = [r0, g0, b0];
  if (def.white) col = rvMix(col, [255, 255, 255], def.white);
  if (def.mix) col = rvMix(col, def.mix[0], def.mix[1]);
  const g = c.createRadialGradient(r, r, 0, r, r, r);
  for (let i = 0; i < def.stops.length; i++) g.addColorStop(def.stops[i][0], rvRgba(col, Math.min(1, def.stops[i][1] * gain).toFixed(3)));
  c.fillStyle = g;
  c.fillRect(0, 0, px, px);
  if (review.sprites.size > 1400) review.sprites.clear();
  review.sprites.set(key, cv);
  return cv;
}

// ---- grain tiles: a disc of dense micro-grains, stamped along the beam with random rotation.
// 'glitter' = fine metallic flecks in many shades (+ 'glitterHi' = only the brightest, flashed by a travelling sheen);
// 'crumb' = angular cookie crumbs. Seeded, so every tile of a colour is identical.
function rvTile(kind, rgb) {
  const q = (v) => (v & 0xf0) | 8;
  const col = [q(rgb[0]), q(rgb[1]), q(rgb[2])];
  const key = `${kind}:${col}:${review.dpr}`;
  let cv = review.tiles.get(key);
  if (cv) return cv;
  const S = 34, dpr = review.dpr;
  cv = document.createElement("canvas");
  cv.width = cv.height = Math.ceil(S * dpr);
  const c = cv.getContext("2d");
  c.scale(dpr, dpr); c.translate(S / 2, S / 2);
  let seed = 7 + kind.length * 131 + col[0] * 3 + col[1] * 5 + col[2] * 7;
  const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const hi = kind === "glitterHi", crumb = kind === "crumb";
  const n = crumb ? 56 : hi ? 70 : 150;
  for (let i = 0; i < n; i++) {
    const ang = rnd() * 6.2832, rad = Math.sqrt(rnd()) * 14.5;
    const x = Math.cos(ang) * rad, y = Math.sin(ang) * rad;
    const fall = Math.min(1, Math.max(0, (1 - rad / 14.5) * 2.6));
    let t, size;
    if (crumb) { t = -0.62 + 0.95 * rnd(); size = 1.3 + 2.4 * Math.pow(rnd(), 1.6); }
    else { t = -0.34 + 1.45 * Math.pow(rnd(), 1.1); size = 0.45 + 1.6 * Math.pow(rnd(), 2.1); if (hi && t < 0.5) continue; }
    const tone = hi ? rvMix(col, [255, 255, 255], 0.9) : t < 0 ? rvMix(col, [18, 6, 14], -t * 0.78) : rvMix(col, [255, 255, 255], Math.min(1, t * 0.92));
    c.globalAlpha = fall * (0.6 + 0.4 * rnd());
    c.fillStyle = `rgb(${tone[0]},${tone[1]},${tone[2]})`;
    c.save(); c.translate(x, y); c.rotate(rnd() * 6.2832);
    if (crumb) {
      c.beginPath();
      const m = 5 + Math.floor(rnd() * 2);
      for (let k = 0; k < m; k++) { const a = (k / m) * 6.2832, r = size * (0.62 + 0.62 * rnd()); k ? c.lineTo(Math.cos(a) * r, Math.sin(a) * r) : c.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
      c.closePath(); c.fill();
      c.globalAlpha *= 0.4; c.strokeStyle = `rgb(${rvMix(col, [50, 24, 10], 0.6)})`; c.lineWidth = 0.5; c.stroke();
    } else {
      c.fillRect(-size * 0.5, -size * (0.25 + 0.3 * rnd()), size, size * (0.5 + 0.6 * rnd()));
    }
    c.restore();
  }
  if (crumb) {                                         // pores: tiny dark pits in the dough
    for (let i = 0; i < 40; i++) {
      const ang = rnd() * 6.2832, rad = Math.sqrt(rnd()) * 13.5, fall = Math.min(1, (1 - rad / 14.5) * 2.6);
      c.globalAlpha = 0.5 * fall; c.fillStyle = `rgb(${rvMix(col, [44, 20, 8], 0.72)})`;
      c.beginPath(); c.arc(Math.cos(ang) * rad, Math.sin(ang) * rad, 0.35 + 0.5 * rnd(), 0, 6.2832); c.fill();
    }
  }
  if (review.tiles.size > 260) review.tiles.clear();
  review.tiles.set(key, cv);
  return cv;
}

// ---- cut gemstones, rendered once per shape/colour into a sprite, then stamped and flashed live.
// Light comes from the upper-left; every facet is shaded by the direction it faces, with alternating facets nudged
// lighter/darker (that alternation is what reads as "cut stone"), a bright table, a dark girdle edge and a specular spot.
const RV_LA = -2.356;
function rvGemTone(rgb, t) { return t >= 0 ? rvMix(rgb, [255, 255, 255], Math.min(1, t) * 0.8) : rvMix(rgb, rvMix([10, 6, 22], rgb, 0.18), Math.min(1, -t) * 0.66); }
function rvPoly(c, pts) { c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.closePath(); }
function rvHeartPts(R, n) {
  const out = [], k = R / 17;
  for (let i = 0; i < n; i++) { const t = (i / n) * 6.2832; out.push([16 * Math.pow(Math.sin(t), 3) * k, -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * k + R * 0.1]); }
  return out;
}
function rvPearPts(R, n) {
  const out = [];
  for (let i = 0; i < n; i++) { const t = (i / n) * 6.2832; out.push([R * 1.12 * Math.sin(t) * Math.sin(t / 2), -R * 0.98 * Math.cos(t)]); }
  return out;
}
function rvEmeraldPts(R, s = 1) {
  const w = R * 0.78 * s, h = R * 0.98 * s, k = R * 0.3 * s;
  return [[-w + k, -h], [w - k, -h], [w, -h + k], [w, h - k], [w - k, h], [-w + k, h], [-w, h - k], [-w, -h + k]];
}
function rvDrawRingGem(c, outer, inner, rgb) {
  const n = outer.length, tone = (t) => rvGemTone(rgb, t), fill = (t) => { const a = tone(t); return `rgb(${a[0]},${a[1]},${a[2]})`; };
  c.fillStyle = fill(-0.45); rvPoly(c, outer); c.fill();
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, quad = [outer[i], outer[j], inner[j], inner[i]];
    const mx = (outer[i][0] + outer[j][0] + inner[i][0] + inner[j][0]) / 4, my = (outer[i][1] + outer[j][1] + inner[i][1] + inner[j][1]) / 4;
    const t = 0.98 * Math.cos(Math.atan2(my, mx) - RV_LA) + (i % 2 ? 0.24 : -0.24);
    c.fillStyle = fill(t); rvPoly(c, quad); c.fill();
    c.strokeStyle = "rgba(255,255,255,0.42)"; c.lineWidth = 0.5; c.stroke();
  }
  const bx = inner.reduce((s, p) => s + p[0], 0) / n, by = inner.reduce((s, p) => s + p[1], 0) / n;
  const g = c.createLinearGradient(bx - 5, by - 5, bx + 5, by + 5);
  const g0 = tone(0.88), g1 = tone(-0.08);
  g.addColorStop(0, `rgb(${g0})`); g.addColorStop(1, `rgb(${g1})`);
  c.fillStyle = g; rvPoly(c, inner); c.fill();
  c.strokeStyle = "rgba(255,255,255,0.55)"; c.lineWidth = 0.6; c.stroke();
  c.fillStyle = "rgba(255,255,255,0.5)"; rvPoly(c, inner.map((p) => [bx + (p[0] - bx) * 0.5 - 0.7, by + (p[1] - by) * 0.5 - 0.8])); c.fill();
  c.strokeStyle = `rgba(${tone(-0.8)},0.9)`; c.lineWidth = 0.9; rvPoly(c, outer); c.stroke();
}
function rvDrawRoundGem(c, R, rgb) {
  const tone = (t) => rvGemTone(rgb, t), fill = (t) => `rgb(${tone(t)})`;
  const g = c.createRadialGradient(-R * 0.25, -R * 0.3, R * 0.1, 0, 0, R);
  g.addColorStop(0, fill(0.4)); g.addColorStop(1, fill(-0.5));
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, R, 0, 6.2832); c.fill();
  const rt = R * 0.46, V = [], G = [];
  for (let k = 0; k < 8; k++) {
    V.push([Math.cos(k * 0.7854 + 0.3927) * rt, Math.sin(k * 0.7854 + 0.3927) * rt]);
    G.push([Math.cos(k * 0.7854) * R * 0.985, Math.sin(k * 0.7854) * R * 0.985]);
  }
  c.lineWidth = 0.5; c.strokeStyle = "rgba(255,255,255,0.45)";
  for (let k = 0; k < 8; k++) {
    c.fillStyle = fill(1.0 * Math.cos(k * 0.7854 - RV_LA) + (k % 2 ? 0.24 : -0.24));
    rvPoly(c, [V[(k + 7) % 8], V[k], G[k]]); c.fill(); c.stroke();
  }
  for (let k = 0; k < 8; k++) {
    c.fillStyle = fill(0.88 * Math.cos(k * 0.7854 + 0.3927 - RV_LA) + (k % 2 ? -0.26 : 0.26));
    rvPoly(c, [G[k], V[k], G[(k + 1) % 8]]); c.fill(); c.stroke();
  }
  const tg = c.createLinearGradient(-rt, -rt, rt, rt);
  tg.addColorStop(0, fill(0.9)); tg.addColorStop(1, fill(-0.05));
  c.fillStyle = tg; rvPoly(c, V); c.fill(); c.stroke();
  c.fillStyle = "rgba(255,255,255,0.5)"; rvPoly(c, V.map((p) => [p[0] * 0.5 - rt * 0.1, p[1] * 0.5 - rt * 0.12])); c.fill();
  c.strokeStyle = `rgba(${tone(-0.8)},0.95)`; c.lineWidth = R * 0.085; c.beginPath(); c.arc(0, 0, R * 0.99, 0, 6.2832); c.stroke();
  c.fillStyle = "rgba(255,255,255,0.92)"; c.beginPath(); c.ellipse(-R * 0.43, -R * 0.47, R * 0.17, R * 0.095, -0.75, 0, 6.2832); c.fill();
}
function rvGem(shape, rgb) {
  const q = (v) => (v & 0xf0) | 8, col = [q(rgb[0]), q(rgb[1]), q(rgb[2])];
  const key = `${shape}:${col}:${review.dpr}`;
  let cv = review.gems.get(key);
  if (cv) return cv;
  const R = 14, S = (R + 3) * 2, dpr = review.dpr;
  cv = document.createElement("canvas");
  cv.width = cv.height = Math.ceil(S * dpr);
  const c = cv.getContext("2d");
  c.scale(dpr, dpr); c.translate(S / 2, S / 2);
  if (shape === "heart") rvDrawRingGem(c, rvHeartPts(R, 20), rvHeartPts(R * 0.5, 20).map((p) => [p[0], p[1] - 1]), col);
  else if (shape === "pear") rvDrawRingGem(c, rvPearPts(R, 20), rvPearPts(R * 0.5, 20).map((p) => [p[0], p[1] - 0.6]), col);
  else if (shape === "emerald") rvDrawRingGem(c, rvEmeraldPts(R, 1), rvEmeraldPts(R, 0.6), col);
  else rvDrawRoundGem(c, R, col);
  if (review.gems.size > 420) review.gems.clear();
  review.gems.set(key, cv);
  return cv;
}

// ---- whipped cream: a soft shaded ball (light top-left, shaded lower-right). Hundreds of them at random sizes and offsets
// overlap into a puffy, irregular mass, so it reads as foam rather than as a repeated pattern.
function rvCreamBall(rgb) {
  const q = (v) => (v & 0xf0) | 8, col = [q(rgb[0]), q(rgb[1]), q(rgb[2])];
  const key = `${col}:${review.dpr}`;
  let cv = review.dollops.get(key);
  if (cv) return cv;
  const R = 12, S = R * 2 + 4, dpr = review.dpr;
  cv = document.createElement("canvas");
  cv.width = cv.height = Math.ceil(S * dpr);
  const c = cv.getContext("2d");
  c.scale(dpr, dpr); c.translate(S / 2, S / 2);
  const light = rvMix(col, [255, 255, 255], 0.82), mid = rvMix(col, [255, 255, 255], 0.3), shade = rvMix(col, [150, 84, 110], 0.2);
  const g = c.createRadialGradient(-R * 0.34, -R * 0.4, R * 0.05, 0, 0, R * 1.08);
  g.addColorStop(0, `rgb(${light})`); g.addColorStop(0.38, `rgb(${mid})`); g.addColorStop(0.72, `rgb(${col})`); g.addColorStop(1, `rgb(${shade})`);
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, R, 0, 6.2832); c.fill();
  c.strokeStyle = `rgba(${rvMix(col, [150, 80, 104], 0.5)},0.1)`; c.lineWidth = 0.7; c.beginPath(); c.arc(0, 0, R - 0.35, 0, 6.2832); c.stroke();
  if (review.dollops.size > 200) review.dollops.clear();
  review.dollops.set(key, cv);
  return cv;
}

// ---- marshmallow puff: feathered edge, pillowy light, almost no contrast (airier and softer than cream)
function rvPuffBall(rgb) {
  const q = (v) => (v & 0xf0) | 8, col = [q(rgb[0]), q(rgb[1]), q(rgb[2])];
  const key = `puff:${col}:${review.dpr}`;
  let cv = review.dollops.get(key);
  if (cv) return cv;
  const R = 12, S = R * 2 + 4, dpr = review.dpr;
  cv = document.createElement("canvas");
  cv.width = cv.height = Math.ceil(S * dpr);
  const c = cv.getContext("2d");
  c.scale(dpr, dpr); c.translate(S / 2, S / 2);
  const g = c.createRadialGradient(-R * 0.3, -R * 0.35, R * 0.05, 0, 0, R * 1.05);
  g.addColorStop(0, rvRgba(rvMix(col, [255, 255, 255], 0.7), 0.97)); g.addColorStop(0.42, rvRgba(rvMix(col, [255, 255, 255], 0.28), 0.94));
  g.addColorStop(0.76, rvRgba(col, 0.7)); g.addColorStop(1, rvRgba(rvMix(col, [150, 110, 100], 0.2), 0));
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, R * 1.05, 0, 6.2832); c.fill();
  const sh = rvMix(col, [150, 108, 104], 0.5), g2 = c.createRadialGradient(R * 0.3, R * 0.36, R * 0.1, R * 0.3, R * 0.36, R * 1.15);   // a soft underside
  g2.addColorStop(0, rvRgba(sh, 0)); g2.addColorStop(0.7, rvRgba(sh, 0.12)); g2.addColorStop(1, rvRgba(sh, 0.34));
  c.save(); c.beginPath(); c.arc(0, 0, R * 1.0, 0, 6.2832); c.clip(); c.fillStyle = g2; c.fillRect(-R * 1.1, -R * 1.1, R * 2.2, R * 2.2); c.restore();
  if (review.dollops.size > 260) review.dollops.clear();
  review.dollops.set(key, cv);
  return cv;
}
// ---- a tongue of energy: bright at the base, thinning to a flickering tip
function rvFlame(rgb) {
  const q = (v) => (v & 0xf0) | 8, col = [q(rgb[0]), q(rgb[1]), q(rgb[2])];
  const key = `fl:${col}:${review.dpr}`;
  let cv = review.dollops.get(key);
  if (cv) return cv;
  const W = 28, H = 56, dpr = review.dpr;
  cv = document.createElement("canvas");
  cv.width = Math.ceil(W * dpr); cv.height = Math.ceil(H * dpr);
  const c = cv.getContext("2d");
  c.scale(dpr, dpr);
  const g = c.createLinearGradient(0, H, 0, 0);
  g.addColorStop(0, rvRgba(rvMix(col, [255, 255, 255], 0.45), 0.9)); g.addColorStop(0.3, rvRgba(col, 0.78)); g.addColorStop(0.75, rvRgba(col, 0.26)); g.addColorStop(1, rvRgba(col, 0));
  c.fillStyle = g; c.beginPath(); c.moveTo(14, 56); c.bezierCurveTo(1, 52, 3, 30, 14, 2); c.bezierCurveTo(25, 30, 27, 52, 14, 56); c.fill();
  const g2 = c.createLinearGradient(0, H, 0, 10);
  g2.addColorStop(0, "rgba(255,255,255,0.7)"); g2.addColorStop(1, "rgba(255,255,255,0)");
  c.fillStyle = g2; c.beginPath(); c.moveTo(14, 56); c.bezierCurveTo(7, 53, 9, 38, 14, 14); c.bezierCurveTo(19, 38, 21, 53, 14, 56); c.fill();
  if (review.dollops.size > 260) review.dollops.clear();
  review.dollops.set(key, cv);
  return cv;
}

// ---- smooth curve: centripetal Catmull-Rom through the filtered points, sampled every `spacing` px.
// Yields per vertex: time (vt), lifetime (vl), pointer speed (vs), arc length from the stroke's true start (va; arcBase
// keeps it stable while the tail expires) and the normal (vnx, vny).
function buildPath(pts, i0, i1, spacing, arcBase) {
  const vx = review.vx, vy = review.vy, vt = review.vt, vl = review.vl, vs = review.vs, va = review.va, vnx = review.vnx, vny = review.vny;
  vx.length = vy.length = vt.length = vl.length = vs.length = va.length = vnx.length = vny.length = 0;
  const n = i1 - i0;
  let sp = [];
  for (let k = 0; k < n; k++) sp.push({ x: pts[i0 + k].x, y: pts[i0 + k].y, t: pts[i0 + k].t });
  for (let pass = 0; pass < 2 && n > 3; pass++) {       // two passes of [1 2 1]/4 (ends pinned) iron out residual jitter
    const nx = sp.map((p) => ({ x: p.x, y: p.y, t: p.t }));
    for (let k = 1; k < n - 1; k++) {
      nx[k].x = sp[k - 1].x * 0.25 + sp[k].x * 0.5 + sp[k + 1].x * 0.25;
      nx[k].y = sp[k - 1].y * 0.25 + sp[k].y * 0.5 + sp[k + 1].y * 0.25;
    }
    sp = nx;
  }
  const pv = new Array(n).fill(0);                       // pointer speed per point (px/ms), smoothed
  for (let k = 0; k < n - 1; k++) pv[k] = Math.hypot(sp[k + 1].x - sp[k].x, sp[k + 1].y - sp[k].y) / Math.max(1, sp[k + 1].t - sp[k].t);
  pv[n - 1] = pv[Math.max(0, n - 2)];
  for (let pass = 0; pass < 3; pass++) {
    const nv = pv.slice();
    for (let k = 1; k < n - 1; k++) nv[k] = pv[k - 1] * 0.25 + pv[k] * 0.5 + pv[k + 1] * 0.25;
    for (let k = 0; k < n; k++) pv[k] = nv[k];
  }
  const L = pts[i0].l;
  const at = (k) => sp[k];
  for (let k = 0; k < n - 1; k++) {
    const p1 = at(k), p2 = at(k + 1);
    const p0 = k > 0 ? at(k - 1) : { x: 2 * p1.x - p2.x, y: 2 * p1.y - p2.y };
    const p3 = k < n - 2 ? at(k + 2) : { x: 2 * p2.x - p1.x, y: 2 * p2.y - p1.y };
    const d12 = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.max(1, Math.min(300, Math.ceil(d12 / spacing)));
    if (k === 0) { vx.push(p1.x); vy.push(p1.y); vt.push(p1.t); vl.push(L); vs.push(pv[0]); }
    const t0 = 0;
    const t1 = t0 + Math.sqrt(Math.max(1e-3, Math.hypot(p1.x - p0.x, p1.y - p0.y)));
    const t2 = t1 + Math.sqrt(Math.max(1e-3, d12));
    const t3 = t2 + Math.sqrt(Math.max(1e-3, Math.hypot(p3.x - p2.x, p3.y - p2.y)));
    for (let s = 1; s <= steps; s++) {
      const f = s / steps, t = t1 + (t2 - t1) * f;
      const a1x = (p0.x * (t1 - t) + p1.x * (t - t0)) / (t1 - t0), a1y = (p0.y * (t1 - t) + p1.y * (t - t0)) / (t1 - t0);
      const a2x = (p1.x * (t2 - t) + p2.x * (t - t1)) / (t2 - t1), a2y = (p1.y * (t2 - t) + p2.y * (t - t1)) / (t2 - t1);
      const a3x = (p2.x * (t3 - t) + p3.x * (t - t2)) / (t3 - t2), a3y = (p2.y * (t3 - t) + p3.y * (t - t2)) / (t3 - t2);
      const b1x = (a1x * (t2 - t) + a2x * (t - t0)) / (t2 - t0), b1y = (a1y * (t2 - t) + a2y * (t - t0)) / (t2 - t0);
      const b2x = (a2x * (t3 - t) + a3x * (t - t1)) / (t3 - t1), b2y = (a2y * (t3 - t) + a3y * (t - t1)) / (t3 - t1);
      vx.push((b1x * (t2 - t) + b2x * (t - t1)) / (t2 - t1));
      vy.push((b1y * (t2 - t) + b2y * (t - t1)) / (t2 - t1));
      vt.push(p1.t + (p2.t - p1.t) * f);
      vl.push(L);
      vs.push(pv[k] + (pv[k + 1] - pv[k]) * f);
    }
  }
  const m = vx.length;
  let acc = arcBase || 0;
  for (let i = 0; i < m; i++) {
    if (i) acc += Math.hypot(vx[i] - vx[i - 1], vy[i] - vy[i - 1]);
    va.push(acc);
    const a = Math.max(0, i - 1), b = Math.min(m - 1, i + 1);
    const dx = vx[b] - vx[a], dy = vy[b] - vy[a], len = Math.hypot(dx, dy) || 1;
    vnx.push(-dy / len); vny.push(dx / len);
  }
}

// ==== Accents ====================================================================================================
// Each accent is born from the beam (on the same canvas, in the beam's colour, tied to the beam's age) and has its own
// character: soft glows / pixel-glitch dashes / lightning arcs / pearl pigment / cut crystal / soap bubbles ...
// Typing-FX presets that overlapped (Magnetic Flip, Mosaic Shift, Ripple Lens, Plasma Thread, Keycap Pop, Velvet Smoke)
// are folded into the survivors below; the typing effects themselves are untouched.
const RV_META = {
  "moon-pearl":    { primary: "#ead9ee", secondary: "#bfe3f2" },
  "crystal-glass": { primary: "#cfe3fa", secondary: "#f2e6ff" },
  "neon-rain":     { primary: "#ff72d2", secondary: "#54e5ff" },
  "paper-fiber":   { primary: "#e4d6bd", secondary: "#faf4e8" },
  "bubble":        { primary: "#9fd8ff", secondary: "#ffc2e8" },
  "electric":      { primary: "#906fff", secondary: "#ffe45f" },
  "cyber-pink":    { primary: "#ff3fa4", secondary: "#3fe0ff" },
  "glitter-dust":  { label: "Glitter Dust",  primary: "#e8549e", secondary: "#ffe4f2" },
  "sw-crumbs":     { label: "Cookie Crumbs", primary: "#d29856", secondary: "#5c3a26" },
  "sw-sprinkles":  { label: "Sprinkles",     primary: "#ff80a0", secondary: "#ffc454" },
  "sw-berry":      { label: "Berries",       primary: "#e83e56", secondary: "#ffd2dc" },
  "sw-sugar":      { label: "Sugar Crystals",primary: "#ffffff", secondary: "#e9dcff" },
  "sw-honey":      { label: "Honey Drip",    primary: "#eea824", secondary: "#ffd98a" }
};
const RV_ACCENT_GROUPS = [
  ["Light & sparkle", ["soft-spark", "star-dust", "constellation", "moon-pearl", "crystal-glass", "firefly-glow", "ember-glow", "aurora-veil"]],
  ["Soft & playful", ["bubble", "candy-pop", "petal-bloom", "ink", "paper-fiber"]],
  ["Pixel & neon", ["pixel", "cyber-pink", "electric", "neon-rain", "laser-etch"]],
  ["Shine", ["glitter-dust"]],
  ["Sweet", ["sw-crumbs", "sw-sprinkles", "sw-berry", "sw-sugar", "sw-honey"]]
];
const RV_ALIAS = { "velvet-smoke": "aurora-veil", "keycap-pop": "pixel", "magnetic-flip": "pixel", "mosaic-shift": "pixel", "ripple-lens": "bubble",
  "plasma-thread": "electric", "sw-pearls": "moon-pearl", "sw-hearts": "candy-pop", "sw-cocoa": "sw-crumbs" };
function rvResolveFx(id) {
  if (!id || id === "none") return "none";
  const k = RV_ALIAS[id] || id;
  return RV_ACCENT_GROUPS.some(([, keys]) => keys.includes(k)) ? k : "none";
}
function rvMeta(k) { return RV_META[k] || (typeof EFFECT_PRESETS !== "undefined" && EFFECT_PRESETS[k]) || RV_META["glitter-dust"]; }
function rvAccentLabel(k) { return (typeof EFFECT_PRESETS !== "undefined" && EFFECT_PRESETS[k] && EFFECT_PRESETS[k].label) || (RV_META[k] && RV_META[k].label) || k; }

const RV_SPR = [[255, 128, 160], [255, 196, 84], [110, 208, 178], [160, 140, 236], [255, 150, 100]];
const RV_FX = {
  "soft-spark": {   // warm and round: glowing motes, small twinkles, slow drift
    shimmer: { shape: "star4", every: 44, prob: 0.66, size: [6, 11], life: 900 },
    shed: { gap: 22, shape: "dot", size: [2.2, 4.6], speed: [12, 36], dir: "normal", lift: -8, life: [600, 1000] },
    rest: { count: 6, shape: "star4", size: [4, 7], speed: [26, 62], life: [560, 900] },
    line: { halo: 1.35, core: 1.1 }
  },
  "star-dust": {    // fine, dense, many tiny stars
    shimmer: { shape: "star4", every: 30, prob: 0.8, size: [3, 6.5], life: 760 },
    shed: { gap: 10, shape: "dot", size: [1, 2.2], speed: [10, 40], dir: "normal", life: [700, 1200] },
    rest: { count: 10, shape: [["dot", 3], ["star4", 1]], size: [1.4, 4], speed: [20, 70], life: [600, 1000] },
    line: { halo: 1.2, core: 1.1 }
  },
  "constellation": { // stars on the beam joined by hairlines
    shimmer: { shape: "star4", every: 55, prob: 0.75, size: [4, 7], life: 1400, link: true }, shed: null,
    rest: { count: 5, shape: "star4", size: [3.5, 6], speed: [26, 60], life: [700, 1100] },
    line: { halo: 1.2, core: 1.1 }
  },
  "moon-pearl": {   // pearl pigment: iridescent spheres + pearl powder, always in its own pearl palette
    own: [[248, 234, 242], [226, 240, 252], [252, 242, 226], [238, 228, 250]],
    shimmer: { shape: "pearl2", every: 58, prob: 0.55, size: [4.2, 7], life: 1300 },
    shed: { gap: 14, shape: [["powder", 6], ["pearl2", 1]], size: [1.4, 3.2], speed: [8, 26], dir: "normal", lift: -6, life: [800, 1300] },
    rest: { count: 8, shape: [["powder", 4], ["pearl2", 1]], size: [1.6, 3.8], speed: [14, 40], life: [800, 1200] },
    line: { halo: 1.15, core: 1.05 }
  },
  "crystal-glass": { // cut crystal shards with a prism flash, always clear/icy
    own: [[236, 244, 255], [206, 226, 252], [246, 236, 255]],
    shimmer: { shape: "crystal", every: 64, prob: 0.5, size: [5, 9], life: 980 },
    shed: { gap: 28, shape: "crystal", size: [3, 5.4], speed: [6, 22], dir: "down", grav: 60, spin: 2, life: [800, 1300] },
    rest: { count: 5, shape: "crystal", size: [3.4, 6], speed: [20, 54], grav: 60, spin: 2, life: [800, 1200] },
    line: { halo: 1.25, core: 1.15 }
  },
  "firefly-glow": {  // Orbit Pulse: slow pulsing orbs rising
    shimmer: { shape: "dot", every: 70, prob: 0.4, size: [3, 6], life: 1000 },
    shed: { gap: 24, shape: "ember", size: [3, 5.8], speed: [8, 22], dir: "up", lift: -26, life: [1100, 1800], flicker: true },
    rest: { count: 5, shape: "ember", size: [3, 5.4], speed: [12, 30], lift: -26, life: [1000, 1600], flicker: true },
    line: { halo: 1.4, core: 1.05 }
  },
  "ember-glow": {    // Comet Tail: embers streaming backwards behind the head
    shed: { gap: 11, shape: "ember", size: [2, 4.2], speed: [14, 46], dir: "back", life: [600, 1100], flicker: true },
    shimmer: null,
    rest: { count: 6, shape: "ember", size: [2.4, 4.4], speed: [20, 54], life: [600, 1000], flicker: true },
    line: { halo: 1.3, core: 1.1 }
  },
  "aurora-veil": {   // drifting colour haze
    hue: true, shimmer: null,
    shed: { gap: 16, shape: "smoke", size: [7, 13], speed: [6, 18], dir: "normal", lift: -22, life: [760, 1250], alpha: 0.2 },
    rest: { count: 5, shape: "smoke", size: [8, 14], speed: [10, 26], life: [800, 1200], alpha: 0.22 },
    line: { halo: 1.3, core: 0.9 }
  },
  "bubble": {        // iridescent soap bubbles that rise and pop
    own: [[255, 255, 255]],
    shimmer: { shape: "bubble", every: 84, prob: 0.38, size: [5, 10], life: 1100 },
    shed: { gap: 30, shape: "bubble", size: [3.5, 8], speed: [6, 18], dir: "up", lift: -38, life: [1000, 1600] },
    rest: { count: 4, shape: "bubble", size: [4, 8], speed: [10, 30], lift: -38, life: [1000, 1500] },
    line: { halo: 1, core: 1 }
  },
  "candy-pop": {     // pastel confetti
    shimmer: { shape: "dot", every: 58, prob: 0.5, size: [3, 6], life: 900 },
    shed: { gap: 18, shape: [["sprinkle", 3], ["dot", 2]], size: [2.4, 4.4], speed: [22, 64], dir: "out", grav: 150, spin: 4, life: [460, 820] },
    rest: { count: 8, shape: [["sprinkle", 3], ["dot", 2]], size: [2.6, 4.6], speed: [30, 80], grav: 150, spin: 4, life: [500, 860] },
    line: { halo: 1.1, core: 1 }
  },
  "petal-bloom": {   // Origami Fold: folded-paper planes and kites, creased and two-toned
    shimmer: { shape: "fold", every: 90, prob: 0.3, size: [3.6, 5.6], life: 1100 },
    shed: { gap: 30, shape: [["plane", 1], ["fold", 3]], size: [4.4, 7], speed: [10, 30], dir: "normal", lift: -8, grav: 50, spin: 2.2, life: [900, 1400] },
    rest: { count: 6, shape: [["plane", 1], ["fold", 3]], size: [4.4, 7], speed: [20, 50], grav: 50, spin: 2.2, life: [900, 1300] },
    line: { halo: 0.9, core: 0.95 }
  },
  "ink": {           // drops that gather and fall
    shimmer: { shape: "drop", every: 90, prob: 0.35, size: [2, 3.6], life: 520 },
    shed: { gap: 22, shape: "drop", size: [1.8, 3.6], speed: [8, 26], dir: "down", grav: 240, life: [520, 920] },
    rest: { count: 4, shape: "drop", size: [2.2, 4], speed: [14, 40], grav: 240, life: [560, 900] },
    line: { halo: 0.45, core: 1 }
  },
  "paper-fiber": {   // the faintest inclusions of fine paper: tiny warm flecks, no strands
    own: [[250, 244, 232], [236, 224, 206], [216, 202, 180], [255, 252, 246]], tintBeam: 0.14,
    shimmer: { shape: "speck", every: 34, prob: 0.6, size: [1.3, 2.6], life: 1500, spread: 5 },
    shed: { gap: 14, shape: "speck", size: [1, 2.2], speed: [3, 10], dir: "normal", life: [1000, 1700], alpha: 0.75 },
    rest: { count: 6, shape: "speck", size: [1.2, 2.4], speed: [6, 18], life: [900, 1500], alpha: 0.75 },
    line: { halo: 0.5, core: 0.85 }
  },
  "pixel": {         // crisp blocks on a grid, shaded in three tones, dissolving by dither
    shimmer: { shape: "pxstar", every: 56, prob: 0.5, size: [2.6, 4.2], life: 640, snap: 3 },
    shed: { gap: 18, shape: "pxsq", size: [1.8, 3], speed: [14, 52], dir: "normal", grav: 120, life: [460, 800], snap: 3 },
    rest: { count: 8, shape: "pxsq", size: [1.8, 3], speed: [24, 70], grav: 120, life: [480, 820], snap: 3 },
    line: { halo: 0.5, core: 1.05 }
  },
  "cyber-pink": {    // digital glitch: duotone split dashes and data blocks
    shimmer: { shape: "glitchdash", every: 46, prob: 0.62, size: [8, 14], life: 400 },
    shed: { gap: 16, shape: "pxsq", size: [1.6, 2.6], speed: [20, 70], dir: "normal", life: [260, 520], snap: 2 },
    rest: { count: 5, shape: "glitchdash", size: [6, 10], speed: [20, 60], life: [300, 520] },
    line: { halo: 1.6, core: 1.2 }
  },
  "electric": {      // the typing Electric, carried over: a glowing core, lightning-bolt snaps that spin and shrink, a thin flash line
    elec: true,
    shimmer: { shape: "ecore", every: 54, prob: 0.55, size: [2.6, 3.4], life: 380, spread: 0.45, raw: true },
    shed: { gap: 15, shape: "bolt", size: [22, 28], speed: [120, 200], dir: "normal", spin: 7, life: [300, 400], raw: true },
    shedExtra: { prob: 0.24, spec: { shape: "eflash", size: [1.7, 2.2], speed: [0, 0], dir: "normal", life: [240, 320], raw: true } },
    rest: { count: 7, shape: "bolt", size: [22, 28], speed: [130, 210], spin: 7, life: [320, 420], raw: true },
    restExtra: { shape: "eflash", size: [2, 2.4], speed: [0, 0], life: [260, 340], raw: true },
    line: { halo: 1.9, core: 1.4 }
  },
  "neon-rain": {     // one lone neon tube in the night: rain falling at one angle, puddle ripples when still
    own: [[255, 63, 164], [63, 224, 255]],
    shimmer: null,
    shed: { gap: 26, shape: "rain", size: [7, 12], speed: [340, 420], angle: -0.22, nodrag: true, life: [300, 480] },
    rest: { count: 2, shape: "ripple", size: [6, 10], speed: [0, 0], life: [900, 1200] },
    line: { halo: 2.1, core: 1.3, flicker: true }
  },
  "laser-etch": {    // measured ticks like a gauge
    shimmer: { shape: "tick", every: 34, prob: 0.8, size: [4, 7], life: 520 }, shed: null,
    rest: { count: 6, shape: "tick", size: [4, 7], speed: [30, 70], life: [300, 520] },
    line: { halo: 0.8, core: 1.35 }
  },
  "glitter-dust": {  // fine glitter confetti catching light
    shimmer: { shape: "glint", every: 40, prob: 0.7, size: [3, 7], life: 700 },
    shed: { gap: 13, shape: "flake", size: [1.4, 3], speed: [14, 50], dir: "normal", grav: 30, life: [620, 1100], flicker: true },
    rest: { count: 10, shape: "flake", size: [1.6, 3.2], speed: [30, 90], grav: 30, life: [650, 1000], flicker: true },
    line: { halo: 1.1, core: 1.1 }
  },
  "sw-crumbs": {     // chocolate chips set in the line, crumbs falling
    shimmer: { shape: "chip", every: 92, prob: 0.32, size: [3.4, 5], life: 1700 },
    shed: { gap: 22, shape: [["crumb", 3], ["chip", 1]], size: [2, 4.2], speed: [10, 36], dir: "down", grav: 320, life: [600, 1000] },
    rest: { count: 6, shape: [["crumb", 3], ["chip", 1]], size: [2.4, 4.4], speed: [24, 70], grav: 320, life: [650, 1050] },
    line: { halo: 0.5, core: 0.95 }
  },
  "sw-sprinkles": {
    shimmer: { shape: "sprinkle", every: 64, prob: 0.5, size: [3, 4.5], life: 1100 },
    shed: { gap: 20, shape: "sprinkle", size: [2.4, 4], speed: [16, 50], dir: "down", grav: 200, spin: 4, life: [700, 1100] },
    rest: { count: 6, shape: "sprinkle", size: [2.6, 4.2], speed: [24, 70], grav: 200, spin: 4, life: [700, 1100] },
    line: { halo: 0.6, core: 0.95 }
  },
  "sw-berry": {      // strawberries sitting on the cream, sprinkles falling
    shimmer: { shape: "berry", every: 130, prob: 0.3, size: [4.2, 5.6], life: 1900 },
    shed: { gap: 22, shape: [["sprinkle", 5], ["bead", 2]], size: [2.4, 4], speed: [14, 44], dir: "down", grav: 220, spin: 4, life: [650, 1050] },
    rest: { count: 6, shape: [["sprinkle", 5], ["bead", 2], ["berry", 1]], size: [2.6, 4.4], speed: [24, 70], grav: 220, spin: 4, life: [700, 1100] },
    line: { halo: 0.6, core: 0.95 }
  },
  "sw-sugar": {      // sugar crystals glinting on the surface
    shimmer: { shape: "sugar", every: 36, prob: 0.7, size: [2, 4], life: 800, spread: 1.1 },
    shed: { gap: 18, shape: "sugar", size: [1.4, 2.6], speed: [8, 30], dir: "normal", grav: 40, life: [600, 1000] },
    rest: { count: 8, shape: "sugar", size: [1.6, 3], speed: [20, 60], grav: 40, life: [600, 950] },
    line: { halo: 0.8, core: 1 }
  },
  "sw-honey": {      // slow golden drips
    shimmer: { shape: "bead", every: 100, prob: 0.3, size: [3, 4.6], life: 1100 },
    shed: { gap: 30, shape: "honey", size: [2.8, 4.4], speed: [4, 14], dir: "down", grav: 160, life: [700, 1100] },
    rest: { count: 4, shape: "honey", size: [3, 4.6], speed: [8, 26], grav: 160, life: [760, 1100] },
    line: { halo: 0.7, core: 1 }
  }
};
function reviewStyle(mode) {
  const k = rvResolveFx(mode);
  if (k === "none") return null;
  if (!review.styles.has(k)) review.styles.set(k, RV_FX[k] || null);
  return review.styles.get(k);
}

const RV_ENV = { a: 0, s: 1 };
function rvEnvelope(u) {                           // pop in, hold, ease out
  RV_ENV.a = u < 0.1 ? u / 0.1 : Math.pow(Math.max(0, 1 - (u - 0.1) / 0.9), 1.25);
  RV_ENV.s = u < 0.16 ? 0.3 + 0.9 * (u / 0.16) : 1.2 - 0.5 * ((u - 0.16) / 0.84);
  return RV_ENV;
}
function rvIntensity(t, l) { const a = (review.now - t) / l; return a >= 1 ? 0 : Math.pow(1 - Math.max(0, a), 1.5); }
function rvAdd(x, y, r) {
  const b = review.bb;
  if (x - r < b.x0) b.x0 = x - r; if (x + r > b.x1) b.x1 = x + r;
  if (y - r < b.y0) b.y0 = y - r; if (y + r > b.y1) b.y1 = y + r;
}
function rvPick(shape, u) {
  if (!Array.isArray(shape)) return shape;
  let tot = 0; for (const [, w] of shape) tot += w;
  let x = u * tot;
  for (const [s, w] of shape) { x -= w; if (x <= 0) return s; }
  return shape[0][0];
}

// colour of one particle: the accent's own palette if it has one, else the beam's colour (or Auto palette)
function rvColor(st, t, seed) {
  const pal = review.pal;
  let c;
  if (st.own) { c = st.own[Math.floor(rvHash(seed) * st.own.length)]; if (st.tintBeam) c = rvMix(c, pal.base, st.tintBeam); return c; }
  if (pal.auto) c = rvHash(seed) > 0.45 ? pal.p1 : pal.p2;
  else if (pal.grad) c = rvGrad(pal.grad, t / pal.period);
  else c = pal.base;
  if (st.hue) c = rvMix(c, IRIS[Math.floor(rvHash(seed + 3) * 24)], 0.4);
  if (!pal.auto && rvHash(seed + 9) > 0.55) c = rvMix(c, [255, 255, 255], 0.3);
  return c;
}

function rvRay(c, len, w, rot) {
  c.save(); c.rotate(rot); c.beginPath(); c.moveTo(-len, 0); c.lineTo(0, -w); c.lineTo(len, 0); c.lineTo(0, w); c.closePath(); c.fill(); c.restore();
}
let rvBubbleCache = null;
function rvBubble() {                                // a soap-bubble sprite: thin-film rim, faint body, two specular arcs
  const dpr = review.dpr;
  if (rvBubbleCache && rvBubbleCache.dpr === dpr) return rvBubbleCache.cv;
  const px = Math.ceil(64 * dpr), cv = document.createElement("canvas");
  cv.width = cv.height = px;
  const c = cv.getContext("2d"), m = px / 2, R = px * 0.46;
  let g;
  g = c.createConicGradient ? c.createConicGradient(0.6, m, m) : null;
  if (g) {
    [[0, "255,150,220"], [0.18, "255,236,150"], [0.38, "150,234,255"], [0.58, "200,160,255"], [0.78, "170,255,206"], [1, "255,150,220"]].forEach(([t, col]) => g.addColorStop(t, `rgba(${col},0.78)`));
  } else { g = c.createLinearGradient(0, 0, px, px); g.addColorStop(0, "rgba(255,160,224,.75)"); g.addColorStop(0.5, "rgba(150,234,255,.75)"); g.addColorStop(1, "rgba(210,170,255,.75)"); }
  c.fillStyle = g; c.beginPath(); c.arc(m, m, R, 0, 6.2832); c.fill();
  c.globalCompositeOperation = "destination-out";
  const cut = c.createRadialGradient(m, m, 0, m, m, R);
  cut.addColorStop(0, "rgba(0,0,0,1)"); cut.addColorStop(0.68, "rgba(0,0,0,1)"); cut.addColorStop(0.97, "rgba(0,0,0,0.05)"); cut.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle = cut; c.fillRect(0, 0, px, px);
  c.globalCompositeOperation = "source-over";
  const body = c.createRadialGradient(m - R * 0.25, m - R * 0.3, R * 0.1, m, m, R);
  body.addColorStop(0, "rgba(255,255,255,0.22)"); body.addColorStop(0.7, "rgba(210,232,255,0.07)"); body.addColorStop(1, "rgba(210,232,255,0)");
  c.fillStyle = body; c.beginPath(); c.arc(m, m, R, 0, 6.2832); c.fill();
  c.lineCap = "round"; c.strokeStyle = "rgba(255,255,255,0.95)"; c.lineWidth = px * 0.045;
  c.beginPath(); c.arc(m, m, R * 0.7, 3.5, 4.35); c.stroke();
  c.strokeStyle = "rgba(255,255,255,0.55)"; c.lineWidth = px * 0.03;
  c.beginPath(); c.arc(m, m, R * 0.72, 0.5, 0.9); c.stroke();
  rvBubbleCache = { cv, dpr };
  return cv;
}

// every glyph is drawn translated to its centre; r = radius, a = alpha, prog = 0..1 through its life
function drawGlyph(c, shape, x, y, r, rot, rgb, a, prog, seed) {
  if (shape !== "bubble" && (a <= 0.01 || r <= 0.25)) return;
  const solid = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  c.save();
  c.translate(x, y);
  switch (shape) {
    case "star4": {
      c.globalAlpha = a * 0.34; c.drawImage(reviewSprite(RV_SOFT, rgb), -r * 1.5, -r * 1.5, r * 3, r * 3);
      c.rotate(rot); c.globalAlpha = a; c.fillStyle = solid;
      c.beginPath(); c.moveTo(0, -r); c.quadraticCurveTo(0, 0, r, 0); c.quadraticCurveTo(0, 0, 0, r);
      c.quadraticCurveTo(0, 0, -r, 0); c.quadraticCurveTo(0, 0, 0, -r); c.fill();
      c.globalAlpha = a * 0.9; c.fillStyle = "#fff"; c.beginPath(); c.arc(0, 0, Math.max(0.5, r * 0.2), 0, 6.283); c.fill();
      break;
    }
    case "glint": {                                  // glitter sparkle: white-hot core, soft bloom, fine cross rays
      c.globalAlpha = a * 0.55; c.drawImage(reviewSprite(RV_SOFT, rvMix(rgb, [255, 255, 255], 0.55)), -r * 1.5, -r * 1.5, r * 3, r * 3);
      c.fillStyle = "#fff"; c.globalAlpha = a * 0.95; rvRay(c, r * 2.5, r * 0.1, 0); rvRay(c, r * 2.5, r * 0.1, 1.5708);
      c.globalAlpha = a * 0.55; rvRay(c, r * 1.2, r * 0.07, 0.7854); rvRay(c, r * 1.2, r * 0.07, -0.7854);
      c.globalAlpha = a; c.beginPath(); c.arc(0, 0, Math.max(0.5, r * 0.27), 0, 6.283); c.fill();
      break;
    }
    case "prism": {                                  // gemstone flash: coloured rays, prismatic rings, lens ghosts
      c.globalAlpha = a * 0.5; c.drawImage(reviewSprite(RV_SOFT, rvMix(rgb, [255, 255, 255], 0.5)), -r * 1.7, -r * 1.7, r * 3.4, r * 3.4);
      c.fillStyle = solid; c.globalAlpha = a * 0.9; rvRay(c, r * 2.0, r * 0.11, 0); rvRay(c, r * 2.0, r * 0.11, 1.5708);
      c.globalAlpha = a * 0.5; rvRay(c, r * 1.3, r * 0.08, 0.7854); rvRay(c, r * 1.3, r * 0.08, -0.7854);
      c.fillStyle = "#fff"; c.globalAlpha = a * 0.95; rvRay(c, r * 1.6, r * 0.06, 0); rvRay(c, r * 1.6, r * 0.06, 1.5708);
      c.lineWidth = Math.max(0.7, r * 0.08);
      for (let i = 0; i < 3; i++) { const h = IRIS[(Math.floor(seed * 7) + i * 8) % 24]; c.strokeStyle = `rgb(${h})`; c.globalAlpha = a * 0.5; c.beginPath(); c.arc(0, 0, r * (0.5 + i * 0.14), 0, 6.283); c.stroke(); }
      [[1.55, 5], [-1.9, 13], [2.5, 19]].forEach(([dx, hi]) => { const h = IRIS[(hi + Math.floor(seed * 5)) % 24]; c.globalAlpha = a * 0.55; c.fillStyle = `rgb(${h})`; c.beginPath(); c.arc(r * dx, 0, r * 0.1, 0, 6.283); c.fill(); });
      c.globalAlpha = a; c.fillStyle = "#fff"; c.beginPath(); c.arc(0, 0, Math.max(0.5, r * 0.2), 0, 6.283); c.fill();
      break;
    }
    case "dot": case "smoke": case "ember": {
      const k = shape === "smoke" ? 3.2 : shape === "ember" ? 3.2 : 3;
      c.globalAlpha = a * (shape === "ember" ? 0.9 : 1);
      c.drawImage(reviewSprite(RV_SOFT, rgb), -r * k / 2, -r * k / 2, r * k, r * k);
      if (shape !== "smoke") {
        c.globalAlpha = a * 0.85; c.fillStyle = shape === "ember" ? `rgb(255,${Math.min(255, rgb[1] + 90)},${Math.min(255, rgb[2] + 110)})` : "#fff";
        c.beginPath(); c.arc(0, 0, Math.max(0.5, r * 0.36), 0, 6.283); c.fill();
      }
      break;
    }
    case "pearl2": {                                 // pearl pigment: warm-white sphere, soft shading, thin-film iridescence
      const g = c.createRadialGradient(-r * 0.32, -r * 0.36, r * 0.08, 0, 0, r * 1.05);
      g.addColorStop(0, "#fff"); g.addColorStop(0.32, `rgb(${rvMix(rgb, [255, 255, 255], 0.78)})`);
      g.addColorStop(0.78, solid); g.addColorStop(1, `rgb(${rvMix(rgb, [150, 130, 160], 0.38)})`);
      c.globalAlpha = a * 0.22; c.drawImage(reviewSprite(RV_DARK, [0, 0, 0]), -r * 1.3 + r * 0.15, -r * 1.3 + r * 0.4, r * 2.6, r * 2.6);
      c.globalAlpha = a; c.fillStyle = g; c.beginPath(); c.arc(0, 0, r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.5; c.strokeStyle = "rgba(150,126,176,0.7)"; c.lineWidth = 0.7; c.stroke();
      c.save(); c.beginPath(); c.arc(0, 0, r, 0, 6.283); c.clip();
      const ir = c.createLinearGradient(-r, -r * 0.6, r, r * 0.8);
      ir.addColorStop(0, "rgba(255,186,220,0.0)"); ir.addColorStop(0.3, "rgba(255,196,226,0.42)"); ir.addColorStop(0.55, "rgba(176,232,255,0.42)");
      ir.addColorStop(0.8, "rgba(255,238,184,0.38)"); ir.addColorStop(1, "rgba(255,196,226,0)");
      c.globalAlpha = a * (0.7 + 0.3 * Math.sin(prog * 9 + seed)); c.fillStyle = ir; c.fillRect(-r, -r, r * 2, r * 2);
      c.restore();
      c.globalAlpha = a * 0.55; c.strokeStyle = "rgba(255,255,255,0.8)"; c.lineWidth = 0.6; c.beginPath(); c.arc(0, 0, r - 0.3, 0, 6.283); c.stroke();
      c.globalAlpha = a * 0.95; c.fillStyle = "#fff"; c.beginPath(); c.ellipse(-r * 0.36, -r * 0.4, r * 0.28, r * 0.15, -0.6, 0, 6.283); c.fill();
      break;
    }
    case "powder": {                                 // pearl powder: tiny shimmering motes, each a different pastel flash
      const tw = 0.55 + 0.45 * Math.sin(prog * 14 + seed * 6);
      const h = IRIS[Math.floor(seed * 24) % 24], tint = rvMix(rgb, h, 0.35);
      c.globalAlpha = a * 0.8 * tw; c.drawImage(reviewSprite(RV_SOFT, tint), -r * 1.6, -r * 1.6, r * 3.2, r * 3.2);
      c.globalAlpha = a * tw; c.fillStyle = "#fff"; c.beginPath(); c.arc(0, 0, Math.max(0.4, r * 0.34), 0, 6.283); c.fill();
      break;
    }
    case "drop": {
      c.globalAlpha = a * 0.88; c.fillStyle = solid; c.beginPath(); c.arc(0, 0, r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.7; c.fillStyle = "#fff"; c.beginPath(); c.arc(-r * 0.3, -r * 0.3, Math.max(0.4, r * 0.28), 0, 6.283); c.fill();
      break;
    }
    case "bead": {                                   // glossy translucent bead: rim, refraction crescent, specular
      c.globalAlpha = a * 0.62; c.fillStyle = solid; c.beginPath(); c.arc(0, 0, r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.55; c.strokeStyle = `rgb(${rvMix(rgb, [90, 40, 50], 0.45)})`; c.lineWidth = 0.9; c.stroke();
      c.globalAlpha = a * 0.38; c.fillStyle = "#fff"; c.beginPath(); c.ellipse(r * 0.15, r * 0.45, r * 0.5, r * 0.22, 0.3, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.95; c.beginPath(); c.arc(-r * 0.34, -r * 0.36, Math.max(0.5, r * 0.3), 0, 6.283); c.fill();
      break;
    }
    case "bubble": {                                 // soap bubble: wobbles, rises, then pops into a ring and droplets
      const wob = 1 + 0.06 * Math.sin(prog * 22 + seed * 9);
      if (prog < 0.9) {
        const al = Math.min(1, prog / 0.08);
        c.globalAlpha = al * 0.95; c.rotate(seed * 6);
        c.drawImage(rvBubble(), -r * wob, -r / wob, r * 2 * wob, r * 2 / wob);
      } else {
        const t = (prog - 0.9) / 0.1;
        c.strokeStyle = `rgba(210,236,255,${(0.75 * (1 - t)).toFixed(3)})`; c.lineWidth = 1.1 * (1 - t) + 0.3;
        c.beginPath(); c.arc(0, 0, r * (1 + 0.55 * t), 0, 6.283); c.stroke();
        c.fillStyle = `rgba(255,255,255,${(0.8 * (1 - t)).toFixed(3)})`;
        for (let i = 0; i < 7; i++) { const ang = i * 0.898 + seed * 7, d = r * (1.05 + 0.9 * t); c.beginPath(); c.arc(Math.cos(ang) * d, Math.sin(ang) * d, Math.max(0.3, r * 0.1 * (1 - t)), 0, 6.283); c.fill(); }
      }
      break;
    }
    case "pxsq": {                                   // pixel block: 2x2 sub-pixels, three tones, dissolves by dither
      const cell = Math.max(2, Math.round(r * 1.1));
      const tones = [rvMix(rgb, [255, 255, 255], 0.5), rgb, rgb, rvMix(rgb, [20, 8, 34], 0.38)], th = [0, 0.5, 0.75, 0.25];
      for (let s = 0; s < 4; s++) {
        if (a < th[s] * 0.9) continue;
        c.globalAlpha = 1; c.fillStyle = `rgb(${tones[s]})`;
        c.fillRect(((s % 2) - 1) * cell, ((s >> 1) - 1) * cell, cell, cell);
      }
      break;
    }
    case "pxstar": {                                 // plus-shaped pixel sparkle, shrinks in steps
      const cell = Math.max(2, Math.round(r * 0.7));
      c.fillStyle = `rgb(${rvMix(rgb, [255, 255, 255], 0.35)})`;
      if (a > 0.3) { c.fillRect(-cell / 2, -cell * 1.5, cell, cell); c.fillRect(-cell / 2, cell * 0.5, cell, cell); }
      if (a > 0.6) { c.fillRect(-cell * 1.5, -cell / 2, cell, cell); c.fillRect(cell * 0.5, -cell / 2, cell, cell); }
      c.fillStyle = "#fff"; c.fillRect(-cell / 2, -cell / 2, cell, cell);
      break;
    }
    case "glitchdash": {                             // RGB-split data dash
      const L = r * 3.2, h = Math.max(1.2, r * 0.34), off = 1.4, comp = rvComplement(rgb);
      c.globalAlpha = a * 0.85; c.fillStyle = `rgb(${comp})`; c.fillRect(-L / 2 - off, -h / 2, L, h);
      c.fillStyle = solid; c.fillRect(-L / 2 + off, -h / 2, L, h);
      c.globalAlpha = a * 0.55; c.fillRect(-L * 0.1 + off * 2, h * 1.3, L * 0.34, h * 0.6);
      c.globalAlpha = a * 0.9; c.fillStyle = "#fff"; c.fillRect(-L * 0.18, -h * 0.22, L * 0.34, h * 0.44);
      break;
    }
    case "crystal": {                                // cut shard: bright table, light and dark facets, prism edge flash
      c.rotate(rot);
      const f = (poly, col, al) => { c.globalAlpha = a * al; c.fillStyle = `rgb(${col})`; rvPoly(c, poly); c.fill(); };
      f([[0, -r * 1.5], [r * 0.62, -r * 0.6], [0, -r * 0.1], [-r * 0.62, -r * 0.6]], rvMix(rgb, [255, 255, 255], 0.8), 0.9);
      f([[-r * 0.62, -r * 0.6], [0, -r * 0.1], [0, r * 1.5], [-r * 0.62, r * 0.6]], rvMix(rgb, [255, 255, 255], 0.35), 0.8);
      f([[r * 0.62, -r * 0.6], [0, -r * 0.1], [0, r * 1.5], [r * 0.62, r * 0.6]], rvMix(rgb, [120, 150, 205], 0.55), 0.82);
      c.globalAlpha = a * 0.85; c.strokeStyle = "#fff"; c.lineWidth = 0.7;
      rvPoly(c, [[0, -r * 1.5], [r * 0.62, -r * 0.6], [r * 0.62, r * 0.6], [0, r * 1.5], [-r * 0.62, r * 0.6], [-r * 0.62, -r * 0.6]]); c.stroke();
      c.globalAlpha = a * 0.5; c.beginPath(); c.moveTo(0, -r * 0.1); c.lineTo(0, r * 1.5); c.stroke();
      const tw = Math.pow(Math.max(0, Math.sin(prog * 14 + seed * 9)), 4);
      if (tw > 0.05) {
        const lg = c.createLinearGradient(r * 0.62, -r * 0.6, r * 0.62, r * 0.6);
        lg.addColorStop(0, "rgb(255,150,210)"); lg.addColorStop(0.5, "rgb(150,236,255)"); lg.addColorStop(1, "rgb(255,236,150)");
        c.globalAlpha = a * tw * 0.9; c.strokeStyle = lg; c.lineWidth = 1.4; c.beginPath(); c.moveTo(r * 0.62, -r * 0.6); c.lineTo(r * 0.62, r * 0.6); c.stroke();
        c.globalAlpha = a * tw; c.fillStyle = "#fff"; c.beginPath(); c.arc(0, -r * 0.7, r * 0.18 * (1 + tw), 0, 6.283); c.fill();
      }
      break;
    }
    case "fold": case "plane": {                     // origami: creased, two-toned folded paper
      c.rotate(rot);
      const sx = Math.max(0.28, Math.abs(Math.cos(prog * 8 + seed * 7))), light = rvMix(rgb, [255, 255, 255], 0.5), dark = rvMix(rgb, [90, 50, 70], 0.28);
      c.scale(sx, 1);
      const f = (poly, col, al) => { c.globalAlpha = a * al; c.fillStyle = `rgb(${col})`; rvPoly(c, poly); c.fill(); };
      if (shape === "plane") {
        f([[0, -r * 1.25], [r * 1.0, r * 0.9], [0, r * 0.35]], light, 0.95);
        f([[0, -r * 1.25], [-r * 1.0, r * 0.9], [0, r * 0.35]], rgb, 0.95);
        f([[0, r * 0.35], [r * 0.34, r * 0.9], [-r * 0.34, r * 0.9]], dark, 0.9);
        c.globalAlpha = a * 0.55; c.strokeStyle = "rgba(255,255,255,0.9)"; c.lineWidth = 0.6; c.beginPath(); c.moveTo(0, -r * 1.25); c.lineTo(0, r * 0.35); c.stroke();
      } else {                                       // a square folded on its diagonal, with a second corner fold
        f([[0, -r * 1.1], [r * 1.1, 0], [0, r * 1.1], [-r * 1.1, 0]], rgb, 0.95);
        f([[0, -r * 1.1], [r * 1.1, 0], [0, 0]], light, 0.95);
        f([[0, r * 1.1], [-r * 1.1, 0], [0, 0]], dark, 0.9);
        c.globalAlpha = a * 0.6; c.strokeStyle = "rgba(255,255,255,0.9)"; c.lineWidth = 0.6;
        c.beginPath(); c.moveTo(-r * 1.1, 0); c.lineTo(r * 1.1, 0); c.moveTo(0, -r * 1.1); c.lineTo(0, r * 1.1); c.stroke();
      }
      break;
    }
    case "speck": {                                  // fine paper inclusion: a tiny irregular fleck
      c.rotate(rot); c.globalAlpha = a * 0.78; c.fillStyle = solid;
      c.beginPath();
      for (let i = 0; i < 5; i++) { const ang = (i / 5) * 6.2832, rr = r * (0.55 + 0.5 * rvHash(seed + i * 3.7)); i ? c.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr) : c.moveTo(Math.cos(ang) * rr, Math.sin(ang) * rr); }
      c.closePath(); c.fill();
      c.globalAlpha = a * 0.28; c.fillStyle = `rgb(${rvMix(rgb, [120, 96, 70], 0.5)})`; c.fillRect(r * 0.1, r * 0.1, r * 0.5, r * 0.4);
      break;
    }
    case "rain": {                                   // a neon-lit raindrop: tapering tail, bright head, soft bloom
      c.rotate(rot); c.lineCap = "round";
      const L = r * 2.8;
      const tail = c.createLinearGradient(-L, 0, 0, 0);
      tail.addColorStop(0, rvRgba(rgb, 0)); tail.addColorStop(1, rvRgba(rgb, (a * 0.95).toFixed(3)));
      c.strokeStyle = tail; c.lineWidth = 1.3; c.beginPath(); c.moveTo(-L, 0); c.lineTo(0, 0); c.stroke();
      const wide = c.createLinearGradient(-L, 0, 0, 0);
      wide.addColorStop(0, rvRgba(rgb, 0)); wide.addColorStop(1, rvRgba(rgb, (a * 0.28).toFixed(3)));
      c.strokeStyle = wide; c.lineWidth = r * 0.7; c.beginPath(); c.moveTo(-L, 0); c.lineTo(0, 0); c.stroke();
      c.globalAlpha = a * 0.5; c.drawImage(reviewSprite(RV_SOFT, rgb), -r * 0.7, -r * 0.7, r * 1.4, r * 1.4);
      c.globalAlpha = a; c.fillStyle = "#fff"; c.beginPath(); c.arc(0, 0, 1.05, 0, 6.283); c.fill();
      break;
    }
    case "ripple": {                                 // puddle ripples: three flattened rings, each lit and softly glowing
      const u = prog;
      c.strokeStyle = solid;
      for (let m = 0; m < 3; m++) {
        const um = (u - m * 0.15) / (1 - m * 0.15);
        if (um <= 0) continue;
        const rr = r * (0.3 + 3.2 * (1 - Math.pow(1 - um, 2))), al = Math.pow(1 - um, 1.4) * (m ? 0.62 : 0.9);
        c.globalAlpha = al * 0.25; c.lineWidth = 3.6; c.beginPath(); c.ellipse(0, 0, rr, rr * 0.34, 0, 0, 6.283); c.stroke();
        c.globalAlpha = al; c.lineWidth = 1.2 - m * 0.25; c.beginPath(); c.ellipse(0, 0, rr, rr * 0.34, 0, 0, 6.283); c.stroke();
      }
      if (u < 0.3) { c.globalAlpha = (1 - u / 0.3) * 0.7; c.drawImage(reviewSprite(RV_SOFT, rgb), -r * 1.4, -r * 0.6, r * 2.8, r * 1.2); }
      break;
    }
    case "bolt": case "ecore": case "eflash": {      // the typing Electric, carried over (see the Electric keyframes): palette = violet + yellow
      const e = typeof EFFECT_PRESETS !== "undefined" && EFFECT_PRESETS.electric ? EFFECT_PRESETS.electric : { primary: "#906fff", secondary: "#ffe45f" };
      const P = hexToRgbArray(e.primary), Sx = hexToRgbArray(e.secondary);
      if (shape === "bolt") {
        // 7x12 box clipped to polygon(46% 0, 100% 0, 62% 42%, 100% 42%, 28% 100%, 48% 55%, 0 55%), gradient 180deg secondary -> primary;
        // opacity 0 -> alpha at 12% -> 0; scale .32 -> .2 while it flies and spins
        const sc = 0.32 - 0.12 * prog, al = prog < 0.12 ? prog / 0.12 : 1 - (prog - 0.12) / 0.88;
        const w = r * 1.17, h = r * 2;
        c.rotate(rot); c.scale(sc, sc);
        c.globalAlpha = a * al * 0.55; c.drawImage(reviewSprite(RV_SOFT, P), -h * 0.9, -h * 0.9, h * 1.8, h * 1.8);
        const g = c.createLinearGradient(0, -h / 2, 0, h / 2);
        g.addColorStop(0, `rgb(${Sx})`); g.addColorStop(1, `rgb(${P})`);
        c.globalAlpha = a * al; c.fillStyle = g;
        rvPoly(c, [[0.46, 0], [1, 0], [0.62, 0.42], [1, 0.42], [0.28, 1], [0.48, 0.55], [0, 0.55]].map(([px, py]) => [(px - 0.5) * w, (py - 0.5) * h]));
        c.fill();
      } else if (shape === "ecore") {
        // 10px core: colour-mix(secondary 62%, white), glows in secondary and the violet aura; scale .32 -> 1.416 (38%) -> 1.7 while it fades
        const sc = prog < 0.38 ? 0.32 + (1.416 - 0.32) * (prog / 0.38) : 1.416 + 0.284 * ((prog - 0.38) / 0.62);
        const al = prog < 0.38 ? 1 : 1 - (prog - 0.38) / 0.62, R0 = r * sc;
        c.globalAlpha = a * al * 0.42; c.drawImage(reviewSprite(RV_SOFT, P), -R0 * 2.8, -R0 * 2.8, R0 * 5.6, R0 * 5.6);
        c.globalAlpha = a * al * 0.75; c.drawImage(reviewSprite(RV_SOFT, Sx), -R0 * 1.7, -R0 * 1.7, R0 * 3.4, R0 * 3.4);
        c.globalAlpha = a * al; c.fillStyle = `rgb(${rvMix(Sx, [255, 255, 255], 0.38)})`; c.beginPath(); c.arc(0, 0, R0, 0, 6.283); c.fill();
      } else {
        // the special flash: a 32px x 1px line, transparent -> secondary -> primary -> transparent, with an aura glow
        const half = 16 * r * 0.8 * (0.4 + 0.75 * prog), al = (prog < 0.1 ? prog / 0.1 : Math.pow(1 - (prog - 0.1) / 0.9, 1.2));
        const g = c.createLinearGradient(-half, 0, half, 0);
        g.addColorStop(0, rvRgba(Sx, 0)); g.addColorStop(0.35, `rgb(${Sx})`); g.addColorStop(0.65, `rgb(${P})`); g.addColorStop(1, rvRgba(P, 0));
        c.lineCap = "round"; c.strokeStyle = g;
        c.globalAlpha = a * al * 0.3; c.lineWidth = 6; c.beginPath(); c.moveTo(-half, 0); c.lineTo(half, 0); c.stroke();
        c.globalAlpha = a * al; c.lineWidth = 1.3; c.beginPath(); c.moveTo(-half, 0); c.lineTo(half, 0); c.stroke();
      }
      break;
    }
    case "flake": {                                  // glitter confetti: a tiny faceted flake that flashes
      const tw = Math.pow(Math.max(0, Math.sin(prog * 16 + seed * 8)), 5);
      c.rotate(rot); c.globalAlpha = a; c.fillStyle = tw > 0.4 ? `rgb(${rvMix(rgb, [255, 255, 255], 0.7)})` : solid;
      c.beginPath(); c.moveTo(0, -r); c.lineTo(r * 0.78, 0); c.lineTo(0, r); c.lineTo(-r * 0.78, 0); c.closePath(); c.fill();
      c.globalAlpha = a * (0.5 + 0.5 * tw); c.fillStyle = "#fff"; c.beginPath(); c.arc(-r * 0.2, -r * 0.2, Math.max(0.4, r * 0.3), 0, 6.283); c.fill();
      break;
    }
    case "sugar": {                                  // sugar crystal: pale rhombus with an occasional glint
      const tw = Math.pow(Math.max(0, Math.sin(prog * 12 + seed * 8)), 6);
      c.rotate(rot); c.globalAlpha = a * 0.9; c.fillStyle = `rgb(${rvMix(rgb, [255, 255, 255], 0.75)})`;
      c.beginPath(); c.moveTo(0, -r); c.lineTo(r * 0.7, 0); c.lineTo(0, r); c.lineTo(-r * 0.7, 0); c.closePath(); c.fill();
      c.globalAlpha = a * 0.45; c.strokeStyle = `rgb(${rvMix(rgb, [160, 130, 170], 0.4)})`; c.lineWidth = 0.4; c.stroke();
      if (tw > 0.2) { c.rotate(-rot); c.globalAlpha = a * tw; c.fillStyle = "#fff"; rvRay(c, r * 2.2, r * 0.1, 0); rvRay(c, r * 2.2, r * 0.1, 1.5708); }
      break;
    }
    case "tick": {
      c.rotate(rot); c.lineCap = "round"; c.strokeStyle = solid; c.globalAlpha = a * 0.85; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(0, -r * 0.55); c.lineTo(0, r * 0.55); c.stroke();
      c.strokeStyle = "#fff"; c.globalAlpha = a * 0.6; c.lineWidth = 0.7; c.beginPath(); c.moveTo(0, -r * 0.4); c.lineTo(0, r * 0.4); c.stroke();
      break;
    }
    case "chip": {                                   // chocolate chip: rounded triangle, matte, a soft highlight
      c.rotate(rot); c.globalAlpha = a; c.fillStyle = "rgb(72,42,30)";
      c.beginPath(); c.moveTo(0, -r * 1.05); c.quadraticCurveTo(r * 0.95, -r * 0.45, r * 0.95, r * 0.6); c.quadraticCurveTo(0, r * 1.0, -r * 0.95, r * 0.6); c.quadraticCurveTo(-r * 0.95, -r * 0.45, 0, -r * 1.05); c.closePath(); c.fill();
      c.globalAlpha = a * 0.55; c.fillStyle = "rgb(150,100,70)"; c.beginPath(); c.ellipse(-r * 0.25, -r * 0.3, r * 0.32, r * 0.18, -0.5, 0, 6.283); c.fill();
      break;
    }
    case "crumb": {
      c.rotate(rot); c.globalAlpha = a; c.fillStyle = solid;
      c.beginPath();
      for (let i = 0; i < 6; i++) { const ang = (i / 6) * 6.2832, rr = r * (0.62 + 0.5 * rvHash(seed * 1.7 + i * 3.1)); i ? c.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr) : c.moveTo(Math.cos(ang) * rr, Math.sin(ang) * rr); }
      c.closePath(); c.fill();
      c.globalAlpha = a * 0.5; c.strokeStyle = `rgb(${rvMix(rgb, [60, 30, 14], 0.4)})`; c.lineWidth = 0.6; c.stroke();
      break;
    }
    case "sprinkle": {
      const col = RV_SPR[Math.floor(rvHash(seed * 3.7) * RV_SPR.length)];
      c.rotate(rot); c.lineCap = "round"; c.strokeStyle = `rgb(${col})`; c.globalAlpha = a; c.lineWidth = Math.max(1, r * 0.78);
      c.beginPath(); c.moveTo(-r * 0.9, 0); c.lineTo(r * 0.9, 0); c.stroke();
      c.strokeStyle = "#fff"; c.globalAlpha = a * 0.5; c.lineWidth = Math.max(0.5, r * 0.2); c.beginPath(); c.moveTo(-r * 0.6, -r * 0.18); c.lineTo(r * 0.5, -r * 0.18); c.stroke();
      break;
    }
    case "berry": {                                  // a strawberry: body, seeds, leaves, glossy highlight
      c.globalAlpha = a; c.fillStyle = "rgb(228,56,82)";
      c.beginPath(); c.moveTo(0, r * 1.15); c.bezierCurveTo(-r * 1.25, r * 0.5, -r * 1.15, -r * 0.7, 0, -r * 0.75); c.bezierCurveTo(r * 1.15, -r * 0.7, r * 1.25, r * 0.5, 0, r * 1.15); c.closePath(); c.fill();
      c.fillStyle = "rgb(255,222,176)"; c.globalAlpha = a * 0.9;
      [[-0.45, 0.1], [0.45, 0.1], [0, 0.35], [-0.3, 0.7], [0.3, 0.7], [0, -0.2]].forEach(([sx, sy]) => { c.beginPath(); c.ellipse(sx * r, sy * r, r * 0.08, r * 0.12, 0, 0, 6.283); c.fill(); });
      c.fillStyle = "rgb(84,166,96)"; c.globalAlpha = a;
      [[-0.5, -0.78, -0.5], [0.5, -0.78, 0.5], [0, -0.9, 0]].forEach(([lx, ly, ang]) => { c.save(); c.translate(lx * r, ly * r); c.rotate(ang); c.beginPath(); c.ellipse(0, 0, r * 0.42, r * 0.16, 0, 0, 6.283); c.fill(); c.restore(); });
      c.globalAlpha = a * 0.7; c.fillStyle = "#fff"; c.beginPath(); c.ellipse(-r * 0.5, -r * 0.25, r * 0.2, r * 0.12, -0.6, 0, 6.283); c.fill();
      break;
    }
    case "honey": {                                  // honey drip: a golden teardrop with a bright core
      c.globalAlpha = a * 0.9; c.fillStyle = solid;
      c.beginPath(); c.moveTo(0, -r * 1.8); c.bezierCurveTo(r * 0.2, -r, r, -r * 0.1, r, r * 0.55); c.arc(0, r * 0.55, r, 0, 3.1416); c.bezierCurveTo(-r, -r * 0.1, -r * 0.2, -r, 0, -r * 1.8); c.closePath(); c.fill();
      c.globalAlpha = a * 0.5; c.strokeStyle = `rgb(${rvMix(rgb, [120, 60, 10], 0.4)})`; c.lineWidth = 0.7; c.stroke();
      c.globalAlpha = a * 0.75; c.fillStyle = "#fff"; c.beginPath(); c.ellipse(-r * 0.38, r * 0.3, r * 0.2, r * 0.38, 0.2, 0, 6.283); c.fill();
      break;
    }
  }
  c.restore();
}

// ---- along-the-beam glyphs: stateless. Time is cut into short cells; a cell may place a glyph on the beam at the spot the
// pointer was passing at that moment, and it lives and fades with that stretch of beam.
function drawShimmer(c, st, now, vx, vy, vt, vl, n, sz) {
  const sp = st.shimmer;
  if (!sp || n < 2) return;
  const t0 = vt[0], t1 = vt[n - 1];
  const k0 = Math.floor((now - sp.life) / sp.every), k1 = Math.floor(now / sp.every);
  let prev = null;
  for (let k = k0; k <= k1; k++) {
    if (rvHash(k) > sp.prob) continue;
    const tc = (k + rvHash(k + 977)) * sp.every;
    if (tc < t0 || tc > t1) continue;
    const age = now - tc;
    if (age < 0 || age > sp.life) continue;
    let lo = 0, hi = n - 1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (vt[mid] <= tc) lo = mid; else hi = mid; }
    const f = vt[hi] > vt[lo] ? (tc - vt[lo]) / (vt[hi] - vt[lo]) : 0;
    const dx = vx[hi] - vx[lo], dy = vy[hi] - vy[lo], dl = Math.hypot(dx, dy) || 1;
    const nx = -dy / dl, ny = dx / dl, off = (rvHash(k + 31) - 0.5) * (sp.spread != null ? sp.spread * 10 : 5) * sz;
    const x = vx[lo] + dx * f + nx * off, y = vy[lo] + dy * f + ny * off;
    const u = age / sp.life, env = rvEnvelope(u);
    const a = (sp.raw ? 1 : env.a) * (0.25 + 0.75 * rvIntensity(tc, vl[lo]));
    const r = (sp.size[0] + (sp.size[1] - sp.size[0]) * rvHash(k + 57)) * sz * (sp.raw ? 1 : env.s);
    const shape = rvPick(sp.shape, rvHash(k + 13));
    const rot = shape === "tick" ? Math.atan2(ny, nx) + Math.PI / 2 : rvHash(k + 5) * 1.57 + age * 0.0012;
    const col = rvColor(st, tc, k);
    if (sp.link && prev && Math.hypot(prev.x - x, prev.y - y) < 170) {      // constellation: hairlines between neighbours
      c.globalAlpha = 0.5 * Math.min(prev.a, a); c.strokeStyle = `rgb(${col[0]},${col[1]},${col[2]})`; c.lineWidth = 0.8;
      c.beginPath(); c.moveTo(prev.x, prev.y); c.lineTo(x, y); c.stroke();
    }
    drawGlyph(c, shape, x, y, r, rot, col, a, u, k);
    rvAdd(x, y, r * 3.4);
    prev = { x, y, a };
  }
  c.globalAlpha = 1;
}

// ---- shed particles: born on the beam as it passes (distance based), drift away, fade
function spawnReviewParticle(spec, st, x, y, t, travelAng, tvx, tvy, burst) {
  const R = Math.random;
  let ang;
  if (spec.angle != null) ang = 1.5708 - spec.angle;
  else if (burst || spec.dir === "out") ang = R() * 6.283;
  else if (spec.dir === "up") ang = -1.5708 + (R() - 0.5) * 1.4;
  else if (spec.dir === "down") ang = 1.5708 + (R() - 0.5) * 1.1;
  else if (spec.dir === "back") ang = travelAng + Math.PI + (R() - 0.5) * 0.7;
  else ang = travelAng + (R() < 0.5 ? 1 : -1) * 1.5708 + (R() - 0.5) * 1.0;
  const sp = (spec.speed[0] + (spec.speed[1] - spec.speed[0]) * R()) * (burst ? 1.3 : 1);
  if (spec.upstream) { const back = spec.upstream[0] + (spec.upstream[1] - spec.upstream[0]) * R(); x -= Math.cos(ang) * back; y -= Math.sin(ang) * back; }   // rain starts above the beam and falls through it
  if (spec.scatter) { x += (R() - 0.5) * 2 * spec.scatter; y += (R() - 0.5) * 2 * spec.scatter * 0.5; }
  if (review.parts.length >= 170) review.parts.splice(0, review.parts.length - 169);
  const seed = R() * 1000;
  review.parts.push({
    x, y, t0: t, life: (spec.life[0] + (spec.life[1] - spec.life[0]) * R()) * (burst ? 0.92 : 1),
    vx: Math.cos(ang) * sp + (spec.nodrag ? 0 : tvx * 0.12), vy: Math.sin(ang) * sp + (spec.nodrag ? 0 : tvy * 0.12), ay: (spec.grav || 0) + (spec.lift || 0),
    drag: spec.nodrag ? 0 : 2.4, size: spec.size[0] + (spec.size[1] - spec.size[0]) * R(), shape: rvPick(spec.shape, R()), rot: R() * 6.283,
    spin: (spec.spin || 0) * (R() - 0.5) * 2, seed, alpha: spec.alpha || 1, flicker: !!spec.flicker, snap: spec.snap || 0, raw: !!spec.raw, rgb: rvColor(st, t, seed)
  });
}

function emitAlongLine(now) {
  const pts = review.pts;
  const st = reviewStyle(state.prefs.reviewFx);
  if (!pts.length) return;
  const lastT = pts[pts.length - 1].t;
  if (!st || reducedMotionQuery.matches) { review.emitT = lastT; return; }
  if (st.shed) {
    let i0 = pts.length;
    while (i0 > 0 && pts[i0 - 1].t > review.emitT) i0--;
    let spawned = 0;
    for (let i = Math.max(i0, 1); i < pts.length && spawned < 8; i++) {
      const p = pts[i], q = pts[i - 1];
      if (p.b) { review.emitAcc = 0; continue; }
      const len = Math.hypot(p.x - q.x, p.y - q.y);
      if (len < 0.01) continue;
      const dx = (p.x - q.x) / len, dy = (p.y - q.y) / len, dtm = Math.max(1, p.t - q.t);
      review.emitAcc += len;
      while (review.emitAcc >= review.gap && spawned < 8) {
        const d = Math.min(len, Math.max(0, len - (review.emitAcc - review.gap)));
        review.emitAcc -= review.gap;
        review.gap = st.shed.gap * (0.7 + Math.random() * 0.6);
        const t = q.t + (p.t - q.t) * (d / len);
        spawnReviewParticle(st.shed, st, q.x + dx * d, q.y + dy * d, Math.min(t, now), Math.atan2(dy, dx), dx * len / dtm * 1000, dy * len / dtm * 1000, false);
        if (st.shedExtra && Math.random() < st.shedExtra.prob) spawnReviewParticle(st.shedExtra.spec, st, q.x + dx * d, q.y + dy * d, Math.min(t, now), Math.atan2(dy, dx), 0, 0, false);
        spawned++;
      }
    }
  }
  review.emitT = lastT;
  // when the pointer comes to rest, the accent gives one small flourish at the head: it marks the spot being pointed at
  if (st.rest && !review.restFired && review.hasFilter && pts.length > 3 && now - review.lastMoveT > 150) {
    review.restFired = true;
    const head = pts[pts.length - 1];
    for (let i = 0; i < st.rest.count; i++) spawnReviewParticle(st.rest, st, head.x, head.y, now, 0, 0, 0, true);
    if (st.restExtra) spawnReviewParticle(st.restExtra, st, head.x, head.y, now, 0, 0, 0, true);
  }
}

function drawReviewParticles(c, st, now, sz) {
  const parts = review.parts;
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i], ageMs = now - p.t0;
    if (ageMs >= p.life) { parts.splice(i, 1); continue; }
    if (ageMs < 0) continue;
    const u = ageMs / p.life, s = ageMs / 1000, e = p.drag ? Math.exp(-p.drag * s) : 1, f = p.drag ? (1 - e) / p.drag : s;
    let x = p.x + p.vx * f, y = p.y + p.vy * f + 0.5 * p.ay * s * s;
    if (p.snap) { x = Math.round(x / p.snap) * p.snap; y = Math.round(y / p.snap) * p.snap; }
    const env = rvEnvelope(u);
    let a = p.raw ? p.alpha : env.a * p.alpha;            // raw shapes run their own timeline (the typing Electric's keyframes)
    if (p.flicker) a *= 0.75 + 0.25 * Math.sin(ageMs * 0.03 + p.seed);
    if (p.shape === "ripple") a = Math.min(1, a * 1.4);
    const r = p.size * sz * (p.raw ? 1 : env.s);
    const rot = p.shape === "streak" || p.shape === "rain" ? Math.atan2(p.vy * e + p.ay * s, p.vx * e) : p.rot + p.spin * s;
    drawGlyph(c, p.shape, x, y, r, rot, p.rgb, a, u, p.seed);
    rvAdd(x, y, r * 3.4 + (p.shape === "rain" ? r * 2.4 : 0) + (p.shape === "ripple" ? r * 3 : 0));
  }
}

// ==== Materials ==================================================================================================
// Each stroke becomes a smooth path with per-vertex intensity (vi), colour (vc) and width factor (vw); a material then
// paints it. Soft-sprite layers give light-like materials (laser, comet, veil, ribbon); the others add their own pass:
// grain tiles + glints (glitter), cut gems (dazzling), wet highlights (lip oil / jelly), piped dollops (cream), crumbs (cookie).
function rvWalk(S, step, cb) {                        // visit the path at fixed arc-length steps; k is a stable id per step
  const { va, n } = S;
  let j = 0, a = Math.ceil(va[0] / step) * step;
  const end = va[n - 1];
  while (a <= end) { while (j < n - 1 && va[j] < a) j++; cb(j, Math.round(a / step)); a += step; }
}
function rvNoise(x, seed) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return rvHash(i + seed * 13.1) * (1 - u) + rvHash(i + 1 + seed * 13.1) * u; }
function rvStamp(c, cv, x, y, rad, rot, alpha) {
  c.save(); c.translate(x, y); c.rotate(rot); c.globalAlpha = alpha; c.drawImage(cv, -rad, -rad, rad * 2, rad * 2); c.restore();
}
function stampLayers(S) {
  const { c, n, vx, vy, vi, vc, vw, brush, sizeMul, penK, flick, gain, cov, wid } = S;
  const layers = brush.layers;
  for (let li = 0; li < layers.length; li++) {
    const L = layers[li], R = L.R * sizeMul * penK, tp = L.taper || brush.taper;
    const fade = L.fade != null ? L.fade : brush.alphaPow != null ? brush.alphaPow : 0.8, g = gain[li];
    for (let i = 0; i < n; i += L.stride) {
      const I = vi[i];
      if (I < 0.015) continue;
      const cv = cov ? cov[i] : 1;
      if (cv < 0.03) continue;
      const r = R * (tp[0] + (1 - tp[0]) * Math.pow(I, tp[1])) * vw[i] * (wid ? wid[i] : 1);
      c.globalAlpha = Math.min(1, Math.pow(I, fade) * flick * cv);
      c.drawImage(reviewSprite(L, vc[i], g), vx[i] - r, vy[i] - r, r * 2, r * 2);
    }
  }
  c.globalAlpha = 1;
}
function paintShadow(S, R, alpha, dx, dy) {           // a soft contact shadow so wet / solid materials sit on the page
  const { c, n, vx, vy, vi, vw, sizeMul, penK, cov, wid } = S;
  const dark = reviewSprite(RV_DARK, [0, 0, 0]);
  for (let i = 0; i < n; i += 2) {
    const I = vi[i];
    if (I < 0.03) continue;
    const cv = cov ? cov[i] : 1;
    if (cv < 0.04) continue;
    const r = R * sizeMul * penK * (0.45 + 0.55 * Math.pow(I, 0.6)) * vw[i] * (wid ? wid[i] : 1);
    c.globalAlpha = alpha * Math.pow(I, 0.8) * cv;
    c.drawImage(dark, vx[i] + dx * sizeMul - r, vy[i] + dy * sizeMul - r, r * 2, r * 2);
  }
  c.globalAlpha = 1;
}
function paintGlints(S, spec) {                       // a brush's own flares / glints / dust, through the shared shimmer routine
  if (!spec) return;
  if (!spec.__st) spec.__st = { shimmer: spec };
  drawShimmer(S.c, spec.__st, S.now, S.vx, S.vy, S.vt, S.vl, S.n, S.sz);
}

function paintGlitter(S) {                            // dense micro-grain tiles. Glitter = pure material; Sparkle also shines
  stampLayers(S);
  const { c, now, vi, vt, vc, vw, sizeMul, penK, brush } = S;
  rvWalk(S, 5.2 * sizeMul * penK, (j, k) => {
    const I = vi[j];
    if (I < 0.02) return;
    const sc = (0.5 + 0.5 * Math.pow(I, 0.5)) * vw[j], rad = 9.6 * sizeMul * penK * sc, rot = rvHash(k * 1.3) * 6.283;
    rvStamp(c, rvTile("glitter", vc[j]), S.vx[j], S.vy[j], rad, rot, Math.pow(I, 0.6));
    if (brush.flash) {                                  // a travelling sheen that lights the brightest grains
      const sh = (reducedMotionQuery.matches ? 0.4 : Math.pow(Math.max(0, Math.sin(vt[j] * 0.0075 - now * 0.0062 + rvHash(k) * 1.4)), 2.2)) * Math.pow(I, 0.7);
      if (sh > 0.04) rvStamp(c, rvTile("glitterHi", vc[j]), S.vx[j], S.vy[j], rad, rot, Math.min(1, sh));
    }
  });
  c.globalAlpha = 1;
  if (brush.flash) paintGlints(S, brush.flare);
}

function paintGems(S) {                               // a chain of cut stones: mixed sizes and cuts, each catching light on its own beat
  stampLayers(S);
  const { c, now, n, vx, vy, va, vnx, vny, vi, vc, sizeMul, penK, pal } = S;
  const sizeOf = (k) => (4.2 + 8.2 * Math.pow(rvHash(k * 1.7 + 3), 2.2)) * (rvHash(k * 0.7 + 9) > 0.94 ? 1.3 : 1) * sizeMul * penK;
  const start = va[0], end = va[n - 1], dark = reviewSprite(RV_DARK, [0, 0, 0]);
  let a = 0, k = 0, j = 0;
  while (a <= end + 4 && k < 2500) {
    const base = sizeOf(k), next = sizeOf(k + 1);
    if (a >= start) {
      while (j < n - 1 && va[j] < a) j++;
      const I = vi[j];
      if (I >= 0.03) {
        const sc = 0.25 + 0.75 * Math.pow(I, 0.55), r = base * sc, al = Math.pow(I, 0.65);
        const hs = rvHash(k * 2.9 + 1), shape = hs < 0.6 ? "round" : hs < 0.72 ? "heart" : hs < 0.84 ? "pear" : hs < 0.93 ? "emerald" : "oval";
        const off = (rvHash(k * 3.3 + 2) - 0.5) * base * 1.0, x = vx[j] + vnx[j] * off, y = vy[j] + vny[j] * off;
        let col = pal.scatter ? rvGrad(pal.grad, rvHash(k * 4.1)) : vc[j];
        const v = rvHash(k * 5.3) - 0.5;
        col = v > 0 ? rvMix(col, [255, 255, 255], v * 0.45) : rvMix(col, [24, 10, 36], -v * 0.5);
        const rot = shape === "round" || shape === "oval" ? rvHash(k * 1.1) * 6.283 : shape === "heart" ? (rvHash(k * 1.1) - 0.5) * 0.9 : (rvHash(k * 1.1) - 0.5) * 2.4;
        const w = 34 * (r / 14);
        c.globalAlpha = al * 0.22; c.drawImage(dark, x + 0.6 - r * 1.5, y + 1.5 - r * 1.5, r * 3, r * 3);
        c.save(); c.translate(x, y); c.rotate(rot); if (shape === "oval") c.scale(1, 0.78);
        c.globalAlpha = al; c.drawImage(rvGem(shape === "oval" ? "round" : shape, col), -w / 2, -w / 2, w, w);
        const tw = reducedMotionQuery.matches ? 0 : Math.pow(Math.max(0, Math.sin(now * (0.0045 + 0.006 * rvHash(k * 6.1)) + rvHash(k * 2.2) * 6.283)), 9) * al;
        if (tw > 0.1 && r > 2.2) {
          if (shape === "round" || shape === "oval") {            // one facet flares white
            const f = Math.floor(rvHash(k) * 8 + Math.floor(now / 300)) % 8, R = r * 0.98;
            c.globalAlpha = 0.6 * tw; c.fillStyle = "#fff"; c.beginPath(); c.moveTo(0, 0);
            c.lineTo(Math.cos(f * 0.7854 - 0.3927) * R, Math.sin(f * 0.7854 - 0.3927) * R); c.lineTo(Math.cos(f * 0.7854 + 0.3927) * R, Math.sin(f * 0.7854 + 0.3927) * R); c.closePath(); c.fill();
          }
        }
        c.restore();
        if (tw > 0.1 && r > 2.2) { drawGlyph(c, "prism", x, y, r * (1.2 + 1.5 * tw), 0, rvMix(col, [255, 255, 255], 0.55), tw, 0.5, k); rvAdd(x, y, r * 4.5); }
        rvAdd(x, y, r * 1.6);
      }
    }
    a += (base + next) * 0.93;
    k++;
  }
  c.globalAlpha = 1;
  paintGlints(S, S.brush.flare);
}

// wet highlights shared by lip oil and jelly: a crisp specular line on the side facing the light (upper-left), a broad soft
// sheen, a faint counter-reflection on the far side; a bright band travels along the stroke over time
function paintHighlights(S, o) {
  const { c, now, n, vx, vy, vt, vnx, vny, vi, vw, sizeMul, penK, cov, wid } = S;
  const spec = reviewSprite(RV_SPEC, [255, 255, 255]), soft = reviewSprite(RV_SOFT, [255, 255, 255]);
  const R = o.bodyR * sizeMul * penK;
  for (let i = 0; i < n; i++) {
    const I = vi[i], cv = cov ? cov[i] : 1;
    if (I < 0.03 || cv < 0.05) continue;
    const k = (0.35 + 0.65 * Math.pow(I, 0.6)) * vw[i] * (wid ? wid[i] : 1), dot = vnx[i] * -0.62 + vny[i] * -0.78, off = dot * R * 0.5 * k;
    const x = vx[i] + vnx[i] * off, y = vy[i] + vny[i] * off;
    const sheen = reducedMotionQuery.matches ? 0.7 : 0.5 + 0.5 * Math.sin(vt[i] * 0.0065 - now * 0.0042);
    const face = 0.55 + 0.45 * Math.abs(dot), al = Math.pow(I, 0.8) * (0.4 + 0.6 * sheen) * face * cv;
    const rr = o.specR * sizeMul * penK * k * (0.6 + 0.4 * face);
    c.globalAlpha = al * o.specA; c.drawImage(spec, x - rr, y - rr, rr * 2, rr * 2);
    if (i % 2 === 0) { const rs = rr * o.softK; c.globalAlpha = al * o.softA; c.drawImage(soft, x - rs, y - rs, rs * 2, rs * 2); }
    if (i % 3 === 0) { const x2 = vx[i] - vnx[i] * off * 0.8, y2 = vy[i] - vny[i] * off * 0.8, r2 = rr * 0.7; c.globalAlpha = al * o.backA; c.drawImage(spec, x2 - r2, y2 - r2, r2 * 2, r2 * 2); }
  }
  c.globalAlpha = 1;
}

// lip oil is swiped on, not drawn: product comes and goes in patches (some stretches are simply bare), the width swells and
// thins like pressure on an applicator, fine streaks run along the swipe, and the glassy highlight only shows where there is product
function paintGloss(S) {
  if (S.brush.smooth) {                                 // continuous glossy film (Pearl): no gaps, even coating
    paintShadow(S, 6.6, 0.1, 1.0, 2.2);
    stampLayers(S);
    paintHighlights(S, { bodyR: 6.8, specR: 1.5, specA: 0.95, softK: 3.2, softA: 0.2, backA: 0.22 });
    return;
  }
  const { c, n, va, vi, vc, vw, vx, vy, vnx, vny, sizeMul, penK, seed } = S;
  const cov = [], wid = [];
  for (let i = 0; i < n; i++) {
    const a = va[i], m = rvNoise(a / 46, seed) * 0.7 + rvNoise(a / 15, seed + 3.3) * 0.3;
    const q = Math.min(1, Math.max(0, (m - 0.31) / 0.2));
    cov.push(q * q * (3 - 2 * q));
    wid.push(0.6 + 0.75 * rvNoise(a / 27, seed + 7.7));
  }
  S.cov = cov; S.wid = wid;
  paintShadow(S, 6.6, 0.09, 1.0, 2.2);
  stampLayers(S);
  const spec = reviewSprite(RV_SPEC, [255, 255, 255]), R = 6.8 * sizeMul * penK;
  for (let j = 0; j < 3; j++) {                       // streaks along the swipe, each with its own patchy coverage
    const off = (j - 1) * 0.52;
    for (let i = 0; i < n; i++) {
      const I = vi[i];
      if (I < 0.03 || cov[i] < 0.08) continue;
      const q = rvNoise(va[i] / 10, seed + 20 + j), sa = Math.min(1, Math.max(0, (q - 0.42) / 0.25));
      if (sa < 0.05) continue;
      const o = off * R * wid[i] * vw[i], r = 0.85 * sizeMul;
      c.globalAlpha = sa * 0.42 * cov[i] * Math.pow(I, 0.8);
      c.drawImage(spec, vx[i] + vnx[i] * o - r, vy[i] + vny[i] * o - r, r * 2, r * 2);
    }
  }
  c.globalAlpha = 1;
  paintHighlights(S, { bodyR: 6.8, specR: 1.55, specA: 0.95, softK: 3.4, softA: 0.2, backA: 0.22 });
}

// jelly: plump and bouncy. A bulge travels along the body, the colour is deep with a glowing core, the lower edge catches
// coloured light, and glossy "window" highlights sit on the shoulder
function paintJelly(S) {
  paintShadow(S, 8, 0.16, 1.2, 2.8);
  stampLayers(S);
  const { c, now, n, vx, vy, vnx, vny, vi, vc, vw, sizeMul, penK } = S;
  const soft = reviewSprite(RV_SOFT, [255, 255, 255]), R = 7.9 * sizeMul * penK;
  for (let i = 0; i < n; i += 2) {                    // coloured light bouncing up from the lower edge
    const I = vi[i];
    if (I < 0.05) continue;
    const dot = vnx[i] * -0.62 + vny[i] * -0.78, off = -dot * R * 0.55 * vw[i], r = R * 0.42 * vw[i];
    c.globalAlpha = 0.3 * Math.abs(dot) * Math.pow(I, 0.8);
    c.drawImage(reviewSprite(RV_SOFT, rvMix(vc[i], [255, 255, 255], 0.4)), vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
  }
  paintHighlights(S, { bodyR: 7.9, specR: 1.5, specA: 0.9, softK: 4.8, softA: 0.5, backA: 0.4 });
  rvWalk(S, 30 * sizeMul, (j, k) => {                 // glossy windows
    const I = vi[j];
    if (I < 0.06) return;
    const dot = vnx[j] * -0.62 + vny[j] * -0.78, off = dot * R * 0.44 * vw[j];
    const tx = vny[j], ty = -vnx[j], half = (5 + 3.5 * rvHash(k * 1.3)) * sizeMul * vw[j];
    const cx = vx[j] + vnx[j] * off, cy = vy[j] + vny[j] * off;
    c.globalAlpha = 0.88 * Math.pow(I, 0.8) * (0.5 + 0.5 * Math.abs(dot)); c.strokeStyle = "#fff"; c.lineCap = "round"; c.lineWidth = 2.4 * sizeMul;
    c.beginPath(); c.moveTo(cx - tx * half, cy - ty * half); c.lineTo(cx + tx * half, cy + ty * half); c.stroke();
    c.globalAlpha *= 0.8; c.beginPath(); c.arc(cx + tx * (half + 3.6 * sizeMul), cy + ty * (half + 3.6 * sizeMul), 0.9 * sizeMul, 0, 6.283); c.fillStyle = "#fff"; c.fill();
  });
  rvWalk(S, 3.4 * sizeMul, (j, k) => {                // a few sugar crystals
    if (rvHash(k * 1.9) > 0.14) return;
    const I = vi[j];
    if (I < 0.05) return;
    const off = (rvHash(k * 2.7) - 0.5) * 11 * sizeMul * penK * vw[j];
    c.globalAlpha = 0.55 * Math.pow(I, 0.8); c.fillStyle = "#fff";
    c.beginPath(); c.arc(vx[j] + vnx[j] * off, vy[j] + vny[j] * off, 0.5 + 0.6 * rvHash(k * 3.1), 0, 6.283); c.fill();
  });
  c.globalAlpha = 1;
}

function paintCream(S) {                               // whipped cream: a puffy mass of soft shaded balls, with the occasional curled peak
  const { c, vx, vy, vnx, vny, vi, vc, sizeMul, penK } = S;
  paintShadow(S, 7.6, 0.12, 1.0, 2.6);
  rvWalk(S, 2.5 * sizeMul * penK, (j, k) => {
    const I = vi[j];
    if (I < 0.03) return;
    const sc = (0.55 + 0.45 * Math.pow(I, 0.5)) * sizeMul * penK, big = rvHash(k * 3.1) > 0.9;
    const rad = (4.4 + 4.8 * Math.pow(rvHash(k * 1.7 + 2), 1.4)) * (big ? 1.45 : 1) * sc;
    const off = (rvHash(k * 2.9 + 5) - 0.5) * 2 * 4.4 * sc, x = vx[j] + vnx[j] * off, y = vy[j] + vny[j] * off;
    const ball = rvCreamBall(vc[j]), w = rad * 2 * (28 / 24), al = Math.min(1, Math.pow(I, 0.7));
    c.globalAlpha = al; c.drawImage(ball, x - w / 2, y - w / 2, w, w);
    if (big) {                                          // a peak: a smaller curl riding on top
      const r2 = rad * 0.5, w2 = r2 * 2 * (28 / 24), tx = vny[j] * rad * 0.35, ty = -vnx[j] * rad * 0.35;
      c.drawImage(ball, x + tx - w2 / 2, y + ty - rad * 0.62 - w2 / 2, w2, w2);
    }
  });
  c.globalAlpha = 1;
}

function paintCrumb(S) {                               // cookie: baked dough with a browned rim, bumpy edge, matte crumbs and pores
  const { c, n, va, vx, vy, vnx, vny, vi, vc, vw, sizeMul, penK, seed } = S;
  const wid = [];
  for (let i = 0; i < n; i++) wid.push(0.8 + 0.34 * rvNoise(va[i] / 8, seed + 1.3) + 0.1 * rvNoise(va[i] / 3, seed + 5.1));   // irregular, bumpy edge
  S.wid = wid;
  paintShadow(S, 7.4, 0.14, 1.0, 2.2);
  stampLayers(S);
  const soft = reviewSprite(RV_SOFT, [255, 255, 255]), R = 6.4 * sizeMul * penK;
  for (let i = 0; i < n; i += 2) {                     // matte golden top-light (volume, not shine)
    const I = vi[i];
    if (I < 0.05) continue;
    const dot = vnx[i] * -0.62 + vny[i] * -0.78, off = dot * R * 0.3 * wid[i], r = R * 0.55 * wid[i] * vw[i];
    c.globalAlpha = 0.22 * (0.5 + 0.5 * Math.abs(dot)) * Math.pow(I, 0.8);
    c.drawImage(reviewSprite(RV_SOFT, rvMix(vc[i], [255, 222, 150], 0.55)), vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
  }
  rvWalk(S, 4.8 * sizeMul * penK, (j, k) => {
    const I = vi[j];
    if (I < 0.02) return;
    const sc = (0.5 + 0.5 * Math.pow(I, 0.5)) * vw[j] * wid[j];
    rvStamp(c, rvTile("crumb", vc[j]), vx[j], vy[j], 8.8 * sizeMul * penK * sc, rvHash(k * 1.7) * 6.283, Math.pow(I, 0.65));
  });
  c.globalAlpha = 1;
}

function paintComet(S) { stampLayers(S); paintGlints(S, S.brush.dust); }

// marshmallow / meringue: big, airy, feathered puffs with almost no contrast. They breathe slowly, rise into soft peaks, a
// few peaks are torched golden at the tip, and a little powdered sugar dusts the surroundings
function paintPuff(S) {
  const { c, now, vx, vy, vnx, vny, vi, vc, sizeMul, penK } = S;
  paintShadow(S, 9, 0.16, 0.8, 2.6);
  rvWalk(S, 3.6 * sizeMul * penK, (j, k) => {
    const I = vi[j];
    if (I < 0.03) return;
    const sc = (0.6 + 0.4 * Math.pow(I, 0.5)) * sizeMul * penK, breathe = reducedMotionQuery.matches ? 1 : 1 + 0.045 * Math.sin(now * 0.0028 + k * 0.7);
    const rad = (6 + 5.6 * Math.pow(rvHash(k * 1.7 + 2), 1.2)) * sc * breathe;
    const off = (rvHash(k * 2.9 + 5) - 0.5) * 2 * 4.8 * sc, x = vx[j] + vnx[j] * off, y = vy[j] + vny[j] * off, al = Math.min(1, Math.pow(I, 0.7));
    const ball = rvPuffBall(vc[j]), w = rad * 2 * (28 / 24);
    c.globalAlpha = al; c.drawImage(ball, x - w / 2, y - w / 2, w, w);
    if (rvHash(k * 3.1) > 0.87) {                       // a soft peak: three shrinking puffs leaning to one side, the last one maybe toasted
      const lean = (rvHash(k * 4.7) - 0.5) * 2, toast = rvHash(k * 5.3) > 0.5;
      [[0, 0.7, 0.72], [lean * 0.3, 1.25, 0.52], [lean * 0.55, 1.68, 0.32]].forEach(([dx, dy, rs], q) => {
        const r2 = rad * rs, w2 = r2 * 2 * (28 / 24), b2 = q === 2 && toast ? rvPuffBall(rvMix(vc[j], [232, 176, 108], 0.5)) : ball;
        c.drawImage(b2, x + dx * rad - w2 / 2, y - dy * rad - w2 / 2, w2, w2);
      });
    }
  });
  rvWalk(S, 4.2 * sizeMul, (j, k) => {                  // powdered sugar
    if (rvHash(k * 1.3) > 0.4) return;
    const I = vi[j];
    if (I < 0.05) return;
    const off = (rvHash(k * 2.1) - 0.5) * 2 * 15 * sizeMul;
    c.globalAlpha = 0.5 * Math.pow(I, 0.8); c.fillStyle = "#fff";
    c.beginPath(); c.arc(vx[j] + vnx[j] * off, vy[j] + vny[j] * off, 0.5 + 0.6 * rvHash(k * 3.7), 0, 6.283); c.fill();
  });
  c.globalAlpha = 1;
}

// ganache / chocolate glaze: dense, opaque, dark; a broad satin sheen (never a hard white glint), a thin rim light on the lit
// edge, warm bounce light on the shadow edge. The width undulates slowly like something viscous.
function paintGanache(S) {
  const { c, now, n, va, vt, vx, vy, vnx, vny, vi, vc, vw, sizeMul, penK } = S;
  const wid = [];
  for (let i = 0; i < n; i++) wid.push(1 + 0.08 * Math.sin(va[i] * 0.06) + 0.05 * Math.sin(va[i] * 0.17 + 1.3));
  S.wid = wid;
  paintShadow(S, 8, 0.24, 1.2, 3.0);
  stampLayers(S);
  const R = 7.2 * sizeMul * penK, spec = reviewSprite(RV_SPEC, [255, 255, 255]);
  for (let i = 0; i < n; i++) {
    const I = vi[i];
    if (I < 0.04) continue;
    const k = (0.4 + 0.6 * Math.pow(I, 0.6)) * vw[i] * wid[i], dot = vnx[i] * -0.62 + vny[i] * -0.78, face = 0.5 + 0.5 * Math.abs(dot), a = Math.pow(I, 0.8);
    const sheen = reducedMotionQuery.matches ? 0.7 : 0.6 + 0.4 * Math.sin(vt[i] * 0.003 - now * 0.002);
    let r = R * 0.58 * k, off = dot * R * 0.36 * k;
    c.globalAlpha = 0.4 * face * a * sheen;
    c.drawImage(reviewSprite(RV_SOFT, rvMix(vc[i], [214, 156, 118], 0.42)), vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
    r = 0.95 * sizeMul; off = dot * R * 0.8 * k;
    c.globalAlpha = 0.34 * face * a; c.drawImage(spec, vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
    if (i % 2 === 0) {
      r = R * 0.24 * k; off = -dot * R * 0.72 * k;
      c.globalAlpha = 0.26 * Math.abs(dot) * a; c.drawImage(reviewSprite(RV_SOFT, rvMix(vc[i], [210, 124, 82], 0.5)), vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
    }
  }
  c.globalAlpha = 1;
}

// matcha latte / matcha cream: matte and milky together. Milk-white edge melting into a calm green body, marbled with
// slow ribbons of deeper green and milk, a faint dusting of powder. No gloss anywhere.
function paintMatcha(S) {
  const { c, now, n, va, vx, vy, vnx, vny, vi, vc, vw, sizeMul, penK, seed } = S;
  const wid = [];
  for (let i = 0; i < n; i++) wid.push(0.82 + 0.3 * rvNoise(va[i] / 30, seed + 1));
  S.wid = wid;
  paintShadow(S, 7, 0.05, 0.6, 1.6);
  stampLayers(S);
  const R = 8.2 * sizeMul * penK, drift = reducedMotionQuery.matches ? 0 : now;
  for (let j = 0; j < 2; j++) {                          // marbling
    for (let i = 0; i < n; i++) {
      const I = vi[i];
      if (I < 0.04) continue;
      const q = rvNoise(va[i] / 20 + (j ? 1 : -1) * drift * 0.0005, seed + 9 + j * 4), sa = Math.min(1, Math.max(0, (q - 0.45) / 0.3));
      if (sa < 0.05) continue;
      const off = Math.sin(va[i] * 0.05 + j * 2.1 + drift * 0.0008) * R * 0.45 * wid[i] * vw[i], r = 2.5 * sizeMul;
      const col = j ? rvMix(vc[i], [64, 98, 44], 0.5) : rvMix(vc[i], [255, 255, 255], 0.72);
      c.globalAlpha = sa * 0.5 * Math.pow(I, 0.8);
      c.drawImage(reviewSprite(RV_SOFT, col), vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
    }
  }
  rvWalk(S, 3.6 * sizeMul, (j, k) => {                   // matcha powder
    if (rvHash(k * 1.9) > 0.3) return;
    const I = vi[j];
    if (I < 0.05) return;
    const off = (rvHash(k * 2.3) - 0.5) * 2 * 13 * sizeMul;
    c.globalAlpha = 0.5 * Math.pow(I, 0.8); c.fillStyle = `rgb(${rvMix(vc[j], [52, 84, 36], 0.55)})`;
    c.beginPath(); c.arc(vx[j] + vnx[j] * off, vy[j] + vny[j] * off, 0.45 + 0.6 * rvHash(k * 3.3), 0, 6.283); c.fill();
  });
  c.globalAlpha = 1;
}

// energy aura: a white-hot core and a coloured glow, with tongues of energy that lick upward and never repeat
function paintAura(S) {
  stampLayers(S);
  const { c, now, vx, vy, vi, vc, sizeMul, penK, seed } = S;
  const t = reducedMotionQuery.matches ? 0 : now * 0.0042;
  rvWalk(S, 5.4 * sizeMul * penK, (j, k) => {
    const I = vi[j];
    if (I < 0.04) return;
    const h = (14 + 30 * rvNoise(k * 0.3 - t, seed)) * Math.pow(I, 0.8) * sizeMul * penK * (0.6 + 0.8 * rvHash(k * 2.3));
    const w = (6.2 + 4 * rvHash(k * 1.7)) * sizeMul * penK * (0.5 + 0.5 * Math.pow(I, 0.5));
    const sway = (rvNoise(k * 0.45 + t * 1.5, seed + 4) - 0.5) * 12 * sizeMul;
    c.save(); c.translate(vx[j], vy[j]); c.rotate(sway / Math.max(8, h) * 0.9);
    c.globalAlpha = Math.min(1, Math.pow(I, 0.7)) * 0.78; c.drawImage(rvFlame(vc[j]), -w, -h, w * 2, h * 1.08);
    c.restore();
  });
  c.globalAlpha = 1;
}

// blade slash: a crisp crescent, razor-sharp at the head and tapering away behind it, a white cutting edge on one side, a
// ghosted afterimage and a few speed lines. Hard-edged by design: it reads as a cut of light, not a glow.
function paintSlash(S) {
  const { c, n, va, vt, vx, vy, vnx, vny, vi, sizeMul, penK, pal } = S;
  if (n < 3) return;
  const sm = (a, b, x) => { const q = Math.min(1, Math.max(0, (x - a) / (b - a))); return q * q * (3 - 2 * q); };
  const Dmax = Math.min(520, Math.max(150, va[n - 1] - va[0])), Wmax = 13 * sizeMul * penK, w = [];
  for (let i = 0; i < n; i++) { const d = va[n - 1] - va[i]; w.push(Wmax * sm(0, 42, d) * Math.pow(1 - sm(50, Dmax, d), 1.2) * Math.pow(Math.max(0, vi[i]), 0.5)); }
  const col = rvMix(rvAt(pal, vt[n - 1]), [14, 46, 120], 0.3), light = rvMix(col, [255, 255, 255], 0.45);
  const aH = 0.98 * Math.pow(vi[n - 1], 0.5), aT = 0.7 * Math.pow(vi[0], 0.5);
  if (Math.hypot(vx[n - 1] - vx[0], vy[n - 1] - vy[0]) < 2) return;
  const fill = c.createLinearGradient(vx[0], vy[0], vx[n - 1], vy[n - 1]);
  fill.addColorStop(0, rvRgba(col, 0)); fill.addColorStop(0.35, rvRgba(col, aT.toFixed(3))); fill.addColorStop(0.85, rvRgba(light, (aH * 0.85).toFixed(3))); fill.addColorStop(1, rvRgba([255, 255, 255], aH.toFixed(3)));
  const edge = c.createLinearGradient(vx[0], vy[0], vx[n - 1], vy[n - 1]);
  edge.addColorStop(0, "rgba(255,255,255,0)"); edge.addColorStop(1, rvRgba([255, 255, 255], aH.toFixed(3)));
  const ribbon = (scale, shift) => {
    c.beginPath(); c.moveTo(vx[0] + vnx[0] * shift, vy[0] + vny[0] * shift);
    for (let i = 1; i < n; i++) c.lineTo(vx[i] + vnx[i] * shift, vy[i] + vny[i] * shift);
    for (let i = n - 1; i >= 0; i--) c.lineTo(vx[i] + vnx[i] * (shift + w[i] * 2 * scale), vy[i] + vny[i] * (shift + w[i] * 2 * scale));
    c.closePath();
  };
  const soft = reviewSprite(RV_SOFT, col);
  for (let i = 0; i < n; i += 4) {                         // faint bloom hugging the blade
    const r = (7 + w[i] * 1.4); if (w[i] < 0.5) continue;
    c.globalAlpha = 0.16 * Math.pow(vi[i], 0.8); c.drawImage(soft, vx[i] + vnx[i] * w[i] - r, vy[i] + vny[i] * w[i] - r, r * 2, r * 2);
  }
  c.globalAlpha = 0.4; c.fillStyle = fill; ribbon(0.5, -5 * sizeMul); c.fill();   // afterimage
  c.globalAlpha = 1; c.fillStyle = fill; ribbon(1, 0); c.fill();                   // the blade
  c.lineJoin = "round"; c.lineCap = "round"; c.strokeStyle = edge; c.lineWidth = 1.7 * sizeMul;
  c.beginPath(); c.moveTo(vx[0], vy[0]); for (let i = 1; i < n; i++) c.lineTo(vx[i], vy[i]); c.stroke();   // cutting edge
  c.lineWidth = 0.9;
  for (let j = 0; j < 3; j++) {                            // speed lines trailing behind the blade
    const off = (0.7 + 0.55 * j) * Wmax * 2; let open = false;
    c.beginPath();
    for (let i = 0; i < n; i++) {
      const on = rvNoise(va[i] / 34, S.seed + j * 5) > 0.52 && w[i] > 0.8;
      if (on) { const x = vx[i] + vnx[i] * off, y = vy[i] + vny[i] * off; open ? c.lineTo(x, y) : c.moveTo(x, y); open = true; } else open = false;
    }
    c.globalAlpha = 0.5; c.strokeStyle = edge; c.stroke();
  }
  c.globalAlpha = 1;
}

// molten magma: a dark, irregular crust with glowing veins breaking through it; the glow breathes with the heat
function paintMagma(S) {
  const { c, now, n, va, vx, vy, vnx, vny, vi, vc, vw, sizeMul, penK, seed } = S;
  const wid = [];
  for (let i = 0; i < n; i++) wid.push(0.76 + 0.42 * rvNoise(va[i] / 10, seed + 2.1));
  S.wid = wid;
  paintShadow(S, 7, 0.16, 1, 2.2);
  stampLayers(S);
  const R = 7 * sizeMul * penK, heat = reducedMotionQuery.matches ? 0 : now;
  for (let j = 0; j < 3; j++) {
    const off = (j - 1) * 0.5;
    for (let i = 0; i < n; i++) {
      const I = vi[i];
      if (I < 0.04) continue;
      const q = rvNoise(va[i] / (j === 1 ? 20 : 13), seed + j * 5), lo = j === 1 ? 0.28 : 0.46, cov = Math.min(1, Math.max(0, (q - lo) / 0.22));
      if (cov < 0.05) continue;
      const pulse = 0.75 + 0.25 * Math.sin(heat * 0.004 + va[i] * 0.08), o = off * R * wid[i] * vw[i], r = (2.8 + 1.5 * cov) * sizeMul;
      c.globalAlpha = 0.8 * cov * Math.pow(I, 0.8) * pulse * (j === 1 ? 1 : 0.72);
      c.drawImage(reviewSprite(RV_SOFT, rvMix(vc[i], [255, 218, 120], 0.35)), vx[i] + vnx[i] * o - r, vy[i] + vny[i] * o - r, r * 2, r * 2);
      if (j === 1 && cov > 0.7) { const r2 = 1.1 * sizeMul; c.globalAlpha = 0.8 * Math.pow(I, 0.8) * pulse; c.drawImage(reviewSprite(RV_SPEC, [255, 255, 255]), vx[i] - r2, vy[i] - r2, r2 * 2, r2 * 2); }
    }
  }
  c.globalAlpha = 1;
}

// liquid chrome: very high contrast. A dark horizon reflection, a bright sky reflection, a thin hard specular, and the bands
// undulate slowly along the body like mercury
function paintChrome(S) {
  const { c, now, n, va, vx, vy, vnx, vny, vi, vc, vw, sizeMul, penK } = S;
  paintShadow(S, 7.4, 0.2, 1.1, 2.6);
  stampLayers(S);
  const R = 6.8 * sizeMul * penK, spec = reviewSprite(RV_SPEC, [255, 255, 255]), dark = reviewSprite(RV_SOFT, [16, 22, 40]);
  for (let i = 0; i < n; i++) {
    const I = vi[i];
    if (I < 0.04) continue;
    const k = (0.4 + 0.6 * Math.pow(I, 0.6)) * vw[i], dot = vnx[i] * -0.62 + vny[i] * -0.78, face = 0.5 + 0.5 * Math.abs(dot), a = Math.pow(I, 0.8);
    const wob = reducedMotionQuery.matches ? 1 : 1 + 0.22 * Math.sin(va[i] * 0.11 - now * 0.003);
    let r = 2.6 * sizeMul * k, off = -dot * R * 0.3 * k * wob;
    c.globalAlpha = 0.88 * face * a; c.drawImage(dark, vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
    r = 3.2 * sizeMul * k; off = dot * R * 0.42 * k * wob;
    c.globalAlpha = 0.92 * face * a; c.drawImage(reviewSprite(RV_SOFT, rvMix(vc[i], [205, 232, 255], 0.66)), vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
    r = 1.05 * sizeMul * k; off = dot * R * 0.66 * k;
    c.globalAlpha = 0.95 * face * a; c.drawImage(spec, vx[i] + vnx[i] * off - r, vy[i] + vny[i] * off - r, r * 2, r * 2);
  }
  c.globalAlpha = 1;
}

function paintStrokes(c, pts, now, o) {
  const brush = o.brush, kind = brush.kind || "stamp", pal = o.pal, sizeMul = o.sizeMul;
  const sz = Math.pow(sizeMul, 0.6) * 1.45, st = o.st, flick = o.flick == null ? 1 : o.flick;
  const nl = brush.layers.length, lg = st ? st.line : { halo: 1, core: 1 };
  const gain = brush.layers.map((_, i) => (i === 0 ? lg.halo || 1 : i === nl - 1 && nl > 1 ? lg.core || 1 : 1));
  let totalLen = 0;
  for (let i = 1; i < pts.length; i++) if (!pts[i].b) totalLen += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  const spacing = Math.max(1.4, totalLen / 1800);                        // keeps very long, fast strokes affordable
  let s = 0;
  while (s < pts.length) {
    let e = s + 1;
    while (e < pts.length && !pts[e].b) e++;
    if (e - s >= 2) {
      const penK = pts[s].pen ? 1.18 : 1;                                  // a held pen stroke is a touch bolder
      buildPath(pts, s, e, spacing, pts[s].arc || 0);
      const n = review.vx.length, vi = review.vi, vc = review.vc, vw = review.vw, vt = review.vt, vl = review.vl, vs = review.vs, va = review.va;
      vi.length = vc.length = vw.length = 0;
      for (let i = 0; i < n; i++) {
        const I = rvIntensity(vt[i], vl[i]);
        vi.push(I);
        vc.push(I < 0.015 ? null : rvAt(pal, vt[i]));
        let wf = 1 + brush.speedW * (0.5 - Math.min(1, vs[i] / 1.6));      // slow = fuller, fast = finer
        if (kind === "jelly") wf *= 1 + 0.07 * Math.sin(va[i] * 0.32 - now * 0.0045);
        vw.push(wf < 0.35 ? 0.35 : wf);
      }
      const S = { c, now, n, vx: review.vx, vy: review.vy, vt, vl, vs, va, vnx: review.vnx, vny: review.vny, vi, vc, vw, brush, kind, sizeMul, penK, sz, pal, st, flick, gain, seed: pts[s].sid || 0 };
      if (st && st.line) {                               // neon: a coloured haze around the tube and its wet-street reflection, drawn beneath
        const { rim, reflect } = st.line;
        if (rim) {
          const soft = reviewSprite(RV_SOFT, rim);
          for (let i = 0; i < n; i += 3) {
            const I = vi[i];
            if (I < 0.03) continue;
            const r = 17 * sizeMul * penK * (0.4 + 0.6 * Math.pow(I, 0.6));
            c.globalAlpha = 0.34 * Math.pow(I, 0.9) * flick;
            c.drawImage(soft, S.vx[i] - r, S.vy[i] - r, r * 2, r * 2);
          }
        }
        if (reflect) {
          for (let i = 0; i < n; i += 2) {
            const I = vi[i];
            if (I < 0.04) continue;
            const w = 10 * sizeMul * (0.5 + 0.5 * Math.pow(I, 0.6)), h = 34 * sizeMul, x = S.vx[i] + Math.sin(now * 0.004 + va[i] * 0.2) * 1.4;
            c.globalAlpha = 0.3 * Math.pow(I, 0.9) * flick;
            c.drawImage(reviewSprite(RV_SOFT, vc[i]), x - w, S.vy[i] + 8 * sizeMul, w * 2, h);
          }
        }
        c.globalAlpha = 1;
      }
      switch (kind) {
        case "glitter": paintGlitter(S); break;
        case "gems": paintGems(S); break;
        case "gloss": paintGloss(S); break;
        case "jelly": paintJelly(S); break;
        case "cream": paintCream(S); break;
        case "crumb": paintCrumb(S); break;
        case "comet": paintComet(S); break;
        case "puff": paintPuff(S); break;
        case "ganache": paintGanache(S); break;
        case "matcha": paintMatcha(S); break;
        case "aura": paintAura(S); break;
        case "slash": paintSlash(S); break;
        case "magma": paintMagma(S); break;
        case "chrome": paintChrome(S); break;
        default: stampLayers(S);
      }
      c.globalAlpha = 1;
      const m = Math.max(nl ? brush.layers[0].R : 14, 24) * sizeMul * penK * 1.3;
      for (let i = 0; i < n; i += 4) rvAdd(review.vx[i], review.vy[i], m);
      rvAdd(review.vx[n - 1], review.vy[n - 1], m);
      if (st) drawShimmer(c, st, now, review.vx, review.vy, vt, vl, n, sz);
    }
    s = e;
  }
}

// the pointer lamp takes the material's character: a precise dot, a comet's coma, a glint, a gem flash, a drop of oil...
function paintLamp(c, o, x, y, a, now) {
  const brush = o.brush, sizeMul = o.sizeMul, pal = o.pal;
  const kind = brush.kind === "glitter" && !brush.flash ? "stamp" : (brush.kind || "stamp");
  const col = rvAt(pal, now), white = [255, 255, 255];
  const breath = reducedMotionQuery.matches ? 1 : 0.5 + 0.5 * Math.sin(now / 520);
  const L = brush.layers.length >= 2 ? brush.layers : REVIEW.brushes.laser.layers, nl = L.length;
  const bloom = reviewSprite(RV_SOFT, col);
  c.save();
  switch (kind) {
    case "comet": {                                     // the coma: a hot nucleus inside a wide soft glow
      const rb = 17 * sizeMul * (0.94 + 0.1 * breath);
      c.globalAlpha = a * 0.5; c.drawImage(bloom, x - rb * 1.5, y - rb * 1.5, rb * 3, rb * 3);
      c.globalAlpha = a * 0.9; const rc = 8.5 * sizeMul; c.drawImage(reviewSprite(RV_SOFT, rvMix(col, white, 0.55)), x - rc, y - rc, rc * 2, rc * 2);
      const rn = 4.4 * sizeMul; c.globalAlpha = a; c.drawImage(reviewSprite(RV_SPEC, white), x - rn, y - rn, rn * 2, rn * 2);
      rvAdd(x, y, rb * 1.8);
      break;
    }
    case "gems": drawGlyph(c, "prism", x, y, 9 * sizeMul * (0.9 + 0.15 * breath), 0, rvMix(col, white, 0.5), a * 0.9, 0.5, 3); rvAdd(x, y, 40 * sizeMul); break;
    case "glitter": drawGlyph(c, "glint", x, y, 6.5 * sizeMul * (0.85 + 0.25 * breath), 0, col, a, 0.5, 1); rvAdd(x, y, 24 * sizeMul); break;
    case "gloss": {                                     // the applicator tip: a soft wet dot with one clean reflection
      const rg = 8 * sizeMul;
      c.globalAlpha = a * 0.55; c.drawImage(reviewSprite(RV_SOFT, rvMix(col, white, 0.3)), x - rg, y - rg, rg * 2, rg * 2);
      const rs = 2.3 * sizeMul; c.globalAlpha = a * 0.9; c.drawImage(reviewSprite(RV_SPEC, white), x - 1.8 * sizeMul - rs, y - 2 * sizeMul - rs, rs * 2, rs * 2);
      rvAdd(x, y, 14 * sizeMul);
      break;
    }
    case "jelly": drawGlyph(c, "bead", x, y, 5.8 * sizeMul * (0.96 + 0.06 * breath), 0, col, a, 0.5, 1); rvAdd(x, y, 14 * sizeMul); break;
    case "puff": case "matcha": { const rp = (kind === "puff" ? 8 : 7) * sizeMul * (0.96 + 0.07 * breath), wp = rp * 2 * (28 / 24); c.globalAlpha = a; c.drawImage(rvPuffBall(col), x - wp / 2, y - wp / 2, wp, wp); rvAdd(x, y, 14 * sizeMul); break; }
    case "ganache": case "chrome": {
      const rg = 5.6 * sizeMul, wg = rg * 2 * (28 / 24); c.globalAlpha = a; c.drawImage(rvCreamBall(col), x - wg / 2, y - wg / 2, wg, wg);
      const rs = 1.6 * sizeMul; c.globalAlpha = a * 0.9; c.drawImage(reviewSprite(RV_SPEC, white), x - 1.8 * sizeMul - rs, y - 1.9 * sizeMul - rs, rs * 2, rs * 2);
      rvAdd(x, y, 12 * sizeMul); break;
    }
    case "aura": {
      const fh = (16 + 4 * breath) * sizeMul; c.globalAlpha = a * 0.85; c.drawImage(rvFlame(col), x - 6 * sizeMul, y - fh, 12 * sizeMul, fh * 1.08);
      const rb = 11 * sizeMul; c.globalAlpha = a * 0.5; c.drawImage(bloom, x - rb, y - rb, rb * 2, rb * 2);
      const rn = 3.4 * sizeMul; c.globalAlpha = a; c.drawImage(reviewSprite(RV_SPEC, white), x - rn, y - rn, rn * 2, rn * 2); rvAdd(x, y, 30 * sizeMul); break;
    }
    case "slash": drawGlyph(c, "star4", x, y, 6.2 * sizeMul, 0.79, rvMix(col, white, 0.55), a, 0.5, 1); rvAdd(x, y, 18 * sizeMul); break;
    case "magma": {
      const rb = 11 * sizeMul * (0.92 + 0.14 * breath); c.globalAlpha = a * 0.6; c.drawImage(reviewSprite(RV_SOFT, col), x - rb, y - rb, rb * 2, rb * 2);
      const rn = 4 * sizeMul; c.globalAlpha = a; c.drawImage(reviewSprite(RV_SOFT, rvMix(col, [255, 226, 140], 0.6)), x - rn, y - rn, rn * 2, rn * 2);
      const rs = 1.5 * sizeMul; c.globalAlpha = a * 0.9; c.drawImage(reviewSprite(RV_SPEC, white), x - rs, y - rs, rs * 2, rs * 2); rvAdd(x, y, 16 * sizeMul); break;
    }
    case "cream": { const rc2 = 6.2 * sizeMul, wc = rc2 * 2 * (28 / 24); c.globalAlpha = a; c.drawImage(rvCreamBall(col), x - wc / 2, y - wc / 2, wc, wc); rvAdd(x, y, 12 * sizeMul); break; }
    case "crumb": drawGlyph(c, "crumb", x, y, 3.6 * sizeMul, 0.4, col, a, 0.5, 2); rvAdd(x, y, 12 * sizeMul); break;
    default: {
      const precise = brush === REVIEW.brushes.laser, Lb = L[Math.min(1, nl - 1)], Lc = L[nl - 1];
      const rb = Lb.R * sizeMul * (precise ? 1.9 : 2.1 + 0.3 * breath);
      c.globalAlpha = a * (precise ? 0.5 : 0.45 + 0.3 * breath); c.drawImage(reviewSprite(Lb, col, 1), x - rb, y - rb, rb * 2, rb * 2);
      const rc = Lc.R * sizeMul * 1.15; c.globalAlpha = a; c.drawImage(reviewSprite(Lc, col, 1), x - rc, y - rc, rc * 2, rc * 2);
      c.globalAlpha = a * 0.9; c.fillStyle = "#fff"; c.beginPath(); c.arc(x, y, Math.max(0.8, rc * 0.22), 0, 6.283); c.fill();
      rvAdd(x, y, rb * 1.2);
    }
  }
  c.restore();
}

// ---- click responses: rings for light, a burst of bits for grain / crumb / gems, a plop for soft things, a spreading
// puddle for oil and chocolate, ripples in milk for matcha, a shock ring and flames for aura, crossed cuts for the blade
function paintPing(c, p, now, o) {
  const { brush, pal, sizeMul } = o, kind = brush.kind || "stamp";
  const age = now - p.t0, T = REVIEW.pingLife, u = age / T, t = age / 1000, k = Math.sqrt(sizeMul);
  const col = rvAt(pal, p.t0), solid = `rgb(${col[0]},${col[1]},${col[2]})`, white = [255, 255, 255];
  const spring = (x) => 1 - Math.exp(-7 * x) * Math.cos(18 * x), fade = u < 0.55 ? 1 : 1 - (u - 0.55) / 0.45, e = 1 - Math.exp(-6 * t);
  const soft = reviewSprite(RV_SOFT, col);
  if (kind === "cream" || kind === "puff" || kind === "ganache" && false) {
    const R = (kind === "puff" ? 11 : 9) * k * Math.max(0.01, spring(t)), w = R * 2 * (28 / 24);
    c.globalAlpha = fade; c.drawImage(kind === "puff" ? rvPuffBall(col) : rvCreamBall(col), p.x - w / 2, p.y - w / 2, w, w); rvAdd(p.x, p.y, R * 2.6);
  } else if (kind === "jelly") {
    const sx = 1 + 0.38 * Math.exp(-5 * t) * Math.cos(22 * t), R = 10 * k * Math.min(1, t * 9 + 0.2);
    c.save(); c.translate(p.x, p.y); c.scale(sx, 1 / sx); c.globalAlpha = fade; drawGlyph(c, "bead", 0, 0, R, 0, col, 1, 0.5, 1); c.restore(); rvAdd(p.x, p.y, R * 2.4);
  } else if (kind === "gloss" || kind === "ganache") {
    const rx = (8 + 24 * e) * k, ry = rx * 0.38, dark = kind === "ganache";
    c.globalAlpha = (dark ? 0.92 : 0.38) * fade; c.fillStyle = dark ? `rgb(${rvMix(col, [10, 5, 4], 0.15)})` : solid;
    c.beginPath(); c.ellipse(p.x, p.y, rx, ry, 0, 0, 6.283); c.fill();
    c.globalAlpha = 0.4 * fade; c.strokeStyle = `rgb(${rvMix(col, [30, 12, 12], 0.5)})`; c.lineWidth = 0.9; c.stroke();
    const rs = 2.2 * k * (0.4 + 0.6 * e); c.globalAlpha = 0.85 * fade; c.drawImage(reviewSprite(RV_SPEC, white), p.x - rx * 0.3 - rs, p.y - ry * 0.35 - rs, rs * 2, rs * 2);
    rvAdd(p.x, p.y, rx * 1.4);
  } else if (kind === "matcha") {
    for (let m = 0; m < 3; m++) {
      const um = (u - m * 0.14) / (1 - m * 0.14);
      if (um <= 0) continue;
      const rr = (6 + 40 * (1 - Math.pow(1 - um, 2))) * k;
      c.strokeStyle = m % 2 ? `rgb(${rvMix(col, [64, 98, 44], 0.5)})` : `rgb(${rvMix(col, white, 0.72)})`;
      c.globalAlpha = 0.5 * Math.pow(1 - um, 1.3); c.lineWidth = 4.5 - m; c.beginPath(); c.arc(p.x, p.y, rr, 0, 6.283); c.stroke();
    }
    rvAdd(p.x, p.y, 52 * k);
  } else if (kind === "glitter" || kind === "crumb" || kind === "gems") {
    const N = kind === "gems" ? 9 : 16, d0 = (1 - Math.exp(-4.5 * t)) / 4.5;
    for (let i = 0; i < N; i++) {
      const ang = rvHash(p.seed + i * 1.7) * 6.283, sp = (26 + 78 * rvHash(p.seed + i * 3.1)) * k, x = p.x + Math.cos(ang) * sp * d0, y = p.y + Math.sin(ang) * sp * d0 + (kind === "crumb" ? 60 * t * t : 0);
      const al = fade * Math.pow(1 - u, 0.8), h = rvHash(p.seed + i * 5.3);
      if (kind === "glitter") { c.globalAlpha = al; c.fillStyle = `rgb(${rvMix(col, white, h * 0.8)})`; const sz2 = 1 + 1.8 * h; c.fillRect(x - sz2 / 2, y - sz2 / 2, sz2, sz2); }
      else if (kind === "crumb") drawGlyph(c, i % 5 === 0 ? "chip" : "crumb", x, y, 2 + 1.6 * h, ang, rvMix(col, [150, 96, 52], h * 0.4), al, 0.5, p.seed + i);
      else { const r = (3 + 4 * h) * k, w = 34 * (r / 14); c.save(); c.translate(x, y); c.rotate(ang); c.globalAlpha = al; c.drawImage(rvGem(i % 3 ? "round" : "heart", pal.scatter ? rvGrad(pal.grad, h) : col), -w / 2, -w / 2, w, w); c.restore(); }
      rvAdd(x, y, 10);
    }
  } else if (kind === "aura") {
    const rr = (8 + 52 * e) * k;
    c.strokeStyle = solid; c.globalAlpha = 0.8 * Math.pow(1 - u, 1.4); c.lineWidth = 2.6 * (1 - u) + 0.6; c.beginPath(); c.arc(p.x, p.y, rr, 0, 6.283); c.stroke();
    for (let i = 0; i < 10; i++) {
      const ang = (i / 10) * 6.283 + rvHash(p.seed + i) * 0.4, fh = (10 + 12 * rvHash(p.seed + i * 2.3)) * k * (1 - u * 0.7), rad = rr * 0.7;
      c.save(); c.translate(p.x + Math.cos(ang) * rad, p.y + Math.sin(ang) * rad); c.rotate(ang + 1.5708); c.globalAlpha = 0.85 * (1 - u);
      c.drawImage(rvFlame(col), -4 * k, -fh, 8 * k, fh * 1.08); c.restore();
    }
    rvAdd(p.x, p.y, rr * 1.5);
  } else if (kind === "slash") {
    const L = (24 + 44 * e) * k, a = 0.95 * Math.pow(1 - u, 1.2);
    for (let m = 0; m < 2; m++) {
      const dx = m ? -L : L, g = c.createLinearGradient(p.x - dx, p.y - L, p.x + dx, p.y + L);
      g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(0.5, `rgba(255,255,255,${a.toFixed(3)})`); g.addColorStop(1, "rgba(255,255,255,0)");
      c.strokeStyle = solid; c.lineCap = "round"; c.globalAlpha = a * 0.4; c.lineWidth = 6 * (1 - u * 0.5); c.beginPath(); c.moveTo(p.x - dx, p.y - L); c.lineTo(p.x + dx, p.y + L); c.stroke();
      c.strokeStyle = g; c.globalAlpha = 1; c.lineWidth = 1.8 * (1 - u * 0.5); c.beginPath(); c.moveTo(p.x - dx, p.y - L); c.lineTo(p.x + dx, p.y + L); c.stroke();
    }
    rvAdd(p.x, p.y, L * 1.6);
  } else if (kind === "magma") {
    const rr = (8 + 36 * e) * k;
    c.strokeStyle = solid; c.globalAlpha = 0.7 * Math.pow(1 - u, 1.3); c.lineWidth = 3 * (1 - u) + 0.6; c.beginPath(); c.arc(p.x, p.y, rr, 0, 6.283); c.stroke();
    for (let i = 0; i < 8; i++) {
      const ang = rvHash(p.seed + i * 1.9) * 6.283, d = (10 + 26 * rvHash(p.seed + i * 2.7)) * k * e, r = (1.6 + 2.2 * rvHash(p.seed + i)) * k;
      c.globalAlpha = (1 - u) * 0.9; c.drawImage(reviewSprite(RV_SOFT, rvMix(col, [255, 226, 140], 0.5)), p.x + Math.cos(ang) * d - r * 2, p.y + Math.sin(ang) * d - 22 * t * k - r * 2, r * 4, r * 4);
    }
    rvAdd(p.x, p.y, rr * 1.4 + 30);
  } else if (kind === "chrome") {
    for (let m = 0; m < 3; m++) {
      const um = (u - m * 0.12) / (1 - m * 0.12);
      if (um <= 0) continue;
      const rr = (5 + 42 * (1 - Math.pow(1 - um, 2.4))) * k;
      c.strokeStyle = `rgb(${rvMix(col, [20, 26, 44], 0.5)})`; c.globalAlpha = 0.7 * Math.pow(1 - um, 1.2); c.lineWidth = 2.2; c.beginPath(); c.arc(p.x, p.y, rr, 0, 6.283); c.stroke();
      c.strokeStyle = "#fff"; c.globalAlpha = 0.8 * Math.pow(1 - um, 1.2); c.lineWidth = 0.9; c.beginPath(); c.arc(p.x - 0.7, p.y - 0.7, rr, 3.6, 5.2); c.stroke();
    }
    rvAdd(p.x, p.y, 52 * k);
  } else {
    const e1 = 1 - Math.pow(1 - u, 3), gr = 30 * k * (1 - 0.35 * u);
    c.globalAlpha = 0.4 * Math.pow(1 - u, 1.3); c.drawImage(soft, p.x - gr, p.y - gr, gr * 2, gr * 2);
    c.strokeStyle = solid; c.globalAlpha = 0.85 * Math.pow(1 - u, 1.5); c.lineWidth = 0.7 + 2 * (1 - u);
    c.beginPath(); c.arc(p.x, p.y, (6 + 46 * e1) * k, 0, 6.283); c.stroke();
    const u2 = Math.max(0, (age - 120) / (REVIEW.pingLife - 120));
    if (u2 > 0) { c.globalAlpha = 0.5 * Math.pow(1 - u2, 1.5); c.lineWidth = 0.6 + 1.2 * (1 - u2); c.beginPath(); c.arc(p.x, p.y, (4 + 32 * (1 - Math.pow(1 - u2, 3))) * k, 0, 6.283); c.stroke(); }
    rvAdd(p.x, p.y, 62 * k);
  }
  c.globalAlpha = 1;
}

function drawTrail(now) {
  const c = review.trailCtx, dpr = review.dpr;
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (review.box) c.clearRect(review.box.x, review.box.y, review.box.w, review.box.h);
  else c.clearRect(0, 0, review.w, review.h);
  pruneTrail(now);
  const pts = review.pts;
  const st = reviewStyle(state.prefs.reviewFx);
  if (!st) review.parts.length = 0;
  const lampOn = review.lampA > 0.02;
  if (!pts.length && !review.parts.length && !review.pings.length && !lampOn) { review.box = null; return; }

  review.now = now;
  review.bb = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  const pal = review.pal || reviewPalette(), brush = reviewBrush();
  const sizeMul = REVIEW.sizes[state.prefs.reviewSize] || 1, sz = Math.pow(sizeMul, 0.6) * 1.45;
  const flick = st && st.line && st.line.flicker ? (rvHash(Math.floor(now / 70)) < 0.07 ? 0.4 : 1) * (0.94 + 0.06 * Math.sin(now * 0.05)) : 1;   // a faulty neon tube

  paintStrokes(c, pts, now, { brush, pal, st, sizeMul, flick });
  if (lampOn) paintLamp(c, { brush, pal, sizeMul, st }, review.lampX, review.lampY, review.lampA, now);
  if (st) drawReviewParticles(c, st, now, sz);

  // pings: a click is answered in the material's own language
  for (let i = review.pings.length - 1; i >= 0; i--) {
    const p = review.pings[i];
    if (now - p.t0 > REVIEW.pingLife) { review.pings.splice(i, 1); continue; }
    paintPing(c, p, now, { brush, pal, sizeMul });
  }
  c.globalAlpha = 1;

  const b = review.bb;
  if (b.x0 === Infinity) { review.box = null; return; }
  const x0 = Math.max(0, b.x0 - 4), y0 = Math.max(0, b.y0 - 4);
  review.box = { x: x0, y: y0, w: Math.min(review.w, b.x1 + 4) - x0, h: Math.min(review.h, b.y1 + 4) - y0 };
}

function setTypeTool(on) {
  if (on && typeof review !== "undefined" && review.on) setReview(false);
  state.typeTool = on;
  refs.typeToolBtn.setAttribute("aria-pressed", String(on));
  document.body.classList.toggle("type-mode", on);
  updateHint();
}

function updateHint() {
  refs.placeHint.hidden = !(state.typeTool && !state.activeNote);
}

// ------------------------------------------------------------------ boot
function cacheRefs() {
  [
    "uploadStage", "uploadDrop", "pdfInput", "pdfStage", "pdfScroll", "inkToolbar", "changePdfBtn", "pdfNameLabel",
    "zoomOutBtn", "zoomInBtn", "zoomReadout", "prevPageBtn", "nextPageBtn", "pageReadout", "typeToolBtn",
    "effectEnabled", "soundEnabled", "settingsToggleBtn", "fullscreenBtn", "placeHint", "drawerOverlay",
    "settingsPanel", "closeSettingsBtn", "moodGrid", "tryNote", "intensityRange", "intensityReadout",
    "volumeRange", "volumeReadout", "fontSelect", "fontSizeRange", "fontSizeReadout", "inkColorRow",
    "effectModeSelect", "soundPackSelect", "inkLayer", "fxCanvas", "caretGlow", "toast",
    "reviewBtn", "reviewLens", "reviewTrail", "reviewDock", "reviewColors", "reviewFxSelect", "reviewSize"
  ].forEach((id) => { refs[id] = document.getElementById(id); });
}

function bindEvents() {
  refs.pdfInput.addEventListener("change", () => openPdf(refs.pdfInput.files[0]));
  refs.changePdfBtn.addEventListener("click", () => refs.pdfInput.click());
  window.addEventListener("dragover", (event) => { event.preventDefault(); refs.uploadDrop.classList.add("is-over"); });
  window.addEventListener("dragleave", (event) => { if (!event.relatedTarget) refs.uploadDrop.classList.remove("is-over"); });
  window.addEventListener("drop", (event) => {
    event.preventDefault();
    refs.uploadDrop.classList.remove("is-over");
    openPdf(event.dataTransfer.files[0]);
  });

  refs.zoomInBtn.addEventListener("click", () => stepZoom(1));
  refs.zoomOutBtn.addEventListener("click", () => stepZoom(-1));
  refs.prevPageBtn.addEventListener("click", () => goToPage(state.currentPage - 1));
  refs.nextPageBtn.addEventListener("click", () => goToPage(state.currentPage + 1));
  let scrollFrame = 0;
  refs.pdfScroll.addEventListener("scroll", () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; updatePageReadout(); });
  }, { passive: true });
  refs.pdfScroll.addEventListener("wheel", (event) => {
    if (!(event.ctrlKey || event.metaKey)) return;
    event.preventDefault();
    setZoom(state.zoom * (event.deltaY < 0 ? 1.1 : 1 / 1.1));
  }, { passive: false });
  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => { if (state.doc) { computeFit(); layoutPages(); } }, 120);
  });

  refs.typeToolBtn.addEventListener("click", () => setTypeTool(!state.typeTool));
  refs.fullscreenBtn.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => toast("Full screen isn't available here."));
  });

  refs.settingsToggleBtn.addEventListener("click", () => setSettingsOpen(!document.body.classList.contains("settings-open")));
  refs.closeSettingsBtn.addEventListener("click", () => setSettingsOpen(false));
  refs.drawerOverlay.addEventListener("click", () => setSettingsOpen(false));

  refs.effectEnabled.addEventListener("change", () => setPrefs({ effectEnabled: refs.effectEnabled.checked }, { keepMood: true }));
  refs.soundEnabled.addEventListener("change", () => setPrefs({ soundEnabled: refs.soundEnabled.checked }, { keepMood: true }));
  refs.intensityRange.addEventListener("input", () => setPrefs({ intensity: Number(refs.intensityRange.value) / 100 }, { keepMood: true }));
  refs.volumeRange.addEventListener("input", () => setPrefs({ volume: Number(refs.volumeRange.value) / 100 }, { keepMood: true }));
  refs.fontSelect.addEventListener("change", () => setPrefs({ font: refs.fontSelect.value }));
  refs.fontSizeRange.addEventListener("input", () => setPrefs({ fontSize: Number(refs.fontSizeRange.value) }, { keepMood: true }));
  refs.effectModeSelect.addEventListener("change", () => setPrefs({ effectMode: refs.effectModeSelect.value }));
  refs.soundPackSelect.addEventListener("change", () => { setPrefs({ soundPack: refs.soundPackSelect.value }); soundEngine.play("normal"); });
  refs.inkColorRow.addEventListener("click", (event) => {
    const swatch = event.target.closest(".swatch");
    if (swatch) setPrefs({ color: swatch.dataset.color });
  });

  attachTyping(refs.tryNote);
  refs.tryNote.addEventListener("focus", () => { state.activeNote = refs.tryNote; });
  refs.tryNote.addEventListener("blur", () => { if (state.activeNote === refs.tryNote) state.activeNote = null; });

  // First user gesture unlocks audio so the very first key already clicks.
  window.addEventListener("pointerdown", () => soundEngine.unlock(), { once: true });
  window.addEventListener("keydown", handleGlobalKeys);
  window.addEventListener("pagehide", flushNotes);
  reducedMotionQuery.addEventListener?.("change", applyPrefs);
}

function handleGlobalKeys(event) {
  const target = event.target;
  const typing = target && (target.isContentEditable || /^(INPUT|SELECT|TEXTAREA)$/.test(target.tagName));
  if (event.key === "Escape") {
    if (document.body.classList.contains("settings-open")) setSettingsOpen(false);
    else if (!typing && (state.typeTool || review.on)) { setTypeTool(false); setReview(false); }
    return;
  }
  if (typing || event.ctrlKey || event.metaKey || event.altKey) return;
  if (!state.doc) return;
  if (event.key === "t" || event.key === "T") { event.preventDefault(); setTypeTool(!state.typeTool); }
  else if (event.key === "r" || event.key === "R") { event.preventDefault(); setReview(!review.on); }
  else if (review.on && /^[1-8]$/.test(event.key)) { const shelf = REVIEW.looks.filter((l) => l.group === review.tab); if (shelf[Number(event.key) - 1]) applyLook(shelf[Number(event.key) - 1].id); }
  else if (review.on && (event.key === "l" || event.key === "L")) {
    const modes = ["spot", "ruler", "off"];
    setPrefs({ reviewLens: modes[(modes.indexOf(state.prefs.reviewLens) + 1) % 3] }, { keepMood: true });
  } else if (review.on && (event.key === "[" || event.key === "]")) {
    const sizes = ["s", "m", "l"], i = sizes.indexOf(state.prefs.reviewLensSize);
    setPrefs({ reviewLensSize: sizes[Math.max(0, Math.min(2, i + (event.key === "]" ? 1 : -1)))] }, { keepMood: true });
  }
  else if (event.key === "+" || event.key === "=") stepZoom(1);
  else if (event.key === "-") stepZoom(-1);
}

function init() {
  cacheRefs();
  if (window.pdfjsLib) pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  fillSelect(refs.effectModeSelect, EFFECT_PRESETS, (d) => d.label);
  fillSelect(refs.soundPackSelect, SOUND_PACKS, (d) => d.label);
  fillFontSelect();
  buildMoodGrid();
  initFxCanvas();
  bindEvents();
  try { initReview(); } catch (error) { console.error("Review init failed", error); }
  applyPrefs();
  if (document.readyState === "complete") pruneMissingFonts();
  else window.addEventListener("load", pruneMissingFonts, { once: true });
}

document.addEventListener("DOMContentLoaded", init);
