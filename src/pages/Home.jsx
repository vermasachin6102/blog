import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* ─── static data (swap for Supabase later) ─────────────────────────── */
const essays = [
  { tag: 'Engineering', date: 'Jun 8',  title: 'Debugging is Just Reading, Slowly',             excerpt: 'The most underrated skill in software is patience. A field guide to staying calm when the stack trace lies.',                              read: '6 min read' },
  { tag: 'Career',      date: 'May 29', title: 'On Being a Generalist in a World of Specialists', excerpt: 'Why breadth still wins, and how to defend your curiosity against the pressure to niche down too early.',                               read: '9 min read' },
  { tag: 'Tools',       date: 'May 17', title: 'My Terminal Setup, Reconsidered',                 excerpt: 'I tore down my entire dotfiles and rebuilt from scratch. Everything that earned its place back.',                                       read: '5 min read' },
];

const books = [
  { no: '01', title: 'The Pragmatic Programmer',      author: 'Hunt & Thomas',     rating: 5, bg: 'linear-gradient(155deg,#6B5847,#473A2E)' },
  { no: '02', title: 'A Philosophy of Software Design', author: 'John Ousterhout', rating: 4, bg: 'linear-gradient(155deg,#8A6E52,#5E4A36)' },
  { no: '03', title: 'Crafting Interpreters',          author: 'Robert Nystrom',   rating: 5, bg: 'linear-gradient(155deg,#4A3C30,#2C231B)' },
  { no: '04', title: 'The Art of Doing Science',       author: 'Richard Hamming',  rating: 4, bg: 'linear-gradient(155deg,#9C7B57,#6E5640)' },
  { no: '05', title: 'Tidy First?',                    author: 'Kent Beck',        rating: 3, bg: 'linear-gradient(155deg,#7A6450,#4E3F30)' },
];

const projects = [
  { no: '01', name: 'Digital Garden Engine', status: 'Live',        desc: 'A static-site generator built for interlinked, ever-evolving notes — backlinks, graph view, and incremental builds.', tech: 'Go · Svelte' },
  { no: '02', name: 'Shelf',                 status: 'Beta',        desc: 'A self-hosted reading tracker with a beautiful spine-view bookshelf and a quiet rating system.',                      tech: 'TypeScript · SQLite' },
  { no: '03', name: 'kbd.css',               status: 'Open Source', desc: 'A tiny CSS library for rendering realistic, themeable keyboard shortcuts. 1.2k stars and counting.',                tech: 'CSS' },
];

const lab = [
  { no: '01', name: 'Coffee Color Picker', tag: 'Demo',      note: 'Generates a palette from a photo of your morning brew. Surprisingly accurate, mostly brown.' },
  { no: '02', name: 'Reading Heatmap',     tag: 'WIP',       note: 'A contribution-style graph, but for pages read. Gamifying the habit, gently.' },
  { no: '03', name: 'Essay Summariser',    tag: 'Prototype', note: 'Feed it any of my essays and it returns a three-line TL;DR. Sometimes funnier than the original.' },
  { no: '04', name: 'Type Synth',          tag: 'Toy',       note: 'Every keystroke plays a soft mechanical note. Pure procrastination, zero regrets.' },
];

const socials = ['Twitter', 'LinkedIn', 'GitHub', 'RSS'];

const footerCols = [
  { head: 'Explore',  items: ['Essays', 'Library', 'Projects', 'Lab', 'Archive'] },
  { head: 'About',    items: ['Now', 'Uses', 'Colophon', 'RSS Feed'] },
  { head: 'Connect',  items: ['Newsletter', 'Twitter', 'GitHub', 'Email'] },
];

function dots(n) { return '●'.repeat(n) + '○'.repeat(5 - n); }

/* ─── helpers ────────────────────────────────────────────────────────── */
const lift = {
  transition: 'transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease',
};
const ArrowRight = ({ size = 17 }) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.65, strokeLinecap: 'round', strokeLinejoin: 'round', transition: 'transform .4s cubic-bezier(.2,.7,.2,1)' }} className="arr">
    <path d="M5 12h13M12 5l7 7-7 7" />
  </svg>
);

/* ─── component ─────────────────────────────────────────────────────── */
export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div style={{ background: '#F4F1EB', color: '#3A322B', fontFamily: "'Hanken Grotesk', sans-serif", minHeight: '100vh' }}>
      <style>{`
        .lift { transition: transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease, border-color .35s ease; }
        .lift:hover { transform: translateY(-5px); }
        .lift:hover .arr { transform: translateX(4px); }
        .btn-home { transition: transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .4s ease; }
        .btn-home:hover { transform: translateY(-2px); }
        .btn-home:hover .arr { transform: translateX(4px); }
        .footlink { transition: color .25s ease; }
        .footlink:hover { color: #EDE7DD !important; }
        .soc-btn { transition: background .3s ease, color .3s ease, border-color .3s ease; }
        .soc-btn:hover { background: #EDE7DD !important; color: #2A231D !important; border-color: #EDE7DD !important; }
        @keyframes spinslow { to { transform: rotate(360deg); } }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <header style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 56, alignItems: 'center', padding: '96px 60px 104px', maxWidth: 1480, margin: '0 auto' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 600, letterSpacing: '2.5px', fontSize: 13, color: '#9A6C49', textTransform: 'uppercase', marginBottom: 26 }}>
            <span style={{ width: 22, height: 1.5, background: '#B07E58', display: 'inline-block' }} />
            Tech Journal &amp; Digital Garden
          </div>
          <h1 style={{ fontWeight: 600, fontSize: 74, lineHeight: 1.04, letterSpacing: '-1.5px', margin: '0 0 28px', color: '#322A24' }}>
            Welcome to my<br />
            <span style={{ fontStyle: 'italic', color: '#A06E4A' }}>Digital Space</span>
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.65, color: '#6E6258', maxWidth: 520, margin: '0 0 42px', fontWeight: 400 }}>
            I'm Sachin. This is my corner of the internet where I document my tech journey, review books, and write essays over a cup of coffee.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/essays" className="btn-home" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none', background: '#473C33', color: '#F4F1EB', fontWeight: 600, fontSize: 16, padding: '16px 30px', borderRadius: 14, boxShadow: '0 14px 30px -14px rgba(71,60,51,.6)' }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M4 20l1-4L16 5a1.8 1.8 0 0 1 3 3L8 19l-4 1z" /><path d="M14.5 6.5l3 3" /></svg>
              Read Essays
            </Link>
            <Link to="/library" className="btn-home" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, textDecoration: 'none', background: 'transparent', color: '#3A322B', fontWeight: 600, fontSize: 16, padding: '15px 30px', borderRadius: 14, border: '1.5px solid rgba(58,50,43,.2)' }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M4 5a1 1 0 0 1 1-1h11v15H5a1 1 0 0 0-1 1z" /><path d="M16 4v15" /></svg>
              Browse Library
            </Link>
          </div>
        </div>

        {/* latest essay card */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 540 }}>
          <div aria-hidden="true" style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', border: '1px dashed rgba(176,126,88,.32)', animation: 'spinslow 80s linear infinite' }} />
          <div aria-hidden="true" style={{ position: 'absolute', top: 14, right: 36, width: 96, height: 96, borderRadius: '50%', background: 'radial-gradient(circle at 35% 30%,#efe2d2,#dcc3a8)', opacity: .6, animation: 'floaty 8s ease-in-out infinite' }} />
          <Link to="/essays" className="lift" style={{ position: 'relative', zIndex: 2, width: 480, textDecoration: 'none', background: 'linear-gradient(155deg,#5A4D42 0%,#473B32 55%,#3E332B 100%)', boxShadow: '0 34px 70px -28px rgba(62,51,43,.55), inset 0 1px 0 rgba(255,240,224,.08)', borderRadius: 30, padding: '42px 44px', color: '#F1ECE4', display: 'block' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#D9B791', fontWeight: 600, fontSize: 12, letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C49A78', display: 'inline-block' }} />
              Latest Essay
            </div>
            <div style={{ fontWeight: 600, fontSize: 33, lineHeight: 1.16, letterSpacing: '-.4px', marginBottom: 16 }}>The Quiet Joy of Reading Source Code</div>
            <p style={{ fontSize: 15.5, lineHeight: 1.62, color: 'rgba(241,236,228,.66)', margin: '0 0 34px', fontWeight: 400 }}>Why I spend my mornings tracing how my favourite tools actually work — and what it taught me about writing.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13.5, color: 'rgba(241,236,228,.5)' }}>
              <span>Jun 12, 2026</span><span style={{ opacity: .5 }}>·</span><span>7 min read</span>
              <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(241,236,228,.25)', color: '#F1ECE4' }}>
                <ArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* ── ESSAYS ──────────────────────────────────────────────────── */}
      <section style={{ padding: '104px 60px', maxWidth: 1480, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 54 }}>
          <div>
            <div style={{ fontWeight: 600, letterSpacing: '2.5px', fontSize: 13, color: '#9A6C49', textTransform: 'uppercase', marginBottom: 14 }}>Writing</div>
            <h2 style={{ fontWeight: 600, fontSize: 44, letterSpacing: '-1px', margin: 0, color: '#322A24' }}>Recent Essays</h2>
          </div>
          <Link to="/essays" style={{ textDecoration: 'none', color: '#5B5048', fontWeight: 600, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            View all essays <ArrowRight size={16} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {essays.map((e, i) => (
            <Link key={i} to="/essays" className="lift" style={{ textDecoration: 'none', color: '#3A322B', background: '#FBF9F5', border: '1px solid rgba(58,50,43,.07)', borderRadius: 22, padding: 32, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 22 }}>
                <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', color: '#9A6C49', border: '1px solid rgba(176,126,88,.3)', padding: '4px 11px', borderRadius: 30 }}>{e.tag}</span>
                <span style={{ fontSize: 13, color: '#A4998D' }}>{e.date}</span>
              </div>
              <h3 style={{ fontWeight: 600, fontSize: 24, lineHeight: 1.22, margin: '0 0 13px', color: '#322A24' }}>{e.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.62, color: '#75695E', margin: '0 0 30px' }}>{e.excerpt}</p>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13.5, color: '#A4998D' }}>{e.read}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 14.5, color: '#473C33' }}>Read <ArrowRight size={15} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LIBRARY ─────────────────────────────────────────────────── */}
      <section style={{ background: '#ECE6DC', borderTop: '1px solid rgba(58,50,43,.05)', borderBottom: '1px solid rgba(58,50,43,.05)' }}>
        <div style={{ padding: '104px 60px', maxWidth: 1480, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 56 }}>
            <div>
              <div style={{ fontWeight: 600, letterSpacing: '2.5px', fontSize: 13, color: '#9A6C49', textTransform: 'uppercase', marginBottom: 14 }}>Bookshelf</div>
              <h2 style={{ fontWeight: 600, fontSize: 44, letterSpacing: '-1px', margin: 0, color: '#322A24' }}>The Library</h2>
            </div>
            <p style={{ maxWidth: 340, fontSize: 15.5, lineHeight: 1.62, color: '#75695E', margin: 0 }}>Books I've read and reviewed — with honest notes and a quiet rating out of five.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 24 }}>
            {books.map((b, i) => (
              <div key={i} className="lift" style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative', aspectRatio: '3/4.3', borderRadius: 12, overflow: 'hidden', background: b.bg, boxShadow: '0 18px 30px -18px rgba(62,51,43,.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 18 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.55)' }}>{b.no}</span>
                  <div style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.2, color: 'rgba(255,255,255,.95)' }}>{b.title}</div>
                </div>
                <div style={{ padding: '13px 2px 0' }}>
                  <div style={{ fontSize: 13, color: '#75695E', marginBottom: 5 }}>{b.author}</div>
                  <div style={{ fontSize: 11, letterSpacing: '3px', color: '#B07E58' }}>{dots(b.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────── */}
      <section style={{ padding: '104px 60px', maxWidth: 1480, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontWeight: 600, letterSpacing: '2.5px', fontSize: 13, color: '#9A6C49', textTransform: 'uppercase', marginBottom: 14 }}>Building</div>
          <h2 style={{ fontWeight: 600, fontSize: 44, letterSpacing: '-1px', margin: 0, color: '#322A24' }}>Projects</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((p, i) => (
            <Link key={i} to="/projects" className="lift" style={{ textDecoration: 'none', color: '#3A322B', display: 'grid', gridTemplateColumns: '84px 1fr auto', alignItems: 'center', gap: 30, padding: '34px 20px', borderTop: '1px solid rgba(58,50,43,.1)' }}>
              <div style={{ fontWeight: 600, fontSize: 34, color: '#C2AF9C', lineHeight: 1 }}>{p.no}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 25, margin: 0, color: '#322A24' }}>{p.name}</h3>
                  <span style={{ fontWeight: 600, fontSize: 11, letterSpacing: '.6px', textTransform: 'uppercase', color: '#8B7E70', border: '1px solid rgba(58,50,43,.18)', padding: '3px 10px', borderRadius: 30 }}>{p.status}</span>
                </div>
                <p style={{ fontSize: 15.5, lineHeight: 1.58, color: '#75695E', margin: 0, maxWidth: 660 }}>{p.desc}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 13.5, color: '#A4998D', letterSpacing: '.3px' }}>{p.tech}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(58,50,43,.2)', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" style={{ width: 17, height: 17, fill: 'none', stroke: '#473C33', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M7 17L17 7M9 7h8v8" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── LAB ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#473C33', color: '#F1ECE4' }}>
        <div style={{ padding: '104px 60px', maxWidth: 1480, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 56 }}>
            <div>
              <div style={{ fontWeight: 600, letterSpacing: '2.5px', fontSize: 13, color: '#D9B791', textTransform: 'uppercase', marginBottom: 14 }}>Experiments</div>
              <h2 style={{ fontWeight: 600, fontSize: 44, letterSpacing: '-1px', margin: 0, color: '#F1ECE4' }}>The Lab</h2>
            </div>
            <p style={{ maxWidth: 360, fontSize: 15.5, lineHeight: 1.62, color: 'rgba(241,236,228,.6)', margin: 0 }}>Half-finished ideas, weekend hacks, and things I'm tinkering with. Brewed fresh, served raw.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 22 }}>
            {lab.map((x, i) => (
              <Link key={i} to="/lab" className="lift" style={{ textDecoration: 'none', color: '#F1ECE4', background: 'rgba(241,236,228,.045)', border: '1px solid rgba(241,236,228,.1)', borderRadius: 20, padding: '30px 32px', display: 'flex', gap: 22, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 15, color: '#C49A78', paddingTop: 4 }}>{x.no}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 9 }}>
                    <h3 style={{ fontWeight: 600, fontSize: 22, margin: 0 }}>{x.name}</h3>
                    <span style={{ fontSize: 11, letterSpacing: '.6px', textTransform: 'uppercase', color: '#D9B791', border: '1px solid rgba(217,183,145,.35)', padding: '3px 10px', borderRadius: 30, flexShrink: 0 }}>{x.tag}</span>
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(241,236,228,.6)', margin: 0 }}>{x.note}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────────────────── */}
      <section style={{ padding: '100px 60px', maxWidth: 1480, margin: '0 auto' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 32, background: 'linear-gradient(150deg,#5A4D42,#43382F 70%)', color: '#F1ECE4', padding: '68px 64px', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 48, alignItems: 'center' }}>
          <div aria-hidden="true" style={{ position: 'absolute', right: -70, bottom: -100, width: 300, height: 300, borderRadius: '50%', border: '1px dashed rgba(241,236,228,.14)' }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <svg viewBox="0 0 24 24" style={{ width: 40, height: 40, fill: 'none', stroke: '#D9B791', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', marginBottom: 20 }}><path d="M5 8h11v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" /><path d="M16 9h2a2 2 0 0 1 0 4h-2" /><path d="M8 3v2M11 3v2" /></svg>
            <h2 style={{ fontWeight: 600, fontSize: 40, letterSpacing: '-.8px', lineHeight: 1.1, margin: '0 0 16px' }}>Coffee &amp; Code,<br />every Sunday.</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: 'rgba(241,236,228,.66)', margin: 0, maxWidth: 430 }}>One thoughtful email a week — a new essay, a book note, and whatever I'm building. No spam, ever.</p>
          </div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            {subscribed ? (
              <div style={{ background: 'rgba(241,236,228,.07)', border: '1px solid rgba(241,236,228,.16)', borderRadius: 18, padding: 34, textAlign: 'center' }}>
                <svg viewBox="0 0 24 24" style={{ width: 38, height: 38, fill: 'none', stroke: '#D9B791', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', marginBottom: 14 }}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9" /></svg>
                <div style={{ fontWeight: 600, fontSize: 23, marginBottom: 6 }}>You're in.</div>
                <div style={{ fontSize: 14.5, color: 'rgba(241,236,228,.66)' }}>Check your inbox for a welcome brew.</div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                <input
                  type="email" required placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', background: 'rgba(241,236,228,.07)', border: '1.5px solid rgba(241,236,228,.22)', borderRadius: 14, padding: '17px 20px', color: '#F1ECE4', fontFamily: "'Hanken Grotesk',sans-serif", fontSize: 16, outline: 'none' }}
                />
                <button type="submit" className="btn-home" style={{ cursor: 'pointer', background: '#EDE7DD', color: '#3A322B', border: 'none', fontFamily: "'Hanken Grotesk',sans-serif", fontWeight: 700, fontSize: 16, padding: 17, borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  Subscribe <ArrowRight size={17} />
                </button>
                <div style={{ fontSize: 12.5, color: 'rgba(241,236,228,.46)', textAlign: 'center' }}>Join 3,200+ curious readers</div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{ background: '#2E2620', color: '#B8AC9E', padding: '72px 60px 44px' }}>
        <div style={{ maxWidth: 1480, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 44, paddingBottom: 52, borderBottom: '1px solid rgba(241,236,228,.08)' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 26, color: '#F1ECE4', display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 16 }}>Sachin<span style={{ color: '#B07E58' }}>.</span></div>
            <p style={{ fontSize: 14.5, lineHeight: 1.62, maxWidth: 300, margin: '0 0 24px', color: '#8B8175' }}>A tech journal &amp; digital garden, brewed slowly over many cups of coffee.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map((s) => (
                <a key={s} href="#" className="soc-btn" style={{ textDecoration: 'none', minWidth: 42, height: 42, padding: '0 13px', borderRadius: 30, border: '1px solid rgba(241,236,228,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, letterSpacing: '.3px', color: '#D6CABB' }}>{s}</a>
              ))}
            </div>
          </div>
          {footerCols.map((col) => (
            <div key={col.head}>
              <div style={{ fontWeight: 600, fontSize: 12, letterSpacing: '1.4px', textTransform: 'uppercase', color: '#D6CABB', marginBottom: 20 }}>{col.head}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {col.items.map((it) => (
                  <a key={it} href="#" className="footlink" style={{ textDecoration: 'none', color: '#8B8175', fontSize: 14.5 }}>{it}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1480, margin: '0 auto', paddingTop: 28, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontSize: 13.5, color: '#6F665B' }}>
          <span>© 2026 Sachin. Brewed with care.</span>
          <span>Crafted slowly, one cup at a time.</span>
        </div>
      </footer>
    </div>
  );
}
