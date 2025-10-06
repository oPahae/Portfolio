import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Stars = () => {
    const canvasRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create floating particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 20;
            posArray[i + 1] = (Math.random() - 0.5) * 20;
            posArray[i + 2] = (Math.random() - 0.5) * 20;

            // Random color between pink, purple, and cyan
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i] = 0.93; colors[i + 1] = 0.31; colors[i + 2] = 0.64; // Pink
            } else if (colorChoice < 0.66) {
                colors[i] = 0.58; colors[i + 1] = 0.31; colors[i + 2] = 0.93; // Purple
            } else {
                colors[i] = 0.13; colors[i + 1] = 0.93; colors[i + 2] = 0.93; // Cyan
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create floating rings
        const rings = [];
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(2 + i * 0.5, 0.02, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: i === 0 ? 0xec4899 : i === 1 ? 0x9333ea : 0x22d3ee,
                transparent: true,
                opacity: 0.3
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.z = -2;
            ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
            scene.add(ring);
            rings.push(ring);
        }

        // Animation
        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate particles
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;

            // Animate rings
            rings.forEach((ring, index) => {
                ring.rotation.z += 0.001 * (index + 1);
            });

            // Camera movement based on mouse
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            rings.forEach(ring => {
                ring.geometry.dispose();
                ring.material.dispose();
            });
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10"
            style={{ background: 'linear-gradient(to bottom, #000000, #0a0a0a)' }}
        />
    )
}

export default Stars