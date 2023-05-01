import connectMongo from '@/libs/connectDB';
import response from '@/libs/response';
import Product, { IProductSchema } from '@/schemas/product.schema';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ProductListResponseType {
    products: IProductSchema[];
    [key: string]: any;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ProductListResponseType>
) => {
    try {
        await connectMongo();

        const products = await Product.find();

        return response(res, {
            message: 'Products fetched successfully.',
            products,
        });
    } catch (error) {
        return response(res, null, error);
    }
};

export default handler;
