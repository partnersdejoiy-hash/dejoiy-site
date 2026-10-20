import { useEffect, useRef } from "react";

/**
 * CosmosCanvas — a fixed, full-viewport Three.js universe that sits behind
 * the whole page. The camera flies forward through the starfield as the user
 * scrolls (scrubbed), with mouse parallax, an orbital satellite system and
 * slow-drifting shader nebulae. Perf-guarded: DPR clamp, tab-hidden pause,
 * reduced-motion and WebGL-failure fallbacks.
 */
export default function CosmosCanvas() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof window === "undefined") return;
    let disposed = false;
    let innerCleanup = null;

    (async () => {
      let THREE, gsap, ScrollTrigger;
      try {
        THREE = await import("three");
        ({ gsap } = await import("gsap"));
        ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
        gsap.registerPlugin(ScrollTrigger);
      } catch {
        host.style.display = "none";
        return;
      }
      if (disposed) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const mobile =
        window.innerWidth < 768 ||
        window.matchMedia("(pointer: coarse)").matches;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
      } catch {
        host.style.display = "none";
        return;
      }
      renderer.setClearColor(0x000000, 0);
      const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.6);
      renderer.setPixelRatio(DPR);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.setAttribute("aria-hidden", "true");
      host.prepend(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        58,
        window.innerWidth / window.innerHeight,
        0.1,
        600,
      );
      camera.position.set(0, 1.5, 8);

      // ── soft dot sprite ─────────────────────────────
      const dotTex = (() => {
        const c = document.createElement("canvas");
        c.width = c.height = 64;
        const ctx = c.getContext("2d");
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.35, "rgba(255,255,255,0.55)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(c);
      })();

      // ── starfield tunnel (3 depth layers) ───────────
      const palette = [
        "#ffffff",
        "#ffffff",
        "#dbeafe",
        "#e0f2fe",
        "#f5d0fe",
        "#c4b5fd",
      ];
      const makeStars = (count, sx, sy, sz, size, opacity) => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const c = new THREE.Color();
        for (let i = 0; i < count; i++) {
          pos[i * 3] = (Math.random() * 2 - 1) * sx;
          pos[i * 3 + 1] = (Math.random() * 2 - 1) * sy;
          pos[i * 3 + 2] = 24 - Math.random() * sz;
          c.set(palette[(Math.random() * palette.length) | 0]);
          const dim = 0.45 + Math.random() * 0.55;
          col[i * 3] = c.r * dim;
          col[i * 3 + 1] = c.g * dim;
          col[i * 3 + 2] = c.b * dim;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
        const mat = new THREE.PointsMaterial({
          size,
          map: dotTex,
          vertexColors: true,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        });
        const pts = new THREE.Points(geo, mat);
        scene.add(pts);
        return pts;
      };
      const k = mobile ? 0.55 : 1;
      const starFar = makeStars(Math.round(900 * k), 90, 60, 300, 1.15, 0.75);
      const starMid = makeStars(Math.round(600 * k), 70, 48, 240, 1.7, 0.85);
      const starNear = makeStars(Math.round(320 * k), 55, 38, 190, 2.6, 0.95);

      // ── nebulae: slow fbm smoke, kept subtle ────────
      const nebulaVert = `
        varying vec2 vUv;
        void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `;
      const nebulaFrag = `
        uniform float uTime; uniform float uSeed; uniform float uAlpha;
        varying vec2 vUv;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
        float noise(vec2 p){
          vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.,0.)), u.x),
                     mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), u.x), u.y);
        }
        float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.03; a *= 0.5; } return v; }
        void main(){
          vec2 p = vUv - 0.5;
          float d = length(p);
          float n = fbm(p * 3.0 + uSeed + vec2(uTime * 0.020, uTime * 0.013));
          float m = fbm(p * 6.0 - uSeed + vec2(-uTime * 0.017, uTime * 0.021));
          float glow = smoothstep(0.5, 0.04, d);
          vec3 col = mix(vec3(0.07, 0.10, 0.30), vec3(0.30, 0.13, 0.48), n);
          col = mix(col, vec3(0.62, 0.20, 0.52), smoothstep(0.55, 0.9, m) * 0.55);
          float a = glow * (n * 0.72 + m * 0.28) * uAlpha;
          gl_FragColor = vec4(col, a);
        }
      `;
      const nebulas = [];
      const nebulaDefs = [
        { x: -38, y: 14, z: -120, s: 150, seed: 3.1, a: 0.5, spin: 0.008 },
        { x: 44, y: -16, z: -150, s: 170, seed: 11.7, a: 0.42, spin: -0.006 },
        { x: -6, y: -26, z: -95, s: 110, seed: 7.4, a: 0.36, spin: 0.01 },
        { x: 20, y: 30, z: -190, s: 190, seed: 19.2, a: 0.4, spin: -0.004 },
      ];
      nebulaDefs.forEach((d) => {
        const mat = new THREE.ShaderMaterial({
          vertexShader: nebulaVert,
          fragmentShader: nebulaFrag,
          uniforms: {
            uTime: { value: Math.random() * 100 },
            uSeed: { value: d.seed },
            uAlpha: { value: d.a },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(d.s, d.s), mat);
        mesh.position.set(d.x, d.y, d.z);
        mesh.userData.spin = d.spin;
        scene.add(mesh);
        nebulas.push(mesh);
      });

      // ── orbital system: core + rings + satellites ───
      const system = new THREE.Group();
      system.position.set(16, 5, -54);
      const core = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: dotTex,
          color: "#f5d0fe",
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      core.scale.set(9, 9, 1);
      const coreHot = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: dotTex,
          color: "#ffffff",
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      coreHot.scale.set(3.4, 3.4, 1);
      system.add(core, coreHot);
      const satellites = [];
      [
        { r: 10, tx: 0.5, tz: 0.25, color: "#38bdf8", speed: 0.34 },
        { r: 14.5, tx: -0.42, tz: 0.38, color: "#a78bfa", speed: -0.22 },
        { r: 19, tx: 0.72, tz: -0.3, color: "#f472b6", speed: 0.15 },
      ].forEach((o) => {
        const holder = new THREE.Group();
        holder.rotation.x = o.tx;
        holder.rotation.z = o.tz;
        const curve = new THREE.EllipseCurve(0, 0, o.r, o.r);
        const pts = curve.getPoints(140).map((p) => new THREE.Vector3(p.x, p.y, 0));
        const ring = new THREE.LineLoop(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({
            color: o.color,
            transparent: true,
            opacity: 0.42,
          }),
        );
        holder.add(ring);
        const sat = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: dotTex,
            color: o.color,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        );
        sat.scale.set(2.2, 2.2, 1);
        holder.add(sat);
        system.add(holder);
        satellites.push({ holder, sat, r: o.r, speed: o.speed, angle: Math.random() * 6.28 });
      });
      scene.add(system);

      // ── near dust drift ─────────────────────────────
      const dustCount = Math.round((mobile ? 140 : 260) * 1);
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3] = (Math.random() * 2 - 1) * 42;
        dustPos[i * 3 + 1] = (Math.random() * 2 - 1) * 26;
        dustPos[i * 3 + 2] = 14 - Math.random() * 64;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      const dust = new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({
          size: 0.55,
          map: dotTex,
          color: "#93c5fd",
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      scene.add(dust);

      // ── scroll-driven flight ────────────────────────
      let targetP = 0;
      let progress = 0;
      let st = null;
      if (!reduced) {
        st = ScrollTrigger.create({
          trigger: document.body,
          start: 0,
          end: "max",
          onUpdate: (self) => {
            targetP = self.progress;
          },
        });
      } else {
        targetP = 0.12;
        progress = 0.12;
      }

      // ── mouse parallax ──────────────────────────────
      let mx = 0,
        my = 0,
        tmx = 0,
        tmy = 0;
      const onMove = (e) => {
        if (mobile) return;
        tmx = (e.clientX / window.innerWidth) * 2 - 1;
        tmy = (e.clientY / window.innerHeight) * 2 - 1;
      };
      if (!reduced && !mobile) window.addEventListener("mousemove", onMove);

      // ── frame loop ──────────────────────────────────
      let raf = 0;
      let visible = !document.hidden;
      const onVis = () => {
        visible = !document.hidden;
        if (visible && !disposed) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(tick);
        }
      };
      document.addEventListener("visibilitychange", onVis);
      const clock = new THREE.Clock();
      let frames = 0;
      let slowAt = 0;
      const tick = () => {
        if (disposed || !visible) return;
        raf = requestAnimationFrame(tick);
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        if (!reduced) {
          progress += (targetP - progress) * 0.055;
          mx += (tmx - mx) * 0.045;
          my += (tmy - my) * 0.045;
        }
        const e = progress * progress * (3 - 2 * progress);

        // camera flight: drift forward + rise + slight roll
        camera.position.set(mx * 3.4, 1.5 + my * 2.1 - e * 7, 8 - e * 165);
        camera.lookAt(mx * 1.4, 0.5 - e * 4, -70);
        camera.rotateZ(e * 0.05 + mx * 0.012);

        starFar.rotation.z = t * 0.004;
        starMid.rotation.z = -t * 0.006;
        starNear.rotation.z = t * 0.009;

        nebulas.forEach((n) => {
          n.material.uniforms.uTime.value = t;
          n.rotation.z += n.userData.spin * dt * 8;
        });

        const pulse = 1 + Math.sin(t * 1.6) * 0.08;
        core.scale.set(9 * pulse, 9 * pulse, 1);
        system.rotation.y = Math.sin(t * 0.08) * 0.12;
        satellites.forEach((s) => {
          s.angle += s.speed * dt;
          s.sat.position.set(
            Math.cos(s.angle) * s.r,
            Math.sin(s.angle) * s.r,
            0,
          );
        });

        const dp = dustGeo.attributes.position.array;
        for (let i = 0; i < dustCount; i++) {
          dp[i * 3] += dt * 0.55;
          if (dp[i * 3] > 42) dp[i * 3] = -42;
        }
        dustGeo.attributes.position.needsUpdate = true;

        // tie a CSS var to flight progress for DOM-side tint shifts
        document.documentElement.style.setProperty(
          "--cosmos-p",
          e.toFixed(4),
        );

        renderer.render(scene, camera);

        // fps guard: halve resolution if struggling
        frames++;
        if (!slowAt && t > 4 && frames / t < 22) {
          slowAt = t;
          renderer.setPixelRatio(1);
        }
      };
      raf = requestAnimationFrame(tick);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);
      const onCtxLost = (ev) => {
        ev.preventDefault();
        host.style.display = "none";
      };
      renderer.domElement.addEventListener("webglcontextlost", onCtxLost);

      innerCleanup = () => {
        disposed = true;
        cancelAnimationFrame(raf);
        st?.kill();
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVis);
        renderer.domElement.removeEventListener("webglcontextlost", onCtxLost);
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) {
            (Array.isArray(o.material) ? o.material : [o.material]).forEach(
              (m) => {
                Object.values(m).forEach((v) => {
                  if (v && v.isTexture) v.dispose();
                });
                m.dispose();
              },
            );
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      innerCleanup?.();
    };
  }, []);

  return (
    <div ref={hostRef} className="cosmos-host" aria-hidden="true">
      <div className="cosmos-veil" aria-hidden="true" />
    </div>
  );
}
