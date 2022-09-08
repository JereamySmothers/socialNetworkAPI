const { thought, user } = require("../models");

module.exports = {

    getThoughts(req, res) {

        thought.find()

            .select("-__v")
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    getOneThought(req, res) {

        thought.findOne({ _id: req.params.thoughtId })

            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {

        thought.create(req.body)

            .then((thought) => {

                return user.findByIdAndUpdate(

                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true, runValidators: true }``
                );
            })

            .then((user) =>

                !thought

                    ? res.status(404).json({ message: "No thought corresponds with the requested ID" })
                    : res.status(200).json({ message: "Thought created successfully" })
            )

            .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {

        thought.findOneAndUpdate(

            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true, runValidators: true }
        )

            .then((thought) => {

                !thought

                    ? res.status(404).json({ message: "No thought corresponds with the requested ID" })
                    : res.status(200).json({ message: "Thought updated successfully" })
            })

            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {

        thought.findOneAndDelete({ _id: req.params.thoughtId }).then((thought) => { });

        !thought

            ? res.status(404).json({ message: "No thought corresponds with the requested ID" })
            : res.status(200).json({ message: "Thought has been purged" }).catch((err) => res.status(500).json(err));
    },

    //reactions
    createReaction(req, res) {

        thought.create(req.body)

            .then((thought) => {

                return user.findByIdAndUpdate(

                    { _id: req.body.thoughtId },
                    { $push: { reaction: req.body.reaction_id } },
                    { new: true, runValidators: true }``
                );
            })

            .then((user) =>

                !thought

                    ? res.status(404).json({ message: "No thought corresponds with the requested ID" })
                    : res.status(200).json({ message: "Reaction created successfully" })
            )

            .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {

        thought.findOneAndUpdate(

            { _id: req.params.thoughtId },
            { $pull: { reaction: req.body.reactionId } },
            { new: true, runValidators: true }
        )

            .then((user) =>

                !user

                    ? res.status(404).json({ message: "No thought corresponds with the requested ID" })
                    : res.status(200).json({ message: "Reaction deleted successfully" })
            )

            .catch((err) => res.status(500).json(err));
    },
};