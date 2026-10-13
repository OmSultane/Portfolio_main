import React, { useState } from 'react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodeChefIcon } from './Icons';
import { Send, Copy, Check, AlertCircle, Sparkles, MapPin } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format (e.g., name@example.com).';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please provide a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide a message of at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFormStatus('error');
      setStatusMessage('Please fix the highlighted errors before submitting.');
      return;
    }

    // Using real mailto dispatch so no fake success is reported without delivery
    const mailtoUrl = `mailto:${portfolioConfig.contact.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;

    setFormStatus('submitted');
    setStatusMessage(
      'Your default email client has been prepared with your message! If it did not open automatically, you can directly email me at ' +
        portfolioConfig.contact.email
    );
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Have an Opportunity or Idea?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            I'm always interested in learning, building useful projects, and connecting with people in tech.
          </p>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Email Card with Copy button */}
              <div className="p-5 rounded-2xl bg-[#0c0f1a] border border-white/[0.07] hover:border-indigo-500/30 transition-all">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <a
                    href={`mailto:${portfolioConfig.contact.email}`}
                    className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors break-all"
                  >
                    {portfolioConfig.contact.email}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] shrink-0 transition-colors"
                    title="Copy Email Address"
                    aria-label="Copy Email"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <span className="text-[11px] font-mono text-emerald-400 mt-1 block">
                    ✓ Copied to clipboard
                  </span>
                )}
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-[#0c0f1a] border border-white/[0.07]">
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Location & Campus
                </span>
                <div className="flex items-center gap-2.5 mt-2 text-sm text-slate-200">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>{portfolioConfig.personal.college}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 pl-6.5">
                  {portfolioConfig.personal.location}
                </p>
              </div>

              {/* Social Channels */}
              <div className="p-5 rounded-2xl bg-[#0c0f1a] border border-white/[0.07]">
                <span className="text-xs font-mono text-slate-400 block mb-3">
                  Professional & Coding Profiles
                </span>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={portfolioConfig.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <GithubIcon className="w-4 h-4 text-indigo-400" />
                      <span>GitHub: @OmSultane</span>
                    </div>
                    <span className="text-xs text-indigo-400 font-mono">&rarr;</span>
                  </a>

                  <a
                    href={portfolioConfig.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <LinkedinIcon className="w-4 h-4 text-indigo-400" />
                      <span>LinkedIn Profile</span>
                    </div>
                    <span className="text-xs text-indigo-400 font-mono">&rarr;</span>
                  </a>

                  <a
                    href={portfolioConfig.contact.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <LeetCodeIcon className="w-4 h-4 text-amber-400" />
                      <span>LeetCode Profile</span>
                    </div>
                    <span className="text-xs text-amber-400 font-mono">&rarr;</span>
                  </a>

                  <a
                    href={portfolioConfig.contact.codechef}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <CodeChefIcon className="w-4 h-4 text-amber-300" />
                      <span>CodeChef Profile</span>
                    </div>
                    <span className="text-xs text-amber-300 font-mono">&rarr;</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Note on availability */}
            <div className="mt-6 p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-400 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                Currently open to software engineering internships, technical collaborations, and discussing Java backend projects.
              </span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0f1a] border border-white/[0.07] shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below to initiate direct communication via email.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Sharma"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-slate-400 border focus:outline-none transition-all ${
                      errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-white/[0.08] focus:border-indigo-500'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-slate-400 border focus:outline-none transition-all ${
                      errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-white/[0.08] focus:border-indigo-500'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Internship Opportunity / Collaboration"
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-slate-400 border focus:outline-none transition-all ${
                      errors.subject ? 'border-rose-500 focus:border-rose-400' : 'border-white/[0.08] focus:border-indigo-500'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] text-rose-400 mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/[0.03] text-sm text-white placeholder-slate-400 border focus:outline-none transition-all resize-none ${
                      errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-white/[0.08] focus:border-indigo-500'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
                </div>

                {/* Status Alert */}
                {formStatus === 'submitted' && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
