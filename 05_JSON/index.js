
let userObj = {
    username: "ahaberer",
    grade: 100,
    password: "secr3t",
    isConnected: true,
    address: {
        country: "Israel",
        city: "Tzora",
        street: "Main St"
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 100, 95, 90, 85]
}

let newGrade = userObj.grade + 10;
userObj.grade += 10;
usedObj.id = 1000;

let usedObj2 = usedObj;
userObj2.grade += 10;
usedObj2.grade = 0;
let grade1 = usedObj.grade;

usedObj.address.street = "";
usedObj["address"].city = "Tel Aviv";

let arr = [usedObj, {
    username: "ahaberer",
    grade: 100,
    password: "secr3t",
    isConnected: true,
    address: {
        country: "Israel",
        city: "Tzora",
        street: "Main St"
    },
    allGrades: [{ csharp: 90 }, { cpp: 70 }, 100, 95, 90, 85]
}];

arr[0].allGrades[1] = { CPP: 90 };
arr[1].avg = 95;
let user2 = arr[1];
user2.password = "12345";