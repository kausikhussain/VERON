import * as THREE from 'three';

export interface FabricConfig {
  id: string;
  name: string;
  composition: string;
  origin: string;
  weight: string;
  type: 'herringbone' | 'birdseye' | 'pinstripe' | 'houndstooth' | 'glenplaid' | 'velvet';
  baseColor: string;
  accentColor: string;
  roughness: number;
  metalness: number;
  normalScale: number;
  uvScale: number;
  description: string;
}

export const FABRIC_OPTIONS: FabricConfig[] = [
  {
    id: 'herringbone-vicuna',
    name: 'Andean Vicuña Herringbone',
    type: 'herringbone',
    composition: '80% Rare Vicuña Fleece, 20% Mulberry Silk',
    origin: 'Biella, Italy',
    weight: '290g/m',
    baseColor: '#1A1816',
    accentColor: '#C5A059',
    roughness: 0.65,
    metalness: 0.1,
    normalScale: 1.8,
    uvScale: 6,
    description: 'Classic chevron weave with directional light catch and supreme softness.',
  },
  {
    id: 'birdseye-wool',
    name: 'Super 180s Birdseye Wool',
    type: 'birdseye',
    composition: '100% Super 180s Australian Merino',
    origin: 'Huddersfield, UK',
    weight: '270g/m',
    baseColor: '#121A24',
    accentColor: '#6B829E',
    roughness: 0.55,
    metalness: 0.15,
    normalScale: 2.2,
    uvScale: 10,
    description: 'Microscopic dot-matrix weave providing subtle depth and tactile texture.',
  },
  {
    id: 'pinstripe-savile',
    name: 'Savile Row Chalkstripe',
    type: 'pinstripe',
    composition: '95% Fine Worsted Wool, 5% Cashmere',
    origin: 'London Mayfair',
    weight: '310g/m',
    baseColor: '#0B0C10',
    accentColor: '#D4D4D8',
    roughness: 0.5,
    metalness: 0.1,
    normalScale: 1.5,
    uvScale: 4,
    description: 'Crisp vertical chalk stripes with raised woven ribbing for executive posture.',
  },
  {
    id: 'houndstooth-heritage',
    name: 'Mayfair Heritage Houndstooth',
    type: 'houndstooth',
    composition: '100% Extrafine Lambswool',
    origin: 'Edinburgh, Scotland',
    weight: '330g/m',
    baseColor: '#1F2128',
    accentColor: '#EFECE6',
    roughness: 0.7,
    metalness: 0.05,
    normalScale: 2.0,
    uvScale: 8,
    description: 'Traditional dual-tone geometric weave pattern with rich character.',
  },
  {
    id: 'glenplaid-bespoke',
    name: 'Prince of Wales Glen Plaid',
    type: 'glenplaid',
    composition: '70% Wool, 20% Silk, 10% Linen',
    origin: 'Veneto, Italy',
    weight: '260g/m',
    baseColor: '#2C3539',
    accentColor: '#C5A059',
    roughness: 0.6,
    metalness: 0.1,
    normalScale: 1.6,
    uvScale: 5,
    description: 'Sophisticated grid check overcheck with subtle multi-tone depth.',
  },
  {
    id: 'velvet-lyon',
    name: 'Lyon Silk Velvet',
    type: 'velvet',
    composition: '100% Silk Velvet',
    origin: 'Lyon, France',
    weight: '350g/m',
    baseColor: '#2A0D15',
    accentColor: '#D4AF37',
    roughness: 0.35,
    metalness: 0.25,
    normalScale: 1.2,
    uvScale: 3,
    description: 'Plush velvet lustre with light-reflecting sheen and fluid drape.',
  },
];

/**
 * Procedurally generates 2D HTML Canvas textures for Normal Maps & Diffuse Maps
 */
export function generateFabricTextures(config: FabricConfig, customBaseColor?: string) {
  const size = 512;
  
  // 1. Diffuse Canvas
  const diffuseCanvas = document.createElement('canvas');
  diffuseCanvas.width = size;
  diffuseCanvas.height = size;
  const ctxD = diffuseCanvas.getContext('2d')!;

  // 2. Normal Canvas
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = size;
  normalCanvas.height = size;
  const ctxN = normalCanvas.getContext('2d')!;

  const baseHex = customBaseColor || config.baseColor;

  // Fill base background
  ctxD.fillStyle = baseHex;
  ctxD.fillRect(0, 0, size, size);

  // Normal Map flat default: RGB (128, 128, 255)
  ctxN.fillStyle = 'rgb(128, 128, 255)';
  ctxN.fillRect(0, 0, size, size);

  const imgDataN = ctxN.getImageData(0, 0, size, size);
  const dataN = imgDataN.data;

  // Helper to set normal pixel at (x, y)
  const setNormal = (x: number, y: number, nx: number, ny: number, nz: number = 1.0) => {
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const index = (y * size + x) * 4;
    // Map normal components [-1, 1] to byte [0, 255]
    dataN[index] = Math.floor(((nx + 1) / 2) * 255);
    dataN[index + 1] = Math.floor(((ny + 1) / 2) * 255);
    dataN[index + 2] = Math.floor(((nz + 1) / 2) * 255);
    dataN[index + 3] = 255;
  };

  // Pattern Specific Generation
  if (config.type === 'herringbone') {
    const bandWidth = 32;
    ctxD.strokeStyle = config.accentColor;
    ctxD.lineWidth = 1.5;
    ctxD.globalAlpha = 0.25;

    for (let x = 0; x < size; x += bandWidth) {
      const isRight = (x / bandWidth) % 2 === 0;
      for (let y = -size; y < size * 2; y += 8) {
        if (isRight) {
          ctxD.beginPath();
          ctxD.moveTo(x, y);
          ctxD.lineTo(x + bandWidth, y + bandWidth);
          ctxD.stroke();
        } else {
          ctxD.beginPath();
          ctxD.moveTo(x, y + bandWidth);
          ctxD.lineTo(x + bandWidth, y);
          ctxD.stroke();
        }
      }
    }

    // Generate Herringbone Normal Map
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const bandIndex = Math.floor(x / bandWidth);
        const isRight = bandIndex % 2 === 0;
        const localY = (y % 16) / 16;
        const dir = isRight ? 1 : -1;
        const nx = dir * 0.5 * Math.sin(localY * Math.PI * 2);
        const ny = 0.4 * Math.cos(localY * Math.PI * 2);
        setNormal(x, y, nx, ny, 0.85);
      }
    }
  } else if (config.type === 'birdseye') {
    const spacing = 16;
    ctxD.fillStyle = config.accentColor;
    ctxD.globalAlpha = 0.3;

    for (let y = 0; y < size; y += spacing) {
      for (let x = 0; x < size; x += spacing) {
        const offsetX = (Math.floor(y / spacing) % 2) * (spacing / 2);
        ctxD.beginPath();
        ctxD.arc(x + offsetX, y, 2.5, 0, Math.PI * 2);
        ctxD.fill();
      }
    }

    // Generate Birdseye Normal Map (dot matrix bumps)
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const row = Math.floor(y / spacing);
        const offsetX = (row % 2) * (spacing / 2);
        const cx = (Math.floor((x - offsetX) / spacing) * spacing) + spacing / 2 + offsetX;
        const cy = (row * spacing) + spacing / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 5) {
          const factor = Math.cos((dist / 5) * (Math.PI / 2));
          const nx = (dx / 5) * factor;
          const ny = (dy / 5) * factor;
          setNormal(x, y, nx, ny, 0.8);
        } else {
          setNormal(x, y, 0, 0, 1.0);
        }
      }
    }
  } else if (config.type === 'pinstripe') {
    const stripeGap = 64;
    ctxD.strokeStyle = config.accentColor;
    ctxD.lineWidth = 2;
    ctxD.globalAlpha = 0.6;

    for (let x = stripeGap / 2; x < size; x += stripeGap) {
      ctxD.beginPath();
      ctxD.moveTo(x, 0);
      ctxD.lineTo(x, size);
      ctxD.stroke();
    }

    // Generate Pinstripe Ribbing Normal Map
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const distToStripe = Math.abs((x % stripeGap) - stripeGap / 2);
        if (distToStripe < 3) {
          const nx = ((x % stripeGap) - stripeGap / 2) / 3;
          const ny = Math.sin((y % 8) * 0.8) * 0.2;
          setNormal(x, y, nx, ny, 0.7);
        } else {
          // Fine vertical ribbing
          const nx = Math.sin(x * 0.8) * 0.2;
          setNormal(x, y, nx, 0, 0.95);
        }
      }
    }
  } else if (config.type === 'houndstooth') {
    const tileSize = 32;
    ctxD.fillStyle = config.accentColor;
    ctxD.globalAlpha = 0.35;

    for (let y = 0; y < size; y += tileSize) {
      for (let x = 0; x < size; x += tileSize) {
        if ((Math.floor(x / tileSize) + Math.floor(y / tileSize)) % 2 === 0) {
          ctxD.fillRect(x, y, tileSize / 2, tileSize / 2);
          ctxD.fillRect(x + tileSize / 2, y + tileSize / 2, tileSize / 2, tileSize / 2);
        }
      }
    }

    // Houndstooth Normals
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const tileX = Math.floor(x / 16);
        const tileY = Math.floor(y / 16);
        const isAlt = (tileX + tileY) % 2 === 0;
        const nx = isAlt ? 0.3 : -0.3;
        const ny = isAlt ? -0.3 : 0.3;
        setNormal(x, y, nx, ny, 0.85);
      }
    }
  } else if (config.type === 'glenplaid') {
    ctxD.strokeStyle = config.accentColor;
    ctxD.lineWidth = 1;
    ctxD.globalAlpha = 0.25;

    const grid = 64;
    for (let i = 0; i < size; i += grid) {
      ctxD.strokeRect(i, 0, grid, size);
      ctxD.strokeRect(0, i, size, grid);
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = Math.sin((x + y) * 0.2) * 0.2;
        const ny = Math.cos((x - y) * 0.2) * 0.2;
        setNormal(x, y, nx, ny, 0.9);
      }
    }
  } else {
    // Velvet
    ctxD.fillStyle = config.accentColor;
    ctxD.globalAlpha = 0.08;
    for (let i = 0; i < 3000; i++) {
      const rx = Math.random() * size;
      const ry = Math.random() * size;
      ctxD.fillRect(rx, ry, 1.5, 1.5);
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const nx = (Math.random() - 0.5) * 0.15;
        const ny = (Math.random() - 0.5) * 0.15;
        setNormal(x, y, nx, ny, 0.98);
      }
    }
  }

  ctxN.putImageData(imgDataN, 0, 0);

  // Create Three.js Textures
  const diffuseTexture = new THREE.CanvasTexture(diffuseCanvas);
  diffuseTexture.wrapS = THREE.RepeatWrapping;
  diffuseTexture.wrapT = THREE.RepeatWrapping;
  diffuseTexture.repeat.set(config.uvScale, config.uvScale);

  const normalTexture = new THREE.CanvasTexture(normalCanvas);
  normalTexture.wrapS = THREE.RepeatWrapping;
  normalTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.repeat.set(config.uvScale, config.uvScale);

  return { diffuseTexture, normalTexture };
}
