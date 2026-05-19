import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';

export default function TownScreen() {
  const { navigate, openModal } = useGame();
  const facilities = [
    { icon: '⚔', name: '무기 상점', modal: 'shop' },
    { icon: '🏠', name: '여관', modal: 'inn' },
    { icon: '📋', name: '모험가 길드', modal: 'guild' },
    { icon: '📖', name: '마법 서점', modal: 'shop' },
  ];

  return (
    <>
      <Header showEnergy />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="relative flex items-center px-3 h-6 bg-slate-200 border-b border-slate-300 flex-shrink-0">
          <button onClick={() => navigate('world-map')} className="text-[13px] text-slate-500 font-bold pr-3">‹</button>
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-600">마을</span>
        </div>

        <div className="bg-slate-200 flex items-center justify-center flex-shrink-0" style={{ height: '22%' }}>
          <div className="text-slate-600 text-[10px]">PIXEL TOWN ART</div>
        </div>

        <div className="flex-1 bg-slate-100 px-3 pt-2 pb-1 grid grid-cols-2 gap-2 content-start">
          {facilities.map(f => (
            <button key={f.name} onClick={() => openModal(f.modal)}
              className="bg-slate-300 rounded p-2 text-center text-[9px] text-slate-700">
              <div className="text-xl mb-1">{f.icon}</div>
              {f.name}
            </button>
          ))}
        </div>
      </div>
      <Nav />
    </>
  );
}
