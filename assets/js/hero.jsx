/* ───────────────────────────────────────────────────────────────────────────
   Three.js hero scenes.  Three modes: "particles" (default), "geometry", "fluid".
   Mode is read from a single prop and from a global window.__heroMode setter
   so the Tweaks panel can hot-swap without unmounting the React tree.

   Public API:
     <Hero mode="particles" />
     window.__setHeroMode("geometry")
   ─────────────────────────────────────────────────────────────────────────── */

const HERO_PALETTE = () => {
  const cs = getComputedStyle(document.documentElement);
  return {
    a1: cs.getPropertyValue("--c-a1").trim() || "#22D3EE",
    a2: cs.getPropertyValue("--c-a2").trim() || "#3B82F6",
    a3: cs.getPropertyValue("--c-a3").trim() || "#8B5CF6",
    deep: cs.getPropertyValue("--c-deep").trim() || "#061838",
  };
};

function Hero({ mode = "particles" }) {
  const mountRef = React.useRef(null);
  const sceneRef = React.useRef(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene + camera + renderer set up once.
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Pointer + scroll-driven camera drift
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onTouch = (e) => {
      if (!e.touches.length) return;
      const t = e.touches[0];
      const r = mount.getBoundingClientRect();
      pointer.tx = ((t.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = -(((t.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    // Resize handling.
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ────────────────────── scene builders (3 variants) ──────────────────────
    let activeScene = null;

    const clearScene = () => {
      if (!activeScene) return;
      activeScene.dispose && activeScene.dispose();
      while (scene.children.length) {
        const obj = scene.children.pop();
        if (obj.geometry) obj.geometry.dispose && obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose && obj.material.dispose();
        }
      }
      activeScene = null;
    };

    // ─────── Mode 1: PARTICLES (data cloud, mouse-reactive) ───────
    const buildParticles = () => {
      const pal = HERO_PALETTE();
      const isMobile = window.innerWidth < 760;
      const count = isMobile ? 1600 : 4800;

      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);   // current (animated)
      const initial   = new Float32Array(count * 3);   // PDS — scattered shell
      const target1   = new Float32Array(count * 3);   // Graph network — concentric rings
      const target2   = new Float32Array(count * 3);   // SLM core — tight central sphere
      const colors    = new Float32Array(count * 3);
      const sizes     = new Float32Array(count);

      const c1 = new THREE.Color(pal.a1);
      const c2 = new THREE.Color(pal.a2);
      const c3 = new THREE.Color(pal.a3);

      for (let i = 0; i < count; i++) {
        // Initial: scattered PDS nebula.
        const r = 8 + Math.pow(Math.random(), 1.5) * 14;
        const phi   = Math.acos(2 * Math.random() - 1);
        const theta = Math.random() * Math.PI * 2;
        const x = r * Math.sin(phi) * Math.cos(theta) * 1.5;
        const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
        const z = r * Math.cos(phi) * 0.8;
        positions[i * 3 + 0] = initial[i * 3 + 0] = x;
        positions[i * 3 + 1] = initial[i * 3 + 1] = y;
        positions[i * 3 + 2] = initial[i * 3 + 2] = z;

        // Target 1: concentric rings (graph rendering). 3 rings.
        const ring = Math.floor(Math.random() * 3);
        const ringR = 6 + ring * 5.5;
        const ringTheta = Math.random() * Math.PI * 2;
        const jitter = (Math.random() - 0.5) * 0.6;
        target1[i * 3 + 0] = Math.cos(ringTheta) * (ringR + jitter) * 1.4;
        target1[i * 3 + 1] = Math.sin(ringTheta) * (ringR + jitter) * 0.9;
        target1[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

        // Target 2: tight central sphere (SLM core), with outliers fading.
        const coreR = Math.pow(Math.random(), 2.0) * 5.5;
        const coreP = Math.acos(2 * Math.random() - 1);
        const coreT = Math.random() * Math.PI * 2;
        target2[i * 3 + 0] = coreR * Math.sin(coreP) * Math.cos(coreT) * 1.1;
        target2[i * 3 + 1] = coreR * Math.sin(coreP) * Math.sin(coreT);
        target2[i * 3 + 2] = coreR * Math.cos(coreP) * 0.9;

        const mix = Math.random();
        const col = mix < 0.5 ? c1.clone().lerp(c2, mix * 2) : c2.clone().lerp(c3, (mix - 0.5) * 2);
        colors[i * 3 + 0] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
        sizes[i] = 0.09 + Math.random() * 0.20;
      }
      geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geom.setAttribute("aPos1",    new THREE.BufferAttribute(target1, 3));
      geom.setAttribute("aPos2",    new THREE.BufferAttribute(target2, 3));
      geom.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
      geom.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime:    { value: 0 },
          uMouse:   { value: new THREE.Vector2(0, 0) },
          uMorph:   { value: 0 }, // 0..1 (PDS → graph), 1..2 (graph → core)
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          attribute vec3 aPos1;
          attribute vec3 aPos2;
          varying vec3 vColor;
          varying float vDist;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform float uMorph;
          void main() {
            // Morph state 0..1: PDS → graph; 1..2: graph → SLM core
            float t1 = clamp(uMorph, 0.0, 1.0);
            float t2 = clamp(uMorph - 1.0, 0.0, 1.0);
            vec3 p = mix(position, aPos1, t1);
            p = mix(p, aPos2, t2);

            // slow swirl that softens as we collapse to the core
            float a = uTime * 0.08 * (1.0 - 0.5 * t2);
            float ca = cos(a), sa = sin(a);
            p.xz = mat2(ca, -sa, sa, ca) * p.xz;
            // gentle vertical drift
            p.y += sin(uTime * 0.4 + position.x * 0.2) * 0.18 * (1.0 - t2);
            // mouse-driven distortion (radial push)
            vec2 toM = p.xy - uMouse * 12.0;
            float dM = length(toM);
            float push = exp(-dM * 0.15) * 1.4;
            p.xy += normalize(toM + 0.0001) * push;

            vColor = color;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vDist = -mv.z;
            // Particles bloom slightly as they settle into the core
            float sizeBoost = mix(1.0, 1.35, t2);
            gl_PointSize = size * (320.0 / -mv.z) * sizeBoost;
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vDist;
          void main() {
            vec2 uv = gl_PointCoord - 0.5;
            float d = length(uv);
            float a = smoothstep(0.5, 0.0, d);
            a *= mix(0.55, 1.0, smoothstep(40.0, 6.0, vDist));
            gl_FragColor = vec4(vColor, a);
          }
        `,
      });

      const points = new THREE.Points(geom, mat);
      scene.add(points);

      activeScene = {
        update(t) {
          mat.uniforms.uTime.value = t;
          mat.uniforms.uMouse.value.set(pointer.x, pointer.y);
          // Driven by global scroll progress within the hero. 0 at top, 2 at bottom.
          const morph = window.__heroScrollMorph || 0;
          // Ease the morph for visual continuity
          mat.uniforms.uMorph.value += (morph - mat.uniforms.uMorph.value) * 0.08;
          points.rotation.y += 0.0006;
        },
        dispose() {
          geom.dispose();
          mat.dispose();
        },
      };
    };

    // ─────── Mode 2: GEOMETRY (wireframe icosahedra orbiting) ───────
    const buildGeometry = () => {
      const pal = HERO_PALETTE();
      const group = new THREE.Group();
      const count = 7;
      const meshes = [];
      for (let i = 0; i < count; i++) {
        const detail = i % 2 === 0 ? 1 : 2;
        const size = 1.2 + Math.random() * 2.2;
        const geom = new THREE.IcosahedronGeometry(size, detail);
        const colorBlend = i / (count - 1);
        const color = new THREE.Color(pal.a1).lerp(new THREE.Color(pal.a3), colorBlend);
        const mat = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.55,
        });
        const m = new THREE.Mesh(geom, mat);
        const ang = (i / count) * Math.PI * 2;
        const r = 6 + Math.random() * 6;
        m.position.set(Math.cos(ang) * r, Math.sin(ang * 1.3) * 3, Math.sin(ang) * r * 0.6);
        m.userData.speed = (Math.random() - 0.5) * 0.005;
        m.userData.axis  = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
        meshes.push(m);
        group.add(m);
      }
      scene.add(group);

      activeScene = {
        update(t) {
          group.rotation.y = t * 0.05 + pointer.x * 0.4;
          group.rotation.x = pointer.y * 0.25;
          meshes.forEach((m) => {
            m.rotateOnAxis(m.userData.axis, 0.004 + m.userData.speed);
          });
        },
        dispose() {
          meshes.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
        },
      };
    };

    // ─────── Mode 3: FLUID (large soft plane with gradient shader) ───────
    const buildFluid = () => {
      const pal = HERO_PALETTE();
      const geom = new THREE.PlaneGeometry(80, 50, 1, 1);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime:  { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uA1:    { value: new THREE.Color(pal.a1) },
          uA2:    { value: new THREE.Color(pal.a2) },
          uA3:    { value: new THREE.Color(pal.a3) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec3 uA1; uniform vec3 uA2; uniform vec3 uA3;
          // simplex-like noise (cheap)
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float noise(vec2 p){
            vec2 i = floor(p), f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
          }
          void main(){
            vec2 uv = vUv - 0.5;
            uv.x *= 1.7;
            float t = uTime * 0.18;
            // domain-warp the uv with noise; mouse offsets the warp slightly.
            vec2 q = uv + 0.6 * vec2(noise(uv * 1.4 + t), noise(uv * 1.4 + 4.3 - t));
            q += uMouse * 0.18;
            float n1 = noise(q * 2.2 + t);
            float n2 = noise(q * 1.0 - t * 0.7 + 5.0);
            vec3 col = mix(uA1, uA2, smoothstep(0.2, 0.85, n1));
            col = mix(col, uA3, smoothstep(0.35, 0.95, n2));
            float a = smoothstep(0.0, 1.0, n1) * 0.55;
            // soft vignette
            a *= smoothstep(1.0, 0.2, length(uv) * 1.15);
            gl_FragColor = vec4(col, a);
          }
        `,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.z = -8;
      scene.add(mesh);

      activeScene = {
        update(t) {
          mat.uniforms.uTime.value = t;
          mat.uniforms.uMouse.value.set(pointer.x, pointer.y);
        },
        dispose() { geom.dispose(); mat.dispose(); },
      };
    };

    const builders = { particles: buildParticles, geometry: buildGeometry, fluid: buildFluid };
    const apply = (m) => {
      clearScene();
      (builders[m] || buildParticles)();
    };
    apply(mode);

    // Allow Tweaks panel to swap modes without unmount.
    window.__setHeroMode = (m) => {
      apply(m);
    };
    // Re-read palette CSS variables on demand (after Tweaks color change).
    window.__refreshHeroPalette = () => {
      const m = sceneRef.current?.currentMode || mode;
      apply(m);
    };
    sceneRef.current = { apply, currentMode: mode };

    // ────────────────────────── animation loop ──────────────────────────
    let raf, t0 = performance.now() / 1000;
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (visible = e.isIntersecting)),
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(mount);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!visible || reduced) return;
      const t = performance.now() / 1000 - t0;
      // ease pointer
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      // gentle camera drift
      camera.position.x = pointer.x * 1.2;
      camera.position.y = pointer.y * 0.6;
      camera.lookAt(0, 0, 0);
      activeScene && activeScene.update(t);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      clearScene();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []); // mount once

  // External mode prop changes → ask the imperative API to swap.
  React.useEffect(() => {
    if (window.__setHeroMode) window.__setHeroMode(mode);
    if (sceneRef.current) sceneRef.current.currentMode = mode;
  }, [mode]);

  return <div ref={mountRef} className="hero__canvas" aria-hidden="true" />;
}

window.Hero = Hero;
