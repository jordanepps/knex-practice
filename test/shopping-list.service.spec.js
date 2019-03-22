const ShoppingListServices = require('../src/shopping-list-service');
const knex = require('knex');

describe('Items service object', () => {
	let db;

	let testItems = [
		{
			id: 1,
			name: 'Fish Tricks',
			price: '13.10',
			date_added: new Date('2029-01-22T16:28:32.615Z'),
			checked: false,
			category: 'Main'
		},
		{
			id: 2,
			name: 'Not Dogs',
			price: '4.99',
			date_added: new Date('2100-05-22T16:28:32.615Z'),
			checked: true,
			category: 'Snack'
		},
		{
			id: 3,
			name: 'Bluffalo Wings',
			price: '5.50',
			date_added: new Date('1919-12-22T16:28:32.615Z'),
			checked: false,
			category: 'Snack'
		}
	];

	before(() => {
		db = knex({
			client: 'pg',
			connection: process.env.TEST_DB_URL
		});
	});

	before(() => {
		return db.into('shopping_list').insert(testItems);
	});

	before(() => db('shopping_list').truncate());

	afterEach(() => db('shopping_list').truncate());

	after(() => db.destroy());

	context(`Given 'shopping_list' has data`, () => {
		beforeEach(() => {
			return db.into('shopping_list').insert(testItems);
		});

		it(`getAllItems resolves all items from 'shopping_list' table`, () => {
			return ShoppingListServices.getAllItems(db).then(actual => {
				expect(actual).to.eql(testItems);
			});
		});

		it(`getById() resleves an article by id from 'shopping_list' table`, () => {
			const thirdId = 3;
			const thirdTestItem = testItems[thirdId - 1];
			return ShoppingListServices.getById(db, thirdId).then(actual => {
				expect(actual).to.eql({
					id: thirdId,
					name: thirdTestItem.name,
					price: thirdTestItem.price,
					date_added: thirdTestItem.date_added,
					checked: thirdTestItem.checked,
					category: thirdTestItem.category
				});
			});
		});

		it(`updateItem() updates an item from the 'shopping_list' table`, () => {
			const idOfItemToUpdate = 3;
			const newItemData = {
				name: 'update title',
				price: '1.99',
				date_added: new Date(),
				checked: true,
				category: 'Main'
			};
			return ShoppingListServices.updateItem(db, idOfItemToUpdate, newItemData)
				.then(() => ShoppingListServices.getById(db, idOfItemToUpdate))
				.then(item => {
					expect(item).to.eql({ id: idOfItemToUpdate, ...newItemData });
				});
		});

		it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
			const itemId = 3;
			return ShoppingListServices.deleteItem(db, itemId)
				.then(() => ShoppingListServices.getAllItems(db))
				.then(allItems => {
					const expected = testItems.filter(item => item.id !== itemId);
					expect(allItems).to.eql(expected);
				});
		});
	});

	context(`Given 'shopping_list' has no data`, () => {
		it(`getAllItems() resolves an empty array`, () => {
			return ShoppingListServices.getAllItems(db).then(actual => {
				expect(actual).to.eql([]);
			});
		});

		it(`insertItems() insers a new item and resolves the new item with an 'id'`, () => {
			const newItem = {
				name: 'Test new item',
				price: '1.99',
				date_added: new Date('2020-01-01T00:00:00.000Z'),
				checked: false,
				category: 'Main'
			};
			return ShoppingListServices.insertItem(db, newItem).then(actual => {
				const { name, price, date_added, checked, category } = newItem;
				expect(actual).to.eql({
					id: 1,
					name,
					price,
					date_added,
					checked,
					category
				});
			});
		});
	});
});
