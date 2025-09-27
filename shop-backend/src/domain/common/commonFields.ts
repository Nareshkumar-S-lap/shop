export const addressFields = {
  address_line: { type: String },
  city: { type: String },
  state: { type: String },
  postal_code: { type: String },
  country: { type: String },
};

export const contactFields = {
  phone: { type: String },
  email: { type: String },
  contact_name: { type: String },
  contact_role: { type: String },
};


export const baseFields = {
  id: { type: String },
  isActive: { type: Boolean, default: true },
};

export const baseSchemaOptions = {
  timestamps: true,
};
