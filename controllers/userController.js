const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .lean();

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new User
  async createUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      //console.log(req.body)
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { ...req.body },
        { new: true }
      );
      
      if (!user) {
        return res.status(404).json({ message: "No such User exists" });
      }

      res.json({ message: "User successfully updated" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  // Delete a User and user thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such User exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
    // add friend
    async addFriend(req, res) {
      try {
        console.log(req.params.userId);
        console.log(req.params.friendId);
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        }

        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
        // delete friend
        async deleteFriend(req, res) {
          try {
            const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { runValidators: true, new: true }
            );
      
            if (!user) {
              return res
                .status(404)
                .json({ message: 'No student found with that ID :(' });
            }

            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
        },
};
