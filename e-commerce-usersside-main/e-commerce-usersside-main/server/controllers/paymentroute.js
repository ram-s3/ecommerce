const mongoConnectimport = require("../util/database");
const monogodb = require("mongodb");
const stripe = require("stripe")("sk_test_51Nht5eIzECVF8KrFJR2XhAk6poQZED8j9XSYnOe29WbwSfv0OB1yVy6dRDEF8YILPPctvzMizZeINu8Taj5jGQbU00yf87dSze")

exports.payment = async (req, res) => {

    const productdetails = req.body;
    // console.log(productdetails)


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: productdetails.product.name,
                        description: productdetails.product.description,
                    },
                    unit_amount: +productdetails.product.price * 100,
                },
                quantity: +productdetails.totalitems,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3006",
        cancel_url: "http://localhost:3006/auth"
    })

    // stripe.customers.create({
    //     email: 'mymail@mail.com',
    // }).then((customer) => {
    //     return stripe.invoiceItems.create({
    //         customer: customer.id,
    //         amount: 2500 * 1000,
    //         currency: 'usd',
    //         description: 'one-time setup fee',
    //     }).then((invoiceItem) => {
    //         return stripe.invoices.create({
    //             collection_method: 'send_invoice',
    //             customer: invoiceItem.customer,
    //         });
    //     }).then((invoice) => {
    //         console.log(invoice)
    //     }).catch((err) => {
    //         //
    //     })
    // }
    // )


    let ordersetres;

    if (session.status === 'open') {




        const db = mongoConnectimport.getDb();

        const order = {
            product_name: productdetails.product.name,
            ordered_item: [productdetails.product._id.toString()],
            quantity: productdetails.totalitems,
            totalamount: +productdetails.totalitems * productdetails.product.price,
            user_id: productdetails.userid,
            payment_id: session.id,
            created_id: Date.now(),
            status: 'on hold'
        }

        ordersetres = await db.collection('orders').insertOne(order);

    }

    res.status(200).json({ id: session.id, ordersetres });

}