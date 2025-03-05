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
}

