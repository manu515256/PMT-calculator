
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
        <select class="mdl-textfield__input" id="sueldo" name="sueldo" >
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
        <select class="mdl-textfield__input" id="cbu" name="cbu" >
        <option></option>
        <option value="1.55">Jubilados y pensionados</option>
        <option value="1.35">Empleado publico provincial</option>
        <option value="1.35">Empleado publico Nacional</option>
        <option value="1.35">Empleado municipal</option>
        </select>
        `
    }
}

const selector = ()=>{

    let valueOfSueldo

    const sueldo = document.getElementById("sueldo");
    if(sueldo) {valueOfSueldo = sueldo.options[sueldo.selectedIndex].value;}

    const cbu = document.getElementById("cbu");
    if(cbu) {valueOfCbu = cbu.options[cbu.selectedIndex].value;}
    
    const valor = document.getElementById("valor").value;

    const cuotas = document.getElementById("cuotas");
    const valueOfCuotas = cuotas.options[cuotas.selectedIndex].value;

    let gasto = {
        gastosOrigen: 0.151,
        segDeVida:0,
        selladoPcial:0.015,
        selladoSolic:0
    }
    const { gastosOrigen, segDeVida, selladoPcial, selladoSolic } = gasto
    const montoSolicitado = valor / ( 1 - (gastosOrigen + segDeVida + selladoPcial + selladoSolic) + (selladoSolic / (1 - (gastosOrigen + segDeVida + selladoPcial + selladoSolic))))

    const finalPrice = document.getElementById("installment_value").innerHTML = 
    `$ ${PMT((valueOfSueldo * 30) / 365  ? (valueOfSueldo * 30) / 365 : (Number(valueOfCbu)* 30) / 365, Number(valueOfCuotas), montoSolicitado, 0, 0)} ARS`
 
}