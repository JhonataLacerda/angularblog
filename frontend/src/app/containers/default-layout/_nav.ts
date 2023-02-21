import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'ADMINISTRATIVO',
    url: '/dashboard',
  },
  {
    title: true,
    name: 'Conteúdo'
  },
  {
    name: 'Publicação',
    url: '/pages/posts',
    iconComponent: { name: 'cil-bold' }
  },

  
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Cadastro',
        url: '/register'
      },
      {
        name: 'Erro 404',
        url: '/404'
      },
      {
        name: 'Erro 500',
        url: '/500'
      }
    ]
  },
];
