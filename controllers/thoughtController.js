const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId)
        .populate("reactions")
        .select("-__v")
        .lean();

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const user = await User.findById(req.body.userId);

      if (!user) {
        return res.status(404).json({ message: "No such User exists" });
      }

      const username = user.username;
      //   console.log(req.body);
      //   console.log(user);

      const newThought = {
        thoughtText: req.body.thoughtText,
        username: username,
      };
      //console.log("newthought:",newThought);

      const thought = await Thought.create(newThought);

      //   console.log(thought.id);

      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } }
      );

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update thought details
  async updateThought(req, res) {
    try {
      //console.log(req.body)
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { ...req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "Thought successfully updated",...thought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // add reaction to thought
  async addReaction(req, res) {
    try {
      //console.log(req.params.thoughtId);
      //console.log(req.params.reactionId);

      const user = await User.findById(req.body.userId);
      
      if (!user) {
        return res.status(404).json({ message: "No such User exists" });
      }

      const username = user.username;

      const newReaction = {
        reactionBody:req.body.reactionBody,
        username:username
      }

      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: newReaction } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove reaction to thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId : req.params.reactionId} } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json({ message: "Reaction successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
