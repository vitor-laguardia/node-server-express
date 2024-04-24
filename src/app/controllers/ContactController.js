const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    // list all registers
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  show() {
    // get one register
  }

  store() {
    // create new register
  }

  update() {
    // edit a register
  }

  delete() {
    // delete a register
  }
}
// D.P: Singleton --> 1 unic instance of this class is saved in cache.
module.exports = new ContactController();
