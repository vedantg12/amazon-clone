import { getSession, useSession } from "next-auth/react";
import { delBasePath } from "next/dist/next-server/lib/router/router";
import Header from "../components/Header";
import moment from "moment";
import db from "../../firebase";
function Orders({ orders }) {
    console.log(orders);
    const session = useSession();
    return (
        <div>
            <Header />
            <main className='max-w-screen-lg max-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
                {session ? (<h2>x Orders</h2>) : (<h2>Please sign in to see your orders</h2>)}
                <div className='mt-5 space-y-4'>
                </div>
            </main>
        </div>
    )
}

export default Orders;

export async function getServerSideProps(context){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await getSession(context);
    if(!session){
        return {props: {},};
    }
    const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get();
    const orders = await Promise.all(stripeOrders.docs.map(async (order) => ({
        id: order.id,
        amount: order.data().amount,
        amount_shipping: order.data().amount_shipping,
        images: order.data().images,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: (await stripe.checkout.sessions.listLineItems(order.id, {limit: 100})).data,
    }))
    );
    return {
        props:{
            orders,
        }
    };
}


