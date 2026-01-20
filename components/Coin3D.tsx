
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Coin3DProps {
  isFlipping: boolean;
  result: 'Heads' | 'Tails' | null;
  headsLabel: string;
  tailsLabel: string;
  hasFlipped: boolean;
}

const Coin3D: React.FC<Coin3DProps> = ({ isFlipping, result, headsLabel, tailsLabel, hasFlipped }) => {
  const meshRef = useRef<THREE.Group>(null);
  const startTime = useRef<number | null>(null);
  const shakeRef = useRef(0);
  
  const [physics, setPhysics] = useState({ tiltX: 0, tiltY: 0, tiltZ: 0, spinY: 0, spinZ: 0 });

  const DURATION = 2.5; 
  const JUMP_HEIGHT = 4.5;
  const TOTAL_SPINS = 8; 
  const CAMERA_INITIAL_Z = 8;
  const CAMERA_ZOOM_OUT = 12;
  
  const BASE_Y = 0; 
  const COIN_RADIUS = 1.6; 
  const COIN_DEPTH = 0.28;

  const generateTexture = (text: string, bgColor: string, textColor: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 1024, 1024);
    
    const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 650);
    grad.addColorStop(0, 'rgba(255,255,255,0.25)');
    grad.addColorStop(1, 'rgba(0,0,0,0.08)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.translate(512, 512);
    ctx.rotate(-Math.PI / 2);

    ctx.fillStyle = textColor;
    ctx.font = '900 130px Inter, sans-serif'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;

    ctx.fillText(text.toUpperCase(), 0, 0, 850);

    ctx.strokeStyle = textColor;
    ctx.lineWidth = 14;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(0, 0, 460, 0, Math.PI * 2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 16;
    return texture;
  };

  const headsTex = useMemo(() => generateTexture(headsLabel, '#fbbf24', '#451a03'), [headsLabel]); 
  const tailsTex = useMemo(() => generateTexture(tailsLabel, '#f1f5f9', '#0f172a'), [tailsLabel]); 

  useEffect(() => {
    if (!isFlipping && hasFlipped) {
      shakeRef.current = 1.0; 
    }
  }, [isFlipping, hasFlipped]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    if (isFlipping) {
      if (startTime.current === null) {
        startTime.current = time;
        setPhysics({
          tiltX: (Math.random() - 0.5) * 3, 
          tiltY: (Math.random() - 0.5) * 4,
          tiltZ: (Math.random() - 0.5) * 2,
          spinY: (Math.random() - 0.5) * Math.PI * 6,
          spinZ: (Math.random() - 0.5) * Math.PI * 4,
        });
      }

      const elapsed = time - startTime.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      const jumpProgress = Math.sin(progress * Math.PI);
      meshRef.current.position.y = jumpProgress * JUMP_HEIGHT + BASE_Y; 

      const targetRotationX = result === 'Tails' ? Math.PI : 0;
      const targetRotationZ = result === 'Tails' ? Math.PI : 0;

      const dynamicWobble = Math.sin(progress * Math.PI); 

      const currentRotationX = (TOTAL_SPINS * Math.PI * 2 * easeProgress) + (targetRotationX * easeProgress);
      const currentRotationY = (physics.spinY * dynamicWobble);
      const currentRotationZ = (targetRotationZ * easeProgress) + (physics.spinZ * dynamicWobble);
      
      const wobbleDecay = Math.sin((1 - progress) * Math.PI * 0.5);
      
      meshRef.current.rotation.x = currentRotationX + (wobbleDecay * physics.tiltX);
      meshRef.current.rotation.y = currentRotationY + (wobbleDecay * physics.tiltY);
      meshRef.current.rotation.z = currentRotationZ + (wobbleDecay * physics.tiltZ);

      state.camera.position.z = THREE.MathUtils.lerp(CAMERA_INITIAL_Z, CAMERA_ZOOM_OUT, jumpProgress);
      state.camera.lookAt(0, meshRef.current.position.y * 0.4, 0);

    } else {
      startTime.current = null;
      
      if (!hasFlipped) {
        // 초기 대기 상태 부유 효과
        meshRef.current.position.y = BASE_Y + Math.sin(time * 1.5) * 0.15;
        meshRef.current.rotation.y += 0.006;
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.05);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.05);
      } else {
        // 결과 화면에서의 Floating 효과 추가
        const finalRotX = (TOTAL_SPINS * Math.PI * 2) + (result === 'Tails' ? Math.PI : 0);
        const finalRotZ = (result === 'Tails' ? Math.PI : 0);
        
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, finalRotX, 0.15);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.15);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, finalRotZ, 0.15);
        
        // 상하 둥둥 떠다니는 움직임 (Sine wave)
        const floatY = Math.sin(time * 1.2) * 0.12;
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, BASE_Y + floatY, 0.2);
      }

      if (shakeRef.current > 0) {
        const s = shakeRef.current;
        state.camera.position.x = (Math.random() - 0.5) * 0.2 * s;
        state.camera.position.y = (Math.random() - 0.5) * 0.2 * s;
        shakeRef.current *= 0.9; 
        if (shakeRef.current < 0.01) shakeRef.current = 0;
      } else {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.1);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0, 0.1);
      }
      
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, CAMERA_INITIAL_Z, 0.05);
    }
  });

  return (
    <group ref={meshRef} position={[0, BASE_Y, 0]}>
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[COIN_RADIUS, COIN_RADIUS, COIN_DEPTH, 128]} />
        <meshStandardMaterial attach="material-0" color="#f59e0b" metalness={0.4} roughness={0.4} />
        <meshStandardMaterial attach="material-1" map={headsTex} metalness={0.3} roughness={0.5} />
        <meshStandardMaterial attach="material-2" map={tailsTex} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
};

export default Coin3D;
