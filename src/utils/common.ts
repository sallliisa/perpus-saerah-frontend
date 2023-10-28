import services from './services'
import { userConfig } from '@/stores/userconfig'

export const titleCase = (s: string) => s.replace(/^[-_]*(.)/, (_: any, c: any) => c.toUpperCase()).replace(/[-_]+(.)/g, (_: any, c: any) => ' ' + c.toUpperCase())

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str
}

export function formatCurrency(num: number | undefined | null, locale = 'ID', currency = 'IDR') {
  return num ? new Intl.NumberFormat(locale, { style: 'currency', currency }).format(num) : '-'
}

export function formatDate(date: string | undefined | null, options?: Intl.DateTimeFormatOptions, locale = 'id-ID') {
  return date ? new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', ...(options ? options : {}) }) : '-'
}

export function formatTime(date: string | undefined | null, options?: Intl.DateTimeFormatOptions, locale = 'id-ID') {
  return date ? new Date(date).toLocaleTimeString(locale, { hour: 'numeric', minute: 'numeric', ...(options ? options : {}) }) : '-'
}

export function formatDateTime(date: string | undefined | null, options?: Intl.DateTimeFormatOptions, locale = 'id-ID') {
  return date ? new Date(date).toLocaleString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', ...(options ? options : {}) }) : '-'
}

export function formatNumber(num: number | undefined | null, locale = 'id-ID') {
  return num ? new Intl.NumberFormat(locale, { style: 'decimal' }).format(num) : '-'
}

export const JSONfn = {
  stringify: function (obj: object, space = 0) {
    return JSON.stringify(
      obj,
      function (key, value) {
        var fnBody
        if (value instanceof Function || typeof value == 'function') {
          fnBody = value.toString()
          if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') {
            return '_STRFNC_' + fnBody + '_STRFNC_'
          }
          return fnBody
        }
        if (value instanceof RegExp) {
          return '_REGEXP_' + value + '_REGEXP_'
        }
        return value
      },
      space
    )
  },
  parse: function (str: string, date2obj = false) {
    var iso8061 = date2obj ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false
    return JSON.parse(str, function (key, value) {
      var prefix
      if (typeof value != 'string') {
        return value
      }
      if (value.length < 8) {
        return value
      }
      prefix = value.substring(0, 8)
      if (typeof iso8061 != 'boolean') {
        if (value.match(iso8061)) return new Date(value)
      }
      if (prefix === 'function') {
        return eval('(' + value + ')')
      }
      if (prefix === '_REGEXP_') {
        return eval(value.slice(8, -8))
      }
      if (prefix === '_STRFNC_') {
        return eval(value.slice(8, -8))
      }
      return value
    })
  },
  clone: function (obj: object, date2obj = false) {
    return exports.parse(exports.stringify(obj), date2obj)
  },
}

export const monthDiff = (dateFrom: Date, dateTo: Date) => {
  return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
}

export const printHTML = (elementID: string) => {
  const innerHTML = document.getElementById(elementID)!.innerHTML.replace(/"/g, `'`)
  const printedHTML = `
  <html>
		<head>
			<meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100;200;300;400;500;600;700;800;900;1000&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/src/assets/offline.css">
		</head>
		<body style="-webkit-print-color-adjust: exact !important;">
      ${innerHTML}
    </body>
	</html>
  `
  const frame = document.createElement('iframe')
  frame.setAttribute('id', 'printing-frame')
  frame.setAttribute('name', 'printing-frame')
  frame.setAttribute('src', 'about:blank')
  frame.setAttribute('frameborder', '0')
  frame.setAttribute('scrolling', 'no')
  frame.setAttribute('style', 'position: absolute; top: -100em; left: -100em;')
  document.body.appendChild(frame)
  const frameDoc = frame.contentWindow?.document
  frameDoc!.open()
  frameDoc!.write(printedHTML)
  frameDoc!.close()
  frame.focus()
  setTimeout(() => {
    frame.contentWindow?.print()
    document.body.removeChild(frame)
  }, 500)
}

export const getObjectValue = (o: object, s: string): any => {
  s = s.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  s = s.replace(/^\./, '') // strip a leading dot
  var a = s.split('.')
  for (var i = 0, n = a.length; i < n; ++i) {
    var k: any = a[i]
    if (k in o) {
      o = (o as any)[k]
    } else {
      return
    }
  }
  return o
}

export function openInMaps(lat: any, lng: any) {
  window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank')
}