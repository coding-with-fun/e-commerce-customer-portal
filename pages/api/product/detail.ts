import connectMongo from '@/libs/connectDB';
import response from '@/libs/response';
import Product, { IProductSchema } from '@/schemas/product.schema';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ProductDetailsResponseType {
    product: IProductSchema;
    success: boolean;
    message: string;
    [key: string]: any;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ProductDetailsResponseType>
) => {
    try {
        const { id } = req.query;
        await connectMongo();

        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found.');
        }

        return response(res, {
            message: 'Product fetched successfully.',
            product,
        });
    } catch (error) {
        return response(res, null, error);
    }
};

export default handler;
