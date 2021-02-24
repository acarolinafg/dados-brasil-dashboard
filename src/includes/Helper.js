import Env from './Env';

/**
 * Verifica se o objeto está vazio
 * @param {Object} obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Verifica se um array está vazio
 * @param {Array} arr
 * @returns {boolean}
 */
export function isEmptyArray(arr) {
  return Array.isArray(arr) && !arr.length;
}

/**
 * Verifica se um valor é vazio
 * @param value
 * @returns {boolean}
 */
export function isEmptyValue(value) {
  return value === null || value === undefined || value === '';
}

/**
 * Verifica se  a abrangência da eleição é municipal
 * @param {Object} abrangencia
 * @returns {boolean}
 */
export function isEleicaoMunicipal(abrangencia) {
  if (isEmptyObject(abrangencia)) return false;
  return abrangencia.id === Env.eleicoes.AbrangenciaMunicipal;
}

/**
 * Seleciona os cargos eleitorais de acordo com os tipos (Estadual, Federal e Municipal)
 * @param {Array} array
 * @param {Object} abrangencia
 * @param {string|Object} regiao
 * @param {string|Object} estado
 * @returns {{nome: string, id: string|Number}[]}
 */
export function selectDataCargo(array, abrangencia, regiao = '', estado = '') {
  const data = [{ id: '', nome: 'Todos' }];

  if (abrangencia.id === Env.eleicoes.AbrangenciaMunicipal)
    return data.concat(array.municipal);

  if (!isEmptyValue(regiao) || !isEmptyValue(estado))
    return data.concat(array.estadual);

  return data.concat(array.federal).concat(array.estadual);
}
