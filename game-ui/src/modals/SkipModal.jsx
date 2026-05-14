import { useGame } from '../context/GameContext';
export default function SkipModal({ onClose }) {
  const { navigate } = useGame();
  return (
    <div className="bg-slate-100 rounded p-3 w-full max-w-[240px] relative">
      <button onClick={onClose} className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-slate-500 text-[12px] leading-none">✕</button>
      <div className="text-[11px] font-bold text-center text-slate-800 mb-2">── 메인 스토리 요약 ──</div>
      <div className="text-[9px] text-slate-700 leading-relaxed space-y-1">
        <div>· 별이 떨어진 날, 마성의 내음이 짙어졌다.</div>
        <div>· 이 왕국에 진정한 용사를 키우기로 결심했다.</div>
        <div>· 당신은 그 용사와 (관계)로서...</div>
        <div>· 8년간의 수련을 거쳐 마성으로 향한다.</div>
      </div>
      <div className="mt-3 flex justify-center">
        <button onClick={() => { onClose(); navigate('main-hub'); }} className="px-4 py-1 bg-slate-600 text-white text-[8px] rounded">건너뛰기 ▸</button>
      </div>
    </div>
  );
}
