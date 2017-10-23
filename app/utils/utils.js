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

/**
 * Convert a duration in seconds to a human readable duration
 * @param {integer} duration 
 */
export function getHumanDuration(duration) {
  var sec_num = parseInt(duration, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (hours!=='00' && minutes < 10) {minutes = "0"+minutes;}
  if (minutes!=='00' && seconds < 10) {seconds = "0"+seconds;}
  return (hours!=='00'?hours+':':'')+minutes+':'+seconds;
}