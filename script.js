const tbody = document.querySelector("tbody");
const desc = document.querySelector("#desc");
const valor = document.querySelector("#valor");
const tipo = document.querySelector("#tipo");
const btnAdd = document.querySelector("#btnAdd");

const entradas = document.querySelector(".entradas");
const saidas = document.querySelector(".saidas");
const total = document.querySelector(".total");

let itens;

btnAdd.onclick = () => {
    if (desc.value === "" || valor.value === "" || tipo.value === "") {
      return alert("Preencha todos os campos!");
    }
  
    itens.push({
      desc: desc.value,
      valor: Math.abs(valor.value).toFixed(2),
      tipo: tipo.value,
    });
  
    setItensBD();
  
    loadItens();
  
    desc.value = "";
    valor.value = "";
  };
  
  function deleteItem(index) {
    itens.splice(index, 1);
    setItensBD();
    loadItens();
  }
  
  function insertItem(item, index) {
    let tr = document.createElement("tr");
  
    tr.innerHTML = `
      <td>${item.desc}</td>
      <td>R$ ${item.valor}</td>
      <td class="coluna-tipo">${
        item.tipo === "Entrada"
          ? '<i class="bx bxs-chevron-up-circle"></i>'
          : '<i class="bx bxs-chevron-down-circle"></i>'
      }</td>
      <td class="coluna-acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `;
  
    tbody.appendChild(tr);
  }
  
function loadItens(){
    itens = getItensBD();
    tbody.innerHTML ="";
    itens.forEach((item, index)=> {
        insertItem(item, index);
    });
    getTotal();
}

function getTotal() {
    const valorEntradas = itens
      .filter((item) => item.tipo === "Entrada")
      .map((transaction) => Number(transaction.valor));
  
    const valorSaidas = itens
      .filter((item) => item.tipo === "Saída")
      .map((transaction) => Number(transaction.valor));
  
    const totalEntrdas = valorEntradas
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);
  
    const totalSaidas = Math.abs(
      valorSaidas.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);
  
    const totalItens = (totalEntrdas - totalSaidas).toFixed(2);
  
    entradas.innerHTML = totalEntrdas;
    saidas.innerHTML = totalSaidas;
    total.innerHTML = totalItens;
  }
  

const getItensBD = () => JSON.parse(localStorage.getItem("db_itens")) ??[];
const setItensBD = () => localStorage.setItem("db_itens", JSON.stringify(itens));
loadItens();