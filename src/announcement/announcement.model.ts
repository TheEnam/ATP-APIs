import { Schema, model, Document } from 'mongoose';

export enum AnnouncementType {
  DISTRICT = 'District',
  LOCAL = 'Local',
  ZONAL = 'Zonal'
}

export interface IAnnouncement extends Document {
  title: string;
  description: string;
  typeOfAnnouncement: AnnouncementType;
  dateOfAnnouncement: Date;
  is_recurring: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  typeOfAnnouncement: {
    type: String,
    required: [true, 'Announcement type is required'],
    enum: {
      values: Object.values(AnnouncementType),
      message: '{VALUE} is not a valid announcement type'
    },
    default: AnnouncementType.LOCAL
  },
  dateOfAnnouncement: {
    type: Date,
    required: [true, 'Date of announcement is required'],
    validate: {
      validator: function(value: Date) {
        return value >= new Date();
      },
      message: 'Date of announcement cannot be in the past'
    }
  },
  is_recurring: {
    type: Boolean,
    required: [true, 'Recurring status is required'],
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
announcementSchema.index({ dateOfAnnouncement: 1, typeOfAnnouncement: 1 });

// Pre-save middleware to ensure title and description are properly formatted
announcementSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.title = this.title.trim();
  }
  if (this.isModified('description')) {
    this.description = this.description.trim();
  }
  next();
});

const AnnouncementModel = model<IAnnouncement>('Announcement', announcementSchema);

export default AnnouncementModel;