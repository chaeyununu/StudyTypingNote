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
  "neon-rain": {
    label: "Neon Rain",
    description: "Thin luminous drops scan directly through the typed glyph, tight and tactile.",
    particles: 8,
    life: 360,
    core: 1.22,
    spread: 13.8,
    lift: 0.4,
    glyphX: 0.3,
    glyphY: 1.28,
    glyphScale: 1.01,
    glyphRotate: 0.12,
    special: 0.28,
    primary: "#54e5ff",
    secondary: "#ff72d2",
    aura: "rgba(84, 229, 255, 0.24)"
  },
  "velvet-smoke": {
    label: "Velvet Smoke",
    description: "A soft smoky bloom wraps the latest glyph, then dissolves into paper-like haze.",
    particles: 6,
    life: 820,
    core: 1.08,
    spread: 18.8,
    lift: 3.8,
    glyphX: -0.54,
    glyphY: 0.9,
    glyphScale: 1.018,
    glyphRotate: -0.18,
    special: 0.16,
    primary: "#8d8092",
    secondary: "#d7c7da",
    aura: "rgba(141, 128, 146, 0.16)"
  },
  "ember-glow": {
    label: "Comet Tail",
    description: "A bright diagonal comet slash pulls a short warm tail off the glyph.",
    particles: 8,
    life: 520,
    core: 1.34,
    spread: 24.6,
    lift: 4.2,
    glyphX: 1.08,
    glyphY: -0.72,
    glyphScale: 1.022,
    glyphRotate: 0.9,
    special: 0.3,
    primary: "#ff9b5c",
    secondary: "#7de7ff",
    aura: "rgba(255, 155, 92, 0.23)"
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
  // 손글씨
  hand: fontDef("손글씨", "개구 Gaegu", "Gaegu", { css: G, adjust: 1.12 }),
  kyobo: fontDef("손글씨", "교보손글씨 2019", "KyoboHand"),
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
  reviewColor: "coral",
  reviewFx: "none",
  reviewSize: "m"
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
    prefs.fontSize = clamp(Number(prefs.fontSize), 12, 36);
    if (typeof prefs.reviewColor !== "string") prefs.reviewColor = defaultPrefs.reviewColor;
    if (prefs.reviewFx !== "none" && !EFFECT_PRESETS[prefs.reviewFx]) prefs.reviewFx = "none";
    if (!["s", "m", "l"].includes(prefs.reviewSize)) prefs.reviewSize = "m";
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
const REVIEW = {
  trailLife: 1700,                                  // ms a trail point stays visible
  lens: { clear: 92, feather: 230, dim: 0.10, scale: 0.25 },  // px radius kept clear, feather width, outer darkness, canvas scale
  colors: [
    { id: "coral",    label: "Coral",    rgb: [255, 104, 78] },
    { id: "rose",     label: "Rose",     rgb: [233, 84, 134] },
    { id: "amber",    label: "Amber",    rgb: [244, 160, 32] },
    { id: "mint",     label: "Mint",     rgb: [34, 190, 150] },
    { id: "sky",      label: "Sky",      rgb: [60, 140, 250] },
    { id: "violet",   label: "Violet",   rgb: [140, 100, 238] },
    { id: "graphite", label: "Graphite", rgb: [64, 66, 78] },
    { id: "iris",     label: "Iris (hue drifts along the line)", rgb: null },
    { id: "auto",     label: "Auto (the effect's own colours)", rgb: null }
  ],
  sizes: { s: 0.74, m: 1, l: 1.45 },
  // The line is stamped from soft sprites along a smooth curve: a faint halo, a body, a pale core.
  layers: [
    { R: 15,  stops: [[0, 0.06], [0.4, 0.035], [0.75, 0.01], [1, 0]],  stride: 3, white: 0 },
    { R: 6.2, stops: [[0, 0.34], [0.55, 0.28], [0.85, 0.1], [1, 0]],   stride: 1, white: 0 },
    { R: 2.9, stops: [[0, 0.8], [0.6, 0.5], [1, 0]],                   stride: 1, white: 0.42 }
  ]
};
const IRIS = Array.from({ length: 24 }, (_, i) => {   // 24 hue buckets (HSL s=.7 l=.6), pre-converted to rgb
  const h = i / 24, a = 0.28;
  const f = (n) => { const k = (n + h * 12) % 12; return Math.round(255 * (0.6 - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))); };
  return [f(0), f(8), f(4)];
});
const review = {
  on: false, hinted: false, raf: 0, lastFrame: 0, inside: false, dirty: true, lensReady: false,
  pts: [], breakNext: true, hasFilter: false,
  sx: 0, sy: 0, st: 0, rx: 0, ry: 0, prx: 0, pry: 0,   // low-pass filter state + last raw pointer
  mx: 0, my: 0, lx: 0, ly: 0, sparkAcc: 0, lastSpark: 0,
  lensCtx: null, trailCtx: null, dpr: 1, w: 0, h: 0, lw: 0, lh: 0, box: null,
  stops: null, vx: [], vy: [], vt: [], sprites: new Map(),
  parts: [], emitT: 0, emitAcc: 0, gap: 24, lastMoveT: 0, restFired: true, pal: null, bb: null, now: 0, life: 1700, styles: new Map()
};

// If index.html / styles.css are older than app.js (a very common deploy mix-up), build the missing pieces here so
// REVIEW still works instead of silently dying during init.
function ensureReviewDom() {
  const make = (tag, props, parent) => { const el = document.createElement(tag); Object.assign(el, props); (parent || document.body).append(el); return el; };
  if (!document.getElementById("reviewBtn")) {
    const cluster = refs.typeToolBtn && refs.typeToolBtn.parentElement;
    const b = make("button", { id: "reviewBtn", type: "button", className: "tool-pill", title: "Review (R)" }, cluster || document.body);
    b.setAttribute("aria-pressed", "false");
    b.innerHTML = '<span class="pill-dot" aria-hidden="true"></span><span class="pill-label">REVIEW</span>';
    if (cluster && refs.typeToolBtn) refs.typeToolBtn.after(b);
  }
  if (!document.getElementById("reviewLens")) make("canvas", { id: "reviewLens", className: "review-lens" });
  if (!document.getElementById("reviewTrail")) make("canvas", { id: "reviewTrail", className: "review-trail" });
  if (!document.getElementById("reviewDock")) {
    const dock = make("div", { id: "reviewDock", className: "review-dock" });
    dock.inert = true;
    dock.innerHTML = '<div class="dock-group" id="reviewColors"></div><span class="toolbar-divider"></span>' +
      '<select class="dock-select" id="reviewFxSelect" aria-label="Review effect"></select><span class="toolbar-divider"></span>' +
      '<div class="dock-size" id="reviewSize"><button type="button" data-size="s">S</button><button type="button" data-size="m">M</button><button type="button" data-size="l">L</button></div>';
  }
  ["reviewBtn", "reviewLens", "reviewTrail", "reviewDock", "reviewColors", "reviewFxSelect", "reviewSize"].forEach((id) => { refs[id] = document.getElementById(id); });
  // minimal styling when styles.css predates the review rules
  if (getComputedStyle(refs.reviewLens).position !== "fixed" && !document.getElementById("reviewFallbackCss")) {
    make("style", { id: "reviewFallbackCss", textContent: `
      .review-lens,.review-trail{position:fixed;inset:0;width:100%;height:100%;pointer-events:none}
      .review-lens{z-index:8;opacity:0;transition:opacity .4s}.review-lens.on{opacity:1}.review-trail{z-index:9}
      .tool-pill{height:36px;display:inline-flex;align-items:center;gap:8px;padding:0 12px 0 11px;border:0;border-radius:10px;background:transparent;font-size:12px;font-weight:650;letter-spacing:.09em}
      .pill-dot{width:7px;height:7px;border-radius:50%;background:#b9bac1}
      .tool-pill[aria-pressed="true"]{background:#26272c;color:#fff}.tool-pill[aria-pressed="true"] .pill-dot{background:#ff7d5f}
      .review-dock{position:fixed;z-index:19;top:68px;left:50%;transform:translateX(-50%);display:none;align-items:center;gap:8px;padding:6px 12px;background:rgba(246,244,240,.94);border-radius:14px;box-shadow:0 8px 28px -10px rgba(0,0,0,.5)}
      body.review-mode .review-dock{display:flex}
      .dock-group{display:flex;gap:7px}.dock-swatch{width:22px;height:22px;padding:0;border-radius:50%;border:2px solid #f6f4f0;background:var(--c,#999);color:#fff;font-size:10px}
      .dock-swatch[aria-pressed="true"]{box-shadow:0 0 0 2px #26272c}
      .dock-size button{width:28px;height:28px;border:0;border-radius:8px;background:transparent}.dock-size button[aria-pressed="true"]{background:#26272c;color:#fff}` });
  }
}

function initReview() {
  ensureReviewDom();
  // bind the button first so it keeps working even if something below fails
  refs.reviewBtn.addEventListener("click", () => setReview(!review.on));
  review.lensCtx = refs.reviewLens.getContext("2d");
  review.trailCtx = refs.reviewTrail.getContext("2d");
  review.stops = [];
  for (let i = 0; i <= 10; i++) {                   // smoothstep ramp: no visible edge where the clear area ends
    const t = i / 10;
    review.stops.push([t, `rgba(16,18,24,${(REVIEW.lens.dim * t * t * (3 - 2 * t)).toFixed(4)})`]);
  }
  buildReviewDock();
  reviewResize();
  let timer = 0;
  window.addEventListener("resize", () => { window.clearTimeout(timer); timer = window.setTimeout(reviewResize, 100); });
  const stage = refs.pdfScroll;
  stage.addEventListener("pointermove", onReviewMove, { passive: true });
  stage.addEventListener("pointerleave", onReviewLeave, { passive: true });
  window.addEventListener("blur", onReviewLeave);
}

// ---- look settings dock (colour / effect / thickness): visible only while REVIEW is on
function buildReviewDock() {
  refs.reviewColors.innerHTML = "";
  REVIEW.colors.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "dock-swatch"; b.dataset.color = c.id;
    b.title = c.label; b.setAttribute("aria-label", `${c.label} laser`);
    if (c.rgb) b.style.setProperty("--c", `rgb(${c.rgb.join(",")})`);
    if (c.id === "auto") b.textContent = "A";
    refs.reviewColors.append(b);
  });
  refs.reviewFxSelect.innerHTML = "";
  refs.reviewFxSelect.add(new Option("Laser only", "none"));
  Object.entries(EFFECT_PRESETS).forEach(([key, def]) => refs.reviewFxSelect.add(new Option(`+ ${def.label}`, key)));
  refs.reviewColors.addEventListener("click", (event) => {
    const b = event.target.closest(".dock-swatch");
    if (b) setPrefs({ reviewColor: b.dataset.color }, { keepMood: true });
  });
  refs.reviewFxSelect.addEventListener("change", () => setPrefs({ reviewFx: refs.reviewFxSelect.value }, { keepMood: true }));
  refs.reviewSize.addEventListener("click", (event) => {
    const b = event.target.closest("button[data-size]");
    if (b) setPrefs({ reviewSize: b.dataset.size }, { keepMood: true });
  });
}

function syncReviewDock() {
  if (!refs.reviewColors || !state.prefs) return;
  const p = state.prefs;
  refs.reviewColors.querySelectorAll(".dock-swatch").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.color === p.reviewColor)));
  refs.reviewFxSelect.value = p.reviewFx;
  refs.reviewSize.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.size === p.reviewSize)));
}

function reviewResize() {
  review.w = window.innerWidth; review.h = window.innerHeight;
  review.dpr = Math.min(window.devicePixelRatio || 1, 2);
  const t = refs.reviewTrail;
  t.width = Math.round(review.w * review.dpr); t.height = Math.round(review.h * review.dpr);
  const sc = REVIEW.lens.scale;
  review.lw = Math.max(2, Math.ceil(review.w * sc)); review.lh = Math.max(2, Math.ceil(review.h * sc));
  refs.reviewLens.width = review.lw; refs.reviewLens.height = review.lh;
  review.box = null; review.dirty = true;
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
    if (!review.hinted) { review.hinted = true; toast("Review — 페이지 위에서 마우스를 움직여 보세요. Esc로 종료."); }
  } else {
    review.pts.length = 0; review.parts.length = 0; review.emitAcc = 0; review.inside = false; review.lensReady = false; review.breakNext = true; review.hasFilter = false;
    refs.reviewLens.classList.remove("on");
    clearTrailCanvas();
  }
  updateHint();
}

// ---- pointer input -> low-pass filtered points
// Raw mouse coordinates are integers and jitter by a pixel or two, which reads as a wobbly line once it is drawn thick.
// A speed-adaptive exponential filter (heavier when slow, nearly transparent when fast) removes that without making the
// head feel laggy; Catmull-Rom then turns the filtered points into a continuous curve.
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
    if (review.pts.length > 900) review.pts.splice(0, review.pts.length - 900);
  } else {
    review.breakNext = true; review.hasFilter = false;   // never join a stroke across the desk / gaps between pages
  }
  if (overPage) { review.lastMoveT = now; review.restFired = false; }
  review.mx = event.clientX; review.my = event.clientY;
  if (!review.inside) { review.inside = true; review.lensReady = false; refs.reviewLens.classList.add("on"); }
  scheduleReview();
}

function feedTrail(x, y, t) {
  if (!review.hasFilter || review.breakNext) {
    review.sx = x; review.sy = y; review.st = t; review.rx = review.prx = x; review.ry = review.pry = y;
    review.hasFilter = true; review.breakNext = false;
    review.pts.push({ x, y, t, b: true });
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
  const seg = Math.hypot(review.sx - last.x, review.sy - last.y);
  if (seg >= 0.7) { review.pts.push({ x: review.sx, y: review.sy, t, b: false }); }
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
  const dt = Math.min(64, review.lastFrame ? now - review.lastFrame : 16);
  review.lastFrame = now;
  let more = false;

  if (review.on && review.inside) {                 // lens eases toward the pointer: soft, but never laggy
    if (!review.lensReady) { review.lx = review.mx; review.ly = review.my; review.lensReady = true; review.dirty = true; }
    const k = 1 - Math.exp(-dt / 34);
    const dx = review.mx - review.lx, dy = review.my - review.ly;
    review.lx += dx * k; review.ly += dy * k;
    const moving = Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15;
    if (moving || review.dirty) { drawLens(); review.dirty = false; }
    if (moving) more = true;
  }

  if (review.on) {
    // let the filtered head settle onto the pointer when the mouse slows down or stops
    if (review.hasFilter && !review.breakNext && review.pts.length &&
        Math.hypot(review.rx - review.sx, review.ry - review.sy) > 0.35) {
      stepTrailFilter(review.rx, review.ry, now);
      more = true;
    }
    review.pal = reviewPalette();
    emitAlongLine(now);
    drawTrail(now);
    if (review.pts.length || review.parts.length) more = true;
  }
  if (more) { review.raf = requestAnimationFrame(reviewFrame); } else review.lastFrame = 0;
}

function drawLens() {
  const c = review.lensCtx, L = REVIEW.lens, s = L.scale;
  c.clearRect(0, 0, review.lw, review.lh);
  const x = review.lx * s, y = review.ly * s;
  const g = c.createRadialGradient(x, y, L.clear * s, x, y, (L.clear + L.feather) * s);
  for (let i = 0; i < review.stops.length; i++) g.addColorStop(review.stops[i][0], review.stops[i][1]);
  c.fillStyle = g;
  c.fillRect(0, 0, review.lw, review.lh);
}

// ---- colour + sprites
function hexToRgbArray(hex) {
  const clean = String(hex || "").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((ch) => ch + ch).join("") : clean;
  const n = Number.parseInt(full, 16);
  return Number.isNaN(n) ? [255, 104, 78] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function autoPreset() {
  return EFFECT_PRESETS[state.prefs.reviewFx] || EFFECT_PRESETS[state.prefs.effectMode] || EFFECT_PRESETS[defaultSettings.effectMode];
}

function reviewBaseColor() {
  const id = state.prefs.reviewColor;
  if (id === "auto") return { rgb: hexToRgbArray(autoPreset().primary), iris: false };
  if (id === "iris") return { rgb: IRIS[0], iris: true };
  const found = REVIEW.colors.find((c) => c.id === id) || REVIEW.colors[0];
  return { rgb: found.rgb, iris: false };
}

// one palette per frame, shared by the line and everything the effect sheds
function reviewPalette() {
  const id = state.prefs.reviewColor;
  const base = reviewBaseColor();
  if (id === "auto") { const e = autoPreset(); return { auto: true, iris: false, base: base.rgb, p1: hexToRgbArray(e.primary), p2: hexToRgbArray(e.secondary) }; }
  return { auto: false, iris: base.iris, base: base.rgb };
}

function reviewSprite(layerIndex, rgb, gain = 1) {
  const q = (v) => (v & 0xf8) | 4;                   // quantise so soft random tints share sprites
  const r0 = q(rgb[0]), g0 = q(rgb[1]), b0 = q(rgb[2]);
  const key = `${layerIndex}:${r0},${g0},${b0}:${gain.toFixed(2)}:${review.dpr}`;
  let cv = review.sprites.get(key);
  if (cv) return cv;
  const L = REVIEW.layers[layerIndex];
  const px = Math.max(4, Math.ceil(L.R * 2 * review.dpr));
  cv = document.createElement("canvas");
  cv.width = cv.height = px;
  const c = cv.getContext("2d");
  const r = px / 2;
  const col = L.white ? [r0, g0, b0].map((v) => Math.round(v + (255 - v) * L.white)) : [r0, g0, b0];
  const g = c.createRadialGradient(r, r, 0, r, r, r);
  for (let i = 0; i < L.stops.length; i++) g.addColorStop(L.stops[i][0], `rgba(${col[0]},${col[1]},${col[2]},${Math.min(1, L.stops[i][1] * gain).toFixed(3)})`);
  c.fillStyle = g;
  c.fillRect(0, 0, px, px);
  if (review.sprites.size > 400) review.sprites.clear();
  review.sprites.set(key, cv);
  return cv;
}

// ---- smooth curve: centripetal Catmull-Rom through the filtered points, sampled every `spacing` px
function buildPath(pts, i0, i1, spacing) {
  const vx = review.vx, vy = review.vy, vt = review.vt;
  vx.length = vy.length = vt.length = 0;
  const n = i1 - i0;
  // two passes of a [1 2 1]/4 kernel over the points (ends pinned) irons out whatever jitter the filter left
  let sp = [];
  for (let k = 0; k < n; k++) sp.push({ x: pts[i0 + k].x, y: pts[i0 + k].y, t: pts[i0 + k].t });
  for (let pass = 0; pass < 2 && n > 3; pass++) {
    const nx = sp.map((p) => ({ x: p.x, y: p.y, t: p.t }));
    for (let k = 1; k < n - 1; k++) {
      nx[k].x = sp[k - 1].x * 0.25 + sp[k].x * 0.5 + sp[k + 1].x * 0.25;
      nx[k].y = sp[k - 1].y * 0.25 + sp[k].y * 0.5 + sp[k + 1].y * 0.25;
    }
    sp = nx;
  }
  const at = (k) => sp[k];
  for (let k = 0; k < n - 1; k++) {
    const p1 = at(k), p2 = at(k + 1);
    const p0 = k > 0 ? at(k - 1) : { x: 2 * p1.x - p2.x, y: 2 * p1.y - p2.y };
    const p3 = k < n - 2 ? at(k + 2) : { x: 2 * p2.x - p1.x, y: 2 * p2.y - p1.y };
    const d12 = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.max(1, Math.min(300, Math.ceil(d12 / spacing)));
    if (k === 0) { vx.push(p1.x); vy.push(p1.y); vt.push(p1.t); }
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
    }
  }
}

// ==== Beam-born FX =============================================================================================
// The old approach fired the app's typing bursts at the pointer, so they looked pasted on. Now every review effect is
// part of the beam itself: it is drawn on the same canvas with the same colour, is born ON the line at the moment the
// line passes, is tied to the line's age (twinkles fade as their stretch of beam fades), and gets a small flourish when
// the pointer comes to rest. Each of the 24 presets keeps its own character through one of a few "vocabularies".
const RV_ARCH = {
  glint: {   // calm light: four-point twinkles set into the beam, a few motes
    shimmer: { shape: "star4", every: 42, prob: 0.72, size: [7, 13], life: 900 },
    shed: { gap: 20, shape: "dot", size: [2, 4.2], speed: [18, 56], dir: "normal", lift: -10, life: [480, 860] },
    rest: { count: 6, shape: "star4", size: [3.5, 6.5], speed: [26, 62], life: [520, 860] },
    line: { halo: 1.25, core: 1.1 }
  },
  dust: {    // matte: soft drifting particles, a quiet line
    shimmer: null,
    shed: { gap: 16, shape: "smoke", size: [5, 11], speed: [6, 18], dir: "normal", lift: -22, life: [760, 1250], alpha: 0.24 },
    rest: { count: 5, shape: "smoke", size: [6, 12], speed: [10, 26], life: [800, 1200], alpha: 0.26 },
    line: { halo: 0.8, core: 0.9 }
  },
  ink: {     // drops that gather and fall
    shimmer: { shape: "drop", every: 90, prob: 0.35, size: [2, 3.6], life: 520 },
    shed: { gap: 22, shape: "drop", size: [1.8, 3.6], speed: [8, 26], dir: "down", grav: 240, life: [520, 920] },
    rest: { count: 4, shape: "drop", size: [2.2, 4], speed: [14, 40], grav: 240, life: [560, 900] },
    line: { halo: 0.45, core: 1 }
  },
  petal: {   // petals that tumble away from the beam
    shimmer: null,
    shed: { gap: 30, shape: "petal", size: [4, 7.5], speed: [10, 30], dir: "normal", lift: -8, grav: 70, spin: 3.2, life: [850, 1350] },
    rest: { count: 6, shape: "petal", size: [4, 7], speed: [20, 50], grav: 70, spin: 3, life: [900, 1300] },
    line: { halo: 0.9, core: 0.95 }
  },
  bubble: {  // rings that bloom on the beam and bubbles that rise
    shimmer: { shape: "ring", every: 70, prob: 0.5, size: [4, 9], life: 820 },
    shed: { gap: 28, shape: "ring", size: [3, 7], speed: [6, 20], dir: "up", grav: -50, life: [620, 1100] },
    rest: { count: 4, shape: "ring", size: [4, 8], speed: [10, 30], grav: -50, life: [700, 1100] },
    line: { halo: 1, core: 1 }
  },
  pixel: {   // snapping squares
    shimmer: { shape: "square", every: 60, prob: 0.55, size: [3, 5], life: 560 },
    shed: { gap: 24, shape: "square", size: [2.5, 4.5], speed: [10, 38], dir: "normal", grav: 90, life: [420, 760], snap: 3 },
    rest: { count: 7, shape: "square", size: [2.5, 4.5], speed: [20, 60], grav: 90, life: [460, 760], snap: 3 },
    line: { halo: 0.7, core: 1.05 }
  },
  glow: {    // warm orbs drifting up
    shimmer: { shape: "dot", every: 60, prob: 0.5, size: [3, 6], life: 900 },
    shed: { gap: 22, shape: "ember", size: [2.4, 5], speed: [8, 26], dir: "up", lift: -70, life: [850, 1450], flicker: true },
    rest: { count: 6, shape: "ember", size: [2.6, 5], speed: [14, 36], lift: -70, life: [900, 1400], flicker: true },
    line: { halo: 1.6, core: 1.1 }
  },
  electric: { // crisp streaks and ticks, a hot core
    shimmer: { shape: "tick", every: 40, prob: 0.6, size: [6, 11], life: 560 },
    shed: { gap: 16, shape: "streak", size: [5, 10], speed: [50, 130], dir: "normal", life: [320, 580] },
    rest: { count: 7, shape: "streak", size: [5, 10], speed: [70, 150], life: [340, 580] },
    line: { halo: 1.7, core: 1.25 }
  }
};
const RV_FX = {
  "soft-spark": ["glint"],
  "star-dust": ["glint", { shimmer: { every: 38, prob: 0.7, size: [4, 9] }, shed: { gap: 18, shape: "star4", size: [2, 4.2] } }],
  "crystal-glass": ["glint", { shimmer: { shape: "shard", size: [4, 8] }, shed: { shape: "shard", size: [2.5, 5] }, rest: { shape: "shard" } }],
  "constellation": ["glint", { shimmer: { every: 55, prob: 0.75, size: [6, 10], life: 1400, link: true }, shed: null }],
  "moon-pearl": ["glint", { shimmer: { shape: "pearl", size: [3, 6] }, shed: { shape: "pearl", size: [2, 3.6] }, rest: { shape: "pearl" }, line: { halo: 1.1 } }],
  "paper-fiber": ["dust", { shed: { shape: "fiber", size: [3.5, 6.5], alpha: 0.6, spin: 1.5 }, rest: { shape: "fiber", alpha: 0.6 } }],
  "velvet-smoke": ["dust", { shed: { size: [8, 15], alpha: 0.18, life: [900, 1500] }, line: { halo: 0.6 } }],
  "aurora-veil": ["dust", { hue: true, shed: { size: [6, 13] }, line: { halo: 1.3 } }],
  "ink": ["ink"],
  "petal-bloom": ["petal"],
  "candy-pop": ["bubble", { shimmer: { shape: "dot", size: [3, 6] }, shed: { shape: "dot", size: [2.5, 5], speed: [20, 60], dir: "out", grav: 140, life: [420, 720] }, rest: { shape: "dot", grav: 140 }, line: { halo: 1.1 } }],
  "bubble": ["bubble"],
  "ripple-lens": ["bubble", { shimmer: { every: 58, size: [6, 13], life: 920 }, shed: null }],
  "pixel": ["pixel"],
  "keycap-pop": ["pixel", { shimmer: { shape: "keycap" }, shed: { shape: "keycap", size: [3, 5] }, rest: { shape: "keycap" } }],
  "magnetic-flip": ["pixel", { shimmer: { shape: "flip" }, shed: { shape: "flip" }, rest: { shape: "flip" } }],
  "mosaic-shift": ["pixel", { hue: true, shimmer: { every: 40, prob: 0.7, size: [3.5, 6] }, shed: { gap: 16, size: [3, 5] } }],
  "firefly-glow": ["glow"],
  "ember-glow": ["glow", { shed: { lift: -90, size: [2, 4] }, line: { halo: 1.4 } }],
  "electric": ["electric", { shimmer: { every: 36 } }],
  "cyber-pink": ["electric"],
  "neon-rain": ["electric", { shimmer: null, shed: { dir: "down", grav: 520, speed: [10, 40], size: [5, 10], life: [360, 640] }, rest: { dir: "down", grav: 520 } }],
  "laser-etch": ["electric", { shimmer: { every: 34, prob: 0.8, size: [4, 7] }, shed: null, line: { halo: 0.8, core: 1.35 } }],
  "plasma-thread": ["electric", { shed: { size: [7, 13], speed: [30, 80], life: [300, 520] }, line: { halo: 1.9 } }]
};

function reviewStyle(mode) {
  if (!mode || mode === "none") return null;
  if (review.styles.has(mode)) return review.styles.get(mode);
  const def = RV_FX[mode] || RV_FX["soft-spark"];
  const out = {};
  const base = RV_ARCH[def[0]], over = def[1] || {};
  Object.keys(base).forEach((k) => { out[k] = base[k] && typeof base[k] === "object" ? { ...base[k] } : base[k]; });
  Object.keys(over).forEach((k) => {
    if (over[k] === null) out[k] = null;
    else if (typeof over[k] === "object" && !Array.isArray(over[k]) && out[k]) out[k] = { ...out[k], ...over[k] };
    else out[k] = over[k];
  });
  review.styles.set(mode, out);
  return out;
}

const RV_ENV = { a: 0, s: 1 };
function rvEnvelope(u) {                           // pop in, hold, ease out
  RV_ENV.a = u < 0.1 ? u / 0.1 : Math.pow(Math.max(0, 1 - (u - 0.1) / 0.9), 1.25);
  RV_ENV.s = u < 0.16 ? 0.3 + 0.9 * (u / 0.16) : 1.2 - 0.5 * ((u - 0.16) / 0.84);
  return RV_ENV;
}
function rvHash(n) { const h = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return h - Math.floor(h); }
function rvMix(a, b, t) { return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)]; }
function rvIntensity(t) { const a = (review.now - t) / review.life; return a >= 1 ? 0 : Math.pow(1 - Math.max(0, a), 1.5); }
function rvAdd(x, y, r) {
  const b = review.bb;
  if (x - r < b.x0) b.x0 = x - r; if (x + r > b.x1) b.x1 = x + r;
  if (y - r < b.y0) b.y0 = y - r; if (y + r > b.y1) b.y1 = y + r;
}

// colour of one particle: the beam's own colour (or the effect's palette in Auto), sometimes a touch lighter
function rvColor(st, t, seed) {
  const pal = review.pal;
  let c;
  if (pal.auto) c = rvHash(seed) > 0.45 ? pal.p1 : pal.p2;
  else if (pal.iris) c = IRIS[Math.floor(((t * 0.09) % 360) / 15) % 24];
  else c = pal.base;
  if (st.hue) c = rvMix(c, IRIS[Math.floor(rvHash(seed + 3) * 24)], 0.4);
  if (!pal.auto && rvHash(seed + 9) > 0.55) c = rvMix(c, [255, 255, 255], 0.3);
  return c;
}

// every glyph is drawn translated to its centre so shapes stay simple
function drawGlyph(c, shape, x, y, r, rot, rgb, a, prog, seed) {
  if (a <= 0.01 || r <= 0.25) return;
  const solid = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  c.save();
  c.translate(x, y);
  switch (shape) {
    case "star4": {
      c.globalAlpha = a * 0.34;
      c.drawImage(reviewSprite(1, rgb), -r * 1.5, -r * 1.5, r * 3, r * 3);
      c.rotate(rot); c.globalAlpha = a; c.fillStyle = solid;
      c.beginPath(); c.moveTo(0, -r); c.quadraticCurveTo(0, 0, r, 0); c.quadraticCurveTo(0, 0, 0, r);
      c.quadraticCurveTo(0, 0, -r, 0); c.quadraticCurveTo(0, 0, 0, -r); c.fill();
      c.globalAlpha = a * 0.9; c.fillStyle = "#fff"; c.beginPath(); c.arc(0, 0, Math.max(0.5, r * 0.2), 0, 6.283); c.fill();
      break;
    }
    case "dot": case "smoke": case "ember": {
      const k = shape === "smoke" ? 3.2 : shape === "ember" ? 3.2 : 3;
      c.globalAlpha = a * (shape === "ember" ? 0.75 : 1);
      c.drawImage(reviewSprite(1, rgb), -r * k / 2, -r * k / 2, r * k, r * k);
      if (shape !== "smoke") {
        c.globalAlpha = a * 0.85; c.fillStyle = shape === "ember" ? `rgb(255,${Math.min(255, rgb[1] + 90)},${Math.min(255, rgb[2] + 110)})` : "#fff";
        c.beginPath(); c.arc(0, 0, Math.max(0.5, r * 0.36), 0, 6.283); c.fill();
      }
      break;
    }
    case "pearl": {
      c.globalAlpha = a; c.drawImage(reviewSprite(1, rgb), -r * 1.5, -r * 1.5, r * 3, r * 3);
      c.strokeStyle = solid; c.lineWidth = 0.9; c.globalAlpha = a * 0.55; c.beginPath(); c.arc(0, 0, r * 1.25, 0, 6.283); c.stroke();
      c.globalAlpha = a * 0.9; c.fillStyle = "#fff"; c.beginPath(); c.arc(-r * 0.25, -r * 0.25, Math.max(0.4, r * 0.3), 0, 6.283); c.fill();
      break;
    }
    case "drop": {
      c.globalAlpha = a * 0.88; c.fillStyle = solid; c.beginPath(); c.arc(0, 0, r, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.7; c.fillStyle = "#fff"; c.beginPath(); c.arc(-r * 0.3, -r * 0.3, Math.max(0.4, r * 0.28), 0, 6.283); c.fill();
      break;
    }
    case "ring": {
      c.globalAlpha = a * 0.9; c.strokeStyle = solid; c.lineWidth = 1.15;
      c.beginPath(); c.arc(0, 0, r * (0.55 + 0.95 * prog), 0, 6.283); c.stroke();
      c.globalAlpha = a * 0.3; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, r * (0.55 + 0.95 * prog), 0, 6.283); c.stroke();
      break;
    }
    case "square": case "keycap": case "flip": {
      const w = shape === "flip" ? Math.max(0.12, Math.abs(Math.cos(prog * 7 + seed))) : 1;
      c.globalAlpha = a; c.fillStyle = solid;
      if (shape === "keycap" && c.roundRect) { c.beginPath(); c.roundRect(-r, -r, r * 2, r * 2, r * 0.38); c.fill(); }
      else c.fillRect(-r * w, -r, r * 2 * w, r * 2);
      if (shape !== "square") { c.globalAlpha = a * 0.55; c.fillStyle = "#fff"; c.fillRect(-r * w * 0.7, -r * 0.8, r * 1.4 * w, Math.max(0.6, r * 0.28)); }
      break;
    }
    case "petal": {
      c.rotate(rot); c.globalAlpha = a * 0.92; c.fillStyle = solid;
      c.beginPath(); c.ellipse(0, 0, r * 1.15, r * 0.6, 0, 0, 6.283); c.fill();
      c.globalAlpha = a * 0.4; c.strokeStyle = "#fff"; c.lineWidth = 0.7; c.beginPath(); c.moveTo(-r * 0.9, 0); c.lineTo(r * 0.9, 0); c.stroke();
      break;
    }
    case "streak": {
      c.rotate(rot); c.lineCap = "round"; c.strokeStyle = solid; c.globalAlpha = a * 0.9; c.lineWidth = Math.max(1.1, r * 0.26);
      c.beginPath(); c.moveTo(0, 0); c.lineTo(-r * 2, 0); c.stroke();
      c.strokeStyle = "#fff"; c.globalAlpha = a * 0.55; c.lineWidth = 0.7; c.beginPath(); c.moveTo(0, 0); c.lineTo(-r * 1.2, 0); c.stroke();
      break;
    }
    case "tick": {
      c.rotate(rot); c.lineCap = "round"; c.strokeStyle = solid; c.globalAlpha = a * 0.85; c.lineWidth = 1.5;
      c.beginPath(); c.moveTo(0, -r * 0.55); c.lineTo(0, r * 0.55); c.stroke();
      c.strokeStyle = "#fff"; c.globalAlpha = a * 0.6; c.lineWidth = 0.7; c.beginPath(); c.moveTo(0, -r * 0.4); c.lineTo(0, r * 0.4); c.stroke();
      break;
    }
    case "shard": {
      c.rotate(rot); c.fillStyle = solid; c.globalAlpha = a * 0.55;
      c.beginPath(); c.moveTo(0, -r * 1.2); c.lineTo(r * 0.6, 0); c.lineTo(0, r * 1.2); c.lineTo(-r * 0.6, 0); c.closePath(); c.fill();
      c.globalAlpha = a * 0.75; c.strokeStyle = "#fff"; c.lineWidth = 0.8; c.stroke();
      break;
    }
    case "fiber": {
      c.rotate(rot); c.lineCap = "round"; c.strokeStyle = solid; c.globalAlpha = a; c.lineWidth = 1.1;
      c.beginPath(); c.moveTo(-r, 0); c.quadraticCurveTo(0, -r * 0.8, r, 0); c.stroke();
      break;
    }
  }
  c.restore();
}

// ---- along-the-line twinkles: stateless. Time is cut into short cells; a cell may place a glyph on the beam at the
// spot the pointer was passing at that moment, and the glyph lives and fades with that stretch of line.
function drawShimmer(c, st, now, vx, vy, vt, n, sz) {
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
    const nx = -dy / dl, ny = dx / dl, off = (rvHash(k + 31) - 0.5) * 5 * sz;
    const x = vx[lo] + dx * f + nx * off, y = vy[lo] + dy * f + ny * off;
    const u = age / sp.life, env = rvEnvelope(u);
    const a = env.a * (0.25 + 0.75 * rvIntensity(tc));
    const r = (sp.size[0] + (sp.size[1] - sp.size[0]) * rvHash(k + 57)) * sz * env.s;
    const rot = sp.shape === "tick" ? Math.atan2(ny, nx) + Math.PI / 2 : rvHash(k + 5) * 1.57 + age * 0.0012;
    const col = rvColor(st, tc, k);
    if (sp.link && prev && Math.hypot(prev.x - x, prev.y - y) < 170) {      // constellation: hairlines between neighbours
      c.globalAlpha = 0.5 * Math.min(prev.a, a); c.strokeStyle = `rgb(${col[0]},${col[1]},${col[2]})`; c.lineWidth = 0.8;
      c.beginPath(); c.moveTo(prev.x, prev.y); c.lineTo(x, y); c.stroke();
    }
    drawGlyph(c, sp.shape, x, y, r, rot, col, a, u, k);
    rvAdd(x, y, r * 3.2);
    prev = { x, y, a };
  }
  c.globalAlpha = 1;
}

// ---- shed particles: born on the beam as it passes (distance based), drift away, fade
function spawnReviewParticle(spec, st, x, y, t, travelAng, tvx, tvy, burst) {
  const R = Math.random;
  let ang;
  if (burst || spec.dir === "out") ang = R() * 6.283;
  else if (spec.dir === "up") ang = -1.5708 + (R() - 0.5) * 1.4;
  else if (spec.dir === "down") ang = 1.5708 + (R() - 0.5) * 1.1;
  else ang = travelAng + (R() < 0.5 ? 1 : -1) * 1.5708 + (R() - 0.5) * 1.0;
  const sp = (spec.speed[0] + (spec.speed[1] - spec.speed[0]) * R()) * (burst ? 1.3 : 1);
  if (review.parts.length >= 170) review.parts.splice(0, review.parts.length - 169);
  const seed = R() * 1000;
  review.parts.push({
    x, y, t0: t, life: (spec.life[0] + (spec.life[1] - spec.life[0]) * R()) * (burst ? 0.92 : 1),
    vx: Math.cos(ang) * sp + tvx * 0.12, vy: Math.sin(ang) * sp + tvy * 0.12, ay: (spec.grav || 0) + (spec.lift || 0),
    size: spec.size[0] + (spec.size[1] - spec.size[0]) * R(), shape: spec.shape, rot: R() * 6.283, spin: (spec.spin || 0) * (R() - 0.5) * 2,
    seed, alpha: spec.alpha || 1, flicker: !!spec.flicker, snap: spec.snap || 0, rgb: rvColor(st, t, seed)
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
        spawned++;
      }
    }
  }
  review.emitT = lastT;
  // when the pointer comes to rest, the effect gives one small flourish at the head: it marks the spot being pointed at
  if (st.rest && !review.restFired && review.hasFilter && pts.length > 3 && now - review.lastMoveT > 150) {
    review.restFired = true;
    const head = pts[pts.length - 1];
    for (let i = 0; i < st.rest.count; i++) spawnReviewParticle(st.rest, st, head.x, head.y, now, 0, 0, 0, true);
  }
}

function drawReviewParticles(c, st, now, sz) {
  const parts = review.parts;
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i], ageMs = now - p.t0;
    if (ageMs >= p.life) { parts.splice(i, 1); continue; }
    if (ageMs < 0) continue;
    const u = ageMs / p.life, s = ageMs / 1000, e = Math.exp(-2.4 * s), f = (1 - e) / 2.4;
    let x = p.x + p.vx * f, y = p.y + p.vy * f + 0.5 * p.ay * s * s;
    if (p.snap) { x = Math.round(x / p.snap) * p.snap; y = Math.round(y / p.snap) * p.snap; }
    const env = rvEnvelope(u);
    let a = env.a * p.alpha;
    if (p.flicker) a *= 0.75 + 0.25 * Math.sin(ageMs * 0.03 + p.seed);
    const r = p.size * sz * env.s;
    const rot = p.shape === "streak" ? Math.atan2(p.vy * e + p.ay * s, p.vx * e) : p.rot + p.spin * s;
    drawGlyph(c, p.shape, x, y, r, rot, p.rgb, a, u, p.seed);
    rvAdd(x, y, r * 3.2 + (p.shape === "streak" ? r * 2 : 0));
  }
}

function drawTrail(now) {
  const c = review.trailCtx, dpr = review.dpr;
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (review.box) c.clearRect(review.box.x, review.box.y, review.box.w, review.box.h);
  else c.clearRect(0, 0, review.w, review.h);
  const pts = review.pts;
  const life = reducedMotionQuery.matches ? 700 : REVIEW.trailLife;
  let drop = 0;
  while (drop < pts.length && now - pts[drop].t > life) drop++;
  if (drop) pts.splice(0, drop);
  const st = reviewStyle(state.prefs.reviewFx);
  if (!st) review.parts.length = 0;
  if (!pts.length && !review.parts.length) { review.box = null; return; }

  review.now = now; review.life = life;
  review.bb = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
  const pal = review.pal || reviewPalette();
  const sizeMul = REVIEW.sizes[state.prefs.reviewSize] || 1;
  const sz = Math.pow(sizeMul, 0.6) * 1.45;                                // glyphs grow gently with line thickness
  const gain = st ? st.line : { halo: 1, core: 1 };
  const lineGain = [gain.halo || 1, 1, gain.core || 1];
  const colorAt = (t) => pal.iris ? IRIS[Math.floor(((t * 0.09) % 360) / 15) % 24] : pal.base;

  let totalLen = 0;
  for (let i = 1; i < pts.length; i++) if (!pts[i].b) totalLen += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  const spacing = Math.max(1.4, totalLen / 1800);                        // keeps very long, fast strokes affordable

  let s = 0;
  while (s < pts.length) {
    let e = s + 1;
    while (e < pts.length && !pts[e].b) e++;
    if (e - s >= 2) {
      buildPath(pts, s, e, spacing);
      const vx = review.vx, vy = review.vy, vt = review.vt, n = vx.length;
      for (let li = 0; li < REVIEW.layers.length; li++) {
        const L = REVIEW.layers[li], R = L.R * sizeMul;
        for (let i = 0; i < n; i += L.stride) {
          const I = rvIntensity(vt[i]);
          if (I < 0.015) continue;
          const r = R * (0.38 + 0.62 * Math.pow(I, 0.6));                 // tail tapers to a hair
          c.globalAlpha = Math.min(1, Math.pow(I, 0.8));
          c.drawImage(reviewSprite(li, colorAt(vt[i]), lineGain[li]), vx[i] - r, vy[i] - r, r * 2, r * 2);
        }
      }
      c.globalAlpha = 1;
      for (let i = 0; i < n; i += 4) rvAdd(vx[i], vy[i], 28 * sizeMul);
      rvAdd(vx[n - 1], vy[n - 1], 28 * sizeMul);
      if (st) drawShimmer(c, st, now, vx, vy, vt, n, sz);
    }
    s = e;
  }

  // pointer dot: a slightly larger pale point at the head that fades with the line when the mouse rests
  if (pts.length) {
    const head = pts[pts.length - 1];
    const hi = rvIntensity(head.t);
    if (hi > 0.02) {
      const r = REVIEW.layers[2].R * sizeMul * 1.5;
      c.globalAlpha = Math.min(1, hi);
      c.drawImage(reviewSprite(1, colorAt(head.t)), head.x - r * 2, head.y - r * 2, r * 4, r * 4);
      c.drawImage(reviewSprite(2, colorAt(head.t), lineGain[2]), head.x - r, head.y - r, r * 2, r * 2);
      c.globalAlpha = 1;
      rvAdd(head.x, head.y, r * 2.5);
    }
  }
  if (st) drawReviewParticles(c, st, now, sz);
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
