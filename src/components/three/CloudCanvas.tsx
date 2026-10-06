import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

interface CloudCanvasProps {
  currentSection?: string;
  isDarkMode?: boolean;
}

export const CloudCanvas: React.FC<CloudCanvasProps> = ({ currentSection = 'hero', isDarkMode = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameId = useRef<number | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  // Mouse tracking
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = window.innerWidth < 768;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);
    cameraRef.current = camera;

    // 3. Renderer with verified WebGL context and safety guards
    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
      renderer.setClearColor(0x000000, 0); // Transparent canvas
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to CSS theme:', err);
      setWebglSupported(false);
      return;
    }

    // 4. Main 3D Node Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    meshGroupRef.current = mainGroup;

    // Custom Vertex & Fragment Shaders for the Energy Wave Sphere
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float u_time;
      uniform float u_intensity;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        
        // Gentle wave displacement
        vec3 pos = position;
        float wave = sin(pos.y * 3.0 + u_time * 1.5) * cos(pos.x * 2.0 + u_time * 1.2) * 0.12 * u_intensity;
        pos += normal * wave;
        
        vPosition = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform vec3 u_colorCore;
      uniform vec3 u_colorGlow;
      uniform float u_hover;

      void main() {
        // Fresnel glow factor
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
        
        // Ripple pattern based on time
        float ripple = sin(vPosition.y * 4.0 + u_time * 2.0) * 0.5 + 0.5;
        
        // Interaction with mouse distance
        float mouseDist = distance(vUv, u_mouse * 0.5 + 0.5);
        float mouseHighlight = smoothstep(0.4, 0.0, mouseDist) * u_hover;

        vec3 color = mix(u_colorCore, u_colorGlow, fresnel + ripple * 0.25 + mouseHighlight * 0.4);
        float alpha = clamp(fresnel * 0.3 + 0.04 + mouseHighlight * 0.15, 0.0, 0.32);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      wireframe: true,
      uniforms: {
        u_time: { value: 0 },
        u_intensity: { value: 0.5 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_colorCore: { value: new THREE.Color(isDarkMode ? 0xf59e0b : 0xd97706) }, // AWS Amber
        u_colorGlow: { value: new THREE.Color(0x38bdf8) }, // Cloud Cyan
        u_hover: { value: 0.0 }
      }
    });
    shaderMaterialRef.current = shaderMaterial;

    // Central Geodesic Cloud Core
    const sphereGeo = new THREE.IcosahedronGeometry(1.4, isMobile ? 2 : 3);
    const sphereMesh = new THREE.Mesh(sphereGeo, shaderMaterial);
    mainGroup.add(sphereMesh);

    // Inner wireframe nucleus
    const innerGeo = new THREE.OctahedronGeometry(0.75, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Orbiting Cloud Regions / Availability Zone Nodes
    const nodeCount = isMobile ? 8 : 16;
    const nodeGeometry = new THREE.SphereGeometry(0.035, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.45
    });
    const nodes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const theta = (i / nodeCount) * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const radius = 2.0 + Math.random() * 0.8;

      node.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      nodes.push(node);
      mainGroup.add(node);
    }

    // Floating Star / Cloud Micro-Particles
    const particleCount = isMobile ? 80 : 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 14;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 8;
      particleSizes[i] = Math.random() * 2 + 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.035,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX * 0.7;
      mouseRef.current.targetY = normY * 0.7;

      if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.u_mouse.value.set(normX, normY);
        gsap.to(shaderMaterialRef.current.uniforms.u_hover, { value: 1.0, duration: 0.3 });
      }
    };

    // Touch move handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const normX = (touch.clientX / window.innerWidth) * 2 - 1;
        const normY = -(touch.clientY / window.innerHeight) * 2 + 1;
        mouseRef.current.targetX = normX * 0.5;
        mouseRef.current.targetY = normY * 0.5;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // WebGL Context Lost / Restored handling
    const canvasElement = renderer.domElement;
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };

    const handleContextRestored = () => {
      handleResize();
      animate();
    };

    canvasElement.addEventListener('webglcontextlost', handleContextLost, false);
    canvasElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update shader uniforms
      if (shaderMaterialRef.current) {
        shaderMaterialRef.current.uniforms.u_time.value = elapsedTime;
      }

      // Rotate groups
      if (mainGroup) {
        mainGroup.rotation.y = elapsedTime * 0.12 + mouseRef.current.x * 0.5;
        mainGroup.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15 + mouseRef.current.y * 0.4;
      }

      if (innerMesh) {
        innerMesh.rotation.y = -elapsedTime * 0.2;
        innerMesh.rotation.z = elapsedTime * 0.15;
      }

      // Pulse nodes
      nodes.forEach((node, idx) => {
        const scale = 1 + Math.sin(elapsedTime * 2.5 + idx) * 0.35;
        node.scale.set(scale, scale, scale);
      });

      // Slowly drift background particles
      if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      canvasElement.removeEventListener('webglcontextlost', handleContextLost);
      canvasElement.removeEventListener('webglcontextrestored', handleContextRestored);

      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }

      if (rendererRef.current && rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      sphereGeo.dispose();
      innerGeo.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      shaderMaterial.dispose();
    };
  }, []);

  // Update theme colors in shader
  useEffect(() => {
    if (shaderMaterialRef.current) {
      const coreColor = isDarkMode ? 0xf59e0b : 0xd97706;
      shaderMaterialRef.current.uniforms.u_colorCore.value.set(coreColor);
    }
  }, [isDarkMode]);

  // Interpolate camera/mesh based on active section
  useEffect(() => {
    if (!meshGroupRef.current || !cameraRef.current) return;

    let targetZ = 7;
    let targetX = 0;
    let targetY = 0;
    let targetRotZ = 0;

    switch (currentSection) {
      case 'hero':
        targetZ = window.innerWidth > 1024 ? 7.2 : 8.5;
        targetX = window.innerWidth > 1024 ? 1.8 : 0;
        targetY = window.innerWidth > 1024 ? 0.2 : 1.2;
        targetRotZ = 0;
        break;
      case 'projets':
        targetZ = 8.5;
        targetX = window.innerWidth > 1024 ? -2.2 : 0;
        targetY = -0.5;
        targetRotZ = 0.3;
        break;
      case 'cloudwatch':
        targetZ = 6.2;
        targetX = 0;
        targetY = 0.8;
        targetRotZ = -0.2;
        break;
      case 'competences':
        targetZ = 7.8;
        targetX = window.innerWidth > 1024 ? 2.0 : 0;
        targetY = -0.2;
        targetRotZ = 0.4;
        break;
      case 'certifications':
        targetZ = 7.2;
        targetX = window.innerWidth > 1024 ? -1.8 : 0;
        targetY = 0.3;
        targetRotZ = -0.15;
        break;
      case 'contact':
        targetZ = 6.8;
        targetX = 0;
        targetY = -0.4;
        targetRotZ = 0;
        break;
      default:
        targetZ = 7;
        targetX = 0;
        targetY = 0;
    }

    gsap.to(meshGroupRef.current.position, {
      x: targetX,
      y: targetY,
      duration: 1.2,
      ease: 'power2.out'
    });

    gsap.to(meshGroupRef.current.rotation, {
      z: targetRotZ,
      duration: 1.2,
      ease: 'power2.out'
    });

    gsap.to(cameraRef.current.position, {
      z: targetZ,
      duration: 1.4,
      ease: 'power2.out'
    });
  }, [currentSection]);

  if (!webglSupported) {
    return (
      <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${
        isDarkMode
          ? 'opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/20 via-[#090d16] to-[#090d16]'
          : 'opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-slate-50 to-slate-50'
      }`} />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? (isDarkMode ? 'opacity-25' : 'opacity-15') : 'opacity-0'
      }`}
      aria-hidden="true"
    />
  );
};
