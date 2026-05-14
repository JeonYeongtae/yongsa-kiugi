import { useGame } from '../context/GameContext';

export default function EquipmentDetailModal({ onClose }) {
  const { modalData, equippedWeapon, equippedSkills, equipWeapon } = useGame();

  // null modalData = 현재 장착 무기 상세 보기
  const item = modalData ?? equippedWeapon;
  if (!item) return null;

  const isCurrentlyEquipped = equippedWeapon?.name === item.name;
  const typeConflict = !!(equippedWeapon && equippedWeapon.type !== item.type);
  const needsWarning = typeConflict && equippedSkills.length > 0;

  const handleConfirm = () => {
    equipWeapon(item);
    onClose();
  };

  const handleEquip = () => {
    equipWeapon(item);
    onClose();
  };

  // 경고 뷰: 다른 장비군 + 스킬 장착 중 → 모달 열자마자 즉시 표시
  if (needsWarning) {
    return (
      <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]"
        >✕</button>

        <div className="text-[11px] font-bold text-center mb-2">── 장비 교체 확인 ──</div>

        <div className="flex gap-2 mb-2">
          <div className="w-10 h-10 bg-slate-400 rounded flex items-center justify-center text-[14px]">{item.icon}</div>
          <div className="text-[9px] text-slate-700">
            <div className="font-bold">{item.name}</div>
            <div className="text-[8px] text-slate-500">{item.type} 무기 · {item.grade}등급</div>
            <div className="text-green-700 text-[8px]">{item.desc}</div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded p-2 mb-3">
          <div className="text-[9px] font-bold text-amber-800 mb-1">⚠ 장착 스킬이 모두 해제됩니다</div>
          <div className="text-[8px] text-slate-600 mb-1">
            현재 장착된 스킬 ({equippedWeapon.type} 무기군)
          </div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            {equippedSkills.map(s => (
              <span key={s} className="px-1.5 py-0.5 bg-rose-100 border border-rose-300 rounded text-[7px] text-rose-700">{s}</span>
            ))}
          </div>
          <div className="text-[8px] text-slate-600">
            {equippedWeapon.type} → {item.type} 장비군으로 교체하면 위 스킬을 사용할 수 없어 모두 해제됩니다.
          </div>
        </div>

        <div className="flex gap-1">
          <button
            onClick={onClose}
            className="flex-1 py-1.5 bg-slate-400 text-white text-[8px] rounded"
          >취소</button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-1.5 bg-rose-500 text-white text-[8px] rounded"
          >해제 후 장착 ▸</button>
        </div>
      </div>
    );
  }

  // 일반 뷰: 같은 장비군이거나 스킬 미장착
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px]"
      >✕</button>
      <div className="text-[11px] font-bold text-center mb-2">── 장비 상세 ──</div>

      <div className="flex gap-2 mb-2">
        <div className="w-14 h-14 bg-slate-400 rounded flex items-center justify-center text-[16px]">{item.icon}</div>
        <div className="text-[9px] text-slate-700">
          <div className="font-bold">{item.name}</div>
          <div className="text-[8px] text-slate-500">{item.type} 무기 · {item.grade}등급</div>
          <div className="text-green-700 text-[8px] mt-1">{item.desc}</div>
        </div>
      </div>

      <div className="bg-slate-200 rounded p-1.5 mb-3 text-[8px] text-slate-700">
        <div className="font-bold mb-0.5">호환 스킬</div>
        <div className="flex flex-wrap gap-1">
          {item.compatSkills.map(s => (
            <span key={s} className="px-1.5 py-0.5 bg-slate-300 border border-slate-400 rounded text-[7px]">{s}</span>
          ))}
        </div>
        <div className="text-[7px] text-slate-500 mt-0.5 italic">※ 이 무기 장착 시에만 사용 가능</div>
      </div>

      {isCurrentlyEquipped ? (
        <div className="text-center text-[8px] text-slate-500 py-1 bg-slate-200 rounded">현재 장착 중</div>
      ) : (
        <button onClick={handleEquip} className="w-full py-1.5 bg-slate-600 text-white text-[8px] rounded">
          장착 ▸
        </button>
      )}
    </div>
  );
}
