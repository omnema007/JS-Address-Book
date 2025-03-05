class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!this.isValidName(firstName)) throw new Error("Invalid First Name");
        if (!this.isValidName(lastName)) throw new Error("Invalid Last Name");
        if (!this.isValidAddress(address)) throw new Error("Invalid Address");
        if (!this.isValidAddress(city)) throw new Error("Invalid City");
        if (!this.isValidAddress(state)) throw new Error("Invalid State");
        if (!this.isValidZip(zip)) throw new Error("Invalid Zip Code");
        if (!this.isValidPhone(phone)) throw new Error("Invalid Phone Number");
        if (!this.isValidEmail(email)) throw new Error("Invalid Email");

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    isValidName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    isValidAddress(value) {
        return value.length >= 4;
    }

    isValidZip(zip) {
        return /^[0-9]{5,6}$/.test(zip);
    }

    isValidPhone(phone) {
        return /^[0-9]{1,3} [0-9]{10}$/.test(phone);
    }

    isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
}

// Example Usage
try {
    let contact1 = new Contact("John", "Doe", "Street 123", "New York", "NY", "10001", "1 9876543210", "john.doe@example.com");
    console.log("Valid Contact:", contact1);
} catch (error) {
    console.error(error.message);
}

try {
    let contact2 = new Contact("jo", "smith", "St", "LA", "CA", "123", "98765", "invalid-email");
} catch (error) {
    console.error(error.message);
}
