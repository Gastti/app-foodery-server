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

async function getProductById(req, res) {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt']
            }
        });
        if (!product) return newResponse(res, 404, 'Product not found');

        return newResponse(res, 200, 'Product found', product);
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

async function getPopularProducts(req, res) {
    try {
        const products = await Product.findAll({
            limit: 9,
            order: [
                ['total_sold', 'DESC']
            ]
        })

        return newResponse(res, 200, 'Products found', products);
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

async function editProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, desc, SKU, category, price, discount_id } = req.body;
        const image = req.files ? req.files.image : null;

        const product = await Product.findByPk(id);

        if (!product) {
            return newResponse(res, 400, 'This product does not exist')
        }

        const compareProduct = await Product.findOne({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: name } },
                    { SKU: { [Op.like]: SKU } }
                ]
            }
        })

        if (compareProduct && compareProduct.id != id) {
            return newResponse(res, 400, 'A product with this name or SKU already exists')
        }

        product.name = name || product.name;
        product.desc = desc || product.desc;
        product.SKU = SKU || product.SKU;
        product.category = category || product.category;
        product.price = price || product.price;
        product.discount_id = discount_id || product.discount_id;
        product.image = image ? await uploadFile(image) : product.image;

        product.save();

        return newResponse(res, 200, 'Product updated.')
    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const { harddelete } = req.query;

        const product = await Product.findOne({ where: { id } });

        if (!product) {
            return newResponse(res, 400, 'This product does not exist');
        }

        if (harddelete) {
            await product.destroy({ force: true });
            return newResponse(res, 200, 'Product has been hard deleted');
        }

        await product.destroy();
        await product.save();

        return newResponse(res, 200, 'Product has been soft deleted');
    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

async function restoreProduct(req, res) {
    try {
        const { id } = req.params;
        const product = await Product.restore({ where: { id } });

        if (!product) return newResponse(res, 400, 'This product does not exist');

        return newResponse(res, 200, 'Product restored')
    } catch (error) {
        console.log(error);
        return newResponse(res, 500, 'Server side error');
    }
}

module.exports = {
    getProducts,
    getProductById,
    getProductsByQuery,
    getPopularProducts,
    addProduct,
    editProduct,
    deleteProduct,
    restoreProduct
}