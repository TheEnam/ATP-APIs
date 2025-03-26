import { Schema, model, Document } from 'mongoose';
//import { number } from 'zod';



export interface ITransfer extends Document {
  memberName: string;
  churchFrom: string;
  churchTo: string;
  numberOfReadings: Number;
  is_approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const transferSchema = new Schema({
  memberName: { 
    type: String, 
    required: [true, 'Members name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  churchFrom: { 
    type: String, 
    required: [true, 'Members church of origin is required'],
    trim: true,
    minlength: [10, 'Church name must be at least 10 characters long'],
    maxlength: [1000, 'Church name cannot exceed 1000 characters']
  },
  churchTo: { 
    type: String, 
    required: [true, 'Members church of destination is required'],
    trim: true,
    minlength: [10, 'Church name must be at least 10 characters long'],
    maxlength: [1000, 'Church name cannot exceed 1000 characters']
  },
  numberOfReadings: {
    type: Number,
    required: [true, 'Number of times this has been read is required'],
    default: 0
  },

  is_approved: {
    type: Boolean,
    required: [true, 'Approval status is required'],
    default: false
  }
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
transferSchema.index({ memberName: 1, churchFrom: 1, churchTo: 1 }, { unique: true });


transferSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.memberName = this.memberName.trim();
  }

  next();
});

const TransferModel = model<ITransfer>('Transfer', transferSchema);

export default TransferModel;