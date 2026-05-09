import { useState } from 'react';

// 세이브 슬롯 중 플레이 시간 기준 가장 많이 채운 슬롯 (슬롯 2 · 28시간)
const BEST_SAVE = { slot: 2, name: 'LIANA', date: '7년 24일', time: '28시간' };

const ROLE_COLORS = {
  '전사':    'bg-red-500',
  '마법사':  'bg-blue-500',
  '궁수':    'bg-green-600',
  '힐러':    'bg-amber-500',
  '도적':    'bg-purple-500',
  '음유시인':'bg-pink-500',
  '소환사':  'bg-cyan-600',
  '성기사':  'bg-yellow-600',
  '연금술사':'bg-orange-500',
  '용병':    'bg-slate-500',
  '현자':    'bg-indigo-500',
};

const COMPANIONS = [
  { id: 'liana',   name: '리아나',  role: '마법사',   met: true,  staying: true,  affinity: 72,
    affinityLog: [
      { date: '1년 3일',  delta: +5,  reason: '도서관에서 첫 만남' },
      { date: '1년 8일',  delta: +12, reason: '마법 연구 도움' },
      { date: '1년 15일', delta: +20, reason: '위기에서 구출' },
      { date: '1년 23일', delta: +10, reason: '선물 전달' },
      { date: '2년 5일',  delta: +15, reason: '함께한 모험' },
      { date: '2년 14일', delta: +10, reason: '진심 어린 대화' },
    ],
    dialogLog: [
      { date: '1년 3일',  text: '「여기서 책을 읽다니, 용사님도 공부를 즐기시는군요.」' },
      { date: '1년 23일', text: '「이 선물... 정말 감사해요. 마음이 담긴 것 같아서 더 소중해요.」' },
      { date: '2년 14일', text: '「가끔은 목적지가 없는 대화가 가장 솔직하게 느껴지죠.」' },
    ],
  },
  { id: 'marcus',  name: '마르쿠스', role: '전사',    met: true,  staying: false, affinity: 45,
    affinityLog: [
      { date: '1년 12일', delta: +8,  reason: '훈련장에서 만남' },
      { date: '1년 20일', delta: +15, reason: '전투 지원' },
      { date: '1년 28일', delta: +12, reason: '부상 치료 도움' },
      { date: '2년 2일',  delta: +10, reason: '함께한 임무' },
    ],
    dialogLog: [
      { date: '1년 12일', text: '「검을 쥐는 자세부터 다시 봐야겠군. 기초가 전부야.」' },
      { date: '2년 2일',  text: '「이번 임무... 잘 해냈어. 앞으로도 믿을 수 있을 것 같군.」' },
    ],
  },
  { id: 'selene',  name: '셀레네',  role: '궁수',    met: true,  staying: true,  affinity: 88,
    affinityLog: [
      { date: '1년 1일',  delta: +10, reason: '숲에서 첫 만남' },
      { date: '1년 10일', delta: +18, reason: '함정에서 구출' },
      { date: '1년 18일', delta: +20, reason: '비밀 공유' },
      { date: '2년 1일',  delta: +15, reason: '달빛 아래 대화' },
      { date: '2년 9일',  delta: +12, reason: '오래된 약속' },
      { date: '2년 20일', delta: +13, reason: '여행 동행' },
    ],
    dialogLog: [
      { date: '1년 1일',  text: '「이 숲에 혼자 들어오다니 용기가 있거나 무모하거나 둘 중 하나군요.」' },
      { date: '1년 18일', text: '「...사실은 이 활, 어머니에게 받은 거예요. 누구한테도 말한 적 없었는데.」' },
      { date: '2년 20일', text: '「같이 있으면 어디든 갈 수 있을 것 같아요. 이상한 말이죠?」' },
    ],
  },
  { id: 'ravi',    name: '라비',   role: '힐러',    met: true,  staying: false, affinity: 30,
    affinityLog: [
      { date: '1년 16일', delta: +10, reason: '성당에서 만남' },
      { date: '1년 25일', delta: +12, reason: '치료 도움' },
      { date: '2년 7일',  delta: +8,  reason: '헌물 전달' },
    ],
    dialogLog: [
      { date: '1년 16일', text: '「신께서 인도하시는 길이라면 누구든 환영합니다.」' },
      { date: '1년 25일', text: '「상처가 깊네요. 조금만 참으세요.」' },
    ],
  },
  { id: 'eira',    name: '에이라',  role: '도적',    met: true,  staying: false, affinity: 60,
    affinityLog: [
      { date: '1년 5일',  delta: +5,  reason: '시장에서 만남' },
      { date: '1년 14일', delta: +15, reason: '도난 사건 해결' },
      { date: '1년 22일', delta: +20, reason: '비밀 의뢰 완수' },
      { date: '2년 3일',  delta: +10, reason: '위험에서 구출' },
      { date: '2년 11일', delta: +10, reason: '신뢰 구축' },
    ],
    dialogLog: [
      { date: '1년 5일',  text: '「뭘 보는 거야? 나 솔직히 별거 없어.」' },
      { date: '1년 22일', text: '「...이거 갚는 거야. 신세 지기 싫어서.」' },
      { date: '2년 11일', text: '「꽤 믿을 만하네. 뭐, 그렇다고.」' },
    ],
  },
  { id: 'goran',   name: '고란',   role: '전사',    met: true,  staying: false, affinity: 22,
    affinityLog: [
      { date: '2년 8일',  delta: +10, reason: '훈련장에서 대련 요청' },
      { date: '2년 19일', delta: +12, reason: '마물 퇴치 협력' },
    ],
    dialogLog: [
      { date: '2년 8일',  text: '「강해지고 싶으면 날 상대해봐. 말보다 주먹이 빠르거든.」' },
      { date: '2년 19일', text: '「...제법이군. 다음엔 좀 더 기대해도 되겠어.」' },
    ],
  },
  { id: 'thalia',  name: '탈리아',  role: '음유시인', met: true,  staying: true,  affinity: 55,
    affinityLog: [
      { date: '1년 9일',  delta: +8,  reason: '여관 공연 감상 후 대화' },
      { date: '1년 20일', delta: +15, reason: '노래 의뢰 함께 완수' },
      { date: '2년 4일',  delta: +12, reason: '악기 수리 도움' },
      { date: '2년 16일', delta: +20, reason: '과거 이야기를 들어줌' },
    ],
    dialogLog: [
      { date: '1년 9일',  text: '「박수 감사해요. 진심인 관객은 언제나 알아볼 수 있거든요.」' },
      { date: '2년 16일', text: '「이 노래는... 고향 생각날 때만 부르는 거예요. 오늘은 왠지 괜찮을 것 같아서.」' },
    ],
  },
  { id: 'zephyr',  name: '제피르',  role: '소환사',  met: true,  staying: false, affinity: 38,
    affinityLog: [
      { date: '1년 27일', delta: +10, reason: '미탐험 유적에서 조우' },
      { date: '2년 11일', delta: +18, reason: '소환수 위기 구출' },
      { date: '2년 22일', delta: +10, reason: '마법 연구 정보 교환' },
    ],
    dialogLog: [
      { date: '1년 27일', text: '「이 유적에 혼자 들어오다니. 대담하거나 무지하거나 둘 중 하나겠지.」' },
      { date: '2년 11일', text: '「...고마워. 계약수는 내 전부거든. 빚졌어.」' },
    ],
  },
  { id: 'mirela',  name: '미렐라',  role: '성기사',  met: true,  staying: true,  affinity: 66,
    affinityLog: [
      { date: '1년 4일',  delta: +12, reason: '성당 봉사 활동 동참' },
      { date: '1년 18일', delta: +20, reason: '부정부패 조사 협력' },
      { date: '2년 2일',  delta: +14, reason: '전투 중 서로 엄호' },
      { date: '2년 13일', delta: +20, reason: '신념에 대한 대화' },
    ],
    dialogLog: [
      { date: '1년 4일',  text: '「신앙은 강요하는 게 아니에요. 그냥 같이 있어주는 것만으로도 충분하죠.」' },
      { date: '2년 13일', text: '「당신처럼 흔들리면서도 나아가는 사람, 처음 봤어요. 존경해요, 진심으로.」' },
    ],
  },
  { id: 'orm',     name: '오름',   role: '연금술사', met: true,  staying: false, affinity: 42,
    affinityLog: [
      { date: '1년 11일', delta: +6,  reason: '재료 조달 의뢰 완수' },
      { date: '1년 24일', delta: +14, reason: '실험 사고 수습 도움' },
      { date: '2년 6일',  delta: +12, reason: '희귀 재료 증정' },
      { date: '2년 17일', delta: +10, reason: '연구 성과 발표 격려' },
    ],
    dialogLog: [
      { date: '1년 11일', text: '「재료는 정확하게. 감정이 들어가면 실패해. 그게 연금술의 철칙이야.」' },
      { date: '2년 6일',  text: '「이거... 어디서 구했어? 이 순도면 몇 달치 연구가 해결되는데.」' },
    ],
  },
  { id: 'vael',    name: '바엘',   role: '용병',    met: true,  staying: false, affinity: 18,
    affinityLog: [
      { date: '2년 1일',  delta: +8,  reason: '길드에서 우연히 동행' },
      { date: '2년 14일', delta: +10, reason: '의뢰 보수 공평하게 분배' },
    ],
    dialogLog: [
      { date: '2년 1일',  text: '「같이 간다고? 뭐, 방해만 안 하면 돼.」' },
      { date: '2년 14일', text: '「정확하게 반반. 나 그런 거 좋아해.」' },
    ],
  },
  { id: 'soren',   name: '소렌',   role: '현자',    met: true,  staying: true,  affinity: 79,
    affinityLog: [
      { date: '1년 2일',  delta: +5,  reason: '도서관에서 첫 대화' },
      { date: '1년 13일', delta: +18, reason: '고대 문서 해독 협력' },
      { date: '1년 21일', delta: +16, reason: '철학 논쟁 밤새 진행' },
      { date: '2년 8일',  delta: +20, reason: '스승의 유품 찾기 도움' },
      { date: '2년 18일', delta: +20, reason: '진실을 마주할 용기를 줌' },
    ],
    dialogLog: [
      { date: '1년 2일',  text: '「책을 읽는 자와 지식을 쌓는 자는 다르죠. 당신은 어느 쪽인가요?」' },
      { date: '1년 21일', text: '「틀려도 괜찮아요. 오답을 두려워하는 사람은 결국 아무것도 묻지 않게 되거든요.」' },
      { date: '2년 18일', text: '「...덕분에 오래 묻어뒀던 걸 꺼낼 수 있었어요. 고마워요, 용사님.」' },
    ],
  },
  { id: 'unknown', name: '???',    role: '???',     met: false, staying: false, affinity: 0,
    affinityLog: [], dialogLog: [],
    meetHint: '변경지 용병 길드에서 고난도 의뢰를 완수하다 보면 소문을 듣고 찾아오는 이가 있을 것입니다.',
  },
];

function AffinityBar({ value }) {
  return (
    <div className="h-1 bg-slate-400 rounded-full overflow-hidden">
      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${value}%` }} />
    </div>
  );
}

function CompanionCard({ char, onSelect }) {
  const roleBg = ROLE_COLORS[char.role] ?? 'bg-slate-400';
  return (
    <button
      onClick={() => onSelect(char)}
      className={`bg-slate-300 rounded p-1.5 text-left flex flex-col gap-0.5 ${!char.met ? 'opacity-40' : ''} active:scale-95 transition-transform`}
    >
      <div className="w-full aspect-square bg-slate-500 rounded relative flex items-center justify-center">
        {!char.met && <span className="text-slate-300 font-bold" style={{ fontSize: 22 }}>?</span>}
        <div className="absolute top-1 left-1 right-1 flex items-center justify-between">
          <span className={`text-[5px] font-bold px-1 py-0.5 rounded ${char.met ? roleBg : 'bg-slate-400'} text-white`}>
            {char.met ? char.role : '???'}
          </span>
          {char.met && (
            <span className={`text-[5px] font-bold px-1 py-0.5 rounded ${char.staying ? 'bg-green-500 text-white' : 'bg-slate-500 text-slate-300'}`}>
              {char.staying ? '체류' : '—'}
            </span>
          )}
        </div>
      </div>
      <div className="font-bold text-[9px] text-slate-700">{char.met ? char.name : '???'}</div>
      {char.met ? (
        <>
          <AffinityBar value={char.affinity} />
          <div className="text-[7px] text-slate-500">호감 {char.affinity}/100</div>
        </>
      ) : (
        <div className="text-[7px] text-slate-400">미조우</div>
      )}
    </button>
  );
}

function DetailView({ char, onBack }) {
  const [tab, setTab] = useState('affinity');
  const roleBg = ROLE_COLORS[char.role] ?? 'bg-slate-400';

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 타이틀 바 */}
      <div className="relative flex items-center px-3 h-8 bg-slate-300 border-b border-slate-400 flex-shrink-0">
        <button onClick={onBack} className="text-[11px] text-slate-500 font-bold pr-2">‹</button>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-600">
          {char.met ? char.name : '미지의 동료'}
        </span>
      </div>

      {/* 프로필 카드 */}
      <div className="bg-slate-200 px-3 pt-2 pb-2 flex-shrink-0">
        <div className="bg-slate-300 rounded p-2 flex gap-2">
          <div className="w-14 h-16 bg-slate-500 rounded flex-shrink-0 flex items-center justify-center">
            {!char.met && <span className="text-slate-300 font-bold" style={{ fontSize: 20 }}>?</span>}
          </div>
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <div className="flex items-center gap-1 flex-wrap mb-0.5">
                <span className="font-bold text-[10px] text-slate-700">{char.met ? char.name : '???'}</span>
                {char.met && (
                  <>
                    <span className={`text-[5px] font-bold px-1 py-0.5 rounded ${roleBg} text-white`}>{char.role}</span>
                    <span className={`text-[5px] font-bold px-1 py-0.5 rounded ${char.staying ? 'bg-green-500 text-white' : 'bg-slate-400 text-slate-200'}`}>
                      {char.staying ? '여관 체류' : '비체류'}
                    </span>
                  </>
                )}
              </div>
              {char.met
                ? <div className="text-[7px] text-slate-500">호감도 {char.affinity}/100</div>
                : <div className="text-[7px] text-slate-400">아직 만나지 못한 동료</div>
              }
            </div>
            {char.met && <AffinityBar value={char.affinity} />}
          </div>
        </div>
      </div>

      {!char.met ? (
        <>
          <div className="bg-slate-200 border-b border-slate-300 px-3 py-1.5 flex-shrink-0">
            <span className="text-[8px] font-bold text-slate-500">만남 조건</span>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-3">
            <div className="bg-slate-200 rounded px-3 py-2.5 border-l-2 border-amber-400">
              <div className="text-[8px] text-slate-600 leading-relaxed">{char.meetHint}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex bg-slate-200 border-b border-slate-300 flex-shrink-0">
            {[['affinity', '호감도 기록'], ['dialog', '대화 기록']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-1.5 text-[8px] font-bold transition-colors ${
                  tab === key ? 'bg-amber-400 text-slate-800' : 'bg-slate-300 text-slate-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-2">
            {tab === 'affinity' ? (
              <div className="flex flex-col gap-1">
                {char.affinityLog.map((log, i) => (
                  <div key={i} className="bg-slate-200 rounded px-2 py-1.5 flex items-center gap-2">
                    <span className="text-[6px] text-slate-400 flex-shrink-0">{log.date}</span>
                    <span className="flex-1 text-[7px] text-slate-600">{log.reason}</span>
                    <span className="text-[8px] font-bold text-amber-600 flex-shrink-0">+{log.delta}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {char.dialogLog.map((log, i) => (
                  <div key={i} className="bg-slate-200 rounded px-2 py-1.5">
                    <div className="text-[6px] text-slate-400 mb-0.5">{log.date}</div>
                    <div className="text-[7px] text-slate-600 leading-relaxed">{log.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default function EncyclopediaModal({ onClose }) {
  const [selectedId, setSelectedId] = useState(null);
  const metCount = COMPANIONS.filter(c => c.met).length;
  const selected = COMPANIONS.find(c => c.id === selectedId) ?? null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-slate-100">
      {/* 타이틀 바 */}
      <div className="relative flex items-center px-3 h-8 bg-slate-600 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center text-slate-200 text-[12px] leading-none"
        >
          ✕
        </button>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-white">
          동료 도감
        </span>
        <span className="ml-auto text-[7px] text-slate-300">
          슬롯 {BEST_SAVE.slot} · {BEST_SAVE.date}
        </span>
      </div>

      {/* 세이브 출처 배너 */}
      <div className="bg-slate-500 px-3 py-1 flex items-center gap-2 flex-shrink-0">
        <span className="text-[7px] text-slate-200">역대 최다 플레이 세이브 기준</span>
        <span className="ml-auto text-[7px] text-amber-300 font-bold">
          {BEST_SAVE.name} · {BEST_SAVE.time} · {metCount}/{COMPANIONS.length} 조우
        </span>
      </div>

      {selected ? (
        <DetailView char={selected} onBack={() => setSelectedId(null)} />
      ) : (
        <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-2">
          <div className="grid grid-cols-2 gap-2">
            {COMPANIONS.map(c => (
              <CompanionCard key={c.id} char={c} onSelect={(c) => setSelectedId(c.id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
