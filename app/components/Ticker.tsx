export default function Ticker() {
  const styles = [
    'Coquette',
    'Old Money',
    'Y2K Revival',
    'Villain Era',
    'Mermaidcore',
    'Runway Debut',
    'Thrifted Chic',
    'Avant-Garde',
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {[...styles, ...styles].map((style, idx) => (
          <span key={idx}>
            {style}
            <span className="sparkle">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
