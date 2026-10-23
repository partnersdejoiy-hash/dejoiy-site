import { useEffect, useRef, useState } from "react";

// A single authored scene changes topology as a request moves through DEJOIY.
export default function ConnectionScene({
  progress = 0,
  progressRef,
  phase = -1,
  channel = 0,
  paused = false,
}) {
  const host = useRef(null);
  const inputs = useRef({ progress, channel, paused });
  const invalidate = useRef(() => {});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    inputs.current = { progress, channel, paused };
    invalidate.current();
  }, [progress, phase, channel, paused]);
  useEffect(() => {
    const element = host.current;
    let disposed = false,
      renderer,
      scene,
      camera,
      assembly,
      points,
      material,
      pmrem,
      environment,
      frame,
      resizeObserver,
      viewObserver;
    let visible = true,
      running = false,
      clock = 0,
      smooth = 0,
      pointer = { x: 0, y: 0 },
      ringMeshes = [],
      rails = [],
      motes = [],
      savedFrame = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups = [];
    let THREE;
    function stop() {
      cancelAnimationFrame(frame);
      running = false;
    }
    function draw(now = 0) {
      if (disposed || !renderer) return;
      if (!visible || document.hidden) {
        stop();
        return;
      }
      const delta = savedFrame
        ? Math.min((now - savedFrame) / 1000, 0.05)
        : 0.016;
      if (!reduced.matches && !inputs.current.paused) clock += delta * 0.65;
      smooth +=
        ((progressRef?.current ?? inputs.current.progress) - smooth) *
        (reduced.matches || inputs.current.paused ? 1 : 0.065);
      const unfolding = Math.min(1, Math.max(0, (smooth - 0.14) / 0.46));
      const resolved = Math.min(1, Math.max(0, (smooth - 0.56) / 0.4));
      assembly.rotation.y = 0.28 + unfolding * 0.82 + pointer.x * 0.15;
      assembly.rotation.x = -0.09 + pointer.y * 0.1;
      assembly.rotation.z = -0.1 + Math.sin(clock * 0.3) * 0.025;
      ringMeshes.forEach((mesh, i) => {
        mesh.position.z =
          (i - 1) * (0.32 + unfolding * 1.12) +
          (i === inputs.current.channel ? 0.18 : 0);
        const emphasis = i === inputs.current.channel ? 1.035 : 1;
        mesh.scale.setScalar(emphasis);
        mesh.rotation.z = (i - 1) * unfolding * 0.32;
        mesh.position.x = (i - 1) * resolved * 0.3;
        mesh.material.opacity = 1 - resolved * 0.35;
      });
      material.uniforms.uTime.value = clock;
      material.uniforms.uProgress.value = smooth;
      const selected = [0x2354ff, 0xe91b8d, 0x00bacc][inputs.current.channel];
      material.uniforms.uAccent.value.setHex(selected);
      points.rotation.y = clock * 0.025 * (1 - resolved);
      rails.forEach((line, i) => {
        line.material.opacity = 0.09 + unfolding * 0.28;
        line.rotation.z = Math.sin(clock * 0.15 + i) * 0.035;
      });
      motes.forEach((orb, i) => {
        const t = (clock * 0.12 + i * 0.24) % 1;
        orb.position.set(
          -3.8 + t * 7.6,
          (i - 1) * 0.74 + Math.sin(t * Math.PI * 2 + clock * 0.2) * 0.12,
          Math.sin(t * Math.PI) * 0.4,
        );
        orb.scale.setScalar(0.035 + Math.sin(t * Math.PI) * 0.025);
        orb.material.opacity = 0.4 + unfolding * 0.6;
      });
      camera.position.x += (resolved * 0.35 - camera.position.x) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      savedFrame = now;
      if (!reduced.matches && !inputs.current.paused)
        frame = requestAnimationFrame(draw);
      else running = false;
    }
    function wake() {
      if (!running && renderer && visible && !document.hidden) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    }
    invalidate.current = wake;
    const onVisibility = () => (document.hidden ? stop() : wake());
    const onReduced = () => {
      stop();
      wake();
    };
    const onMove = (e) => {
      if (reduced.matches || inputs.current.paused) return;
      const r = element.getBoundingClientRect();
      pointer = {
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      };
    };
    const onLeave = () => {
      pointer = { x: 0, y: 0 };
    };
    async function init() {
      try {
        const modules = await Promise.all([
          import("three"),
          import("three/examples/jsm/environments/RoomEnvironment.js"),
        ]);
        if (disposed) return;
        THREE = modules[0];
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(
          Math.min(devicePixelRatio, innerWidth < 700 ? 1.25 : 1.6),
        );
        renderer.setClearColor(0, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.92;
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
        camera.position.set(0, 0, 9.7);
        pmrem = new THREE.PMREMGenerator(renderer);
        environment = new modules[1].RoomEnvironment();
        const target = pmrem.fromScene(environment, 0.05);
        scene.environment = target.texture;
        cleanups.push(() => target.dispose());
        scene.add(new THREE.HemisphereLight(0xffffff, 0x243279, 2.1));
        [
          [0xffffff, 6, [-3, 5, 5]],
          [0x619cff, 4, [4, -1, 3]],
          [0xff70d1, 3, [-4, -2, -2]],
        ].forEach(([c, intensity, pos]) => {
          const light = new THREE.DirectionalLight(c, intensity);
          light.position.set(...pos);
          scene.add(light);
        });
        assembly = new THREE.Group();
        scene.add(assembly);
        const shape = new THREE.Shape();
        shape.moveTo(-1.2, -1.65);
        shape.lineTo(-1.2, 1.65);
        shape.lineTo(-0.2, 1.65);
        shape.bezierCurveTo(2.35, 1.65, 2.35, -1.65, -0.2, -1.65);
        shape.closePath();
        const hole = new THREE.Path();
        hole.moveTo(-0.66, -1.05);
        hole.lineTo(-0.13, -1.05);
        hole.bezierCurveTo(1.38, -1.05, 1.38, 1.05, -0.13, 1.05);
        hole.lineTo(-0.66, 1.05);
        hole.closePath();
        shape.holes.push(hole);
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 0.23,
          bevelEnabled: true,
          bevelSegments: 5,
          steps: 1,
          bevelSize: 0.11,
          bevelThickness: 0.11,
          curveSegments: 48,
        });
        geometry.center();
        [0x00bed9, 0xe62096, 0x1641df].forEach((color, i) => {
          const mat = new THREE.MeshPhysicalMaterial({
            color,
            metalness: 0.78,
            roughness: 0.18,
            clearcoat: 1,
            clearcoatRoughness: 0.14,
            transparent: true,
          });
          const mesh = new THREE.Mesh(geometry, mat);
          mesh.position.z = (i - 1) * 0.28;
          assembly.add(mesh);
          ringMeshes.push(mesh);
        });
        // Three real positions per particle: the branded D, a review network, and output lanes.
        const count = 720,
          positions = new Float32Array(count * 3),
          network = new Float32Array(count * 3),
          lanes = new Float32Array(count * 3),
          seeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2,
            r = 2.1 + (i % 5) * 0.085;
          positions.set(
            [Math.cos(a) * r * 0.98, Math.sin(a) * r, Math.sin(a * 3) * 0.32],
            i * 3,
          );
          const phi = Math.acos(1 - 2 * ((i + 0.5) / count)),
            theta = i * 2.39996323;
          network.set(
            [
              Math.sin(phi) * Math.cos(theta) * 2.45,
              Math.cos(phi) * 2.05,
              Math.sin(phi) * Math.sin(theta) * 1.6,
            ],
            i * 3,
          );
          const lane = i % 3,
            t = Math.floor(i / 3) / (count / 3);
          lanes.set(
            [
              (t - 0.5) * 7,
              (lane - 1) * 0.92 + Math.sin(t * Math.PI * 4 + lane) * 0.17,
              Math.cos(t * Math.PI * 2) * 0.38,
            ],
            i * 3,
          );
          seeds[i] = i / count;
        }
        const particles = new THREE.BufferGeometry();
        particles.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3),
        );
        particles.setAttribute(
          "aNetwork",
          new THREE.BufferAttribute(network, 3),
        );
        particles.setAttribute("aLanes", new THREE.BufferAttribute(lanes, 3));
        particles.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.NormalBlending,
          uniforms: {
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uAccent: { value: new THREE.Color(0x2354ff) },
          },
          vertexShader: `attribute vec3 aNetwork;attribute vec3 aLanes;attribute float aSeed;uniform float uTime;uniform float uProgress;varying float vSeed;void main(){vSeed=aSeed;float first=smoothstep(.08,.52,uProgress);float second=smoothstep(.53,.95,uProgress);vec3 p=mix(position,aNetwork,first);p=mix(p,aLanes,second);p.y+=sin(uTime+aSeed*35.)*.035;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=(2.2+sin(aSeed*80.+uTime)*.5)*(9./-mv.z);}`,
          fragmentShader: `uniform vec3 uAccent;varying float vSeed;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 c=mix(uAccent,vec3(.8,.93,1.),sin(vSeed*18.)*.35+.35);gl_FragColor=vec4(c,(1.-smoothstep(.1,.5,d))*.8);}`,
        });
        points = new THREE.Points(particles, material);
        scene.add(points);
        for (let i = 0; i < 3; i++) {
          const curve = new THREE.CatmullRomCurve3(
            Array.from({ length: 40 }, (_, n) => {
              const t = n / 39;
              return new THREE.Vector3(
                (t - 0.5) * 7.6,
                (i - 1) * 0.74 + Math.sin(t * Math.PI * 2) * 0.12,
                Math.sin(t * Math.PI) * 0.4,
              );
            }),
          );
          const tube = new THREE.TubeGeometry(curve, 80, 0.008, 5, false);
          const line = new THREE.Mesh(
            tube,
            new THREE.MeshBasicMaterial({
              color: [0x4475ff, 0xff4bad, 0x00d8e6][i],
              transparent: true,
              opacity: 0.1,
            }),
          );
          scene.add(line);
          rails.push(line);
          const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 12, 12),
            new THREE.MeshBasicMaterial({
              color: [0xa1baff, 0xffb1df, 0x8ef9ff][i],
              transparent: true,
            }),
          );
          scene.add(orb);
          motes.push(orb);
        }
        const resize = () => {
          const r = element.getBoundingClientRect();
          renderer.setSize(r.width, r.height);
          camera.aspect = r.width / r.height;
          camera.position.z = r.width / r.height < 0.9 ? 12.2 : 9.7;
          camera.updateProjectionMatrix();
          wake();
        };
        element.appendChild(renderer.domElement);
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(element);
        resize();
        viewObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            visible ? wake() : stop();
          },
          { rootMargin: "100px" },
        );
        viewObserver.observe(element);
        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        document.addEventListener("visibilitychange", onVisibility);
        reduced.addEventListener("change", onReduced);
        const lost = (e) => {
          e.preventDefault();
          stop();
          setReady(false);
        };
        renderer.domElement.addEventListener("webglcontextlost", lost);
        cleanups.push(() =>
          renderer?.domElement.removeEventListener("webglcontextlost", lost),
        );
        setReady(true);
        wake();
      } catch {
        if (!disposed) setReady(false);
      }
    }
    init();
    return () => {
      disposed = true;
      invalidate.current = () => {};
      stop();
      resizeObserver?.disconnect();
      viewObserver?.disconnect();
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onReduced);
      cleanups.forEach((f) => f());
      scene?.traverse((o) => {
        o.geometry?.dispose();
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material?.dispose();
      });
      pmrem?.dispose();
      environment?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);
  return (
    <div ref={host} className="dejoiy-scene" aria-hidden="true">
      <svg
        viewBox="0 0 600 600"
        className={`dejoiy-scene-fallback ${ready ? "ready" : ""}`}
      >
        <g fill="none" strokeWidth="42">
          <path
            d="M180 140H280C500 140 500 460 280 460H180Z"
            stroke="#2354ff"
          />
          <path
            d="M205 125H305C525 125 525 445 305 445H205Z"
            stroke="#e91b8d"
            opacity=".65"
          />
        </g>
      </svg>
    </div>
  );
}
