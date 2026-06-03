const config = window.CREDFOLIO_CONFIG || {};
let db = null;

const seedEvidence = [
  {
    id: "sports-football-finalist",
    title: "Inter-school football finalist",
    category: "Sports",
    type: "Match video + coach note",
    status: "Verified",
    verifier: "Coach Mehra",
    date: "May 2026",
    tags: ["Teamwork", "Endurance", "Leadership"],
    accent: "#fef3c7",
    ink: "#7c4a03"
  },
  {
    id: "tech-python-attendance",
    title: "Python attendance automation",
    category: "Tech",
    type: "GitHub repository",
    status: "Verified",
    verifier: "Computer Science Dept.",
    date: "Apr 2026",
    tags: ["Python", "Problem Solving", "Automation"],
    accent: "#dbeafe",
    ink: "#1e40af"
  },
  {
    id: "arts-watercolor-showcase",
    title: "District watercolor showcase",
    category: "Arts",
    type: "Artwork gallery",
    status: "Pending",
    verifier: "Art Faculty",
    date: "May 2026",
    tags: ["Composition", "Color", "Creative Expression"],
    accent: "#fee2e2",
    ink: "#991b1b"
  },
  {
    id: "service-stem-mentoring",
    title: "Community STEM mentoring",
    category: "Service",
    type: "Mentor report",
    status: "In Review",
    verifier: "NGO Partner",
    date: "Jun 2026",
    tags: ["Communication", "Service", "Teaching"],
    accent: "#dcfce7",
    ink: "#166534"
  }
];

let evidence = [...seedEvidence];

const resourceCatalog = {
  diksha: {
    name: "DIKSHA",
    url: "https://diksha.gov.in/?lang=en",
    fit: "Curriculum-linked lessons, practice content, and learning resources for school students."
  },
  khelo: {
    name: "Khelo India",
    url: "https://www.kheloindia.gov.in/",
    fit: "Grassroots sports competitions, fitness, talent identification, and sports development pathways."
  },
  skillIndia: {
    name: "Skill India Digital Hub",
    url: "https://courses.skillindiadigital.gov.in/courses/",
    fit: "Free and low-cost vocational, digital, and employability courses."
  },
  atl: {
    name: "Atal Tinkering Labs",
    url: "https://aim.gov.in/atl.php",
    fit: "Hands-on STEM, design thinking, robotics, innovation, and mentoring ecosystem."
  },
  kala: {
    name: "NCERT Kala Utsav",
    url: "https://www.kalautsav.ncert.gov.in/",
    fit: "Arts-focused national platform for school students, especially Classes 9-12."
  },
  ncs: {
    name: "National Career Service",
    url: "https://www.ncs.gov.in/",
    fit: "Career guidance, counselling, job fairs, and training discovery from the Government of India."
  },
  code: {
    name: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/",
    fit: "Beginner-friendly coding practice with project evidence students can publish."
  },
  khan: {
    name: "Khan Academy",
    url: "https://www.khanacademy.org/",
    fit: "Maths and science foundations for students who need confidence before advanced skill work."
  }
};

const pathwayCatalog = {
  balanced: [
    {
      title: "Holistic Profile Starter",
      needFit: ["confidence", "portfolio", "career"],
      grades: ["6-8", "9-10", "11-12"],
      summary: "Start with one verified achievement each in academics, activity, and service so the child is seen as a complete learner.",
      evidence: "Upload one photo/video, one mentor note, and one reflection for each activity.",
      resources: ["diksha", "ncs", "skillIndia"],
      steps: ["Pick 3 strengths with the child", "Log 20 minutes of practice or learning for 5 days", "Ask a teacher or coach to verify one claim"]
    },
    {
      title: "Foundation Recovery Plan",
      needFit: ["foundation", "confidence"],
      grades: ["6-8", "9-10"],
      summary: "Use school-aligned resources first, then connect the child to a confidence-building activity they already enjoy.",
      evidence: "Weekly quiz score, corrected notebook photo, and a short voice reflection.",
      resources: ["diksha", "khan"],
      steps: ["Revise one weak chapter", "Do 15 practice questions", "Record what improved and what still feels hard"]
    },
    {
      title: "Career Curiosity Sprint",
      needFit: ["career", "portfolio"],
      grades: ["9-10", "11-12"],
      summary: "Help the child test possible futures through small real tasks before choosing a subject or vocational path.",
      evidence: "Career worksheet, project link, and mentor feedback.",
      resources: ["ncs", "skillIndia", "atl"],
      steps: ["Choose 2 career clusters", "Try one beginner task in each", "Compare interest, difficulty, and support needed"]
    }
  ],
  sports: [
    {
      title: "Khelo India Readiness",
      needFit: ["competition", "portfolio"],
      grades: ["6-8", "9-10", "11-12"],
      summary: "Create a verified sports record with fitness data, match evidence, coach remarks, and competition history.",
      evidence: "Match clip, fitness score, attendance log, and coach approval.",
      resources: ["khelo"],
      steps: ["Log drills after every practice", "Record one clean skill clip weekly", "Add coach feedback before competitions"]
    },
    {
      title: "Sports Confidence Builder",
      needFit: ["confidence", "foundation"],
      grades: ["6-8", "9-10"],
      summary: "For a child who likes movement but lacks confidence, focus on consistency, teamwork, and visible progress.",
      evidence: "Practice streak, teamwork note, and before-after skill video.",
      resources: ["khelo", "diksha"],
      steps: ["Practice one basic drill 3 times a week", "Track stamina or accuracy", "Celebrate effort before rank"]
    },
    {
      title: "Sports + Data Bridge",
      needFit: ["career", "competition"],
      grades: ["9-10", "11-12"],
      summary: "Connect athletic interest with analytics, nutrition, event management, or sports technology careers.",
      evidence: "Performance spreadsheet, observation notes, and project dashboard.",
      resources: ["skillIndia", "ncs", "khelo"],
      steps: ["Track 5 matches or sessions", "Make one chart", "Write one insight for improvement"]
    }
  ],
  tech: [
    {
      title: "ATL Innovation Path",
      needFit: ["confidence", "competition", "portfolio"],
      grades: ["6-8", "9-10", "11-12"],
      summary: "Turn curiosity into a working prototype using design thinking, tinkering, coding, or robotics.",
      evidence: "Problem statement, prototype photos, demo video, and mentor review.",
      resources: ["atl", "skillIndia", "code"],
      steps: ["Find one local problem", "Build the smallest working demo", "Document failures and fixes"]
    },
    {
      title: "Digital Skills Foundation",
      needFit: ["foundation", "career"],
      grades: ["9-10", "11-12"],
      summary: "Build practical digital confidence before jumping into advanced AI or cybersecurity.",
      evidence: "Course certificate, practice screenshots, and mini-project link.",
      resources: ["skillIndia", "code", "diksha"],
      steps: ["Finish one beginner module", "Make a tiny project", "Ask a teacher to verify the output"]
    },
    {
      title: "Cyber Safety Ambassador",
      needFit: ["portfolio", "career", "confidence"],
      grades: ["9-10", "11-12"],
      summary: "A child interested in cybersecurity can prove impact by teaching safe online habits to peers.",
      evidence: "Poster, awareness session photos, quiz results, and faculty note.",
      resources: ["skillIndia", "ncs"],
      steps: ["Learn password and phishing basics", "Create a school awareness poster", "Run a 10-question peer quiz"]
    }
  ],
  arts: [
    {
      title: "Kala Utsav Portfolio",
      needFit: ["competition", "portfolio", "confidence"],
      grades: ["9-10", "11-12"],
      summary: "Prepare performance or visual art evidence in a format that teachers and competitions can evaluate.",
      evidence: "Final artwork/performance, process photos, artist note, and teacher verification.",
      resources: ["kala"],
      steps: ["Choose one art form", "Document 3 practice stages", "Record a final version with clear audio or light"]
    },
    {
      title: "Creative Confidence Routine",
      needFit: ["confidence", "foundation"],
      grades: ["6-8", "9-10"],
      summary: "Make arts a low-pressure way for the child to express ideas while building discipline.",
      evidence: "Weekly sketch/performance log, reflection note, and parent or teacher feedback.",
      resources: ["diksha", "kala"],
      steps: ["Practice 25 minutes twice a week", "Keep drafts, not just final work", "Describe one choice made in the artwork"]
    },
    {
      title: "Design for Community",
      needFit: ["career", "portfolio"],
      grades: ["9-10", "11-12"],
      summary: "Use visual communication to solve a real school or community problem.",
      evidence: "Poster/design file, audience response, and mentor review.",
      resources: ["skillIndia", "ncs", "kala"],
      steps: ["Pick a real message", "Create two design options", "Collect feedback and improve one version"]
    }
  ]
};

let currentFocus = "balanced";

let logs = Array.from({ length: 90 }, (_, index) => {
  const wave = Math.sin(index / 4) + Math.cos(index / 9);
  const hours = Math.max(0, Math.round(wave + (index % 6 === 0 ? 3 : 1)));
  return {
    day: index,
    hours,
    category: ["Tech", "Sports", "Arts", "Service"][index % 4]
  };
});

function initSupabase() {
  const hasConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_PUBLISHABLE_KEY && window.supabase);
  if (!hasConfig) return null;
  return window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_PUBLISHABLE_KEY);
}

function setSyncStatus(message) {
  const status = qs("#syncStatus");
  if (status) status.textContent = message;
}

function loadLocalState() {
  const savedEvidence = localStorage.getItem("credfolio:evidence");
  const savedLogs = localStorage.getItem("credfolio:logs");
  if (savedEvidence) evidence = JSON.parse(savedEvidence);
  if (savedLogs) logs = JSON.parse(savedLogs);
}

function saveLocalState() {
  localStorage.setItem("credfolio:evidence", JSON.stringify(evidence));
  localStorage.setItem("credfolio:logs", JSON.stringify(logs));
}

async function loadCloudState() {
  if (!db) return;

  const [evidenceResult, logsResult] = await Promise.all([
    db.from("skill_evidence").select("*").eq("student_id", config.STUDENT_ID).order("created_at", { ascending: false }),
    db.from("dedication_logs").select("*").eq("student_id", config.STUDENT_ID).order("log_date", { ascending: true }).limit(90)
  ]);

  if (!evidenceResult.error && evidenceResult.data.length > 0) {
    evidence = evidenceResult.data.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      type: row.evidence_type,
      status: row.status,
      verifier: row.verifier_name || "Awaiting verifier",
      date: new Date(row.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      tags: row.tags || [],
      accent: row.accent,
      ink: row.ink,
      signature: row.signature,
      publicKeyJwk: row.public_key_jwk,
      signedPayload: row.signed_payload
    }));
  }

  if (!logsResult.error && logsResult.data.length > 0) {
    logs = logsResult.data.map((row, index) => ({
      day: index,
      hours: row.hours,
      category: row.category
    }));
  }
}

async function upsertEvidence(item) {
  saveLocalState();
  if (!db) return;

  await db.from("skill_evidence").upsert({
    id: item.id,
    student_id: config.STUDENT_ID,
    title: item.title,
    category: item.category,
    evidence_type: item.type,
    status: item.status,
    verifier_name: item.verifier,
    tags: item.tags,
    accent: item.accent,
    ink: item.ink,
    signature: item.signature || null,
    public_key_jwk: item.publicKeyJwk || null,
    signed_payload: item.signedPayload || null
  });
}

async function insertLog(log) {
  saveLocalState();
  if (!db) return;

  await db.from("dedication_logs").insert({
    student_id: config.STUDENT_ID,
    category: log.category,
    hours: log.hours,
    log_date: new Date().toISOString().slice(0, 10)
  });
}

async function insertCertificate(item) {
  if (!db || !item.signature || !item.publicKeyJwk || !item.signedPayload) return;

  await db.from("certificates").insert({
    evidence_id: item.id,
    student_id: config.STUDENT_ID,
    proof_hash: await digest(JSON.stringify(item.signedPayload)),
    signed_payload: item.signedPayload,
    signature: item.signature,
    public_key_jwk: item.publicKeyJwk
  });
}

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));

function setActiveTab(tabId) {
  qsa(".nav-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });
  qsa(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

function statusClass(status) {
  if (status === "Verified") return "verified";
  if (status === "Pending") return "pending";
  return "review";
}

function renderEvidence() {
  const cardMarkup = evidence.map((item) => `
    <article class="evidence-card">
      <div class="evidence-top">
        <div class="evidence-icon" style="background:${item.accent};color:${item.ink}">${item.category.slice(0, 2).toUpperCase()}</div>
        <span class="status ${statusClass(item.status)}">${item.status}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.type} · ${item.date}<br>Verifier: ${item.verifier}</p>
      <div class="tag-row">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
    </article>
  `).join("");

  qs("#portfolioGrid").innerHTML = cardMarkup;
  qs("#recentEvidence").innerHTML = cardMarkup;
}

function renderMetrics() {
  const verified = evidence.filter((item) => item.status === "Verified").length;
  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
  const strength = Math.round(((verified / evidence.length) * 55) + Math.min(totalHours / 160, 1) * 45);

  qs("#verifiedCount").textContent = `${verified}/${evidence.length}`;
  qs("#hoursCount").textContent = `${totalHours}h`;
  qs("#strengthScore").textContent = `${strength}%`;
}

function renderHeatmap(target, sourceLogs) {
  qs(target).innerHTML = sourceLogs.map((log) => {
    const level = Math.min(4, Math.ceil(log.hours / 2));
    return `<span class="heat-cell level-${level}" title="${log.hours} hours · ${log.category}"></span>`;
  }).join("");
}

function renderBalance() {
  const totals = logs.reduce((acc, log) => {
    acc[log.category] = (acc[log.category] || 0) + log.hours;
    return acc;
  }, {});
  const max = Math.max(...Object.values(totals));
  const colors = {
    Tech: "#2563eb",
    Sports: "#b7791f",
    Arts: "#c2410c",
    Service: "#15803d"
  };

  qs("#balanceList").innerHTML = Object.entries(totals).map(([category, hours]) => `
    <div class="balance-item">
      <div class="balance-meta">
        <strong>${category}</strong>
        <span>${hours}h</span>
      </div>
      <div class="progress"><span style="width:${(hours / max) * 100}%;background:${colors[category]}"></span></div>
    </div>
  `).join("");
}

function getChildProfile() {
  return {
    need: qs("#needSelect")?.value || "confidence",
    grade: qs("#gradeSelect")?.value || "9-10",
    time: qs("#timeSelect")?.value || "medium",
    access: qs("#accessSelect")?.value || "shared"
  };
}

function timeAdvice(time) {
  const map = {
    low: "Keep the plan light: 2 short sessions and one evidence upload per week.",
    medium: "Use a steady rhythm: 3 practice sessions, 1 reflection, and 1 verification request per week.",
    high: "The child can handle a deeper sprint: 4-5 sessions, one mentor review, and one public-ready artifact weekly."
  };
  return map[time];
}

function accessAdvice(access) {
  const map = {
    phone: "Phone-only access is enough for videos, reflections, DIKSHA resources, and mentor feedback. Avoid tool-heavy tasks first.",
    shared: "With a shared computer, schedule project work in blocks and keep phone-based practice logs between sessions.",
    lab: "Because lab or facility access is available, prioritize prototypes, sports drills, recordings, and teacher-verified demonstrations."
  };
  return map[access];
}

function needLabel(need) {
  return {
    confidence: "confidence",
    foundation: "academic foundation",
    competition: "competition readiness",
    career: "career clarity",
    portfolio: "verified portfolio building"
  }[need];
}

function rankPathways(pathways, profile) {
  return pathways
    .map((pathway) => {
      const needScore = pathway.needFit.includes(profile.need) ? 4 : 0;
      const gradeScore = pathway.grades.includes(profile.grade) ? 2 : 0;
      return { ...pathway, score: needScore + gradeScore };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function renderStudentResponse(profile) {
  qs("#studentResponse").innerHTML = `
    For a Class ${profile.grade} child whose current need is <strong>${needLabel(profile.need)}</strong>, CredFolio should recommend small proof-building steps, not just courses.
    ${timeAdvice(profile.time)} ${accessAdvice(profile.access)}
  `;
}

async function renderAiResponse(profile, selected) {
  if (!db || !config.ENABLE_AI_EDGE_FUNCTION) return;

  const { data, error } = await db.functions.invoke("recommend-skill", {
    body: {
      profile,
      evidence: evidence.map(({ title, category, status, tags }) => ({ title, category, status, tags })),
      dedication: logs.slice(-14),
      candidatePathways: selected.map(({ title, summary, evidence: proof }) => ({ title, summary, proof }))
    }
  });

  if (!error && data?.message) {
    qs("#studentResponse").innerHTML = data.message;
  }
}

function renderRecommendations(focus = currentFocus) {
  currentFocus = focus;
  const profile = getChildProfile();
  const pool = focus === "balanced"
    ? [...pathwayCatalog.balanced, ...pathwayCatalog.sports, ...pathwayCatalog.tech, ...pathwayCatalog.arts]
    : pathwayCatalog[focus];
  const selected = rankPathways(pool, profile);

  renderStudentResponse(profile);
  renderAiResponse(profile, selected);
  qs("#recommendations").innerHTML = selected.map((pathway) => `
    <article class="recommendation-card">
      <strong>${pathway.title}</strong>
      <p>${pathway.summary}</p>
      <div class="tag-row">
        <span class="tag">For: ${needLabel(profile.need)}</span>
        <span class="tag">Class ${profile.grade}</span>
      </div>
      <div class="plan-steps">
        ${pathway.steps.map((step, index) => `<span>${index + 1}. ${step}</span>`).join("")}
      </div>
      <p><strong>Evidence to collect:</strong> ${pathway.evidence}</p>
      <div class="resource-list">
        ${pathway.resources.map((key) => {
          const resource = resourceCatalog[key];
          return `<a href="${resource.url}" target="_blank" rel="noreferrer">${resource.name}</a><span>${resource.fit}</span>`;
        }).join("")}
      </div>
    </article>
  `).join("");
}

async function digest(text) {
  if (!window.crypto?.subtle) {
    let hashA = 0x811c9dc5;
    let hashB = 0x45d9f3b;
    for (let index = 0; index < text.length; index += 1) {
      hashA = Math.imul(hashA ^ text.charCodeAt(index), 16777619);
      hashB = Math.imul(hashB + text.charCodeAt(index), 2654435761);
    }
    const seed = `${(hashA >>> 0).toString(16)}${(hashB >>> 0).toString(16)}`.padEnd(64, "0");
    return seed.slice(0, 64);
  }
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer;
}

async function getSchoolKeyPair() {
  const savedPrivate = localStorage.getItem("credfolio:schoolPrivateJwk");
  const savedPublic = localStorage.getItem("credfolio:schoolPublicJwk");

  if (savedPrivate && savedPublic) {
    const [privateKey, publicKey] = await Promise.all([
      crypto.subtle.importKey(
        "jwk",
        JSON.parse(savedPrivate),
        { name: "RSA-PSS", hash: "SHA-256" },
        true,
        ["sign"]
      ),
      crypto.subtle.importKey(
        "jwk",
        JSON.parse(savedPublic),
        { name: "RSA-PSS", hash: "SHA-256" },
        true,
        ["verify"]
      )
    ]);
    return { privateKey, publicKey, publicJwk: JSON.parse(savedPublic) };
  }

  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-PSS",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["sign", "verify"]
  );
  const [privateJwk, publicJwk] = await Promise.all([
    crypto.subtle.exportKey("jwk", keyPair.privateKey),
    crypto.subtle.exportKey("jwk", keyPair.publicKey)
  ]);

  localStorage.setItem("credfolio:schoolPrivateJwk", JSON.stringify(privateJwk));
  localStorage.setItem("credfolio:schoolPublicJwk", JSON.stringify(publicJwk));
  return { privateKey: keyPair.privateKey, publicKey: keyPair.publicKey, publicJwk };
}

function certificatePayload(item) {
  return {
    studentId: config.STUDENT_ID,
    studentName: "Aarav Sharma",
    claimId: item.id,
    title: item.title,
    category: item.category,
    verifier: item.verifier,
    issuedBy: "Delhi Public School",
    verifiedAt: item.verifiedAt || new Date().toISOString()
  };
}

async function signCertificate(item) {
  if (!crypto.subtle) return item;
  const keyPair = await getSchoolKeyPair();
  const payload = certificatePayload(item);
  const canonicalPayload = JSON.stringify(payload);
  const signature = await crypto.subtle.sign(
    { name: "RSA-PSS", saltLength: 32 },
    keyPair.privateKey,
    new TextEncoder().encode(canonicalPayload)
  );

  item.signedPayload = payload;
  item.signature = arrayBufferToBase64(signature);
  item.publicKeyJwk = keyPair.publicJwk;
  return item;
}

async function verifyCertificateSignature(item) {
  if (!item.signature || !item.publicKeyJwk || !item.signedPayload || !crypto.subtle) return false;
  const publicKey = await crypto.subtle.importKey(
    "jwk",
    item.publicKeyJwk,
    { name: "RSA-PSS", hash: "SHA-256" },
    true,
    ["verify"]
  );
  return crypto.subtle.verify(
    { name: "RSA-PSS", saltLength: 32 },
    publicKey,
    base64ToArrayBuffer(item.signature),
    new TextEncoder().encode(JSON.stringify(item.signedPayload))
  );
}

function drawProofPattern(hash) {
  const canvas = qs("#qrCanvas");
  const context = canvas.getContext("2d");
  const size = 132;
  const cells = 11;
  const cell = size / cells;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);
  context.fillStyle = "#101820";

  for (let index = 0; index < cells * cells; index += 1) {
    const hex = parseInt(hash[index % hash.length], 16);
    const x = index % cells;
    const y = Math.floor(index / cells);
    if ((hex + x + y) % 3 !== 0) {
      context.fillRect(x * cell + 2, y * cell + 2, cell - 4, cell - 4);
    }
  }

  [[0, 0], [8, 0], [0, 8]].forEach(([x, y]) => {
    context.fillStyle = "#101820";
    context.fillRect(x * cell, y * cell, cell * 3, cell * 3);
    context.fillStyle = "#ffffff";
    context.fillRect(x * cell + 6, y * cell + 6, cell * 3 - 12, cell * 3 - 12);
    context.fillStyle = "#101820";
    context.fillRect(x * cell + 12, y * cell + 12, cell * 3 - 24, cell * 3 - 24);
  });
}

async function renderCertificate() {
  const item = evidence.find((entry) => entry.status === "Verified") || evidence[0];
  const payload = JSON.stringify(item.signedPayload || certificatePayload(item));
  const hash = await digest(payload);
  qs("#certTitle").textContent = item.title;
  qs("#certMeta").textContent = `Issued to Aarav Sharma · Verified by ${item.verifier} · ${item.date}`;
  qs("#hashOutput").textContent = hash;
  qs("#signatureOutput").textContent = item.signature || "Waiting for school approval signature...";
  if (item.signature) {
    const valid = await verifyCertificateSignature(item);
    qs("#signatureStatus").textContent = valid
      ? "Signature verified with the school's public key. Any certificate edit will break verification."
      : "Signature could not be verified. The certificate may have changed after signing.";
  } else {
    qs("#signatureStatus").textContent = "The school signature is created only when an institution approves a claim.";
  }
  drawProofPattern(hash);
}

function addSampleEvidence() {
  const samples = [
    {
      id: `tech-robotics-${Date.now()}`,
      title: "Robotics line follower build",
      category: "Tech",
      type: "Demo video + wiring notes",
      status: "Pending",
      verifier: "Robotics Mentor",
      date: "Jun 2026",
      tags: ["Electronics", "Debugging", "Design Thinking"],
      accent: "#dbeafe",
      ink: "#1e40af"
    },
    {
      id: `arts-tabla-${Date.now()}`,
      title: "Tabla solo performance",
      category: "Arts",
      type: "Stage recording",
      status: "In Review",
      verifier: "Music Faculty",
      date: "Jun 2026",
      tags: ["Rhythm", "Discipline", "Performance"],
      accent: "#fee2e2",
      ink: "#991b1b"
    }
  ];
  evidence.unshift(samples[evidence.length % samples.length]);
  upsertEvidence(evidence[0]);
  refresh();
}

async function verifyNextClaim() {
  const next = evidence.find((item) => item.status !== "Verified");
  if (next) {
    next.status = "Verified";
    next.verifier = "Delhi Public School";
    next.verifiedAt = new Date().toISOString();
    await signCertificate(next);
    await upsertEvidence(next);
    await insertCertificate(next);
  }
  refresh();
  setActiveTab("verification");
}

function logHours(event) {
  event.preventDefault();
  const category = qs("#logCategory").value;
  const hours = Number(qs("#logHours").value);
  const log = { day: logs.length, hours, category };
  logs.push(log);
  logs = logs.slice(-90);
  insertLog(log);
  refresh();
}

function refresh() {
  renderEvidence();
  renderMetrics();
  renderHeatmap("#miniHeatmap", logs.slice(-28));
  renderHeatmap("#heatmap", logs);
  renderBalance();
  renderCertificate();
}

qsa(".nav-tab").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

qsa("[data-open-tab]").forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.openTab));
});

qsa(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    qsa(".segment").forEach((segment) => segment.classList.remove("active"));
    button.classList.add("active");
    renderRecommendations(button.dataset.focus);
  });
});

qsa("#needsForm select").forEach((field) => {
  field.addEventListener("change", () => renderRecommendations());
});

qs("#addEvidenceBtn").addEventListener("click", addSampleEvidence);
qs("#verifyNextBtn").addEventListener("click", verifyNextClaim);
qs("#logForm").addEventListener("submit", logHours);

async function initialize() {
  loadLocalState();
  db = initSupabase();

  if (db) {
    try {
      await loadCloudState();
      setSyncStatus("Supabase cloud sync enabled");
    } catch (error) {
      setSyncStatus("Cloud sync failed; using local mode");
    }
  } else {
    setSyncStatus("Local demo mode");
  }

  renderRecommendations();
  refresh();
}

initialize();
