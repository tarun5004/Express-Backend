let postsController = async (req, res) => {
    try {
        console.log("User in postsController:", req.user);

        let posts = [
            {
                id: 1,
                title: 'First test post',
                content: 'This is sample post data for testing.'
            },
            {
                id: 2,
                title: 'Second test post',
                content: 'Protected posts API is working.'
            }
        ];

        return res.status(200).json({
            message: 'Posts fetched successfully',
            user: req.user,
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = {
    postsController
}
