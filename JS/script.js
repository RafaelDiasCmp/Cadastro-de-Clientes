// Array para armazenar os clientes
var cliente = [];

// Função para pesquisar CEP
function pesquisarCep() {
    var cep = document.getElementById("cep").value.replace("-", "");
    var url = `https://viacep.com.br/ws/${cep}/json/`;
    // Requisição AJAX para obter dados do CEP
    $.getJSON(url, (response) => {
        if ("erro" in response) {
            mostrarErro("CEP não encontrado!");
            preencherDados({});
            document.getElementById("numberHouse").disabled = true;
        } else {
            mostrarErro("");
            preencherDados(response);
            document.getElementById("numberHouse").disabled = false;
        }
    });
}

// Função para salvar um novo cliente
function save() {
    var infoCliente = {
        id: cliente.length + 1,
        primaryName: document.getElementById("primaryName").value,
        secondaryName: document.getElementById("secondaryName").value,
        cep: document.getElementById("cep").value,
        address: document.getElementById("address").value,
        number: document.getElementById("numberHouse").value,
        neighborhood: document.getElementById("neighborhood").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value
    };
    addNewRow(infoCliente);
    cliente.push(infoCliente);
    document.getElementById("formCliente").reset();
    document.getElementById("numberHouse").disabled = true;
}

// Função para adicionar uma nova linha na tabela de clientes
function addNewRow(infoCliente) {
    var tableBody = document.getElementById("clientesTableBody");
    var newRow = tableBody.insertRow();
    newRow.insertCell().textContent = infoCliente.id;
    newRow.insertCell().textContent = `${infoCliente.primaryName} ${infoCliente.secondaryName}`;
    newRow.insertCell().textContent = `${infoCliente.address}, ${infoCliente.number}`;
    newRow.insertCell().textContent = infoCliente.cep;
    newRow.insertCell().textContent = infoCliente.neighborhood;
    newRow.insertCell().textContent = infoCliente.city;
    newRow.insertCell().textContent = infoCliente.state;
}

// Função para preencher os campos de endereço com os dados do CEP
function preencherDados(response) {
    document.getElementById("address").value = response.logradouro || "";
    document.getElementById("numberHouse").value = "";
    document.getElementById("neighborhood").value = response.bairro || "";
    document.getElementById("city").value = response.localidade || "";
    document.getElementById("state").value = response.uf || "";
}

// Função para mostrar mensagens de erro
function mostrarErro(msg) {
    document.getElementById("error").innerText = msg;
}

// Função para validar o número da casa
function validarNumero() {
    var numero = document.getElementById("numberHouse").value;
    if (numero === "") {
        mostrarErro("Informe um número válido!");
        document.getElementById("numberHouse").disabled = true;
    } else {
        save();
    }
}
