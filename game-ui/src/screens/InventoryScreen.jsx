import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';

const EQUIP_ITEMS = [
  { name: '강철 검',    type: '근접',  icon: '⚔', grade: 1, stat: '공격 +12', desc: '공격력 +12 · 근력 보정 +5%' },
  { name: '장궁',       type: '원거리', icon: '◈', grade: 1, stat: '공격 +10', desc: '공격력 +10 · 명중 보정 +8%' },
  { name: '마법 지팡이', type: '마법',  icon: '✦', grade: 2, stat: '마공 +15', desc: '마력 +15 · 마나 소모 -10%' },
  { name: '단검',       type: '근접',  icon: '⚔', grade: 1, stat: '공격 +8',  desc: '공격력 +8 · 속도 +10%' },
  { name: '석궁',       type: '원거리', icon: '◈', grade: 2, stat: '공격 +14', desc: '공격력 +14 · 관통 +5%' },
  { name: '철제 방패',  type: '방어',  icon: '🛡', grade: 1, stat: '방어 +9',  desc: '물리 방어 +9' },
];

const BATTLE_ITEMS = [
  { name: '회복 포션',    icon: '🧪', count: 5,  desc: 'HP 30 즉시 회복' },
  { name: '마나 포션',    icon: '💧', count: 3,  desc: 'MP 20 즉시 회복' },
  { name: '독 해독제',    icon: '🌿', count: 2,  desc: '독 상태 해제' },
  { name: '불꽃 수류탄',  icon: '💣', count: 1,  desc: '적 전체 화염 피해 15' },
  { name: '연막 폭탄',    icon: '💨', count: 2,  desc: '적 명중률 -20% (2턴)' },
];

const GIFT_ITEMS = [
  { name: '야생화 다발',    icon: '🌸', count: 3,  desc: '호감도 +5 · 일반' },
  { name: '수제 케이크',    icon: '🎂', count: 1,  desc: '호감도 +12 · 희귀' },
  { name: '마법 결정',      icon: '💎', count: 2,  desc: '호감도 +15 · 희귀' },
  { name: '은반지',         icon: '💍', count: 1,  desc: '호감도 +22 · 특수' },
];

const TABS = ['장비', '배틀 아이템', '선물 아이템'];

const TYPE_BG = { '근접': 'bg-slate-400', '원거리': 'bg-blue-300', '마법': 'bg-purple-300', '방어': 'bg-green-300' };

export default function InventoryScreen() {
  const { openModal, equippedWeapon, navigate } = useGame();
  const [tab, setTab] = useState(0);

  return (
    <>
      <Header />
      <div className="relative flex items-center px-3 h-6 bg-slate-200 border-b border-slate-300 flex-shrink-0">
        <button onClick={() => navigate('main-hub')} className="text-[13px] text-slate-500 font-bold pr-3">‹</button>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-600">인벤토리</span>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 탭 바 */}
        <div className="bg-slate-200 flex border-b border-slate-300 flex-shrink-0">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`flex-1 py-1.5 text-[7px] font-bold transition-colors ${
                tab === i ? 'bg-amber-400 text-slate-800' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 장비 탭 */}
        {tab === 0 && (
          <>
            {equippedWeapon && (
              <div className="bg-amber-50 border-b border-amber-200 flex items-center gap-3 px-4 py-2 flex-shrink-0">
                <div className="relative">
                  <button
                    onClick={() => openModal('equipment-detail', null)}
                    className="w-12 h-12 bg-slate-500 rounded flex items-center justify-center text-white text-[16px]"
                  >
                    {equippedWeapon.icon}
                  </button>
                  <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[5px] font-bold px-1 rounded">장착 중</div>
                </div>
                <div className="flex-1 text-[9px] text-slate-700">
                  <div className="font-bold">{equippedWeapon.name}</div>
                  <div className="text-[8px]">{equippedWeapon.stat} · {equippedWeapon.type}</div>
                </div>
              </div>
            )}
            <div className="flex-1 bg-slate-100 px-3 pt-2 grid grid-cols-5 gap-1.5 content-start overflow-y-auto">
              {EQUIP_ITEMS.map((item, i) => (
                <button
                  key={i}
                  onClick={() => openModal('equipment-detail', item)}
                  className={`aspect-square rounded flex items-center justify-center text-[14px] ${TYPE_BG[item.type] ?? 'bg-slate-400'}`}
                >
                  {item.icon}
                </button>
              ))}
              {Array(Math.max(0, 15 - EQUIP_ITEMS.length)).fill(0).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square bg-slate-200 rounded" />
              ))}
            </div>
          </>
        )}

        {/* 배틀 아이템 탭 */}
        {tab === 1 && (
          <div className="flex-1 bg-slate-100 px-3 pt-2 flex flex-col gap-1.5 overflow-y-auto">
            {BATTLE_ITEMS.map((item, i) => (
              <div key={i} className="bg-slate-200 rounded px-3 py-2 flex items-center gap-2">
                <span className="text-[18px] w-8 text-center flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold text-slate-700">{item.name}</div>
                  <div className="text-[7px] text-slate-500">{item.desc}</div>
                </div>
                <div className="text-[8px] font-bold text-slate-600 flex-shrink-0">×{item.count}</div>
              </div>
            ))}
            {BATTLE_ITEMS.length === 0 && (
              <div className="text-[8px] text-slate-400 text-center mt-8">배틀 아이템 없음</div>
            )}
          </div>
        )}

        {/* 선물 아이템 탭 */}
        {tab === 2 && (
          <div className="flex-1 bg-slate-100 px-3 pt-2 flex flex-col gap-1.5 overflow-y-auto">
            {GIFT_ITEMS.map((item, i) => (
              <div key={i} className="bg-slate-200 rounded px-3 py-2 flex items-center gap-2">
                <span className="text-[18px] w-8 text-center flex-shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold text-slate-700">{item.name}</div>
                  <div className="text-[7px] text-slate-500">{item.desc}</div>
                </div>
                <div className="text-[8px] font-bold text-slate-600 flex-shrink-0">×{item.count}</div>
              </div>
            ))}
            {GIFT_ITEMS.length === 0 && (
              <div className="text-[8px] text-slate-400 text-center mt-8">선물 아이템 없음</div>
            )}
          </div>
        )}
      </div>
      <Nav />
    </>
  );
}
