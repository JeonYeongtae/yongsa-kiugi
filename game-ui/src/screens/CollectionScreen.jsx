import { useState } from 'react';
import { useGame } from '../context/GameContext';

const COMPANION_COLLECTION = [
  { id: 1,  name: '아딘',    collected: true  },
  { id: 2,  name: '가비안',  collected: true  },
  { id: 3,  name: '크로넬',  collected: true  },
  { id: 4,  name: '데피넬',  collected: false },
  { id: 5,  name: '에스시탈', collected: true  },
  { id: 6,  name: '펠리시카', collected: false },
  { id: 7,  name: '오시안',  collected: true  },
  { id: 8,  name: '네온',    collected: false },
  { id: 9,  name: '이졸데',  collected: false },
  { id: 10, name: '조안나',  collected: false },
  { id: 11, name: '녹스',    collected: false },
  { id: 12, name: '라크',    collected: false },
];

const EQUIP_COLLECTION = [
  { id: 1,  name: '수련용 목재 둔기',  collected: true  },
  { id: 2,  name: '철제 외날검',       collected: true  },
  { id: 3,  name: '마법사의 지팡이',   collected: true  },
  { id: 4,  name: '기사단 전용 둔검',  collected: false },
  { id: 5,  name: '기사단 전용 방패',  collected: false },
  { id: 6,  name: '마력이 깃든 지팡이', collected: false },
  { id: 7,  name: '철제 장궁',         collected: false },
  { id: 8,  name: '강철 단검',         collected: false },
  { id: 9,  name: '의식용 종',         collected: false },
  { id: 10, name: '별자리 원석',       collected: false },
];

const ENDING_COLLECTION = [
  { id: 1, name: '빛의 결말',   collected: true  },
  { id: 2, name: '어둠의 각성', collected: false },
  { id: 3, name: '영원한 숲',   collected: false },
  { id: 4, name: '용사의 귀환', collected: false },
  { id: 5, name: '세계의 끝',   collected: false },
];

const TABS = ['동료', '장비', '엔딩'];

function CollectionGrid({ items, cols = 4 }) {
  return (
    <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {items.map(item => (
        <div
          key={item.id}
          className={`aspect-square rounded flex flex-col items-center justify-center gap-0.5 ${
            item.collected ? 'bg-slate-500' : 'bg-slate-300'
          }`}
        >
          {item.collected ? (
            <>
              <div className="w-5 h-5 bg-slate-400 rounded-full flex items-center justify-center text-[7px] text-white font-bold">
                {item.name[0]}
              </div>
              <span className="text-[5px] text-slate-200 font-bold text-center px-0.5 leading-tight">
                {item.name}
              </span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 bg-slate-400 rounded-full flex items-center justify-center text-[8px] text-slate-500">
                ?
              </div>
              <span className="text-[5px] text-slate-400 font-bold">???</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CollectionScreen() {
  const { navigate } = useGame();
  const [tab, setTab] = useState(0);

  const collections = [COMPANION_COLLECTION, EQUIP_COLLECTION, ENDING_COLLECTION];
  const current = collections[tab];
  const collectedCount = current.filter(i => i.collected).length;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-slate-100">
      {/* 타이틀 바 */}
      <div className="relative flex items-center px-3 h-9 bg-slate-600 border-b border-slate-700 flex-shrink-0">
        <button
          onClick={() => navigate('main-menu')}
          className="text-[13px] text-slate-200 font-bold pr-3"
        >
          ‹
        </button>
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none text-[9px] font-bold text-slate-100">
          컬렉션
        </span>
        <span className="ml-auto text-[7px] text-slate-300">
          {collectedCount}/{current.length}
        </span>
      </div>

      {/* 탭 */}
      <div className="flex bg-slate-200 border-b border-slate-300 flex-shrink-0">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`flex-1 py-1.5 text-[8px] font-bold transition-colors ${
              tab === i ? 'bg-amber-400 text-slate-800' : 'bg-slate-200 text-slate-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 컬렉션 그리드 */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <CollectionGrid items={current} cols={tab === 2 ? 3 : 4} />
      </div>
    </div>
  );
}
