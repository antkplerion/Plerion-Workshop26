import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Plerion Workshop 2026',
  tagline: 'From "we just bought Plerion" to running cloud security end to end.',
  favicon: 'img/plerionlogo.png',

  url: 'https://antkplerion.github.io',
  baseUrl: '/Plerion-Workshop26/',

  organizationName: 'antkplerion',
  projectName: 'Plerion-Workshop26',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/pleri.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Plerion Workshop 2026',
      logo: {
        alt: 'Pleri',
        src: 'img/pleri.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'workshopSidebar',
          position: 'left',
          label: 'Modules',
        },
        {
          href: 'https://docs.plerion.com',
          label: 'Plerion Docs',
          position: 'right',
        },
        {
          href: 'https://docs.pleri.ai',
          label: 'Pleri Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/antkplerion/Plerion-Workshop26',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Workshop',
          items: [
            { label: 'Setup', to: '/00-setup' },
            { label: 'See', to: '/01-see' },
            { label: 'Prioritize', to: '/02-prioritize' },
            { label: 'Fix', to: '/03-fix' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Plerion', href: 'https://plerion.com' },
            { label: 'Plerion Docs', href: 'https://docs.plerion.com' },
            { label: 'Pleri Docs', href: 'https://docs.pleri.ai' },
            { label: 'Trust', href: 'https://trust.plerion.com' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Plerion. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'hcl', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
