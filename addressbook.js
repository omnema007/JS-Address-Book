class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }
}


let contact1 = new Contact("John", "Doe", "Street 123", "New York", "NY", "10001", "1 9876543210", "john.doe@example.com");
console.log("Contact Created:", contact1);
