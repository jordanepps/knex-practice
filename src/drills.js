require('dotenv').config();
const knex = require('knex');
const ShoppingListServices = require('./shopping-list-service');

const knexInstance = knex({
	client: 'pg',
	connection: process.env.DB_URL
});
// function getItemsThatContain(searchTerm) {
//     knexInstance
//         .from('shopping_list')
//         .select('*')
//         .where('name', 'ILIKE', `%${searchTerm}%`)
//         .then(results => {
//             console.log(results)
//         })
// }

// getItemsThatContain('dogs');
// getItemsThatContain('a');

// function getItemsPaginated(pageNumber) {
//     const itemsPerPage = 6;
//     const offset = itemsPerPage * (pageNumber - 1);
//     knexInstance
//         .from('shopping_list')
//         .select('*')
//         .limit(itemsPerPage)
//         .offset(offset)
//         .then(results => {
//             console.log(results)
//         })

// }

// getItemsPaginated(1);
// getItemsPaginated(3);

// function getItemsAddedAfterDate(daysAgo) {
//     knexInstance
//         .from('shopping_list')
//         .select('*')
//         .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
//         .then(results => {
//             console.log(results)
//         })
// }

// getItemsAddedAfterDate(1);
// getItemsAddedAfterDate(5);

// function getTotalCostOfEachCategory() {
//     knexInstance
//         .from('shopping_list')
//         .select('category', knexInstance.raw('SUM(price)'))
//         .groupBy('category')
//         .then(results => {
//             console.log(results)
//         })

// }

// getTotalCostOfEachCategory();
