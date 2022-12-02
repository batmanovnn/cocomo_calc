// Header menu
function info_btn_click(){
    let element = document.getElementById("info_block");
    let valueVis = window.getComputedStyle(element).visibility;
    console.log(valueVis);
    if(valueVis == "visible"){document.getElementById('info_block').style.visibility = "hidden"}
        else {document.getElementById('info_block').style.visibility = "visible"}
}

// Global variables
let Size;

//Geting parametr Size
function getSize() {
    let buff = parseInt(document.getElementById('input_size').value);
    if (buff > 100){Size = 100}
        else if (buff < 2) {Size = 2}
                else{Size = buff}
    choiseType();
    choiseA();
}

// COCOMO Base and Intermediate
let type = 2, TM = 0, EAF_int = 1;  // Global variables

function choiseType() {
    type = Number(document.getElementById('input_type').value);
    if (type === 1)
        {document.getElementById('type_text').innerHTML = "Распространенный";
        document.getElementById('org').style.display = "inline";
        document.getElementById('emb').style.display = "none";
        document.getElementById('sem').style.display = "none";
        }else if (type === 2) {document.getElementById('type_text').innerHTML = "Полунезависимый";
            document.getElementById('org').style.display = "none";
            document.getElementById('emb').style.display = "inline";
            document.getElementById('sem').style.display = "none";
                }else if (type === 3) {document.getElementById('type_text').innerHTML = "Встроенный";
                    document.getElementById('org').style.display = "none";
                    document.getElementById('emb').style.display = "none";
                    document.getElementById('sem').style.display = "inline";
                }

    showBase();     //Updating calculate
    showInter();    //Updating calculate
}

function showBase() {
    let a, b, c, d;
    if (type === 1) {
        a = 2.4;
        b = 1.05;
        c = 2.5;
        d = 0.38;
        }else if (type === 2) {
            a = 3;
            b = 1.12;
            c = 2.5;
            d = 0.35;
            }else if (type === 3) {
                a = 3.6;
                b = 1.2;
                c = 2.5;
                d = 0.32;
            }console.log("a=" + a + ", b=" + b + ", c=" + c + ", d=" + d)

    //calcPM_base
    let PM_base = a * (Size ** b);
    document.getElementById('res_PM_base').innerHTML = PM_base.toFixed(4);
    //calcTM_base
    document.getElementById('res_TM_base').innerHTML = (calcTM(c, d, PM_base)).toFixed(4);
}

function showInter() {
    let a, b, c, d;
    if (type === 1) {
        a = 3.2;
        b = 1.05;
        c = 2.5;
        d = 0.38;
        }else if (type === 2) {
            a = 3;
            b = 1.12;
            c = 2.5;
            d = 0.35;
            }else if (type === 3) {
                a = 2.8;
                b = 1.2;
                c = 2.5;
                d = 0.32;
            }

    //calcPM_int
    let PM_int = EAF_int * (a * (Size ** b));
    document.getElementById('res_PM_int').innerHTML = PM_int.toFixed(4);
    //calcTM_int
    document.getElementById('res_TM_int').innerHTML = (calcTM(c, d, PM_int)).toFixed(4);
}

function calcTM(c, d, PM) {
    return c * (PM ** d);
}

function changeEAF_int() {
    const k_EAF = [
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
    for (let i = 0; i < 15; i++) {
        let j = Number((document.getElementById(`input_i${i + 1}`)).value);
        let buff = k_EAF[i][j - 1];
        document.getElementById(`i${i + 1}_text`).innerHTML = buff;
        EAF_int *= buff;
    }

    showInter();  //Updating calculate COCOMO Inter
}

//////////// COCOMO II  /////////////////////

// Global parametrs
let A, E, EAF_II, SCED, PMns;

function showII() {
    //calcPM_II
    let PM_II = EAF_II * A * (Size ** E);
    document.getElementById('res_PM_II').innerHTML = (PM_II).toFixed(4);

    //calcTM_II
    PMns = (EAF_II / SCED) * A * (Size ** E);
    let TM_II = SCED * 3.67 * (PMns ** (0.28 + (0.2 * (E - 0.91))));
    document.getElementById('res_TM_II').innerHTML = (TM_II).toFixed(4);
}

function choiseA() {
    let typeA = Number(document.getElementById('input_A').value);
    if (typeA === 1) {
        document.getElementById('A_text').innerHTML = "Предварительная оценка";
        document.getElementById('EAF_II_p').style.display = "inline";
        document.getElementById('EAF_II_d').style.display = "none";
        A = 2.94;
        changeEAF_II_p();
        }else if (typeA === 2) {
            document.getElementById('A_text').innerHTML = "Детальная оценка";
            document.getElementById('EAF_II_p').style.display = "none";
            document.getElementById('EAF_II_d').style.display = "inline";
            A = 2.45;
            changeEAF_II_d();
        }
    calcE();
    showII();   //Updating calculate
}

function changeEAF_II_p() {
    const k_EAF = [
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
        let j = Number((document.getElementById(`input_e${i + 1}`)).value);
        let buff = k_EAF[i] [j - 1];
        document.getElementById(`e${i + 1}_text`).innerHTML = buff;
        EAF_II *= buff;
    }

    SCED = k_EAF[6][Number((document.getElementById('input_e7')).value) - 1];
    document.getElementById('e7_text').innerHTML = SCED;
}

function changeEAF_II_d() {
    const k_EAF = [
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
        let j = Number((document.getElementById(`input_m${i + 1}`)).value);
        let buff = k_EAF[i] [j - 1];
        document.getElementById(`m${i + 1}_text`).innerHTML = buff;
        EAF_II *= buff;
    }

    SCED = k_EAF[16][(document.getElementById('input_m17')).value - 1];
    document.getElementById('m17_text').innerHTML = SCED;
}

function calcE() {
    E = 0.91 + 0.01 * getSF();
}

function getSF() {

    const kv = [
        [6.20, 4.96, 3.72, 2.48, 1.24, 0.00], //1
        [5.07, 4.05, 3.04, 2.03, 1.01, 0.00], //2
        [7.07, 5.65, 4.24, 2.83, 1.41, 0.00], //3
        [5.48, 4.38, 3.29, 2.19, 1.10, 0.00], //4
        [7.80, 6.24, 4.68, 3.12, 1.56, 0.00],  //5
    ];

    const k = [
        ['Опыт в продукте и платформе отсутствует',
            'Продукт и платформа не много знакомы',
            'Некоторый опыт в продукте и платформе пресутствует',
            'Продукт и платформа в основном известны',
            'Продукт и платформа в большей степени знакомы',
            'Продукт и платформа полностью знакомы'
        ],   //1
        ['Процесс сторого детерменирован',
            'Допускаются некоторые компромиссы',
            'Значительная жёсткость процесса',
            'Относительная жёсткость процесса',
            'Незначительная жёсткость процесса',
            'Определены только общие цели'],    //2
        ['Риски известны / проанализированы на 20%',
            'Риски известны / проанализированы на 40%',
            'Риски известны / проанализированы на 60%',
            'Риски известны / проанализированы на 75%',
            'Риски известны / проанализированы на 90%',
            'Риски известны / проанализированы на 100%'],   //3
        ['Формальные взаимодействия',
            'Тяжёлое взаимодействие до некоторой степени',
            'Чаще всего коллективная работа',
            'В основном коллективная работа',
            'Высокая степень взаимодействия',
            'Полное доверие, взаимозаменяемость и взаимопомощь'], //4
        ['СММ уровень 1. Процессы не предсказуемы',
            'СММ уровень 1. Процессы выполняются ad hoc',
            'СММ уровень 2. Установлены основные процессы',
            'СММ уровень 3. Процессы стандартизированы',
            'СММ уровень 4. Процессы управляемы',
            'СММ уровень 5. Постоянное улучшение процессов'],      //5
    ];

    let SF = 0;

    for (let i = 1; i < 6; i++) {
        let j = Number((document.getElementById(`input_SF_${i}`)).value);
        SF += kv[i-1][j-1];

        document.getElementById(`SF_${i}_output`).innerHTML = kv[i-1][j-1];
        document.getElementById(`SF_${i}_output_note`).innerHTML = k[i-1][j-1];
    }

    return SF;
}

//////////Init of calculations on the page
getSize();
