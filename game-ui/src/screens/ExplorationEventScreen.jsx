import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useGame } from '../context/GameContext';
import Header from '../components/Header';
import Nav from '../components/Nav';

// ── 이벤트 스크립트 ─────────────────────────────────────────────

const RECRUIT_EVENT = {
  title: '엘프 마을 — 시장',
  beats: [
    { type: 'image', label: '엘프 마을 시장' },
    { type: 'narration', content: '다양한 종족이 혼재하는 시장에는 언제나처럼 많은 이들이 발걸음을 하고 있습니다.\n\n인파 속에서 길을 잡으려던 당신의 시선에 문득 한 명의 청년이 들어옵니다. 당신의 이목을 끄는 건 그의 등 뒤에 달린 거대한 대검입니다.' },
    { type: 'narration', content: '보통의 전사들이 한 손에 사용한다고 들었을 만큼, 당신은 눈앞의 전사가 이마이마한 괴력을 가지는 게 아닐까 생각합니다.\n\n당신이 쳐다보는 사이 눈치챈지 한참 가게에서 무기를 둘러보던 전사가 고개를 돌려 당신을 바라봅니다.' },
    { type: 'dialogue', speaker: '???', content: '"어? 뭐야, 청량한 기운이 느껴져서 잠깐 눈이 돌아온 줄 알았는데. 인간이 있었구나!"' },
    { type: 'narration', content: '빤히 쳐다본 당신을 무로서는 별 경계심이라곤 전혀 찾아볼 수 없는 활한 미소를 지으며 당신에게 한 걸음 다가옵니다.\n\n등 뒤의 거대한 대검이 그의 움직임에 맞춰 묵직한 소리를 내며 흔들립니다.' },
    { type: 'choice', options: [
      {
        label: '인사한다',
        beats: [
          { type: 'narration', content: '당신은 미지의 이방인인 상대에게 예의를 갖추어 고개를 숙여 인사합니다.' },
          { type: 'dialogue', speaker: '영아', content: '"신경쓰지마, 사실이니까. 반가워, 난 영아라고 해."' },
          { type: 'system', label: '영아의 정보가 추가되었습니다.' },
        ],
      },
      {
        label: '무기에 대한 이야기를 한다',
        beats: [
          { type: 'narration', content: '당신은 영아의 무기를 보며 이야기를 꺼냅니다.' },
          { type: 'dialogue', speaker: '영아', content: '"하하! 그래? 용사들은 보통 한 손에 다루지만, 난 그것보다 대검이 더 멋있다고 생각하거든. 반가워, 난 영아라고 해."' },
          { type: 'system', label: '영아의 정보가 추가되었습니다.' },
        ],
      },
    ]},
    { type: 'narration', content: '영아는 당신과의 짧은 만남이 즐거운 듯 씩씩하게 웃고는 자리를 뜹니다.\n\n당신은 인파 속으로 사라져 가는 거대한 것을 멀지 않아 다시 마주치게 될 것 같다는 묘한 예감을 느낍니다.' },
    { type: 'end' },
  ],
};

const ITEM_EVENT = {
  title: '엘프 마을 — 유적 부근',
  beats: [
    { type: 'image', label: '이름모를 유적' },
    { type: 'narration', content: '마을 외곽 유적 부근을 탐색하던 중, 낡은 돌바닥에 무언가 반짝이는 것을 발견합니다.\n\n바닥에 쓰러져 있는 거대한 거체와 그 존재가 남긴 그림자들이 흩어지고 있습니다.' },
    { type: 'dialogue', speaker: '이름모를 존재', content: '"부탁해.. 너라도 있었다면 이 땅을 막아줄 수 있었을 거야.."' },
    { type: 'narration', content: '피를 토하며 최후를 맞이하던 그 존재가 힘없이 쓰러지고, 얼마 후 신체는 먼지가 되어 사라졌습니다.' },
    { type: 'image', label: '땅에서 빛나는 조각' },
    { type: 'narration', content: '그 자리를 떠나려던 때, 존재가 사라진 곳에 무언가 반짝이는 것이 눈에 들어옵니다.\n\n다가가 살펴보니 빛이 되는 어떤 조각입니다. 하나로 보기엔 범상치 않아 보이는 그것에서 손에 잡힐 듯 강렬한 힘이 느껴집니다.' },
    { type: 'dialogue', speaker: '동료(임시)', content: '"..조각? 이거.. 범상치 않아 보이는데? 이런 걸 함부로 건드려도 되는 거 맞아?"' },
    { type: 'choice', options: [
      {
        label: '건드려본다',
        beats: [
          { type: 'narration', content: '당신은 조심스레 그 조각을 향해 손을 뻗습니다.\n\n당신의 손이 조각에 닿자, 조각은 엄청난 빛의 형태를 변화해 무구가 되어 하공에 떠오릅니다.' },
          { type: 'choice', options: [
            {
              label: '무력으로 뽑아낸다',
              beats: [
                { type: 'narration', content: '당신은 떠오른 무구를 향해 힘껏 손을 뻗어 잡아당깁니다.\n\n무구는 엄청난 빛을 내뿜으며 마치 당신을 기다렸다는 듯 당신의 손 위에 천천히 내려옵니다.\n\n당신은 {해당 무기 이름}을 손에 넣었습니다!' },
                { type: 'system', label: '무기 아이템이 추가되었습니다.' },
              ],
            },
            {
              label: '조심스럽게 기도를 올린다',
              beats: [
                { type: 'narration', content: '당신은 두 손을 모아 무구를 향해 조심스럽게 기도를 올립니다.\n\n무구는 당신의 진심에 답하듯 부드럽게 당신의 손 위에 안착합니다.\n\n당신은 {해당 무기 이름}을 손에 넣었습니다!' },
                { type: 'system', label: '무기 아이템이 추가되었습니다.' },
              ],
            },
          ]},
        ],
      },
    ]},
    { type: 'end' },
  ],
};

const RECRUIT2_EVENT = {
  title: '엘프 마을 — 광장',
  beats: [
    { type: 'image', label: '엘프 마을 광장' },
    { type: 'narration', content: '마을 광장을 거닐던 당신의 시선에 낯익은 거대한 대검이 들어옵니다.\n\n아까 시장에서 마주쳤던 그 청년, 영아입니다. 혼자서 장비를 점검하고 있습니다.' },
    { type: 'narration', content: '영아는 당신이 데리고 있는 파티장과 든든한 동료들의 여행 짐을 번갈아 보더니, 이내 장난기 어린 미소를 지으며 대검을 어깨에 짊어집니다.' },
    { type: 'dialogue', speaker: '영아', content: '"이라, 다시 만났다! 그 넓이... 하하, 딱 보니까 알겠다. 나 같이 더 넓은 세상을 보러 가고 싶은 거지?"' },
    { type: 'choice', options: [
      {
        label: '묵직한 금화 주머니를 내밀며 고개를 끄덕인다',
        beats: [
          { type: 'narration', content: '당신은 금화 주머니를 건네며 모험을 함께할 동료를 원한다고 설명합니다.' },
          { type: 'dialogue', speaker: '영아', content: '"뭔가 큰 목적이라도 있는 거야? 좋아! 내 덩치 실력을 키우기 위해선 더 다양한 실전이 필요하거든!"' },
          { type: 'system', label: '영아가 동료로 합류했습니다.' },
        ],
      },
      {
        label: '자신의 무기를 꼭 쥐며 결연한 의지를 보여준다',
        beats: [
          { type: 'narration', content: '당신은 무기를 고쳐 쥐며 눈빛으로 영아를 바라보며 함께하고 싶다는 의지를 전합니다.' },
          { type: 'dialogue', speaker: '영아', content: '"하하하! 눈빛이 정말 좋은걸? 좋아, 앞으로 잘 부탁할게!"' },
          { type: 'system', label: '영아가 동료로 합류했습니다.' },
        ],
      },
    ]},
    { type: 'narration', content: '영아는 씩씩하게 웃으며 당신의 곁으로 자리를 옮깁니다.\n\n든든한 동료가 생겼습니다.' },
    { type: 'end' },
  ],
};

export const EXPLORATION_EVENTS = {
  recruit:  RECRUIT_EVENT,
  item:     ITEM_EVENT,
  explore:  RECRUIT2_EVENT,
};

// ── TypingBlock ─────────────────────────────────────────────────
const TypingBlock = forwardRef(function TypingBlock({ beat, fast, onDone }, ref) {
  const [display, setDisplay] = useState('');
  const [done, setDone]       = useState(false);
  const timerRef              = useRef(null);
  const full                  = beat.content ?? '';

  useImperativeHandle(ref, () => ({
    skip() {
      clearInterval(timerRef.current);
      setDisplay(full);
      setDone(true);
      onDone?.();
    },
  }), [full, onDone]);

  useEffect(() => {
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setDisplay(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(timerRef.current);
        setDone(true);
        onDone?.();
      }
    }, fast ? 15 : 35);
    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full, fast]);

  return (
    <div className="px-4 pt-3 pb-1 flex-shrink-0">
      {beat.type === 'dialogue' && (
        <div className="text-[7px] font-bold text-amber-600 mb-0.5">{beat.speaker}</div>
      )}
      <p className="text-[8.5px] text-stone-700 leading-[1.7]" style={{ whiteSpace: 'pre-line' }}>
        {display}
        {!done && <span className="animate-pulse text-stone-400">▌</span>}
      </p>
      {done && <span className="animate-pulse text-stone-400 text-[8px]">▼</span>}
    </div>
  );
});

// ── 완료된 블록 렌더링 ──────────────────────────────────────────
function DoneBlock({ beat }) {
  if (beat.type === 'image') {
    return (
      <div className="mx-4 my-3 bg-stone-300 rounded flex items-center justify-center flex-shrink-0 text-[8px] text-stone-500" style={{ aspectRatio: '4/3' }}>
        {beat.label}
      </div>
    );
  }
  if (beat.type === 'system') {
    const items = beat.label.split('\n').filter(Boolean);
    return (
      <div className="px-4 pt-2 pb-1 flex-shrink-0">
        <div className="text-[8px] font-bold text-green-700 mb-0.5">〈결과〉</div>
        {items.map((item, i) => (
          <div key={i} className="text-[8px] text-green-700 leading-snug">+ {item}</div>
        ))}
      </div>
    );
  }
  if (beat.type === 'choice-made') {
    return (
      <div className="px-4 pt-2 pb-1 flex-shrink-0">
        <p className="text-[8px] text-stone-400 leading-tight">✦ {beat.label}</p>
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
  return (
    <div className="px-4 pt-3 pb-1 flex-shrink-0">
      <p className="text-[8.5px] text-stone-700 leading-[1.7]" style={{ whiteSpace: 'pre-line' }}>{beat.content}</p>
    </div>
  );
}

// ── 선택지 블록 ─────────────────────────────────────────────────
function ChoiceBlock({ beat, onSelect }) {
  return (
    <div className="px-4 pt-3 pb-2 flex-shrink-0">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 h-px bg-stone-300" />
        <span className="text-[7px] text-stone-400 tracking-widest">{beat.options.length}</span>
        <div className="flex-1 h-px bg-stone-300" />
      </div>
      <div className="flex flex-col">
        {beat.options.map((opt, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); onSelect(beat.uid, opt); }}
            className="text-left py-2.5 text-[9px] text-stone-700 font-medium active:text-amber-700 transition-colors"
          >
            <span className="mr-2 text-stone-400">✦</span>{opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ───────────────────────────────────────────────
export default function ExplorationEventScreen() {
  const { navigate, currentExplorationEvent } = useGame();

  const eventDef = EXPLORATION_EVENTS[currentExplorationEvent] ?? EXPLORATION_EVENTS.recruit;

  const [beats, setBeats]           = useState(() => eventDef.beats);
  const [beatIdx, setBeatIdx]       = useState(0);
  const [revealed, setRevealed]     = useState([]);
  const [typingDone, setTypingDone] = useState(false);
  const [ended, setEnded]           = useState(false);
  const [fast, setFast]             = useState(false);

  const scrollRef = useRef(null);
  const typingRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [revealed.length, typingDone]);

  // 현재 진행 중인 선택지 beat (revealed 마지막이 choice 타입인지)
  const pendingChoice = (() => {
    const last = revealed[revealed.length - 1];
    return last?.type === 'choice' ? last : null;
  })();

  const doAdvance = useCallback((idx, curBeats, curRevealed) => {
    let i = idx;
    let r = curRevealed;

    while (i < curBeats.length) {
      const b = curBeats[i];
      if (b.type === 'image' || b.type === 'scene' || b.type === 'system') {
        r = [...r, { ...b, uid: `b${i}` }];
        i++;
      } else break;
    }

    setBeatIdx(i);

    if (i >= curBeats.length) { setRevealed(r); setEnded(true); return; }

    const next = curBeats[i];

    if (next.type === 'end') { setRevealed(r); setEnded(true); return; }

    if (next.type === 'choice') {
      setRevealed([...r, { ...next, uid: `choice-${i}` }]);
      setBeatIdx(i + 1);
      return;
    }

    // narration / dialogue
    setRevealed([...r, { ...next, uid: `b${i}` }]);
    setBeatIdx(i + 1);
    setTypingDone(false);
  }, []);

  // 첫 비트 시작
  useEffect(() => {
    doAdvance(0, eventDef.beats, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTap = () => {
    if (ended || pendingChoice) return;
    if (!typingDone) { typingRef.current?.skip(); return; }
    doAdvance(beatIdx, beats, revealed);
  };

  const selectChoice = (choiceUid, option) => {
    const newBeats = [
      ...beats.slice(0, beatIdx),
      ...option.beats,
      ...beats.slice(beatIdx),
    ];
    const newRevealed = revealed.map(b =>
      b.uid === choiceUid
        ? { type: 'choice-made', label: option.label, uid: choiceUid }
        : b
    );
    setBeats(newBeats);
    doAdvance(beatIdx, newBeats, newRevealed);
  };

  // 렌더링 분리: 마지막 비트가 타이핑 중
  const lastBeat  = revealed[revealed.length - 1];
  const doneBeats = (typingDone || pendingChoice) ? revealed : revealed.slice(0, -1);
  const currentBeat = (!typingDone && !pendingChoice && lastBeat?.type !== 'choice') ? lastBeat : null;

  return (
    <>
      <Header showEnergy />
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* 타이틀 바 */}
        <div className="relative flex items-center px-3 h-6 bg-stone-200 border-b border-stone-300 flex-shrink-0">
          <button onClick={() => navigate('exploration-action')} className="text-[13px] text-stone-500 font-bold pr-3">‹</button>
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-stone-600">
            {eventDef.title}
          </span>
        </div>

        {/* 스크롤 피드 */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-stone-100 select-none flex flex-col pb-4"
          onClick={handleTap}
        >
          {doneBeats.map(beat =>
            beat.type === 'choice'
              ? <ChoiceBlock key={beat.uid} beat={beat} onSelect={selectChoice} />
              : <DoneBlock key={beat.uid} beat={beat} />
          )}

          {currentBeat && (
            <TypingBlock
              key={currentBeat.uid}
              ref={typingRef}
              beat={currentBeat}
              fast={fast}
              onDone={() => setTypingDone(true)}
            />
          )}

          {ended && (
            <div className="px-4 pt-5 pb-2 flex-shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 h-px bg-stone-300" />
                <span className="text-[7px] text-stone-400 tracking-widest">끝</span>
                <div className="flex-1 h-px bg-stone-300" />
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate('exploration-action'); }}
                className="text-left py-2.5 text-[9px] text-stone-700 font-medium active:text-amber-700 transition-colors"
              >
                <span className="mr-2 text-stone-400">✦</span>탐험으로 돌아가기
              </button>
            </div>
          )}
        </div>

        {/* 우측 하단 플로팅 버튼 */}
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
