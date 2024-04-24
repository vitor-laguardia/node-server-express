const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      // 404: not found
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(contact);
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
