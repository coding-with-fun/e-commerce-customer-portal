import Products from '@/data/ProductsData';
import connectMongo from '@/libs/connectDB';
import response from '@/libs/response';
import Product from '@/schemas/product.schema';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectMongo();

        await Product.deleteMany();

        for await (let product of Products) {
            const newProduct = new Product({
                name: product.name,
                description: product.description,
                url: product.url,
                seller: product.seller,
                price: product.price,
                quantity: product.quantity,
                ratings: product.ratings,
                totalRatings: product.totalRatings,
            });
            newProduct.productID = newProduct._id;
            await newProduct.save();

            console.log('Product saved...');
        }

        return response(res, {
            message: 'Products seeded successfully...',
        });
    } catch (error) {
        return response(res, null, error);
    } finally {
        mongoose.disconnect();
    }
};

export default handler;
