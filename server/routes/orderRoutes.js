import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { admin, protectRoute } from '../middleware/authMiddleware.js';

const orderRoutes = express.Router();

const getOrders = async (req, res) => {
	const orders = await Order.find({});
	res.json(orders);
};

const deleteOrder = asyncHandler(async (req, res) => {
	const order = await Order.findByIdAndDelete(req.params.id);

	if (order) {
		res.json(order);
	} else {
		res.status(404).send('No se pudo encontrar el pedido.');
		throw new Error('No se pudo encontrar el pedido.');
	}
});

const setDelivered = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404).send('No se pudo actualizar el pedido.');
		throw new Error('No se pudo actualizar el pedido.');
	}
});

orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);
orderRoutes.route('/:id').put(protectRoute, admin, setDelivered);
orderRoutes.route('/').get(protectRoute, admin, getOrders);

export default orderRoutes;