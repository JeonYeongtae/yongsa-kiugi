import { useGame } from './context/GameContext';
import DeviceFrame from './components/DeviceFrame';
import ModalOverlay from './components/ModalOverlay';

import SplashScreen from './screens/SplashScreen';
import MainMenuScreen from './screens/MainMenuScreen';
import SaveLoadScreen from './screens/SaveLoadScreen';
import CharCreateScreen from './screens/CharCreateScreen';
import PrologueScreen from './screens/PrologueScreen';
import MainHubScreen from './screens/MainHubScreen';
import WeeklyScheduleScreen from './screens/WeeklyScheduleScreen';
import ScheduleExecScreen from './screens/ScheduleExecScreen';
import WeeklyReportScreen from './screens/WeeklyReportScreen';
import MonthlyReportScreen from './screens/MonthlyReportScreen';
import StatsScreen from './screens/StatsScreen';
import InventoryScreen from './screens/InventoryScreen';
import SkillsScreen from './screens/SkillsScreen';
import MonthlyEventScreen from './screens/MonthlyEventScreen';
import WorldMapScreen from './screens/WorldMapScreen';
import TownScreen from './screens/TownScreen';
import EventChoiceScreen from './screens/EventChoiceScreen';
import BattleMainScreen from './screens/BattleMainScreen';
import SkillSubmenuScreen from './screens/SkillSubmenuScreen';
import TargetSelectScreen from './screens/TargetSelectScreen';
import GameOverScreen from './screens/GameOverScreen';
import FinalBossScreen from './screens/FinalBossScreen';
import EndingBranchScreen from './screens/EndingBranchScreen';
import EndingScreen from './screens/EndingScreen';
import EncyclopediaScreen from './screens/EncyclopediaScreen';
import FormationScreen from './screens/FormationScreen';

const SCREEN_MAP = {
  splash: SplashScreen, 'main-menu': MainMenuScreen, 'save-load': SaveLoadScreen,
  'char-create': CharCreateScreen, prologue: PrologueScreen,
  'main-hub': MainHubScreen, 'weekly-schedule': WeeklyScheduleScreen,
  'schedule-exec': ScheduleExecScreen, 'weekly-report': WeeklyReportScreen,
  'monthly-report': MonthlyReportScreen,
  stats: StatsScreen, inventory: InventoryScreen,
  skills: SkillsScreen, 'monthly-event': MonthlyEventScreen,
  'world-map': WorldMapScreen, town: TownScreen, 'event-choice': EventChoiceScreen,
  'battle-main': BattleMainScreen, 'skill-submenu': SkillSubmenuScreen,
  'target-select': TargetSelectScreen, 'game-over': GameOverScreen,
  'final-boss': FinalBossScreen, 'ending-branch': EndingBranchScreen,
  ending: EndingScreen,
  encyclopedia: EncyclopediaScreen,
  formation: FormationScreen,
};

export default function App() {
  const { screen } = useGame();
  const ScreenComponent = SCREEN_MAP[screen] || SplashScreen;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <DeviceFrame>
        <ScreenComponent />
        <ModalOverlay />
      </DeviceFrame>
    </div>
  );
}
