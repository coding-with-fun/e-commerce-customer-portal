import Products, { IProduct } from '@/data/ProductsData';
import response from '@/libs/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ProductListResponseType {
    products: IProduct[];
    [key: string]: any;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ProductListResponseType>
) => {
    try {
        await new Promise((r) => setTimeout(r, 3000));
        return response(res, {
            message: 'Products fetched successfully.',
            products: Products,
        });
    } catch (error) {
        return response(res, null, error);
    }
};

export default handler;
