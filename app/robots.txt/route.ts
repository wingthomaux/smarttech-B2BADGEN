const body=`User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: xAI-Bot
Allow: /

User-agent: xAI-SearchBot
Allow: /

User-agent: GrokBot
Allow: /

User-agent: Grok
Allow: /

User-agent: *
Allow: /

Sitemap: https://smarttech.b2badgen.com/sitemap.xml
`;

export function GET(){return new Response(body,{headers:{"content-type":"text/plain; charset=utf-8","cache-control":"public, max-age=3600"}})}
