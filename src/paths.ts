export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    clientes: '/dashboard/clientes',
    estoque: '/dashboard/estoque',
    invetario: '/dashboard/invetario',
    processamento: '/dashboard/processamento',
    produto: '/dashboard/produto',
    materia_prima: '/dashboard/materia-prima',
    vendas: '/dashboard/vendas',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
