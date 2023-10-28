import type { Modules } from './types'

// Uses name as permission if permission field is not defined
// permission is only read on route-level
const menu: Modules = [
  {
    name: 'master',
    title: 'Master',
    icon: 'database',
    description: 'Pengelolaan data master',
    routes: [
      {
        name: 'category',
        title: 'Kategori Buku',
        icon: 'folder',
      },
      {
        name: 'book',
        title: 'Buku',
        icon: 'folder',
      },
    ],
  },
  {
    name: 'borrowing',
    title: 'Peminjaman',
    icon: 'receipt_long',
    description: 'Pengelolaan data transaksi',
    routes: [
      {
        name: 'borrowing',
        title: 'Peminjaman',
        icon: 'folder',
      },
    ],
  },
  {
    name: 'administrative',
    title: 'Administratif',
    icon: 'person',
    description: 'Pengelolaan data pengguna',
    routes: [
      {
        name: 'member',
        title: 'Member',
        icon: 'folder',
      },
      {
        name: 'officer',
        title: 'Karyawan',
        icon: 'folder',
      },
      {
        name: 'user',
        title: 'Pengguna',
        icon: 'folder',
      },
    ],
  },
]

export default menu