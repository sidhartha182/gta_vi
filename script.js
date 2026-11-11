'use strict';
const money = new Intl.NumberFormat('en-IN');
const input = document.querySelector('#custom-amount');
const amountButtons = document.querySelectorAll('.amount-picker [data-amount]');
function selectAmount(value) {
  input.value = value;
  amountButtons.forEach(button => {
    const selected = button.dataset.amount === String(value);
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
document.querySelectorAll('[data-amount]').forEach(button => button.addEventListener('click', () => {
  selectAmount(button.dataset.amount);
  if (button.classList.contains('tier')) {
    document.querySelector('#donate').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    toast(`₹${money.format(Number(button.dataset.amount))} of legendary friendship. Choose this amount in your UPI app.`);
  }
}));
input.addEventListener('input', () => {
  amountButtons.forEach(button => {
    const selected = Number(button.dataset.amount) === Number(input.value);
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
});
selectAmount(250);
const launch = new Date('2026-11-19T00:00:00+05:30').getTime();
function tick() {
  const remaining = Math.max(0, launch - Date.now());
  const values = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, i) => { const element = document.getElementById(id), next = String(values[i]).padStart(2, '0'); if (element.textContent !== next) element.textContent = next; });
  if (!remaining) document.querySelector('.countdown-inner h2').textContent = 'The wait is over. The begging continues.';
}
tick(); setInterval(tick, 1000);
const roasts = [
  'Bro bought a PS5 and forgot the “games sold separately” part.',
  'Your financial advisor is a loading screen tip.',
  'GTA has a wanted level. You have a “funds wanted” level.',
  'The only heist you planned is on the group chat.',
  'You have 4K resolution and ₹0 solutions.',
  'Even the NPCs have a more stable income.',
  'Rockstar took years to make GTA VI. You took 3 minutes to ask for money.'
];
let roastIndex = 0;
document.querySelector('#roast-button').addEventListener('click', () => {
  const box = document.querySelector('#roast'); box.hidden = false; box.textContent = '“' + roasts[roastIndex++ % roasts.length] + '”';
});
let toastTimer;
function toast(message) {
  const element = document.querySelector('#toast'); element.textContent = message; element.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => element.hidden = true, 5000);
}
document.querySelector('#share-button').addEventListener('click', async () => {
  const data = {title: 'Fund Sid’s GTA VI Era', text: 'One PS5. One monitor. Zero financial planning. Help fund my GTA VI era.', url: location.href.split('#')[0]};
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(data.url); toast('Link copied. Go emotionally blackmail the group chat.'); }
    else { toast('Copy this page’s address and send it to your favourite enablers.'); }
  } catch (error) { if (error.name !== 'AbortError') toast('Copy this page’s address to share the financial emergency.'); }
});
const dialog = document.querySelector('#thanks');
document.querySelector('#sent-button').addEventListener('click', () => { dialog.showModal(); celebrate(); });
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('#thanks-done').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target === dialog) {const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();}});
function celebrate() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || motionPaused) return;
  const canvas = document.querySelector('#confetti'), ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = Array.from({length:100}, () => ({x:Math.random()*canvas.width, y:-Math.random()*canvas.height, vx:(Math.random()-.5)*4, vy:3+Math.random()*5, angle:Math.random()*6, color:['#ff683b','#f4a5c6','#f6f1e7','#c9cf8b'][Math.floor(Math.random()*4)]}));
  const start = performance.now();
  function frame(now) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (motionPaused) return;
    particles.forEach(p => {p.x+=p.vx;p.y+=p.vy;p.angle+=.04;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle=p.color;ctx.fillRect(-4,-4,7,11);ctx.restore();});
    if(now-start<3500) requestAnimationFrame(frame); else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  requestAnimationFrame(frame);
}

// Motion controls respect both system preference and a deliberate visitor choice.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const motionToggle = document.querySelector('#motion-toggle');
let storedMotion = null;
try { storedMotion = localStorage.getItem('gta-motion'); } catch (_) {}
let motionPaused = reducedMotion.matches || storedMotion === 'off';
let chaseTimer;
let introTimer;
let introFallback;
let heroEntryTimer;
const intro = document.querySelector('#intro-screen');
const chaosButton = document.querySelector('#chaos-button');
const dispatch = document.querySelector('#dispatch');
const art = document.querySelector('.hero-art');
function stopChase() {
  clearTimeout(chaseTimer);
  document.body.classList.remove('chaos-active');
  chaosButton.setAttribute('aria-pressed', 'false');
  chaosButton.innerHTML = '<span>✦</span> Activate 5-star chaos <span>→</span>';
  document.querySelector('.wanted-stars').innerHTML = '<i>★</i><i>★</i><i>★</i><i>★</i><i>☆</i>';
  document.querySelector('.wanted-stars').setAttribute('aria-label', 'Wanted level: four stars');
  dispatch.hidden = true;
}
function finishIntro() {
  clearInterval(introTimer); clearTimeout(introFallback);
  if (intro.hidden) return;
  intro.classList.add('leaving');
  setTimeout(() => { intro.hidden = true; }, 450);
  document.body.classList.add('entering');
  clearTimeout(heroEntryTimer);
  heroEntryTimer = setTimeout(() => document.body.classList.remove('entering'), 1200);
  try { sessionStorage.setItem('gta-intro-seen', 'yes'); } catch (_) {}
}
function applyMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionToggle.textContent = 'Motion: ' + (motionPaused ? 'OFF' : 'ON');
  motionToggle.setAttribute('aria-pressed', String(motionPaused));
  if (motionPaused) { stopChase(); finishIntro(); }
}
motionToggle.addEventListener('click', () => {
  motionPaused = !motionPaused;
  storedMotion = motionPaused ? 'off' : 'on';
  try { localStorage.setItem('gta-motion', storedMotion); } catch (_) {}
  applyMotion();
});
reducedMotion.addEventListener('change', event => {
  motionPaused = event.matches || storedMotion === 'off';
  applyMotion();
});
applyMotion();
function playIntro() {
  if (motionPaused) { toast('Motion is paused. Turn it on to replay the intro.'); return; }
  clearInterval(introTimer); clearTimeout(introFallback);
  intro.hidden = false; intro.classList.remove('leaving');
  const started = performance.now();
  const progress = document.querySelector('#intro-progress');
  const percent = document.querySelector('#intro-percent');
  const tip = document.querySelector('#intro-tip');
  progress.style.width = '0%'; percent.textContent = '0%'; tip.textContent = 'Checking wallet...';
  introTimer = setInterval(() => {
    const value = Math.min(100, Math.round((performance.now() - started) / 18));
    progress.style.width = value + '%'; percent.textContent = value + '%';
    tip.textContent = value < 35 ? 'Checking wallet...' : value < 65 ? 'Insufficient dignity detected.' : value < 90 ? 'Contacting questionable friends...' : 'Mission: acquire GTA VI.';
    if (value === 100) finishIntro();
  }, 70);
  // Never trap navigation if a timer is throttled in a background tab.
  introFallback = setTimeout(finishIntro, 2600);
}
document.querySelector('#skip-intro').addEventListener('click', finishIntro);
intro.addEventListener('keydown', event => { if (event.key === 'Escape') finishIntro(); });
const replay = document.createElement('button');
replay.className = 'replay-intro'; replay.textContent = 'Replay intro ↻';
document.querySelector('footer').append(replay);
replay.addEventListener('click', playIntro);
let seenIntro = false;
try { seenIntro = sessionStorage.getItem('gta-intro-seen') === 'yes'; } catch (_) {}
if (!motionPaused && !seenIntro && !location.hash) playIntro();
chaosButton.addEventListener('click', () => {
  if (document.body.classList.contains('chaos-active')) {stopChase(); return;}
  if (motionPaused) {toast('Chaos is taking a nap. Turn motion on to unleash it.'); return;}
  document.body.classList.add('chaos-active');
  chaosButton.setAttribute('aria-pressed', 'true');
  chaosButton.innerHTML = '<span>★</span> End the getaway <span>×</span>';
  document.querySelector('.wanted-stars').innerHTML = '<i>★</i><i>★</i><i>★</i><i>★</i><i>★</i>';
  document.querySelector('.wanted-stars').setAttribute('aria-label', 'Wanted level: five stars');
  dispatch.hidden = false;
  chaseTimer = setTimeout(stopChase, 8000);
});
// Reveal once, then disconnect: content stays visible when scrolling back.
if ('IntersectionObserver' in window && !motionPaused) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('is-visible'); observer.unobserve(entry.target);}
  }), {threshold:.12});
  document.querySelectorAll('.situation>div,.receipt,.countdown-inner,.section-heading,.tier,.trailer-frame,.donate-grid>div,.faq-section>div').forEach((element, i) => {
    element.classList.add('reveal-ready');
    if (element.classList.contains('tier')) element.style.setProperty('--reveal-delay', (i % 3) * 90 + 'ms');
    observer.observe(element);
  });
}
art.addEventListener('pointermove', event => {
  if (motionPaused || !finePointer.matches) return;
  const rect = art.getBoundingClientRect();
  art.style.setProperty('--tilt-x', ((.5 - (event.clientY-rect.top)/rect.height)*8).toFixed(2)+'deg');
  art.style.setProperty('--tilt-y', (((event.clientX-rect.left)/rect.width-.5)*10).toFixed(2)+'deg');
});
art.addEventListener('pointerleave', () => { art.style.setProperty('--tilt-x','0deg'); art.style.setProperty('--tilt-y','0deg'); });
document.querySelectorAll('.tier').forEach(tier => tier.addEventListener('pointermove', event => {
  if (motionPaused || !finePointer.matches) return;
  const rect = tier.getBoundingClientRect();
  tier.style.setProperty('--pointer-x', (event.clientX-rect.left)+'px');
  tier.style.setProperty('--pointer-y', (event.clientY-rect.top)+'px');
}));
let scrollQueued = false;
function updateScroll() {
  const max = document.documentElement.scrollHeight-innerHeight;
  document.documentElement.style.setProperty('--scroll-progress', max > 0 ? Math.min(1,scrollY/max) : 0);
  scrollQueued = false;
}
addEventListener('scroll', () => {if (!scrollQueued) {scrollQueued=true;requestAnimationFrame(updateScroll);}}, {passive:true});
addEventListener('resize',updateScroll); updateScroll();
document.querySelector('#roast-button').addEventListener('click', () => {
  const box = document.querySelector('#roast'); box.classList.remove('pop');
  requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add('pop')));
});

// User-initiated video only. The persistent direct link also works if embeds are blocked.
document.querySelector('#play-trailer').addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube-nocookie.com/embed/rz1B4B2yBZY?autoplay=1&rel=0';
  iframe.title = 'Grand Theft Auto VI launch trailer';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  document.querySelector('#trailer-frame').replaceChildren(iframe);
});
document.querySelectorAll('.countdown b').forEach(digit => {
  new MutationObserver(() => {
    if (motionPaused) return;
    digit.classList.remove('digit-change');
    requestAnimationFrame(() => digit.classList.add('digit-change'));
  }).observe(digit, {childList:true});
});

// A single passive scroll director drives the full-screen opening and three exhibits.
const cinematic = document.querySelector('.cinematic');
const mission = document.querySelector('.mission-reel');
const missionPanels = [...document.querySelectorAll('.mission-panel')];
const missionSteps = [...document.querySelectorAll('.mission-steps>span')];
let directorFrame = false;
let previousStep = -1;
const clampProgress = value => Math.max(0, Math.min(1, value));
function directScenes() {
  directorFrame = false;
  if (motionPaused) return;
  const heroRect = cinematic.getBoundingClientRect();
  const heroProgress = clampProgress(-heroRect.top / Math.max(1, cinematic.offsetHeight-innerHeight));
  cinematic.style.setProperty('--scene-progress',heroProgress.toFixed(4));
  const secondTitle = document.querySelector('.cinema-second');
  secondTitle.classList.toggle('is-interactive',heroProgress>.6);
  secondTitle.inert = heroProgress <= .6;
  secondTitle.setAttribute('aria-hidden',String(heroProgress <= .6));
  const missionRect = mission.getBoundingClientRect();
  const missionProgress = clampProgress(-missionRect.top / Math.max(1,mission.offsetHeight-innerHeight));
  mission.style.setProperty('--mission-progress',missionProgress.toFixed(4));
  const step = Math.min(2, Math.floor(missionProgress*3));
  if (step !== previousStep) {
    previousStep = step;
    missionPanels.forEach((panel,i) => {panel.classList.toggle('is-active',i===step);panel.classList.toggle('is-past',i<step);panel.setAttribute('aria-hidden',String(i!==step));panel.inert=i!==step;});
    missionSteps.forEach((label,i) => label.classList.toggle('is-active',i===step));
  }
}
function queueDirector() {if(!directorFrame){directorFrame=true;requestAnimationFrame(directScenes);}}
function syncDirector() {
  document.body.classList.toggle('scroll-director',!motionPaused);
  if (motionPaused) {
    missionPanels.forEach(panel=>{panel.removeAttribute('aria-hidden');panel.inert=false;});
    cinematic.style.setProperty('--scene-progress',0);
    const secondTitle = document.querySelector('.cinema-second');
    secondTitle.inert = true;
    secondTitle.setAttribute('aria-hidden','true');
  } else {previousStep=-1; directScenes();}
}
addEventListener('scroll',queueDirector,{passive:true});
addEventListener('resize',queueDirector);
motionToggle.addEventListener('click',syncDirector);
reducedMotion.addEventListener('change',syncDirector);
// The toggle is the state boundary; no expensive continuous animation loop is needed.
syncDirector();
art.addEventListener('pointermove',event=>{
  if(motionPaused||!finePointer.matches)return;
  const rect=art.getBoundingClientRect();
  cinematic.style.setProperty('--scene-x',((event.clientX/rect.width-.5)*24).toFixed(2)+'px');
});
art.addEventListener('pointerleave',()=>cinematic.style.setProperty('--scene-x','0px'));
