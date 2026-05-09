import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';

const GIFT_ITEMS = [
  { id: 'wildflower',  name: '야생화 다발',    desc: '들판에서 직접 꺾어온 소박한 꽃',      affinity: 5,  rarity: '일반' },
  { id: 'herb_tea',    name: '향초 허브차',     desc: '따뜻한 향기가 나는 수제 허브 블렌드',   affinity: 8,  rarity: '일반' },
  { id: 'cake',        name: '수제 케이크',     desc: '정성껏 구운 달콤한 케이크',            affinity: 12, rarity: '희귀' },
  { id: 'gem_crystal', name: '마법 결정',       desc: '희귀한 마법 에너지를 담은 보석 파편',   affinity: 15, rarity: '희귀' },
  { id: 'old_scroll',  name: '고대 마법서 사본', desc: '도서관에서 발굴한 희귀 주문서 필사본',  affinity: 18, rarity: '희귀' },
  { id: 'silver_ring', name: '은반지',          desc: '장인이 세공한 정교한 은세공 반지',      affinity: 22, rarity: '특수' },
  { id: 'star_gem',    name: '별자리 원석',     desc: '유성이 떨어진 자리에서 채취한 원석',    affinity: 25, rarity: '특수' },
];

const RARITY_STYLE = {
  '일반': 'border-l-2 border-slate-400',
  '희귀': 'border-l-2 border-blue-400',
  '특수': 'border-l-2 border-amber-400',
};

// player: 주인공 대사 / companion: 동료 대사 (등급별)
const GIFT_DIALOGUES = {
  liana: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 생각이 나서요.' },
      { speaker: 'companion', text: '「어머, 이런 게 더 마음에 닿을 때가 있죠. 고마워요.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서 골랐어요.' },
      { speaker: 'companion', text: '「어떻게 제 취향을 아셨어요? ...혹시 관찰하신 건 아니죠?」' },
    ],
    '특수': [
      { speaker: 'player',    text: '당신한테 주고 싶어서 오래 기다렸어요.' },
      { speaker: 'companion', text: '「...말이 안 나오네요. 책에도 이런 감정은 없었어요.」' },
    ],
  },
  marcus: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 받아줘요.' },
      { speaker: 'companion', text: '「...그래. 쓸 곳이 생기겠군. 뭐, 고맙다.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 쓸 것 같아서요.' },
      { speaker: 'companion', text: '「제법이군. 이걸 고를 줄 알다니. ...나쁘지 않아.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '꼭 드리고 싶었어요.' },
      { speaker: 'companion', text: '「...말이 없어지는군. 받겠어. 잘 쓰마.」' },
    ],
  },
  selene: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 생각이 나서요.' },
      { speaker: 'companion', text: '「꽃이든 뭐든, 마음이 담긴 거잖아요. 그게 제일 예뻐요.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서 골랐어요.' },
      { speaker: 'companion', text: '「어떻게 알았어요? 이런 거 좋아하는 거... 숲에서 혼자만 알고 있었는데.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '당신한테 주고 싶어서 오래 기다렸어요.' },
      { speaker: 'companion', text: '「...같이 있으면 어디든 갈 수 있을 것 같다고 했잖아요. 지금 그 말이 더 진짜인 것 같아요.」' },
    ],
  },
  ravi: {
    '일반': [
      { speaker: 'player',    text: '마음에 들었으면 해요.' },
      { speaker: 'companion', text: '「신께서 주신 인연이 이런 모습이군요. 감사히 받겠습니다.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서 골랐어요.' },
      { speaker: 'companion', text: '「이걸... 저한테요? 성당에도 이리 귀한 것은 없는데. 기도로 갚겠습니다.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '꼭 드리고 싶었어요.' },
      { speaker: 'companion', text: '「...신의 인도보다 더 가까운 것이 있다면, 이런 마음이겠죠. 잊지 않겠습니다.」' },
    ],
  },
  eira: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 받아줘요.' },
      { speaker: 'companion', text: '「...뭐야 이게. 받긴 하는데, 무슨 꿍꿍이야.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서요.' },
      { speaker: 'companion', text: '「어울리긴... 뭐, 싫진 않아. 나중에 갚을게.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '당신한테만 주고 싶었어요.' },
      { speaker: 'companion', text: '「...진짜야? 왜 나한테. 아, 됐어. 그냥 고마워.」' },
    ],
  },
  goran: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 받아줘요.' },
      { speaker: 'companion', text: '「선물이라. 이런 거 낯설어. ...뭐, 고맙다.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 쓸 것 같아서요.' },
      { speaker: 'companion', text: '「제법 눈치가 있군. 이 정도면 나도 인정해.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '꼭 드리고 싶었어요.' },
      { speaker: 'companion', text: '「...이거 꽤 대단한데. 다음 대련 때 좀 더 봐주겠어.」' },
    ],
  },
  thalia: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 생각이 나서요.' },
      { speaker: 'companion', text: '「진심은 크기로 재는 게 아니죠. 노래 한 소절 드릴까요?」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서 골랐어요.' },
      { speaker: 'companion', text: '「어떻게 제 취향을 알았어요? 악보에도 이런 감정은 없는데.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '당신한테 주고 싶어서 오래 기다렸어요.' },
      { speaker: 'companion', text: '「...고향 노래 있잖아요. 오늘은 당신 앞에서 처음으로 끝까지 부를 수 있을 것 같아요.」' },
    ],
  },
  zephyr: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 받아줘요.' },
      { speaker: 'companion', text: '「선물이라... 익숙하지 않아. 뭐, 받겠어.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서요.' },
      { speaker: 'companion', text: '「...눈이 있군. 계약수가 좋아할 것 같아. 고마워.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '당신한테만 주고 싶었어요.' },
      { speaker: 'companion', text: '「...이건 내가 빚진 게 아니라 네가 준 거야. 잊지 않겠어.」' },
    ],
  },
  mirela: {
    '일반': [
      { speaker: 'player',    text: '마음에 들었으면 해요.' },
      { speaker: 'companion', text: '「마음은 강요할 수 없어요. 그래서 이게 더 고마워요.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서 골랐어요.' },
      { speaker: 'companion', text: '「...이런 선물을 받을 자격이 있는지 모르겠어요. 그래도 기쁘게 받겠습니다.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '꼭 드리고 싶었어요.' },
      { speaker: 'companion', text: '「흔들리면서도 나아가는 사람이 이런 마음을 가졌군요. 신보다 더 가까이 느껴져요.」' },
    ],
  },
  orm: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 받아줘요.' },
      { speaker: 'companion', text: '「...정확하게 말하면, 이런 거 받는 게 익숙하지 않아. 근데 나쁘진 않아.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 쓸 것 같아서요.' },
      { speaker: 'companion', text: '「순도 봐도 되냐? ...아, 그게 아니라. 뭐, 고마워.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '당신한테 드리고 싶었어요.' },
      { speaker: 'companion', text: '「재료인지 선물인지 모르겠지만... 후자로 받겠어. 처음이야.」' },
    ],
  },
  vael: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 받아줘요.' },
      { speaker: 'companion', text: '「선물은 빚이야. 나중에 값어치로 돌려주지.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 쓸 것 같아서요.' },
      { speaker: 'companion', text: '「눈이 정확하네. 이 정도면 공평한 교환이야. 받겠어.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '꼭 드리고 싶었어요.' },
      { speaker: 'companion', text: '「...이건 갚을 수가 없는데. 내 방식이 아닌데. ...고마워.」' },
    ],
  },
  soren: {
    '일반': [
      { speaker: 'player',    text: '별거 아닌데... 생각이 나서요.' },
      { speaker: 'companion', text: '「별거가 아닌 것이 오히려 질문을 만들죠. 왜 나였을까, 하고요. 감사해요.」' },
    ],
    '희귀': [
      { speaker: 'player',    text: '잘 어울릴 것 같아서 골랐어요.' },
      { speaker: 'companion', text: '「사람을 보는 눈이 있군요. 오래 들여다본 게 느껴져요.」' },
    ],
    '특수': [
      { speaker: 'player',    text: '당신한테 주고 싶어서 오래 기다렸어요.' },
      { speaker: 'companion', text: '「...덕분에 또 하나 꺼낼 수 있을 것 같아요. 오래 묻어뒀던 것들이요.」' },
    ],
  },
};

const ROLE_COLORS = {
  '전사':   'bg-red-500',
  '마법사': 'bg-blue-500',
  '궁수':   'bg-green-600',
  '힐러':   'bg-amber-500',
  '도적':   'bg-purple-500',
};

const COMPANIONS = [
  {
    id: 'liana',
    name: '리아나',
    role: '마법사',
    met: true,
    staying: true,
    affinity: 72,
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
  {
    id: 'marcus',
    name: '마르쿠스',
    role: '전사',
    met: true,
    staying: false,
    affinity: 45,
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
  {
    id: 'selene',
    name: '셀레네',
    role: '궁수',
    met: true,
    staying: true,
    affinity: 88,
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
  {
    id: 'ravi',
    name: '라비',
    role: '힐러',
    met: true,
    staying: false,
    affinity: 30,
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
  {
    id: 'eira',
    name: '에이라',
    role: '도적',
    met: true,
    staying: false,
    affinity: 60,
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
  {
    id: 'goran',
    name: '고란',
    role: '전사',
    met: true,
    staying: false,
    affinity: 22,
    affinityLog: [
      { date: '2년 8일',  delta: +10, reason: '훈련장에서 대련 요청' },
      { date: '2년 19일', delta: +12, reason: '마물 퇴치 협력' },
    ],
    dialogLog: [
      { date: '2년 8일',  text: '「강해지고 싶으면 날 상대해봐. 말보다 주먹이 빠르거든.」' },
      { date: '2년 19일', text: '「...제법이군. 다음엔 좀 더 기대해도 되겠어.」' },
    ],
  },
  {
    id: 'thalia',
    name: '탈리아',
    role: '음유시인',
    met: true,
    staying: true,
    affinity: 55,
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
  {
    id: 'zephyr',
    name: '제피르',
    role: '소환사',
    met: true,
    staying: false,
    affinity: 38,
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
  {
    id: 'mirela',
    name: '미렐라',
    role: '성기사',
    met: true,
    staying: true,
    affinity: 66,
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
  {
    id: 'orm',
    name: '오름',
    role: '연금술사',
    met: true,
    staying: false,
    affinity: 42,
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
  {
    id: 'vael',
    name: '바엘',
    role: '용병',
    met: true,
    staying: false,
    affinity: 18,
    affinityLog: [
      { date: '2년 1일',  delta: +8,  reason: '길드에서 우연히 동행' },
      { date: '2년 14일', delta: +10, reason: '의뢰 보수 공평하게 분배' },
    ],
    dialogLog: [
      { date: '2년 1일',  text: '「같이 간다고? 뭐, 방해만 안 하면 돼.」' },
      { date: '2년 14일', text: '「정확하게 반반. 나 그런 거 좋아해.」' },
    ],
  },
  {
    id: 'soren',
    name: '소렌',
    role: '현자',
    met: true,
    staying: true,
    affinity: 79,
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
  {
    id: 'vael_unmet',
    name: '???',
    role: '???',
    met: false,
    staying: false,
    affinity: 0,
    affinityLog: [],
    dialogLog: [],
    meetHint: '변경지 용병 길드에서 고난도 의뢰를 완수하다 보면 소문을 듣고 찾아오는 이가 있을 것입니다.',
  },
];

function GiftModal({ char, onGift, onClose }) {
  const [given, setGiven] = useState(null);

  const handleGift = (item) => {
    setGiven(item);
    onGift(char.id, item);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.65)' }}>
      <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative flex flex-col" style={{ maxHeight: '80%' }}>
        <button onClick={onClose} className="absolute top-2 left-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px] leading-none">✕</button>
        <div className="text-[9px] font-bold text-center text-slate-700 mb-2">── {char.name}에게 선물 ──</div>

        {given ? (
          /* 선물 완료 — 대화 */
          <div className="overflow-y-auto flex flex-col gap-2">
            <div className="bg-slate-200 rounded px-2 py-1.5 flex items-center gap-2">
              <span className="text-[7px] font-bold text-slate-700">{given.name} 전달</span>
              <span className="ml-auto text-[7px] font-bold text-amber-600">호감도 +{given.affinity}</span>
            </div>
            <div className="flex flex-col gap-2">
              {(GIFT_DIALOGUES[char.id]?.[given.rarity] ?? [
                { speaker: 'player',    text: '받아줘서 고마워요.' },
                { speaker: 'companion', text: '「...고마워요.」' },
              ]).map((line, i) => (
                line.speaker === 'player' ? (
                  <div key={i} className="flex justify-end">
                    <div className="bg-amber-100 rounded rounded-tr-none px-2 py-1.5" style={{ maxWidth: '80%' }}>
                      <div className="text-[6px] text-amber-700 font-bold mb-0.5">나</div>
                      <div className="text-[7px] text-slate-700 leading-relaxed">{line.text}</div>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="bg-slate-200 rounded rounded-tl-none px-2 py-1.5" style={{ maxWidth: '80%' }}>
                      <div className="text-[6px] text-slate-500 font-bold mb-0.5">{char.name}</div>
                      <div className="text-[7px] text-slate-700 leading-relaxed">{line.text}</div>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        ) : (
          /* 아이템 목록 */
          <div className="overflow-y-auto flex flex-col gap-1.5">
            {GIFT_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleGift(item)}
                className={`bg-slate-200 rounded px-2 py-1.5 text-left flex items-center gap-2 active:scale-95 transition-transform ${RARITY_STYLE[item.rarity]}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[8px] font-bold text-slate-700">{item.name}</span>
                    <span className={`text-[5px] px-1 py-0.5 rounded font-bold ${
                      item.rarity === '특수' ? 'bg-amber-400 text-slate-800' :
                      item.rarity === '희귀' ? 'bg-blue-400 text-white' :
                      'bg-slate-400 text-white'
                    }`}>{item.rarity}</span>
                  </div>
                  <div className="text-[6px] text-slate-500 leading-tight">{item.desc}</div>
                </div>
                <div className="text-[8px] font-bold text-amber-600 flex-shrink-0">+{item.affinity}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AffinityBar({ value, className = '' }) {
  return (
    <div className={`h-1 bg-slate-400 rounded-full overflow-hidden ${className}`}>
      <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${value}%` }} />
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
      {/* 프로필 이미지 + 배지 오버레이 */}
      <div className="w-full aspect-square bg-slate-500 rounded relative flex items-center justify-center">
        {!char.met && <span className="text-slate-300 font-bold" style={{ fontSize: 22 }}>?</span>}
        <div className="absolute top-1 left-1 right-1 flex items-center justify-between">
          <span className={`text-[5px] font-bold px-1 py-0.5 rounded ${char.met ? roleBg : 'bg-slate-400'} text-white`}>
            {char.met ? char.role : '???'}
          </span>
          {char.met && (
            <img
              src={char.staying ? '/inn-active.svg' : '/inn-inactive.svg'}
              style={{ width: 14, height: 14 }}
            />
          )}
        </div>
      </div>
      {/* 이름 */}
      <div className="font-bold text-[9px] text-slate-700">
        {char.met ? char.name : '???'}
      </div>
      {/* 호감도 */}
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

function ListView({ companions, onSelect }) {
  const metCount = companions.filter(c => c.met).length;
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 타이틀 바 */}
      <div className="relative flex items-center px-3 h-8 bg-slate-200 border-b border-slate-300 flex-shrink-0">
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-600">
          동료 도감
        </span>
        <span className="ml-auto text-[7px] text-slate-500">{metCount}/{companions.length} 조우</span>
      </div>
      {/* 카드 그리드 */}
      <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-2">
        <div className="grid grid-cols-2 gap-2">
          {companions.map(c => (
            <CompanionCard key={c.id} char={c} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailView({ char, onBack, onGift }) {
  const [tab, setTab] = useState('affinity');
  const [giftOpen, setGiftOpen] = useState(false);
  const roleBg = ROLE_COLORS[char.role] ?? 'bg-slate-400';

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      {/* 타이틀 바 */}
      <div className="relative flex items-center px-3 h-8 bg-slate-200 border-b border-slate-300 flex-shrink-0">
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
            {char.met && <AffinityBar value={char.affinity} className="mt-1" />}
          </div>
        </div>
      </div>

      {/* 미조우: 만남 조건 힌트 / 조우: 탭 */}
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
          {/* 선물하기 버튼 */}
          <div className="bg-slate-200 px-3 pb-2 flex-shrink-0">
            <button
              onClick={() => setGiftOpen(true)}
              className="w-full bg-amber-400 text-slate-800 text-[8px] font-bold py-1.5 rounded active:scale-95 transition-transform"
            >
              선물하기 ▸
            </button>
          </div>

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

          {/* 로그 영역 */}
          <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-2">
            {tab === 'affinity' ? (
              char.affinityLog.length === 0 ? (
                <div className="text-[8px] text-slate-400 text-center mt-4">기록 없음</div>
              ) : (
                <div className="flex flex-col gap-1">
                  {char.affinityLog.map((log, i) => (
                    <div key={i} className="bg-slate-200 rounded px-2 py-1.5 flex items-center gap-2">
                      <span className="text-[6px] text-slate-400 flex-shrink-0">{log.date}</span>
                      <span className="flex-1 text-[7px] text-slate-600">{log.reason}</span>
                      <span className="text-[8px] font-bold text-amber-600 flex-shrink-0">
                        {log.delta > 0 ? `+${log.delta}` : log.delta}
                      </span>
                    </div>
                  ))}
                </div>
              )
            ) : (
              char.dialogLog.length === 0 ? (
                <div className="text-[8px] text-slate-400 text-center mt-4">기록 없음</div>
              ) : (
                <div className="flex flex-col gap-2">
                  {char.dialogLog.map((log, i) => (
                    <div key={i} className="bg-slate-200 rounded px-2 py-1.5">
                      <div className="text-[6px] text-slate-400 mb-0.5">{log.date}</div>
                      <div className="text-[7px] text-slate-600 leading-relaxed">{log.text}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </>
      )}

      {/* 선물 모달 */}
      {giftOpen && (
        <GiftModal
          char={char}
          onGift={(id, item) => { onGift(id, item); }}
          onClose={() => setGiftOpen(false)}
        />
      )}
    </div>
  );
}

export default function EncyclopediaScreen() {
  const [companions, setCompanions] = useState(COMPANIONS);
  const [selectedId, setSelectedId] = useState(null);

  const selected = companions.find(c => c.id === selectedId) ?? null;

  const handleGift = (charId, item) => {
    setCompanions(prev => prev.map(c => {
      if (c.id !== charId) return c;
      const newAffinity = Math.min(100, c.affinity + item.affinity);
      return {
        ...c,
        affinity: newAffinity,
        affinityLog: [
          ...c.affinityLog,
          { date: '현재', delta: item.affinity, reason: `선물: ${item.name}` },
        ],
      };
    }));
  };

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        {selected
          ? <DetailView
              char={selected}
              onBack={() => setSelectedId(null)}
              onGift={handleGift}
            />
          : <ListView companions={companions} onSelect={(c) => setSelectedId(c.id)} />
        }
      </div>
      <Nav />
    </>
  );
}
