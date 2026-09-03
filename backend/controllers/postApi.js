
const PostApi = async (ctx) => {
    try {
        //fetching json from body
        let obj = ctx.request.body

        //returning that json in response
        ctx.body = obj;
    } catch (error) {
        console.error(error);

        ctx.body = 'Error';

    }
};

module.exports = {
    PostApi
};
