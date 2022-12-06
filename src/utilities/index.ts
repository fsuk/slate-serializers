export const hasLineBreak = (str: string) => str.match(/[\r\n]+/) !== null

export const prependSpace = (str: string) => str && ` ${str.trim()}`

export const parseStyleCssText = (value: string): {[key: string]: string} => {
  let output: {[key: string]: string} = {}

  if (!value) {
      return output
  }

  var camelize = function camelize(str: string) {
      return str.replace (/(?:^|[-])(\w)/g, function (a, c) {
          c = a.substring(0, 1) === '-' ? c.toUpperCase () : c
          return c ? c : ''
      })
  }

  var style = value.split(';')

  for (var i = 0; i < style.length; ++i) {
      var rule = style[i].trim()

      if (rule) {
          var ruleParts = rule.split(':')
          var key = camelize(ruleParts[0].trim())
          output[key] = ruleParts[1].trim()
      }
  }

  return output
}

export const styleToString = (style: {[key: string]: string}) => {
  return Object.keys(style).reduce((acc, key) => (
      acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
  ), '')
}

export const removeEmpty = (obj: {}): {} => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}

/**
 * 
 * @param obj an object of any dimension
 * @param args property list to check
 * @returns undefined or property value
 */
export const getNested = (obj: any, ...args: string[]) => {
  return args.reduce((obj, level) => obj && obj[level], obj)
}
