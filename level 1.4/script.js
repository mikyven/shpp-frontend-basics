function DataTable(config, data) {
    if (!data) {
        fetch(config.apiUrl)
        .then(response => response.json())
        .then(promiseData => DataTable(config, promiseData.data))
    }
    else {
        let numData = Object.keys(data)
        data = Object.values(data)
        let parent = document.querySelector(config.parent)
        if (parent.children.length > 0) return
        let addBtn = document.createElement("button")
        addBtn.id = "add"
        addBtn.innerHTML = "Додати"
        let table = document.createElement("table")
        let head = document.createElement("thead")
        let body = document.createElement("tbody")
        parent.appendChild(addBtn)
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
            tr.id = numData[data.indexOf(i)]
            body.appendChild(tr)
            let td = document.createElement("td")
            td.innerHTML = numData[data.indexOf(i)]
            td.id = "number"
            tr.appendChild(td)
            let sortedAndFilteredEntries = Object.entries(i)
            .filter(j => config.columns.some(k => k.value == j[0] ? true : false))
            sortedAndFilteredEntries
            .map(j => config.columns.map(function (k) {
                if (j[0] == k.value && 
                !(sortedAndFilteredEntries.indexOf(j) ==
                config.columns.indexOf(k))) {
                    let a = sortedAndFilteredEntries[config.columns.indexOf(k)]
                    let b = sortedAndFilteredEntries[sortedAndFilteredEntries.indexOf(j)]
                    sortedAndFilteredEntries[sortedAndFilteredEntries.indexOf(j)] = a
                    sortedAndFilteredEntries[config.columns.indexOf(k)] = b
                }
            }))
            if (sortedAndFilteredEntries.length != config.columns.length)
            config.columns.map(j =>
            sortedAndFilteredEntries[config.columns.indexOf(j)] ?
            true : 
            sortedAndFilteredEntries[config.columns.indexOf(j)] = '')

            config.columns.map(function (k) {
                let td = document.createElement("td")
                tr.appendChild(td)
                sortedAndFilteredEntries[config.columns.indexOf(k)][0] == k.value ? 
                td.innerHTML = sortedAndFilteredEntries[config.columns.indexOf(k)][1] :
                td.innerHTML = undefined
                td.id = k.value
            })
        })

        let th = document.createElement("th")
        th.innerHTML = "Дії"
        head.appendChild(th)

        function deleteUser(userId) {
            fetch(`${config.apiUrl}/${userId}`, {
                    method: "DELETE"
            })
            .then(() => location.reload())
        }

        data.map(function (i) {
            let trArray = Array.from(document.querySelectorAll(`#${parent.id} > table > tbody > tr`))
            let td = document.createElement("td")
            td.id = "delete"
            let button = document.createElement("button")
            button.innerHTML = "Видалити"
            trArray[data.indexOf(i)].appendChild(td)
            td.appendChild(button)
            let userId = trArray[data.indexOf(i)].id
            button.onclick = function() {deleteUser(userId)}
        })

        // console.log(data[0])
        addBtn.onclick = () => {
            let addedTr = document.createElement("tr")
            addedTr.appendChild(document.createElement("td"))
            body.appendChild(addedTr)
            body.insertBefore(addedTr, body.firstChild)
            let inputArr = []
            let inputObj = {}

            config.columns.map(function (i) {
                let td = document.createElement("td")
                let input = document.createElement("input")
                input.id = i.value
                td.appendChild(input)
                inputArr[config.columns.indexOf(i)] = input
                addedTr.appendChild(td)
            })

            inputArr.map(function (inp) {
                inp.onkeydown = (e) => {
                    if (e.key === "Enter" && inp.value) {
                        !inputArr.map(i => {
                            if (i.value) {
                                i.style.boxShadow = "0 0 3px black"
                                return true
                            }
                            else {
                                i.style.boxShadow = "0 0 3px red"
                                return false
                            }
                        }).includes(false) && inputArr.map((i) => {
                                Object.assign(inputObj, JSON.parse(`"${i.id}": "${i.value}"`))
                                console.log(inputObj)
                            }
                        )
                    }
                }
            })
        }
    }
}
 
const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Аватар', value: 'avatar'},
        {title: 'День Народження', value: 'birthday'}
    ],
    apiUrl: "https://mock-api.shpp.me/spryadun/users"
};

 
const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
];
 
DataTable(config1)