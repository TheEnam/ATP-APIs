import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  doxology: string;
  invocation: string;
  welcomeIntro: string;
  openingHymn: string;
  prayer: string;
  firstSpecialSong: string;
  callForTithe: string;
  secondSpecialSong: string;
  scriptureReading: string;
  hymnOfMeditation: string;
  sermon: string;
  closingHymn: string;
  Benediction: string;
  dateOfService: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema({
  doxology: {
    type: String,
    required: [true, 'Doxology is required'],
    trim: true,
    minlength: [3, 'Doxology must be at least 3 characters long'],
    maxlength: [200, 'Doxology cannot exceed 200 characters']
  },
  invocation: {
    type: String,
    required: [true, 'Invocation is required'],
    trim: true,
    minlength: [3, 'Invocation must be at least 3 characters long'],
    maxlength: [200, 'Invocation cannot exceed 200 characters']
  },
  welcomeIntro: {
    type: String,
    required: [true, 'Welcome introduction is required'],
    trim: true,
    minlength: [10, 'Welcome introduction must be at least 10 characters long'],
    maxlength: [500, 'Welcome introduction cannot exceed 500 characters']
  },
  openingHymn: {
    type: String,
    required: [true, 'Opening hymn is required'],
    trim: true
  },
  prayer: {
    type: String,
    required: [true, 'Prayer is required'],
    trim: true,
    minlength: [10, 'Prayer must be at least 10 characters long'],
    maxlength: [500, 'Prayer cannot exceed 500 characters']
  },
  firstSpecialSong: {
    type: String,
    required: [true, 'First special song is required'],
    trim: true
  },
  callForTithe: {
    type: String,
    required: [true, 'Call for tithe is required'],
    trim: true
  },
  secondSpecialSong: {
    type: String,
    required: [true, 'Second special song is required'],
    trim: true
  },
  scriptureReading: {
    type: String,
    required: [true, 'Scripture reading is required'],
    trim: true
  },
  hymnOfMeditation: {
    type: String,
    required: [true, 'Hymn of meditation is required'],
    trim: true
  },
  sermon: {
    type: String,
    required: [true, 'Sermon is required'],
    trim: true,
    minlength: [20, 'Sermon must be at least 20 characters long'],
    maxlength: [1000, 'Sermon cannot exceed 1000 characters']
  },
  closingHymn: {
    type: String,
    required: [true, 'Closing hymn is required'],
    trim: true
  },
  Benediction: {
    type: String,
    required: [true, 'Benediction is required'],
    trim: true
  },
  dateOfService: {
    type: Date,
    required: [true, 'Date of service is required'],
    validate: {
      validator: function(value: Date) {
        return value >= new Date();
      },
      message: 'Date of service must be in the future'
    }
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

// Index for querying by date of service
orderSchema.index({ dateOfService: 1 });

const OrderModel = model<IOrder>('Order', orderSchema);

export default OrderModel;