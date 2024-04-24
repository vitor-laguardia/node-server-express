const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'vitor',
    email: 'vitor@mail.com',
    phone: '123456789321',
    category_id: uuid(),
  },
];
class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }
}

module.exports = new ContactsRepository();
