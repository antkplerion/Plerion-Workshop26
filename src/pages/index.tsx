import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const modules = [
  {
    number: '00',
    title: 'Setup',
    time: '15 min',
    path: '/00-setup',
    desc: 'Configure your environment, connect your AWS account, and confirm your first findings.',
    paths: ['security', 'platform'],
  },
  {
    number: '01',
    title: 'Connect Pleri',
    time: '15 min',
    path: '/01-connect-pleri',
    desc: 'Hook Pleri AI into Claude, your IDE, and other MCP-compatible tools.',
    paths: ['security', 'platform'],
  },
  {
    number: '02',
    title: 'See',
    time: '20 min',
    path: '/02-see',
    desc: 'Understand your cloud asset inventory and discover what Plerion knows about your environment.',
    paths: ['security', 'platform'],
  },
  {
    number: '03',
    title: 'Prioritize',
    time: '25 min',
    path: '/03-prioritize',
    desc: 'Use risk scores, attack paths, and blast radius to focus on what actually matters.',
    paths: ['security'],
  },
  {
    number: '04',
    title: 'Fix',
    time: '25 min',
    path: '/04-fix',
    desc: 'Remediate findings via a Pleri-generated cloud script or an auto-fix PR to your code repo.',
    paths: ['security', 'platform'],
  },
  {
    number: '05',
    title: 'Prove',
    time: '20 min',
    path: '/05-prove',
    desc: 'Map findings to compliance frameworks, generate audit reports, and connect your GRC tool.',
    paths: ['security'],
  },
  {
    number: '06',
    title: 'Teach Pleri',
    time: '20 min',
    path: '/06-teach-pleri',
    desc: 'Extend Pleri with Skills, Memory, and Tasks so it understands your organisation.',
    paths: ['platform'],
  },
  {
    number: '07',
    title: 'Operate',
    time: '20 min',
    path: '/07-operate',
    desc: 'Set up alerting, integrations, and runbooks to make security part of daily operations.',
    paths: ['security', 'platform'],
  },
];

const pathMeta: Record<string, { label: string; cls: string }> = {
  security: { label: 'Security Engineer', cls: 'path-badge--security' },
  platform: { label: 'Platform Engineer', cls: 'path-badge--platform' },
};

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Plerion Workshop 2026"
      description="From 'we just bought Plerion' to running cloud security end to end."
    >
      {/* Top accent bar */}
      <div className="top-accent-bar" />

      {/* Hero */}
      <div className="hero-v2">
        <div className="hero-v2__grid-overlay" />
        <div className="hero-v2__glow" />
        <div className="container hero-v2__inner">
          <img
            src="/Plerion-Workshop26/img/pleri.png"
            alt="Plerion"
            className="hero-v2__logo"
          />
          <h1 className="hero-v2__title">Plerion Workshop 2026</h1>
          <p className="hero-v2__subtitle">
            From <em>"we just bought Plerion"</em> to running cloud security end to end.
          </p>
          <div className="hero-v2__accent-line" />
          <div className="hero-v2__ctas">
            <Link className="btn-primary-v2" to="/00-setup">
              Start Setup
            </Link>
            <Link className="btn-secondary-v2" to="/intro">
              Read Intro
            </Link>
          </div>
        </div>
      </div>

      {/* Modules section */}
      <div className="container modules-section">

        {/* Learning paths */}
        <div className="paths-panel">
          <h2 className="paths-panel__heading">Learning Paths</h2>
          <p className="paths-panel__sub">Pick the modules that match your role, or run all eight for the full experience.</p>
          <div className="paths-panel__badges">
            <span className="path-badge path-badge--security">
              Security Engineer — 00 01 02 03 04 05 07
            </span>
            <span className="path-badge path-badge--platform">
              Platform Engineer — 00 01 02 05 06 07
            </span>
            <span className="path-badge path-badge--both">Full Workshop — all modules</span>
          </div>
        </div>

        <h2 className="modules-heading">Modules</h2>
        <div className="module-grid">
          {modules.map((m) => (
            <Link key={m.number} className="module-card-v2" to={m.path}>
              <div className="module-card-v2__left-accent" />
              <div className="module-card-v2__content">
                <div className="module-card-v2__header">
                  <span className="module-card-v2__number">· Module {m.number}</span>
                  <span className="module-card-v2__time">{m.time}</span>
                </div>
                <div className="module-card-v2__title">{m.title}</div>
                <div className="module-card-v2__desc">{m.desc}</div>
                <div className="module-card-v2__footer">
                  <div className="module-card-v2__badges">
                    {m.paths.map((p) => (
                      <span key={p} className={`path-badge ${pathMeta[p].cls}`} style={{ fontSize: '0.65rem' }}>
                        {pathMeta[p].label}
                      </span>
                    ))}
                  </div>
                  <span className="module-card-v2__arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
