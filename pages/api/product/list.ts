import connectMongo from '@/libs/connectDB';
import response from '@/libs/response';
import Product, { IProductSchema } from '@/schemas/product.schema';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ProductListResponseType {
    products: ({
        isFavorite: boolean;
    } & IProductSchema)[];
    [key: string]: any;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ProductListResponseType>
) => {
    try {
        const customerID = req.query.customerID as string | undefined;
        console.log(customerID);

        await connectMongo();

        const products = await Product.find().populate(['favoriteBy']);

        console.log(products, ' << SERVER PRODUCTS');

        const updatedProductsList = [];
        for (let product of products) {
            const productObject = product.toObject();
            const updatedProductObject = {
                _id: productObject._id,
                productID: productObject.productID,
                name: productObject.name,
                description: productObject.description,
                url: productObject.url,
                price: productObject.price,
                quantity: productObject.quantity,
                ratings: productObject.ratings,
                totalRatings: productObject.totalRatings,
                seller: productObject.seller,
                isFavorite: customerID ? true : false,
            };

            updatedProductsList.push(updatedProductObject);
        }

        return response(res, {
            message: 'Products fetched successfully.',
            products: updatedProductsList,
        });
    } catch (error) {
        return response(res, null, error);
    }
};

export default handler;
