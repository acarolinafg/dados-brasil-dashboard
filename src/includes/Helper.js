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
 * Verifica se o valor corresponde a uma eleição suplementar
 * @param {Number} tipoEleicaoId
 * @returns {boolean}
 */
export function isEleicaoSuplementar(tipoEleicaoId) {
  return tipoEleicaoId === Env.eleicoes.Suplementar;
}

/**
 * Seleciona os cargos eleitorais de acordo com os tipos (Estadual, Federal e Municipal)
 * @param {Array} array
 * @param {Object} abrangencia
 * @param {string|Number} regiao
 * @returns {{nome: string, id: string|Number}[]}
 */
export function selectDataCargo(array, abrangencia, regiaoId = '') {
  const data = [{ id: '', nome: 'Todos' }];

  if (abrangencia.id === Env.eleicoes.AbrangenciaMunicipal)
    return data.concat(array.municipal);

  if (!isEmptyValue(regiaoId)) return data.concat(array.estadual);

  return data.concat(array.federal).concat(array.estadual);
}

/**
 * Retorna o array de estados de uma região
 * @param {Array} dataRegiao
 * @param {Number} idRegiao
 * @returns {[{nome: string, id: string}]}
 */
export function selectDataEstadoRegiao(dataRegiao, idRegiao) {
  let dataEstados = [{ id: '', nome: 'Todos' }];

  dataRegiao.forEach((item) => {
    if (item.id === idRegiao) dataEstados = dataEstados.concat(item.estados);
  });

  return dataEstados;
}