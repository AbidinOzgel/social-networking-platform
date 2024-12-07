export const islike = (requestUserId, post) => {
    // liked'in array olup olmadığını kontrol et
    const liked = Array.isArray(post.liked) ? post.liked : [];
    
    // array üzerinde işlem yap
    for (let user of liked) {
        if (requestUserId === user.id) {
            return true;
        }
    }
    return false;
};
