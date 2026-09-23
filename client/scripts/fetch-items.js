/*
 * Source: https://wuthering.gg/items (community game database).
 * This script downloads the visible item catalogue and its matching page icons.
 * Wuthering Waves assets remain property of their respective rights holders.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dataPath = path.join(root, 'src', 'data', 'items.json');
const assetDir = path.join(root, 'public', 'assets', 'items');
const pages = 15;
const normalize = text => text.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const slugify = text => normalize(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

async function readPage(page) {
  const response = await fetch(`https://wuthering.gg/items${page === 1 ? '' : `?page=${page}`}`);
  if (!response.ok) throw new Error(`items page ${page}: ${response.status}`);
  return response.text();
}

function parseItems(html) {
  const items = [];
  const pattern = /<tr[^>]*>\s*<td>\s*<img[^>]*?(?:srcset|src)="(?<image>[^"]+)"[^>]*?alt="(?<imageName>[^"]+)"[^>]*>\s*<\/td>\s*<td><div class="name quality(?<rarity>\d+)">(?<title>[\s\S]*?)<\/div><div class="subtypes">(?<type>[\s\S]*?)<\/div><\/td>\s*<td class="description">(?<description>[\s\S]*?)<\/td>\s*<\/tr>/g;
  for (const match of html.matchAll(pattern)) {
    const name = normalize(match.groups.title || match.groups.imageName);
    const type = normalize(match.groups.type);
    const description = normalize(match.groups.description);
    const rawImage = match.groups.image.split(' ')[0].replace(/&amp;/g, '&');
    if (!name || !rawImage) continue;
    const category = /Currency|Token|EXP|Potion|Consumable/.test(type) ? 'Supplies' : /Echo/.test(type) ? 'Echo Materials' : /Weapon|Skill|Ascension|Resonator/.test(type) ? 'Development Materials' : /Quest|Mission/.test(type) ? 'Missions' : 'Resources';
    items.push({ id: slugify(name), name, slug: slugify(name), description: description || null, category, type: type || null, rarity: Number(match.groups.rarity) || null, image: `/assets/items/${slugify(name)}.png`, imageSource: rawImage, imageStatus: 'pending' });
  }
  return items;
}

async function download(item) {
  const source = new URL(item.imageSource, 'https://wuthering.gg').href;
  const response = await fetch(source);
  if (!response.ok) throw new Error(String(response.status));
  const type = response.headers.get('content-type') || '';
  const extension = type.includes('webp') ? 'webp' : type.includes('jpeg') ? 'jpg' : 'png';
  const file = `${item.slug}.${extension}`;
  await writeFile(path.join(assetDir, file), Buffer.from(await response.arrayBuffer()));
  item.image = `/assets/items/${file}`;
  item.imageStatus = 'verified';
}

await mkdir(assetDir, { recursive: true });
const records = new Map();
for (let page = 1; page <= pages; page += 1) for (const item of parseItems(await readPage(page))) records.set(item.slug, item);
const items = [...records.values()];
const missingImages = [];
for (const item of items) { try { await download(item); } catch { item.image = null; item.imageStatus = 'missing'; missingImages.push(item.name); } delete item.imageSource; }
const report = { source: 'https://wuthering.gg/items', totalItems: items.length, itemsWithImages: items.length - missingImages.length, missingImages: missingImages.length, missingImageNames: missingImages, duplicates: 0 };
await writeFile(dataPath, JSON.stringify(items, null, 2));
await writeFile(path.join(root, 'src', 'data', 'items-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
