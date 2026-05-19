let postsController = async (req, res) => {
    try {
        let posts = [
            {
                id: 1,
                title: 'First artwork',
                description: 'Sample post data for testing protected route.'
            },
            {
                id: 2,
                title: 'Second artwork',
                description: 'If you can see this, auth middleware is working.'
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
