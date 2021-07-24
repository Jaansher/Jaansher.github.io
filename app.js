//Q.NO=1
console.log("Q.No=1")

var arr = [
{ name: 'juice',
  price: 50, 
  quantity: 3},
{ name: 'cookie', 
  price: 30, 
  quantity: 9 },
{ name: 'shirt', 
  price: 880, 
  quantity: 1 },
{ name: 'pen', 
  price: 100, 
  quantity: 2 }];

for (var i = 0; i < arr.length; i++) {
    var allItem =  arr[i].price * arr[i].quantity;
    console.log(arr[i].name + " price of each item " + arr[i].price + " price of all items " + arr[i].price * arr[i].quantity)
}

//Q.NO=2
console.log("Q.No=2")

var obj = {
    name: "nadir",
    email: "nadirxoxo@gmail.com",
    password:213124125,
    age:22,
    gender: "male",
    city: "karachi",
    country: "pakistan"
};
if ("age" in obj && "country" in obj) {
    console.log("age and country are available");
}
else if ("age" in obj){
    console.log("age is available");
}
else if ("country" in obj){
    console.log("country is available");
}
else {
    console.log("age and country are missing");
}

if ("firstName" in obj && "lastName" in obj) {
    console.log("firstName and lastName are available");
}
else if ("firstName" in obj){
    console.log("firstName is available");
}
else if ("lastName" in obj){
    console.log("lastName is available");
}
else {
    console.log("firstName and lastName are missing");
}

//Q.NO=3
console.log("Q.No=3")

function Student(name,age,rollNo){
    this.name = name
    this.age = age
    this.rollNo = rollNo
}
Student.prototype.course = "Web And App" ;
var jaansher = new Student("Jaansher",19,20736);
var nadir = new Student("Nadir",22,20553);
var usman = new Student("Usman",20,20266);
var khizer = new Student("Khizer",21,20215);
console.log(jaansher,nadir,usman,khizer);

//Q.NO=4
console.log("Q.No=4")

function AreaData(name,gender,address,education,profession){
    this.name = name
    this.gender = gender
    this.address = address
    this.education = education
    this.profession = profession
}

var person1 = new AreaData("Jaansher","male","Malir","Matric","programming");
var person2 = new AreaData("Khizer","male","saddar","intermediate","Bank Manager");
var person3 = new AreaData("fatima","female","quaidabad","mbbs","doctor");
localStorage.setItem("population",person1.profession)
console.log(person2)
console.log(person3.address)
console.log(localStorage.getItem("population"));
