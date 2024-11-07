const express = require("express");
const server = express()
const bodyparser = require("body-parser")
server.use(bodyparser.json());
const STATUS_USER_ERROR = 422;
let posts = [{ title: "react", content: "we have done 2 projects" }, { title: "Node", content: "we have done 1 project" }];

const getAllPosts = (req, res) => {
    res.status(200).json(posts);
}
const getPostById = (req, res) => {
    const { id } = req.params
    return res.status(200).send(posts[id]);
}
const validateData = (req, res, next) => {
    const { title, content } = req.body;
    if (title === undefined || title.length === 0) {
        return res.status(STATUS_USER_ERROR).send("Please send valid title for post")
    }
    if (content === undefined || content.length === 0) {
        return res.status(STATUS_USER_ERROR).send("Please send valid title for post")
    }
    posts.filter((item, index) => item.title === title)
    if (posts.length != 0) {
        return res.status(STATUS_USER_ERROR).send("Title already exists");
    }

    req.post = { title, content }
    next();
}
const createPost = (req, res) => {
    const { post } = req;
    posts.push(post);
    return res.status(202).json({ success: true, postId: posts.length - 1 })

}
const updatePost = (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;
    const postToEdit = posts[id]
    postToEdit.title = title;
    postToEdit.content = content;

    return res.status(200).send({ success: true, postToEdit })
}
const deleteById = (req, res) => {
    const { id } = req.params;
    posts = posts.filter((item, index) => index != id)
    console.log("posts", posts);

    return res.status(200).send("Deleted Successfully");

}
server.get("/", (req, res) => {
    res.status(200).send("Huray");
})
server.get("/post", getAllPosts)

server.get("/post/:id", getPostById)

server.post("/post", validateData, createPost);

server.put("/post/:id", updatePost);

server.delete("/post/:id", deleteById);

module.exports = { server };