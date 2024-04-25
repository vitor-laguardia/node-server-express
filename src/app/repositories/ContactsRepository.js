const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'vitor',
    email: 'vitor@mail.com',
    phone: '123456789321',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'leo',
    email: 'leo@mail.com',
    phone: '12343456789321',
    category_id: v4(),
  },
];
class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.id === id));
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find((contact) => contact.email === email));
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  create(name, phone, email, category_id) {
    return new Promise((resolve) => {
      const newClient = {
        id: v4(),
        name,
        phone,
        email,
        category_id,
      };
      contacts.push(newClient);
      resolve(newClient);
    });
  }
}

module.exports = new ContactsRepository();
