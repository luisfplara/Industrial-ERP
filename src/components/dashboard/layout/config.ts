import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Dashboard', href: paths.dashboard.overview, icon: 'chart-pie',show:true },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users',show:false },
  { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected',show:false },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' ,show:false},
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user',show:false },
  { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square',show:false },
  {key: 'clientes',title: 'Clientes', href: paths.dashboard.clientes, icon: 'clientes',show:true},
  {key: 'estoque',title: 'Estoque', href: paths.dashboard.estoque, icon: 'estoque',show:true},
  {key: 'produto',title: 'Produto', href: paths.dashboard.produto, icon: 'produto',show:true},
  {key: 'processamento',title: 'Processamento', href: paths.dashboard.processamento, icon: 'processamento',show:false},
  {key: 'materia_prima',title: 'Matéria Prima', href: paths.dashboard.materia_prima, icon: 'materia_prima',show:false},
  {key: 'vendas',title: 'Vendas', href: paths.dashboard.vendas, icon: 'vendas',show:false}
] satisfies NavItemConfig[];
