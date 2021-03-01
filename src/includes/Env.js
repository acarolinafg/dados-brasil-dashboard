const Env = {
  name: 'Brasil Aberto',
  description:
    'Aplicativo de análise dos dados abertos governamentais do Brasil',
  copy: 'Brasil Aberto 2021',
  colors: {
    blue: '#28166f',
    yellow: '#f8c300',
    green: '#00923f',
  },
  version: '0.1.0',
  eleicoes: {
    AbrangenciaMunicipal: 3,
    Suplementar: 1,
    cargos: {
      Governador: 3,
      Senador: 5,
      DepFederal: 6,
      DepEstadual: 7,
      DepDistrital: 8,
      Prefeito: 11,
      Vereador: 13,
    },
    espectro: {
      ExtremaEsquerda: 1,
      Esquerda: 2,
      CentroEsquerda: 3,
      Centro: 4,
      CentroDireita: 5,
      Direita: 6,
      ExtremaDireita: 7,
    },
  },
};

export default Env;
