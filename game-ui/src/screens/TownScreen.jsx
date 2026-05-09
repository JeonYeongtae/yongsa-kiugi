import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function TownScreen() {
  const { navigate, openModal } = useGame();
  const facilities = [
    {icon:'⚔',name:'무기 상점',modal:'shop'},{icon:'🏠',name:'여관',modal:'inn'},
    {icon:'📋',name:'모험가 길드',modal:'guild'},{icon:'📖',name:'마법 서점',modal:'shop'},
  ];
  return (
    <>
      <Header showEnergy />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-slate-200 flex items-center justify-center" style={{height:'50%'}}>
          <div className="text-slate-600 text-[10px]">PIXEL TOWN ART</div>
        </div>
        <div className="flex-1 bg-slate-100 px-3 pt-5 grid grid-cols-2 gap-2">
          {facilities.map(f=>(
            <button key={f.name} onClick={() => openModal(f.modal)}
              className="bg-slate-300 rounded p-2 text-center text-[9px] text-slate-700">
              <div className="text-xl mb-1">{f.icon}</div>
              {f.name}
            </button>
          ))}
        </div>
        <div className="bg-slate-300 flex items-center justify-center py-2">
          <button onClick={() => navigate('world-map')} className="px-3 py-1 bg-slate-500 text-white text-[8px] rounded">← 월드맵</button>
        </div>
      </div>
      <Nav />
    </>
  );
}
