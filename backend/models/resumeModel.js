import mongoose from  'mongoose';

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String
    },
    template: {
    name: { type: String }, 
    colorPalette: [{ type: String }],    
    },
    profileInfo:{
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String,
    },
    contactInfo:{
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
        website: String,
    },
    // Work Experience
    workExperience: [{
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
    }],
    // Education
    education: [{
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
    }],
    // Skills
    skills: [{
        name: String,
        progress: Number,
    }],
   //Projects
   projects: [{
        title: String,
        description: String,
        github: String,
        liveDemo: String,
    }],
    //Certification
    certification: [{
        title: String,
        issuer: String,
        year: String,
    }],
    languages: [{
        name:String,
        progress:Number,
    }],
    interests: [String],
  },
   { 
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"}
   },
);

export default mongoose.model("Resume", ResumeSchema);