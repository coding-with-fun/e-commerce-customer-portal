import z from 'zod';
import connectMongo from '@/libs/connectDB';
import response from '@/libs/response';
import Product, { IProductSchema } from '@/schemas/product.schema';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import requestValidator from '@/middlewares/requestValidator';

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
        const parsedData = (await requestValidator(req, schema)) as schemaType;
        const {
            query: { id },
        } = parsedData;

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

const schema = z.object({
    query: z
        .object({
            id: z
                .string({
                    required_error: 'Product ID is required.',
                    invalid_type_error: 'Product ID is required.',
                })
                .nonempty('Product ID is required.'),
        })
        .refine(
            (data) => mongoose.Types.ObjectId.isValid(data.id),
            'Invalid product ID.'
        ),
});

type schemaType = z.infer<typeof schema>;
