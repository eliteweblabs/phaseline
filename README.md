# PhaseLine Painting Astro Theme

A professional painting company website template with striking design, blazing speed, built for modern painting contractors and service businesses

![PhaseLine Painting](https://oxygenna-themes.b-cdn.net/Solid Builders-astro/promo/Solid Builders.png)

## Introduction

### About

PhaseLine Painting is a premium Astro template built for painting contractors, service businesses, and professionals who want to showcase their work. With a truly unique design and a flawless 100/100 Google PageSpeed score, PhaseLine Painting combines cutting-edge visuals with best-in-class performance. Whether you're launching a portfolio, service site, or project showcase, PhaseLine Painting is the perfect starting point—flexible, fast, and future-ready.

### Features

- **14 Pre-Built Pages (and more to come):** Launch your site quickly with a complete set of professionally designed pages ready to go.
- **Perfect 100/100 PageSpeed Score:** Built for maximum performance and lightning-fast load times, PhaseLine Painting delivers a flawless Google PageSpeed score.
- **Modular Block Sections:** All pages are built using flexible, reusable block sections—easily insert, rearrange, or extend with new content from our growing library.
- **Reusable Components:** Save time and stay consistent with a full suite of customizable, reusable UI components.
- **Built with Astro v5 & Tailwind CSS v4:** Enjoy the latest development features and speed with Astro's cutting-edge framework and Tailwind's newest utility-first release.
- **Keystatic CMS Integration:** Manage your content visually and inline with the Git-friendly Keystatic CMS—modern, flexible, and developer-approved.
- **Light & Dark Mode:** Give users full control with a seamless toggle between light and dark themes.
- **SEO Optimized:** PhaseLine Painting is built with clean, semantic HTML and optimized metadata to boost visibility and search engine ranking.
- **Mega Menu Navigation:** Support complex navigation structures with a built-in, responsive mega menu—ideal for large sites.
- **Content Collections:** Organize and manage your content with Astro's powerful content collections system.
- **Premium Support via Discord:** Gain access to our private Discord channel for direct support, updates, and guidance.
- **Free Ongoing Updates:** Your purchase includes regular updates with new features, performance improvements, and refinements.

## Getting Started

### Commands

After downloading the theme, install the dependencies and run it on your local server. Check the `package.json` file for available scripts.

> **Note**: Requires Node.js version 20.3.0 or later.

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

### Folder structure

Inside PhaseLine Painting Astro project, you'll see the following folders and files:

```plaintext
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── blocks/
│   │   │   └── ...
│   │   ├── scripts/
│   │   │   └── ...
│   │   └── ui/
│   │       └── ...
│   ├── config/
│   │   └── ...
│   ├── content/
│   │   ├── blog/
│   │   │   └── ...
│   │   └── work/
│   │       └── ...
│   ├── data/
│   │   └── ...
│   ├── icons/
│   │   └── ...
│   ├── layouts/
│   │   └── ...
│   └── pages/
│       └── ...
└── package.json
```

| Directory/File           | Description                                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `public/`                | Contains static assets like images and the favicon. These files are served directly at the root URL.                               |
| `src/assets/`            | Contains all images and assets used in the project.                                                                                |
| `src/components/`        | Contains reusable components for your site. This directory is divided into `ui` for UI components and `blocks` for section blocks. |
| `src/components/blocks/` | Contains Section blocks used throughout the site.                                                                                  |
| `src/components/ui/`     | Contains individual UI components.                                                                                                 |
| `src/config/`            | Contains configuration files for the project in typescript format.                                                                 |
| `src/content/`           | Holds collection data, such as case studies.                                                                                       |
| `src/data/`              | Contains JSON files with content data (like features, testimonials etc).                                                           |
| `src/icons/`             | Contains all icons used in the project, most are sourced from [Heroicons](https://heroicons.com/).                                 |
| `src/layouts/`           | Contains layout components that define the overall structure of your pages.                                                        |
| `src/pages/`             | Contains `.astro` files for each page. Each file here is exposed as a route based on its file name.                                |
| `package.json`           | Lists dependencies and scripts for your project, including metadata and various package requirements.                              |

## Theme Configuration

The configuration files are located in the `src/config` directory, written in TypeScript. They contain various settings for the theme, including:

| Configuration Files        | Description                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| `src/config/config.ts`     | Basic configuration settings including SEO, mode, and scroll animations. |
| `src/config/navigation.ts` | Menu TypeScript interface options and JSON files for navigation.         |
| `src/config/analytics.ts`  | Analytics configuration file.                                            |

## Theme Customization

### Customize the Colors

The theme uses two main colors: primary and neutral. These colors are defined in the Tailwind CSS configuration file. To personalize the color scheme of your project, you can easily modify these color values.

To customize the colors, follow these steps:

1. Open the `global.css` file.
2. Find the `theme` section within the file.
3. Under `theme`, locate the `Colors`.
4. Modify the color values for `primary` and `neutral` to suit your preferred color palette.

You can use the [tailwind CSS colors](https://nodejs.org/en/download/) or create your [own palette](https://uicolors.app/create) .

### Customize the Fonts

To customize the fonts used in your project, follow these steps:

1. **Add Your Custom Font Files**
   Replace or add the desired font files in the public directory of your project.

2. **Update the Tailwind CSS Configuration**

   Open the `global.css` file. In the `@font-face` section, find the `font-family` property and update the `font-family` object.

### Dark/Light Mode

By default, the site uses forced modes, which can be either light or dark, depending on the chosen layout. The light layout sets the class to **`mode-light`** and the dark layout sets it to **`mode-dark`**. This setting allows you to maintain a fixed appearance across the site regardless of user preferences or system settings.

However, if you want to give users the ability to switch between themes, you can configure the theme to use the **`mode-auto`** class. You can easily do this by adding the **`mode-auto`** class to the **`src/layouts/Layout.astro`** file instead of using **`mode-light`** or **`mode-dark`** and uncommenting the ThemeSwitcher component in the NavigationBar component.

## Content Management

PhaseLine Painting includes Keystatic CMS integration for Case Studies collection management. The configuration can be found in `keystatic.config.ts`, which defines:

- Content collections structure
- Field configurations
- Storage settings

To use Keystatic:

1. Run the development server
2. Access the dashboard at `http://127.0.0.1:4321/keystatic`
3. Configure cloud storage in production:

```typescript
storage: import.meta.env.DEV === true ? { kind: "local" } : { kind: "cloud" },
cloud: {
  project: '[TEAM_NAME]/[PROJECT_NAME]',
},
```

4. Set the folder for the content files in the `collections` property

For more details, see [Keystatic's documentation](https://keystatic.com/docs/introduction).

## License

Copyright 2025 - PhaseLine Painting
