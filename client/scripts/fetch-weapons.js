import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { weapons as currentWeapons } from '../src/data/weapons.js';

const root = process.cwd();
const assetDirectory = path.join(root, 'public', 'assets', 'weapons');
const outputPath = path.join(root, 'src', 'data', 'weapons.json');
const source = 'https://wuthering.gg/weapons';

function decode(value = '') {
  return value.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

const text = html => decode(html.replace(/<br\s*\/?>/gi, ' ').replace(/<\/p>|<\/div>|<\/span>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim().replace(/\s+([,.])/g, '$1');
const attribute = (html, name) => html.match(new RegExp(`\\b${name}="([^"]+)"`, 'i'))?.[1] ?? '';

async function get(url, attempts = 3) {
  let error;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'Solaris3DataCenter/1.0 (weapon catalogue sync)' } });
      if (!response.ok) throw new Error(`${response.status} for ${url}`);
      return response;
    } catch (caught) {
      error = caught;
      await new Promise(resolve => setTimeout(resolve, 350 * (attempt + 1)));
    }
  }
  throw error;
}

async function mapLimit(items, limit, callback) {
  const output = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await callback(items[index]);
    }
  }));
  return output;
}

function parseCatalogue(html) {
  const output = [];
  for (const match of html.matchAll(/<li>\s*<a href="(?<href>\/weapons\/[^\"]+)" class="weapon quality(?<rarity>\d+)">(?<card>[\s\S]*?)<\/a>\s*<\/li>/g)) {
    const card = match.groups.card;
    const name = text(card.match(/<div class="name">([\s\S]*?)<\/div>/)?.[1] ?? '');
    const image = decode(attribute(card.match(/<img\b[^>]*>/)?.[0] ?? '', 'src'));
    if (name && image) output.push({ name, rarity: Number(match.groups.rarity), href: decode(match.groups.href), image });
  }
  return output;
}

function parseStats(html) {
  const stats = [];
  for (const match of html.matchAll(/<div class="item"><div class="text">([\s\S]*?)<\/div><div class="value">([\s\S]*?)<\/div><\/div>/g)) {
    stats.push({ name: text(match[1]), value: text(match[2]) });
  }
  const atkIndex = stats.findIndex(stat => stat.name.toLowerCase() === 'atk' && !stat.value.includes('%'));
  const atk = atkIndex >= 0 ? stats[atkIndex] : stats.find(stat => stat.name.toLowerCase() === 'atk');
  const secondary = stats.find((stat, index) => index !== atkIndex && stat !== atk);
  return { atk: atk?.value ?? null, secondary: secondary ? `${secondary.name} ${secondary.value}` : null };
}

function parseMaterials(html) {
  const section = html.match(/<div class="ascension">([\s\S]*?)<\/div><div class="right">/)?.[1] ?? '';
  return [...section.matchAll(/<li class="consume">([\s\S]*?)<\/li>/g)].map(([, item]) => ({
    name: text(item.match(/<div class="name">([\s\S]*?)<\/div>/)?.[1] ?? ''),
    quantity: text(item.match(/<div class="cost">([\s\S]*?)<\/div>/)?.[1] ?? ''),
    imageSource: decode(attribute(item.match(/<img\b[^>]*>/)?.[0] ?? '', 'src'))
  })).filter(item => item.name && item.quantity);
}

function parseDetails(html) {
  const maxLevel = Number(text(html.match(/<span>\s*-\s*Max Level:\s*(\d+)\s*<\/span>/)?.[1] ?? '')) || null;
  const level = Number(text(html.match(/<div class="level"><div class="values"><div class="text">Level<\/div><div class="value">(\d+)/)?.[1] ?? '')) || null;
  const rank = Number(text(html.match(/<div class="level"><div class="values"><div class="text">Rank<\/div><div class="value">(\d+)/)?.[1] ?? '')) || null;
  const ability = html.match(/<div class="about ability"><h3>([\s\S]*?)<\/h3><div class="container"><p>([\s\S]*?)<\/p>/);
  const about = html.match(/<div class="about info"><div class="container"><p>([\s\S]*?)<\/p>/);
  return {
    stats: parseStats(html), level, maxLevel, rank,
    ascensionMaterials: parseMaterials(html),
    skill: { name: ability ? text(ability[1]) : null, description: ability ? text(ability[2]) : null },
    about: about ? text(about[1]) : null
  };
}

await mkdir(assetDirectory, { recursive: true });
const currentByName = new Map(currentWeapons.map(weapon => [weapon.name, weapon]));
const listHtml = await (await get(source)).text();
const catalogue = parseCatalogue(listHtml).filter(item => currentByName.has(item.name));
const missing = [...currentByName.keys()].filter(name => !catalogue.some(item => item.name === name));

const weapons = await mapLimit(catalogue, 4, async item => {
  const current = currentByName.get(item.name);
  const pageHtml = await (await get(new URL(item.href, source))).text();
  const details = parseDetails(pageHtml);
  const imageUrl = new URL(item.image, source);
  const imageResponse = await get(imageUrl);
  const contentType = imageResponse.headers.get('content-type') ?? '';
  const extension = contentType.includes('webp') ? 'webp' : contentType.includes('jpeg') ? 'jpg' : 'png';
  const filename = `${current.slug}.${extension}`;
  await writeFile(path.join(assetDirectory, filename), Buffer.from(await imageResponse.arrayBuffer()));
  const ascensionMaterials = details.ascensionMaterials.map(({ name, quantity }) => ({ name, quantity }));
  return {
    id: current.id, slug: current.slug, name: item.name, rarity: item.rarity, type: current.type,
    image: `/assets/weapons/${filename}`, imageSource: imageUrl.href,
    stats: details.stats, level: details.level, maxLevel: details.maxLevel, rank: details.rank,
    ascensionMaterials,
    skill: details.skill, about: details.about, source: new URL(item.href, source).href
  };
});

await writeFile(outputPath, JSON.stringify(weapons, null, 2));
console.log(JSON.stringify({ source, catalogueEntries: parseCatalogue(listHtml).length, matchedWeapons: weapons.length, missingFromReference: missing }, null, 2));
