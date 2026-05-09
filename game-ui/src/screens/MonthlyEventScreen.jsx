import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
export default function MonthlyEventScreen() {
  const { navigate } = useGame();
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-amber-50 flex items-center px-3 pt-4 gap-2" style={{height:'20%'}}>
          <div className="text-[18px]">🌸</div>
          <div>
            <div className="text-[9px] font-bold text-amber-800">5월 특별 이벤트 진행 중</div>
            <div className="text-[7px] text-amber-600">주간 스케줄과 독립적으로 진행</div>
          </div>
        </div>
        <div className="flex-1 bg-slate-100 px-3 pt-2 overflow-y-auto">
          {[
            {icon:'🌸',name:'봄 축제',type:'마을',date:'5/1~5/7',btn:'참가',active:true},
            {icon:'⚡',name:'랜덤 퀘스트',type:'전투',btn:'참가',active:true},
            {icon:'🏆',name:'왕립 토너먼트',note:'5/15 해금 예정',active:false},
          ].map(ev=>(
            <div key={ev.name} className={`mb-1.5 rounded p-1.5 border ${ev.active?'bg-amber-100 border-amber-400':'bg-slate-200 border-slate-300 opacity-60'}`}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-[9px]">{ev.icon} {ev.name}</div>
                  <div className="text-[7px] text-slate-500">{ev.type} · {ev.date||ev.note}</div>
                </div>
                {ev.btn && ev.active && (
                  <button onClick={() => navigate('event-choice')} className="px-2 py-0.5 bg-slate-500 text-white text-[7px] rounded">{ev.btn}</button>
                )}
              </div>
            </div>
          ))}
          <div className="text-[7px] text-slate-400 italic text-center">※ 스케줄 시간대는 소모되지 않음</div>
        </div>
        <div className="bg-slate-300 flex items-center justify-center py-2">
          <button onClick={() => navigate('weekly-schedule')} className="px-4 py-1.5 bg-slate-600 text-white text-[8px] rounded">주간 스케줄로 ▸</button>
        </div>
      </div>
      <Nav />
    </>
  );
}
