import './GameGuidePage.css';
import DepthText from '../../DepthText';

const playlistId = 'PLvC_P0eauXFDd8PDt6ahEqPXKMtD8S5Vu';
const exampleVideoId = 'lN9IXcqF09I';

export default function GameGuidePage() {
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
  return <div className="guide-page">
    <section className="guide-hero" aria-labelledby="guide-title">
      <div className="guide-hero__art" aria-hidden="true"><span className="guide-hero__orbit guide-hero__orbit--one" /><span className="guide-hero__orbit guide-hero__orbit--two" /><span className="guide-hero__grid" /></div>
      <div className="guide-hero__copy"><p className="signal">SOLARIS-3 ARCHIVE</p><h1 id="guide-title"><DepthText text="Game" layers={34} depth={2.4} faceColor="#f0fcff" depthColor="#16acff" tilt={7.5} pointerTracking smoothing={0.14} perspective={900} autoOrbit orbitSpeed={0.35} fontSize="inherit" fontWeight={600} shadow /> <em><DepthText text="Guide" layers={34} depth={2.4} faceColor="#9beeff" depthColor="#16acff" tilt={7.5} pointerTracking smoothing={0.14} perspective={900} autoOrbit orbitSpeed={0.35} fontSize="inherit" fontWeight={600} shadow /></em></h1><p className="guide-hero__intro">A field guide to Solaris-3. Explore tutorials, combat systems, Echo tuning, progression, and more.</p><div className="guide-player-frame guide-player-frame--hero"><iframe src={`https://www.youtube-nocookie.com/embed/${exampleVideoId}?list=${playlistId}&rel=0`} title="Solaris-3 Game Guide YouTube playlist" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div></div>
      <span className="guide-hero__index" aria-hidden="true">FIELD NOTES&nbsp; / &nbsp;001</span>
    </section>

  </div>;
}
