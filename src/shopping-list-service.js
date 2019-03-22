const ShoppingListServices = {
	getAllItems(knex) {
		return knex('shopping_list').select('*');
	},
	getById(knex, id) {
		return knex('shopping_list')
			.select('*')
			.where({ id })
			.first();
	},
	insertItem(knex, newItem) {
		return knex('shopping_list')
			.insert(newItem)
			.returning('*')
			.then(rows => {
				return rows[0];
			});
	},
	updateItem(knex, id, newItemFields) {
		return knex('shopping_list')
			.where({ id })
			.update(newItemFields);
	},
	deleteItem(knex, id) {
		return knex('shopping_list')
			.where({ id })
			.delete();
	}
};

module.exports = ShoppingListServices;
