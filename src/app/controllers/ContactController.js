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

  async store(request, response) {
    const { name, phone, email, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response
        .status(400)
        .json({ error: 'This email is already in use' });
    }

    // we know exactly what properties do we have in request.body
    const contact = await ContactsRepository.create(
      name,
      phone,
      email,
      category_id,
    );
    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, phone, email, category_id } = request.body;

    const contactExists = await ContactsRepository.findByEmail(email);

    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response
        .status(400)
        .json({ error: 'This email is already in use' });
    }

    const contact = await ContactsRepository.update(
      id,
      name,
      phone,
      email,
      category_id,
    );

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);
    if (!contact) {
      return response.status(404).json({ error: 'User not found' });
    }
    await ContactsRepository.delete(id);
    // 204 No Content
    response.sendStatus(204);
  }
}
// D.P: Singleton --> 1 unic instance of this class is saved in cache.
module.exports = new ContactController();
