const app = {
  name: 'Tulen | Admin',
  layout: 'SIDEBAR',
  mode: 'DEVELOPMENT',
  company: 'HK',
  guide: 'https://drive.google.com/file/d/1zdjwiNfAGVRIoixiMMaw07EmbEZ2Xp9L/view?usp=sharing',
  logo: {
    sm: './static/img/logo/720x720.svg',
    md: './static/img/logo/480x480.svg',
    lg: './static/img/logo/240x240.svg',
  },
  server: {
    staging: 'http://localhost:6969/api',
    development: 'http://localhost:6969/api',
    production: 'http://localhost:6969/api',
    demo: 'http://localhost:6969/api',
  },
  download: {
    android: 'https://play.google.com/store/',
    ios: 'https://www.apple.com/id/app-store/',
  },
  options: {
    allowRegister: false,
    forgetPassword: false,
    autofill: false,
    myAction: false,
  },
}
// =========================================================
// File CUSTOM Variable SCSS
// static\assets\sass\components\_variables.demo.scss
// =========================================================

export default app
