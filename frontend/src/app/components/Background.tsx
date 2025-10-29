export default function Background() {
  return (
    <div id="background">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i}>
          <span></span>
        </div>
      ))}
    </div>
  );
}
