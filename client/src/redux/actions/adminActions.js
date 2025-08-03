import axios from 'axios';
import {
	getUsers,
	userDelete,
	resetError,
	setError,
	setLoading,
	orderDelete,
	setDeliveredFlag,
	getOrders,
} from '../slices/admin';
import { setProducts, setProductUpdateFlag, setReviewRemovalFlag } from '../slices/product';

export const getAllUsers = () => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.get('api/users', config);
		dispatch(getUsers(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible encontrar los usuarios.'
			)
		);
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.delete(`api/users/${id}`, config);
		dispatch(userDelete(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible encontrar los usuarios.'
			)
		);
	}
};

export const getAllOrders = () => async (dispatch, getState) => {
	dispatch(setLoading(true));
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.get('api/orders', config);
		dispatch(getOrders(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible encontrar el pedido.'
			)
		);
	}
};

export const deleteOrder = (id) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.delete(`api/orders/${id}`, config);
		dispatch(orderDelete(data));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible remover pedido.'
			)
		);
	}
};

export const setDelivered = (id) => async (dispatch, getState) => {
	dispatch(setLoading(true));
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		await axios.put(`api/orders/${id}`, {}, config);
		dispatch(setDeliveredFlag());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible actualizar el pedido.'
			)
		);
	}
};

export const resetErrorAndRemoval = () => async (dispatch) => {
	dispatch(resetError());
};

export const updateProduct =
	(brand, name, category, stock, price, id, productIsNew, description) => async (dispatch, getState) => {
		const {
			user: { userInfo },
		} = getState();

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${userInfo.token}`,
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.put(
				`api/products`,
				{					
					name,
					category,
					stock,
					price,
					id,
					productIsNew,
					description,
				},
				config
			);
			dispatch(setProducts(data));
			dispatch(setProductUpdateFlag());
		} catch (error) {
			dispatch(
				setError(
					error.response && error.response.data.message
						? error.response.data.message
						: error.message
						? error.message
						: 'No fue posible actualizar el producto.'
				)
			);
		}
	};

export const deleteProduct = (id) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.delete(`api/products/${id}`, config);
		dispatch(setProducts(data));
		dispatch(setProductUpdateFlag());
		dispatch(resetError());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible remover el producto.'
			)
		);
	}
};

export const uploadProduct = (newProduct) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(`api/products`, newProduct, config);
		dispatch(setProducts(data));
		dispatch(setProductUpdateFlag());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible actulizar el producto.'
			)
		);
	}
};

export const removeReview = (productId, reviewId) => async (dispatch, getState) => {
	const {
		user: { userInfo },
	} = getState();

	try {
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.put(`api/products/${productId}/${reviewId}`, {}, config);
		console.log(data);
		dispatch(setProducts(data));
		dispatch(setReviewRemovalFlag());
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
					? error.message
					: 'No fue posible remover la reseña.'
			)
		);
	}
};