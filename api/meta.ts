import { VercelRequest, VercelResponse } from '@vercel/node';

// Whitelist of known route paths
const ALLOWED_PATHS = new Set(['/expedition-33', '/bibou-birthday']);

/**
 * Returns the path only if it is a known safe route, otherwise returns '/'.
 * This prevents untrusted input from ever reaching the HTML template.
 */
function sanitizePath(raw: unknown): string {
  if (typeof raw !== 'string') return '/';
  const trimmed = raw.split('?')[0].split('#')[0]; // strip query / fragment
  return ALLOWED_PATHS.has(trimmed) ? trimmed : '/';
}

interface PageMeta {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

const siteConfig = {
  name: 'Rayms Lab',
  description:
    'Welcome to Rayms Lab - Discover interactive adventures and expeditions.',
  url: 'https://remy.laffuge.fr',
  ogImage: 'https://remy.laffuge.fr/og-image.jpg',
};

const getPageMeta = (path: string): PageMeta => {
  switch (path) {
    case '/expedition-33':
      return {
        title: `Expedition 33 - ${siteConfig.name}`,
        description: `À l'heure où j'écris ces lignes, je n'ai encore que 32 ans... Rejoignez avec moi l'expedition 33 pour une aventure interactive exclusive pleine de mystères et de souvenirs inoubliables.`,
        image: `${siteConfig.url}/expedition33.webp`,
        url: `${siteConfig.url}/expedition-33`,
        type: 'website',
      };
    case '/bibou-birthday':
      return {
        title: `Anniversaire Surprise de Laura 🎂 - ${siteConfig.name}`,
        description: `Tu es invité(e) à la fête d'anniversaire surprise de Laura ! Le 3 mai à midi. RSVP vite !`,
        image: `${siteConfig.url}/invitations/bibou-birthday-portrait.webp`,
        url: `${siteConfig.url}/bibou-birthday`,
        type: 'website',
      };
    default:
      return {
        title: `${siteConfig.name} - Interactive Adventures & Expeditions`,
        description: siteConfig.description,
        image: siteConfig.ogImage,
        url: siteConfig.url,
        type: 'website',
      };
  }
};

const generateMetaTags = (meta: PageMeta): string => {
  return `
    <!-- Basic Meta Tags -->
    <meta name="description" content="${meta.description}" />
    <meta name="keywords" content="Rayms Lab, expeditions, adventures, interactive, digital experience." />
    <meta name="author" content="Rayms Lab" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="${meta.type}" />
    <meta property="og:url" content="${meta.url}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="${meta.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Rayms Lab" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${meta.url}" />
    <meta property="twitter:title" content="${meta.title}" />
    <meta property="twitter:description" content="${meta.description}" />
    <meta property="twitter:image" content="${meta.image}" />

    <!-- Additional Meta Tags -->
    <meta name="theme-color" content="#000000" />
    <meta name="msapplication-TileColor" content="#000000" />
    <link rel="canonical" href="${meta.url}" />
  `;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const userAgent = req.headers['user-agent'] || '';
  // Sanitize path against a known-good whitelist before any use
  const path = sanitizePath(req.query.path);

  // Check if it's a social media crawler
  const isCrawler =
    /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegram|crawler|bot|spider/i.test(
      userAgent
    );

  if (isCrawler) {
    // Generate meta tags for the specific path
    const meta = getPageMeta(path);
    const metaTags = generateMetaTags(meta);

    // Return a basic HTML with proper meta tags
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${meta.title}</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${metaTags}
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
  </head>
  <body>
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
      <h1>${meta.title}</h1>
      <p>${meta.description}</p>
      <p><a href="${siteConfig.url}${path}">Visit ${meta.title}</a></p>
    </div>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.status(200).send(html);
  } else {
    // This shouldn't happen for browsers since Vercel should route them to index.html directly
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
