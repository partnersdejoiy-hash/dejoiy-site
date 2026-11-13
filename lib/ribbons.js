/* Light-ribbon shader for the home hero (same as dejoiy.co.in). Plain DOM code. */

var RIBBON_FRAG = [
  'precision highp float;',
  'uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;',
  // returns how strongly this ribbon covers the pixel; colours are mixed (not added) so pink stays pink
  'float ribbon(vec2 uv, float seed, float amp, float freq, float speed, float off, out float glow) {',
  '  float t = uTime * speed + seed * 6.2831;',
  '  float y = off + sin(uv.x * freq + t) * amp + sin(uv.x * freq * 0.47 - t * 0.7 + seed * 3.0) * amp * 0.6;',
  '  y += (uMouse.y - 0.5) * 0.08 * sin(uv.x * 2.0 + seed);',
  '  float w = 0.045 + 0.04 * sin(uv.x * freq * 0.8 + t * 1.3 + seed * 5.0);',
  '  float d = abs(uv.y - y);',
  '  glow = 0.01 / (d + 0.01);',
  '  float core = smoothstep(w, 0.0, d);',
  '  float edge = smoothstep(w * 0.25, 0.0, abs(d - w * 0.75)) * 0.6;',
  '  return clamp(core * 0.8 + edge, 0.0, 1.0);',
  '}',
  'vec3 lay(vec3 c, vec3 col, float a, float g) { return mix(c, col, a) + col * g * 0.12; }',
  'void main() {',
  '  vec2 uv = gl_FragCoord.xy / uRes;',
  '  uv.x *= uRes.x / uRes.y;',
  // deep blue night, brighter towards the top right
  '  vec2 q = gl_FragCoord.xy / uRes;',
  '  vec3 c = mix(vec3(0.02, 0.06, 0.28), vec3(0.11, 0.28, 0.9), smoothstep(0.0, 1.3, q.x * 0.6 + q.y * 0.8));',
  '  float g;',
  '  float a1 = ribbon(uv, 0.85, 0.12, 1.9, 0.31, 0.22, g); c = lay(c, vec3(1.0, 0.48, 0.18), a1 * 0.9, g);',   // orange
  '  float a2 = ribbon(uv, 0.37, 0.20, 1.6, 0.28, 0.55, g); c = lay(c, vec3(1.0, 0.31, 0.64), a2, g);',        // hot pink
  '  float a3 = ribbon(uv, 0.10, 0.16, 2.1, 0.35, 0.34, g); c = lay(c, vec3(0.83, 1.0, 0.23), a3, g);',        // lime
  '  float a4 = ribbon(uv, 0.62, 0.14, 2.6, 0.42, 0.72, g); c = lay(c, vec3(0.24, 0.80, 1.0), a4, g);',        // sky
  '  float a5 = ribbon(uv, 0.21, 0.10, 3.1, 0.50, 0.86, g); c = lay(c, vec3(1.0), a5 * 0.5, g * 0.5);',        // white silk
  '  c = min(c, vec3(1.0));',
  '  c *= 1.0 - 0.35 * smoothstep(0.4, 1.0, 1.0 - q.y);', // darker base for text contrast
  '  gl_FragColor = vec4(c, 1.0);',
  '}'
].join('\n');

function initRibbons(hero) {
  if (!hero || hero.querySelector(':scope > canvas')) return;
  var canvas = hero.querySelector('canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    hero.insertBefore(canvas, hero.firstChild);
  }
  var gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return; // CSS gradient fallback stays
  function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
  var prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, RIBBON_FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uRes = gl.getUniformLocation(prog, 'uRes'), uTime = gl.getUniformLocation(prog, 'uTime'), uMouse = gl.getUniformLocation(prog, 'uMouse');
  hero.classList.add('has-webgl');

  var scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75; // soft ribbons don't need full resolution
  function resize() {
    canvas.width = Math.round(hero.clientWidth * scale);
    canvas.height = Math.round(hero.clientHeight * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize);
  var mouse = [0.5, 0.5], target = [0.5, 0.5];
  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    target = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var visible = true, running = false, t0 = performance.now();
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) start(); }).observe(hero);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) start(); });
  function draw(now) {
    mouse[0] += (target[0] - mouse[0]) * 0.05; mouse[1] += (target[1] - mouse[1]) * 0.05;
    gl.uniform1f(uTime, reduce ? 4.0 : (now - t0) / 1000);
    gl.uniform2f(uMouse, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function frame(now) {
    if (!visible || document.hidden) { running = false; return; }
    draw(now);
    requestAnimationFrame(frame);
  }
  function start() {
    if (reduce) { draw(performance.now()); return; }   // one still frame
    if (!running) { running = true; requestAnimationFrame(frame); }
  }
  start();
}

export { initRibbons };
