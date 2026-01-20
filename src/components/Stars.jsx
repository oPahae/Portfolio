import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EarthCanvas } from '@/containers/Earth';

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

        // Create circle texture for particles
        const circleCanvas = document.createElement('canvas');
        circleCanvas.width = 64;
        circleCanvas.height = 64;

        const ctxCircle = circleCanvas.getContext('2d');
        ctxCircle.beginPath();
        ctxCircle.arc(32, 32, 30, 0, Math.PI * 2);
        ctxCircle.fillStyle = 'white';
        ctxCircle.fill();

        const circleTexture = new THREE.CanvasTexture(circleCanvas);

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            map: circleTexture,        // ← texture ronde
            vertexColors: true,
            transparent: true,
            alphaTest: 0.3,            // ← enlève les bords carrés
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Create realistic Earth with detailed textures
        let earth = null;
        let clouds = null;
        let atmosphere = null;

        const createRealisticEarth = () => {
            // Create high-quality Earth texture
            const earthCanvas = document.createElement('canvas');
            earthCanvas.width = 2048;
            earthCanvas.height = 1024;
            const ctx = earthCanvas.getContext('2d');

            // Deep ocean base
            const gradient = ctx.createLinearGradient(0, 0, 0, 1024);
            gradient.addColorStop(0, '#001a33');
            gradient.addColorStop(0.5, '#003d66');
            gradient.addColorStop(1, '#001a33');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 2048, 1024);

            // Add continents with realistic shapes
            const continents = [
                // Africa
                { x: 1100, y: 512, points: [[0, -80], [40, -60], [60, -20], [50, 40], [20, 80], [-20, 70], [-40, 20], [-30, -40]] },
                // Europe
                { x: 1050, y: 350, points: [[0, -30], [40, -25], [60, -10], [50, 10], [20, 20], [-10, 15], [-20, 0]] },
                // Asia
                { x: 1300, y: 400, points: [[0, -60], [100, -50], [180, -30], [200, 0], [170, 40], [100, 50], [40, 40], [-20, 10]] },
                // Americas
                { x: 400, y: 400, points: [[0, -100], [40, -80], [50, 0], [60, 80], [40, 120], [10, 100], [-10, 60], [-20, 0]] },
                // Australia
                { x: 1600, y: 650, points: [[0, -30], [60, -20], [80, 0], [70, 30], [40, 40], [0, 35], [-20, 20]] },
            ];

            continents.forEach(continent => {
                ctx.fillStyle = '#2d5016';
                ctx.beginPath();
                ctx.moveTo(continent.x + continent.points[0][0], continent.y + continent.points[0][1]);
                continent.points.forEach(point => {
                    ctx.lineTo(continent.x + point[0], continent.y + point[1]);
                });
                ctx.closePath();
                ctx.fill();

                // Add variation to landmass
                ctx.fillStyle = '#3d6b1f';
                continent.points.forEach((point, i) => {
                    if (i % 2 === 0) {
                        ctx.beginPath();
                        ctx.arc(continent.x + point[0], continent.y + point[1], 15, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });
            });

            // Add ice caps
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, 2048, 80);
            ctx.fillRect(0, 944, 2048, 80);

            // Add some atmospheric variation
            for (let i = 0; i < 300; i++) {
                ctx.fillStyle = `rgba(30, 80, 120, ${Math.random() * 0.3})`;
                ctx.beginPath();
                ctx.arc(Math.random() * 2048, Math.random() * 1024, Math.random() * 30 + 10, 0, Math.PI * 2);
                ctx.fill();
            }

            const earthTexture = new THREE.CanvasTexture(earthCanvas);

            // Create bump map for terrain
            const bumpCanvas = document.createElement('canvas');
            bumpCanvas.width = 2048;
            bumpCanvas.height = 1024;
            const bumpCtx = bumpCanvas.getContext('2d');
            bumpCtx.fillStyle = '#808080';
            bumpCtx.fillRect(0, 0, 2048, 1024);

            continents.forEach(continent => {
                bumpCtx.fillStyle = '#ffffff';
                continent.points.forEach(point => {
                    bumpCtx.beginPath();
                    bumpCtx.arc(continent.x + point[0], continent.y + point[1], 20, 0, Math.PI * 2);
                    bumpCtx.fill();
                });
            });

            const bumpTexture = new THREE.CanvasTexture(bumpCanvas);

            // Earth sphere with advanced material
            const earthGeometry = new THREE.SphereGeometry(1.5, 64, 64);
            const earthMaterial = new THREE.MeshPhongMaterial({
                map: earthTexture,
                bumpMap: bumpTexture,
                bumpScale: 0.05,
                specular: new THREE.Color(0x333333),
                shininess: 10,
            });

            earth = new THREE.Mesh(earthGeometry, earthMaterial);
            earth.rotation.z = 23.5 * Math.PI / 180; // Earth's axial tilt
            scene.add(earth);

            // Create realistic cloud layer
            const cloudsCanvas = document.createElement('canvas');
            cloudsCanvas.width = 2048;
            cloudsCanvas.height = 1024;
            const cloudsCtx = cloudsCanvas.getContext('2d');

            // Transparent background
            cloudsCtx.clearRect(0, 0, 2048, 1024);

            // Add clouds with variation
            for (let i = 0; i < 800; i++) {
                const x = Math.random() * 2048;
                const y = Math.random() * 1024;
                const size = Math.random() * 60 + 20;
                const opacity = Math.random() * 0.7 + 0.3;

                cloudsCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                cloudsCtx.beginPath();
                cloudsCtx.arc(x, y, size, 0, Math.PI * 2);
                cloudsCtx.fill();

                // Add smaller details
                cloudsCtx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
                cloudsCtx.beginPath();
                cloudsCtx.arc(x + size / 2, y, size / 2, 0, Math.PI * 2);
                cloudsCtx.fill();
            }

            const cloudsTexture = new THREE.CanvasTexture(cloudsCanvas);
            const cloudsGeometry = new THREE.SphereGeometry(1.52, 64, 64);
            const cloudsMaterial = new THREE.MeshPhongMaterial({
                map: cloudsTexture,
                transparent: true,
                opacity: 0.4,
                depthWrite: false,
            });

            clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
            clouds.rotation.z = 23.5 * Math.PI / 180;
            scene.add(clouds);

            // Atmospheric glow with shader
            const atmosphereGeometry = new THREE.SphereGeometry(1.7, 64, 64);
            const atmosphereMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    color: { value: new THREE.Color(0x4eb3ff) }
                },
                vertexShader: `
                    varying vec3 vNormal;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 color;
                    varying vec3 vNormal;
                    void main() {
                        float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                        gl_FragColor = vec4(color, 1.0) * intensity;
                    }
                `,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true,
            });

            atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
            scene.add(atmosphere);
        };

        createRealisticEarth();

        // Add realistic lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
        sunLight.position.set(5, 2, 3);
        scene.add(sunLight);

        const fillLight = new THREE.DirectionalLight(0x6495ED, 0.3);
        fillLight.position.set(-5, 0, -3);
        scene.add(fillLight);

        // Create floating rings
        const rings = [];
        // for (let i = 0; i < 3; i++) {
        //     const ringGeometry = new THREE.TorusGeometry(2 + i * 0.5, 0.02, 16, 100);
        //     const ringMaterial = new THREE.MeshBasicMaterial({
        //         color: i === 0 ? 0xec4899 : i === 1 ? 0x9333ea : 0x22d3ee,
        //         transparent: true,
        //         opacity: 0.3
        //     });
        //     const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        //     ring.position.z = -2;
        //     ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        //     scene.add(ring);
        //     rings.push(ring);
        // }

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