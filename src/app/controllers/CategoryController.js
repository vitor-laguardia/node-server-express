const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryCotroller {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  show() {}

  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create(name);
    response.json(category);
  }

  update() {}

  delete() {}
}

module.exports = new CategoryCotroller();
