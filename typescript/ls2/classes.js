"use strict";
class Department {
    constructor(n) {
        this.name = n;
    }
    description() {
        console.log("Department", this.name);
    }
}
const accounting = new Department("Accounting");
accounting.description();
