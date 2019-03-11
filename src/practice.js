require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
	client: 'pg',
	connection: process.env.DB_URL
});

const searchTerm = 'holo';

function getProductsBySearchTerm(term) {
	knexInstance
		.from('amazong_products')
		.select('product_id', 'name', 'price', 'category')
		.where('name', 'ILIKE', `%${term}%`)
		.then(result => {
			console.log(result);
		});
}

// getProductsBySearchTerm(searchTerm);

function paginateProducts(page) {
	const productsPerPage = 10;
	const offset = productsPerPage * (page - 1);
	knexInstance
		.select('product_id', 'name', 'price', 'category')
		.from('amazong_products')
		.limit(productsPerPage)
		.offset(offset)
		.then(result => {
			console.log(result);
		});
}

// paginateProducts(1);

function getProductsWithImages() {
	knexInstance
		.select('product_id', 'name', 'price', 'category', 'image')
		.from('amazong_products')
		.whereNotNull('image')
		.then(result => {
			console.log(result);
		});
}

getProductsWithImages();
