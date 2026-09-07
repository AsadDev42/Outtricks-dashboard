import React, { useCallback } from 'react';
import * as THREE from 'three';
import { ThreeCanvas } from './ThreeCanvas';

export interface ThreeOrbitalGlowProps {
  className?: string;
  particleColor?: string;
  ringColor?: string;
  size?: number;
}

export const ThreeOrbitalGlow: React.FC<ThreeOrbitalGlowProps> = ({
  className = 'w-48 h-48 sm:w-64 sm:h-64',
  particleColor = '#3B82F6',
  ringColor = '#60A5FA',
}) => {
  const handleInit = useCallback(
    ({ scene, camera, renderer }: { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer }) => {
      camera.position.z = 4.5;

      const group = new THREE.Group();
      scene.add(group);

      // 1. Core Glowing Sphere (Points)
      const particleCount = 450;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = Math.cbrt(Math.random()) * 0.95 + 0.35;
        const sinPhi = Math.sin(phi);

        positions[i * 3] = r * sinPhi * Math.cos(theta);
        positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: new THREE.Color(particleColor),
        size: 0.045,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, particleMaterial);
      group.add(points);

      // 2. Orbital Rings
      const ringGeom = new THREE.RingGeometry(1.4, 1.43, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(ringColor),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
      });
      const ring1 = new THREE.Mesh(ringGeom, ringMat);
      ring1.rotation.x = Math.PI / 3;
      group.add(ring1);

      const ring2 = new THREE.Mesh(ringGeom, ringMat.clone());
      ring2.material.opacity = 0.25;
      ring2.rotation.x = -Math.PI / 4;
      ring2.rotation.y = Math.PI / 6;
      group.add(ring2);

      // 3. Animation loop with smooth damping
      let animationId: number;
      let targetRotX = 0;
      let targetRotY = 0;

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        targetRotY = x * 0.6;
        targetRotX = -y * 0.6;
      };

      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Natural continuous spin
        points.rotation.y += 0.004;
        points.rotation.x += 0.002;
        ring1.rotation.z += 0.006;
        ring2.rotation.z -= 0.004;

        // Smooth mouse follow
        group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
        group.rotation.y += (targetRotY - group.rotation.y) * 0.05;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('mousemove', handleMouseMove);
        geometry.dispose();
        particleMaterial.dispose();
        ringGeom.dispose();
        ringMat.dispose();
      };
    },
    [particleColor, ringColor]
  );

  return <ThreeCanvas className={className} onInit={handleInit} />;
};