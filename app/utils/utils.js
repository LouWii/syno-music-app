/**
 * Converts a size from bytes to human readable size
 * kB,MB,GB,TB,PB,EB,ZB,YB
 * from http://stackoverflow.com/a/20463021/1740412
 * @export
 * @param {any} a
 * @param {any} b
 * @param {any} c
 * @param {any} d
 * @param {any} e
 * @returns {string}
 */
export function fileSizeSI(a,b,c,d,e){
 return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)
 +' '+(e?'kMGTPEZY'[--e]+'B':'Bytes')
}

/**
 * Capitalize first word of a string
 * from http://stackoverflow.com/a/20292655/1740412
 * @export
 * @param {string} [string='']
 * @returns
 */
export function capitalize(string = ''){
  return [...string].map(
    (char, index) => index ? char : char.toUpperCase()
  ).join('')
}

export const statusToIcon = {
  'waiting': 'glyphicon glyphicon-hourglass',
  'downloading': 'glyphicon glyphicon-save',
  'paused': 'glyphicon glyphicon-pause',
  'finishing': 'glyphicon glyphicon-refresh',
  'finished': 'glyphicon glyphicon-ok',
  'hash_checking': 'glyphicon glyphicon-tasks',
  'seeding': 'glyphicon glyphicon-export',
  'filehosting_waiting': 'glyphicon glyphicon-cloud',
  'extracting': 'glyphicon glyphicon-compressed',
  'error': 'glyphicon glyphicon-alert',
  'other': 'glyphicon glyphicon-question-sign'
}