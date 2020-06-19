const pergunta = document.getElementById("pergunta");
const escolhas = Array.from(document.getElementsByClassName("escolha-texto"));
const contaQuestaoTexto = document.getElementById("contaQuestao");
const pontosTexto = document.getElementById("pontos");

let perguntaAtual = {};
let aceitaResposta = false;
let pontos = 0;
let contaQuestao = 0;
let questaoDisponivel = [];

let perguntas = [
  {
    pergunta: "Que país presenteou os EUA com a Estátua da Liberdade?",
    escolha1: "Inglaterra",
    escolha2: "França",
    escolha3: "Alemanha",
    escolha4: "Canadá",
    resposta: 2,
  },
  {
    pergunta: "Qual a sigla de Mato Grosso?",
    escolha1: "MT",
    escolha2: "MG",
    escolha3: "MS",
    escolha4: "MA",
    resposta: 1,
  },
  {
    pergunta: "Quem pintou o Abaporu?",
    escolha1: "Di Cavalcanti",
    escolha2: "Tarsila do Amaral",
    escolha3: "Anita Malfatti",
    escolha4: "Cândido Portinari",
    resposta: 2,
  },
  {
    pergunta: "Em qual continente fica localizada a Austrália?",
    escolha1: "África",
    escolha2: "Ásia",
    escolha3: "Europa",
    escolha4: "Oceania",
    resposta: 4,
  },
  {
    pergunta: "Qual dessas NÃO é uma escola literária?",
    escolha1: "Amadorismo",
    escolha2: "Simbolismo",
    escolha3: "Trovadorismo",
    escolha4: "Romantismo",
    resposta: 1,
  },
  {
    pergunta: "Em que país nasceram os Jogos Olímpicos?",
    escolha1: "Grécia",
    escolha2: "França",
    escolha3: "África do Sul",
    escolha4: "Argentina",
    resposta: 1,
  },
  {
    pergunta: "Qual é o continente com mais países?",
    escolha1: "América do Sul",
    escolha2: "Ásia",
    escolha3: "África",
    escolha4: "Europa",
    resposta: 3,
  },
  {
    pergunta: "Quem nasce no Rio de Janeiro é popularmente chamado de _______",
    escolha1: "Carioquense",
    escolha2: "Carioca",
    escolha3: "Riodejaneirense",
    escolha4: "Fluminense",
    resposta: 2,
  },
  {
    pergunta: "Qual a capital do Acre?",
    escolha1: "Ouro Branco",
    escolha2: "Céu Branco",
    escolha3: "Rio Branco",
    escolha4: "Boa Vista",
    resposta: 3,
  },
  {
    pergunta: "Quem é conhecido como o 'Rei do futebol'?",
    escolha1: "Pelé",
    escolha2: "Oliver Tsubasa",
    escolha3: "Maradona",
    escolha4: "Deco",
    resposta: 1,
  },
  {
    pergunta: "Em que ano foi ao ar a novela 'Celebridade'?",
    escolha1: "2010",
    escolha2: "2005",
    escolha3: "2013",
    escolha4: "2003",
    resposta: 4,
  },
];

const PREMIO_ACERTO = 250000;
const MAX_PERGUNTAS = 4;

iniciaJogo = () => {
  pontos = 0;
  contaQuestao = 0;
  questaoDisponivel = [...perguntas];
  novaQuestao();
};

novaQuestao = () => {
  if (questaoDisponivel.length === 0 || contaQuestao >= MAX_PERGUNTAS)
    return window.location.assign("voceganhou.html");

  contaQuestao++;
  contaQuestaoTexto.innerText = contaQuestao + "/" + MAX_PERGUNTAS;

  const perguntaIndex = Math.floor(Math.random() * questaoDisponivel.length);
  perguntaAtual = questaoDisponivel[perguntaIndex];
  pergunta.innerText = perguntaAtual.pergunta;

  escolhas.forEach((escolha) => {
    const number = escolha.dataset["number"];
    escolha.innerText = perguntaAtual["escolha" + number];

    questaoDisponivel.splice(perguntaIndex, 1);

    aceitaResposta = true;
  });
};

escolhas.forEach((escolha) => {
  escolha.addEventListener("click", (e) => {
    if (!aceitaResposta) return;

    aceitaResposta = false;

    const escolhaSelecionada = e.target;
    const respostaSelecionada = escolhaSelecionada.dataset["number"];

    const classToApply =
      respostaSelecionada == perguntaAtual.resposta ? "Correta" : "Incorreta";
    if (classToApply === "Correta") {
      somaPontos(PREMIO_ACERTO);
    } else {
      return window.location.assign("voceperdeu.html");
    }

    escolhaSelecionada.parentElement.classList.add(classToApply);

    setTimeout(() => {
      escolhaSelecionada.parentElement.classList.remove(classToApply);
      novaQuestao();
    }, 800);
  });
});

somaPontos = (num) => {
  pontos += num;
  pontosTexto.innerText = pontos;
};

var seconds = document.getElementById("countdown").textContent;
var countdown = setInterval(function() {
  seconds--;
  document.getElementById("countdown").textContent = seconds;
  if (seconds <= 0) return window.location.assign("voceperdeu.html");
}, 1000);

iniciaJogo();
