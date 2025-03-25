
import { Schema, model } from 'mongoose';

enum AnnouncementType {
  DISTRICT = 'District',
  LOCAL = 'Local',
  ZONAL = 'Zonal'
}


const announcementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  typeOfAnnouncement:{type:String,required:true, enum: Object.values(AnnouncementType),default: AnnouncementType.LOCAL },
  dateOfAnnouncement:{type:Date,required:true},
  is_recurring:{type:Boolean,required:true},
  createdAt: { type: Date, default: Date.now },
});

export { AnnouncementType };
export default model('Announcement', announcementSchema);