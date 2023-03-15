const { Op } = require('sequelize');
const { Product } = require("../models");
const { newResponse } = require("../utils/newResponse");

async function getProducts(req, res) {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const offset = (page - 1) * limit;

        const products = await Product.findAndCountAll({
            limit,
            offset
        });

        const totalProducts = products.count;
        const totalPages = Math.ceil(totalProducts / limit);

        const response = {
            products: products.rows,
            total: totalProducts,
            pages: {
                current: page,
                total: totalPages,
            }
        };

        return newResponse(res, 200, 'Products found', response);
    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

async function getProductsByQuery(req, res) {
    try {
        const { category, name } = req.query;

        if (name) {
            const products = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            })
            return newResponse(res, 200, 'Products found', products);
        }

        if (category) {
            const products = await Product.findAll({
                where: {
                    category: {
                        [Op.like]: `%${category}%`
                    }
                }
            })
            return newResponse(res, 200, 'Products found', products);
        }

        return newResponse(res, 404, 'Category/Product does not exist');
    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

module.exports = {
    getProducts,
    getProductsByQuery
}