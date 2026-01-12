interface FormData {
  fullName: string;
  nickname: string;
  dateOfBirth: string;
  gender: string;
  location: string;
  phoneNumber: string;
  email: string;
  discordUsername: string;
  socialMediaLink: string;
  editingApps: string[];
  editingDevice: string;
  experienceLevel: string;
  participationConfirm: boolean;
  templateRuleConfirm: boolean;
  proofOfWorkConfirm: boolean;
  introVideo: File | null;
}

import { Button } from "@/components/ui/button";
import { ExternalLink, Handshake, AlertCircle, CheckCircle2, Loader2, Upload, X, FileVideo } from "lucide-react";
import { socialLinks } from "@/data/siteStats";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import axios from "axios"
import championshipBg from "@assets/e6ab8ee37b91ddf03c17421d5f23182f_1761911502960.jpg";

const rounds = [
  {
    number: "1",
    name: "Concept & Cut",
    description: "Editors receive identical source footage and must create a short (≤ 30s) edit expressing emotion and rhythm.",
  },
  {
    number: "2",
    name: "Story & Sound",
    description: "Participants remix given materials with music and sound design, creating narrative cohesion.",
  },
  {
    number: "3",
    name: "Final Masterpiece",
    description: "Top editors deliver their final version — judged for originality, flow, and audience impact.",
  },
];

export default function Championship() {
  const [hideHeroText, setHideHeroText] = useState(false);
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    nickname: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    phoneNumber: '',
    email: '',
    discordUsername: '',
    socialMediaLink: '',
    editingApps: [],
    editingDevice: '',
    experienceLevel: '',
    participationConfirm: false,
    templateRuleConfirm: false,
    proofOfWorkConfirm: false,
    introVideo: null
  });

  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);



  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      const updated = { ...errors };
      delete updated[name];
      setErrors(updated);
    }
  };

  const uploadFileInChunks = async (
    file: File,
    onProgress?: (progress: { uploadedChunks: number; totalChunks: number; percentage: number }) => void
  ): Promise<string> => {
    const CHUNK_SIZE = 1024 * 1024; // 1MB chunks
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);
      
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());
      formData.append('fileName', file.name);
      formData.append('fileId', fileId);
      
      // Use the SAME endpoint for chunk upload
      const response = await axios.post(
        'http://localhost:3000/api/v1/creator',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      
      if (onProgress) {
        onProgress({
          uploadedChunks: chunkIndex + 1,
          totalChunks,
          percentage: Math.round(((chunkIndex + 1) / totalChunks) * 100)
        });
      }
      
      if (response.data.data.isComplete) {
        return response.data.data.fileName;
      }
    }
    
    throw new Error('Upload бүрэн дуусаагүй байна');
  };



  const handleCheckboxGroup = (name: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentValues = (prev[name] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v: string) => v !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
    if (errors[name as string]) {
      const updated = { ...errors };
      delete updated[name as string];
      setErrors(updated);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, introVideo: 'File size must be less than 100MB' }));
        return;
      }
      if (!file.type.startsWith('video/')) {
        setErrors(prev => ({ ...prev, introVideo: 'Please upload a valid video file' }));
        return;
      }
      setFormData(prev => ({ ...prev, introVideo: file }));
      const updated = { ...errors };
      delete updated.introVideo;
      setErrors(updated);
    }
  };

  const removeVideo = () => {
    setFormData(prev => ({ ...prev, introVideo: null }));
    const fileInput = document.getElementById('video-upload') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Personal Information
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Contact & Community
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{8}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Phone number must be 8 digits';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.discordUsername.trim()) {
      newErrors.discordUsername = 'Discord username is required';
    }
    
    if (!formData.socialMediaLink.trim()) {
      newErrors.socialMediaLink = 'Social media link is required';
    } else if (!/^https?:\/\/.+/.test(formData.socialMediaLink.trim())) {
      newErrors.socialMediaLink = 'Must be a valid URL (starting with http:// or https://)';
    }

    // Editing Background
    if (formData.editingApps.length === 0) {
      newErrors.editingApps = 'Select at least one editing app';
    }
    
    if (!formData.editingDevice) {
      newErrors.editingDevice = 'Editing device is required';
    }
    
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Experience level is required';
    }

    // Confirmation & Agreement
    if (!formData.participationConfirm) {
      newErrors.participationConfirm = 'You must confirm participation';
    }
    
    if (!formData.templateRuleConfirm) {
      newErrors.templateRuleConfirm = 'You must acknowledge the template rule';
    }
    
    if (!formData.proofOfWorkConfirm) {
      newErrors.proofOfWorkConfirm = 'You must agree to proof of work';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let videoFileName = null;
      
      if (formData.introVideo) {
        console.log('Starting chunk upload...');
        videoFileName = await uploadFileInChunks(
          formData.introVideo,
          (progress) => {
            setUploadProgress(progress.percentage);
            console.log(`Upload progress: ${progress.percentage}%`);
          }
        );
        console.log('Video uploaded successfully:', videoFileName);
      }

      const registrationData = {
        fullName: formData.fullName,
        nickname: formData.nickname,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        location: formData.location,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        discordUsername: formData.discordUsername,
        socialMediaLink: formData.socialMediaLink,
        editingApps: JSON.stringify(formData.editingApps),
        editingDevice: formData.editingDevice,
        experienceLevel: formData.experienceLevel,
        videoFileName: videoFileName
      };

      const response = await axios.post(
        'https://api.dlms.pro/api/v1/creator',
        registrationData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || 'Submission failed');
      }
      
      console.log('Form submitted successfully:', response.data);
      setSubmitSuccess(true);
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (error: any) {
      console.error('Submission error:', error);
      
      const errorMessage = error.response?.data?.message || error.message || 'Submission failed. Please try again.';
      
      setErrors({ 
        submit: errorMessage
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setShowRegistration(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHideHeroText(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/30 rounded-lg p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
              Registration Successful!
            </h2>
            
            <p className="text-lg md:text-xl text-foreground/90" style={{ fontFamily: 'Playfair Display, serif' }}>
              Welcome to the Short Editing Championship,<br />
              <span className="text-primary font-semibold">{formData.fullName}</span>!
            </p>
            
            <div className="bg-black/50 border border-primary/30 rounded-lg p-6 space-y-4 backdrop-blur-sm">
              <p className="text-foreground/85 leading-relaxed">
                Please join our official Discord server to continue and stay updated with all championship announcements.
              </p>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto text-base"
              >
                <a href={socialLinks.discord} target="_blank" rel="noopener noreferrer">
                  Join Discord Server →
                </a>
              </Button>
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                Check your email <span className="text-primary">{formData.email}</span> for confirmation and additional details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary" style={{ fontFamily: 'Playfair Display, serif' }}>
              Championship Registration
            </h1>
            <p className="text-lg text-foreground/80">
              Join Mongolia's first national editing competition
            </p>
            <div className="w-24 h-0.5 bg-primary/40 mx-auto" />
          </div>

          <div className="space-y-10">
            <section className="space-y-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary border-b border-primary/30 pb-3">
                Personal Information
              </h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Full Name (Official Name) <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-muted-foreground">Use your real/legal name</p>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Nickname / Alias (Leaderboard name)
                </label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your nickname (optional)"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                {errors.dateOfBirth && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.dateOfBirth}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Gender</label>
                <div className="space-y-2">
                  {['Male', 'Female', 'Prefer not to say'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-foreground/90 group-hover:text-foreground transition-colors">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  City / School / University
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Enter your location (optional)"
                />
              </div>
            </section>

            <section className="space-y-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary border-b border-primary/30 pb-3">
                Contact & Community
              </h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="8 digits"
                  maxLength={8}
                />
                {errors.phoneNumber && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.phoneNumber}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Discord Username (Mandatory) <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-muted-foreground">Example: username#1234 or new Discord ID</p>
                <input
                  type="text"
                  name="discordUsername"
                  value={formData.discordUsername}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="username#1234"
                />
                {errors.discordUsername && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.discordUsername}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Social Media Link (TikTok / Instagram / Facebook) <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-muted-foreground">This account will be used for posting & fan voting</p>
                <input
                  type="url"
                  name="socialMediaLink"
                  value={formData.socialMediaLink}
                  onChange={handleInputChange}
                  className="w-full bg-black/50 border border-primary/30 rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="https://instagram.com/yourprofile"
                />
                {errors.socialMediaLink && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.socialMediaLink}</p>}
              </div>
            </section>

            <section className="space-y-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary border-b border-primary/30 pb-3">
                Editing Background
              </h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Main Editing App <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['CapCut', 'Premiere Pro', 'After Effects', 'VN', 'Alight Motion', 'Other'].map((app) => (
                    <label key={app} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.editingApps.includes(app)}
                        onChange={() => handleCheckboxGroup('editingApps', app)}
                        className="w-4 h-4 text-primary focus:ring-primary rounded"
                      />
                      <span className="text-foreground/90 group-hover:text-foreground transition-colors">{app}</span>
                    </label>
                  ))}
                </div>
                {errors.editingApps && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.editingApps}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Editing Device <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Phone', value: '1' },
                    { label: 'Computer', value: '2' },
                    { label: 'Both', value: '3' }
                  ].map((device) => (
                    <label key={device.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="editingDevice"
                        value={device.value}
                        checked={formData.editingDevice === device.value}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-foreground/90 group-hover:text-foreground transition-colors">{device.label}</span>
                    </label>
                  ))}
                </div>
                {errors.editingDevice && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.editingDevice}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Pro'].map((level) => (
                    <label key={level} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={level}
                        checked={formData.experienceLevel === level}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <span className="text-foreground/90 group-hover:text-foreground transition-colors">{level}</span>
                    </label>
                  ))}
                </div>
                {errors.experienceLevel && <p className="error-message text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.experienceLevel}</p>}
              </div>
            </section>

            <section className="space-y-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-primary border-b border-primary/30 pb-3">
                Intro Video (Optional)
              </h2>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  10-Second Intro Video Upload
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  "Hi, I'm [Name], and I'm competing in the Short Editing Championship."
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Max size: 100MB
                </p>

                {!formData.introVideo ? (
                  <label className="block">
                    <div className="w-full bg-black/50 border-2 border-dashed border-primary/30 rounded-lg px-4 py-8 text-center cursor-pointer hover:border-primary/60 hover:bg-black/60 transition-all">
                      <Upload className="w-12 h-12 mx-auto text-primary/60 mb-3" />
                      <p className="text-sm text-foreground/80 mb-1">Click to upload video</p>
                      <p className="text-xs text-muted-foreground">MP4, MOV, AVI (max 100MB)</p>
                    </div>
                    <input
                      id="video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="bg-black/50 border border-primary/30 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileVideo className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm text-foreground font-medium">{formData.introVideo.name}</p>
                        <p className="text-xs text-muted-foreground">{(formData.introVideo.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      onClick={removeVideo}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                )}
                {errors.introVideo && <p className="error-message text-sm text-red-500 flex items-center gap-1 mt-2"><AlertCircle className="w-4 h-4" />{errors.introVideo}</p>}
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6">
              {/* Upload Progress Bar */}
              {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Uploading video...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
              
              {errors.submit && (
                <p className="text-sm text-red-500 mb-4 flex items-center gap-1 justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {errors.submit}
                </p>
              )}
              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={isSubmitting}
                className="w-full text-lg py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Submitting...'}
                  </>
                ) : (
                  'Submit Registration'
                )}
              </Button>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Questions? Contact us on Discord or email
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen -mt-16">
      {/* Hero Section - Full Screen with Art Studio Background */}
      <section className="relative h-screen flex items-center justify-center px-4 pt-20 pb-20 overflow-hidden">
        {/* Background Image - Animated Zoom Out */}
        <motion.div 
          className="absolute inset-0 hero-bg-championship"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.25, 0.4, 0.25, 1] }}
          style={{
            backgroundImage: `url(${championshipBg})`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Black Filter Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/60" />
        
        {/* Bottom Fade to Black */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black pointer-events-none" />
        
        {/* Golden radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        {!hideHeroText && (
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3">
          {/* Main Title - Animated */}
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-tight"
            style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 40px rgba(212, 175, 55, 0.3)' }}
            data-testid="text-championship-title"
          >
            SHORT EDITING CHAMPIONSHIP
          </motion.h1>

          {/* Subtitle - Animated */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-sm sm:text-base md:text-lg text-foreground/90 font-light italic"
            style={{ fontFamily: 'Playfair Display, serif' }}
            data-testid="text-championship-subtitle"
          >
            Where editors become legends.
          </motion.p>
        </div>
        )}
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* Content Section - Black Background */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-5xl mx-auto space-y-20">
          
          {/* Intro Paragraph */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <p 
                className="text-base md:text-lg leading-normal text-foreground/85 text-center"
                data-testid="text-intro"
              >
                The Short Editing Championship is Mongolia's first national creative battle for editors — a stage where discipline meets imagination.
                Each participant transforms raw clips into storytelling art. The goal is not only to edit videos but to edit minds.
              </p>
            </div>
          </AnimatedSection>

          {/* Overview Block */}
          <AnimatedSection>
            <div>
              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-overview-heading"
              >
                About the Championship
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                <p className="text-base leading-normal text-foreground/85">
                  This three-round competition brings together over 100 editors from across the country.
                  Each round tests creativity, storytelling, and technique.
                </p>
                <p className="text-base leading-normal text-foreground/85">
                  Judged by expert editors and public votes, this event represents a new movement for Mongolian digital culture.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Round Structure Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-12"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-format-heading"
              >
                Competition Format
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {rounds.map((round, idx) => (
                  <AnimatedSection key={round.number} delay={idx * 0.1}>
                    <div 
                      className="border border-primary/20 bg-black p-6 relative"
                      data-testid={`round-${round.number}`}
                    >
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/40" />
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-primary/60 text-sm font-light">{round.number}</span>
                          <h3 className="text-base font-semibold text-foreground uppercase tracking-wide">
                            {round.name}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {round.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Awards Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-awards-heading"
              >
                Champions & Recognition
              </h2>
              <p 
                className="text-lg text-center text-muted-foreground mb-12"
                data-testid="text-awards-subheading"
              >
                Two titles — One vision.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-bold text-primary">Expert Champion</h3>
                  <p className="text-base text-muted-foreground">
                    Chosen by professional editors and judges.
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-bold text-primary">Fan Champion</h3>
                  <p className="text-base text-muted-foreground">
                    Voted by the community on Discord and social platforms.
                  </p>
                </div>
              </div>

              {/* Quote Block */}
              <blockquote 
                className="text-center"
                data-testid="text-awards-quote"
              >
                <p 
                  className="text-lg md:text-xl italic text-primary/90"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  "True victory belongs to those who edit with soul."
                </p>
              </blockquote>
            </div>
          </AnimatedSection>

          {/* Impact Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-impact-heading"
              >
                Why It Matters
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                <p className="text-base leading-normal text-foreground/85">
                  This championship is more than competition — it's cultural evolution.
                  We aim to ignite a generation of creative editors who represent Mongolia globally.
                </p>
                <p className="text-base leading-normal text-foreground/85">
                  Our last events reached 50 million+ people online and inspired thousands to begin editing.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Sponsor & Partner Block */}
          <AnimatedSection>
            <div>
              {/* Golden Divider */}
              <div className="flex justify-center mb-12">
                <div className="w-24 h-0.5 bg-primary/40" />
              </div>

              <h2 
                className="text-2xl md:text-3xl font-bold text-center text-primary mb-8"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-partners-heading"
              >
                Partners & Supporters
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-base leading-normal text-foreground/85 text-center">
                  Curators collaborates with brands and foundations to empower young talent and spread creative culture.
                  Partnership opportunities include co-branding, content sponsorship, and mentorship programs.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Golden Divider */}
          <div className="flex justify-center">
            <div className="w-24 h-0.5 bg-primary/40" />
          </div>

          {/* CTA Block */}
          <AnimatedSection>
            <div className="text-center space-y-8">
              <p 
                className="text-xl md:text-2xl text-foreground/90 italic"
                style={{ fontFamily: 'Playfair Display, serif' }}
                data-testid="text-cta"
              >
                Join the movement. Inspire a generation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleRegisterClick}
                  className="text-base px-6 py-3"
                  data-testid="button-register"
                >
                  Register Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                
                <Button
                  asChild
                  variant="outline"
                  className="text-base px-6 py-3 bg-background/20 backdrop-blur-sm border-primary/40 hover:border-primary/60"
                  data-testid="button-partner"
                >
                  <a href="/contact">
                    Become a Partner
                    <Handshake className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
