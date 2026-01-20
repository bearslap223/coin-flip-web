
/**
 * Web Audio API를 사용한 세련된 디지털 펄스 사운드 합성 서비스
 */

let audioCtx: AudioContext | null = null;

const getCtx = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  return audioCtx;
};

/**
 * 브라우저 오디오 정책 해제
 */
export const resumeAudioContext = async () => {
  const ctx = getCtx();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
};

/**
 * 동전 튕기기 (Flip): 세련된 디지털 '휘익-잉' 사운드
 * 에너지가 위로 솟구치는 듯한 주파수 스윕을 사용합니다.
 */
export const playFlipSound = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // 1. 메인 에너지 펄스 (주파수가 빠르게 상승)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine'; // 부드러운 사인파
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(1600, now + 0.3); // 0.3초간 상승
  
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.4);

  // 2. 디지털 '클릭' (튕기는 찰나의 타격감)
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = 'square';
  click.frequency.setValueAtTime(2000, now);
  clickGain.gain.setValueAtTime(0.05, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start(now);
  click.stop(now + 0.02);
};

/**
 * 동전 착지 (Land): 데이터가 고정되는 듯한 묵직하고 깔끔한 '둠-' 사운드
 */
export const playLandSound = () => {
  const ctx = getCtx();
  const now = ctx.currentTime;

  // 1. 저역대 임팩트
  const bass = ctx.createOscillator();
  const bassGain = ctx.createGain();
  bass.type = 'triangle';
  bass.frequency.setValueAtTime(150, now);
  bass.frequency.exponentialRampToValueAtTime(60, now + 0.15);
  
  bassGain.gain.setValueAtTime(0.3, now);
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  
  bass.connect(bassGain);
  bassGain.connect(ctx.destination);
  bass.start(now);
  bass.stop(now + 0.2);

  // 2. 고역대 확인음 (Confirmation Chirp)
  const chirp = ctx.createOscillator();
  const chirpGain = ctx.createGain();
  chirp.type = 'sine';
  chirp.frequency.setValueAtTime(1200, now);
  chirp.frequency.exponentialRampToValueAtTime(800, now + 0.05);
  
  chirpGain.gain.setValueAtTime(0.08, now);
  chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  
  chirp.connect(chirpGain);
  chirpGain.connect(ctx.destination);
  chirp.start(now);
  chirp.stop(now + 0.08);
};
