'use client';

import React, { useState } from 'react';

export default function LeadGenSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = {
      name:          (form.elements.namedItem('name') as HTMLInputElement).value,
      email:         (form.elements.namedItem('email') as HTMLInputElement).value,
      phone:         (form.elements.namedItem('phone') as HTMLInputElement).value,
      equipmentType: (form.elements.namedItem('type') as HTMLSelectElement).value,
      location:      (form.elements.namedItem('location') as HTMLInputElement).value,
      budget:        (form.elements.namedItem('budget') as HTMLInputElement).value,
      condition:     (form.elements.namedItem('condition') as HTMLSelectElement).value,
      requirements:  (form.elements.namedItem('requirements') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-32 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 md:p-12 lg:p-20 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Request Submitted!</h2>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto">
              Thank you. We&apos;ll review your equipment requirements and get back to you within 24 hours.
            </p>
            <button 
              onClick={() => setSubmitted(false)} 
              className="mt-8 border border-neutral-700 hover:bg-neutral-800 text-white px-8 py-3 rounded-lg transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8 md:p-12 lg:p-20 shadow-2xl relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Can&apos;t Find the Right Machine?</h2>
              <p className="text-lg text-neutral-400 mt-4">Tell us what you&apos;re looking for and we&apos;ll help you identify suitable equipment from our marketplace.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-neutral-300 mb-2 block">Full Name</label>
                  <input type="text" id="name" name="name" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-neutral-300 mb-2 block">Email Address</label>
                  <input type="email" id="email" name="email" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-neutral-300 mb-2 block">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label htmlFor="type" className="text-sm font-medium text-neutral-300 mb-2 block">Equipment Type</label>
                  <select id="type" name="type" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all appearance-none">
                    <option value="" disabled selected>Select equipment type</option>
                    <option value="excavator">Excavator</option>
                    <option value="bulldozer">Bulldozer</option>
                    <option value="wheel-loader">Wheel Loader</option>
                    <option value="crane">Crane</option>
                    <option value="dump-truck">Dump Truck</option>
                    <option value="forklift">Forklift</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="text-sm font-medium text-neutral-300 mb-2 block">Target Location</label>
                  <input type="text" id="location" name="location" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" placeholder="e.g., Dubai, UAE" />
                </div>
                <div>
                  <label htmlFor="budget" className="text-sm font-medium text-neutral-300 mb-2 block">Estimated Budget ($)</label>
                  <input type="text" id="budget" name="budget" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" placeholder="e.g., 150,000" />
                </div>
                <div>
                  <label htmlFor="condition" className="text-sm font-medium text-neutral-300 mb-2 block">Condition Preferred</label>
                  <select id="condition" name="condition" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all appearance-none">
                    <option value="any">Any Condition</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="requirements" className="text-sm font-medium text-neutral-300 mb-2 block">Specific Requirements</label>
                  <textarea id="requirements" name="requirements" rows={4} className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all resize-none" placeholder="Please describe any specific brands, models, hours, or features you are looking for..."></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 rounded-lg w-full md:w-auto transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
                >
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    'Request Equipment'
                  )}
                </button>
                <p className="text-xs text-neutral-500 text-center md:text-right">
                  Your information is secure and will not be shared with third parties.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
