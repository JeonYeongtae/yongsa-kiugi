import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useGame } from '../context/GameContext';
import Header from '../components/Header';
import Nav from '../components/Nav';

// ── 스토리 비트 ─────────────────────────────────────────────────
const BEATS = [
  // ── 1막: 마을 경계
  { type: 'image', label: '엘프 마을 입구' },
  { type: 'narration', content: '나뭇잎이 겹겹이 드리운 오솔길이 끝나는 곳에, 당신의 발걸음이 멈췄다.\n살아 있는 나무들이 서로 뒤엉켜 만든 문이 보인다. 문이라기보다는 의지처럼, 마치 숲이 스스로 길을 열어준 것 같은 형상이다. 그 너머로 크고 작은 집들이 나뭇가지 위에, 또는 거대한 뿌리 사이에 자리를 잡고 있다.' },
  { type: 'narration', content: '공기가 달라진다. 짙은 수목 향기 사이로, 무언가 설명하기 어려운 고요함이 스며든다. 이 마을은 단순히 오래된 것이 아니라, 오래된 것들이 아직도 살아 숨쉬는 곳처럼 느껴진다.' },
  { type: 'dialogue', speaker: '경비 엘프', content: '"멈춰라."' },
  { type: 'narration', content: '낮고 날카로운 목소리가 공기를 가른다. 나뭇가지 사이에서 모습을 드러낸 두 명의 엘프가 당신 앞을 막아선다. 그들의 손에는 활이 들려 있고, 시위는 팽팽히 당겨진 채다.' },
  { type: 'dialogue', speaker: '경비 엘프', content: '"이 마을은 외부인에게 열려 있지 않아. 어떻게 숲의 경계를 넘어온 거지? 당장 이름과 용건을 밝혀."' },
  { type: 'narration', content: '당신은 차분하게 이곳을 찾아온 이유를 설명하려 한다.\n하지만 당신의 말이 채 이어지기도 전에, 발밑에서 작고 고운 빛들이 피어오르기 시작한다.' },
  { type: 'image', label: '정령 등장' },
  { type: 'narration', content: '빛들은 나비처럼 날개를 가진 것도, 별처럼 형태가 고정된 것도 아니다. 그저 빛이라고밖에 부를 수 없는 존재들이 당신의 어깨 주변을 천천히 맴돌며 흩어졌다 모인다.' },
  { type: 'dialogue', speaker: '경비 엘프', content: '"... 정령들이." (낮게 중얼거리며) "이방인 주변에서 정령이 반응을 보이는 건 처음 보는군."' },
  { type: 'dialogue', speaker: '동료 경비 엘프', content: '"정령들이 해를 끼치지 않는다는 뜻이잖아. 우리 선에서 판단할 상황이 아닌 것 같은데."' },
  { type: 'dialogue', speaker: '경비 엘프', content: '"... 알았어. 따라와. 장로님께 데려가겠다."' },

  // ── 씬 전환
  { type: 'scene', label: '마을 중심부' },

  // ── 2막: 장로와의 만남
  { type: 'image', label: '엘프 마을 중심부' },
  { type: 'narration', content: '마을 중심부로 향하는 동안, 당신은 조용히 주변을 둘러본다. 나무 위에서 생활하는 엘프들, 빛을 다루는 것처럼 보이는 작업을 하는 이들, 그리고 이방인인 당신을 바라보는 수많은 시선들.' },
  { type: 'narration', content: '가장 오래된 나무 아래, 나무의 뿌리가 자연스럽게 만들어낸 자리에 한 노인이 앉아 있다. 주름진 얼굴 위에서 두 눈이 고요하고 깊게 빛난다.' },
  { type: 'dialogue', speaker: '장로', content: '"어서오게나. 정령들이 이끌어온 손님이라니, 예사로운 인연은 아닌 것 같군."' },
  { type: 'narration', content: '당신은 장로에게 이곳에 온 연유를 간략하게 전한다. 장로는 말없이 듣다가, 한참 후에야 천천히 고개를 든다.' },
  { type: 'dialogue', speaker: '장로', content: '"그렇구나... 그렇다면, 자네가."' },
  { type: 'dialogue', speaker: '장로', content: '"마을을 해치지 않겠다는 것, 정령들이 이미 말해준 것 같으니. 마을 안에서 자유롭게 다녀도 좋네. 단, 나무 위 제사 구역만큼은 우리만의 장소이니 양해를 부탁하네."' },
  { type: 'narration', content: '장로는 조용히 고개를 끄덕이고, 경비 엘프에게 눈짓을 보낸다.' },
  { type: 'dialogue', speaker: '경비 엘프', content: '"장로님의 뜻대로. 이방인, 이제 마을 안에서는 자유롭게 다녀도 좋아. 제사 구역 외에는."' },
  { type: 'narration', content: '이제 용사는 엘프 마을 안에서 자유롭게 활동할 수 있게 되었다.' },
  { type: 'end' },
];

// ── 타이핑 블록 ─────────────────────────────────────────────────
const TypingBlock = forwardRef(function TypingBlock({ beat, fast, onDone }, ref) {
  const [displayText, setDisplayText] = useState('');
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);
  const fullText = beat.content ?? '';

  useImperativeHandle(ref, () => ({
    skip() {
      clearInterval(intervalRef.current);
      setDisplayText(fullText);
      setDone(true);
      onDone?.();
    },
  }), [fullText, onDone]);

  useEffect(() => {
    let idx = 0;
    const speed = fast ? 15 : 35;
    intervalRef.current = setInterval(() => {
      idx++;
      setDisplayText(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(intervalRef.current);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(intervalRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullText, fast]);

  if (beat.type === 'dialogue') {
    return (
      <div className="px-4 pt-3 pb-1 flex-shrink-0">
        <div className="text-[7px] font-bold text-amber-600 mb-0.5">{beat.speaker}</div>
        <p className="text-[8.5px] text-stone-700 leading-[1.7]" style={{ whiteSpace: 'pre-line' }}>
          {displayText}
          {!done && <span className="animate-pulse text-stone-400">▌</span>}
        </p>
        {done && <span className="animate-pulse text-stone-400 text-[8px]">▼</span>}
      </div>
    );
  }

  return (
    <div className="px-4 pt-3 pb-1 flex-shrink-0">
      <p className="text-[8.5px] text-stone-700 leading-[1.7]" style={{ whiteSpace: 'pre-line' }}>
        {displayText}
        {!done && <span className="animate-pulse text-stone-400">▌</span>}
      </p>
      {done && <span className="animate-pulse text-stone-400 text-[8px]">▼</span>}
    </div>
  );
});

// ── 이미 지나간 블록 (완성 상태) ────────────────────────────────
function DoneBlock({ beat }) {
  if (beat.type === 'image') {
    return (
      <div className="mx-4 my-2 bg-stone-300 rounded flex items-center justify-center flex-shrink-0 text-[8px] text-stone-500" style={{ aspectRatio: '4/3' }}>
        {beat.label}
      </div>
    );
  }
  if (beat.type === 'scene') {
    return (
      <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0">
        <div className="flex-1 h-px bg-stone-300" />
        <span className="text-[7px] text-stone-400 tracking-wider">{beat.label}</span>
        <div className="flex-1 h-px bg-stone-300" />
      </div>
    );
  }
  if (beat.type === 'dialogue') {
    return (
      <div className="px-4 pt-3 pb-1 flex-shrink-0">
        <div className="text-[7px] font-bold text-amber-600 mb-0.5">{beat.speaker}</div>
        <p className="text-[8.5px] text-stone-700 leading-[1.7]" style={{ whiteSpace: 'pre-line' }}>{beat.content}</p>
      </div>
    );
  }
  // narration
  return (
    <div className="px-4 pt-3 pb-1 flex-shrink-0">
      <p className="text-[8.5px] text-stone-700 leading-[1.7]" style={{ whiteSpace: 'pre-line' }}>{beat.content}</p>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function ElfVillageIntroScreen() {
  const { navigate } = useGame();

  const [beatIdx, setBeatIdx]         = useState(0);
  const [revealed, setRevealed]       = useState([]);
  const [typingDone, setTypingDone]   = useState(false);
  const [fast, setFast]               = useState(false);
  const [ended, setEnded]             = useState(false);

  const scrollRef  = useRef(null);
  const typingRef  = useRef(null);

  // 자동 스크롤
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [revealed.length, typingDone]);

  // 즉시 출력 비트 (image, scene) 자동 연속 처리
  const advanceBeat = useCallback((fromIdx, fromRevealed) => {
    let i = fromIdx;
    let r = fromRevealed;

    // image / scene 는 자동 출력 후 계속 진행
    while (i < BEATS.length) {
      const beat = BEATS[i];
      if (beat.type === 'image' || beat.type === 'scene') {
        r = [...r, { ...beat, uid: i }];
        i++;
      } else {
        break;
      }
    }

    setBeatIdx(i);
    setRevealed(r);

    if (i >= BEATS.length) { setEnded(true); setTypingDone(true); return; }

    const next = BEATS[i];
    if (next.type === 'end') { setEnded(true); setTypingDone(true); return; }

    // narration / dialogue → 타이핑 블록 추가
    setRevealed([...r, { ...next, uid: i }]);
    setBeatIdx(i + 1);
    setTypingDone(false);
  }, []);

  // 첫 비트 자동 시작
  useEffect(() => {
    advanceBeat(0, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTap = () => {
    if (ended) return;
    if (!typingDone) {
      typingRef.current?.skip();
      return;
    }
    advanceBeat(beatIdx, revealed);
  };

  // 마지막 비트 (타이핑 중인 것)
  const lastBeat = revealed[revealed.length - 1];
  const donBeats = typingDone ? revealed : revealed.slice(0, -1);
  const currentBeat = (!typingDone && lastBeat) ? lastBeat : null;

  const total  = BEATS.filter(b => b.type !== 'image' && b.type !== 'scene' && b.type !== 'end').length;
  const done   = revealed.filter(b => b.type !== 'image' && b.type !== 'scene').length;
  const pct    = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <>
      <Header showEnergy />
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* 타이틀 바 */}
        <div className="relative flex items-center px-3 h-6 bg-stone-200 border-b border-stone-300 flex-shrink-0">
          <button onClick={() => navigate('world-map')} className="text-[13px] text-stone-500 font-bold pr-3">‹</button>
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-stone-600">
            아피카르 첫 입장
          </span>
        </div>

        {/* 스크롤 피드 */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-stone-100 select-none flex flex-col pb-4"
          onClick={handleTap}
        >
          {/* 완료된 비트들 */}
          {donBeats.map(beat => (
            <DoneBlock key={beat.uid} beat={beat} />
          ))}

          {/* 현재 타이핑 중인 비트 */}
          {currentBeat && (
            <TypingBlock
              key={currentBeat.uid}
              ref={typingRef}
              beat={currentBeat}
              fast={fast}
              onDone={() => setTypingDone(true)}
            />
          )}

          {/* 완료 후 진행 안내 */}
          {ended && (
            <div className="px-4 pt-5 pb-2 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-stone-300" />
                <span className="text-[7px] text-stone-400 tracking-widest">끝</span>
                <div className="flex-1 h-px bg-stone-300" />
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate('exploration-action'); }}
                className="text-left py-2.5 text-[9px] text-stone-700 font-medium active:text-amber-700 transition-colors"
              >
                <span className="mr-2 text-stone-400">✦</span>엘프 마을 입장
              </button>
            </div>
          )}
        </div>

        {/* 우측 하단 플로팅 원형 버튼 */}
        <div className="absolute bottom-2 right-2.5 flex flex-col gap-1 z-10">
          <button
            onClick={e => { e.stopPropagation(); navigate('exploration-action'); }}
            className="w-6 h-6 rounded-full bg-slate-600 text-white text-[5px] font-bold flex items-center justify-center shadow"
          >
            Skip
          </button>
          <button
            onClick={e => { e.stopPropagation(); setFast(f => !f); }}
            className={`w-6 h-6 rounded-full text-[6px] font-bold flex items-center justify-center shadow ${fast ? 'bg-amber-400 text-slate-800' : 'bg-slate-600 text-white'}`}
          >
            ×2
          </button>
        </div>

      </div>
      <Nav />
    </>
  );
}
