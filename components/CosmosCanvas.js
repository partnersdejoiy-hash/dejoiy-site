import { useEffect, useRef } from "react";

/*
  DEJOIY universe — one fixed WebGL scene shared by every page.
  Layers: nebula backdrop, three-depth starfield, and an orbital "core"
  (glowing body, particle disc, three orbits carrying People / Purpose /
  Possibility satellites). Scroll position dollies the camera through the
  starfield; the pointer adds a light parallax.
  Text, navigation and CTAs stay in HTML above this canvas.
*/

const NEBULA_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const NEBULA_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uScroll;
uniform vec2 uAspect;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
void main() {
  vec2 uv = (vUv - 0.5) * uAspect;
  float t = uTime * 0.012;
  vec2 drift = vec2(t, -t * 0.6) + vec2(0.0, uScroll * 0.9);
  float q = fbm(uv * 1.6 + drift);
  float r = fbm(uv * 2.4 + q * 1.8 - drift * 1.3);
  float cloud = smoothstep(0.38, 0.95, r);
  vec3 base = vec3(0.016, 0.010, 0.045);
  vec3 magenta = vec3(0.78, 0.13, 0.52);
  vec3 violet = vec3(0.36, 0.17, 0.78);
  vec3 blue = vec3(0.12, 0.27, 0.82);
  float band = smoothstep(-0.9, 0.9, uv.x + uv.y * 0.4 + sin(uScroll * 3.14) * 0.4);
  vec3 tint = mix(magenta, violet, band);
  tint = mix(tint, blue, smoothstep(0.45, 1.0, q + band * 0.35));
  float vignette = smoothstep(1.25, 0.15, length(uv * vec2(0.8, 1.1)));
  vec3 col = base + tint * cloud * 0.34 * vignette;
  col += tint * pow(q, 3.0) * 0.12 * vignette;
  gl_FragColor = vec4(col, 1.0);
}`;

const STAR_VERT = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float depth = max(-mv.z, 0.1);
  gl_PointSize = clamp(aSize * uPixelRatio * (70.0 / depth), 0.0, 9.0 * uPixelRatio);
  vColor = aColor;
  vTwinkle = 0.62 + 0.38 * sin(uTime * (0.6 + aPhase * 1.4) + aPhase * 30.0);
  vTwinkle *= smoothstep(0.4, 6.0, depth);
}`;

const STAR_FRAG = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float core = smoothstep(0.5, 0.0, d);
  float alpha = pow(core, 2.2) * vTwinkle;
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(vColor, alpha);
}`;

const DISC_VERT = /* glsl */ `
attribute float aRadius;
attribute float aAngle;
attribute float aLift;
attribute float aSize;
uniform float uTime;
uniform float uPixelRatio;
varying float vMix;
varying float vAlpha;
void main() {
  float angle = aAngle + uTime * (0.34 / sqrt(aRadius));
  vec3 p = vec3(cos(angle) * aRadius, aLift, sin(angle) * aRadius);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixelRatio * (24.0 / max(-mv.z, 0.1));
  vMix = smoothstep(2.4, 7.0, aRadius);
  vAlpha = smoothstep(7.4, 5.2, aRadius) * smoothstep(2.1, 2.9, aRadius);
}`;

const DISC_FRAG = /* glsl */ `
precision highp float;
varying float vMix;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.85;
  if (a < 0.01) discard;
  vec3 inner = vec3(1.0, 0.42, 0.78);
  vec3 mid = vec3(0.62, 0.42, 1.0);
  vec3 outer = vec3(0.38, 0.58, 1.0);
  vec3 col = mix(inner, mid, smoothstep(0.0, 0.5, vMix));
  col = mix(col, outer, smoothstep(0.5, 1.0, vMix));
  gl_FragColor = vec4(col, a);
}`;

const CORE_VERT = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vPos;
void main() {
  vPos = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;

const CORE_FRAG = /* glsl */ `
precision highp float;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vPos;
uniform float uTime;
float hash(vec3 p) { return fract(sin(dot(p, vec3(17.1, 113.3, 71.7))) * 43758.5453); }
float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash(i), n100 = hash(i + vec3(1,0,0)), n010 = hash(i + vec3(0,1,0)), n110 = hash(i + vec3(1,1,0));
  float n001 = hash(i + vec3(0,0,1)), n101 = hash(i + vec3(1,0,1)), n011 = hash(i + vec3(0,1,1)), n111 = hash(i + vec3(1,1,1));
  return mix(mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
             mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y), f.z);
}
void main() {
  float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
  vec3 p = vPos * 1.7 + vec3(uTime * 0.05, uTime * 0.03, 0.0);
  float swirl = noise(p) * 0.6 + noise(p * 2.3 - uTime * 0.04) * 0.4;
  vec3 deep = vec3(0.08, 0.03, 0.20);
  vec3 magenta = vec3(0.95, 0.22, 0.62);
  vec3 violet = vec3(0.52, 0.30, 1.0);
  vec3 blue = vec3(0.30, 0.55, 1.0);
  vec3 surface = mix(deep, violet, smoothstep(0.35, 0.8, swirl));
  surface = mix(surface, magenta, smoothstep(0.62, 0.9, swirl) * 0.7);
  vec3 rim = mix(magenta, blue, smoothstep(-0.6, 0.8, vNormal.y));
  vec3 col = surface * 0.75 + rim * fresnel * 1.6;
  gl_FragColor = vec4(col, 1.0);
}`;

const GLOW_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const GLOW_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec3 uColor;
uniform float uStrength;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float a = pow(max(1.0 - d, 0.0), 2.6) * uStrength;
  gl_FragColor = vec4(uColor, a);
}`;

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export default function CosmosCanvas({ variant = "home" }) {
  const hostRef = useRef(null);
  const variantRef = useRef(variant);

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !hasWebGL() || navigator.connection?.saveData) return;

    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const small = window.matchMedia("(max-width: 820px)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      let pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        small ? 1.3 : 1.75,
      );

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x05030d, 1);
      renderer.domElement.setAttribute("aria-hidden", "true");
      let failed = false;
      /* If any shader fails to compile, fall back to the static CSS sky. */
      renderer.debug.onShaderError = () => {
        failed = true;
      };
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
      camera.position.set(0, 0, 14);
      scene.add(camera);

      const disposables = [];
      const track = (...items) => {
        disposables.push(...items);
        return items[0];
      };

      /* Nebula: a camera-locked backdrop so it never parallaxes away. */
      const nebulaUniforms = {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uAspect: { value: new THREE.Vector2(1, 1) },
      };
      const nebula = new THREE.Mesh(
        track(new THREE.PlaneGeometry(1, 1)),
        track(
          new THREE.ShaderMaterial({
            vertexShader: NEBULA_VERT,
            fragmentShader: NEBULA_FRAG,
            uniforms: nebulaUniforms,
            depthWrite: false,
          }),
        ),
      );
      nebula.position.z = -200;
      nebula.renderOrder = -1;
      camera.add(nebula);

      /* Starfield */
      const starCount = small ? 2600 : 6500;
      const starPos = new Float32Array(starCount * 3);
      const starSize = new Float32Array(starCount);
      const starPhase = new Float32Array(starCount);
      const starColor = new Float32Array(starCount * 3);
      const palette = [
        [1, 1, 1],
        [1, 0.78, 0.92],
        [0.78, 0.84, 1],
        [0.86, 0.78, 1],
      ];
      for (let i = 0; i < starCount; i++) {
        starPos[i * 3] = (Math.random() - 0.5) * 140;
        starPos[i * 3 + 1] = (Math.random() - 0.5) * 90;
        starPos[i * 3 + 2] = 24 - Math.random() * 170;
        starSize[i] = Math.random() < 0.06 ? 2.6 + Math.random() * 2 : 0.7 + Math.random() * 1.4;
        starPhase[i] = Math.random();
        const c = palette[(Math.random() * palette.length) | 0];
        starColor.set(c, i * 3);
      }
      const starGeo = track(new THREE.BufferGeometry());
      starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
      starGeo.setAttribute("aSize", new THREE.BufferAttribute(starSize, 1));
      starGeo.setAttribute("aPhase", new THREE.BufferAttribute(starPhase, 1));
      starGeo.setAttribute("aColor", new THREE.BufferAttribute(starColor, 3));
      const starUniforms = {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      };
      const stars = new THREE.Points(
        starGeo,
        track(
          new THREE.ShaderMaterial({
            vertexShader: STAR_VERT,
            fragmentShader: STAR_FRAG,
            uniforms: starUniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        ),
      );
      scene.add(stars);

      /* Orbital system */
      const system = new THREE.Group();
      scene.add(system);

      const coreUniforms = { uTime: { value: 0 } };
      const core = new THREE.Mesh(
        track(new THREE.SphereGeometry(1.15, small ? 48 : 72, small ? 48 : 72)),
        track(
          new THREE.ShaderMaterial({
            vertexShader: CORE_VERT,
            fragmentShader: CORE_FRAG,
            uniforms: coreUniforms,
          }),
        ),
      );
      system.add(core);

      const makeGlow = (color, strength, size) => {
        const mesh = new THREE.Mesh(
          track(new THREE.PlaneGeometry(1, 1)),
          track(
            new THREE.ShaderMaterial({
              vertexShader: GLOW_VERT,
              fragmentShader: GLOW_FRAG,
              uniforms: {
                uColor: { value: new THREE.Color(color) },
                uStrength: { value: strength },
              },
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            }),
          ),
        );
        mesh.scale.setScalar(size);
        return mesh;
      };
      const coreGlow = makeGlow(0xc04bff, 0.75, 8.5);
      const coreGlowHot = makeGlow(0xff4fae, 0.55, 4.2);
      system.add(coreGlow, coreGlowHot);

      const discCount = small ? 4200 : 10000;
      const dRadius = new Float32Array(discCount);
      const dAngle = new Float32Array(discCount);
      const dLift = new Float32Array(discCount);
      const dSize = new Float32Array(discCount);
      for (let i = 0; i < discCount; i++) {
        const r = 2.3 + Math.pow(Math.random(), 1.7) * 5.2;
        dRadius[i] = r;
        dAngle[i] = Math.random() * Math.PI * 2;
        dLift[i] = (Math.random() - 0.5) * 0.18 * (r / 4);
        dSize[i] = 0.6 + Math.random() * 1.6;
      }
      const discGeo = track(new THREE.BufferGeometry());
      discGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(discCount * 3), 3),
      );
      discGeo.setAttribute("aRadius", new THREE.BufferAttribute(dRadius, 1));
      discGeo.setAttribute("aAngle", new THREE.BufferAttribute(dAngle, 1));
      discGeo.setAttribute("aLift", new THREE.BufferAttribute(dLift, 1));
      discGeo.setAttribute("aSize", new THREE.BufferAttribute(dSize, 1));
      discGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);
      const discUniforms = {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
      };
      const disc = new THREE.Points(
        discGeo,
        track(
          new THREE.ShaderMaterial({
            vertexShader: DISC_VERT,
            fragmentShader: DISC_FRAG,
            uniforms: discUniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        ),
      );
      disc.rotation.set(1.18, 0, 0.32);
      system.add(disc);

      const orbitDefs = [
        { radius: 3.1, tilt: [1.05, 0.2, 0.5], speed: 0.32, color: 0xff6fc0 },
        { radius: 4.3, tilt: [1.35, -0.25, -0.4], speed: 0.21, color: 0xa98bff },
        { radius: 5.6, tilt: [0.82, 0.4, 0.15], speed: 0.14, color: 0x7aa7ff },
      ];
      const orbits = orbitDefs.map((def, index) => {
        const pivot = new THREE.Group();
        pivot.rotation.set(...def.tilt);
        const curve = new THREE.EllipseCurve(0, 0, def.radius, def.radius);
        const points = curve
          .getPoints(160)
          .map((p) => new THREE.Vector3(p.x, 0, p.y));
        const ring = new THREE.LineLoop(
          track(new THREE.BufferGeometry().setFromPoints(points)),
          track(
            new THREE.LineBasicMaterial({
              color: def.color,
              transparent: true,
              opacity: 0.22,
              depthWrite: false,
            }),
          ),
        );
        pivot.add(ring);
        const satellite = new THREE.Mesh(
          track(new THREE.SphereGeometry(0.09, 16, 16)),
          track(new THREE.MeshBasicMaterial({ color: 0xffffff })),
        );
        const halo = makeGlow(def.color, 0.9, 1.1);
        satellite.add(halo);
        pivot.add(satellite);
        system.add(pivot);
        return { pivot, satellite, halo, def, phase: index * 2.1 };
      });

      /* Layout + motion state (refs only — no React state in the frame loop). */
      const state = {
        width: 1,
        height: 1,
        scroll: 0,
        scrollEased: 0,
        pointerX: 0,
        pointerY: 0,
        px: 0,
        py: 0,
        sysX: 0,
        sysY: 0,
        sysZ: 0,
        sysScale: 1,
      };

      const target = () => {
        const home = variantRef.current === "home";
        if (home) {
          if (small) return { x: 0, y: 2.2, z: -4, scale: 0.78 };
          return { x: 4.6, y: 0.1, z: 0, scale: 1 };
        }
        return small
          ? { x: 2.6, y: 3.4, z: -18, scale: 0.7 }
          : { x: 9.5, y: 3.8, z: -16, scale: 0.85 };
      };
      {
        const t = target();
        state.sysX = t.x;
        state.sysY = t.y;
        state.sysZ = t.z;
        state.sysScale = t.scale;
      }

      const resize = () => {
        const w = host.clientWidth || window.innerWidth;
        const h = host.clientHeight || window.innerHeight;
        state.width = w;
        state.height = h;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const planeH =
          2 * 200 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        nebula.scale.set(planeH * camera.aspect * 1.08, planeH * 1.08, 1);
        nebulaUniforms.uAspect.value.set(camera.aspect, 1);
        if (reduced && !failed) {
          try {
            renderFrame(0);
          } catch {
            host.classList.remove("is-live");
          }
        }
      };

      const readScroll = () => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        state.scroll = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      };

      const onPointer = (e) => {
        state.pointerX = (e.clientX / state.width - 0.5) * 2;
        state.pointerY = (e.clientY / state.height - 0.5) * 2;
      };

      const clock = new THREE.Clock();
      let elapsed = 0;
      let frameId = 0;
      let running = false;
      let sampleFrames = 0;
      let sampleStart = 0;
      let downgraded = false;
      let revealed = false;

      const parentQuat = new THREE.Quaternion();
      const faceCamera = (mesh) => {
        mesh.parent.getWorldQuaternion(parentQuat);
        mesh.quaternion.copy(parentQuat.invert().multiply(camera.quaternion));
      };

      function renderFrame(dt) {
        elapsed += dt;
        const t = elapsed;
        starUniforms.uTime.value = t;
        discUniforms.uTime.value = t;
        coreUniforms.uTime.value = t;
        nebulaUniforms.uTime.value = t;

        const ease = reduced ? 1 : Math.min(dt * 2.4, 1);
        state.scrollEased += (state.scroll - state.scrollEased) * ease;
        const s = state.scrollEased;
        nebulaUniforms.uScroll.value = s;

        const goal = target();
        const follow = reduced ? 1 : Math.min(dt * 1.6, 1);
        state.sysX += (goal.x - state.sysX) * follow;
        state.sysY += (goal.y - state.sysY) * follow;
        state.sysZ += (goal.z - state.sysZ) * follow;
        state.sysScale += (goal.scale - state.sysScale) * follow;

        /* As the visitor scrolls, the core recedes upward and the camera
           drifts deeper into the field. */
        const lift = Math.min(s * 4, 1);
        system.position.set(
          state.sysX - lift * (small ? 0 : 1.4),
          state.sysY + lift * 3.2,
          state.sysZ - lift * 14,
        );
        system.scale.setScalar(state.sysScale);
        system.rotation.y = t * 0.035 + s * 1.6;
        system.rotation.x = Math.sin(t * 0.07) * 0.06 + s * 0.4;

        const pointerEase = reduced ? 0 : Math.min(dt * 2, 1);
        state.px += (state.pointerX - state.px) * pointerEase;
        state.py += (state.pointerY - state.py) * pointerEase;
        camera.position.x = state.px * 0.7;
        camera.position.y = -state.py * 0.45 - s * 4;
        camera.position.z = 14 - s * 58;
        camera.lookAt(state.px * 0.25, -s * 4 - state.py * 0.1, camera.position.z - 14);
        camera.updateMatrixWorld();
        orbits.forEach((o) => {
          const a = o.phase + t * o.def.speed;
          o.satellite.position.set(
            Math.cos(a) * o.def.radius,
            0,
            Math.sin(a) * o.def.radius,
          );
          o.pivot.rotation.y = t * 0.02;
        });
        system.updateMatrixWorld(true);
        coreGlow.material.uniforms.uStrength.value = 0.68 + Math.sin(t * 0.8) * 0.07;
        faceCamera(coreGlow);
        faceCamera(coreGlowHot);
        orbits.forEach((o) => faceCamera(o.halo));
        stars.rotation.z = t * 0.004;

        renderer.render(scene, camera);
        if (failed) throw new Error("shader");
        if (!revealed) {
          revealed = true;
          host.classList.add("is-live");
        }
      }

      const loop = () => {
        if (!running) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        readScroll();
        try {
          renderFrame(dt);
        } catch {
          stop();
          host.classList.remove("is-live");
          return;
        }

        /* One-time performance check: drop resolution on struggling GPUs. */
        if (!downgraded) {
          const now = performance.now();
          if (!sampleStart) sampleStart = now;
          sampleFrames++;
          if (now - sampleStart > 2500) {
            const fps = (sampleFrames * 1000) / (now - sampleStart);
            if (fps < 30 && pixelRatio > 1) {
              pixelRatio = 1;
              renderer.setPixelRatio(1);
              starUniforms.uPixelRatio.value = 1;
              discUniforms.uPixelRatio.value = 1;
              resize();
            }
            downgraded = true;
          }
        }
        frameId = requestAnimationFrame(loop);
      };

      const start = () => {
        if (running || reduced || document.hidden) return;
        running = true;
        clock.getDelta();
        frameId = requestAnimationFrame(loop);
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(frameId);
      };
      const onVisibility = () => (document.hidden ? stop() : start());
      const onContextLost = (e) => {
        e.preventDefault();
        stop();
        host.classList.remove("is-live");
      };

      resize();
      readScroll();
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", onVisibility);
      renderer.domElement.addEventListener("webglcontextlost", onContextLost);
      if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });
      if (reduced) {
        try {
          renderFrame(0);
        } catch {
          host.classList.remove("is-live");
        }
      } else {
        start();
      }

      cleanup = () => {
        stop();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVisibility);
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
        disposables.forEach((item) => item.dispose?.());
        renderer.dispose();
        renderer.domElement.remove();
        host.classList.remove("is-live");
      };
    }).catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="cosmos" aria-hidden="true">
      <div className="cosmos-fallback" />
      <div ref={hostRef} className="cosmos-canvas" />
      <div className="cosmos-veil" />
    </div>
  );
}
