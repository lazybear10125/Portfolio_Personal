import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { ContactService } from '../../services/contactService';
import type { ContactFormData, ContactResponse } from '../../types';
import confetti from 'canvas-confetti';
import {
  Send,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  User,
  ShieldAlert,
  Inbox,
  Clock,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Admin Inquiries Inspection Modal / Drawer
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminContacts, setAdminContacts] = useState<ContactResponse[]>([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
    } else if (formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await ContactService.submitContact(formData);

      setIsSubmitting(false);
      setSubmitStatus('success');
      setStatusMessage(response.message || 'Thank you! Your message has been sent successfully to the server.');

      // Trigger celebratory confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#22D3EE', '#3B82F6', '#EC4899'],
        });
      } catch {
        // Safe fallback if canvas not available
      }

      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: unknown) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      if (err instanceof Error) {
        setStatusMessage(err.message);
      } else {
        setStatusMessage('Could not connect to the backend server. Please verify Spring Boot API is running on port 8080.');
      }
    }
  };

  const handleFetchAdminContacts = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError('');

    try {
      const encoded = btoa(`${adminUsername}:${adminPassword}`);
      const res = await ContactService.getContacts(encoded);
      setAdminContacts(res.data || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setAdminError(err.message);
      } else {
        setAdminError('Unauthorized or Backend connection failed.');
      }
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="05. GET IN TOUCH"
          title="Let's Build Something"
          highlightText="Extraordinary Together"
          subtitle="Interested in hiring, collaborating on scalable distributed architectures, or exploring modern frontend interfaces? Leave a message below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Information & Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>Direct Contact</span>
                <Sparkles className="w-5 h-5 text-cyan" />
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                I am currently open to full-time Senior Full-stack opportunities, backend architectural consulting, and high-impact engineering projects. Feel free to reach out directly.
              </p>

              {/* Contact Channels */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-cyan shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400">Email Address</p>
                    <a
                      href="mailto:alex.nguyen.dev@example.com"
                      className="text-white font-medium text-sm sm:text-base hover:text-cyan transition-colors"
                    >
                      alex.nguyen.dev@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-400">Current Base</p>
                    <p className="text-white font-medium text-sm sm:text-base">
                      Ho Chi Minh City, Vietnam (UTC+7)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Portal Inspection Trigger */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-slate-400">Administrator Review</p>
                  <p className="text-[11px] text-slate-400">Protected by Spring Security (GET /api/contacts)</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-dark-surface border border-white/10 hover:border-cyan text-xs font-mono text-cyan flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Connected to Spring Boot */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-fullName" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-cyan">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="contact-fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-surface/90 border text-white text-sm focus:outline-none transition-colors ${
                        formErrors.fullName
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-white/10 focus:border-cyan'
                      }`}
                    />
                  </div>
                  {formErrors.fullName && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-cyan">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@enterprise.com"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-surface/90 border text-white text-sm focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-white/10 focus:border-cyan'
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Subject <span className="text-cyan">*</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Project Architecture Inquiry / Senior Role Opportunity"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-surface/90 border text-white text-sm focus:outline-none transition-colors ${
                    formErrors.subject
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-white/10 focus:border-cyan'
                  }`}
                />
                {formErrors.subject && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.subject}
                  </p>
                )}
              </div>

              {/* Message Content */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Message Content <span className="text-cyan">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your project, timeline, or position requirements in detail..."
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-dark-surface/90 border text-white text-sm focus:outline-none transition-colors resize-none ${
                    formErrors.message
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-white/10 focus:border-cyan'
                  }`}
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit Feedback Banner */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-cyan text-white font-medium shadow-neon-purple hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Transmitting to Server...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Admin Review Inquiries Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminModal(false)}
              className="absolute inset-0 bg-dark-bg/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 z-10 border border-primary/40 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary/20 text-cyan">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Admin Inquiries Portal</h4>
                    <p className="text-xs text-slate-400 font-mono">Protected by Spring Security (HTTP Basic)</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="text-slate-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Admin Auth Form */}
              <form onSubmit={handleFetchAdminContacts} className="mb-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Username</label>
                    <input
                      type="text"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-white/10 text-white text-xs focus:border-cyan focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Password</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Default: admin123"
                      className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-white/10 text-white text-xs focus:border-cyan focus:outline-none"
                    />
                  </div>
                </div>

                {adminError && (
                  <div className="p-3 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{adminError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={adminLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  {adminLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Inbox className="w-3.5 h-3.5" />}
                  <span>Authenticate & Fetch Messages</span>
                </button>
              </form>

              {/* Contacts List Display */}
              <div className="space-y-3">
                <h5 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Received Contacts ({adminContacts.length})
                </h5>

                {adminContacts.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500 bg-dark-surface/40 rounded-xl border border-white/5">
                    No contacts loaded yet. Enter credentials to fetch messages.
                  </div>
                ) : (
                  adminContacts.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-xl bg-dark-surface border border-white/5 text-xs text-slate-300 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-cyan" /> {c.fullName}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(c.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-cyan font-mono">{c.email}</p>
                      <p className="font-medium text-slate-200">Subject: {c.subject}</p>
                      <p className="text-slate-400 whitespace-pre-wrap">{c.message}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
