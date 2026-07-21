import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const UPHOLSTERY_PIGMENTS = [
  { name: 'Warm Tan', value: '#c5a080' },
  { name: 'Rich Cocoa', value: '#5a3d28' },
  { name: 'Warm Cream', value: '#f5eedc' },
  { name: 'Olive Green', value: '#838f6f' },
  { name: 'Antique Gold', value: '#c5a059' }
];

const SPATIAL_ARRANGEMENTS = [
  { id: 'standard', label: 'Standard' },
  { id: 'compact', label: 'Compact' },
  { id: 'minimalist', label: 'Minimalist' }
];

export default function InteractiveStudio({
  selectedPigmentIdx,
  setSelectedPigmentIdx,
  spatialArrangement,
  setSpatialArrangement,
  lampOn,
  setLampOn,
  studioAutoRotate,
  setStudioAutoRotate,
  loading
}) {
  useScrollReveal();
  const studioCanvasRef = useRef(null);
  const yawRef = useRef(Math.PI / 4);
  const pitchRef = useRef(Math.PI / 8);

  const [tiltStyle, setTiltStyle] = useState({});

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotX = ((yc - y) / yc) * 2.5; 
    const rotY = ((x - xc) / xc) * 2.5; 
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      transition: 'transform 0.1s ease-out',
      willChange: 'transform'
    });
  };

  const handleCardMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg)`,
      transition: 'transform 0.5s ease-out',
      willChange: 'transform'
    });
  };

  useEffect(() => {
    if (loading || !studioCanvasRef.current) return;

    const container = studioCanvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#121622');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Floor
    const floorGeo = new THREE.BoxGeometry(8, 0.1, 8);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x1d1e22, roughness: 0.85 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.05;
    floor.receiveShadow = true;
    scene.add(floor);

    // Back wall 1
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x0f1118, roughness: 0.95 });
    const wall1Geo = new THREE.BoxGeometry(0.1, 4.5, 8);
    const wall1 = new THREE.Mesh(wall1Geo, wallMat);
    wall1.position.set(-4, 2.2, 0);
    wall1.receiveShadow = true;
    scene.add(wall1);

    // Back wall 2
    const wall2Geo = new THREE.BoxGeometry(8, 4.5, 0.1);
    const wall2 = new THREE.Mesh(wall2Geo, wallMat);
    wall2.position.set(0, 2.2, -4);
    wall2.receiveShadow = true;
    scene.add(wall2);

    // Rug
    const rugGeo = new THREE.BoxGeometry(4.8, 0.01, 3.8);
    const rugMat = new THREE.MeshStandardMaterial({ color: 0xe0dbd3, roughness: 0.95 });
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.position.set(0, 0.005, 0.2);
    rug.receiveShadow = true;
    scene.add(rug);

    // Painting Art on wall
    const artFrameGeo = new THREE.BoxGeometry(0.04, 1.6, 1.1);
    const artFrameMat = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 0.7 });
    const artFrame = new THREE.Mesh(artFrameGeo, artFrameMat);
    artFrame.position.set(-3.94, 2.3, 0.8);
    scene.add(artFrame);

    const artCanvasGeo = new THREE.BoxGeometry(0.01, 1.5, 1.0);
    const artCanvasMat = new THREE.MeshStandardMaterial({ color: 0xeae8e4, roughness: 0.95 });
    const artCanvas = new THREE.Mesh(artCanvasGeo, artCanvasMat);
    artCanvas.position.set(-3.92, 2.3, 0.8);
    scene.add(artCanvas);

    // Graphic circle in painting
    const artCircleGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 32);
    const artCircleMat = new THREE.MeshStandardMaterial({ color: 0x22242a, roughness: 0.9 });
    const artCircle = new THREE.Mesh(artCircleGeo, artCircleMat);
    artCircle.rotation.z = Math.PI / 2;
    artCircle.position.set(-3.91, 2.4, 0.7);
    scene.add(artCircle);

    // Couch Group
    const couchGroup = new THREE.Group();
    scene.add(couchGroup);

    const upholsteryColor = UPHOLSTERY_PIGMENTS[selectedPigmentIdx].value;
    const couchMat = new THREE.MeshStandardMaterial({ 
      color: new THREE.Color(upholsteryColor),
      roughness: 0.65 
    });

    const baseGeo = new THREE.BoxGeometry(2.6, 0.35, 1.1);
    const base = new THREE.Mesh(baseGeo, couchMat);
    base.position.y = 0.22;
    base.castShadow = true;
    base.receiveShadow = true;
    couchGroup.add(base);

    const backrestGeo = new THREE.BoxGeometry(2.6, 0.75, 0.28);
    const backrest = new THREE.Mesh(backrestGeo, couchMat);
    backrest.position.set(0, 0.65, -0.42);
    backrest.castShadow = true;
    backrest.receiveShadow = true;
    couchGroup.add(backrest);

    const armrestLGeo = new THREE.BoxGeometry(0.28, 0.58, 1.1);
    const armrestL = new THREE.Mesh(armrestLGeo, couchMat);
    armrestL.position.set(-1.3, 0.34, 0);
    armrestL.castShadow = true;
    armrestL.receiveShadow = true;
    couchGroup.add(armrestL);

    const armrestR = new THREE.Mesh(armrestLGeo, couchMat);
    armrestR.position.set(1.3, 0.34, 0);
    armrestR.castShadow = true;
    armrestR.receiveShadow = true;
    couchGroup.add(armrestR);

    // Metallic Leg finish
    const legMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.15 });

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.035, 0.02, 0.16, 16);
    const legOffsets = [
      { x: -1.2, z: -0.45 },
      { x: 1.2, z: -0.45 },
      { x: -1.2, z: 0.45 },
      { x: 1.2, z: 0.45 }
    ];
    legOffsets.forEach((offset) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(offset.x, 0.08, offset.z);
      leg.castShadow = true;
      couchGroup.add(leg);
    });

    // Coffee Table Group
    const tableGroup = new THREE.Group();
    scene.add(tableGroup);

    // Table Top (Round wood table)
    const tableTopGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.06, 32);
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0x483a2d, roughness: 0.65 });
    const tableTop = new THREE.Mesh(tableTopGeo, tableTopMat);
    tableTop.position.y = 0.28;
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    tableGroup.add(tableTop);

    // Table Legs
    const tableLegGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.28, 8);
    const tableLegMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.4, roughness: 0.6 });
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI) / 3;
      const leg = new THREE.Mesh(tableLegGeo, tableLegMat);
      leg.position.set(Math.cos(angle) * 0.55, 0.14, Math.sin(angle) * 0.55);
      leg.rotation.z = -Math.cos(angle) * 0.15;
      leg.rotation.x = Math.sin(angle) * 0.15;
      leg.castShadow = true;
      tableGroup.add(leg);
    }

    // Floor Lamp Group
    const lampGroup = new THREE.Group();
    scene.add(lampGroup);

    // Base
    const lampBaseGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.02, 16);
    const lampBase = new THREE.Mesh(lampBaseGeo, legMat);
    lampBase.position.y = 0.01;
    lampBase.castShadow = true;
    lampGroup.add(lampBase);

    // Pole
    const lampPoleGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.8, 8);
    const lampPole = new THREE.Mesh(lampPoleGeo, legMat);
    lampPole.position.y = 0.9;
    lampPole.castShadow = true;
    lampGroup.add(lampPole);

    // Curved Top Arm
    const lampArmGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.55, 8);
    const lampArm = new THREE.Mesh(lampArmGeo, legMat);
    lampArm.rotation.x = Math.PI / 2;
    lampArm.position.set(0, 1.8, 0.25);
    lampArm.castShadow = true;
    lampGroup.add(lampArm);

    // Shade
    const lampShadeGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.22, 16);
    const lampShade = new THREE.Mesh(lampShadeGeo, legMat);
    lampShade.position.set(0, 1.7, 0.5);
    lampShade.castShadow = true;
    lampGroup.add(lampShade);

    // Bulb
    const bulbGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const bulbMat = new THREE.MeshBasicMaterial({ 
      color: lampOn ? 0xfffaed : 0x666666 
    });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.set(0, 1.6, 0.5);
    lampGroup.add(bulb);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.26);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.35);
    dirLight.position.set(6, 10, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const lampSpot = new THREE.SpotLight(
      0xfffaed,
      lampOn ? 4.2 : 0, 
      9,
      Math.PI / 3.8,
      0.45,
      1
    );
    lampSpot.position.set(0, 1.58, 0.5);
    lampSpot.castShadow = true;
    lampSpot.shadow.mapSize.width = 1024;
    lampSpot.shadow.mapSize.height = 1024;
    lampSpot.shadow.bias = -0.001;
    lampGroup.add(lampSpot);

    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0, 0, 0.5);
    lampGroup.add(spotTarget);
    lampSpot.target = spotTarget;

    // Arrangements Target Positions
    const targets = {
      couch: { x: 0, y: 0, z: 0, scale: 1 },
      table: { x: 0, y: 0, z: 1.0, scale: 1 },
      lamp: { x: 1.6, y: 0, z: -0.6 }
    };

    if (spatialArrangement === 'standard') {
      targets.couch = { x: 0, y: 0, z: 0, scale: 1 };
      targets.table = { x: 0, y: 0, z: 1.1, scale: 1 };
      targets.lamp = { x: 1.8, y: 0, z: -0.5 };
    } else if (spatialArrangement === 'compact') {
      targets.couch = { x: -0.3, y: 0, z: -0.2, scale: 1 };
      targets.table = { x: 0.5, y: 0, z: 0.7, scale: 0.95 };
      targets.lamp = { x: 1.3, y: 0, z: -0.8 };
    } else if (spatialArrangement === 'minimalist') {
      targets.couch = { x: 0, y: 0, z: -0.6, scale: 1 };
      targets.table = { x: 0, y: 0, z: 1.4, scale: 0.8 };
      targets.lamp = { x: 2.1, y: 0, z: -0.4 };
    }

    couchGroup.position.set(targets.couch.x, targets.couch.y, targets.couch.z);
    tableGroup.position.set(targets.table.x, targets.table.y, targets.table.z);
    tableGroup.scale.set(targets.table.scale, targets.table.scale, targets.table.scale);
    lampGroup.position.set(targets.lamp.x, targets.lamp.y, targets.lamp.z);

    const radius = 6.4;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      yawRef.current -= deltaX * 0.006;
      pitchRef.current = Math.max(-0.2, Math.min(Math.PI / 2.8, pitchRef.current + deltaY * 0.006));

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleScroll = () => {
      if (isDragging || !container) return;
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalDist = rect.height + viewportHeight;
      const scrolled = viewportHeight - rect.top;

      if (scrolled >= 0 && scrolled <= totalDist) {
        const prog = Math.min(Math.max(0, scrolled / totalDist), 1);
        yawRef.current = Math.PI / 4 + (prog - 0.5) * 0.8;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (studioAutoRotate && !isDragging) {
        yawRef.current += 0.0025;
      }

      camera.position.x = radius * Math.sin(yawRef.current) * Math.cos(pitchRef.current);
      camera.position.z = radius * Math.cos(yawRef.current) * Math.cos(pitchRef.current);
      camera.position.y = radius * Math.sin(pitchRef.current) + 1.8;
      camera.lookAt(0, 0.7, 0.2);

      couchGroup.position.x += (targets.couch.x - couchGroup.position.x) * 0.09;
      couchGroup.position.y += (targets.couch.y - couchGroup.position.y) * 0.09;
      couchGroup.position.z += (targets.couch.z - couchGroup.position.z) * 0.09;

      tableGroup.position.x += (targets.table.x - tableGroup.position.x) * 0.09;
      tableGroup.position.y += (targets.table.y - tableGroup.position.y) * 0.09;
      tableGroup.position.z += (targets.table.z - tableGroup.position.z) * 0.09;

      const currentScale = tableGroup.scale.x;
      const scaleLerp = currentScale + (targets.table.scale - currentScale) * 0.09;
      tableGroup.scale.set(scaleLerp, scaleLerp, scaleLerp);

      lampGroup.position.x += (targets.lamp.x - lampGroup.position.x) * 0.09;
      lampGroup.position.y += (targets.lamp.y - lampGroup.position.y) * 0.09;
      lampGroup.position.z += (targets.lamp.z - lampGroup.position.z) * 0.09;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.dispose();
    };
  }, [selectedPigmentIdx, spatialArrangement, lampOn, studioAutoRotate, loading]);

  return (
    <section id="interactive-studio" className="relative z-30 bg-[#0f1118] text-luxury-cream py-24 px-6 md:px-16 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 reveal-3d-popup">
          <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.35em] text-luxury-sage uppercase">
            VIRTUAL EXPERIENCE
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extralight text-luxury-cream leading-tight uppercase tracking-wider">
            Interactive 3D Living Studio
          </h2>
          <p className="font-sans text-xs md:text-sm text-luxury-cream/60 leading-relaxed font-light">
            Experience real-time interactive luxury layout planning. Customize couch fabrics with curated navy and gold pigments, toggle metallic leg variations, and cycle structural placements live.
          </p>
        </div>

        {/* Studio Panel Card */}
        <div 
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={tiltStyle}
          className="bg-[#181c2b] border border-white/5 rounded-[24px] p-4 md:p-6 lg:p-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch transition-transform duration-100 ease-out"
        >
          
          {/* Left Column: Canvas (7 cols) */}
          <div className="lg:col-span-8 relative rounded-xl overflow-hidden min-h-[380px] lg:min-h-[500px] bg-[#121622] border border-white/[0.03]">
            <div ref={studioCanvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-luxury-sage rounded-full animate-ping" />
                <span className="font-sans text-[9px] font-semibold tracking-wider text-white/90">
                  Drag to Orbit 3D Room
                </span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <button 
                onClick={() => setLampOn(!lampOn)}
                className={`px-4 py-2 rounded-full font-sans text-[9px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 shadow-lg border ${
                  lampOn 
                    ? 'bg-luxury-cream text-luxury-charcoal border-luxury-cream hover:bg-white' 
                    : 'bg-black/60 text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${lampOn ? 'bg-luxury-sage animate-pulse' : 'bg-red-500'}`} />
                <span>Lamp: {lampOn ? 'ON' : 'OFF'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Controls Panel (4 cols) */}
          <div className="lg:col-span-4 p-4 lg:p-6 bg-[#131622] rounded-xl border border-white/[0.03] flex flex-col justify-between space-y-8">
            
            <div className="space-y-6">
              
              <div className="space-y-2">
                <h3 className="font-display text-xl lg:text-2xl font-light tracking-wide text-luxury-cream uppercase">
                  Studio Concept Planner
                </h3>
                <p className="font-sans text-xs text-luxury-cream/50 leading-relaxed font-light">
                  Interact with our virtual 3D showcase. Spin the camera, toggling layouts and materials designed live with earthy pigments and hand-polished gold trim.
                </p>
              </div>

              <div className="w-full h-[1px] bg-white/5" />

              {/* Pigments */}
              <div className="space-y-3">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-luxury-sage uppercase">
                  UPHOLSTERY PIGMENTS
                </span>
                <div className="flex items-center gap-3">
                  {UPHOLSTERY_PIGMENTS.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedPigmentIdx(idx)}
                      aria-label={`Select ${color.name}`}
                      className="relative w-8 h-8 rounded-full border border-white/10 transition-transform duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
                      style={{ backgroundColor: color.value }}
                    >
                      {selectedPigmentIdx === idx && (
                        <span className="absolute inset-0.5 rounded-full border border-white mix-blend-difference" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spatial arrangements */}
              <div className="space-y-3">
                <span className="font-sans text-[9px] font-bold tracking-[0.25em] text-luxury-sage uppercase">
                  SPATIAL ARRANGEMENTS
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {SPATIAL_ARRANGEMENTS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSpatialArrangement(item.id)}
                      className={`py-2 rounded font-sans text-[9px] font-semibold tracking-wider uppercase transition-all duration-300 border ${
                        spatialArrangement === item.id 
                          ? 'bg-[#838f6f] text-white border-[#838f6f] shadow-md' 
                          : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer metadata */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              
              <div className="flex items-center justify-between text-[10px] font-sans">
                <span className="text-white/40">Auto Rotation</span>
                <button 
                  onClick={() => setStudioAutoRotate(!studioAutoRotate)}
                  className={`px-3 py-1 rounded text-[8px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                    studioAutoRotate 
                      ? 'bg-luxury-sage text-white' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                >
                  {studioAutoRotate ? 'ROTATING' : 'PAUSED'}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-sans">
                <span className="text-white/40">Current Palette</span>
                <span className="font-bold text-luxury-sage">{UPHOLSTERY_PIGMENTS[selectedPigmentIdx].name}</span>
              </div>

              <p className="text-[8px] font-sans text-white/30 leading-normal italic text-center pt-2">
                *Made with procedural materials on standard WebGL canvas. Responsive aspect resizing active.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
