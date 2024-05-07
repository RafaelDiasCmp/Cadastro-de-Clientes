$("#cep").mask("99999-999");

var cliente = [];

function pesquisarCep(cep) {

    var cep = document.getElementById("cep").value;

    var url = `https://viacep.com.br/ws/${cep}/json/`


    $.getJSON(url, (response) => {

        if (("erro" in response)) {
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

function addNewRow(infoCliente) {

    var tableBody = document.getElementById("clientesTableBody");

    var newRow = tableBody.insertRow();

    newRow.insertCell().textContent = (infoCliente.id);
    newRow.insertCell().textContent = (infoCliente.primaryName + " " + infoCliente.secondaryName);
    newRow.insertCell().textContent = (infoCliente.address + ", " + infoCliente.number);
    newRow.insertCell().textContent = (infoCliente.cep);
    newRow.insertCell().textContent = (infoCliente.neighborhood);
    newRow.insertCell().textContent = (infoCliente.city);
    newRow.insertCell().textContent = (infoCliente.state);

}


function validarNumero() {
    var numero = document.getElementById("numberHouse").value;

    if (numero === "") {
        mostrarErro("Informe um CEP Válido!");
        preencherDados({});
        document.getElementById("numberHouse").disabled = true;
    } else {
        save();
    }
}


function validarCep() {
    var cep = document.getElementById("cep").value;

    cep = cep.replace("-", "");

    if (cep.length < 8) {
        mostrarErro("CEP inválido");
        preencherDados({});
        document.getElementById("numberHouse").disabled = true;

    } else {
        mostrarErro("");
        pesquisarCep(cep);
    }
}

function preencherDados(response) {
    document.getElementById("address").value = response.logradouro || "";
    document.getElementById("numberHouse").value = "";
    document.getElementById("neighborhood").value = response.bairro || "";
    document.getElementById("city").value = response.localidade || "";
    document.getElementById("state").value = response.uf;
}

function mostrarErro(msg) {
    document.getElementById("error").innerHTML = msg;
}

