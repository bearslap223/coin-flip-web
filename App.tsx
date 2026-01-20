
import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { FlipHistory } from './types';
import Coin3D from './components/Coin3D';
import { playFlipSound, playLandSound, resumeAudioContext } from './services/audioService';

const App: React.FC = () => {
  const [headsLabel, setHeadsLabel] = useState('GOLDEN CROWN');
  const [tailsLabel, setTailsLabel] = useState('SILVER EAGLE');
  const [history, setHistory] = useState<FlipHistory[]>([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastResult, setLastResult] = useState<'Heads' | 'Tails' | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  const handleFlip = useCallback(async () => {
    if (isFlipping) return;
    
    await resumeAudioContext();
    playFlipSound();

    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const label = result === 'Heads' ? headsLabel : tailsLabel;
    
    setLastResult(result);
    setIsFlipping(true);
    
    // 숨겨진 상태에서 플립하면 UI가 방해되지 않도록 유지
    
    setTimeout(() => {
      setIsFlipping(false);
      playLandSound();
      
      const newHistory: FlipHistory = {
        id: Date.now().toString(),
        result,
        label,
        timestamp: Date.now(),
      };
      setHistory(prev => [newHistory, ...prev].slice(0, 10));
    }, 2500); 
  }, [isFlipping, headsLabel, tailsLabel]);

  return (
    <div className="fixed inset-0 bg-[#020205] text-slate-200 overflow-hidden font-sans select-none">
      {/* Aurora Background */}
      <div className="aurora-container">
        <div className="aurora-layer bg-gradient-to-tr from-[#312e81] via-[#4c1d95] to-transparent opacity-60"
             style={{ animation: 'aurora-storm-1 18s infinite linear' }} />
        <div className="aurora-layer bg-gradient-to-bl from-[#064e3b] via-[#10b981] to-transparent opacity-50"
             style={{ animation: 'aurora-storm-2 22s infinite linear' }} />
        <div className="aurora-layer bg-[radial-gradient(circle_at_center,#2dd4bf,transparent)] opacity-40"
             style={{ animation: 'aurora-storm-3 12s infinite ease-in-out' }} />
        <div className="aurora-layer bg-gradient-to-r from-[#1e3a8a] to-transparent opacity-30"
             style={{ animation: 'aurora-storm-1 25s infinite reverse linear' }} />
      </div>

      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-8, 5, -2]} intensity={2.5} color="#10b981" />
          <pointLight position={[8, -5, 2]} intensity={1.5} color="#8b5cf6" />
          
          <Suspense fallback={null}>
            <Coin3D 
              isFlipping={isFlipping} 
              result={lastResult} 
              headsLabel={headsLabel} 
              tailsLabel={tailsLabel} 
              hasFlipped={history.length > 0}
            />
            <Environment preset="city" />
            <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={15} blur={2.5} far={4} />
          </Suspense>
        </Canvas>
      </div>

      {/* Header - 메뉴 버튼 lg 미만에서 노출 */}
      <nav className={`absolute top-0 w-full h-14 lg:h-16 border-b border-white/5 bg-black/30 backdrop-blur-2xl flex items-center justify-between px-6 lg:px-8 z-50 transition-opacity duration-700 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center font-black text-slate-900 text-[10px] lg:text-xs shadow-lg">CF</div>
          <h1 className="font-black tracking-tighter text-sm lg:text-lg bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-600 uppercase">
            Coin Master Pro
          </h1>
        </div>
        <button 
          onClick={() => setShowConfig(!showConfig)}
          className="lg:hidden p-2 text-slate-400 hover:text-white pointer-events-auto transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showConfig ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </nav>

      <main className="relative z-10 w-full h-full pointer-events-none">
        {/* Settings Panel - lg 미만에서는 showConfig가 true일 때만 노출 */}
        <aside className={`absolute left-4 right-4 lg:left-8 lg:right-auto top-20 lg:top-24 lg:w-72 pointer-events-auto transition-all duration-500 ease-in-out z-40 
          ${isFlipping ? 'opacity-0 -translate-y-4 lg:-translate-x-[120%]' : 'opacity-100 translate-y-0'} 
          ${!showConfig ? 'max-lg:hidden' : 'block'}`}>
          <div className="bg-slate-900/60 backdrop-blur-2xl p-5 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] border border-white/10 shadow-2xl">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center">
              <span className="w-3 h-[1px] bg-slate-700 mr-2" /> Settings
            </h2>
            <div className="space-y-4">
              <div className="space-y-1 lg:space-y-2">
                <label className="text-[9px] font-bold text-amber-500 uppercase tracking-widest px-1">Heads Text</label>
                <input
                  type="text"
                  value={headsLabel}
                  onChange={(e) => setHeadsLabel(e.target.value)}
                  maxLength={15}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 lg:py-3 text-xs text-white focus:border-amber-500 outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-1 lg:space-y-2">
                <label className="text-[9px] font-bold text-blue-400 uppercase tracking-widest px-1">Tails Text</label>
                <input
                  type="text"
                  value={tailsLabel}
                  onChange={(e) => setTailsLabel(e.target.value)}
                  maxLength={15}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 lg:py-3 text-xs text-white focus:border-blue-500 outline-none transition-all font-bold"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* History Panel - lg 미만에서는 showConfig가 true일 때 Settings 아래에 노출 */}
        <aside className={`absolute left-4 right-4 lg:left-auto lg:right-8 top-[380px] lg:top-24 lg:w-72 pointer-events-auto transition-all duration-700 ease-in-out z-30
          ${isFlipping ? 'opacity-0 translate-y-4 lg:translate-x-[120%]' : 'opacity-100 translate-y-0'}
          ${!showConfig ? 'max-lg:hidden' : 'block'}`}>
          <div className="lg:h-[calc(100vh-200px)] max-h-[300px] lg:max-h-none bg-slate-900/60 backdrop-blur-2xl p-5 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 flex items-center">
              <span className="w-3 h-[1px] bg-slate-700 mr-2" /> Recent Tosses
            </h2>
            <div className="flex-1 space-y-2 lg:space-y-3 overflow-y-auto pr-1 custom-scrollbar">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-[9px] font-black uppercase tracking-widest text-center py-4">
                  No History
                </div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="bg-black/40 p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-white/5 flex justify-between items-center animate-fadeIn shadow-inner">
                    <div className="min-w-0 flex-1">
                      <p className={`text-[10px] lg:text-[12px] font-black ${item.result === 'Heads' ? 'text-amber-500' : 'text-blue-500'}`}>
                        {item.result.toUpperCase()}
                      </p>
                      <p className="text-[8px] lg:text-[9px] text-slate-400 font-bold truncate pr-2 uppercase">{item.label}</p>
                    </div>
                    <span className="text-[7px] lg:text-[8px] font-mono text-slate-700 shrink-0 ml-2">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Action Button Layer */}
        <div className={`absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-[280px] lg:max-w-xs px-4 pointer-events-auto transition-all duration-700 ${isFlipping ? 'opacity-0 translate-y-20 scale-90' : 'opacity-100 translate-y-0 scale-100'}`}>
          <button
            onClick={handleFlip}
            disabled={isFlipping}
            className="w-full py-4 lg:py-5 bg-white text-black hover:bg-emerald-400 rounded-full text-base lg:text-lg font-black tracking-[0.3em] shadow-[0_20px_50px_rgba(16,185,129,0.2)] active:scale-[0.95] transition-all uppercase"
          >
            Flip
          </button>
        </div>
      </main>

      <footer className="absolute bottom-3 w-full flex items-center justify-center text-[7px] lg:text-[8px] text-slate-800 font-mono tracking-[0.4em] lg:tracking-[0.6em] uppercase pointer-events-none">
        Performance.Active // Floating.Active // v5.1
      </footer>
    </div>
  );
};

export default App;
