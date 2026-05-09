import { useGame } from '../context/GameContext';

const NAV_ITEMS = [
  { id: 'hub',          label: '허브',  screen: 'main-hub' },
  { id: 'formation',    label: '편성',  screen: 'formation' },
  { id: 'encyclopedia', label: '도감',  screen: 'encyclopedia' },
];

const ACTIVE_MAP = {
  'main-hub': 'hub', 'weekly-schedule': 'hub', 'schedule-exec': 'hub',
  'weekly-report': 'hub', 'monthly-event': 'hub', 'world-map': 'hub',
  'town': 'hub', 'event-choice': 'hub',
  'encyclopedia': 'encyclopedia',
  'formation': 'formation',
};

export default function Nav({ dimmed = false }) {
  const { screen, navigate } = useGame();
  const active = ACTIVE_MAP[screen] || 'hub';

  const handleClick = (item) => {
    navigate(item.screen);
  };

  return (
    <div style={{ height: '14%', flexShrink: 0 }}
      className={`nav-bar bg-slate-600 flex items-center justify-around px-1 border-t-2 border-slate-700 relative ${dimmed ? 'opacity-40 pointer-events-none' : ''}`}>
      {NAV_ITEMS.map(item => (
        <button key={item.id} onClick={() => handleClick(item)}
          className={`flex flex-col items-center gap-0.5 flex-1 text-center ${active === item.id ? 'text-yellow-400' : 'text-slate-400'}`}
          style={{ fontSize: 7 }}>
          <div className={`w-4 h-4 rounded-sm ${active === item.id ? 'bg-yellow-400' : 'bg-slate-500'}`} />
          {item.label}
        </button>
      ))}
    </div>
  );
}
