const db = require('../../../config/sequelize');
const Order = db.order;
const OrderList = db.order_list;
const { Op } = db.Sequelize;
const SizeModel = db.product_size;

exports.list = async (req, res, next) => {
    Order.hasMany(OrderList, {foreignKey: 'order_id',sourceKey: 'id'});
    OrderList.hasOne(SizeModel, {foreignKey: 'id',sourceKey: 'product_size_id'});

  
    try {
        let limit = {};
        let offset = {};
        let search = {};
        let paid_date = {};
        let status = {};
        
        
        if(req.query.limit !== undefined && req.query.limit !== null && req.query.page !== undefined && req.query.page !== null) {
          limit = {
            limit: Number(req.query.limit)
          }

          const page = Number(req.query.page);
          offset = {
            offset: (page - 1) * Number(req.query.limit)
          }
        }

        if(req.query.start !== undefined && req.query.start !== null && req.query.stop !== undefined && req.query.stop !== null) {
            paid_date = {
                
                    paid_date: {
                        [Op.between]: [req.query.start, req.query.stop]
                    }
                
            };
            console.log(req.query.start, req.query.stop)
          }

          if(req.query.status !== undefined && req.query.status !== null ) {
            status = {
                status: req.query.status.replace('_',' ')
            }
          }



        const { rows, count } = await Order.findAndCountAll({
            distinct: true,
            
            where: {...search, ...paid_date, ...status},
            include: [
              {
                model: OrderList,
                include: [
                    {
                      model: SizeModel,
                      
                    }
                  ],
                
              }
            ],
            order: [["updated_at", "DESC"], ["created_at", "DESC"]],
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
        let total = 0
        const orderList =  JSON.parse(req.body.order_list)
        orderList.map(item=>{
            total += item.priceL * item.qty
        })
        const saved = await Order.create({
            total_price: total,
            paid_date: null,
            status: 'not paid',
            address: req.body.address,
        });
        await Promise.all([
        orderList.map(item=>{
             OrderList.create({
                product_size_id: item.product_size_id,
                order_id: saved.id,
                qty: item.qty,
            })
        })])
        res.json(saved);
    } catch (error) {
        console.error(error)
        next(error)
    }
    
}


