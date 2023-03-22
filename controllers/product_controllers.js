const { Op } = require("sequelize");
const { Product } = require("../models");
const { newResponse } = require("../utils/newResponse");
const { uploadFile } = require("../services/aws-s3");

async function getProducts(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        console.log(page, limit);

        const products = await Product.findAndCountAll({
            limit,
            offset
        });

        const totalProducts = products.count;
        const totalPages = Math.ceil(totalProducts / limit);

        const response = {
            total: totalProducts,
            products: products.rows,
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
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { category, name } = req.query || '';
        const query = name && name.length >= 1 ? name : category && category.length >= 1 ? category : '';

        if (query.length <= 0) return newResponse(res, 400, 'No search parameters have been sent')

        const products = await Product.findAndCountAll({
            limit,
            offset,
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${query}%` } },
                    { category: { [Op.like]: `%${query}%` } }
                ]
            }
        })

        const totalProducts = products.count;
        const totalPages = Math.ceil(totalProducts / limit);

        const response = {
            total: totalProducts,
            products: products.rows,
            pages: {
                current: page,
                total: totalPages,
            }
        };

        return response.total >= 1
            ? newResponse(res, 200, 'Products found', response)
            : newResponse(res, 404, 'Products not found')

    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

async function addProduct(req, res) {
    try {
        const { name, desc, SKU, category, price, discount_id } = req.body;
        const { image } = req.files;

        const findProduct = await Product.findOne({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: name } },
                    { SKU: { [Op.like]: SKU } }
                ]
            }
        })

        if (findProduct) return newResponse(res, 400, 'A product with this name or SKU already exists')

        const image_url = await uploadFile(image);

        const newProduct = await Product.create({
            name, desc, SKU, category, price,
            image: image_url, discount_id
        });

        return newResponse(res, 200, 'Product added', newProduct)

    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

module.exports = {
    getProducts,
    getProductsByQuery,
    addProduct
}