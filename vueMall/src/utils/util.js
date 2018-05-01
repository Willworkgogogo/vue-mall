// trim 去除空格
export function trim(str) {
  let reg = /\s+/g
  return str.replace(reg, '')
}
