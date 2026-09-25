import DepthText from '../DepthText';

export default function ArchiveDepthTitle({ firstLine, secondLine, className = '' }) {
  return <h1 className={className}>
    <DepthText text={firstLine} layers={34} depth={2.4} faceColor="#f0fcff" depthColor="#16acff" tilt={7.5} pointerTracking smoothing={0.14} perspective={900} autoOrbit orbitSpeed={0.35} fontSize="inherit" fontWeight={600} shadow />
    {secondLine && <><br /><DepthText text={secondLine} layers={34} depth={2.4} faceColor="#f0fcff" depthColor="#16acff" tilt={7.5} pointerTracking smoothing={0.14} perspective={900} autoOrbit orbitSpeed={0.35} fontSize="inherit" fontWeight={600} shadow /></>}
  </h1>;
}
