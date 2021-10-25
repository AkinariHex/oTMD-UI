export default async function handler(req, res) {

    let sitemap = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <!--  created with Free Online Sitemap Generator www.xml-sitemaps.com  -->
        <url>
        <loc>https://otmd.app/</loc>
        <lastmod>2021-10-25T20:52:24+00:00</lastmod>
        <priority>1.00</priority>
        </url>
        <url>
        <loc>https://otmd.app/tournaments</loc>
        <lastmod>2021-10-25T20:52:24+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        <url>
        <loc>https://otmd.app/documentation</loc>
        <lastmod>2021-10-25T20:52:24+00:00</lastmod>
        <priority>0.80</priority>
        </url>
        </urlset>
    `

    res.writeHead(200, {
        'Content-Type': 'application/xml'
      });
      
    res.end(sitemap);

  }