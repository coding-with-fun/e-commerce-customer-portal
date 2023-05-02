import axios from 'axios';

export const toggleFavoriteAPI = async (
    url: string,
    {
        arg,
    }: {
        arg: {
            id: string;
        };
    }
) => {
    return await axios.post(url, {
        id: arg.id,
    });
};
