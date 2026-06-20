const prisma = require("../db/prisma");

const createOrder = async (req, res) => {
  try {
    const { customerName, phoneNumber, deliveryAddress, flavor, quantity } = req.body;

    if (!customerName || !phoneNumber || !deliveryAddress || !flavor || !quantity) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phoneNumber,
        deliveryAddress,
        flavor,
        quantity: Number(quantity)
      }
    });

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id: Number(id) }
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: { orderStatus }
    });

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};