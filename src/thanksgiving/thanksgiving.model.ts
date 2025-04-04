import { Schema, model, Document } from 'mongoose';

//   memberName: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },


export interface IThanksgiving extends Document {
  memberName: string;
  message: string;
  dateOfThanksgiving: Date;
  createdAt: Date;
  updatedAt: Date;
}

const thanksgivingSchema = new Schema({
  memberName: { 
    type: String, 
    required: [true, 'memberName is required'],
    trim: true,
    minlength: [3, 'memberName must be at least 3 characters long'],
    maxlength: [100, 'memberName cannot exceed 100 characters']
  },
  message: { 
    type: String, 
    required: [true, 'message is required'],
    trim: true,
    minlength: [10, 'message must be at least 10 characters long'],
    maxlength: [1000, 'message cannot exceed 1000 characters']
  },
  dateOfThanksgiving: {
    type: Date,
    required: [true, 'Date of Thanksgiving is required'],
    validate: {
      validator: function(value: Date) {
        return value >= new Date();
      },
      message: 'Date of Thanksgiving cannot be in the past'
    }
  },
}, {
  timestamps: true, 
  toJSON: { 
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Index for improved query performance
thanksgivingSchema.index({ dateOfThanksgiving: 1, typeOfThanksgiving: 1 });

// Pre-save middleware to ensure title and description are properly formatted
thanksgivingSchema.pre('save', function(next) {
  if (this.isModified('memberName')) {
    this.memberName = this.memberName.trim();
  }
  if (this.isModified('message')) {
    this.message = this.message.trim();
  }
  next();
});

const ThanksgivingModel = model<IThanksgiving>('Thanksgiving', thanksgivingSchema);

export default ThanksgivingModel;












// const thanksgivingSchema = new Schema({
//   memberName: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// export default model('Thanksgiving', thanksgivingSchema);