// 深拷贝
export let deepClone = function (tar) {
  if (!tar || typeof (tar) !== 'object') {
    return tar;
  }
  let current = (tar instanceof Array ? [] : {});
  for (const key of Object.keys(tar)) {
    current[key] = deepClone(tar[key]);
  }
  return current;
};
