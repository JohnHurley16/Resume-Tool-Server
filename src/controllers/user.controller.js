const db = require('../models');
const User = db.rest.models.user;

exports.getUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id
        }
    })

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${id}`
        })
    }

    return res.send(user);
}

exports.getUserLogin = async (req, res) => {
    const { username } = req.body;

    return res.send(req.body);
}

exports.createUser = async (req, res) => {
    const { fname, lname, email, username, password } = req.body;

    if (!username ||
        !password ||
        !fname ||
        !lname ||
        !email) {
        return res.status(400).send({
            message: `Please submit all required fields`
        })
    }

    const usernameExists = await User.findOne({
        where: {
            username,
        }
    })

    const emailExists = await User.findOne({
        where: {
            email,
        }
    })

    if (usernameExists || emailExists) {
        return res.status(400).send({
            message: `A user with this username or email already exists`
        })
    }

    try {
        let newUser = await User.create({
            fname,
            lname,
            email,
            username,
            password
        })
        return res.send(newUser)
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`
        })
    }
}

exports.updateUser = async (req, res) => {
    const { fname, lname, email, username, password } = req.body;
    const { id } = req.params;

    const user = await User.findOne({
        where: {
            id,
        }
    })

    if (!user) {
        return res.status(400).send({
            message: `No user exists with ID: ${id}`
        })
    }

    try {
        if (username) {
            user.username = username
        }

        if (password) {
            user.password = password
        }

        if (fname) {
            user.fname = fname
        }

        if (lname) {
            user.lname = lname
        }

        if (email) {
            user.email = email
        }
        user.save();

        return res.send({
            message: `User ${id} has been updated!`
        })
    } catch (err) {
        return res.status(500).send({
            message: `You need to include a username or password`
        })
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).send({
            message: `Please include the ID of the user you are trying to delete`
        })
    }

    const user = await User.findOne({
        where: {
            id
        }
    })

    if (!user) {
        return res.status(400).send({
            message: `No user found with the id ${id}`
        })
    }

    try {
        await user.destroy();

        return res.send({
            message: `User: ${id} has been deleted`
        })
    } catch (err) {
        return res.status(500).send({
            message: `Error: ${err.message}`
        })
    }
}