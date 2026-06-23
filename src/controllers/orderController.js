const prisma = require("../db/prisma");
const sendEmail = require("../utils/sendEmail");

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      phoneNumber,
      deliveryAddress,
      flavor,
      quantity,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !phoneNumber ||
      !deliveryAddress ||
      !flavor ||
      !quantity
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        phoneNumber,
        deliveryAddress,
        flavor,
        quantity: Number(quantity),
        orderStatus: "Pending",
      },
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      customerName,
      customerEmail,
      phoneNumber,
      deliveryAddress,
      flavor,
      quantity,
      orderStatus,
    } = req.body;

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    const order = await prisma.order.update({
      where: {
        id: Number(id),
      },
      data: {
        customerName,
        customerEmail,
        phoneNumber,
        deliveryAddress,
        flavor,
        quantity: Number(quantity),
        orderStatus,
      },
    });

    if (
      customerEmail &&
      existingOrder.orderStatus !== orderStatus &&
      (orderStatus === "Ready" || orderStatus === "Completed")
    ) {
      await sendEmail({
        to: customerEmail,
        subject: "Your Alitas Express Order Is Ready!",
        html: `
          <h2>Your order is ready!</h2>

          <p>Hello ${customerName},</p>

          <p>Your order has been marked as <strong>${orderStatus}</strong>.</p>

          <ul>
            <li><strong>Flavor:</strong> ${flavor}</li>
            <li><strong>Quantity:</strong> ${quantity}</li>
          </ul>

          <p>Thank you for choosing Alitas Express!</p>
        `,
      });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.order.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};