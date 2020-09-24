let data;
let dataList = [];

//Функции сортировки
function sortFirstName() {
    data.sort(function (a, b) {
        let nameA = a.name.firstName.toLowerCase(),
            nameB = b.name.firstName.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })

    render(data);
};

function sortLastName() {
    data.sort(function (a, b) {
        let nameA = a.name.lastName.toLowerCase(),
            nameB = b.name.lastName.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })
    render(data);
};

function sortAbout() {
    data.sort(function (a, b) {
        let nameA = a.about.toLowerCase(),
            nameB = b.about.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })
    render(data);
};

function sortEyeColor() {
    data.sort(function (a, b) {
        let nameA = a.eyeColor.toLowerCase(),
            nameB = b.eyeColor.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })
    render(data);
};

// Функция для отображения и скрытия текста About
function showAbout(eventer) {
    let moreText = document.getElementById("more" + String(eventer));
    let btnText = document.getElementById("myBtn" + String(eventer));
    let tr = document.getElementById(eventer)

    if (moreText.style.display != 'none') {
        btnText.innerHTML = '...';
        moreText.style.display = 'none';
    } else {
        btnText.innerHTML = '<br>(less)';
        moreText.style.display = 'inline';
    }
};


// Функция для редактирования данных в строке
function edit(num) {
    let tr = document.getElementById('tr' + num);
    let tds = tr.getElementsByTagName('td');
    let id = find(num);
    let dataStr = findDataFromId(id);
    for (let i = 0; i < 5; i++) {
        tds[i].style.display = 'none';
    };
    tr.innerHTML += '<tr> <td> <input class = "tdOther" type="text" id ="gettingFirstName" value =" ' + dataStr.name.firstName + '"/> </td> <td> <input class = "tdOther" type="text" id ="gettingLastName" value ="' + dataStr.name.lastName + '"/> </td> <td> <input class = "tdAbout" type="text" id ="gettingAbout" value ="' + dataStr.about + '"/> </td> <td> <input class = "tdOther" type="text" id ="gettingEyeColor" value ="' + dataStr.eyeColor + '"/> </td>  <input type="button" value ="Save" onclick = "save(' + num + ')"/>  </tr>';
};

// Функция для сохранения отредактированных данных
function save(num) {
    let idSave = find(num);
    let rawFile = new XMLHttpRequest();
    rawFile.open('GET', 'data1.json', false);
    rawFile.send(null);
    data = JSON.parse(rawFile.responseText);
    data.forEach(element => {
        if (element.id == idSave) {
            console.log('dahkfw');
            element.name.firstName = document.getElementById('gettingFirstName').value;
            element.name.lastName = document.getElementById('gettingLastName').value;
            element.about = document.getElementById('gettingAbout').value;
            element.eyeColor = document.getElementById('gettingEyeColor').value;
        }
    });
    let tr = document.getElementById('tr' + num);
    let tds = tr.getElementsByTagName('td');
    let id = find(num);
    let dataStr = findDataFromId(id);
    for (let i = 0; i < 4; i++) {
        tds[i].style.display = 'none';
    };

    render(data);
};


// Функция для поиска ID по порядковому номеру
function find(num) {
    return dataList[num];
};

// Функция для поиска данных в JSON по ID
function findDataFromId(id) {
    let value = '';
    data.forEach(element => {
        if (element.id == id) {
            value = element;
        }
    });
    return value;
};


// Функция для вывода данных из JSON
function render(data) {

    {
        let tr = '';
        let num = 0;
        let div = document.getElementById('tableBody')
        data.forEach(element => {

            let shortAboutStr = element.about;
            let sch = 0;
            for (let j = 0; j < 90; j++) {
                if (shortAboutStr[j] != ' ' && shortAboutStr[j + 1] == ' ') {
                    sch = j + 1;
                }
            }

            dataList[num] = element.id;
            tr += '<tr id="tr' + String(num) + '">';
            // tr += '<td>' + element.id + '</td>'
            tr += '<td  onclick = "javascript:edit(' + String(num) + ')"> ' + element.name.firstName + '</a> </td>';
            tr += '<td>' + element.name.lastName + '</td>';
            tr += '<td  class = "tdAbout" id="' + String(num) + '">' + element.about.slice(0, sch) + '<span id="more' + String(num) + '" style="display: none;">' + element.about.slice(sch) + "</span>" + '<a id="myBtn' + String(num) + '" href="javascript:showAbout(' + String(num) + ');">...</a></span></td>';
            tr += '<td align="center" style = "color:' + element.eyeColor + '">' + element.eyeColor + '</td> <td><input type="button" value ="Edit" onclick = "edit(' + String(num) + ')"/></td> ';
            tr += '</tr>';
            num += 1;
        });
        div.innerHTML = tr;

    }
};


window.onload = function () {
    var rawFile = new XMLHttpRequest();
    rawFile.open('GET', 'data1.json', false);
    rawFile.send(null);

    data = JSON.parse(rawFile.responseText);
    render(data);

};
