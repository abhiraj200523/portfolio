/* =====================================================================
   1. EDIT THIS OBJECT TO PERSONALISE THE WHOLE SITE
   Everything below is SAMPLE content. Leave a value empty ("" or [])
   and the related link, card or section is hidden automatically.
   ===================================================================== */
const CONFIG = {
  name: "Abhiraj T O",
  initials: "AJTO",
  title: "Full Stack Developer",
  headline: "I build fast, reliable web products.",
  roles: ["MERN stack developer", "Frontend engineer", "API designer"],
  heroText: "Sample text: describe what you do and the value you bring in one or two sentences.",
  availability: "Open to opportunities",
  profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlSnG-JzN76LZukcB1-4aszXs98kl1BPQEt72T3LSufA&s=10", // e.g. "assets/images/me.jpg"
  resume: "", // e.g. "assets/resume.pdf"
  about: [
    "Sample paragraph: introduce yourself and your background.",
    "Sample paragraph: describe your specialisations, how you approach problems and your goals."
  ],
  stats: [], // e.g. [{ value: "3+", label: "Years of experience" }] only if verifiable
  skills: {
    "Frontend": ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    "Backend": ["Node.js", "Express", "REST APIs"],
    "Databases": ["MongoDB", "PostgreSQL"],
    "Tools": ["Git", "GitHub", "VS Code", "Figma"]
  },
  projects: [
    { title: "Sample Project One", category: "Web Development", description: "Sample description of the problem solved and the outcome.", features: ["Key feature one", "Key feature two"], tech: ["React", "Node.js", "MongoDB"], image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Project Two", category: "Web Development", description: "Sample description of the problem solved and the outcome.", features: ["Key feature one"], tech: ["JavaScript", "Tailwind CSS"], image: "", demo: "", code: "", caseStudy: "" },
    { title: "Sample Analysis", category: "Data Analytics", description: "Sample description of the dataset, method and findings.", features: ["Key finding one"], tech: ["Python", "Pandas"], image: "", demo: "", code: "", caseStudy: "" }
  ],
  experience: [
    { role: "Sample Role", org: "Sample Company", start: "2024", end: "Present", type: "Work", points: ["Sample responsibility or achievement."], tech: ["JavaScript"] },
    { role: "Sample Degree", org: "Sample University", start: "2020", end: "2024", type: "Education", points: ["Sample coursework or achievement."], tech: [] }
  ],
  achievements: [], // e.g. [{ title: "Certificate name", issuer: "Issuer", year: "2025", link: "" }]
  contact: {
    email: "yehh2005@gmail.com", // yehh2005@gmail.com
    phone: "245678901", // +911234567890
    whatsapp: "", // digits with country code, e.g. 911234567890
    whatsappMessage: "Hi, I found your portfolio and would like to connect.",
    linkedin: "", // full profile URL
    github: "",
    instagram: "",
    location: ""
  }
};

/* ===================================================================== */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const NAV = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["experience", "Experience"], ["contact", "Contact"]];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ext = 'target="_blank" rel="noopener noreferrer"';

  /* ---------- Contact methods ---------- */
  function contactMethods() {
    const c = CONFIG.contact, m = [];
    if (c.email) m.push({ icon: "mail", label: "Email", text: c.email, href: `mailto:${c.email}` });
    if (c.phone) m.push({ icon: "phone", label: "Phone", text: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}` });
    if (c.whatsapp) {
      const msg = c.whatsappMessage ? `?text=${encodeURIComponent(c.whatsappMessage)}` : "";
      m.push({ icon: "message-circle", label: "WhatsApp", text: "Chat on WhatsApp", href: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}${msg}`, external: true });
    }
    if (c.linkedin) m.push({ icon: "linkedin", label: "LinkedIn", text: "View profile", href: c.linkedin, external: true });
    if (c.github) m.push({ icon: "github", label: "GitHub", text: "Browse repositories", href: c.github, external: true });
    if (c.instagram) m.push({ icon: "instagram", label: "Instagram", text: "Follow along", href: c.instagram, external: true });
    return m;
  }

  /* ---------- Renderers ---------- */
  function renderBasics() {
    $$("[data-bind]").forEach((el) => { el.textContent = CONFIG[el.dataset.bind] ?? ""; });
    document.title = `${CONFIG.name} | ${CONFIG.title} Portfolio`;
    if (!CONFIG.availability) $("#availability").hidden = true;
    if (CONFIG.profileImage) $("#avatar").innerHTML = `<img src="${esc(CONFIG.profileImage)}" alt="Portrait of ${esc(CONFIG.name)}" width="400" height="400">`;
    if (CONFIG.resume) { const b = $("#resume-btn"); b.href = CONFIG.resume; b.classList.remove("hidden"); b.classList.add("inline-flex"); }
    $("#about-text").innerHTML = CONFIG.about.map((p) => `<p>${esc(p)}</p>`).join("");
    const stats = $("#stats");
    stats.innerHTML = CONFIG.stats.map((s) => `<li class="card"><p class="font-heading text-3xl font-bold">${esc(s.value)}</p><p class="text-sm muted">${esc(s.label)}</p></li>`).join("");
    if (!CONFIG.stats.length) stats.remove();
    const links = NAV.map(([id, label]) => `<li><a class="nav-link" href="#${id}" data-nav="${id}">${label}</a></li>`).join("");
    $("#nav-desktop").innerHTML = links;
    $("#nav-mobile").innerHTML = links + `<li><a class="btn btn-primary mt-2 w-full" href="#contact">Let's Connect</a></li>`;
    $("#nav-footer").innerHTML = NAV.map(([id, l]) => `<li><a class="muted hover:underline" href="#${id}">${l}</a></li>`).join("");
    const social = contactMethods().filter((m) => m.external && m.label !== "WhatsApp")
      .map((m) => `<li><a class="icon-btn" href="${esc(m.href)}" ${ext} aria-label="${m.label} (opens in a new tab)"><i data-lucide="${m.icon}"></i></a></li>`).join("");
    $("#hero-social").innerHTML = social;
    $("#footer-social").innerHTML = social;
    $("#year").textContent = new Date().getFullYear();
  }

  function renderSkills() {
    $("#skills-grid").innerHTML = Object.entries(CONFIG.skills).filter(([, v]) => v.length).map(([cat, items]) =>
      `<article class="card reveal"><h3 class="text-lg font-semibold">${esc(cat)}</h3><ul class="mt-4 flex flex-wrap gap-2">${items.map((i) => `<li class="chip">${esc(i)}</li>`).join("")}</ul></article>`).join("");
  }

  function renderProjects() {
    const list = CONFIG.projects;
    $("#projects-grid").innerHTML = list.map((p) => {
      const thumb = p.image ? `<div class="thumb"><img src="${esc(p.image)}" alt="Screenshot of ${esc(p.title)}" loading="lazy" width="640" height="360"></div>` : `<div class="thumb" aria-hidden="true">${esc(p.title.charAt(0))}</div>`;
      const link = (href, icon, text) => href ? `<a class="text-link" href="${esc(href)}" ${ext}><i data-lucide="${icon}" class="h-4 w-4"></i>${text}</a>` : "";
      return `<article class="card project reveal flex flex-col" data-category="${esc(p.category)}">${thumb}
        <h3 class="text-xl font-semibold">${esc(p.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed muted">${esc(p.description)}</p>
        ${p.features?.length ? `<ul class="mt-3 list-disc space-y-1 pl-5 text-sm muted">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>` : ""}
        <ul class="mt-4 flex flex-wrap gap-2">${p.tech.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>
        <div class="mt-auto flex flex-wrap gap-4 pt-5">${link(p.demo, "external-link", "Live demo")}${link(p.code, "code-2", "Source code")}${link(p.caseStudy, "file-text", "Case study")}</div></article>`;
    }).join("");
    const cats = [...new Set(list.map((p) => p.category))];
    const box = $("#filters");
    if (list.length < 3 || cats.length < 2) { box.remove(); return; }
    box.innerHTML = ["All", ...cats].map((c, i) => `<button type="button" class="filter-btn" data-filter="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("");
    box.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn"); if (!btn) return;
      $$(".filter-btn", box).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      $$(".project").forEach((card) => { card.hidden = btn.dataset.filter !== "All" && card.dataset.category !== btn.dataset.filter; });
    });
  }

  function renderExperience() {
    $("#timeline").innerHTML = CONFIG.experience.map((e) =>
      `<li class="card reveal"><p class="text-sm accent">${esc(e.type)} &middot; ${esc(e.start)} to ${esc(e.end)}</p>
       <h3 class="mt-1 text-xl font-semibold">${esc(e.role)}</h3><p class="muted">${esc(e.org)}</p>
       <ul class="mt-3 list-disc space-y-1 pl-5 text-sm muted">${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
       ${e.tech?.length ? `<ul class="mt-4 flex flex-wrap gap-2">${e.tech.map((t) => `<li class="chip">${esc(t)}</li>`).join("")}</ul>` : ""}</li>`).join("");
  }

  function renderAchievements() {
    if (!CONFIG.achievements.length) return;
    $("#achievements").classList.remove("hidden");
    $("#achievements-grid").innerHTML = CONFIG.achievements.map((a) => {
      const inner = `<div class="card-icon"><i data-lucide="award"></i></div><div><h3 class="font-semibold">${esc(a.title)}</h3><p class="text-sm muted">${esc(a.issuer || "")} ${esc(a.year || "")}</p></div>`;
      return a.link ? `<a class="card card-link reveal" href="${esc(a.link)}" ${ext}>${inner}</a>` : `<div class="card card-link reveal">${inner}</div>`;
    }).join("");
  }

  function renderContact() {
    const cards = contactMethods().map((m) =>
      `<li><a class="card card-link h-full" href="${esc(m.href)}" ${m.external ? ext : ""} ${m.external ? `aria-label="${m.label}, opens in a new tab"` : ""}>
        <div class="card-icon"><i data-lucide="${m.icon}"></i></div>
        <div class="min-w-0"><h3 class="font-semibold">${m.label}</h3><p class="break-words text-sm muted">${esc(m.text)}</p></div></a></li>`);
    if (CONFIG.contact.location) cards.push(`<li><div class="card card-link h-full"><div class="card-icon"><i data-lucide="map-pin"></i></div><div><h3 class="font-semibold">Location</h3><p class="text-sm muted">${esc(CONFIG.contact.location)}</p></div></div></li>`);
    $("#contact-grid").innerHTML = cards.length ? cards.join("") : `<li class="muted">Add your contact details in the CONFIG object in js/script.js.</li>`;
  }

  /* ---------- Behaviour ---------- */
  function setupTheme() {
    const btn = $("#theme-toggle"), root = document.documentElement;
    const sync = () => {
      const light = root.dataset.theme === "light";
      btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      $('meta[name="theme-color"]').content = light ? "#f7f8fa" : "#0f1115";
    };
    btn.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) { /* storage unavailable */ }
      sync();
    });
    sync();
  }

  function setupMenu() {
    const btn = $("#menu-toggle"), menu = $("#mobile-menu");
    const set = (open) => {
      menu.classList.toggle("hidden", !open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    btn.addEventListener("click", () => set(btn.getAttribute("aria-expanded") !== "true"));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    document.addEventListener("click", (e) => { if (!menu.contains(e.target) && !btn.contains(e.target)) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); } });
    window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => { if (e.matches) set(false); });
  }

  function setupObservers() {
    const links = $$("[data-nav]");
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((l) => {
          const on = l.dataset.nav === en.target.id;
          l.classList.toggle("active", on);
          on ? l.setAttribute("aria-current", "true") : l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const s = document.getElementById(id); if (s) spy.observe(s); });

    const items = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
    const io = new IntersectionObserver((entries, obs) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } }), { threshold: 0.12 });
    items.forEach((i) => io.observe(i));
  }

  function setupTyping() {
    const el = $("#typed"), roles = CONFIG.roles;
    if (!el || !roles.length) return;
    if (reduceMotion || roles.length === 1) { el.textContent = roles[0]; return; }
    let r = 0, c = 0, del = false;
    (function tick() {
      const word = roles[r];
      c += del ? -1 : 1;
      el.textContent = word.slice(0, c);
      let wait = del ? 40 : 80;
      if (!del && c === word.length) { del = true; wait = 1600; }
      else if (del && c === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  }

  function setupTop() {
    $("#to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  }

  function init() {
    renderBasics(); renderSkills(); renderProjects(); renderExperience(); renderAchievements(); renderContact();
    setupTheme(); setupMenu(); setupTop(); setupTyping(); setupObservers();
    if (window.lucide) lucide.createIcons();
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();

