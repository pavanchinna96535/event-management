
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Registration=require("../Models/registration");
const Event=require("../Models/events");


const createCheckoutSession=async(req,res)=>{
    try{
        const {registrationId}=req.body;
        const registration=await Registration.findById(registrationId).populate("event");
        if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    const event = registration.event;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: event.title,
              description: `Entry for ${event.title}`,
            },
            unit_amount: event.fee * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success?registrationId=${registration._id}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Stripe checkout session creation failed' });
  }
}
module.exports=createCheckoutSession;