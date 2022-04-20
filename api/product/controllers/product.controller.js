const db = require('../../../config/sequelize');
const ProductModel = db.product;
const SizeModel = db.product_size;
const { Op } = db.Sequelize;

exports.list = async (req, res, next) => {
    ProductModel.hasMany(SizeModel, {foreignKey: 'product_id',sourceKey: 'id'});
    try {
        let limit = {};
        let offset = {};
        let category = {};
        let gender = {};
        let size = {};

        if(req.query.limit !== undefined && req.query.limit !== null && req.query.page !== undefined && req.query.page !== null) {
          limit = {
            limit: Number(req.query.limit)
          }

          const page = Number(req.query.page);
          offset = {
            offset: (page - 1) * Number(req.query.limit)
          }
        }

        if(req.query.category !== undefined && req.query.category !== null) {
            category = { category: req.query.category.replace('_',' ') }
        }
        if(req.query.gender !== undefined && req.query.gender !== null) {
            gender = { gender: req.query.gender }
        }
        if(req.query.size !== undefined && req.query.size !== null) {
            size = { size: req.query.size }
        }



        const { rows, count } = await ProductModel.findAndCountAll({
            distinct: true,
            attributes: {
                exclude: ['created_at', 'updated_at']
            },
            include: [
              {
                model: SizeModel,
                attributes: {
                    exclude: ['created_at', 'updated_at']
                },
                where: {
                    ...size
                }
              }
            ],
            where: {
                ...gender, ...category
            },
            order: [["id", "ASC"]],
            ...limit,
            ...offset
        })

        const resp = {
            data: rows,
            total: count,
            limit: req.query?.limit,
            page: req.query?.page,
        };
        res.json(resp);
    } catch (error) {
        next(error);
    }

    
}

exports.create = async (req, res, next) => {
    try {
        
        const saved = await FAQModel.create(req.body);
        res.json(saved);
    } catch (error) {
        console.error(error)
        next(error)
    }
    
}

exports.update = async (req, res, next) => {
    try {
        
        await FAQModel.update(req.body, { where: { id: req.params.id } });
        res.json({success: true});
    } catch (error) {
        console.error(error)
        next(error)
    }
}

exports.view = async (req, res, next) => {
    try {
        
        const result = await FAQModel.findOne({ where: { id: req.params.id } });
        res.json(result);
    } catch (error) {
        console.error(error)
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        const result = await FAQModel.findOne({ where: { id: req.params.id } });
        await result.destroy();
        res.json({success: true});
    } catch (error) {
        console.error(error)
        next(error)
    }
}

