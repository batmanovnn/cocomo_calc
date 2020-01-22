// Header menu

function dropFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// Global variables

let Size = 1;
let type = 2;
let TM = 0;
let EAF_int = 1;
let A = 2.94, E = 1, EAF_II = 1, SCED = 1, PMns = 1;

//Geting parametr Size

function getSize() {
    Size = document.getElementById('input_size');
    choiseType();
    showII();
}

// COCOMO Base and Intermediate

function choiseType() {
    type = document.getElementById('input_type');
    switch (type.value) {
        case '1' :
            document.getElementById('type_text').innerHTML = "Распространенный";
            break;
        case '2' :
            document.getElementById('type_text').innerHTML = "Полунезависимый";
            break;
        case '3' :
            document.getElementById('type_text').innerHTML = "Встроенный";
            break;
    }

    showBase();     //Updating calculate
    showInter();    //Updating calculate
}

function showBase() {
    let a, b, c, d;
    switch (type.value) {
        case '1' :
            a = 2.4;
            b = 1.05;
            c = 2.5;
            d = 0.38;
            break;
        case '2' :
            a = 3;
            b = 1.12;
            c = 2.5;
            d = 0.35;
            break;
        case '3' :
            a = 3.6;
            b = 1.2;
            c = 2.5;
            d = 0.32;
            break;
    }

    //calcPM_base
    let PM_base = a * (Size.value ** b);
    document.getElementById('res_PM_base').innerHTML = PM_base.toFixed(4);
    //calcTM_base
    document.getElementById('res_TM_base').innerHTML = (calcTM(c, d, PM_base)).toFixed(4);
}

function showInter() {
    let a, b, c, d;
    switch (type.value) {
        case '1' :
            a = 3.2;
            b = 1.05;
            c = 2.5;
            d = 0.38;
            break;
        case '2' :
            a = 3;
            b = 1.12;
            c = 2.5;
            d = 0.35;
            break;
        case '3' :
            a = 2.8;
            b = 1.2;
            c = 2.5;
            d = 0.32;
            break;
    }

    //calcPM_int
    let PM_int = EAF_int * (a * (Size.value ** b));
    document.getElementById('res_PM_int').innerHTML = PM_int.toFixed(4);
    //calcTM_int
    document.getElementById('res_TM_int').innerHTML = (calcTM(c, d, PM_int)).toFixed(4);
}

function calcTM(c, d, PM) {
    return c * (PM ** d);
}

function changeEAF_int() {
    let k_EAF = [
        [0.75, 0.88, 1.00, 1.15, 1.40, 1.40],//1
        [0.94, 0.94, 1.00, 1.08, 1.16, 1.16],//2
        [0.70, 0.85, 1.00, 1.15, 1.30, 1.65],//3
        [1.00, 1.00, 1.00, 1.11, 1.30, 1.66],//4
        [1.00, 1.00, 1.00, 1.06, 1.21, 1.56], //5
        [0.87, 0.87, 1.00, 1.15, 1.30, 1.30], //6
        [0.87, 0.87, 1.00, 1.07, 1.15, 1.15], //7
        [1.46, 1.19, 1.00, 0.86, 0.71, 0.71], //8
        [1.29, 1.13, 1.00, 0.91, 0.82, 0.82], //9
        [1.42, 1.17, 1.00, 0.86, 0.70, 0.70], //10
        [1.21, 1.10, 1.00, 0.95, 0.95, 0.95], //11
        [1.14, 1.07, 1.00, 0.95, 0.95, 0.95], //12
        [1.24, 1.10, 1.00, 0.91, 0.82, 0.82], //13
        [1.24, 1.10, 1.00, 0.91, 0.83, 0.83], //14
        [1.23, 1.08, 1.00, 1.04, 1.10, 1.10], //15
    ];

    // Poll the inputs "range"
    EAF_int = 1;
    for (let i = 0; i < 14; i++) {
        let buff = k_EAF[i][(document.getElementById(`input_i${i + 1}`)).value - 1];
        document.getElementById(`i${i + 1}_text`).innerHTML = buff;
        EAF_int *= buff;
    }

    showInter();  //Updating calculate
}

// COCOMO II

function showII() {
    //calcPM_II
    PMns = EAF_II * A * (Size.value ** E);
    let PM_II = EAF_II * SCED * A * (Size.value ** E);
    document.getElementById('res_PM_II').innerHTML = (PM_II).toFixed(4);

    //calcTM_II
    let TM_II = SCED * 3.67 * PMns ** (0.28 + (0.2 * (E - 0.91)));
    document.getElementById('res_TM_II').innerHTML = (TM_II).toFixed(4);
}

function choiseA() {
    let typeA = document.getElementById('input_A');
    switch (typeA.value) {
        case '1' :
            document.getElementById('A_text').innerHTML = "Предварительная оценка";
            document.getElementById('EAF_II_p').style.display = "inline";
            document.getElementById('EAF_II_d').style.display = "none";
            A = 2.94;
            changeEAF_II_p();
            break;
        case '2' :
            document.getElementById('A_text').innerHTML = "Детальная оценка";
            document.getElementById('EAF_II_p').style.display = "none";
            document.getElementById('EAF_II_d').style.display = "inline";
            A = 2.45;
            changeEAF_II_d();
            break;
    }
    showII();   //Updating calculate
}

function calcE() {
    E = (0.91 + 0.01 * getSF()).toFixed(4);

    showII();   //Updating calculate
}

function getSF() {
    let SF = Number(radio_btn('SF_1'));
    SF += Number(radio_btn('SF_2'));
    SF += Number(radio_btn('SF_3'));
    SF += Number(radio_btn('SF_4'));
    SF += Number(radio_btn('SF_5'));

    return SF;
}

function radio_btn(name) {
    let radios = document.getElementsByName(name);
    let value;

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            value = radios[i].value;
            break;
        }
    }
    return value;
}

function changeEAF_II_p() {
    let k_EAF = [
        [2.12, 1.62, 1.26, 1.00, 0.83, 0.63, 0.50],//1
        [1.59, 1.33, 1.22, 1.00, 0.87, 0.74, 0.62],//2
        [0.49, 0.60, 0.83, 1.00, 1.33, 1.91, 2.72],//3
        [0.95, 0.95, 0.95, 1.00, 1.07, 1.15, 1.24],//4
        [0.87, 0.87, 0.87, 1.00, 1.29, 1.81, 2.61],//5
        [1.43, 1.30, 1.10, 1.00, 0.87, 0.73, 0.62],//6
        [1.43, 1.43, 1.14, 1.00, 1.00, 1.00, 1.00],//7
    ];

    // Poll the inputs "range"
    EAF_II = 1;
    for (let i = 0; i < 6; i++) {
        let buff = k_EAF[i]     [(document.getElementById(`input_e${i + 1}`)).value - 1];
        document.getElementById(`e${i + 1}_text`).innerHTML = buff;
        EAF_II *= buff;
    }
    ;

    SCED = k_EAF[6][(document.getElementById('input_e7')).value - 1];
    document.getElementById('e7_text').innerHTML = SCED;

    showII();
}

function changeEAF_II_d() {
    let k_EAF = [
        [1.42, 1.29, 1.00, 0.85, 0.71, 0.71],// 1
        [1.22, 1.10, 1.00, 0.88, 0.81, 0.81],// 2
        [1.34, 1.15, 1.00, 0.88, 0.76, 0.76],// 3
        [1.29, 1.12, 1.00, 0.90, 0.81, 0.81],// 4
        [1.19, 1.09, 1.00, 0.91, 0.85, 0.85],// 5
        [1.20, 1.09, 1.00, 0.91, 0.84, 0.84],// 6
        [0.84, 0.92, 1.00, 1.10, 1.26, 1.26],// 7
        [0.23, 0.23, 1.00, 1.14, 1.28, 1.28],// 8
        [0.73, 0.87, 1.00, 1.17, 1.34, 1.74],// 9
        [0.95, 0.95, 1.00, 1.07, 1.15, 1.24],//10
        [0.81, 0.91, 1.00, 1.11, 1.23, 1.23],//11
        [1.00, 1.00, 1.00, 1.11, 1.29, 1.63],//12
        [1.00, 1.00, 1.00, 1.05, 1.17, 1.46],//13
        [0.87, 0.87, 1.00, 1.15, 1.30, 1.30],//14
        [1.17, 1.09, 1.00, 0.90, 0.78, 0.78],//15
        [1.22, 1.09, 1.00, 0.93, 0.86, 0.80],//16
        [1.43, 1.14, 1.00, 1.00, 1.00, 1.00],//17

    ];

    // Poll the inputs "range"
    EAF_II = 1;
    for (let i = 0; i < 16; i++) {
        let buff = k_EAF[i]     [(document.getElementById(`input_m${i + 1}`)).value - 1];
        document.getElementById(`m${i + 1}_text`).innerHTML = buff;
        EAF_II *= buff;
    }
    ;

    SCED = k_EAF[16][(document.getElementById('input_m17')).value - 1];
    document.getElementById('m17_text').innerHTML = SCED;

    showII();
}
