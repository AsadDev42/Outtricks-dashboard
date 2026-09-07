import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Database, Mail, Linkedin, PhoneCall, Workflow, Building2, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChannelNodeData {
  id: string;
  name: string;
  channel: string;
  color: string;
  hex: number;
  icon: string;
  metrics: string;
  href: string;
  angle: number;
  radius: number;
}

const NODES_DATA: ChannelNodeData[] = [
  { id: 'leads', name: 'Lead Database', channel: 'Prospecting', color: 'text-cyan-400', hex: 0x06b6d4, icon: 'Database', metrics: '480M+ B2B Contacts', href: '/platform/lead-finder', angle: 0, radius: 3.2 },
  { id: 'email', name: 'Email Outreach', channel: 'Cold Email', color: 'text-blue-400', hex: 0x3b82f6, icon: 'Mail', metrics: '99.4% Deliverability', href: '/platform/email-outreach', angle: Math.PI / 3.5, radius: 3.5 },
  { id: 'linkedin', name: 'LinkedIn Safe', channel: 'Social Selling', color: 'text-sky-400', hex: 0x0284c7, icon: 'Linkedin', metrics: '0% Account Ban Risk', href: '/platform/linkedin-automation', angle: (2 * Math.PI) / 3.5, radius: 3.1 },
  { id: 'voice', name: 'Voice AI SDR', channel: 'Conversational', color: 'text-blue-400', hex: 0x8b5cf6, icon: 'PhoneCall', metrics: '380ms Audio Latency', href: '/platform/voice-ai', angle: (3 * Math.PI) / 3.5, radius: 3.4 },
  { id: 'upwork', name: 'Freelance AI', channel: 'Marketplaces', color: 'text-amber-400', hex: 0xf59e0b, icon: 'Zap', metrics: '< 3 Min Auto-Bids', href: '/platform/ai-agents', angle: (4 * Math.PI) / 3.5, radius: 3.2 },
  { id: 'crm', name: 'Unified CRM', channel: '1-DB Records', color: 'text-emerald-400', hex: 0x10b981, icon: 'Building2', metrics: '0 Webhook Latency', href: '/platform/crm', angle: (5 * Math.PI) / 3.5, radius: 3.6 },
  { id: 'automation', name: 'Workflow Graph', channel: 'Orchestration', color: 'text-blue-400', hex: 0x6366f1, icon: 'Workflow', metrics: 'Zero Sync Drift', href: '/platform/workflow-automation', angle: (6 * Math.PI) / 3.5, radius: 3.3 },
];

export const RevenueCoreCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme, reducedMotion } = useTheme();
  const [activeNode, setActiveNode] = useState<ChannelNodeData | null>(NODES_DATA[0]);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch (e) {
      setWebGlSupported(false);
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group Container
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central 3D Revenue Core (Geodesic / Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x818cf8 : 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.75 : 0.45,
    });
    const coreWireMesh = new THREE.Mesh(coreGeo, wireMat);
    mainGroup.add(coreWireMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x4338ca,
      emissive: 0x6366f1,
      emissiveIntensity: theme === 'dark' ? 0.8 : 0.4,
      shininess: 80,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerSphere);

    // 2. Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(3.3, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x475569 : 0xc7d2fe,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    ring1.rotation.y = Math.PI / 8;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.5, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x334155 : 0xe0e7ff,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 1.8;
    ring2.rotation.z = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Orbital Nodes & Beams
    const nodeMeshes: THREE.Mesh[] = [];
    const lineMeshes: THREE.Line[] = [];

    NODES_DATA.forEach((node) => {
      // Node Sphere
      const nGeo = new THREE.SphereGeometry(0.24, 20, 20);
      const nMat = new THREE.MeshStandardMaterial({
        color: node.hex,
        emissive: node.hex,
        emissiveIntensity: 0.6,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nGeo, nMat);

      const x = Math.cos(node.angle) * node.radius;
      const y = Math.sin(node.angle * 1.5) * 0.8;
      const z = Math.sin(node.angle) * node.radius;
      nodeMesh.position.set(x, y, z);
      mainGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Energy Beam to Core
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: node.hex,
        transparent: true,
        opacity: theme === 'dark' ? 0.5 : 0.3,
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      mainGroup.add(lineMesh);
      lineMeshes.push(lineMesh);
    });

    // 4. Background Data Starfield Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: theme === 'dark' ? 0x818cf8 : 0x6366f1,
      size: 0.06,
      transparent: true,
      opacity: theme === 'dark' ? 0.6 : 0.35,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.9 : 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 2, 50);
    pointLight.position.set(2, 4, 5);
    scene.add(pointLight);

    // Mouse Tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotY = x * 0.35;
      targetRotX = -y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!reducedMotion) {
        // Core Rotations
        coreWireMesh.rotation.x = elapsedTime * 0.15;
        coreWireMesh.rotation.y = elapsedTime * 0.25;

        innerSphere.rotation.y = -elapsedTime * 0.2;
        innerSphere.scale.setScalar(1 + Math.sin(elapsedTime * 2.5) * 0.04);

        // Orbital group wobble
        mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

        // Dynamic node floating
        nodeMeshes.forEach((mesh, idx) => {
          const node = NODES_DATA[idx];
          const curAngle = node.angle + elapsedTime * 0.18;
          const nx = Math.cos(curAngle) * node.radius;
          const ny = Math.sin(curAngle * 1.5) * 0.75 + Math.sin(elapsedTime * 2 + idx) * 0.12;
          const nz = Math.sin(curAngle) * node.radius;
          mesh.position.set(nx, ny, nz);

          // Update beam lines
          const line = lineMeshes[idx];
          const positions = line.geometry.attributes.position.array as Float32Array;
          positions[3] = nx;
          positions[4] = ny;
          positions[5] = nz;
          line.geometry.attributes.position.needsUpdate = true;
        });

        // Rotate particles
        particles.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [theme, reducedMotion]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-50/70 via-indigo-50/20 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl p-4 sm:p-8 space-y-6">
      
      {/* 3D Visual Header HUD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/80 dark:border-[#2A2A2A]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-indigo-400 animate-ping"></span>
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Live WebGL 3D Visualization
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            The Outtricks Autonomous Revenue Core
          </h3>
        </div>

        {/* Channel Nodes Quick Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {NODES_DATA.map((node) => (
            <button
              key={node.id}
              onClick={() => setActiveNode(node)}
              className={`px-3 py-1 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                activeNode?.id === node.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                  : 'bg-white dark:bg-[#181818] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-[#2A2A2A]'
              }`}
            >
              {node.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden flex items-center justify-center">
        {webGlSupported ? (
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        ) : (
          /* Graceful Fallback for No-WebGL */
          <div className="text-center p-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Unified Revenue Core Active</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Connecting 6 channels directly on 1 database schema with sub-second execution.
            </p>
          </div>
        )}

        {/* Floating Active Node Card Overlay */}
        {activeNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/90 dark:bg-[#141414]/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200 dark:border-[#2A2A2A] shadow-xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200 z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300">
                {activeNode.channel}
              </span>
              <span className="text-xs font-sans font-bold text-emerald-600 dark:text-emerald-400">
                ? Live 0-Hop
              </span>
            </div>

            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
              {activeNode.name}
            </h4>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Metric: <strong className="text-slate-800 dark:text-slate-200">{activeNode.metrics}</strong>
            </p>

            <Link
              to={activeNode.href}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
            >
              <span>Explore {activeNode.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Bottom Hint */}
        <div className="absolute bottom-3 right-4 hidden sm:block text-[11px] font-sans text-slate-400 dark:text-slate-500 bg-white/60 dark:bg-[#0D0D0D]/60 px-3 py-1 rounded-full border border-slate-200/60 dark:border-[#2A2A2A]">
          Move cursor to rotate 3D Revenue Core • Click pills to inspect
        </div>
      </div>

    </div>
  );
};

