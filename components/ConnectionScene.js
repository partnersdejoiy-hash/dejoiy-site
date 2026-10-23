import { useEffect, useRef, useState } from "react";

export default function ConnectionScene({ active = 0, paused = false }) {
  const host = useRef(null);
  const activeRef = useRef(active);
  const wake = useRef(() => {});
  const pausedRef = useRef(paused);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    activeRef.current = active;
    wake.current();
  }, [active]);
  useEffect(() => {
    pausedRef.current = paused;
    wake.current();
  }, [paused]);
  useEffect(() => {
    const element = host.current;
    let disposed = false,
      renderer,
      scene,
      camera,
      group,
      frame,
      observer;
    let visible = true,
      pointer = { x: 0, y: 0 },
      running = false,
      clock = 0,
      renderedStatic = false;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups = [];
    function stop() {
      cancelAnimationFrame(frame);
      running = false;
    }
    function draw() {
      if (disposed || !renderer) return;
      if (
        !document.hidden &&
        visible &&
        (!renderedStatic || (!pausedRef.current && !media.matches))
      ) {
        if (!pausedRef.current && !media.matches) clock += 0.004;
        group.rotation.y +=
          (pointer.x * 0.22 + Math.sin(clock) * 0.16 - group.rotation.y) *
          0.035;
        group.rotation.x +=
          (pointer.y * 0.13 - 0.12 - group.rotation.x) * 0.035;
        group.children.forEach((mesh, i) => {
          const scale = activeRef.current === i ? 1.07 : 1;
          mesh.scale.lerp({ x: scale, y: scale, z: scale }, 0.04);
          mesh.position.y = Math.sin(clock + i * 2) * 0.06;
        });
        renderer.render(scene, camera);
        renderedStatic = true;
      }
      if (!pausedRef.current && !media.matches)
        frame = requestAnimationFrame(draw);
      else running = false;
    }
    function resume() {
      if (!running && visible && !document.hidden && renderer) {
        running = true;
        draw();
      }
    }
    const invalidate = () => {
      renderedStatic = false;
      resume();
    };
    wake.current = invalidate;
    media.addEventListener("change", invalidate);
    cleanups.push(() => media.removeEventListener("change", invalidate));
    function visibility() {
      document.hidden ? stop() : resume();
    }
    const move = (event) => {
      const r = element.getBoundingClientRect();
      pointer = {
        x: (event.clientX - r.left) / r.width - 0.5,
        y: (event.clientY - r.top) / r.height - 0.5,
      };
    };
    const leave = () => {
      pointer = { x: 0, y: 0 };
    };
    async function init() {
      try {
        const THREE = await import("three");
        if (disposed) return;
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(33, 1, 0.1, 50);
        camera.position.set(0, 0, 7.2);
        scene.add(new THREE.HemisphereLight(0xffffff, 0x17443b, 3));
        const key = new THREE.DirectionalLight(0xffffff, 5);
        key.position.set(-3, 5, 5);
        scene.add(key);
        const fill = new THREE.DirectionalLight(0xffffff, 2);
        fill.position.set(4, -2, 2);
        scene.add(fill);
        group = new THREE.Group();
        scene.add(group);
        const colors = [0x144b40, 0xfe7455, 0xf2f3df];
        for (let i = 0; i < 3; i++) {
          const geometry = new THREE.TorusGeometry(1.12, 0.3, 32, 96);
          const material = new THREE.MeshStandardMaterial({
            color: colors[i],
            roughness: 0.24,
            metalness: 0.28,
          });
          const ring = new THREE.Mesh(geometry, material);
          ring.position.x = (i - 1) * 1.03;
          ring.rotation.set(0.55, (i - 1) * 0.95, 0.55 + (i - 1) * 0.18);
          group.add(ring);
        }
        group.rotation.z = -0.2;
        const resize = () => {
          const { width, height } = element.getBoundingClientRect();
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          invalidate();
        };
        resize();
        element.appendChild(renderer.domElement);
        const ro = new ResizeObserver(resize);
        ro.observe(element);
        cleanups.push(() => ro.disconnect());
        observer = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting;
            visible ? resume() : stop();
          },
          { rootMargin: "80px" },
        );
        observer.observe(element);
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);
        document.addEventListener("visibilitychange", visibility);
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
        resume();
      } catch {
        if (!disposed) setReady(false);
      }
    }
    init();
    return () => {
      disposed = true;
      wake.current = () => {};
      stop();
      observer?.disconnect();
      cleanups.forEach((fn) => fn());
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      scene?.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, []);
  return (
    <div ref={host} className="connection-canvas" aria-hidden="true">
      <svg
        className={`connection-fallback ${ready ? "is-ready" : ""}`}
        viewBox="0 0 700 500"
      >
        <g
          fill="none"
          strokeWidth="46"
          transform="translate(350 250) rotate(-20)"
        >
          <ellipse cx="-130" rx="110" ry="140" stroke="#144b40" />
          <ellipse rx="85" ry="140" stroke="#fe7455" />
          <ellipse cx="130" rx="110" ry="140" stroke="#f2f3df" />
        </g>
      </svg>
    </div>
  );
}
