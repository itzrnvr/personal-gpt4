const axios = require('axios');

export type GenUserData = {
    headers: Record<string, string>,
    body: string
}
const generateUser = async (): Promise<GenUserData> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get('https://user-gen.fly.dev/api/v1/generate-user');
            console.log(response.data);
            resolve({
                headers: response.data.headers,
                body: response.data.body
            })
        } catch (error) {
            console.error(error);
            reject(error)
        }
    })
};

export default generateUser
