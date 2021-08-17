
const PMT = (ir, np, pv, fv, type) => {
    
    /* ir   - interes
    * np   - meses
     * pv   - valor actual
     * fv   - valor futuro
     * type - cuando se pago?:
     *        0: final de periodo/final de mes
     *        1: principio del periodo*/

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return -(pv + fv)/np;

    const pvif = Math.pow(1 + ir, np);
    const pmt = - ir * (pv * pvif + fv) / (pvif - 1);

    if (type === 1) pmt /= (1 + ir);

    return Math.round(Math.abs(pmt));
}


const filter = () => {
    
    const tipo = document.getElementById("tipo");
    const value = tipo.options[tipo.selectedIndex].value;
   

    if(value == "sldo"){
        let sueldo = document.getElementById("sueldo-card")
        sueldo.innerHTML = `
        <p> ¿Dónde trabajás? </p>
        <select class="mdl-textfield__input" id="sueldo" name="sueldo" onchange="cuotas()">
        <option></option>
        <option value="1.25">Empleado publico provincial</option>
        <option value="1.25">Municipalidad de Parana</option>
        <option value="1.4">Municipalidad de Guaymallen</option>
        <option value="1.4">Municipalidad de Maipu</option>
        <option value="1.4">Municipalidad de Las Heras</option>
        <option value="1.25">Camara de senadores</option>
        <option value="1.25">Departamento de irrigacion</option>
        </select>
        `
    }

    else if(value == "cbu"){
        let cbu = document.getElementById("cbu-card")
        cbu.innerHTML = `
        <p> ¿Dónde trabajás? </p>
        <select class="mdl-textfield__input" id="cbu" name="cbu" onchange="cuotas()">
        <option></option>
        <option value="1.55">Jubilados y pensionados</option>
        <option value="1.35">Empleado publico provincial</option>
        <option value="1.35">Empleado publico Nacional</option>
        <option value="1.35">Empleado municipal</option>
        </select>
        `
    }
    
    
}

const cuotas = () => {

    
    let renderCuotas = document.getElementById("cuotas-card")
    sueldo.innerHTML = `
    <select class="mdl-textfield__input" id="cuotas" name="cuotas" >
    <option>¿En cuántas cuotas querés pagar?</option>
    <option value="6">6</option>
    <option value="12">12</option>
    <option value="18">18</option>
    <option value="24">24</option>
    <option value="30">30</option>
    <option value="36">36</option>
    </select>
    `
    
}

const selector = ()=>{

    let valueOfSueldo,valueOfCbu, porSueldo, porCbu

    const sueldo = document.getElementById("sueldo");
    if(sueldo) {valueOfSueldo = sueldo.options[sueldo.selectedIndex].value; porSueldo = sueldo.options[sueldo.selectedIndex].text;}

    const cbu = document.getElementById("cbu");
    if(cbu) {valueOfCbu = cbu.options[cbu.selectedIndex].value;porCbu = cbu.options[cbu.selectedIndex].text;}
    
    const valor = document.getElementById("valor").value;

    const cuotas = document.getElementById("cuotas");
    const valueOfCuotas = cuotas.options[cuotas.selectedIndex].value;

    let gasto = {
        gastosOrigen: 0.151,
        segDeVida:0,
        selladoPcial:0.015,
        selladoSolic:0
    }
    let tope = 450000


    let metodo = porSueldo ? porSueldo : porCbu


    switch(metodo){

        case "Camara de senadores":
            gasto.gastosOrigen = 0.21
        break;
        case "Departamento de Irrigación":
            gasto.gastosOrigen = 0.21
        break;
        case "Jubilados y pensionados":
            gasto.gastosOrigen = 0.21
            tope = 25000
        break;
        case "Empleado municipal provincia de Mendoza":
            gasto.gastosOrigen = 0.21
            tope = 25000
        break;
        case "Empleado público provincia Mendoza":
            tope = 35000
        case "Empleado público Nacional":
            tope = 35000
        break;
    }



    const { gastosOrigen, segDeVida, selladoPcial, selladoSolic } = gasto
    const montoSolicitado = valor / ( 1 - (gastosOrigen + segDeVida + selladoPcial + selladoSolic) + (selladoSolic / (1 - (gastosOrigen + segDeVida + selladoPcial + selladoSolic))))

    const calculo = PMT((valueOfSueldo * 30) / 365  ? (valueOfSueldo * 30) / 365 : (Number(valueOfCbu)* 30) / 365, Number(valueOfCuotas), montoSolicitado, 0, 0)
    if(valor <= tope){
        const finalPrice = document.getElementById("installment_value").innerHTML = 
            `$ ${calculo} ARS`
    }else{
        const finalPrice = document.getElementById("installment_value").innerHTML = 
            `El máximo que puedes solicitar es ${tope}`
    }
    
 
}