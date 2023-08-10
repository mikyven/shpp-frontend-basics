function DataTable(config, data) {
    let parent = document.querySelector(config.parent)
    if (parent.children.length > 0) return
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
        i == 0 ? th.id = "number" : 
        th.id = config.columns[i - 1].value
        head.appendChild(th)
    }

    data.map(function (i) {
        let tr = document.createElement("tr")
        tr.id = i.id
        body.appendChild(tr)
        let td = document.createElement("td")
        td.innerHTML = data.indexOf(i) + 1
        td.id = "number"
        tr.appendChild(td)
        let filteredEntries = Object.entries(i)
        .filter(j => config.columns.some(k => k.value == j[0]) ? j : false)
        config.columns.map(function (k) {
            let td = document.createElement("td")
            tr.appendChild(td)
            filteredEntries[config.columns.indexOf(k)][0] == k.value ? 
            td.innerHTML = filteredEntries[config.columns.indexOf(k)][1] :
            td.innerHTML = undefined
            td.id = k.value
        })
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
 
DataTable(config1, users)