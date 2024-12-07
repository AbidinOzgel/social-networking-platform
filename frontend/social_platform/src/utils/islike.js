export const islike = (requestUserId, post) => {

    const liked = Array.isArray(post.liked) ? post.liked : [];
    

    for (let user of liked) {
        if (requestUserId === user.id) {
            return true;
        }
    }
    return false;
};
