import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'motion/react';
import { Compass, RotateCw, Eye, Sun, Sparkles, Layers } from 'lucide-react';

export const ThreeDExperience: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedObject, setSelectedObject] = useState<'watch' | 'fragrance' | 'sunglasses' | 'holdall' | 'shoe'>('watch');
  const [lightingPreset, setLightingPreset] = useState<'gold' | 'stealth' | 'velvet'>('gold');
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframeMode, setWireframeMode] = useState(false);

  // Three.js scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x08080a);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
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

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    // Create current object mesh
    build3DObject(selectedObject, group, wireframeMode);

    // Mouse drag rotation controls
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
      const h = mountRef.current.clientHeight || 500;
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

  // Update Object when selection or wireframe changes
  useEffect(() => {
    if (meshGroupRef.current) {
      build3DObject(selectedObject, meshGroupRef.current, wireframeMode);
    }
  }, [selectedObject, wireframeMode]);

  // Update Lighting Presets
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    
    // Find directional lights and adjust
    scene.traverse((child) => {
      if (child instanceof THREE.DirectionalLight) {
        if (lightingPreset === 'gold') {
          child.color.setHex(0xc5a059);
          child.intensity = 2.5;
        } else if (lightingPreset === 'stealth') {
          child.color.setHex(0x4a5568);
          child.intensity = 1.8;
        } else if (lightingPreset === 'velvet') {
          child.color.setHex(0xefece6);
          child.intensity = 2.0;
        }
      }
    });
  }, [lightingPreset]);

  // Helper to build 3D mesh geometry for each luxury object
  const build3DObject = (type: string, group: THREE.Group, wireframe: boolean) => {
    // Clear existing
    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
    }

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.9,
      roughness: 0.2,
      wireframe,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x2a2b30,
      metalness: 0.85,
      roughness: 0.3,
      wireframe,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
      wireframe,
    });

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314,
      metalness: 0.1,
      roughness: 0.6,
      wireframe,
    });

    if (type === 'watch') {
      // 1. Outer Bezel Ring
      const bezelGeo = new THREE.TorusGeometry(1.6, 0.2, 32, 100);
      const bezel = new THREE.Mesh(bezelGeo, goldMat);
      group.add(bezel);

      // 2. Watch Face Case
      const caseGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 64);
      const caseMesh = new THREE.Mesh(caseGeo, titaniumMat);
      caseMesh.rotation.x = Math.PI / 2;
      group.add(caseMesh);

      // 3. Dial Hands
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

      // 4. Straps (Top & Bottom)
      const strapGeo = new THREE.BoxGeometry(1.2, 2.5, 0.15);
      const strapTop = new THREE.Mesh(strapGeo, leatherMat);
      strapTop.position.set(0, 2.6, -0.1);
      group.add(strapTop);

      const strapBottom = new THREE.Mesh(strapGeo, leatherMat);
      strapBottom.position.set(0, -2.6, -0.1);
      group.add(strapBottom);
    } else if (type === 'fragrance') {
      // Crystalline Perfume Bottle
      const bottleGeo = new THREE.BoxGeometry(2, 3, 1.2);
      const bottle = new THREE.Mesh(bottleGeo, glassMat);
      group.add(bottle);

      // Liquid Core
      const liquidMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        roughness: 0.1,
        metalness: 0.2,
        wireframe,
      });
      const liquidGeo = new THREE.BoxGeometry(1.8, 2.2, 1.0);
      const liquid = new THREE.Mesh(liquidGeo, liquidMat);
      liquid.position.set(0, -0.3, 0);
      group.add(liquid);

      // Brass Cap
      const capGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.8, 32);
      const cap = new THREE.Mesh(capGeo, goldMat);
      cap.position.set(0, 1.9, 0);
      group.add(cap);
    } else if (type === 'sunglasses') {
      // Frames (Left & Right Lens Rims)
      const rimGeo = new THREE.TorusGeometry(0.9, 0.08, 16, 50);
      const leftRim = new THREE.Mesh(rimGeo, goldMat);
      leftRim.position.set(-1.1, 0, 0);
      group.add(leftRim);

      const rightRim = new THREE.Mesh(rimGeo, goldMat);
      rightRim.position.set(1.1, 0, 0);
      group.add(rightRim);

      // Tinted Lenses
      const lensMat = new THREE.MeshPhysicalMaterial({
        color: 0x111115,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.9,
        wireframe,
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

      // Bridge Bar
      const bridgeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 16);
      const bridge = new THREE.Mesh(bridgeGeo, goldMat);
      bridge.rotation.z = Math.PI / 2;
      bridge.position.set(0, 0.3, 0);
      group.add(bridge);
    } else if (type === 'holdall') {
      // Leather Bag Body
      const bodyGeo = new THREE.CylinderGeometry(1.4, 1.4, 3.8, 32);
      const body = new THREE.Mesh(bodyGeo, leatherMat);
      body.rotation.z = Math.PI / 2;
      group.add(body);

      // Gold Zipper Line
      const zipGeo = new THREE.BoxGeometry(3.6, 0.1, 0.2);
      const zip = new THREE.Mesh(zipGeo, goldMat);
      zip.position.set(0, 1.4, 0);
      group.add(zip);

      // Handles
      const handleGeo = new THREE.TorusGeometry(0.8, 0.1, 16, 32);
      const handle1 = new THREE.Mesh(handleGeo, leatherMat);
      handle1.position.set(-0.8, 1.6, 0);
      group.add(handle1);

      const handle2 = new THREE.Mesh(handleGeo, leatherMat);
      handle2.position.set(0.8, 1.6, 0);
      group.add(handle2);
    } else if (type === 'shoe') {
      // Shoe Sole
      const soleGeo = new THREE.BoxGeometry(3.5, 0.4, 1.2);
      const sole = new THREE.Mesh(soleGeo, titaniumMat);
      sole.position.set(0, -0.8, 0);
      group.add(sole);

      // Upper Leather
      const upperGeo = new THREE.ConeGeometry(1.4, 3.2, 32);
      const upper = new THREE.Mesh(upperGeo, leatherMat);
      upper.rotation.z = -Math.PI / 3;
      upper.position.set(0.2, 0.2, 0);
      group.add(upper);

      // Heel Accent
      const heelGeo = new THREE.BoxGeometry(0.8, 0.6, 1.2);
      const heel = new THREE.Mesh(heelGeo, goldMat);
      heel.position.set(-1.3, -0.6, 0);
      group.add(heel);
    }
  };

  const objectDetails = {
    watch: {
      name: "AURELIUS Chrono Tourbillon 42mm",
      material: "Grade 5 Titanium & 18k Gold",
      craft: "Swiss Geneva Manual Wind • 72h Power Reserve",
      price: "$24,500",
    },
    fragrance: {
      name: "No. IX Smoked Frankincense & Amber Oud",
      material: "Hand-Blown Crystal & Solid Brass",
      craft: "Grasse Haute Parfumerie • 25% Pure Extract",
      price: "$420",
    },
    sunglasses: {
      name: "Beta-Titanium Filigree Eyewear",
      material: "Japanese Titanium & ZEISS Polarized Lens",
      craft: "Hand-Polished in Sabae, Japan • 24k Gold Inlay",
      price: "$880",
    },
    holdall: {
      name: "Atelier Tuscan Leather Holdall 55cm",
      material: "Vegetable-Tanned Tuscan Calf Leather",
      craft: "Santa Croce Hand-Stitching • Brass Padlock",
      price: "$3,800",
    },
    shoe: {
      name: "Wholecut French Calfskin Oxford",
      material: "Single-Cut French Box Calfskin",
      craft: "Goodyear-Welted Florence Workshop • Fiddleback Sole",
      price: "$1,950",
    },
  };

  return (
    <section id="3d-experience" className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#C5A059] text-xs font-mono tracking-[0.3em] uppercase">
              <Compass className="w-4 h-4" />
              <span>INTERACTIVE 3D ATELIER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] mt-2 font-normal">
              Objects of <br />
              <span className="italic font-light text-[#C5A059] font-serif">Timeless Precision</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-light text-[#EFECE6]/70 max-w-md">
            Drag to rotate 360°, switch studio lighting environments, or toggle wireframe mesh mode to examine our engineering standards.
          </p>
        </div>

        {/* 3D Interactive Canvas & Controls Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#121316] border border-[#1F2128] rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Object Selector Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6 z-10">
            <div>
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-3">
                SELECT ARCHITECTURAL OBJECT
              </p>
              <div className="flex flex-col gap-2">
                {(['watch', 'fragrance', 'sunglasses', 'holdall', 'shoe'] as const).map((objKey) => (
                  <button
                    key={objKey}
                    onClick={() => setSelectedObject(objKey)}
                    className={`text-left px-4 py-3 rounded text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      selectedObject === objKey
                        ? 'bg-[#1F2128] text-[#C5A059] border-l-2 border-[#C5A059] font-medium'
                        : 'text-[#EFECE6]/60 hover:text-[#F8F9FA] hover:bg-[#1F2128]/50'
                    }`}
                  >
                    <span>{objKey === 'watch' ? 'Chrono Tourbillon' : objKey === 'fragrance' ? 'Smoked Oud Bottle' : objKey === 'sunglasses' ? 'Titanium Eyewear' : objKey === 'holdall' ? 'Tuscan Holdall' : 'Calfskin Oxford'}</span>
                    <span className="font-mono text-[10px] opacity-70">{objectDetails[objKey].price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Studio Controls */}
            <div className="space-y-4 pt-6 border-t border-[#1F2128]">
              <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase">
                STUDIO RENDERING CONTROLS
              </p>

              {/* Lighting Presets */}
              <div className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-xs text-[#EFECE6]/70">Lighting:</span>
                <div className="flex gap-1 ml-auto">
                  {(['gold', 'stealth', 'velvet'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setLightingPreset(p)}
                      className={`px-2 py-1 text-[10px] uppercase font-mono rounded cursor-pointer ${
                        lightingPreset === p ? 'bg-[#C5A059] text-[#08080A]' : 'bg-[#1F2128] text-[#EFECE6]/60'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
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
                  <span>Mesh Wireframe</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3D WebGL Canvas Viewport */}
          <div className="lg:col-span-8 relative flex flex-col">
            <div
              ref={mountRef}
              className="w-full h-[400px] sm:h-[480px] bg-[#08080A] rounded border border-[#1F2128] cursor-grab active:cursor-grabbing relative overflow-hidden"
            />

            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 bg-[#08080A]/80 backdrop-blur-md px-3 py-1.5 border border-[#1F2128] rounded text-[10px] font-mono text-[#C5A059] flex items-center gap-2 pointer-events-none">
              <Eye className="w-3 h-3" />
              <span>DRAG MOUSE TO ROTATE • 360° REAL-TIME SHADER</span>
            </div>

            {/* Selected Object Details Bar */}
            <div className="mt-4 p-4 bg-[#08080A] border border-[#1F2128] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-[#F8F9FA]">
                  {objectDetails[selectedObject].name}
                </h4>
                <p className="text-xs font-mono text-[#C5A059] mt-0.5">
                  {objectDetails[selectedObject].material}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="font-serif text-xl text-[#F8F9FA]">{objectDetails[selectedObject].price}</span>
                <p className="text-[10px] font-mono text-[#EFECE6]/50 uppercase">INCLUDES BESPOKE VAULT CASE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
