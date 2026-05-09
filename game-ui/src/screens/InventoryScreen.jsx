import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';

const ITEMS = [
  { name: '강철 검',    type: '근접',  icon: '⚔', grade: 1, stat: '공격 +12', desc: '공격력 +12 · 근력 보정 +5%',  compatSkills: ['강화 Lv.3', '회전 베기 Lv.2', '방어 막기 Lv.1'] },
  { name: '장궁',       type: '원거리', icon: '◈', grade: 1, stat: '공격 +10', desc: '공격력 +10 · 명중 보정 +8%',  compatSkills: ['정밀 사격 Lv.2', '속사 Lv.1'] },
  { name: '마법 지팡이', type: '마법',  icon: '✦', grade: 2, stat: '마공 +15', desc: '마력 +15 · 마나 소모 -10%', compatSkills: ['파이어볼 Lv.3', '회복술 Lv.2'] },
  { name: '단검',       type: '근접',  icon: '⚔', grade: 1, stat: '공격 +8',  desc: '공격력 +8 · 속도 +10%',     compatSkills: ['강화 Lv.3', '암살 Lv.1'] },
  { name: '석궁',       type: '원거리', icon: '◈', grade: 2, stat: '공격 +14', desc: '공격력 +14 · 관통 +5%',     compatSkills: ['정밀 사격 Lv.2', '관통 사격 Lv.2'] },
];

const TYPE_BG = { '근접': 'bg-slate-400', '원거리': 'bg-blue-300', '마법': 'bg-purple-300' };

export default function InventoryScreen() {
  const { openModal, equippedWeapon } = useGame();
  const tabs = ['전체', '무기⚔', '방어', '재료', '아이템'];

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-300 flex items-center justify-around py-2 text-[8px] text-slate-700">
          {tabs.map((t, i) => (
            <button key={t} className={`px-1 ${i === 1 ? 'font-bold underline' : ''}`}>{t}</button>
          ))}
        </div>
        {equippedWeapon && (
          <div className="bg-amber-50 border-b border-amber-200 flex items-center gap-3 px-4 py-2">
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
              <div className="text-[7px] text-slate-500 italic">"무기는 1개만 장착 가능"</div>
            </div>
          </div>
        )}
        <div className="flex-1 bg-slate-100 px-3 pt-2 grid grid-cols-5 gap-1.5 content-start overflow-y-auto">
          {ITEMS.map((item, i) => (
            <button
              key={i}
              onClick={() => openModal('equipment-detail', item)}
              className={`aspect-square rounded flex items-center justify-center text-[14px] ${TYPE_BG[item.type] ?? 'bg-slate-400'}`}
            >
              {item.icon}
            </button>
          ))}
          {Array(15 - ITEMS.length).fill(0).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square bg-slate-200 rounded" />
          ))}
        </div>
      </div>
      <Nav />
    </>
  );
}
