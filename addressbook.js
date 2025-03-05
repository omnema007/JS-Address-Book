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


class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
    }

    editContact(name, updatedContact) {
        let contact = this.contacts.find(c => c.firstName === name);
        if (contact) {
            Object.assign(contact, updatedContact);
        } else {
            throw new Error("Contact not found.");
        }
    }

    deleteContact(name) {
        let initialLength = this.contacts.length;
        this.contacts = this.contacts.filter(contact => contact.firstName !== name);
        if (this.contacts.length === initialLength) {
            throw new Error("Contact not found.");
        }
    }

    getContactCount() {
        return this.contacts.reduce(count => count + 1, 0);
    }

    findDuplicate(contact) {
        let isDuplicate = this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName);
        if (isDuplicate) {
            throw new Error("Duplicate contact entry is not allowed.");
        }
        this.contacts.push(contact);
    }

    searchByCityOrState(location) {
        return this.contacts.filter(contact => contact.city === location || contact.state === location);
    }

    viewPersonsByCityOrState() {
        return this.contacts.reduce((result, contact) => {
            if (!result[contact.city]) result[contact.city] = [];
            if (!result[contact.state]) result[contact.state] = [];
            result[contact.city].push(contact);
            result[contact.state].push(contact);
            return result;
        }, {});
    }

    getCountByCityOrState() {
        return this.contacts.reduce((result, contact) => {
            result.cityCounts[contact.city] = (result.cityCounts[contact.city] || 0) + 1;
            result.stateCounts[contact.state] = (result.stateCounts[contact.state] || 0) + 1;
            return result;
        }, { cityCounts: {}, stateCounts: {} });
    }

    sortContactsByName() {
        this.contacts.sort((a, b) => (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName));
    }

    sortByCity() {
        this.contacts.sort((a, b) => a.city.localeCompare(b.city));
    }

    sortByState() {
        this.contacts.sort((a, b) => a.state.localeCompare(b.state));
    }

    sortByZip() {
        this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
    }

    printContacts() {
        this.contacts.forEach(contact => console.log(contact.toString()));
    }
}

let addressBook = new AddressBook();

let contact1 = new Contact("John", "Doe", "Street 123", "New York", "NY", "10001", "1 9876543210", "john.doe@example.com");
let contact2 = new Contact("Jane", "Smith", "Avenue 456", "Los Angeles", "CA", "90001", "1 9876543211", "jane.smith@example.com");
let contact3 = new Contact("Emily", "Clark", "Boulevard 789", "Chicago", "IL", "60601", "1 9876543212", "emily.clark@example.com");

addressBook.addContact(contact1);
addressBook.addContact(contact2);
addressBook.addContact(contact3);

console.log("Before Sorting:");
addressBook.printContacts();

addressBook.sortByCity();
console.log("\nSorted by City:");
addressBook.printContacts();

addressBook.sortByState();
console.log("\nSorted by State:");
addressBook.printContacts();

addressBook.sortByZip();
console.log("\nSorted by Zip:");
addressBook.printContacts();

