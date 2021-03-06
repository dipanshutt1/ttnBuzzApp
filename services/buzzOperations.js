const buzz = require('../models/buzz');


createBuzz = (buzz) => {
    return buzz.save();
}

findBuzz = (skipValue) => {
    return buzz.find().sort({date_created: -1}).limit(5).skip(skipValue);
}
fetchBuzzById = id => {
    return buzz.findOne({_id: id});
}

likeBuzz = (id, email, status) => {
    if (status) {
        return buzz.findOneAndUpdate(
            {_id: id},
            {
                $pull: {
                    like: {
                        emailId: email
                    }
                }
            },
            {
                new: true,
                useFindAndModify: true
            }
        )
    } else {
        return buzz.findOneAndUpdate(
            {_id: id},
            {
                $pull: {
                    dislike: {
                        emailId: email
                    }
                },
                $push: {
                    like: {
                        emailId: email
                    }
                }
            },
            {
                new: true,
                useFindAndModify: true
            }
        )
    }

};


dislikeBuzz = (id, email, status) => {
    if (status) {
        return buzz.findOneAndUpdate(
            {_id: id},
            {
                $pull: {
                    dislike: {
                        emailId: email
                    }
                }
            },
            {
                new: true,
                useFindAndModify: true
            }
        )
    } else {
        return buzz.findOneAndUpdate(
            {_id: id},
            {
                $pull: {
                    like: {
                        emailId: email
                    }
                },
                $push: {
                    dislike: {
                        emailId: email
                    }
                }
            },
            {
                new: true,
                useFindAndModify: true
            }
        )
    }
}
module.exports = {
    createBuzz,
    findBuzz,
    dislikeBuzz,
    likeBuzz,
    fetchBuzzById
}