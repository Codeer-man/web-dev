class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  description() {
    console.log("Department", this.name);
  }
}

const accounting = new Department("Accounting");
accounting.description();
