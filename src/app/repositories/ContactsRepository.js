const { request } = require('express');
const { v4 } = require('uuid');
const db = require('../../database');

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
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(
      `SELECT * FROM contacts ORDER BY name ${direction}`,
    );
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [
      email,
    ]);
    return row;
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  async create(name, phone, email, category_id) {
    const [row] = await db.query(
      `INSERT INTO contacts(name, email, phone, category_id)
       VALUES($1, $2, $3, $4)
      RETURNING *`,
      [name, email, phone, category_id],
    );
    return row;
  }

  async update(id, name, phone, email, category_id) {
    const [row] = await db.query(
      `
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *`,
      [name, email, phone, category_id, id],
    );
    return row;
  }
}

module.exports = new ContactsRepository();
