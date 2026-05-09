import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
import { aggregateStats, BASE_STATS, RESULT_STYLE } from '../utils/scheduleUtils';

const MAX_STAT = 100;
const WEEK_LABELS = ['1주차', '2주차', '3주차', '4주차'];

function StatBar({ name, base, delta }) {
  const baseW = Math.min((base / MAX_STAT) * 100, 100);
  const deltaW = Math.min((delta / MAX_STAT) * 100, 100 - baseW);

  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="w-8 text-[7px] text-slate-600 shrink-0 text-right">{name}</span>
      <div className="flex-1 h-2 bg-slate-300 rounded overflow-hidden flex">
        <div className="h-full bg-slate-500" style={{ width: `${baseW}%` }} />
        {delta > 0 && <div className="h-full bg-amber-400" style={{ width: `${deltaW}%` }} />}
      </div>
      <span className="text-[7px] text-slate-500 w-5 text-right shrink-0">{base}</span>
      <span className={`text-[7px] font-bold w-5 shrink-0 ${delta > 0 ? 'text-amber-600' : 'text-slate-300'}`}>
        {delta > 0 ? `+${delta}` : '—'}
      </span>
    </div>
  );
}

const LOG_ICON = {
  PERFECT: { sym: '✦', cls: 'text-amber-500' },
  GOOD:    { sym: '▲', cls: 'text-green-600'  },
  BAD:     { sym: '▼', cls: 'text-red-400'    },
};

export default function MonthlyReportScreen() {
  const { navigate, scheduleExec, weeklyResults } = useGame();
  const { year = 1, month = 1 } = scheduleExec ?? {};

  // 4주 전체 슬롯 결과 합산
  const allResults = weeklyResults.flat();
  const totalDeltaMap = aggregateStats(allResults);
  const topStat = Object.entries(totalDeltaMap).sort((a, b) => b[1] - a[1])[0];

  // 결과 등급 집계
  const gradeCounts = { PERFECT: 0, GOOD: 0, BAD: 0 };
  allResults.forEach(r => { if (r.grade) gradeCounts[r.grade]++; });

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="bg-slate-200 border-b border-slate-300 flex items-center justify-center py-1 shrink-0">
          <span className="text-[7px] font-bold text-slate-600 tracking-wide">
            {year}년 {month}월 — 1달 종합 보고
          </span>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-3 space-y-4">

          {/* 이달의 성과 요약 */}
          <section>
            <div className="text-[8px] font-bold text-slate-700 mb-1.5">이달의 성과</div>
            <div className="bg-slate-200 rounded p-2 flex justify-around text-center">
              <div>
                <div className="text-[10px] font-bold text-amber-500">{gradeCounts.PERFECT}</div>
                <div className="text-[6px] text-slate-500 mt-0.5">PERFECT</div>
              </div>
              <div className="w-px bg-slate-300" />
              <div>
                <div className="text-[10px] font-bold text-green-600">{gradeCounts.GOOD}</div>
                <div className="text-[6px] text-slate-500 mt-0.5">GOOD</div>
              </div>
              <div className="w-px bg-slate-300" />
              <div>
                <div className="text-[10px] font-bold text-red-400">{gradeCounts.BAD}</div>
                <div className="text-[6px] text-slate-500 mt-0.5">BAD</div>
              </div>
              <div className="w-px bg-slate-300" />
              <div>
                <div className="text-[10px] font-bold text-slate-700">{allResults.length}</div>
                <div className="text-[6px] text-slate-500 mt-0.5">총 활동</div>
              </div>
            </div>
          </section>

          {/* 한 달 스탯 변화 */}
          <section>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[8px] font-bold text-slate-700">한 달 스탯 변화</span>
              <span className="text-[6px] text-slate-400">기존  /  증가</span>
            </div>
            {BASE_STATS.map(s => (
              <StatBar key={s.name} name={s.name} base={s.base} delta={totalDeltaMap[s.name] ?? 0} />
            ))}
            <div className="flex gap-2 mt-1.5 justify-end">
              <span className="flex items-center gap-0.5 text-[6px] text-slate-500">
                <span className="inline-block w-3 h-1.5 bg-slate-500 rounded-sm" />기존
              </span>
              <span className="flex items-center gap-0.5 text-[6px] text-amber-600">
                <span className="inline-block w-3 h-1.5 bg-amber-400 rounded-sm" />이달 증가
              </span>
            </div>
          </section>

          {/* 주차별 활동 로그 */}
          <section>
            <div className="text-[8px] font-bold text-slate-700 mb-1.5">주차별 활동 로그</div>
            <div className="space-y-2">
              {weeklyResults.map((weekRes, wi) => (
                <div key={wi} className="bg-slate-200 rounded overflow-hidden">
                  <div className="bg-slate-300 px-2 py-1 text-[7px] font-bold text-slate-600">
                    {WEEK_LABELS[wi]}
                  </div>
                  <div className="px-2 py-1 space-y-0.5">
                    {weekRes.map((r, si) => {
                      const icon = LOG_ICON[r.grade] ?? LOG_ICON.GOOD;
                      const rs = RESULT_STYLE[r.grade];
                      return (
                        <div key={si} className="flex items-center gap-1">
                          <span className={`${icon.cls} text-[7px] shrink-0`}>{icon.sym}</span>
                          <span className="text-[7px] text-slate-700 truncate">
                            {r.slotName ?? '자유 시간'}
                          </span>
                          <span className={`ml-auto text-[6px] font-bold ${rs.color} shrink-0`}>
                            {r.grade}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HERO의 한 달 성장 일지 */}
          <section>
            <div className="text-[8px] font-bold text-slate-700 mb-1.5">HERO의 한 달 성장 일지</div>
            <div className="bg-slate-200 rounded p-2.5 border-l-2 border-amber-400">
              <div className="text-[7px] text-slate-600 leading-relaxed">
                {`한 달이 지났다. 처음 기사단 훈련장에 들어섰을 때의 긴장감은 이제 익숙함으로 바뀌었다.
완벽하지 않은 날도 있었고, 예상치 못한 사고도 있었다.
하지만 HERO는 그 모든 순간을 피하지 않고 정면으로 맞섰다.
숫자로 표시되는 스탯보다 더 중요한 무언가가 자라고 있는 것 같다.`}
              </div>
              {topStat && (
                <div className="mt-2 pt-1.5 border-t border-slate-300 text-[6px] text-amber-700 font-bold">
                  이달 가장 크게 성장한 능력 : {topStat[0]} (+{topStat[1]})
                </div>
              )}
            </div>
          </section>

          <button
            onClick={() => navigate('main-hub')}
            className="w-full py-2 bg-slate-600 text-white text-[9px] font-bold rounded"
          >
            다음 달로 ▸
          </button>
        </div>
      </div>
      <Nav />
    </>
  );
}
