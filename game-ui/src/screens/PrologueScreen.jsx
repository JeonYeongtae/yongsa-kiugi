import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

// ── 스토리 비트 (순서대로 하나씩 출력) ────────────────────────
// type: 'chapter-header' | 'image' | 'text' | 'choice' | 'end'
// chapter-header / image 는 자동 연속 출력, text 는 탭에서 멈춤

const BEATS = [
  // ── 1장
  { type: 'chapter-header', title: '1. 절망과 은둔' },
  { type: 'image', label: '절망과 은둔' },
  { type: 'text', content: '태초부터 빛과 어둠이 있었습니다.\n빛은 세계를 창조해냈고, 세계를 관리하기 위하여 뿌리내려 지금의 세계수가 되었습니다.' },
  { type: 'text', content: '세계수는 자신을 도울 12명의 신을 만들었고, 그들은 각자 분야를 나눠 세계를 키워나갔습니다.\n하지만, 그들은 너무나도 큰 존재이기에 직접적인 간섭을 줄 수 없었습니다.' },
  { type: 'text', content: '그렇기에 12명의 신들은 창조물들에게 문양을 주는 방식으로 도움을 주었습니다.\n그러던 중 어둠은 세계의 번영하는 모습을 보고 욕심이 나기 시작했습니다.' },
  { type: 'text', content: '어둠은 세계수와 신들을 몰아내고 자신이 지배하고 싶었습니다.\n하지만 어둠 또한 너무나도 큰 존재이기에, 어둠 자신을 세계에서 직접 영향을 줄 수 있을 만큼 나누었고, 그 조각이 바로 12명의 마왕이었습니다.' },
  { type: 'text', content: '세계수와 신들은 마왕에 맞서기 위한 존재, 용사를 만들기로 하였습니다.\n그렇게 세계수의 빛에서 태어난 용사를 돕기 위해 신들은 자신의 힘을 기꺼이 나누어 주었습니다.' },
  { type: 'text', content: '태초의 전투부터 NN년까지 10번의 전투가 있었고, 세상의 존망을 건 용사와 마왕의 격렬한 전투는 끝없이 이어지는 듯 보였습니다.' },
  { type: 'text', content: '그리고 11번째, 세상의 운명이 걸렸던 마왕성에서의 최후 전투.\n전대 용사의 검이 마왕의 심장을 꿰뚫었으나, 쓰러지던 마왕이 토해낸 검붉은 저주가 용사의 온몸을 옭아맸습니다.' },
  { type: 'text', content: '세 명의 동료와 저주를 받은 전대 용사는 발밑에 생긴 마법진으로 인해 강제 워프되었습니다.\n바로, 세상의 눈길이 닿지 않는 잊혀진 성역 \'태초의 숲\'이었습니다.' },
  { type: 'text', content: '마왕은 무찔렀으나, 마왕의 저주는 용사의 영혼에 무거운 닻을 내렸습니다.\n숲의 경계를 넘으려 할 때마다 숨통을 조여오는 고통에, 전대 용사는 스스로 갇힌 지박령이 되고 말았음을 깨달았습니다.' },
  { type: 'text', content: '바깥 세상의 소식은 오직 결계를 자유롭게 드나들 수 있는 세 동료의 입을 통해서만 전해질 뿐, 전대 용사의 찬란했던 모험은 그 좁은 경계 안에서 영원히 멈춰버렸습니다.' },

  // ── 2장
  { type: 'chapter-header', title: '2. 세계수 아래의 기적' },
  { type: 'image', label: '세계수 아래의 기적' },
  { type: 'text', content: '상처뿐인 은둔 생활이 시작되고, 저택이 온전히 형태를 갖춘 어느 고요한 밤.\n절망에 잠겨 있던 전대 용사의 창가로 은하수를 엮어 만든 듯한 금빛 나비 한 마리가 날아들었습니다.' },
  { type: 'text', content: '무언가에 홀린 듯 나비의 궤적을 따라 숲의 가장 깊고 은밀한 심장부로 발걸음을 옮기자, 아득한 시간을 품고 선 거대한 나무가 모습을 드러냈습니다.' },
  { type: 'text', content: '그리고 그 거대한 뿌리가 부드럽게 감싸 안은 둥지 속, 새근새근 숨을 쉬는 작은 갓난아기가 있었습니다.\n그것은 이미 많은 힘을 소모한 세계수가 세상의 간절한 염원으로 빚어낸 빛이었습니다.' },
  { type: 'choice', choiceType: 'name' },
  { type: 'choice', choiceType: 'gender' },

  // ── 3장
  { type: 'chapter-header', title: '3. 부서진 검 대신 요람을 흔들며' },
  { type: 'image', label: '부서진 검 대신 요람을 흔들며' },
  { type: 'text', content: '마물의 피를 뒤집어쓰고 검을 휘두르던 거칠고 투박한 손은, 이제 여린 생명을 쓰다듬고 직접 만든 요람을 흔드는 법을 배워야 했습니다.\n바깥 세상으로 나갈 수 없는 전대 용사는 자신의 모든 시간을 바쳐 아이의 세계가 되어주었습니다.' },
  { type: 'text', content: '숲의 사계절이 열 번 바뀌는 동안, 아이는 전대 용사의 곁에서 웃고 울며 자신만의 색채를 띠기 시작했습니다.\n전대 용사가 어떤 이야기를 들려주고 어떤 가르침을 주었는지에 따라 아이의 영혼은 단단하게 여물어갔습니다.' },
  { type: 'text', content: '그 아이만이 가진 고유한 기질과 타고난 날은, 앞으로 용사가 걸어갈 길 위에 운명처럼 새겨져 있었습니다.' },
  { type: 'choice', choiceType: 'mbti-birthday' },

  // ── 4장
  { type: 'chapter-header', title: '4. 떨어지는 잿빛 잎새' },
  { type: 'image', label: '떨어지는 잿빛 잎새' },
  { type: 'text', content: '아이가 열 살의 생일을 맞이하던 무렵, 평화롭던 태초의 숲에 미세한 지진이 일기 시작했습니다.\n하늘은 불길한 보랏빛으로 물들고, 세계수의 가지에서 생명력을 잃은 잿빛 잎새가 힘없이 떨어져 내렸습니다.' },
  { type: 'text', content: '마왕이 다시 눈을 뜨며, 숲을 지켜주던 세계수의 결계가 무너져 내리고 있다는 명백한 전조였습니다.' },
  { type: 'text', content: '전대 용사는 직감했습니다.\n\n"운명의 수레바퀴가 돌아가기 시작했다.\n내가 아이를 위해 할 수 있는 일이 무엇일까?"' },
  { type: 'end' },
];

const TOTAL_TEXT = BEATS.filter(b => b.type === 'text').length;

// ── MBTI 데이터 ──────────────────────────────────────────────

const MBTI_DATA = [
  { code: 'INTJ', name: '전략가',    subtype: '교육 효율형 마법 보조',     desc: '교육 성장 효율이 좋고 마법 명중이 안정적이지만, 회복 의존도가 낮아야 함' },
  { code: 'INTP', name: '논리술사',  subtype: '마공 집중 마법형',           desc: '완벽 결과로 마공을 키우고, 마법계 MP 소모를 줄여 지속적인 마법 운용에 유리' },
  { code: 'ENTJ', name: '통솔자',    subtype: '메인 파티 물리 지휘형',      desc: '현재 전투 파티의 물공을 올리고 알바 수익도 챙기지만, 여관 대기 육성은 약해짐' },
  { code: 'ENTP', name: '변론가',    subtype: '비용 절감형 변칙 물리',      desc: '교육 비용을 줄이고 물방을 일부 무시하지만, 물리 명중률 관리가 필요' },
  { code: 'INFJ', name: '옹호자',    subtype: '회피 생존형 마방 지원',      desc: '회피와 파티 마방을 올려 안정성을 높이지만, 자신의 HP가 낮아짐' },
  { code: 'INFP', name: '중재자',    subtype: '운 성장형 힐 보조',          desc: '운 성장과 힐링 효율이 좋아 장기 육성, 이벤트, 회복 운영에 유리' },
  { code: 'ENFJ', name: '선도자',    subtype: '동료 운영형 버퍼',           desc: '버프 지속과 영입 비용 절감으로 동료 운용에 강하지만, 동료와 함께할 때 물방이 낮아짐' },
  { code: 'ENFP', name: '활동가',    subtype: '마나 여유형 알바 대응',      desc: '최대 마나가 높고 알바 하락을 줄이지만, 스킬 MP 소모가 약간 증가' },
  { code: 'ISTJ', name: '현실주의자', subtype: '교육 중심 안정형',          desc: '방어력이 안정적이고 알바 하락을 줄이지만, 교육 외 성장 효율은 낮음' },
  { code: 'ISFJ', name: '수호자',    subtype: '방어 안정형',                desc: '방어 행동과 스태미나 관리에 강하지만, 물리 공격력이 낮음' },
  { code: 'ESTJ', name: '경영자',    subtype: '완벽 결과 실속형',           desc: '알바 수익과 완벽 결과 보너스로 효율적인 성장을 노리지만, 마방이 낮음' },
  { code: 'ESFJ', name: '집정관',    subtype: '4인 파티 협동형',            desc: '4인 전투에서 명중률을 보조하고 특정 알바 수익이 좋지만, 인원이 부족하면 협동 효과가 꺼짐' },
  { code: 'ISTP', name: '장인',      subtype: '물리 스킬 실전형',           desc: '물리 스킬과 방어 행동이 좋지만, 버프 수혜량이 낮아 독립적인 운용이 어울림' },
  { code: 'ISFP', name: '모험가',    subtype: '회피 버프형',                desc: '버프 효율과 회피가 좋지만, 전투 시작 첫 행동이 느림' },
  { code: 'ESTP', name: '사업가',    subtype: '단일 폭딜 돌격형',           desc: '강한 단일 물리 스킬이 강하고 알바 하락도 줄지만, 물리 피해를 더 받음' },
  { code: 'ESFP', name: '연예인',    subtype: '스태미나 속도형',            desc: '전투 속도와 최대 스태미나가 좋지만, 스킬 MP 소모가 증가해 자원 관리가 필요' },
];

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS   = Array.from({ length: 31 }, (_, i) => i + 1);

// ── 선택 모달들 ────────────────────────────────────────────────

function NameModal({ onConfirm }) {
  const [name, setName] = useState('');
  const canConfirm = name.trim().length > 0;
  return (
    <div className="absolute inset-0 bg-slate-900/75 flex items-center justify-center px-5 z-10">
      <div className="w-full bg-slate-200 rounded p-3">
        <div className="text-[9px] font-bold text-slate-800 mb-0.5">세계수의 기적</div>
        <div className="text-[8px] text-slate-600 mb-3">아기의 이름을 지어주세요.</div>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          maxLength={10}
          className="w-full mb-3 px-2 py-1.5 border border-slate-400 rounded text-[9px] bg-white text-slate-700"
        />
        <button
          onClick={() => canConfirm && onConfirm(name.trim())}
          className={`w-full py-1.5 rounded text-[9px] font-bold ${canConfirm ? 'bg-slate-600 text-white' : 'bg-slate-300 text-slate-400'}`}
        >
          확인
        </button>
      </div>
    </div>
  );
}

function GenderModal({ onConfirm }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="absolute inset-0 bg-slate-900/75 flex items-center justify-center px-5 z-10">
      <div className="w-full bg-slate-200 rounded p-3">
        <div className="text-[9px] font-bold text-slate-800 mb-0.5">세계수의 기적</div>
        <div className="text-[8px] text-slate-600 mb-3">아기의 성별을 선택하세요.</div>
        <div className="flex gap-2 mb-3">
          {[{ val: 'male', label: '♂ 남' }, { val: 'female', label: '♀ 여' }].map(opt => (
            <button key={opt.val} onClick={() => setSelected(opt.val)}
              className={`flex-1 py-2 rounded text-[9px] font-bold border ${selected === opt.val ? 'bg-slate-600 text-white border-slate-600' : 'bg-slate-100 text-slate-500 border-slate-400'}`}>
              {opt.label}
            </button>
          ))}
        </div>
        <button onClick={() => selected && onConfirm(selected)}
          className={`w-full py-1.5 rounded text-[9px] font-bold ${selected ? 'bg-slate-600 text-white' : 'bg-slate-300 text-slate-400'}`}>
          확인
        </button>
      </div>
    </div>
  );
}


function MbtiBirthdayModal({ onConfirm }) {
  const [step, setStep] = useState(0);
  const [selectedMbti, setSelectedMbti] = useState(MBTI_DATA[0].code);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const selectedData = MBTI_DATA.find(m => m.code === selectedMbti);
  const canConfirmBirthday = month !== '' && day !== '';

  return (
    <div className="absolute inset-0 bg-slate-900/75 flex items-center justify-center px-5 z-10">
      <div className="w-full bg-slate-200 rounded p-3 max-h-[90%] overflow-y-auto">

        {step === 0 && (
          <>
            <div className="text-[9px] font-bold text-slate-800 mb-0.5">아이의 기질</div>
            <div className="text-[8px] text-slate-600 mb-2">아이의 성향을 선택하세요.</div>
            <div className="grid grid-cols-4 gap-1 mb-2">
              {MBTI_DATA.map(m => (
                <button
                  key={m.code}
                  onClick={() => setSelectedMbti(m.code)}
                  className={`py-1.5 rounded text-center border leading-tight ${selectedMbti === m.code ? 'bg-slate-600 text-white border-slate-600' : 'bg-slate-100 text-slate-500 border-slate-400'}`}
                  style={{ fontSize: '7px' }}
                >
                  {m.name}
                </button>
              ))}
            </div>
            <div className="mb-2 px-2 py-1.5 bg-slate-100 border border-slate-400 rounded">
              <div className="text-[8px] font-bold text-slate-700 mb-0.5">{selectedData.name}</div>
              <div className="text-[7px] text-amber-700 mb-0.5">{selectedData.subtype}</div>
              <div className="text-[7px] text-slate-600 leading-relaxed">{selectedData.desc}</div>
            </div>
            <button
              onClick={() => selectedMbti && setStep(1)}
              className={`w-full py-1.5 rounded text-[9px] font-bold ${selectedMbti ? 'bg-slate-600 text-white' : 'bg-slate-300 text-slate-400'}`}
            >
              다음
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <div className="text-[9px] font-bold text-slate-800 mb-0.5">아이의 생일</div>
            <div className="text-[8px] text-slate-600 mb-3">아이가 태어난 날을 선택하세요.</div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1">
                <div className="text-[7px] text-slate-500 mb-1">월</div>
                <select
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-400 rounded text-[9px] bg-white text-slate-700"
                >
                  <option value="">-- 월</option>
                  {MONTHS.map(m => (
                    <option key={m} value={m}>{m}월</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <div className="text-[7px] text-slate-500 mb-1">일</div>
                <select
                  value={day}
                  onChange={e => setDay(e.target.value)}
                  className="w-full px-2 py-1.5 border border-slate-400 rounded text-[9px] bg-white text-slate-700"
                >
                  <option value="">-- 일</option>
                  {DAYS.map(d => (
                    <option key={d} value={d}>{d}일</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => canConfirmBirthday && onConfirm({ mbti: selectedMbti, mbtiName: selectedData.name, month: Number(month), day: Number(day) })}
              className={`w-full py-1.5 rounded text-[9px] font-bold ${canConfirmBirthday ? 'bg-slate-600 text-white' : 'bg-slate-300 text-slate-400'}`}
            >
              각인하기
            </button>
          </>
        )}

      </div>
    </div>
  );
}

// ── 스크롤 피드 블록 렌더 ─────────────────────────────────────

function FeedBlock({ block }) {
  if (block.type === 'chapter-header') {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-400">
        <div className="flex-1 h-px bg-slate-500" />
        <span className="text-[8px] font-bold text-slate-700 whitespace-nowrap">{block.title}</span>
        <div className="flex-1 h-px bg-slate-500" />
      </div>
    );
  }
  if (block.type === 'image') {
    return (
      <div className="bg-slate-600 flex items-center justify-center text-slate-400 text-[8px]" style={{ height: 96 }}>
        CG — {block.label}
      </div>
    );
  }
  if (block.type === 'text') {
    return (
      <div className="px-3 py-2 bg-slate-200">
        <p className="text-[9px] text-slate-700 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
          {block.content}
        </p>
      </div>
    );
  }
  return null;
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────

export default function PrologueScreen() {
  const { navigate } = useGame();

  const [revealIdx, setRevealIdx] = useState(0);
  const [revealedBlocks, setRevealedBlocks] = useState([]);
  const [activeChoice, setActiveChoice] = useState(null);
  const [char, setChar] = useState({ name: null, gender: null, mbti: null, mbtiName: null, birthday: null });
  const [skipStep, setSkipStep] = useState(null); // null | 'confirm' | 'name' | 'gender' | 'mbti-birthday'

  const scrollRef = useRef(null);
  const revealedCount = revealedBlocks.filter(b => b.type === 'text').length;

  // 새 블록이 추가될 때 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [revealedBlocks.length]);

  // chapter-header / image 는 자동 연속, text 에서 멈춤
  const processFrom = (startIdx, currentBlocks) => {
    let i = startIdx;
    let blocks = currentBlocks;

    while (i < BEATS.length) {
      const beat = BEATS[i];

      if (beat.type === 'end') {
        setRevealedBlocks(blocks);
        navigate('main-hub');
        return;
      }

      if (beat.type === 'choice') {
        setRevealIdx(i + 1);
        setRevealedBlocks(blocks);
        setActiveChoice(beat.choiceType);
        return;
      }

      blocks = [...blocks, { ...beat, id: i }];

      if (beat.type === 'text') {
        setRevealIdx(i + 1);
        setRevealedBlocks(blocks);
        return;
      }

      // chapter-header, image → 자동 연속
      i++;
    }

    setRevealedBlocks(blocks);
  };

  // 마운트 시 첫 내용 출력
  useEffect(() => {
    processFrom(0, []);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTap = () => {
    if (activeChoice) return;
    processFrom(revealIdx, revealedBlocks);
  };

  const completeChoice = (type, value) => {
    if (type === 'name')   setChar(c => ({ ...c, name: value }));
    else if (type === 'gender') setChar(c => ({ ...c, gender: value }));
    else if (type === 'mbti-birthday') {
      setChar(c => ({ ...c, mbti: value.mbti, mbtiName: value.mbtiName, birthday: { month: value.month, day: value.day } }));
    }
    setActiveChoice(null);
    processFrom(revealIdx, revealedBlocks);
  };

  const getNextSkipStep = (c) => {
    if (!c.name) return 'name';
    if (!c.gender) return 'gender';
    if (!c.mbti) return 'mbti-birthday';
    return null;
  };

  const handleSkipConfirm = (currentChar) => {
    const next = getNextSkipStep(currentChar);
    if (next) { setSkipStep(next); }
    else { navigate('main-hub'); }
  };

  const completeSkipChoice = (type, value) => {
    let updated = char;
    if (type === 'name') {
      updated = { ...char, name: value };
    } else if (type === 'gender') {
      updated = { ...char, gender: value };
    } else if (type === 'mbti-birthday') {
      updated = { ...char, mbti: value.mbti, mbtiName: value.mbtiName, birthday: { month: value.month, day: value.day } };
    }
    setChar(updated);
    handleSkipConfirm(updated);
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">

      {/* 스크롤 피드 영역 — 탭하면 다음 내용 출력 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-slate-300 cursor-pointer select-none"
        onClick={handleTap}
      >
        <div className="flex flex-col">
          {revealedBlocks.map(block => (
            <FeedBlock key={block.id} block={block} />
          ))}
        </div>
      </div>

      {/* 탭 유도 힌트 — 스크롤 영역과 컨트롤 바 사이 고정 */}
      {!activeChoice && (
        <div
          className="flex-shrink-0 text-center text-[7px] text-slate-500 bg-slate-300 py-1 cursor-pointer select-none"
          onClick={handleTap}
        >
          ▼ 탭하여 계속
        </div>
      )}

      {/* 하단 컨트롤 바 */}
      <div className="bg-slate-300 border-t border-slate-400 flex items-center justify-between px-3 py-1.5 flex-shrink-0">
        <button onClick={e => { e.stopPropagation(); setSkipStep('confirm'); }}
          className="px-2 py-0.5 bg-slate-400 rounded text-[7px] text-slate-700">
          Skip
        </button>
        <div className="text-[7px] text-slate-500">
          {revealedCount} / {TOTAL_TEXT} 장면
        </div>
        <button onClick={e => e.stopPropagation()}
          className="px-2 py-0.5 bg-slate-400 rounded text-[7px] text-slate-700">
          메뉴
        </button>
      </div>

      {/* 프롤로그 선택 모달 오버레이 */}
      {activeChoice === 'name' && (
        <NameModal onConfirm={val => completeChoice('name', val)} />
      )}
      {activeChoice === 'gender' && (
        <GenderModal onConfirm={val => completeChoice('gender', val)} />
      )}
      {activeChoice === 'mbti-birthday' && (
        <MbtiBirthdayModal onConfirm={val => completeChoice('mbti-birthday', val)} />
      )}

      {/* Skip 플로우 오버레이 */}
      {skipStep === 'confirm' && (
        <div className="absolute inset-0 bg-slate-900/75 flex items-center justify-center px-5 z-10">
          <div className="bg-slate-100 rounded p-3 w-full relative">
            <button onClick={() => setSkipStep(null)} className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px] leading-none">✕</button>
            <div className="text-[11px] font-bold text-center text-slate-800 mb-2">── 메인 스토리 요약 ──</div>
            <div className="text-[9px] text-slate-700 leading-relaxed space-y-1">
              <div>· 빛과 어둠의 싸움 속, 12번째 마왕이 다시 깨어나고 있다.</div>
              <div>· 11번째 전투에서 마왕을 쓰러뜨린 전대 용사는 저주에 묶여 태초의 숲에 갇혔다.</div>
              <div>· 세계수가 보낸 금빛 나비를 따라간 숲 깊은 곳, 뿌리 둥지에서 갓난아기를 발견했다.</div>
              <div>· 전대 용사는 10년간 아이를 키우며, 다가올 운명을 준비시키기로 결심했다.</div>
            </div>
            <div className="mt-3 flex justify-center">
              <button
                onClick={() => handleSkipConfirm(char)}
                className="px-4 py-1 bg-slate-600 text-white text-[8px] rounded"
              >
                건너뛰기 ▸
              </button>
            </div>
          </div>
        </div>
      )}
      {skipStep === 'name' && (
        <NameModal onConfirm={val => completeSkipChoice('name', val)} />
      )}
      {skipStep === 'gender' && (
        <GenderModal onConfirm={val => completeSkipChoice('gender', val)} />
      )}
      {skipStep === 'mbti-birthday' && (
        <MbtiBirthdayModal onConfirm={val => completeSkipChoice('mbti-birthday', val)} />
      )}

    </div>
  );
}
