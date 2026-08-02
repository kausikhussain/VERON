import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { FABRIC_OPTIONS, FabricConfig, generateFabricTextures } from '../utils/fabricTextureGenerator';
import { Compass, RotateCw, Eye, Sun, Sparkles, Layers, Sliders, Check, Download, Palette, ShieldCheck, Shirt } from 'lucide-react';

export const ThreeDExperience: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Mode selection: 'fabric' (3D Suit Fabric Configurator) vs 'objects' (3D Luxury Objects)
  const [activeTab, setActiveTab] = useState<'fabric' | 'objects'>('fabric');

  // Fabric Configurator State
  const [selectedFabric, setSelectedFabric] = useState<FabricConfig>(FABRIC_OPTIONS[0]);
  const [customColor, setCustomColor] = useState<string>(FABRIC_OPTIONS[0].baseColor);
  const [normalScale, setNormalScale] = useState<number>(FABRIC_OPTIONS[0].normalScale);
  const [uvScale, setUvScale] = useState<number>(FABRIC_OPTIONS[0].uvScale);
  const [monogramText, setMonogramText] = useState<string>('A.V. - MAYFAIR 2026');

  // Object Studio State
  const [selectedObject, setSelectedObject] = useState<'watch' | 'fragrance' | 'sunglasses' | 'holdall' | 'shoe'>('watch');
  
  // Rendering Controls
  const [lightingPreset, setLightingPreset] = useState<'atelier' | 'gold' | 'velvet'>('atelier');
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  // Three.js Scene References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Update custom color & scale defaults when fabric changes
  const handleSelectFabric = (fabric: FabricConfig) => {
    setSelectedFabric(fabric);
    setCustomColor(fabric.baseColor);
    setNormalScale(fabric.normalScale);
    setUvScale(fabric.uvScale);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08080a);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 7.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc5a059, 2.5);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight2.position.set(-5, -3, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xd4af37, 2, 20);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Group for 3D meshes
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Rebuild Scene
    rebuild3DScene();

    // Mouse Drag Rotation Controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.008;
      meshGroupRef.current.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (meshGroupRef.current && autoRotate && !isDraggingRef.current) {
        meshGroupRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 520;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, []);

  // Rebuild 3D Scene when mode, fabric, color, scale, monogram, or wireframe changes
  const rebuild3DScene = () => {
    if (!meshGroupRef.current) return;
    const group = meshGroupRef.current;

    // Clear previous children
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
    }

    if (activeTab === 'fabric') {
      build3DSuitModel(group);
    } else {
      build3DLuxuryObject(selectedObject, group);
    }
  };

  useEffect(() => {
    rebuild3DScene();
  }, [activeTab, selectedFabric, customColor, normalScale, uvScale, monogramText, selectedObject, wireframeMode]);

  // Lighting Presets Effect
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    scene.traverse((child) => {
      if (child instanceof THREE.DirectionalLight) {
        if (lightingPreset === 'atelier') {
          child.color.setHex(0xffffff);
          child.intensity = 2.2;
        } else if (lightingPreset === 'gold') {
          child.color.setHex(0xc5a059);
          child.intensity = 2.8;
        } else if (lightingPreset === 'velvet') {
          child.color.setHex(0x4a5568);
          child.intensity = 1.6;
        }
      }
    });
  }, [lightingPreset]);

  /**
   * Helper to build the 3D Suit Model with real-time Normal Map Fabric Configurator
   */
  const build3DSuitModel = (group: THREE.Group) => {
    // 1. Generate Procedural Normal Map & Diffuse Textures for selected fabric
    const { diffuseTexture, normalTexture } = generateFabricTextures(
      { ...selectedFabric, uvScale },
      customColor
    );

    const suitMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(customColor),
      map: diffuseTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(normalScale, normalScale),
      roughness: selectedFabric.roughness,
      metalness: selectedFabric.metalness,
      wireframe: wireframeMode,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: wireframeMode,
    });

    const woodStandMat = new THREE.MeshStandardMaterial({
      color: 0x2e180d,
      roughness: 0.7,
      wireframe: wireframeMode,
    });

    const brassPillarMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: wireframeMode,
    });

    // 2. Sculpted Suit Torso (Chest & Waist)
    const torsoGeo = new THREE.CylinderGeometry(1.6, 1.1, 3.2, 32);
    const torsoMesh = new THREE.Mesh(torsoGeo, suitMaterial);
    torsoMesh.position.set(0, 0.4, 0);
    group.add(torsoMesh);

    // Shoulder Caps
    const shoulderLGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const shoulderL = new THREE.Mesh(shoulderLGeo, suitMaterial);
    shoulderL.position.set(-1.6, 1.6, 0);
    shoulderL.scale.set(1.1, 0.7, 0.9);
    group.add(shoulderL);

    const shoulderR = new THREE.Mesh(shoulderLGeo, suitMaterial);
    shoulderR.position.set(1.6, 1.6, 0);
    shoulderR.scale.set(1.1, 0.7, 0.9);
    group.add(shoulderR);

    // 3. Structured Peak Lapels (Left & Right)
    const lapelGeo = new THREE.BoxGeometry(0.45, 1.8, 0.12);
    
    const lapelL = new THREE.Mesh(lapelGeo, suitMaterial);
    lapelL.position.set(-0.55, 1.1, 0.95);
    lapelL.rotation.set(0.15, -0.25, -0.3);
    group.add(lapelL);

    const lapelR = new THREE.Mesh(lapelGeo, suitMaterial);
    lapelR.position.set(0.55, 1.1, 0.95);
    lapelR.rotation.set(0.15, 0.25, 0.3);
    group.add(lapelR);

    // Suit Collar Band
    const collarGeo = new THREE.TorusGeometry(0.85, 0.12, 16, 32);
    const collarMesh = new THREE.Mesh(collarGeo, suitMaterial);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.set(0, 1.85, 0);
    group.add(collarMesh);

    // 4. Monogrammed Inner Canvas Silk Lining
    const liningCanvas = document.createElement('canvas');
    liningCanvas.width = 512;
    liningCanvas.height = 256;
    const lctx = liningCanvas.getContext('2d')!;
    lctx.fillStyle = '#0D0E12';
    lctx.fillRect(0, 0, 512, 256);
    lctx.strokeStyle = '#C5A059';
    lctx.lineWidth = 4;
    lctx.strokeRect(12, 12, 488, 232);
    lctx.fillStyle = '#C5A059';
    lctx.font = 'bold 20px serif';
    lctx.textAlign = 'center';
    lctx.fillText('AURELIUS MAYFAIR ATELIER', 256, 60);
    lctx.font = 'italic 15px serif';
    lctx.fillStyle = '#EFECE6';
    lctx.fillText('BESPOKE TAILORING SPECIFICATION', 256, 95);
    lctx.font = 'bold 36px serif';
    lctx.fillStyle = '#C5A059';
    lctx.fillText(monogramText || 'A.V. - MAYFAIR 2026', 256, 160);
    lctx.font = '12px monospace';
    lctx.fillText('HAND-CRAFTED VICTORIA CANVAS', 256, 205);

    const liningTexture = new THREE.CanvasTexture(liningCanvas);
    const liningMaterial = new THREE.MeshStandardMaterial({
      map: liningTexture,
      roughness: 0.3,
      wireframe: wireframeMode,
    });

    const liningGeo = new THREE.PlaneGeometry(1.2, 1.6);
    const liningMesh = new THREE.Mesh(liningGeo, liningMaterial);
    liningMesh.position.set(0, 0.8, 0.88);
    liningMesh.rotation.x = -0.1;
    group.add(liningMesh);

    // 5. Double-Breasted Horn/Brass Buttons (6 buttons)
    const buttonGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.05, 32);
    const buttonPositions = [
      [-0.45, 0.6, 1.12],
      [0.45, 0.6, 1.12],
      [-0.45, 0.1, 1.05],
      [0.45, 0.1, 1.05],
      [-0.45, -0.4, 0.98],
      [0.45, -0.4, 0.98],
    ];

    buttonPositions.forEach(([x, y, z]) => {
      const button = new THREE.Mesh(buttonGeo, goldAccentMat);
      button.rotation.x = Math.PI / 2;
      button.position.set(x, y, z);
      group.add(button);
    });

    // 6. Breast Pocket & Silk Handkerchief
    const pocketGeo = new THREE.BoxGeometry(0.5, 0.04, 0.08);
    const pocket = new THREE.Mesh(pocketGeo, suitMaterial);
    pocket.position.set(-0.7, 1.05, 1.02);
    pocket.rotation.z = 0.1;
    group.add(pocket);

    // Silk Handkerchief
    const silkMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      roughness: 0.2,
      metalness: 0.3,
      wireframe: wireframeMode,
    });
    const kerchiefGeo = new THREE.ConeGeometry(0.12, 0.35, 4);
    const kerchief = new THREE.Mesh(kerchiefGeo, silkMat);
    kerchief.position.set(-0.7, 1.22, 1.02);
    kerchief.rotation.z = -0.2;
    group.add(kerchief);

    // 7. Tailor's Wooden & Brass Stand Base
    const neckCapGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.4, 32);
    const neckCap = new THREE.Mesh(neckCapGeo, woodStandMat);
    neckCap.position.set(0, 2.1, 0);
    group.add(neckCap);

    const pillarGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.5, 32);
    const pillar = new THREE.Mesh(pillarGeo, brassPillarMat);
    pillar.position.set(0, -2.1, 0);
    group.add(pillar);

    const standBaseGeo = new THREE.CylinderGeometry(1.2, 1.4, 0.2, 32);
    const standBase = new THREE.Mesh(standBaseGeo, woodStandMat);
    standBase.position.set(0, -3.3, 0);
    group.add(standBase);
  };

  /**
   * Helper to build 3D Luxury Objects
   */
  const build3DLuxuryObject = (type: string, group: THREE.Group) => {
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: wireframeMode,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x2a2b30,
      metalness: 0.85,
      roughness: 0.3,
      wireframe: wireframeMode,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
      wireframe: wireframeMode,
    });

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      metalness: 0.1,
      roughness: 0.6,
      wireframe: wireframeMode,
    });

    if (type === 'watch') {
      const bezelGeo = new THREE.TorusGeometry(1.6, 0.2, 32, 100);
      const bezel = new THREE.Mesh(bezelGeo, goldMat);
      group.add(bezel);

      const caseGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 64);
      const caseMesh = new THREE.Mesh(caseGeo, titaniumMat);
      caseMesh.rotation.x = Math.PI / 2;
      group.add(caseMesh);

      const handGeo = new THREE.BoxGeometry(0.08, 1.1, 0.05);
      const hourHand = new THREE.Mesh(handGeo, goldMat);
      hourHand.position.set(0, 0.3, 0.2);
      hourHand.rotation.z = -Math.PI / 4;
      group.add(hourHand);

      const minuteHand = new THREE.Mesh(handGeo, goldMat);
      minuteHand.scale.set(0.7, 1.2, 1);
      minuteHand.position.set(0.3, 0, 0.2);
      minuteHand.rotation.z = Math.PI / 3;
      group.add(minuteHand);

      const strapGeo = new THREE.BoxGeometry(1.2, 2.5, 0.15);
      const strapTop = new THREE.Mesh(strapGeo, leatherMat);
      strapTop.position.set(0, 2.6, -0.1);
      group.add(strapTop);

      const strapBottom = new THREE.Mesh(strapGeo, leatherMat);
      strapBottom.position.set(0, -2.6, -0.1);
      group.add(strapBottom);
    } else if (type === 'fragrance') {
      const bottleGeo = new THREE.BoxGeometry(2, 3, 1.2);
      const bottle = new THREE.Mesh(bottleGeo, glassMat);
      group.add(bottle);

      const liquidMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.1,
        metalness: 0.2,
        wireframe: wireframeMode,
      });
      const liquidGeo = new THREE.BoxGeometry(1.8, 2.2, 1.0);
      const liquid = new THREE.Mesh(liquidGeo, liquidMat);
      liquid.position.set(0, -0.3, 0);
      group.add(liquid);

      const capGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.8, 32);
      const cap = new THREE.Mesh(capGeo, goldMat);
      cap.position.set(0, 1.9, 0);
      group.add(cap);
    } else if (type === 'sunglasses') {
      const rimGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 50);
      const leftRim = new THREE.Mesh(rimGeo, goldMat);
      leftRim.position.set(-1.1, 0, 0);
      group.add(leftRim);

      const rightRim = new THREE.Mesh(rimGeo, goldMat);
      rightRim.position.set(1.1, 0, 0);
      group.add(rightRim);

      const lensMat = new THREE.MeshPhysicalMaterial({
        color: 0x111115,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9,
        wireframe: wireframeMode,
      });
      const lensGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.05, 32);
      const leftLens = new THREE.Mesh(lensGeo, lensMat);
      leftLens.rotation.x = Math.PI / 2;
      leftLens.position.set(-1.1, 0, 0);
      group.add(leftLens);

      const rightLens = new THREE.Mesh(lensGeo, lensMat);
      rightLens.rotation.x = Math.PI / 2;
      rightLens.position.set(1.1, 0, 0);
      group.add(rightLens);

      const bridgeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 16);
      const bridge = new THREE.Mesh(bridgeGeo, goldMat);
      bridge.rotation.z = Math.PI / 2;
      bridge.position.set(0, 0.3, 0);
      group.add(bridge);
    } else if (type === 'holdall') {
      const bodyGeo = new THREE.CylinderGeometry(1.4, 1.4, 3.8, 32);
      const body = new THREE.Mesh(bodyGeo, leatherMat);
      body.rotation.z = Math.PI / 2;
      group.add(body);

      const zipGeo = new THREE.BoxGeometry(3.6, 0.1, 0.2);
      const zip = new THREE.Mesh(zipGeo, goldMat);
      zip.position.set(0, 1.4, 0);
      group.add(zip);

      const handleGeo = new THREE.TorusGeometry(0.8, 0.1, 16, 32);
      const handle1 = new THREE.Mesh(handleGeo, leatherMat);
      handle1.position.set(-0.8, 1.6, 0);
      group.add(handle1);

      const handle2 = new THREE.Mesh(handleGeo, leatherMat);
      handle2.position.set(0.8, 1.6, 0);
      group.add(handle2);
    } else if (type === 'shoe') {
      const soleGeo = new THREE.BoxGeometry(3.5, 0.4, 1.2);
      const sole = new THREE.Mesh(soleGeo, titaniumMat);
      sole.position.set(0, -0.8, 0);
      group.add(sole);

      const upperGeo = new THREE.ConeGeometry(1.4, 3.2, 32);
      const upper = new THREE.Mesh(upperGeo, leatherMat);
      upper.rotation.z = -Math.PI / 3;
      upper.position.set(0.2, 0.2, 0);
      group.add(upper);

      const heelGeo = new THREE.BoxGeometry(0.8, 0.6, 1.2);
      const heel = new THREE.Mesh(heelGeo, goldMat);
      heel.position.set(-1.3, -0.6, 0);
      group.add(heel);
    }
  };

  const colorPresets = [
    { name: 'Midnight Obsidian', hex: '#08080A' },
    { name: 'Imperial Navy', hex: '#0E1B2E' },
    { name: 'Charcoal Slate', hex: '#2C3539' },
    { name: 'Champagne Oat', hex: '#C5A059' },
    { name: 'Royal Oxblood', hex: '#3A0F18' },
    { name: 'Emerald Tweed', hex: '#112A1F' },
  ];

  return (
    <section id="3d-experience" className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono tracking-[0.3em] uppercase">
              <Compass className="w-4 h-4" />
              <span>REAL-TIME 3D SUIT FABRIC CONFIGURATOR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] mt-2 font-normal">
              3D Suit Fabric <br />
              <span className="italic font-light text-[#C5A059] font-serif">& Atelier Customizer</span>
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-[#121316] border border-[#1F2128] p-1 rounded-full">
            <button
              onClick={() => setActiveTab('fabric')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'fabric'
                  ? 'bg-[#C5A059] text-[#08080A] font-bold shadow-md'
                  : 'text-[#EFECE6]/60 hover:text-[#F8F9FA]'
              }`}
            >
              <Shirt className="w-4 h-4" />
              <span>3D Suit Fabric Configurator</span>
            </button>
            <button
              onClick={() => setActiveTab('objects')}
              className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'objects'
                  ? 'bg-[#C5A059] text-[#08080A] font-bold shadow-md'
                  : 'text-[#EFECE6]/60 hover:text-[#F8F9FA]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3D Luxury Objects</span>
            </button>
          </div>
        </div>

        {/* Main 3D Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121316] border border-[#1F2128] rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Left Sidebar: Controls & Options */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 z-10">
            {activeTab === 'fabric' ? (
              <div className="space-y-6">
                {/* Fabric Selector Grid */}
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-3 flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5" /> SELECT HIGH-END SUIT WEAVE
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {FABRIC_OPTIONS.map((fabric) => (
                      <button
                        key={fabric.id}
                        onClick={() => handleSelectFabric(fabric)}
                        className={`p-3 rounded border text-left transition-all duration-300 cursor-pointer ${
                          selectedFabric.id === fabric.id
                            ? 'bg-[#1F2128] border-[#C5A059] text-[#F8F9FA] shadow-md'
                            : 'bg-[#08080A] border-[#1F2128] text-[#EFECE6]/70 hover:border-[#C5A059]/40 hover:text-[#F8F9FA]'
                        }`}
                      >
                        <p className="font-serif text-xs font-medium line-clamp-1">{fabric.name}</p>
                        <p className="text-[9px] font-mono text-[#C5A059] uppercase mt-0.5">{fabric.origin}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Palette Selector */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" /> FABRIC DYE PALETTE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {colorPresets.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setCustomColor(c.hex)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          customColor === c.hex ? 'border-[#C5A059] scale-110 shadow-lg' : 'border-[#1F2128]'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Real-time Normal Map & Texture Sliders */}
                <div className="space-y-4 p-4 bg-[#08080A] border border-[#1F2128] rounded">
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> NORMAL MAP & WEAVE PARAMETERS
                  </p>

                  {/* Normal Map Scale Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-[#EFECE6]/70">
                      <span>Normal Bump Depth:</span>
                      <span className="text-[#C5A059]">{normalScale.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.2"
                      max="3.0"
                      step="0.1"
                      value={normalScale}
                      onChange={(e) => setNormalScale(parseFloat(e.target.value))}
                      className="w-full accent-[#C5A059] bg-[#1F2128] h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* UV Scale / Density Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-[#EFECE6]/70">
                      <span>Weave Repeat Density:</span>
                      <span className="text-[#C5A059]">{uvScale}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      step="1"
                      value={uvScale}
                      onChange={(e) => setUvScale(parseInt(e.target.value))}
                      className="w-full accent-[#C5A059] bg-[#1F2128] h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  {/* Monogram Input */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] font-mono text-[#C5A059] uppercase block">
                      INNER LINING MONOGRAM EMBLEMATICS:
                    </label>
                    <input
                      type="text"
                      value={monogramText}
                      onChange={(e) => setMonogramText(e.target.value)}
                      placeholder="e.g. A.V. - MAYFAIR 2026"
                      className="w-full bg-[#121316] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-1.5 text-xs text-[#F8F9FA] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-3">
                  SELECT ARCHITECTURAL OBJECT
                </p>
                <div className="flex flex-col gap-2">
                  {(['watch', 'fragrance', 'sunglasses', 'holdall', 'shoe'] as const).map((objKey) => (
                    <button
                      key={objKey}
                      onClick={() => setSelectedObject(objKey)}
                      className={`text-left px-4 py-3.5 rounded text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        selectedObject === objKey
                          ? 'bg-[#1F2128] text-[#C5A059] border-l-2 border-[#C5A059] font-medium'
                          : 'text-[#EFECE6]/60 hover:text-[#F8F9FA] hover:bg-[#1F2128]/50'
                      }`}
                    >
                      <span>
                        {objKey === 'watch'
                          ? 'Chrono Tourbillon 42mm'
                          : objKey === 'fragrance'
                          ? 'Smoked Oud Fragrance Bottle'
                          : objKey === 'sunglasses'
                          ? 'Beta-Titanium Eyewear'
                          : objKey === 'holdall'
                          ? 'Tuscan Leather Holdall'
                          : 'Calfskin Oxford Shoe'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Studio Rendering Controls Footer */}
            <div className="space-y-4 pt-6 border-t border-[#1F2128]">
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase">
                STUDIO LIGHTING & CAMERA
              </p>

              <div className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-xs text-[#EFECE6]/70">Environment:</span>
                <div className="flex gap-1 ml-auto">
                  {(['atelier', 'gold', 'velvet'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setLightingPreset(p)}
                      className={`px-2.5 py-1 text-[10px] uppercase font-mono rounded cursor-pointer ${
                        lightingPreset === p ? 'bg-[#C5A059] text-[#08080A] font-bold' : 'bg-[#1F2128] text-[#EFECE6]/60'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#EFECE6]/70 pt-2">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`flex items-center gap-2 cursor-pointer ${autoRotate ? 'text-[#C5A059]' : 'text-[#EFECE6]/50'}`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                  <span>360° Orbit</span>
                </button>

                <button
                  onClick={() => setWireframeMode(!wireframeMode)}
                  className={`flex items-center gap-2 cursor-pointer ${wireframeMode ? 'text-[#C5A059]' : 'text-[#EFECE6]/50'}`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Wireframe Shading</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3D WebGL Canvas Viewport */}
          <div className="lg:col-span-7 relative flex flex-col justify-between space-y-4">
            <div
              ref={mountRef}
              className="w-full h-[420px] sm:h-[500px] bg-[#08080A] rounded border border-[#1F2128] cursor-grab active:cursor-grabbing relative overflow-hidden shadow-inner"
            />

            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 bg-[#08080A]/85 backdrop-blur-md px-3 py-1.5 border border-[#1F2128] rounded text-[10px] font-mono text-[#C5A059] flex items-center gap-2 pointer-events-none">
              <Eye className="w-3 h-3" />
              <span>3D DRAG ROTATE • REAL-TIME FABRIC NORMAL SHADER</span>
            </div>

            {/* Selected Spec Info Footer */}
            {activeTab === 'fabric' ? (
              <div className="p-4 bg-[#08080A] border border-[#1F2128] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg text-[#F8F9FA]">
                    {selectedFabric.name}
                  </h4>
                  <p className="text-xs font-mono text-[#C5A059] mt-0.5">
                    {selectedFabric.composition} • {selectedFabric.weight}
                  </p>
                  <p className="text-[11px] text-[#EFECE6]/70 italic mt-1">{selectedFabric.description}</p>
                </div>

                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <button
                    onClick={() => {
                      setAppliedNotification('Fabric spec exported to atelier');
                      setTimeout(() => setAppliedNotification(null), 3000);
                    }}
                    className="px-4 py-2 bg-[#C5A059] text-[#08080A] hover:bg-[#EFECE6] font-medium text-xs tracking-widest uppercase rounded flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Spec</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-[#08080A] border border-[#1F2128] rounded flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg text-[#F8F9FA]">
                    AURELIUS 3D Object Studio
                  </h4>
                  <p className="text-xs font-mono text-[#C5A059] mt-0.5">
                    Precision Swiss & Italian Engineering Standard
                  </p>
                </div>
              </div>
            )}

            {appliedNotification && (
              <div className="p-3 bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] rounded text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{appliedNotification}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
