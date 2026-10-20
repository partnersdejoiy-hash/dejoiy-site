/* GLSL for the DEJOIY cosmos. */
export const NEBULA_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const NEBULA_FRAG = /* glsl */ `
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
  vec3 base = vec3(0.027, 0.020, 0.058);
  vec3 magenta = vec3(0.72, 0.12, 0.44);
  vec3 violet = vec3(0.30, 0.16, 0.62);
  vec3 blue = vec3(0.10, 0.24, 0.74);
  float band = smoothstep(-0.9, 0.9, uv.x + uv.y * 0.4 + sin(uScroll * 3.14) * 0.4);
  vec3 tint = mix(magenta, violet, band);
  tint = mix(tint, blue, smoothstep(0.45, 1.0, q + band * 0.35));
  float vignette = smoothstep(1.25, 0.15, length(uv * vec2(0.8, 1.1)));
  vec3 col = base + tint * cloud * 0.28 * vignette;
  col += tint * pow(q, 3.0) * 0.12 * vignette;
  gl_FragColor = vec4(col, 1.0);
}`;

export const STAR_VERT = /* glsl */ `
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

export const STAR_FRAG = /* glsl */ `
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

export const DISC_VERT = /* glsl */ `
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

export const DISC_FRAG = /* glsl */ `
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

export const CORE_VERT = /* glsl */ `
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

export const CORE_FRAG = /* glsl */ `
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

export const GLOW_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export const GLOW_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec3 uColor;
uniform float uStrength;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float a = pow(max(1.0 - d, 0.0), 2.6) * uStrength;
  gl_FragColor = vec4(uColor, a);
}`;


export const SHADERS = {
  NEBULA_VERT, NEBULA_FRAG, STAR_VERT, STAR_FRAG, DISC_VERT, DISC_FRAG,
  CORE_VERT, CORE_FRAG, GLOW_VERT, GLOW_FRAG,
};

export function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (!gl) return false;
    const lose = gl.getExtension("WEBGL_lose_context");
    if (lose) lose.loseContext();
    return true;
  } catch (e) {
    return false;
  }
}
