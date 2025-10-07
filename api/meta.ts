import { VercelRequest, VercelResponse } from '@vercel/node';

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
        image: siteConfig.ogImage,
        url: `${siteConfig.url}/expedition-33`,
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
  const path = (req.query.path as string) || '/';

  // Debug logging
  console.log('Meta API called with:', {
    userAgent,
    path,
    query: req.query,
    url: req.url
  });

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
      <p><a href="${siteConfig.url}">Visit ${siteConfig.name}</a></p>
    </div>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } else {
    // Redirect browsers to the main SPA
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
