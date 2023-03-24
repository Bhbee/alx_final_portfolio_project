//mongoose models
const Order = require('../models/Order')
const Customer = require('../models/Customer')
const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLEnumType,
    GraphQLNonNull} = require('graphql')

//Customer type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        phone_number: {type: GraphQLString}
    })
})

//Order type
const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        initial_delivery_date: {type: GraphQLString},
        final_delivery_date: {type: GraphQLString},
        delivery_address: {type: GraphQLString},
        customer: {
            type: CustomerType,
            resolve(parent, args){
                return Customer.findById(parent.customerId)
            }
        }
    })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parent, args){
                return Customer.find()
            }
        },
        customer:{
            type: CustomerType,
            args: { id :{type: GraphQLID}},
            resolve(parent, args){
                return Customer.findById(args.id)
            }
        },
        orders:{
            type: new GraphQLList(OrderType),
            resolve(parent, args){
                return Order.find()
            }
        },
        order:{
            type: OrderType,
            args: { id :{type: GraphQLID}},
            resolve(parent, args){
                return Order.findById(args.id)
            }
        }
    }
})

//Mutations
const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        //add a customer
        addCustomer:{
            type: CustomerType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                phone_number: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                const customer = new Customer({
                    name: args.name,
                    phone_number: args.phone_number
                })
                return customer.save()
            }
        },

        //delete a customer
        deleteCustomer:{
            type: CustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                Order.find({ customerId: args.id }).then((orders) => {
                    orders.forEach((order) => {
                        order.deleteOne();
                    });
                });
                return Customer.findByIdAndDelete(args.id)
            }

        },

        //update customers details
        updateCustomer:{
            type: CustomerType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                phone_number: {type: GraphQLString},
            },
            resolve(parent, args){
                return Order.findByIdAndUpdate(
                    args.id, {
                        $set: {
                            name: args.name,
                            phone_number: args.phone_number,
                        }
                    },
                    {new: true}
                )
            }
        },

        //add an order
        addOrder:{
            type: OrderType,
            args:{
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                delivery_address: {type: new GraphQLNonNull(GraphQLString)},
                initial_delivery_date: {type: new GraphQLNonNull(GraphQLString)},
                final_delivery_date: {type: new GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'DeliveryStatus',
                        values: {
                            new: {value: 'Not Delivered'},
                            progress: {value: 'Delivery in progress'},
                            delivered: {value: 'Delivered'}
                        }
                    }),
                    defaultValue: 'Not Delivered'
                },
                customerId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                const order = new Order({
                    title: args.title,
                    description: args.description,
                    delivery_address: args.delivery_address,
                    initial_delivery_date: args.initial_delivery_date,
                    final_delivery_date: args.final_delivery_date,
                    customerId: args.customerId,
                    status: args.status

                })
                return order.save()
            }
        },

         //delete an order
        deleteOrder:{
            type:OrderType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Order.findByIdAndDelete(args.id)
            }
        },

        //update order details
        updateOrder:{
            type: OrderType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                delivery_address: {type: GraphQLString}, 
                final_delivery_date: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'DeliveryStatusUpdate',
                        values: {
                            new: {value: 'Not Delivered'},
                            progress: {value: 'Delivery in progress'},
                            delivered: {value: 'Delivered'}
                        }
                    }),
                },
            },
            resolve(parent, args){
                return Order.findByIdAndUpdate(
                    args.id, {
                        $set: {
                            title: args.title,
                            description: args.description,
                            delivery_address: args.delivery_address,                    
                            final_delivery_date: args.final_delivery_date,
                            status: args.status
                        }
                    },
                    {new: true}
                )
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})