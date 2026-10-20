import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

/*
  Mounts the shared DEJOIY cosmos (lib/cosmos/engine.js) once for the whole
  app. Pages steer the camera by marking sections with data-station.
  Without WebGL, with Save-Data or on a shader failure the static CSS sky stays.
*/
export default function CosmosCanvas() {
  const hostRef = useRef(null);
  const apiRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const host = hostRef.current;
    if (!host || navigator.connection?.saveData) return;
    let disposed = false;
    Promise.all([import("three"), import("../lib/cosmos/engine"), import("../lib/cosmos/shaders")])
      .then(([THREE, { createCosmos }, { SHADERS, hasWebGL }]) => {
        if (disposed || !hasWebGL()) return;
        try {
          apiRef.current = createCosmos(THREE, host, SHADERS);
        } catch {
          host.classList.remove("is-live");
        }
      })
      .catch(() => {});
    return () => {
      disposed = true;
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    apiRef.current?.refresh();
  }, [router.asPath]);

  return (
    <div className="cosmos" aria-hidden="true">
      <div className="cosmos-fallback" />
      <div ref={hostRef} className="cosmos-canvas" />
    </div>
  );
}
