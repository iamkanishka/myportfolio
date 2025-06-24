// src/app/black-hole/black-hole.component.ts
import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'stats.js';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-black-hole',

  template: `
    <div #container class="black-hole-container"></div>
    <div class="performance-monitor"></div>
  `,
  styles: [
    `
      .black-hole-container {
        width: 100%;
        height: 100vh;
        position: relative;
      }
    `,
  ],
})
export class BlackHoleComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container') containerRef!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private stats!: Stats;
  private gui!: dat.GUI;
  private blackHole!: THREE.Mesh;
  private accretionDisk!: THREE.Mesh;
  private stars: THREE.Points[] = [];
  private clock = new THREE.Clock();
  private animationFrameId!: number;

  // Settings
  private settings = {
    realisticMode: true,
    showAccretionDisk: true,
    showGravitationalLensing: true,
    showStars: true,
    blackHoleSpin: 0.5,
    diskBrightness: 1.0,
    performanceMode: false,
  };

  ngOnInit() {
    this.initScene();
    this.initGUI();
    this.initStats();
  }

  ngAfterViewInit() {
    this.initRenderer();
    this.initControls();
    this.animate();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    this.gui.destroy();
    this.stats.dom.remove();
    this.renderer.dispose();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Black hole
    this.createBlackHole();

    // Accretion disk
    this.createAccretionDisk();

    // Stars background
    this.createStarField();

    // Lighting
    this.setupLighting();
  }

  private createBlackHole() {
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Custom shader for black hole with gravitational lensing
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        spin: { value: this.settings.blackHoleSpin },
        lensingEnabled: { value: this.settings.showGravitationalLensing },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        uniform float spin;
        uniform bool lensingEnabled;
        
        void main() {
          // Event horizon - pure black
          if (length(vPosition) < 1.0) {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
            return;
          }
          
          // Gravitational lensing effect
          if (lensingEnabled) {
            float dist = length(vPosition);
            float distortion = 1.0 / (dist * dist);
            vec3 dir = normalize(vPosition);
            
            // Add spin effect
            vec3 spinDir = vec3(dir.y * spin, -dir.x * spin, 0.0);
            
            // Warp the normal based on distortion and spin
            vec3 warpedNormal = normalize(vNormal + distortion * dir + 0.5 * spinDir * sin(time * 0.5));
            
            // Create a glowing edge effect
            float rim = pow(1.0 - abs(dot(warpedNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 glowColor = mix(vec3(0.1, 0.1, 0.5), vec3(0.8, 0.3, 0.1), rim);
            
            gl_FragColor = vec4(glowColor * (0.5 + 0.5 * rim), 1.0);
          } else {
            // Simple black hole without lensing
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          }
        }
      `,
    });

    this.blackHole = new THREE.Mesh(geometry, material);
    this.scene.add(this.blackHole);
  }

  private createAccretionDisk() {
    const innerRadius = 1.5;
    const outerRadius = 5.0;
    const segments = 128;

    const geometry = new THREE.RingGeometry(
      innerRadius,
      outerRadius,
      segments,
      128
    );

    // Custom shader for the accretion disk
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        brightness: { value: this.settings.diskBrightness },
        spin: { value: this.settings.blackHoleSpin },
      },
      vertexShader: `
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float brightness;
        uniform float spin;
        
        void main() {
          // Create spiral arms
          float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
          float radius = length(vUv - 0.5);
          
          // Add turbulence
          float turbulence = sin(radius * 20.0 - time * 2.0 + angle * 5.0) * 0.2;
          
          // Color gradient
          vec3 innerColor = vec3(0.8, 0.3, 0.1);
          vec3 outerColor = vec3(0.1, 0.3, 0.8);
          vec3 color = mix(innerColor, outerColor, radius);
          
          // Doppler effect (redshift/blueshift)
          float doppler = spin * (vUv.x - 0.5) * 2.0;
          color.r *= 1.0 + doppler;
          color.b *= 1.0 - doppler;
          
          // Brightness based on radius and turbulence
          float brightnessFactor = brightness * (1.0 - smoothstep(0.3, 1.0, radius)) * (0.8 + turbulence);
          
          gl_FragColor = vec4(color * brightnessFactor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    this.accretionDisk = new THREE.Mesh(geometry, material);
    this.accretionDisk.rotation.x = Math.PI / 2; // Make it flat in the XY plane
    this.scene.add(this.accretionDisk);
  }

  private createStarField() {
    // Create multiple layers of stars for parallax effect
    for (let i = 0; i < 3; i++) {
      const starCount = 1000 * (i + 1);
      const starsGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      const colors = new Float32Array(starCount * 3);

      for (let j = 0; j < starCount; j++) {
        // Random positions in a sphere
        const radius = 50 + i * 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        sizes[j] = 0.1 + Math.random() * 0.5;

        // Random star colors (mostly white with some variation)
        colors[j * 3] = 0.8 + Math.random() * 0.2;
        colors[j * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[j * 3 + 2] = 0.8 + Math.random() * 0.2;
      }

      starsGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      );
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const starsMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      const starField = new THREE.Points(starsGeometry, starsMaterial);
      this.stars.push(starField);
      this.scene.add(starField);
    }
  }

  private setupLighting() {
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x111111);
    this.scene.add(ambientLight);

    // Add directional light to simulate the glow from the accretion disk
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Add point light near the black hole to simulate the glow
    const pointLight = new THREE.PointLight(0x4411ff, 2, 10);
    pointLight.position.set(0, 0, 0);
    this.scene.add(pointLight);
  }

  private initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.containerRef.nativeElement.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 1.5;
    this.controls.maxDistance = 20;
    this.controls.maxPolarAngle = Math.PI * 0.9;

    // Pinch to zoom is enabled by default in OrbitControls for touch devices.
  }

  private initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb
    document.body.appendChild(this.stats.dom);
  }

  private initGUI() {
    this.gui = new dat.GUI({ width: 300 });
    this.gui
      .add(this.settings, 'realisticMode')
      .name('Realistic Mode')
      .onChange((val: boolean) => {
        this.updateMaterials();
      });
    this.gui
      .add(this.settings, 'showAccretionDisk')
      .name('Accretion Disk')
      .onChange((val: boolean) => {
        this.accretionDisk.visible = val;
      });
    this.gui
      .add(this.settings, 'showGravitationalLensing')
      .name('Gravitational Lensing')
      .onChange((val: boolean) => {
        if (this.blackHole.material instanceof THREE.ShaderMaterial) {
          this.blackHole.material.uniforms['lensingEnabled'].value = val;
        }
      });
    this.gui
      .add(this.settings, 'showStars')
      .name('Background Stars')
      .onChange((val: boolean) => {
        this.stars.forEach((star) => (star.visible = val));
      });
    this.gui
      .add(this.settings, 'blackHoleSpin', 0, 1)
      .name('Black Hole Spin')
      .onChange((val: number) => {
        if (this.blackHole.material instanceof THREE.ShaderMaterial) {
          this.blackHole.material.uniforms['spin'].value = val;
        }
        if (this.accretionDisk.material instanceof THREE.ShaderMaterial) {
          this.accretionDisk.material.uniforms['spin'].value = val;
        }
      });
    this.gui
      .add(this.settings, 'diskBrightness', 0.1, 2)
      .name('Disk Brightness')
      .onChange((val: number) => {
        if (this.accretionDisk.material instanceof THREE.ShaderMaterial) {
          this.accretionDisk.material.uniforms['brightness'].value = val;
        }
      });
    this.gui
      .add(this.settings, 'performanceMode')
      .name('Performance Mode')
      .onChange((val: boolean) => {
        this.renderer.setPixelRatio(val ? 1 : window.devicePixelRatio);
      });
  }

  private updateMaterials() {
    // This method would update materials based on the realistic/basic mode
    // For simplicity, we're just adjusting the quality settings
    if (this.settings.realisticMode) {
      this.blackHole.material = this.createRealisticBlackHoleMaterial();
      this.accretionDisk.material = this.createRealisticAccretionDiskMaterial();
    } else {
      this.blackHole.material = this.createBasicBlackHoleMaterial();
      this.accretionDisk.material = this.createBasicAccretionDiskMaterial();
    }
  }

  private createRealisticBlackHoleMaterial(): THREE.Material {
    // Return the shader material used in createBlackHole()
    return this.blackHole.material as THREE.ShaderMaterial;
  }

  private createBasicBlackHoleMaterial(): THREE.Material {
    return new THREE.MeshBasicMaterial({ color: 0x000000 });
  }

  private createRealisticAccretionDiskMaterial(): THREE.Material {
    // Return the shader material used in createAccretionDisk()
    return this.accretionDisk.material as THREE.ShaderMaterial;
  }

  private createBasicAccretionDiskMaterial(): THREE.Material {
    return new THREE.MeshBasicMaterial({
      color: 0x4411ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Update shader uniforms
    if (this.blackHole.material instanceof THREE.ShaderMaterial) {
      this.blackHole.material.uniforms['time'].value = time;
    }

    if (this.accretionDisk.material instanceof THREE.ShaderMaterial) {
      this.accretionDisk.material.uniforms['time'].value = time;
    }

    // Rotate the accretion disk
    this.accretionDisk.rotation.z += delta * 0.1 * this.settings.blackHoleSpin;

    // Update controls
    this.controls.update();

    // Render scene
    this.renderer.render(this.scene, this.camera);

    // Update stats
    this.stats.update();
  }
}
