import { Document, model, Model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    read: { type: Boolean, default: false },
    dealt: { type: Boolean, default: false }
  },
  { timestamps: true }
);

contactSchema.statics.findUnread = async function (): Promise<IContactDocument[]> {
  return (this as IContactModel).find({ read: false }).sort({ createdAt: 0 });
};

contactSchema.statics.findUndealt = async function (): Promise<IContactDocument[]> {
  return (this as IContactModel).find({ dealt: false }).sort({ createdAt: 0 });
};

export interface IContactDocument extends Document {
  // Fields
  title: string;
  description: string;
  read: boolean;
  dealt: boolean;

  // Methods
}

interface IContactModel extends Model<IContactDocument> {
  // Statics
  findUnread(): Promise<IContactDocument[]>;
  findUndealt(): Promise<IContactDocument[]>;
}

const Contact = model<IContactDocument, IContactModel>('Contact', contactSchema);

export default Contact;
