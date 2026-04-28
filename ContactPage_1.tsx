'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SITE_CONFIG } from '@/constants/content';
import { Mail, Twitter, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// ─── Schema ────────────────────────────────────────────────────────────────────

const contactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  subject: z.string().min(1, 'Subject is required.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ─── Component ─────────────────────────────────────────────────────────────────

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Replace with your real API / email service call, e.g.:
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
      await new Promise((resolve) => setTimeout(resolve, 1500)); // simulated
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-lg border bg-white text-sm outline-none transition focus:ring-2 focus:ring-brand-primary focus:border-transparent';

  const inputClass = (hasError: boolean) =>
    hasError
      ? `${inputBase} border-red-400 focus:ring-red-400`
      : `${inputBase} border-gray-200`;

  return (
    <div className="bg-brand-background min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-primary mb-6">
            Get In Touch
          </h1>
          <div className="h-1 w-20 bg-brand-secondary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Details */}
          <div className="p-8 bg-brand-primary text-white rounded-3xl shadow-lg space-y-6">
            <h2 className="text-2xl font-serif font-bold">Contact Details</h2>

            <div className="flex items-center gap-4">
              <Mail size={20} aria-hidden="true" />
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-brand-secondary transition-colors"
                aria-label={`Send email to ${SITE_CONFIG.email}`}
              >
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Twitter size={20} aria-hidden="true" />
              <a
                href={`https://x.com/${SITE_CONFIG.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-secondary transition-colors"
                aria-label={`Visit Twitter profile @${SITE_CONFIG.twitter}`}
              >
                @{SITE_CONFIG.twitter}
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Linkedin size={20} aria-hidden="true" />
              <a
                href={`https://linkedin.com/in/${SITE_CONFIG.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-secondary transition-colors"
                aria-label="Visit LinkedIn profile"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-brand-surface p-8 rounded-3xl border border-gray-200 shadow-sm">

            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
                <CheckCircle size={48} className="text-green-500" />
                <h3 className="text-xl font-serif font-bold text-brand-primary">
                  Message Sent!
                </h3>
                <p className="text-gray-500 text-sm">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-2 text-sm text-brand-primary underline hover:text-brand-secondary transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                {/* Server error banner */}
                {submitStatus === 'error' && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                  >
                    <AlertCircle size={16} aria-hidden="true" />
                    Something went wrong. Please try again.
                  </div>
                )}

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span aria-hidden="true" className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      aria-required="true"
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      className={inputClass(!!errors.fullName)}
                      {...register('fullName')}
                    />
                    {errors.fullName && (
                      <p id="fullName-error" role="alert" className="text-red-500 text-xs mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span aria-hidden="true" className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={inputClass(!!errors.email)}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject <span aria-hidden="true" className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="What's this about?"
                    aria-required="true"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={inputClass(!!errors.subject)}
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="text-red-500 text-xs mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span aria-hidden="true" className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your message..."
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={inputClass(!!errors.message)}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} aria-hidden="true" />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
