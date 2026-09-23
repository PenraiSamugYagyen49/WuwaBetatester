import { useEffect, useState } from 'react';
import { portraitFiles } from './data/characters';
import './HomeArtPanels.css';

const artFiles = ['1.1.jpg','1.2.jpg','1.3.jpg','1.4.jpg','2.0.png','2.1.jpg','2.2.jpg','2.3.jpg','2.4.jpg','2.5.jpg','2.6.jpg','2.7.jpg','2.8.jpg','3.0.jpg','3.1.jpg','3.2.jpg','3.3.jpg','3.4.jpg','3.4 Cyberpunk.jpg','3.4 Lucy.jpg','3.4 Rebecca.jpg','3.5.jpg','3.6.jpg'];
const artUrl = file => `/art/00%20Version%20Art/${encodeURIComponent(file)}`;

function ArtPanel({ offset, className }) {
  const [index, setIndex] = useState(offset);
  useEffect(() => { const timer = setInterval(() => setIndex(current => (current + 1) % artFiles.length), 6000); return () => clearInterval(timer); }, []);
  return <section className={`home-art-panel ${className}`} aria-hidden="true"><img key={index} src={artUrl(artFiles[index])} alt="" /></section>;
}

function CharacterPanel({ side, offset }) {
  const [index, setIndex] = useState(offset);
  useEffect(() => { const timer = setInterval(() => setIndex(current => (current + 2) % portraitFiles.length), 7000); return () => clearInterval(timer); }, []);
  return <aside className={`home-character home-character--${side}`} aria-hidden="true"><img key={index} src={portraitFiles[index]} alt="" /></aside>;
}

export default function HomeArtPanels() {
  return <div className="home-art-panels"><CharacterPanel side="left" offset={0}/><ArtPanel className="home-art-panel--hero" offset={0}/><CharacterPanel side="right" offset={1}/></div>;
}
