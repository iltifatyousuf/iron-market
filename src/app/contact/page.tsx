'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      requirements: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      equipmentType: 'Contact Form', // Using existing inquiry schema
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 bg-neutral-950 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-lg text-neutral-400 mb-12">
              Have a question about the marketplace, interested in partnering, or need help finding a specific machine? Our team is here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-xl text-orange-500 mr-4">
                  📍
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Headquarters</h3>
                  <p className="text-neutral-400 leading-relaxed">
                    100 Industrial Parkway<br />
                    Suite 400<br />
                    Houston, TX 77002<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-xl text-orange-500 mr-4">
                  ✉️
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-neutral-400">support@ironmarket.example.com</p>
                  <p className="text-neutral-400">partnerships@ironmarket.example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center text-xl text-orange-500 mr-4">
                  📞
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-neutral-400">+1 (800) 555-IRON</p>
                  <p className="text-neutral-500 text-sm mt-1">Mon-Fri, 8am-6pm CST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Send a Message</h2>
            
            {submitted ? (
              <div className="text-center py-12 relative z-10">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent</h3>
                <p className="text-neutral-400">Thanks for reaching out! We'll get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-orange-500 hover:text-orange-400 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
                  <input type="text" id="name" name="name" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" placeholder="John Doe" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" required className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-300 mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
                  <textarea id="message" name="message" required rows={5} className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70 flex justify-center items-center h-12"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    'Send Message'
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
