import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { UsersFour } from '@phosphor-icons/react/dist/ssr/UsersFour';
import { Warehouse } from '@phosphor-icons/react/dist/ssr/Warehouse';
import { Gear} from '@phosphor-icons/react/dist/ssr/Gear';
import { Plant  } from '@phosphor-icons/react/dist/ssr/Plant';
import { Package  } from '@phosphor-icons/react/dist/ssr/Package';
import { Money } from '@phosphor-icons/react/dist/ssr/Money';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  user: UserIcon,
  users: UsersIcon,
  'clientes':UsersFour , 
  'estoque': Warehouse,
  'processamento':Gear ,
  'produto': Package,
  'materia_prima':Plant,
  'vendas': Money,

} as Record<string, Icon>;
