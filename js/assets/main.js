const studentsData = [
  {
    firstName: "Василий",
    lastName: "Петров",
    admissionYear: 2019,
    courseName: "Java",
  },
  {
    firstName: "Иван",
    lastName: "Иванов",
    admissionYear: 2018,
    courseName: "JavaScript",
  },
  {
    firstName: "Александр",
    lastName: "Федоров",
    admissionYear: 2017,
    courseName: "Python",
  },
  {
    firstName: "Николай",
    lastName: "Петров",
    admissionYear: 2019,
    courseName: "Android",
  },
];
class User {
  constructor(options) {
    this.firstName = options.firstName;
    this.lastName = options.lastName;
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Student extends User {
  constructor(options) {
    super(options);
    this.admissionYear = options.admissionYear;
    this.courseName = options.courseName;
  }
  get course() {
    return new Date().getFullYear() - this.admissionYear;
  }
}

class Students {
  constructor(data) {
    this.students = data.map(
      (item) => new Student({
          firstName: item.firstName,
          lastName: item.lastName,
          admissionYear: item.admissionYear,
          courseName: item.courseName,
        })
    );
  }
  getInfo() {
    this.students.sort((a, b) => a.course - b.course);
    console.log(
      this.students.map((item) => `${item.fullName} - ${item.courseName}, ${item.course} курс `)
    );
  }
}

const student = new Students(studentsData);
student.getInfo();