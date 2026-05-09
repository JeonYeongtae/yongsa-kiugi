import Header from '../components/Header';
import Nav from '../components/Nav';
import { useGame } from '../context/GameContext';
import { aggregateStats, BASE_STATS, RESULT_STYLE } from '../utils/scheduleUtils';

const MAX_STAT = 100;

const DIARY_BY_WEEK = [
  '이번 주 HERO는 기사단 훈련장에서 묵묵히 수련을 이어갔다. 몸이 무거운 날에도 포기하지 않았고, 마지막 날에는 완벽한 동작으로 교관을 놀라게 했다.',
  '두 번째 주, HERO의 몸이 지난 주보다 한결 가벼워 보였다. 방어 훈련에서는 같은 팀원들의 박수를 받기도 했다. 성장이 눈에 띄기 시작했다.',
  '세 번째 주는 쉽지 않았다. 야간 경비 중 피로가 쌓였지만 HERO는 불평 없이 버텼다. 작은 사고도 있었지만, 끝내 완수했다.',
  '마지막 주, HERO는 한 달의 피로를 안고도 고급 훈련에 도전했다. 완벽하지는 않았지만 한 달 전의 모습과는 확연히 달라져 있었다.',
];

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

const LOG_ICON = { PERFECT: { sym: '✦', cls: 'text-amber-500' }, GOOD: { sym: '▲', cls: 'text-green-600' }, BAD: { sym: '▼', cls: 'text-red-400' } };

export default function WeeklyReportScreen() {
  const { navigate, scheduleExec, weeklyResults, nextWeek } = useGame();
  const { year = 1, month = 1, currentWeek = 1 } = scheduleExec ?? {};
  const isLastWeek = currentWeek === 4;

  // 이번 주 결과 (weeklyResults의 마지막 항목)
  const thisWeekResults = weeklyResults.at(-1) ?? [];
  const deltaMap = aggregateStats(thisWeekResults);
  const topStat = Object.entries(deltaMap).sort((a, b) => b[1] - a[1])[0];

  function handleNext() {
    if (isLastWeek) {
      navigate('monthly-report');
    } else {
      nextWeek();
      navigate('schedule-exec');
    }
  }

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="bg-slate-200 border-b border-slate-300 flex items-center justify-center py-1 shrink-0">
          <span className="text-[7px] font-bold text-slate-600 tracking-wide">
            {year}년 {month}월 {currentWeek}주차 주간 보고
          </span>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-100 px-3 py-3 space-y-4">

          {/* 스탯 변화 */}
          <section>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-[8px] font-bold text-slate-700">스탯 변화</span>
              <span className="text-[6px] text-slate-400">기존  /  증가</span>
            </div>
            {BASE_STATS.map(s => (
              <StatBar key={s.name} name={s.name} base={s.base} delta={deltaMap[s.name] ?? 0} />
            ))}
            <div className="flex gap-2 mt-1.5 justify-end">
              <span className="flex items-center gap-0.5 text-[6px] text-slate-500">
                <span className="inline-block w-3 h-1.5 bg-slate-500 rounded-sm" />기존
              </span>
              <span className="flex items-center gap-0.5 text-[6px] text-amber-600">
                <span className="inline-block w-3 h-1.5 bg-amber-400 rounded-sm" />이번 주 증가
              </span>
            </div>
          </section>

          {/* 이벤트 로그 */}
          <section>
            <div className="text-[8px] font-bold text-slate-700 mb-1.5">이벤트 로그</div>
            <div className="space-y-1">
              {thisWeekResults.length > 0 ? thisWeekResults.map((r, i) => {
                const icon = LOG_ICON[r.grade] ?? LOG_ICON.GOOD;
                const rs = RESULT_STYLE[r.grade];
                return (
                  <div key={i} className="flex items-start gap-1 bg-slate-200 rounded px-2 py-1.5">
                    <span className={`${icon.cls} font-bold shrink-0 text-[8px]`}>{icon.sym}</span>
                    <span className="text-[7px] text-slate-700">
                      {r.slotName ?? '자유 시간'} —{' '}
                      <span className={`font-bold ${rs.color}`}>{r.grade}</span>
                      {r.statGain && <span className="text-green-700"> · {r.statGain.name} +{r.statGain.amount}</span>}
                      {r.goldDelta !== 0 && (
                        <span className={r.goldDelta > 0 ? ' text-amber-600' : ' text-slate-500'}>
                          {' '}· {r.goldDelta > 0 ? `+${r.goldDelta}G` : `${r.goldDelta}G`}
                        </span>
                      )}
                    </span>
                  </div>
                );
              }) : (
                <div className="text-[7px] text-slate-400 px-2">기록된 활동이 없습니다.</div>
              )}
            </div>
          </section>

          {/* HERO의 성장 일지 */}
          <section>
            <div className="text-[8px] font-bold text-slate-700 mb-1.5">HERO의 성장 일지</div>
            <div className="bg-slate-200 rounded p-2.5 border-l-2 border-amber-400">
              <div className="text-[7px] text-slate-600 leading-relaxed">
                {DIARY_BY_WEEK[currentWeek - 1]}
              </div>
              {topStat && (
                <div className="mt-2 pt-1.5 border-t border-slate-300 text-[6px] text-amber-700 font-bold">
                  이번 주 가장 성장한 능력 : {topStat[0]} (+{topStat[1]})
                </div>
              )}
            </div>
          </section>

          <button
            onClick={handleNext}
            className="w-full py-2 bg-slate-600 text-white text-[9px] font-bold rounded"
          >
            {isLastWeek ? '1달 종합 보고 ▸' : `${currentWeek + 1}주차 시작 ▸`}
          </button>
        </div>
      </div>
      <Nav />
    </>
  );
}
