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
        if (parent.children.length > 0) parent.innerHTML = ""
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

            th.innerHTML = i == 0 ? "№" : 
            config.columns[i - 1].title

            th.id = i == 0 ? "number" : 
            config.columns[i - 1].value
            head.appendChild(th)
        }

        data.map(function (i, iIndex) {
            let tr = document.createElement("tr")
            tr.id = numData[iIndex]
            body.appendChild(tr)
            let td = document.createElement("td")
            td.innerHTML = numData[iIndex]
            td.id = "number"
            tr.appendChild(td)

            let sortedAndFilteredEntries = Object.entries(i)
                .filter(j => config.columns.some(k => k.value == j[0] ? true : false))

            sortedAndFilteredEntries
                .forEach((j, jIndex) => config.columns.forEach(function (k, kIndex) {
                if (j[0] == k.value &&
                !(jIndex == kIndex)) {
                    let b = sortedAndFilteredEntries[jIndex]
                    sortedAndFilteredEntries[jIndex] = sortedAndFilteredEntries[kIndex]
                    sortedAndFilteredEntries[kIndex] = b
                    }
                }))

            if (sortedAndFilteredEntries.length != config.columns.length)
                config.columns.forEach((j, jIndex) =>
                    sortedAndFilteredEntries[jIndex] ?
                    true : 
                    sortedAndFilteredEntries[jIndex] = ''
                )

            config.columns.forEach(function (k, kIndex) {
                let td = document.createElement("td")
                tr.appendChild(td)
                sortedAndFilteredEntries[kIndex][0] == k.value ? 
                td.innerHTML = sortedAndFilteredEntries[kIndex][1] :
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

        data.forEach(function (i, iIndex) {
            let trArray = Array.from(document.querySelectorAll(`#${parent.id} > table > tbody > tr`))
            let td = document.createElement("td")
            td.id = "delete"
            let button = document.createElement("button")
            button.innerHTML = "Видалити"
            trArray[iIndex].appendChild(td)
            td.appendChild(button)

            let userId = trArray[iIndex].id

            button.onclick = function() {deleteUser(userId)}
        })

        addBtn.onclick = () => {
            let addedTr = document.createElement("tr")
            addedTr.appendChild(document.createElement("td"))
            body.appendChild(addedTr)
            body.insertBefore(addedTr, body.firstChild)
            let inputArr = []
            let inputObj = {}

            config.columns.forEach(function (i, iIndex) {
                let td = document.createElement("td")
                let input = document.createElement("input")
                input.id = i.value
                td.appendChild(input)
                inputArr[iIndex] = input
                addedTr.appendChild(td)
            })

            inputArr.forEach(function (inp) {
                inp.onkeydown = (e) => {
                    if (e.key === "Enter" && inp.value) {
                        !inputArr.map(i => {
                            i.style.boxShadow = i.value ? "0 0 3px black" : "0 0 3px red"
                            i.value ? true : false
                        }).includes(false) && 
                        inputArr.forEach((i) => {
                            Object.assign(inputObj, {[i.id]: i.value})
                            if (Object.entries(inputObj).length === config.columns.length) {
                                fetch(config.apiUrl, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json;charset=UTF-8'
                                    },
                                    body: JSON.stringify(inputObj)
                                })
                                    .then(() => location.reload())
                            }
                        })
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