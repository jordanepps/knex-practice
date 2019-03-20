require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

function getItemsThatContain(searchTerm) {
    knexInstance
        .from('shopping_list')
        .select('*')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(results => {
            console.log(results)
        })
}

// getItemsThatContain('dogs');
// getItemsThatContain('a');

function getItemsPaginated(pageNumber) {
    const itemsPerPage = 6;
    const offset = itemsPerPage * (pageNumber - 1);
    knexInstance
        .from('shopping_list')
        .select('*')
        .limit(itemsPerPage)
        .offset(offset)
        .then(results => {
            console.log(results)
        })

}

// getItemsPaginated(1);
// getItemsPaginated(3);

function getItemsAddedAfterDate(daysAgo) {
    knexInstance
        .from('shopping_list')
        .select('*')
        .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(results => {
            console.log(results)
        })
}

// getItemsAddedAfterDate(1);
// getItemsAddedAfterDate(5);

function getTotalCostOfEachCategory() {
    knexInstance
        .from('shopping_list')
        .select('category', knexInstance.raw('SUM(price)'))
        .groupBy('category')
        .then(results => {
            console.log(results)
        })


}

// getTotalCostOfEachCategory();

function costPerCategory() {
    knexInstance
        .select('category')
        .count('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('COST PER CATEGORY')
            console.log(result)
        })
}

costPerCategory();