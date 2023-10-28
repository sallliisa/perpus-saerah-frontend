const menu = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    icon: 'home',
    description: 'Dashboard',
    routes: [
      {
        name: 'dashboard',
        title: 'Dashboard',
        icon: 'home',
      }
    ]
  },
  {
    name: 'workers',
    title: 'Tukang',
    icon: 'person',
    description: 'Pengelolaan data master',
    routes: [
      {
        name: 'workers',
        title: 'Tukang',
        icon: 'person',
      },
    ]
  },
  {
    name: 'orders',
    title: 'Order',
    icon: 'database',
    description: 'Pengelolaan data master',
    routes: [
      {
        name: 'orders',
        title: 'Order',
        icon: 'database',
      },
    ]
  },
  {
    name: 'profile',
    title: 'Profile Mitra',
    icon: 'person',
    description: 'Pengelolaan data master',
    routes: [
      {
        name: 'profile',
        title: 'Profile Mitra',
        icon: 'person',
      },
    ]
  },
  // {
  //   name: 'config',
  //   title: 'Konfigurasi',
  //   icon: 'settings',
  //   description: 'Pengelolaan data master',
  //   routes: [
  //     {
  //       name: 'system-configurations',
  //       title: 'Konfigurasi Sistem',
  //       icon: 'folder',
  //     },
  //     {
  //       name: 'invoice-templates',
  //       title: 'Template Invoice',
  //       icon: 'folder',
  //     },
  //   ]
  // },
]

// const fs = require('fs')
// eslint-disable-next-line no-undef
const fs = require('fs')
menu.forEach((item) => {
  const dir = `./src/views/${item.name}`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    console.log('MODULE: folder created', dir)
  } else console.log('MODULE: folder exists', dir)
  item.routes.forEach((route) => {
    if (!route.separator) {
      const module = `./src/views/${item.name}/${route.name}`
      if (!fs.existsSync(module)) {
        fs.mkdirSync(module)
        console.log('SUBMODULE: folder created', module)
      } else console.log('SUBMODULE: folder exists', module)
      if (!fs.existsSync(`${module}/${route.name}.vue`)) {
        fs.copyFile('./BASETEMPLATE.txt', `${module}/${route.name}.vue`, (err) => {
          if (err) throw err
          console.log('SUBMODULE: generated vue template to', `${module}/${route.name}.vue`)
        })
      } else console.log('SUBMODULE: vue file already exist')
    }
  })
})
