// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "yianzhou",
  tagline: "Welcome",
  url: "https://yianzhou.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "yianzhou", // GitHub Pages 部署用
  projectName: "yianzhou.github.io", // GitHub Pages 部署用
  deploymentBranch: "gh-pages", // GitHub Pages 部署用
  trailingSlash: false,

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs/apple",
          routeBasePath: "docs/apple",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/yianzhou/yianzhou.github.io",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "dev",
        path: "docs/dev",
        routeBasePath: "docs/dev",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "language",
        path: "docs/language",
        routeBasePath: "docs/language",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "flutter",
        path: "docs/flutter",
        routeBasePath: "docs/flutter",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "insights",
        path: "docs/insights",
        routeBasePath: "docs/insights",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "invest",
        path: "docs/invest",
        routeBasePath: "docs/invest",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "ai",
        path: "docs/ai",
        routeBasePath: "docs/ai",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "yianzhou",
        logo: {
          alt: "yianzhou",
          src: "img/logo.svg",
        },
        items: [
          {
            to: "docs/apple",
            position: "left",
            label: "Apple",
          },
          {
            to: "docs/dev",
            position: "left",
            label: "开发",
          },
          {
            to: "docs/language",
            position: "left",
            label: "编程语言",
          },
          {
            to: "docs/flutter",
            position: "left",
            label: "Flutter",
          },
          {
            to: "docs/insights",
            position: "left",
            label: "Insights",
          },
          {
            to: "docs/invest",
            position: "left",
            label: "投资",
          },
          {
            to: "docs/ai",
            position: "left",
            label: "AI",
          },
          {
            href: "https://github.com/yianzhou/yianzhou.github.io",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `粤ICP备15029205号 Copyright © ${new Date().getFullYear()} yianzhou`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["dart", "swift"],
      },
    }),
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
};

module.exports = config;
