import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';

const ALL_SKILLS = [
  { name: '강화',     level: 'Lv.3', weapon: '⚔ 근접', weaponType: '근접', mp: 5 },
  { name: '회전 베기', level: 'Lv.2', weapon: '⚔ 근접', weaponType: '근접', mp: 8 },
  { name: '방어 자세', level: 'Lv.1', weapon: '⚙ 공용',  weaponType: '공용',  mp: 3 },
  { name: '정밀 사격', level: 'Lv.2', weapon: '◈ 원거리', weaponType: '원거리', mp: 6 },
  { name: '속사',     level: 'Lv.1', weapon: '◈ 원거리', weaponType: '원거리', mp: 4 },
  { name: '파이어볼', level: 'Lv.3', weapon: '✦ 마법',  weaponType: '마법',  mp: 12 },
];

const WEAPON_TABS = ['⚔근접', '◈원거', '✦마법', '🛡회복', '⚙공용'];

export default function SkillsScreen() {
  const { openModal, equippedWeapon, equippedSkills } = useGame();

  const equippedType = equippedWeapon?.type ?? '';

  const visibleSkills = ALL_SKILLS.filter(
    s => s.weaponType === equippedType || s.weaponType === '공용'
  );

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-300 flex items-end justify-around pb-1 pt-2 text-[8px]">
          {WEAPON_TABS.map((t, i) => (
            <button
              key={t}
              className={`px-1.5 py-1 rounded-t text-[7px] ${i === 0 ? 'bg-slate-500 text-white' : 'bg-slate-200 text-slate-500'}`}
            >{t}</button>
          ))}
        </div>

        {equippedSkills.length === 0 && (
          <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-[8px] text-amber-700">
            ⚠ 장착된 스킬 없음 — 스킬을 편성해주세요
          </div>
        )}

        <div className="flex-1 bg-slate-100 px-3 pt-2 overflow-y-auto">
          {visibleSkills.map(s => {
            const isEquipped = equippedSkills.includes(`${s.name} ${s.level}`);
            return (
              <button
                key={s.name}
                onClick={() => openModal('skill-detail')}
                className={`w-full mb-1 rounded p-1.5 flex justify-between items-start text-[9px] ${isEquipped ? 'bg-amber-100 border border-amber-500' : 'bg-slate-200'}`}
              >
                <span>
                  <span className="font-bold">{s.name}</span>
                  {isEquipped && <span className="text-amber-600 ml-1 text-[7px]">✦장착</span>}
                  <br />
                  <span className="text-[7px] text-slate-500">{s.weapon} · MP {s.mp}</span>
                </span>
                <span className="text-[7px] text-slate-500 mt-0.5">{s.level}</span>
              </button>
            );
          })}
          <div className="bg-slate-300 rounded p-1.5 opacity-60 text-[9px]">🔒 광폭화 근력 60 필요</div>
        </div>

        <div className="bg-slate-300 flex items-center justify-around py-2">
          <button onClick={() => openModal('skill-setting')} className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">편성 변경</button>
          <button onClick={() => openModal('skill-detail')} className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">정보</button>
        </div>
      </div>
      <Nav />
    </>
  );
}
