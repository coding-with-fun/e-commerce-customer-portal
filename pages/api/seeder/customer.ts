import connectMongo from '@/libs/connectDB';
import response from '@/libs/response';
import Customer from '@/schemas/customer.schema';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        await Customer.deleteMany();

        const newCustomer = new Customer({
            name: 'Harrsh Patel',
            url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634',
            contactNumber: '+919099976321',
            email: 'dev@harrsh.com',
        });
        newCustomer.customerID = newCustomer._id;
        await newCustomer.save();

        console.log('Customer saved...');

        return response(res, {
            message: 'Customer seeded successfully...',
        });
    } catch (error) {
        return response(res, null, error);
    } finally {
        mongoose.disconnect();
    }
};

export default handler;
