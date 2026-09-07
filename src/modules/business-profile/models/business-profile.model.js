import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        line1: {
            type: String,
            required: true,
            trim: true,
        },
        line2: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        postalCode: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
    },
    { _id: false },
);

const brandingSchema = new mongoose.Schema(
    {
        logoUrl: {
            type: String,
            trim: true,
        },
        primaryColor: {
            type: String,
            trim: true,
        },
        secondaryColor: {
            type: String,
            trim: true,
        },
    },
    { _id: false },
);

const bankDetailsSchema = new mongoose.Schema(
    {
        accountHolder: {
            type: String,
            trim: true,
        },
        bankName: {
            type: String,
            trim: true,
        },
        accountNumber: {
            type: String,
            trim: true,
        },
        ifscCode: {
            type: String,
            trim: true,
            uppercase: true,
        },
        upiId: {
            type: String,
            trim: true,
        },
    },
    { _id: false },
);

const numberingSchema = new mongoose.Schema(
    {
        prefix: {
            type: String,
            required: true,
            trim: true,
        },
        nextNumber: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false },
);

const invoiceDefaultsSchema = new mongoose.Schema(
    {
        currency: {
            type: String,
            required: true,
            trim: true,
            uppercase: true,
        },
        paymentTerms: {
            type: Number,
            required: true,
            min: 1,
        },
        defaultNotes: {
            type: String,
            trim: true,
        },
        defaultTaxRate: {
            type: Number,
            min: 0,
        },
        numbering: {
            type: numberingSchema,
            required: true,
        },
    },
    { _id: false },
);

const businessProfileSchema = new mongoose.Schema(
    {
        schemaVersion: {
            type: Number,
            required: true,
            default: 1,
        },

        businessName: {
            type: String,
            required: true,
            trim: true,
        },

        legalName: {
            type: String,
            trim: true,
        },

        ownerName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        website: {
            type: String,
            trim: true,
        },

        taxNumber: {
            type: String,
            trim: true,
        },

        registrationNumber: {
            type: String,
            trim: true,
        },

        address: {
            type: addressSchema,
            required: true,
        },

        branding: {
            type: brandingSchema,
            required: true,
        },

        bankDetails: {
            type: bankDetailsSchema,
        },

        invoiceDefaults: {
            type: invoiceDefaultsSchema,
            required: true,
        },

        archivedAt: {
            type: Date,
            default: null,
        },
    },
    {
        collection: "business_profiles",
        timestamps: true,
    },
);

businessProfileSchema.index(
    { email: 1 },
    { unique: true },
);

businessProfileSchema.index({
    businessName: 1,
    createdAt: -1,
});

const BusinessProfile = mongoose.model(
    "BusinessProfile",
    businessProfileSchema,
);

export default BusinessProfile;