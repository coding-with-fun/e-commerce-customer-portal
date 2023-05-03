import z from 'zod';
import connectMongo from '@/libs/connectDB';
import response from '@/libs/response';
import Product, { IProductSchema } from '@/schemas/product.schema';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import requestValidator from '@/middlewares/requestValidator';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import Customer from '@/schemas/customer.schema';

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
            body: { id },
        } = parsedData;

        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            throw new Error('You are not authenticated.');
        }

        await connectMongo();

        const products = await Product.find({
            _id: id,
            favoriteBy: {
                $in: session.user._id,
            },
        }).populate(['favoriteBy']);

        if (products.length > 0) {
            await Promise.all([
                Product.findByIdAndUpdate(id, {
                    $pull: {
                        favoriteBy: session.user._id,
                    },
                }),
                Customer.findByIdAndUpdate(session.user._id, {
                    $pull: {
                        favoriteProducts: id,
                    },
                }),
            ]);

            return response(res, {
                message: 'Product disliked successfully.',
            });
        } else {
            await Promise.all([
                Product.findByIdAndUpdate(id, {
                    $push: {
                        favoriteBy: session.user._id,
                    },
                }),
                Customer.findByIdAndUpdate(session.user._id, {
                    $push: {
                        favoriteProducts: id,
                    },
                }),
            ]);

            return response(res, {
                message: 'Product liked successfully.',
            });
        }
    } catch (error) {
        return response(res, null, error);
    }
};

export default handler;

const schema = z.object({
    body: z
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
