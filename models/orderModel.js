import Order from '../schemas/orderSchema.js'
import Product from '../schemas/productsSchema.js'


export const getOrders = async (req, res) => {
    try {
        
        // Hitta alla ordrar för den aktuella användaren och populera produkterna i varje order
        const order = await Order.find({ user: req.userId }).populate('products.product')
        
        // Om inga ordrar hittades, skicka en felmeddelande och statuskod 500
        if (!order) {
            res.status(500)
            throw new Error('Kunde inte hitta några ordrar')
        }

        res.status(200).json(order)
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { products } = req.body

        // Kontrollera om produkter finns i förfrågan
        if (!products) {
            res.status(400);
            throw new Error('Vänligen ange giltiga produkter')
        }

        let totalPrice = 0;
        let orderProducts = []

        // Loopa igenom varje produkt och hämta produktinformation från databasen
        for (const { productId, quantity } of products) {
            const productDetails = await Product.findById(productId)
            // Om produkten inte hittas, skicka ett felmeddelande och statuskod 404
            if (!productDetails) {
                res.status(404)
                throw new Error(`Produkten med ID ${productId} hittades inte`)
            }
            totalPrice += productDetails.price * quantity;
            orderProducts.push({ product: productId, quantity })
        }

        // Skapa en ny order och spara den i databasen
        const order = new Order({
            user: req.userId, 
            totalPrice: totalPrice,
            products: orderProducts
        });

        const newOrder = await order.save()

        // Hämta den nya ordern med produktinformationen populerad och skicka tillbaka som JSON
        const populatedOrder = await Order.findById(newOrder._id).populate('products.product')
        
        res.status(201).json(populatedOrder)
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};


export const getOneOrder = async (req, res) => {
    try {
        // Hämta order-ID från URL-parametern
        const id = req.params.id

        // Hitta ordern med det angivna ID:et
        const getOrder = await Order.findById(id)

        // Om ordern inte hittas, skicka ett felmeddelande och statuskod 404
        if (!getOrder) {
            res.status(404)
            throw new Error('Kunde inte hitta ordern')
        }

        res.status(200).json(getOrder)
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};
