"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = exports.deleteComment = exports.createComment = void 0;
const express_validator_1 = require("express-validator");
const comment_1 = __importDefault(require("../models/comment"));
const post_1 = __importDefault(require("../models/post"));
const createComment = [
    (0, express_validator_1.body)('author', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'Failed to save comment!',
                errors: errors.array(),
            });
        }
        const parentPostId = req.params.id;
        const post = yield post_1.default.findById(parentPostId);
        if (!post) {
            return res.status(404).json({ title: 'Post not found' });
        }
        const comment = new comment_1.default({
            parentPost: parentPostId,
            author: req.body.author,
            text: req.body.text,
            timestamp: Date.now(),
        });
        try {
            yield comment.save();
            post.comments.push(comment._id);
            yield post.save();
            res.status(200).json({
                title: 'Comment saved successfully!',
                comment,
                post,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.createComment = createComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comment_1.default.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ title: 'Comment not found' });
        }
        const parentPostId = comment.parentPost;
        yield comment_1.default.findByIdAndRemove(comment._id);
        yield post_1.default.findByIdAndUpdate(parentPostId, {
            $pull: { comments: comment._id },
        });
        res.status(200).json({ title: 'Comment deleted!' });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteComment = deleteComment;
const editComment = [
    (0, express_validator_1.body)('author', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    (0, express_validator_1.body)('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape(),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                title: 'Failed to edit comment!',
                errors: errors.array(),
            });
        }
        const comment = yield comment_1.default.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ title: 'Comment not found' });
        }
        comment.author = req.body.author;
        comment.text = req.body.text;
        comment.timestamp = new Date();
        try {
            yield comment.save();
            res.status(200).json({
                title: 'Comment edited successfully!',
                comment,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
exports.editComment = editComment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudF9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvY29tbWVudF9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlEQUEyRDtBQUUzRCxnRUFBMkQ7QUFDM0QsMERBQWtEO0FBRWxELE1BQU0sYUFBYSxHQUFHO0lBQ3BCLElBQUEsd0JBQUksRUFBQyxRQUFRLEVBQUUsNkJBQTZCLENBQUM7U0FDMUMsSUFBSSxFQUFFO1NBQ04sUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQ3BCLE1BQU0sRUFBRTtJQUNYLElBQUEsd0JBQUksRUFBQyxNQUFNLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7SUFDNUUsQ0FBTyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtRQUN4RCxNQUFNLE1BQU0sR0FBRyxJQUFBLG9DQUFnQixFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsS0FBSyxFQUFFLHlCQUF5QjtnQkFDaEMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7YUFDdkIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFH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