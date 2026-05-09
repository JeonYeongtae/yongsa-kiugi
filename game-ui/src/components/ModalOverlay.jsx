import { useGame } from '../context/GameContext';
import CalendarModal from '../modals/CalendarModal';
import MBTIModal from '../modals/MBTIModal';
import SkipModal from '../modals/SkipModal';
import ActivityModal from '../modals/ActivityModal';
import PartyModal from '../modals/PartyModal';
import MentorModal from '../modals/MentorModal';
import CompanionDetailModal from '../modals/CompanionDetailModal';
import SkillSettingModal from '../modals/SkillSettingModal';
import SkillDetailModal from '../modals/SkillDetailModal';
import EquipmentDetailModal from '../modals/EquipmentDetailModal';
import SettingsModal from '../modals/SettingsModal';
import ShopModal from '../modals/ShopModal';
import InnModal from '../modals/InnModal';
import GuildModal from '../modals/GuildModal';
import ItemModal from '../modals/ItemModal';
import VictoryModal from '../modals/VictoryModal';
import EncyclopediaModal from '../modals/EncyclopediaModal';

const MODAL_MAP = {
  calendar: CalendarModal, mbti: MBTIModal, skip: SkipModal,
  activity: ActivityModal, party: PartyModal, mentor: MentorModal,
  'companion-detail': CompanionDetailModal, 'skill-setting': SkillSettingModal,
  'skill-detail': SkillDetailModal, 'equipment-detail': EquipmentDetailModal,
  settings: SettingsModal, shop: ShopModal, inn: InnModal,
  guild: GuildModal, item: ItemModal, victory: VictoryModal,
  encyclopedia: EncyclopediaModal,
};

export default function ModalOverlay() {
  const { modal, closeModal } = useGame();
  if (!modal) return null;
  const ModalComponent = MODAL_MAP[modal];
  if (!ModalComponent) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.65)' }}>
      <ModalComponent onClose={closeModal} />
    </div>
  );
}
