"use client";
export default function Loading() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ height: 6, background: 'linear-gradient(90deg, #eee, #ddd, #eee)', borderRadius: 3, animation: 'pulse 1.2s infinite' }} />
      <style jsx>{`
        @keyframes pulse { 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }
      `}</style>
    </div>
  );
}
