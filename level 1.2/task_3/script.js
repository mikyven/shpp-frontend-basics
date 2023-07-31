csvString = `48.30,32.16,Кропивницький,200000,
44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментаря :)`

function CSVGetter(csv, str) {
    function filterFunction(i) {
        if (i.split(",").length == 5
        &&  i.match(/[\wa-zA-Zа-яА-ЯіїІЇ0-9., ]/g).length == i.split("").length
        ) {
            return i
        }
    }
    
    function mapSplitSpliceFunction(i) {
        i = i.split(",")
        i.splice(-1)
        return i
    }

    function reduceFunction(total, current) {
        current = JSON.parse(
        `{"${current.name}": {"population":
        ${current.population}, \
        "rating":${Object.keys(current).length - Object.keys(total).length}}}`
        )
        return Object.assign(total, current)
    }

    function foo() {
        csv = csv.split("\n")
                 .filter(filterFunction)
                 .map(mapSplitSpliceFunction)
                 .map((i) => Object({
                     x: i[0], 
                     y: i[1], 
                     name: i[2], 
                     population: i[3]
                 }))
                 .sort((i, j) => +i.population < +j.population ? -1 : 1)
                 .slice(0, 10)
                 .reduce(reduceFunction, {})
        function checkStr(arr, obj, str) {
            if (arr.some(i => str.includes(i))) {
                return str.replace(arr[j], `${obj.name}(${obj.rating} місце в ТОП-10 найбільших міст, 
                    населення ${obj.population}) людина/людини/людей)`)
            }
            return str
        }

        console.log(checkStr(Object.keys(csv), csv, str))
    }

    return foo
}

CSVGetter(csvString, `Кропивницький - місто можливостей`)()