import { Schema, model, Document } from 'mongoose';

export enum TransferType {
  IN = 'In',
  OUT = 'Out',
}

export enum TransferStage {
  FIRST_READING = 'First Reading',
  SECOND_READING = 'Second Reading',
  THIRD_READING = 'Third Reading',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface ITransfer extends Document {
  memberName: string;
  churchFrom: string;
  churchTo: string;
  dateOfBirth: Date;
  dateOfBaptism: Date;
  baptizedBy: string;
  parentsName: string;
  transferType: TransferType;
  transferStage: TransferStage;
  createdAt: Date;
  updatedAt: Date;
}

const transferSchema = new Schema({
  memberName: { 
    type: String, 
    required: [true, 'Member name is required'],
    trim: true,
    minlength: [3, 'Member name must be at least 3 characters long'],
    maxlength: [100, 'Member name cannot exceed 100 characters']
  },
  churchFrom: { 
    type: String, 
    required: [true, 'Source church is required'],
    trim: true,
    minlength: [3, 'Church name must be at least 3 characters long'],
    maxlength: [200, 'Church name cannot exceed 200 characters']
  },
  churchTo: { 
    type: String, 
    required: [true, 'Destination church is required'],
    trim: true,
    minlength: [3, 'Church name must be at least 3 characters long'],
    maxlength: [200, 'Church name cannot exceed 200 characters']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value: Date) {
        return value <= new Date();
      },
      message: 'Date of birth cannot be in the future'
    }
  },
  dateOfBaptism: {
    type: Date,
    required: [true, 'Date of baptism is required'],
    validate: {
      validator: function(value: Date) {
        return value <= new Date();
      },
      message: 'Date of baptism cannot be in the future'
    }
  },
  baptizedBy: {
    type: String,
    required: [true, 'Baptizing minister name is required'],
    trim: true,
    minlength: [3, 'Minister name must be at least 3 characters long'],
    maxlength: [100, 'Minister name cannot exceed 100 characters']
  },
  parentsName: {
    type: String,
    required: [true, 'Parents name is required'],
    trim: true,
    minlength: [3, 'Parents name must be at least 3 characters long'],
    maxlength: [200, 'Parents name cannot exceed 200 characters']
  },
  transferType: {
    type: String,
    required: [true, 'Transfer type is required'],
    enum: {
      values: Object.values(TransferType),
      message: '{VALUE} is not a valid transfer type'
    },
    default: TransferType.IN
  },
  transferStage: {
    type: String,
    required: [true, 'Transfer stage is required'],
    enum: {
      values: Object.values(TransferStage),
      message: '{VALUE} is not a valid transfer stage'
    },
    default: TransferStage.FIRST_READING
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

// Compound index for unique transfers
transferSchema.index(
  { memberName: 1, churchFrom: 1, churchTo: 1 }, 
  { unique: true }
);

// Index for querying by transfer stage and type
transferSchema.index({ transferStage: 1, transferType: 1 });

const TransferModel = model<ITransfer>('Transfer', transferSchema);

export default TransferModel;