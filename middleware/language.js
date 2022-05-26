
// function Language(language) {
//       if (language == 'Arabic') {
//             return  true;
//       } else {
//             return  false;
//       }
// }

// module.exports.Language = Language;
module.exports= class Person {
	constructor({name:name, age:age}) {
		this.name = name;
		this.age = age;
	}
	introduction() {
		return `My name is ${this.name} and I am ${this.age} years old!`;
	}
}
