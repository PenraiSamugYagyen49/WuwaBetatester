import './GameGuidePage.css';

const playlistId = 'PLvC_P0eauXFDd8PDt6ahEqPXKMtD8S5Vu';
const exampleVideoId = 'lN9IXcqF09I';

export default function GameGuidePage() {
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
  return <div className="guide-page">
    <section className="guide-hero" aria-labelledby="guide-title">
      <div className="guide-hero__art" aria-hidden="true"><span className="guide-hero__orbit guide-hero__orbit--one" /><span className="guide-hero__orbit guide-hero__orbit--two" /><span className="guide-hero__grid" /></div>
      <div className="guide-hero__copy"><p className="signal">SOLARIS-3 ARCHIVE</p><h1 id="guide-title">Game <em>Guide</em></h1><p className="guide-hero__intro">A field guide to Solaris-3. Explore tutorials, combat systems, Echo tuning, progression, and more.</p><a className="guide-link" href="#guide-archive">EXPLORE THE ARCHIVE <span aria-hidden="true">↓</span></a></div>
      <span className="guide-hero__index" aria-hidden="true">FIELD NOTES&nbsp; / &nbsp;001</span>
    </section>
    <section className="guide-archive" id="guide-archive" aria-labelledby="guide-archive-title">
      <div className="guide-archive__heading"><div><p className="signal">TRANSMISSION LIBRARY&nbsp; / &nbsp;SOLARIS-3</p><h2 id="guide-archive-title">Video <em>Archive</em></h2></div><a className="guide-playlist-link" href={playlistUrl} target="_blank" rel="noreferrer">OPEN PLAYLIST ON YOUTUBE <span aria-hidden="true">↗</span></a></div>
      <div className="guide-archive__layout"><div className="guide-player-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${exampleVideoId}?list=${playlistId}&rel=0`} title="Solaris-3 Game Guide YouTube playlist" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
        <aside className="guide-archive__meta"><p className="guide-archive__eyebrow">ARCHIVE&nbsp; / &nbsp;PLAYLIST</p><h3>Field Guide<br />Transmissions</h3><p className="guide-archive__description">Watch the source playlist directly. Video titles and details are provided by YouTube.</p><div className="guide-archive__status"><span aria-hidden="true" /> PLAYLIST EMBED&nbsp; / &nbsp;CONNECTED</div><a href={playlistUrl} target="_blank" rel="noreferrer">VIEW ON YOUTUBE <span aria-hidden="true">↗</span></a></aside>
      </div><p className="guide-archive__note">Playlist content is loaded from YouTube. If playback is unavailable, open the playlist directly.</p>
    </section>
  </div>;
}
