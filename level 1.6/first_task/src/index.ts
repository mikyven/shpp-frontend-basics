// 1. 

function getFirstWord(a: string) {
	return a.split(/ +/)[0].length;
}

// 2. 

function getUserNaming(a: {name: string, surname: string}) {
  return { 
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3. 

function getAllProductNames(a: {products: {name: string}[]}) {
  return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// function hey(a: {name: Function, cuteness?: number, coolness?: number}) {
//   return "hey! i'm " + a.name;
// }

// hey({name: () => "roman", cuteness: 100})
// hey({name: () => "vasyl", coolness: 100})

// 4.2

// class Cat {
//   name: Function
//   isCute: boolean
//   constructor (name: string, isCute: boolean) {
//     this.name = () => name
//     this.isCute =  isCute
//   }
// }

// class Dog {
//   name: Function
//   coolness: number
//   constructor (name: string, coolness: number) {
//     this.name = () => name
//     this.coolness = coolness
//   }
// }

// function hey(abstractPet: {name: Function, isCute?: boolean, coolness?: number}) {
//   return "hey! i'm " + abstractPet.name();
// }
// let a = new Cat("snizhok", true)
// let b = new Dog("sirko", 333)
// hey(a)
// hey(b)

//4.3

function hey(a: {name: Function, type: string, cuteness?: number, coolness?: number}) {
  return "hey! i'm " + a.name()
   + (a.type === "cat" ? (" cuteness: "+a.cuteness) : (" coolness: "+a.coolness))
}

hey({name: () => "snizhok", type: "cat", cuteness: 100})
hey({name: () => "sirko", type: "dog", coolness: 100})

// 5.

function stringEntries(a: object | string[] | number[] | object[]) {
  return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

async function world(a: number) {
  return "*".repeat(a)
}
const hello = async () => {
 return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))