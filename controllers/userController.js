const { user } = require("../models");

module.exports = {

    getUsers(req, res) {

        user.find()

            .select("-__v")
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {

        user.findOne({ _id: req.params.userId })

            .select("-__v")
            .populate("friends")
            .populate("thoughts")
            .then((user) =>

                !user

                    ? res.status(404).json({ message: "No user with corresponding ID" })
                    : res.json(user)
            )

            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {

        user.create(req.body)

            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {

        user.findOneAndUpdate(

            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )

            .then((user) => {

                !user

                    ? res.status(404).json({ message: "No user with corresponding ID" })
                    : res.status(200).json({ message: "User updated successfully" });
            })

            .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {

        user.findOneAndDelete({ _id: req.params.userId })

            .then((user) =>

                !user

                    ? res.status(404).json({ message: "No user with corresponding ID" })
                    : res.status(200).json({ message: "User deletion successful" })
            )

            .catch((err) => res.status(500).json(err));
    },

    //friends
    addFriend(req, res) {

        user.findOneAndUpdate(

            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )

            .then((user) =>

                !user

                    ? res.status(404).json({ message: "No user with corresponding ID" })
                    : res.status(200).json({ message: "Friend added successfully" })
            )

            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {

        user.findOneAndUpdate(

            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )

            .then((user) =>

                !user

                    ? res.status(404).json({ message: "No user with corresponding ID" })
                    : res.status(200).json({ message: "Friend Deleted Successfully" })
            )

            .catch((err) => res.status(500).json(err));
    }
};