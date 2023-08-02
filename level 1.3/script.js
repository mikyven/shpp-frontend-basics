function DataTable(config, data) {
    let parent = document.querySelector(config.parent)
    let table = document.createElement("table")
    let head = document.createElement("thead")
    let body = document.createElement("tbody")
    parent.appendChild(table)
    table.appendChild(head)
    table.appendChild(body)

    for (let i = 0; i < config.columns.length + 1; i++) {
        let th = document.createElement("th")
        i == 0 ? th.innerHTML = "№" : 
        th.innerHTML = config.columns[i - 1].title
        head.appendChild(th)
    }

    data.map(function (i) {
        let tr = document.createElement("tr")
        body.appendChild(tr)
        for (let j = 0; j < config.columns.length + 1; j++) {
            let td = document.createElement("td")
            tr.appendChild(td)
            if (j == 0) td.innerHTML = data.indexOf(i) + 1
            else {
                let values = []
                config.columns.map(i => values[config.columns.indexOf(i)] = i.value)
            }
        }
    })
}
 
const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ]
};
 
const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
];
 
DataTable(config1, users);