import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      // type and reference to make a relation
      // ObjectId -> O & I -> Caps
      type: mongoose.Schema.Types.ObjectId,

      // should be same as the arg passed inside the model of the reference
      ref: 'User',
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubTodo',
      },
    ], // Array of sub-todos
  },
  { timestamps: true }
);

export const Todo = mongoose.model('Todo', todoSchema);

// NOTE: when stored in MongoDB -> Todo -> todos (plural form and lowercase)
