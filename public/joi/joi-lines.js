/* What Joi says on business.dejoiy.com, per page (first part of the URL). */
window.JOI_ASSETS = '/joi/';
window.JOI_LINES = {
  home: { hero: ["Hi, I'm Joi! This is DEJOIY Business: real teams running support and operations for you.", [['Our services', '/services'], ['Talk to us', '/contact']]] },
  services: { hero: ["Pick a service to see how we'd run it for you.", [['Get a quote', '/contact']]] },
  industries: { hero: ["Find your industry. Each one shows what we usually take care of.", [['Talk to us', '/contact']]] },
  about: { hero: ["Here's who we are and how we work. People first, always.", [['Meet our people', '/our-people']]] },
  'our-people': { hero: ["These are the humans behind the service.", [['Join them', '/careers']]] },
  resources: { hero: ["Guides and playbooks you can use today, free.", [['Insights', '/insights']]] },
  insights: { hero: ["Fresh thinking from our delivery teams.", [['Resources', '/resources']]] },
  'case-studies': { hero: ["These are illustrative delivery examples, so you can see our approach.", [['Talk to us', '/contact']]] },
  careers: { hero: ["Looking for a role? Pick one and tell us about yourself.", [['All roles', '/careers']]] },
  help: { hero: ["Need a document or want to track a request? Start here.", [['Track a request', '/help/track']]] },
  'employee-documents': { hero: ["Request your employment documents here. Only share what the form asks for."] },
  'employee-verification': { hero: ["Verifying an employee? Please attach your authorisation letter."] },
  staff: { hero: ["Staff area. Sign in to review requests."] },
  contact: { hero: ["Tell us what you need. A real person replies within one working day.", [['Our privacy', 'https://www.dejoiy.co.in/privacy']]] },
  '404': { hero: ["Oops, this page went missing. Let me take you home.", [['Go home', '/']]] }
};

/* Load Joi's 3D pieces one after another once the page is idle (order matters). */
(function () {
  var files = ['three.min.js', 'GLTFLoader.js', 'meshopt_decoder.js', 'joi-guide.js'];
  function next(i) {
    if (i >= files.length) return;
    if (i === 0 && window.THREE) return next(1); // the page may already ship THREE
    var s = document.createElement('script');
    s.src = window.JOI_ASSETS + files[i];
    s.onload = function () { next(i + 1); };
    s.onerror = function () { next(i + 1); };
    document.body.appendChild(s);
  }
  function start() {
    var seg = location.pathname.split('/')[1] || 'home';
    if (/not found|404/i.test(document.title)) seg = '404';
    document.body.setAttribute('data-page', seg);
    next(0);
  }
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 2500 }); else setTimeout(start, 1200);
})();
