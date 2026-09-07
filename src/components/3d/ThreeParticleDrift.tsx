import React, { useCallback } from 'react';
import * as THREE from 'three';
import { ThreeCanvas } from './ThreeCanvas';

export interface ThreeParticleDriftProps {
  className?: string;
  count?: number;
  color?: string;
}

export const ThreeParticleDrift: React.FC<ThreeParticleDriftProps> = ({
  className = 'w-full h-full absolute inset-0 pointer-events-none',
  count = 200,
  color = '#60A5FA',
}) => {
  const handleInit = useCallback(
    ({ scene, camera, renderer }: { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer }) => {
      camera.position.z = 6;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

        velocities[i * 3] = (Math.random() - 0.5) * 0.003;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size: 0.04,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let animationId: number;

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        const pos = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          pos[i * 3] += velocities[i * 3];
          pos[i * 3 + 1] += velocities[i * 3 + 1];
          pos[i * 3 + 2] += velocities[i * 3 + 2];

          // Wrap boundaries
          if (pos[i * 3] > 8) pos[i * 3] = -8;
          if (pos[i * 3] < -8) pos[i * 3] = 8;
          if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
          if (pos[i * 3 + 1] < -5) pos[i * 3 + 1] = 5;
        }
        geometry.attributes.position.needsUpdate = true;

        points.rotation.y += 0.0006;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationId);
        geometry.dispose();
        material.dispose();
      };
    },
    [count, color]
  );

  return <ThreeCanvas className={className} onInit={handleInit} />;
};