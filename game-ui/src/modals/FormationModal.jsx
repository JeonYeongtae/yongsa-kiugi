import { useState } from 'react';

/* ═══════════════════════════════════ WEAPONS ═══════════════════════════════════ */

const WEAPONS = [
  { id:  1, name: '수련용 목재 둔기',       cat: '근접', tier: 1, atk:  4 },
  { id:  2, name: '로슨 워드',              cat: '근접', tier: 1, atk:  5 },
  { id:  3, name: '조잡한 사냥용 단궁',     cat: '원거', tier: 1, atk:  4 },
  { id:  4, name: '로슨 트리 크로스보우',   cat: '원거', tier: 1, atk:  5 },
  { id:  5, name: '훈련용 창',              cat: '근접', tier: 1, atk:  4 },
  { id:  6, name: '비상 단검',              cat: '근접', tier: 1, atk:  3 },
  { id:  7, name: '목재 아형 방패',         cat: '방어', tier: 1, def:  4 },
  { id:  8, name: '마법사의 지팡이',        cat: '마법', tier: 1, matk: 6 },
  { id:  9, name: '오래된 기초 마법 책',    cat: '마법', tier: 1, matk: 5 },
  { id: 10, name: '구리 하트',              cat: '마법', tier: 1, matk: 4 },
  { id: 11, name: '비상 등불',              cat: '서포', tier: 1, sup:  3 },
  { id: 12, name: '소아 방인',              cat: '서포', tier: 1, sup:  3 },
  { id: 13, name: '나무 피파',              cat: '서포', tier: 1, sup:  3 },
  { id: 14, name: '철제 외날검',            cat: '근접', tier: 2, atk: 10 },
  { id: 15, name: '용변의 롱소드',          cat: '근접', tier: 2, atk: 12 },
  { id: 16, name: '철제 장궁',              cat: '원거', tier: 2, atk: 10 },
  { id: 17, name: '헤비 크로스보우',        cat: '원거', tier: 2, atk: 11 },
  { id: 18, name: '철이 창',                cat: '근접', tier: 2, atk:  9 },
  { id: 19, name: '강철 단검',              cat: '근접', tier: 2, atk:  8 },
  { id: 20, name: '철제 카이트 쉴드',       cat: '방어', tier: 2, def:  9 },
  { id: 21, name: '마력이 깃든 지팡이',     cat: '마법', tier: 2, matk: 11 },
  { id: 22, name: '일반 마뇨사',            cat: '마법', tier: 2, matk: 10 },
  { id: 23, name: '상위 하트',              cat: '마법', tier: 2, matk:  9 },
  { id: 24, name: '청동의 등불',            cat: '서포', tier: 2, sup:   8 },
  { id: 25, name: '의식용 종',              cat: '서포', tier: 2, sup:   8 },
  { id: 26, name: '전도사의 리라',          cat: '서포', tier: 2, sup:   8 },
  { id: 27, name: '기사단 전용 둔검',       cat: '근접', tier: 3, atk: 18 },
  { id: 28, name: '기사단 전용 롱소드',     cat: '근접', tier: 3, atk: 20 },
  { id: 29, name: '기사단 전용 활',         cat: '원거', tier: 3, atk: 17 },
  { id: 30, name: '기사단 전용 석궁',       cat: '원거', tier: 3, atk: 18 },
  { id: 31, name: '기사단 전용 창',         cat: '근접', tier: 3, atk: 16 },
  { id: 32, name: '기사단 전용 단검',       cat: '근접', tier: 3, atk: 15 },
  { id: 33, name: '기사단 전용 방패',       cat: '방어', tier: 3, def: 16 },
  { id: 34, name: '마심이 담긴 지팡이',     cat: '마법', tier: 3, matk: 19 },
  { id: 35, name: '마력의 축복을 받은 책',  cat: '마법', tier: 3, matk: 17 },
  { id: 36, name: '크리스털 포켓트',        cat: '마법', tier: 3, matk: 18 },
  { id: 37, name: '전성한 등불',            cat: '서포', tier: 3, sup:  15 },
  { id: 38, name: '축복 받은 의식종',       cat: '서포', tier: 3, sup:  15 },
  { id: 39, name: '전주가 깃든 피파',       cat: '서포', tier: 3, sup:  15 },
];

/* ═══════════════════════════════════ SKILLS ════════════════════════════════════ */

const SKILLS = [
  // ── 근접 기본
  { id:  1, name: '강력한 일격',    cat: '근접', tier: '기본', target: '단일', type: '공격',  mp: 18, desc: '적 1명에게 강력한 근접 물리 피해를 입힌다.' },
  { id:  2, name: '회전 베기',      cat: '근접', tier: '기본', target: '전체', type: '공격',  mp: 32, desc: '무기를 크게 휘둘러 적 전체에게 물리 피해를 입힌다.' },
  { id:  3, name: '전사의 포기',    cat: '근접', tier: '기본', target: '자기', type: '버프',  mp: 15, desc: '[자기 버프] 1턴간 자신의 물리 공격력을 대폭 상승시킨다.' },
  // ── 근접 중급
  { id:  4, name: '판가름',         cat: '근접', tier: '중급', target: '단일', type: '공격',  mp: 26, desc: '대상의 물리 방어력 15%를 무시하고 강력한 피해를 입힌다.' },
  { id:  5, name: '속단의 일격',    cat: '근접', tier: '중급', target: '단일', type: '공격',  mp: 25, desc: '물리 피해를 주고 3턴간 대상의 최종 명중률을 -10% 감소시킨다.' },
  // ── 근접 고급
  { id:  6, name: '대지 가르기',    cat: '근접', tier: '고급', target: '단일', type: '공격',  mp: 32, desc: '무기를 내리쳐 대상의 물방 30%를 무시하고 최강 근접 피해를 입힌다.' },
  // ── 원거 기본
  { id:  7, name: '심장 꿰뚫기',   cat: '원거', tier: '기본', target: '단일', type: '공격',  mp: 20, desc: '정밀하게 화살을 날려 적 1명에게 높은 물리 피해를 입힌다.' },
  { id:  8, name: '화살비',         cat: '원거', tier: '기본', target: '전체', type: '공격',  mp: 35, desc: '공중에서 쏟아지는 화살로 적 전체에게 물리 피해를 입힌다.' },
  { id:  9, name: '사냥꾼의 집중', cat: '원거', tier: '기본', target: '자기', type: '버프',  mp: 12, desc: '[자기 버프] 2턴간 자신의 명중률을 극대화한다.' },
  // ── 원거 중급
  { id: 10, name: '정밀 저격',     cat: '원거', tier: '중급', target: '단일', type: '공격',  mp: 24, desc: '최종 명중률 +10% 보정 후 강력한 물리 피해를 입힌다.' },
  { id: 11, name: '화살 산발',     cat: '원거', tier: '중급', target: '전체', type: '공격',  mp: 38, desc: '여러 방향 화살을 동시에 발사해 적 전체를 공격한다.' },
  // ── 원거 고급
  { id: 12, name: '바람의 추적자', cat: '원거', tier: '고급', target: '단일', type: '공격',  mp: 32, desc: '최종 명중률 +20%, 최소 명중률 80% 보장. 치명적인 피해를 입힌다.' },
  // ── 마법 기본
  { id: 13, name: '비전 화살',     cat: '마법', tier: '기본', target: '단일', type: '공격',  mp: 22, desc: '응축된 마력을 날려 단일 대상에게 강력한 마법 피해를 입힌다.' },
  { id: 14, name: '마력 폭발',     cat: '마법', tier: '기본', target: '전체', type: '공격',  mp: 42, desc: '전장의 마력을 방출하여 적 전체에게 마법 피해를 입힌다.' },
  { id: 15, name: '지식의 감화',   cat: '마법', tier: '기본', target: '자기', type: '버프',  mp: 18, desc: '[자기 버프] 1턴간 자신의 마법 공격력을 대폭 상승시킨다.' },
  // ── 마법 중급
  { id: 16, name: '마력 집중',     cat: '마법', tier: '중급', target: '자기', type: '버프',  mp: 12, desc: '[자기 버프] 3턴간 자신의 스킬 MP 소모량을 15% 감소시킨다.' },
  { id: 17, name: '마력 역류',     cat: '마법', tier: '중급', target: '단일', type: '공격',  mp: 28, desc: '마법 피해를 주고 3턴간 대상의 마나 소모량을 +15% 증가시킨다.' },
  // ── 마법 고급
  { id: 18, name: '비전 붕괴',     cat: '마법', tier: '고급', target: '전체', type: '공격',  mp: 50, desc: '전장의 마력을 폭주시켜 적 전체에게 강력한 광역 마법 피해를 입힌다.' },
  // ── 방어 기본
  { id: 19, name: '수호의 방패',   cat: '방어', tier: '기본', target: '단일', type: '보호막', mp: 25, desc: '[보호막] 3턴간 대상의 물리(근접/원거) 방어력을 대폭 상승시킨다.' },
  { id: 20, name: '진형 유지',     cat: '방어', tier: '기본', target: '전체', type: '버프',  mp: 40, desc: '1턴간 아군 전체의 물리 방어력을 소폭 상승시킨다.' },
  { id: 21, name: '도발의 외침',   cat: '방어', tier: '기본', target: '전체', type: '디버프', mp: 15, desc: '적을 자극하여 2턴간 자신을 우선 공격하게 만든다.' },
  { id: 22, name: '성령의 장벽',   cat: '방어', tier: '기본', target: '단일', type: '보호막', mp: 25, desc: '[보호막] 3턴간 대상의 마법 방어력을 대폭 상승시킨다.' },
  // ── 방어 중급
  { id: 23, name: '철벽의 가호',   cat: '방어', tier: '중급', target: '아군', type: '보호막', mp: 30, desc: '2턴간 아군 1인이 받는 단일 공격을 대신 막아준다. 막을 시 받는 피해 -20%.' },
  { id: 24, name: '견고한 위상',   cat: '방어', tier: '중급', target: '전체', type: '버프',  mp: 42, desc: '2턴간 아군 전체의 물리 방어력을 +15% 상승시킨다.' },
  { id: 25, name: '성령의 가호',   cat: '방어', tier: '중급', target: '전체', type: '버프',  mp: 42, desc: '2턴간 아군 전체의 마법 방어력을 +15% 상승시킨다.' },
  // ── 방어 고급
  { id: 26, name: '성령의 성역',   cat: '방어', tier: '고급', target: '단일', type: '보호막', mp: 35, desc: '[보호막] 3턴간 대상이 받는 마법 피해를 40% 감소시킨다.' },
  { id: 27, name: '대공분립',      cat: '방어', tier: '고급', target: '단일', type: '보호막', mp: 35, desc: '[보호막] 3턴간 대상이 받는 물리 피해를 40% 감소시킨다.' },
  // ── 서포 기본
  { id: 28, name: '상냥한 치유',   cat: '서포', tier: '기본', target: '단일', type: '힐',    mp: 22, desc: '대상의 HP를 즉시 크게 회복시킨다.' },
  { id: 29, name: '시대의 물결',   cat: '서포', tier: '기본', target: '전체', type: '힐',    mp: 40, desc: '아군 전체의 HP를 즉시 소폭 회복시킨다.' },
  { id: 30, name: '용기의 찬가',   cat: '서포', tier: '기본', target: '단일', type: '버프',  mp: 28, desc: '[버프] 3턴간 대상의 물공/마공 스탯을 상승시킨다.' },
  { id: 31, name: '지격의 서림',   cat: '서포', tier: '기본', target: '전체', type: '버프',  mp: 45, desc: '[버프] 1턴간 아군 전체의 물공/마공 스탯을 상승시킨다.' },
  { id: 32, name: '빛의 굴절',     cat: '서포', tier: '기본', target: '단일', type: '디버프', mp: 28, desc: '[디버프] 3턴간 대상의 물공/마공 스탯을 감소시킨다.' },
  { id: 33, name: '붕괴찬가',      cat: '서포', tier: '기본', target: '전체', type: '디버프', mp: 45, desc: '[디버프] 1턴간 적 전체의 물공/마공 스탯을 감소시킨다.' },
  // ── 서포 중급
  { id: 34, name: '성심의 이새',   cat: '서포', tier: '중급', target: '단일', type: '힐',    mp: 28, desc: '대상의 HP를 회복하고 모든 약화 디버프를 제거한다.' },
  { id: 35, name: '명상의 치유',   cat: '서포', tier: '중급', target: '단일', type: '힐',    mp: 12, desc: 'MP 소모가 매우 적은 단일 회복 스킬. 장기전 관리에 유리하다.' },
  { id: 36, name: '활력의 찬가',   cat: '서포', tier: '중급', target: '전체', type: '버프',  mp: 34, desc: '2턴간 아군 전체의 최종 명중률을 상승시킨다.' },
  { id: 37, name: '전장의 숨결',   cat: '서포', tier: '중급', target: '전체', type: '버프',  mp: 35, desc: '2턴간 아군 전체의 속도를 상승시킨다.' },
  { id: 38, name: '무력의 곡조',   cat: '서포', tier: '중급', target: '단일', type: '디버프', mp: 30, desc: '3턴간 대상의 물리/마법 방어력을 감소시킨다.' },
  { id: 39, name: '굴복의 숨결',   cat: '서포', tier: '중급', target: '전체', type: '디버프', mp: 45, desc: '2턴간 적 전체의 스킬 MP 소모량을 증가시킨다.' },
  // ── 서포 고급
  { id: 40, name: '기적의 빛',     cat: '서포', tier: '고급', target: '단일', type: '힐',    mp: 45, desc: '대상의 HP를 완전히 회복시키고 모든 약화 효과를 제거한다.' },
  { id: 41, name: '신성의 찬가',   cat: '서포', tier: '고급', target: '단일', type: '버프',  mp: 50, desc: '3턴간 대상의 모든 공격력을 최고치까지 상승시킨다.' },
  { id: 42, name: '쇠약의 주술',   cat: '서포', tier: '고급', target: '단일', type: '디버프', mp: 50, desc: '3턴간 대상의 모든 공격력을 최소치까지 감소시킨다.' },
];

/* ═══════════════════════════════════ CONSTANTS ══════════════════════════════════ */

const CAT_ICON  = { '근접': '⚔', '원거': '🏹', '방어': '🛡', '마법': '✦', '서포': '♪' };
const CAT_LABEL = { '근접': '근접 · 물리', '원거': '원거 · 물리', '방어': '방어', '마법': '마법', '서포': '서포터' };
const FILTERS   = ['전체', '근접', '원거', '방어', '마법', '서포'];

const TIER_STYLE = { '기본': 'text-slate-400', '중급': 'text-blue-400', '고급': 'text-amber-400' };
const TYPE_STYLE = {
  '공격':  'bg-red-100 text-red-600',
  '버프':  'bg-blue-100 text-blue-600',
  '디버프': 'bg-purple-100 text-purple-600',
  '힐':    'bg-green-100 text-green-600',
  '보호막': 'bg-slate-200 text-slate-600',
};

const COMPANIONS = [
  { id: 1,  name: 'Adin',     race: '엘프',   weapon: '근접', weaponName: '대검',       role: '딜러',   guardian: '우르굴라',  concept: '대검을 사랑해 활을 버린 엘프',           color: '#7CFC00' },
  { id: 2,  name: 'Gabian',   race: '드워프',  weapon: '방어', weaponName: '방패',       role: '탱커',   guardian: '두브',      concept: '굳건한 방패가 되는 자칭 모두의 음유시인', color: '#861a22' },
  { id: 3,  name: 'Cronel',   race: '마족',   weapon: '서포', weaponName: '서포터(버프)',  role: '버프',   guardian: '지바안나',  concept: '타인을 수호하는 신앙심의 수호자',         color: '#DCDCDC' },
  { id: 4,  name: 'Dephinel', race: '마족',   weapon: '서포', weaponName: '서포터(디버프)',role: '디버프', guardian: '수후르마시', concept: '타인을 저주하는 신앙심의 수호자',        color: '#D3D3D3' },
  { id: 5,  name: 'Escital',  race: '인간',   weapon: '마법', weaponName: '책',          role: '마법사', guardian: '마시타브바', concept: '평범해서 더욱 평범하지 않은 마법사',     color: '#555555' },
  { id: 6,  name: 'Felisika', race: '수인족',  weapon: '서포', weaponName: '서포터(힐)',   role: '힐러',   guardian: '아브신',    concept: '생명을 구원하고자하는 방랑자',           color: '#8FBC8F' },
  { id: 7,  name: 'Ossian',   race: '엘프',   weapon: '원거', weaponName: '활',          role: '원거딜', guardian: '구안나',    concept: '온오프가 확실한 햇살+냉정 엘프',         color: '#FAF3D7' },
  { id: 8,  name: 'Neon',     race: '인간',   weapon: '마법', weaponName: '책',          role: '마법사', guardian: '심마흐',    concept: '균형형 마딜러',                          color: '#191970' },
  { id: 9,  name: 'Isolde',   race: '엘프',   weapon: '마법', weaponName: '지팡이',      role: '마법사', guardian: '기르타브',  concept: '모든 것을 태우는 오만의 잿불',           color: '#8A2BE2' },
  { id: 10, name: 'Joanna',   race: '인간',   weapon: '방어', weaponName: '팬던트',      role: '탱커',   guardian: '구',        concept: '마법 탱커',                              color: '#FFF8ED' },
  { id: 11, name: 'Knox',     race: '마족',   weapon: '근접', weaponName: '단검',        role: '딜러',   guardian: '쿠말',      concept: '집착 안데레 어쎄신',                    color: '#A61B3C' },
  { id: 12, name: 'Larc',     race: '수인족',  weapon: '원거', weaponName: '석궁',        role: '원거딜', guardian: '파빌',      concept: '명중형 원딜',                           color: '#4DA8DA' },
];

function statLabel(w) {
  if (!w) return '';
  if (w.atk)  return `공격 +${w.atk}`;
  if (w.def)  return `방어 +${w.def}`;
  if (w.matk) return `마공 +${w.matk}`;
  if (w.sup)  return `서포 +${w.sup}`;
  return '';
}

/* ═══════════════════════════════════ LIST CARD ══════════════════════════════════ */

function ListCard({ icon, tier, tierStyle, name, right, badge, equipped, dimmed, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full flex items-stretch gap-1.5 rounded px-1.5 py-1 text-left transition-opacity ${equipped ? 'bg-amber-100 border border-amber-300' : 'bg-slate-200'} ${dimmed ? 'opacity-40' : ''}`}
      style={{ minHeight: '46px' }}>
      <span className="text-[11px] w-4 text-center flex-shrink-0 self-center">{icon}</span>
      <span className="flex-1 min-w-0 relative flex items-center">
        <span className={`absolute top-0 left-0 text-[7px] leading-none ${tierStyle}`}>{tier}</span>
        <span className="text-[10px] font-bold text-slate-700 truncate leading-tight">{name}</span>
      </span>
      <span className="flex flex-col items-end justify-center gap-0.5 flex-shrink-0 self-center">
        {right}
      </span>
      <span className="w-7 flex-shrink-0 self-center flex items-center justify-center">
        {badge && (
          <span className="text-[6px] border border-amber-400 text-amber-500 px-1 py-0.5 rounded font-bold leading-none">장착</span>
        )}
      </span>
      <span className="text-[9px] text-slate-400 flex-shrink-0 self-center">›</span>
    </button>
  );
}

/* ═══════════════════════════════════ WEAPON VIEWS ══════════════════════════════ */

function WeaponEquipWarning({ pendingWeapon, conflictSkills, equippedWeaponCat, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.65)' }}>
      <div className="bg-slate-100 rounded p-3 w-[200px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
        <div className="text-[10px] font-bold text-center mb-3">── 장비 교체 확인 ──</div>
        <div className="flex gap-2 mb-3">
          <div className="w-10 h-10 bg-slate-400 rounded flex items-center justify-center text-[16px] flex-shrink-0">
            {CAT_ICON[pendingWeapon.cat]}
          </div>
          <div className="text-[8px] text-slate-700 flex flex-col justify-center gap-0.5">
            <div className="font-bold text-[9px]">{pendingWeapon.name}</div>
            <div className="text-[7px] text-amber-500">{'★'.repeat(pendingWeapon.tier)}</div>
            <div className="text-[7px] text-slate-500">{CAT_LABEL[pendingWeapon.cat]}</div>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-300 rounded p-2 mb-3">
          <div className="text-[8px] font-bold text-amber-800 mb-1">⚠ 장착 스킬이 모두 해제됩니다</div>
          <div className="text-[7px] text-slate-600 mb-1.5">현재 장착된 스킬 ({equippedWeaponCat} 무기군)</div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            {conflictSkills.map(s => (
              <span key={s.id} className="px-1 py-0.5 bg-rose-100 border border-rose-300 rounded text-[6px] text-rose-700">{s.name}</span>
            ))}
          </div>
          <div className="text-[7px] text-slate-500">{equippedWeaponCat} → {pendingWeapon.cat} 교체 시 위 스킬 사용 불가</div>
        </div>
        <button onClick={onConfirm} className="w-full py-1.5 bg-rose-500 text-white text-[9px] rounded font-bold">
          해제 후 장착 ▸
        </button>
      </div>
    </div>
  );
}

function WeaponDetail({ weapon, isEquipped, onEquip, onBack, onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative flex flex-col" style={{ height: '360px' }}>
      <button onClick={onBack}  className="absolute top-2 right-2  w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">‹</button>
      <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
      <div className="text-[10px] font-bold text-center mb-3">── 무기 정보 ──</div>
      <div className="flex gap-2 mb-3">
        <div className="w-14 h-14 bg-slate-400 rounded flex items-center justify-center text-[22px] flex-shrink-0">
          {CAT_ICON[weapon.cat]}
        </div>
        <div className="text-[8px] text-slate-700">
          <div className="font-bold text-[9px] leading-tight">{weapon.name}</div>
          <div className="text-[7px] text-amber-500 mb-0.5">{'★'.repeat(weapon.tier)}</div>
          <div className="text-[7px] text-slate-500">{CAT_LABEL[weapon.cat]}</div>
          <div className="text-green-700 text-[8px] font-bold mt-1">{statLabel(weapon)}</div>
        </div>
      </div>
      <div className="flex-1" />
      {isEquipped ? (
        <div className="w-full py-1.5 bg-amber-200 text-amber-700 text-[8px] text-center rounded font-bold">현재 장착 중</div>
      ) : (
        <button onClick={onEquip} className="w-full py-1.5 bg-slate-600 text-white text-[8px] rounded font-bold">장착하기 ▸</button>
      )}
    </div>
  );
}

function WeaponView({ equippedId, onEquip, onBack, onClose }) {
  const [filter,   setFilter]   = useState('전체');
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <WeaponDetail
        weapon={selected}
        isEquipped={selected.id === equippedId}
        onEquip={() => { onEquip(selected.id); setSelected(null); }}
        onBack={() => setSelected(null)}
        onClose={onClose}
      />
    );
  }

  const filtered = filter === '전체' ? WEAPONS : WEAPONS.filter(w => w.cat === filter);

  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative flex flex-col" style={{ height: '360px' }}>
      <button onClick={onBack}  className="absolute top-2 right-2  w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">‹</button>
      <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
      <div className="text-[10px] font-bold text-center mb-4">── 무기 목록 ──</div>
      <div className="flex gap-0.5 mb-3">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-1 py-1 rounded text-[7px] ${filter === f ? 'bg-slate-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
            {f === '전체' ? f : CAT_ICON[f]}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {filtered.map(w => (
          <ListCard key={w.id}
            icon={CAT_ICON[w.cat]}
            tier={'★'.repeat(w.tier)}
            tierStyle="text-amber-500"
            name={w.name}
            right={<span className="text-[8px] text-slate-500">{statLabel(w)}</span>}
            badge={w.id === equippedId ? '장착' : null}
            equipped={w.id === equippedId}
            dimmed={false}
            onClick={() => setSelected(w)}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════ SKILL VIEWS ═══════════════════════════════ */

function SkillDetail({ skill, isActive, isEquipped, equippedCount, onEquip, onBack, onClose }) {
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative flex flex-col" style={{ height: '360px' }}>
      <button onClick={onBack}  className="absolute top-2 right-2  w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">‹</button>
      <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
      <div className="text-[10px] font-bold text-center mb-3">── 스킬 정보 ──</div>
      <div className="flex gap-2 mb-3">
        <div className="w-12 h-12 bg-slate-400 rounded flex items-center justify-center text-[18px] flex-shrink-0">
          {CAT_ICON[skill.cat]}
        </div>
        <div className="text-[8px] text-slate-700">
          <div className="font-bold text-[9px] leading-tight">{skill.name}</div>
          <div className={`text-[7px] mb-0.5 ${TIER_STYLE[skill.tier]}`}>{skill.tier}</div>
          <div className="text-[7px] text-slate-500 mb-0.5">{CAT_LABEL[skill.cat]}</div>
          <div className="flex items-center gap-1">
            <span className={`text-[6px] px-1 py-0.5 rounded ${TYPE_STYLE[skill.type]}`}>{skill.type}</span>
            <span className="text-[6px] text-slate-400">{skill.target} · MP {skill.mp}</span>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-slate-200 rounded p-1.5 mb-3 text-[7px] text-slate-600 italic leading-relaxed overflow-y-auto">
        {skill.desc}
      </div>
      {!isActive ? (
        <div className="w-full py-1.5 bg-slate-200 text-slate-400 text-[8px] text-center rounded">
          {CAT_ICON[skill.cat]} 해당 무기 미착용
        </div>
      ) : isEquipped ? (
        <button onClick={onEquip} className="w-full py-1.5 bg-red-100 text-red-600 text-[8px] rounded font-bold">
          해제하기 ✕
        </button>
      ) : equippedCount >= 2 ? (
        <div className="w-full py-1.5 bg-slate-200 text-slate-400 text-[8px] text-center rounded">
          슬롯이 가득 찼습니다
        </div>
      ) : (
        <button onClick={onEquip} className="w-full py-1.5 bg-slate-600 text-white text-[8px] rounded font-bold">
          장착하기 ▸
        </button>
      )}
    </div>
  );
}

function SkillView({ equippedWeaponCat, equippedSkillIds, onEquip, onBack, onClose }) {
  const [catFilter,  setCatFilter]  = useState(equippedWeaponCat ?? '전체');
  const [typeFilter, setTypeFilter] = useState('전체');
  const [selected,   setSelected]   = useState(null);

  const handleCatFilter = (f) => { setCatFilter(f); setTypeFilter('전체'); };

  const catSkills     = catFilter === '전체' ? SKILLS : SKILLS.filter(s => s.cat === catFilter);
  const availableTypes = ['전체', ...new Set(catSkills.map(s => s.type))];
  const filtered      = catSkills.filter(s => typeFilter === '전체' || s.type === typeFilter);

  if (selected) {
    return (
      <SkillDetail
        skill={selected}
        isActive={selected.cat === equippedWeaponCat}
        isEquipped={equippedSkillIds.includes(selected.id)}
        equippedCount={equippedSkillIds.length}
        onEquip={() => { onEquip(selected.id); setSelected(null); }}
        onBack={() => setSelected(null)}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative flex flex-col" style={{ height: '360px' }}>
      <button onClick={onBack}  className="absolute top-2 right-2  w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">‹</button>
      <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
      <div className="text-[10px] font-bold text-center mb-3">── 스킬 목록 ──</div>
      <div className="text-[7px] text-slate-500 text-center mb-3">
        장착 {equippedSkillIds.length}/2 &nbsp;·&nbsp; {CAT_ICON[equippedWeaponCat]} {equippedWeaponCat ?? '?'} 무기 장착중
      </div>
      {/* 무기군 탭 */}
      <div className="flex gap-0.5 mb-2">
        {FILTERS.map(f => (
          <button key={f} onClick={() => handleCatFilter(f)}
            className={`flex-1 py-1 rounded text-[7px] ${catFilter === f ? 'bg-slate-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
            {f === '전체' ? f : CAT_ICON[f]}
          </button>
        ))}
      </div>
      {/* 타입 pill — 현재 카테고리에 존재하는 타입만 표시 */}
      <div className="flex flex-wrap gap-1 mb-3 px-0.5">
        {availableTypes.map(t => (
          <button key={t} onClick={() => setTypeFilter(t)}
            className={`px-1.5 py-0.5 rounded-full text-[7px] transition-colors ${
              typeFilter === t
                ? t === '전체' ? 'bg-slate-400 text-white' : `${TYPE_STYLE[t]} font-bold`
                : 'bg-slate-200 text-slate-400'
            }`}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {filtered.length === 0 && (
          <div className="text-[7px] text-slate-400 text-center py-4">해당하는 스킬이 없습니다</div>
        )}
        {filtered.map(s => {
          const active   = s.cat === equippedWeaponCat;
          const equipped = equippedSkillIds.includes(s.id);
          return (
            <ListCard key={s.id}
              icon={CAT_ICON[s.cat]}
              tier={s.tier}
              tierStyle={TIER_STYLE[s.tier]}
              name={s.name}
              right={
                <>
                  <span className={`text-[6px] px-1 py-0.5 rounded ${TYPE_STYLE[s.type]}`}>{s.type}</span>
                  <span className="text-[7px] text-slate-400">MP {s.mp}</span>
                </>
              }
              badge={equipped ? '✦' : null}
              equipped={equipped}
              dimmed={!active}
              onClick={() => setSelected(s)}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════ PARTY VIEWS ═══════════════════════════════ */

function CompanionDetail({ companion, isInParty, canAdd, onToggle, onBack, onClose }) {
  return (
    <div className="bg-slate-100 rounded overflow-hidden w-full max-w-[240px] relative flex flex-col" style={{ height: '360px' }}>
      {/* 일러스트 */}
      <div className="w-full bg-slate-300 flex items-end justify-center relative flex-shrink-0" style={{ height: '160px' }}>
        <span className="text-[8px] text-slate-400 pb-1.5">일러스트</span>
        <button onClick={onBack}  className="absolute top-2 right-2  w-5 h-5 bg-black/20 rounded flex items-center justify-center text-white text-[11px]">‹</button>
        <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 bg-black/20 rounded flex items-center justify-center text-white text-[11px]">✕</button>
        <span className="absolute bottom-2 right-2 text-[6px] px-1.5 py-0.5 rounded bg-slate-700/70 text-white font-bold">
          {companion.role}
        </span>
      </div>

      {/* 이름 + 컨셉 */}
      <div className="px-3 pt-2.5 pb-2 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-[12px] text-slate-800">{companion.name}</span>
          <span className="text-[7px] text-slate-400">{companion.race}</span>
        </div>
        <div className="text-[7px] text-slate-500 mt-0.5 italic leading-relaxed">{companion.concept}</div>
      </div>

      {/* 정보 rows */}
      <div className="flex-1 px-3 py-2 space-y-1.5">
        <div className="flex items-center">
          <span className="text-[7px] text-slate-400 w-10 flex-shrink-0">무기</span>
          <span className="text-[8px] text-slate-400 mr-1">{CAT_ICON[companion.weapon]}</span>
          <span className="text-[8px] font-bold text-slate-700">{companion.weaponName}</span>
        </div>
        <div className="flex items-center">
          <span className="text-[7px] text-slate-400 w-10 flex-shrink-0">수호신</span>
          <span className="text-[8px] font-bold text-slate-700">{companion.guardian}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-3 pb-3 flex-shrink-0">
        {isInParty ? (
          <button onClick={onToggle}
            className="w-full py-1.5 bg-red-100 text-red-600 text-[8px] rounded font-bold">
            파티에서 제외 ✕
          </button>
        ) : canAdd ? (
          <button onClick={onToggle}
            className="w-full py-1.5 bg-slate-600 text-white text-[8px] rounded font-bold">
            파티에 추가 ▸
          </button>
        ) : (
          <div className="w-full py-1.5 bg-slate-200 text-slate-400 text-[8px] text-center rounded">
            파티가 가득 찼습니다
          </div>
        )}
      </div>
    </div>
  );
}

const ROLE_FILTERS = ['전체', '딜러', '원거딜', '마법사', '탱커', '힐러', '버프', '디버프'];

function PartyView({ party, setParty, onBack, onClose }) {
  const [selected,   setSelected]   = useState(null);
  const [roleFilter, setRoleFilter] = useState('전체');

  const remove = (id) => setParty(p => p.filter(m => m !== id));
  const add    = (id) => { if (party.length < 3) setParty(p => [...p, id]); };
  const toggle = (comp) => {
    if (party.includes(comp.id)) remove(comp.id);
    else add(comp.id);
    setSelected(null);
  };

  if (selected) {
    return (
      <CompanionDetail
        companion={selected}
        isInParty={party.includes(selected.id)}
        canAdd={party.length < 3}
        onToggle={() => toggle(selected)}
        onBack={() => setSelected(null)}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative flex flex-col" style={{ height: '360px' }}>
      <button onClick={onBack}  className="absolute top-2 right-2  w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">‹</button>
      <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
      <div className="text-[10px] font-bold text-center mb-4">── 파티 편성 ──</div>

      {/* 현재 파티 슬롯 */}
      <div className="grid grid-cols-4 gap-1.5 mb-4">
        <div className="aspect-[3/4] rounded bg-slate-500 ring-2 ring-amber-400 flex flex-col relative text-white">
          <div className="flex-1 bg-slate-400 rounded-t" />
          <span className="text-[6px] text-center py-0.5 truncate px-0.5">HERO</span>
        </div>
        {Array(3).fill(0).map((_, i) => {
          const comp = party[i] != null ? COMPANIONS.find(c => c.id === party[i]) : null;
          return (
            <div key={i}
              className={`aspect-[3/4] rounded flex flex-col relative text-[6px] cursor-pointer ${comp ? 'bg-slate-500 text-white' : 'bg-slate-200 text-slate-400 border border-dashed border-slate-400'}`}
              onClick={() => comp && setSelected(comp)}>
              {comp ? (
                <>
                  <div className="flex-1 bg-slate-400 rounded-t" />
                  <button onClick={(e) => { e.stopPropagation(); remove(comp.id); }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 text-white rounded-full flex items-center justify-center text-[6px]">✕</button>
                  <span className="text-center py-0.5 truncate px-0.5">{comp.name}</span>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[8px]">+</div>
              )}
            </div>
          );
        })}
      </div>

      {/* 동료 전체 목록 */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">동료 목록</span>
        <span className="text-[7px] text-slate-400">파티 {party.length}/3</span>
      </div>
      {/* 역할 필터 pills */}
      <div className="flex flex-wrap gap-1 mb-2">
        {ROLE_FILTERS.map(r => (
          <button key={r} onClick={() => setRoleFilter(r)}
            className={`px-1.5 py-0.5 rounded-full text-[7px] transition-colors ${
              roleFilter === r ? 'bg-slate-500 text-white' : 'bg-slate-200 text-slate-400'
            }`}>
            {r}
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {COMPANIONS.filter(c => roleFilter === '전체' || c.role === roleFilter).map(c => {
          const inParty = party.includes(c.id);
          return (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full flex items-center gap-1.5 rounded px-1.5 py-1 text-left ${inParty ? 'bg-amber-100 border border-amber-300' : 'bg-slate-200'}`}>
              {/* 일러스트 플레이스홀더 */}
              <span className="w-7 h-9 rounded bg-slate-300 flex-shrink-0" />
              <span className="flex-1 min-w-0 flex flex-col justify-between" style={{ minHeight: '36px' }}>
                <span className="text-[9px] font-bold text-slate-700 truncate">{c.name}</span>
                <span className="text-[7px] text-slate-400">{c.race}</span>
              </span>
              <span className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className="text-[8px] text-slate-500">{CAT_ICON[c.weapon]}</span>
                <span className="text-[6px] text-slate-400">{c.role}</span>
              </span>
              <span className="w-7 flex-shrink-0 flex items-center justify-center">
                {inParty && (
                  <span className="text-[6px] border border-amber-400 text-amber-500 px-1 py-0.5 rounded font-bold leading-none">편성</span>
                )}
              </span>
              <span className="text-[9px] text-slate-400 flex-shrink-0">›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════ MAIN ══════════════════════════════════════ */

export default function FormationModal({ onClose }) {
  const [view,             setView]             = useState('main');
  const [equippedWeaponId, setEquippedWeaponId] = useState(14);
  const [equippedSkillIds, setEquippedSkillIds] = useState([1, 2]);
  const [party,            setParty]            = useState([1, 7]);
  const [pendingWeapon,    setPendingWeapon]    = useState(null);

  const equippedWeapon = WEAPONS.find(w => w.id === equippedWeaponId);
  const equippedSkills = equippedSkillIds.map(id => SKILLS.find(s => s.id === id)).filter(Boolean);

  const toggleSkill = (id) => {
    setEquippedSkillIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id)
        : prev.length < 2 ? [...prev, id]
        : prev
    );
  };

  const confirmWeaponSwitch = () => {
    setEquippedSkillIds(prev =>
      prev.filter(sid => SKILLS.find(s => s.id === sid)?.cat !== equippedWeapon?.cat)
    );
    setEquippedWeaponId(pendingWeapon.id);
    setPendingWeapon(null);
    setView('main');
  };

  const handleWeaponEquip = (id) => {
    const newWeapon = WEAPONS.find(w => w.id === id);
    const catDiffers = newWeapon?.cat !== equippedWeapon?.cat;
    const hasConflict = equippedSkills.some(s => s.cat === equippedWeapon?.cat);
    if (catDiffers && hasConflict) {
      setPendingWeapon(newWeapon);
    } else {
      setEquippedWeaponId(id);
      setView('main');
    }
  };

  const renderContent = () => {
    if (view === 'weapon') return (
      <WeaponView
        equippedId={equippedWeaponId}
        onEquip={handleWeaponEquip}
        onBack={() => setView('main')}
        onClose={onClose}
      />
    );
    if (view === 'skill') return (
      <SkillView
        equippedWeaponCat={equippedWeapon?.cat}
        equippedSkillIds={equippedSkillIds}
        onEquip={toggleSkill}
        onBack={() => setView('main')}
        onClose={onClose}
      />
    );
    if (view === 'party') return <PartyView party={party} setParty={setParty} onBack={() => setView('main')} onClose={onClose} />;

    return (
      <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative flex flex-col" style={{ height: '360px' }}>
        <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]">✕</button>
        <div className="text-[10px] font-bold text-center mb-3">── 편성 ──</div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 pt-1">
          <div>
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">장착 장비</div>
            <button onClick={() => setView('weapon')}
              className="w-full flex gap-3 bg-amber-50 border border-amber-200 rounded-lg p-2 text-left items-center">
              <div className="w-11 h-11 bg-slate-300 rounded-lg flex items-center justify-center text-[18px] flex-shrink-0">
                {CAT_ICON[equippedWeapon?.cat] ?? '⚔'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-slate-700 truncate">{equippedWeapon?.name ?? '—'}</div>
                <div className="text-[8px] text-amber-500 mt-0.5">{'★'.repeat(equippedWeapon?.tier ?? 0)}</div>
                <div className="text-[7px] text-green-700 mt-0.5">{statLabel(equippedWeapon)}</div>
              </div>
              <div className="text-[11px] text-slate-400 flex-shrink-0">›</div>
            </button>
          </div>

          <div>
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">장착 스킬</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[0, 1].map(i => {
                const s = equippedSkills[i];
                const mismatch = s && s.cat !== equippedWeapon?.cat;
                return s ? (
                  <button key={s.id} onClick={() => setView('skill')}
                    className={`rounded-lg p-2 text-left ${mismatch ? 'bg-slate-200 border border-dashed border-red-300 opacity-60' : 'bg-amber-100 border border-amber-300'}`}>
                    <div className="text-[9px] font-bold text-slate-700 truncate">{s.name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className={`text-[6px] px-1 rounded ${TYPE_STYLE[s.type]}`}>{s.type}</span>
                      <span className="text-[7px] text-slate-400">MP {s.mp}</span>
                    </div>
                    {mismatch && <div className="text-[6px] text-red-400 mt-0.5">장비 불일치</div>}
                  </button>
                ) : (
                  <button key={`empty-${i}`} onClick={() => setView('skill')}
                    className="bg-slate-200 border border-dashed border-slate-400 rounded-lg p-2 relative text-slate-400">
                    <div className="invisible text-[9px] font-bold">X</div>
                    <div className="invisible flex items-center gap-1 mt-1">
                      <span className="text-[6px] px-1 rounded">X</span>
                      <span className="text-[7px]">MP 00</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-[8px]">+ 스킬 추가</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">파티원</div>
            <button onClick={() => setView('party')} className="w-full grid grid-cols-4 gap-1.5">
              <div className="aspect-[3/4] rounded-lg bg-slate-500 ring-2 ring-amber-400 flex flex-col relative overflow-hidden text-white">
                <div className="flex-1 bg-slate-400" />
                <span className="text-[6px] font-bold text-center py-0.5 truncate px-0.5">HERO</span>
              </div>
              {Array(3).fill(0).map((_, i) => {
                const comp = party[i] != null ? COMPANIONS.find(c => c.id === party[i]) : null;
                return (
                  <div key={i} className={`aspect-[3/4] rounded-lg flex flex-col relative overflow-hidden text-[7px] ${comp ? 'bg-slate-500 text-white' : 'bg-slate-200 text-slate-400 border border-dashed border-slate-400'}`}>
                    {comp ? (
                      <>
                        <div className="flex-1 bg-slate-400" />
                        <span className="text-[6px] text-center py-0.5 truncate px-0.5">{comp.name}</span>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-[8px]">+</div>
                    )}
                  </div>
                );
              })}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      {pendingWeapon && (
        <WeaponEquipWarning
          pendingWeapon={pendingWeapon}
          conflictSkills={equippedSkills.filter(s => s.cat === equippedWeapon?.cat)}
          equippedWeaponCat={equippedWeapon?.cat}
          onConfirm={confirmWeaponSwitch}
          onClose={() => setPendingWeapon(null)}
        />
      )}
    </>
  );
}
