import Resume from '../models/resumeModel.js';
import fs from'fs';
import path from 'path';


// Create Resume
export const createResume = async (req, res)=>{
    try{
        const {title}= req.body;
        // DEFAULT TEMPLATE
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        }); 
        res.status(201).json(newResume);
    } catch(error){
        res.status(500).json({
            message: "Failed to create resume",
            error: error.message
        });
    }
}

// Getting the Resumes
export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });

        res.status(200).json(resumes); // ✅ send response back
    } catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({
            message: "Failed to get resumes",
            error: error.message,
        });
    }
};


//Get Resume by id
export const getUserResumeById =async(req, res)=>{
    try{
        const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id});
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        } 
        res.json(resume);
    } catch(error){
        res.status(500).json({
            message: "Failed to get resume",
            error: error.message
        });
    }
}

//Update Resume
export const updateResume =async(req, res)=>{
    try{
        const resume = await Resume.findOne({_id: req.params.id, userID: req.user._id});
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        } 
        //update 
        Object.assign(resume, req.body)
        //Save
        const saveResume = await resume.save();
        res.json(saveResume);
    } catch(error){
        res.status(500).json({
            message: "Failed to Update resume",
            error: error.message
        });
    }
}

//Delete Resume
export const deleteResume =async(req, res)=>{
    try{
        const resume = await Resume.findOne({_id: req.params.id, userID: req.user._id});
        if(!resume){
            return res.status(404).json({message: "Resume not found"});
        } 

        //Creates a uploads folder & store the reusme
        const uploadsFolder =path.join(process.cwd(), 'uploads');

        //Delete the thumbnil
        if (resume.thumbnailLink){
            const oldthumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if(fs.existsSync(oldthumbnail)){
                fs.unlinkSync(oldthumbnail);
            }
        }

        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if(fs.existsSync(oldProfile)){
                fs.unlinkSync(oldProfile);
            }
        }
        
        //Delete from DB
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id, 
            userID: req.user._id
        });
        if (!deleted){
            return res.status(404).json({message: "Resume not found"});
        }
        res.json ({message:"Resume Deleted Successfully"})
    } catch(error){
        res.status(500).json({
            message: "Failed to Delete resume",
            error: error.message
        });
    }
}