'use client'
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
    {
        icon: MapPin,
        title: 'Visit Our Office',
        details: ['123 Nguyen Hue Street', 'District 1, Ho Chi Minh City', 'Vietnam'],
        action: 'Get Directions',
    },
    {
        icon: Phone,
        title: 'Call Us',
        details: ['+84 123 456 789', '+84 987 654 321'],
        action: 'Call Now',
    },
    {
        icon: Mail,
        title: 'Email Us',
        details: ['hello@vietroot.com', 'support@vietroot.com'],
        action: 'Send Email',
    },
    {
        icon: Clock,
        title: 'Business Hours',
        details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', 'Sunday: Closed'],
        action: null,
    },
];

const faqs = [
    {
        question: 'What makes your products organic?',
        answer: 'All our products are certified organic and sourced directly from farmers who follow strict organic farming practices without the use of synthetic pesticides or fertilizers.',
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. Please contact us for specific shipping information to your country.',
    },
    {
        question: 'How do you ensure product quality?',
        answer: 'We have strict quality control measures in place, including regular farm visits, third-party certifications, and thorough testing of all products before they reach our customers.',
    },
    {
        question: 'Can I visit your partner farms?',
        answer: 'We offer farm tours by appointment. Contact us to arrange a visit to see our sustainable farming practices firsthand and meet our partner farmers.',
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast({
                title: 'Message sent successfully!',
                description: "Thank you for contacting us. We'll respond within 24 hours.",
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-12 pb-3 md:pt-12 md:pb-8 bg-gradient-to-br from-viet-green-dark via-viet-green-medium to-viet-green-dark text-white relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-400"></div>
                    <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 animate-float shadow-2xl">
                            <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <h1
                            className="text-2xl md:text-4xl font-bold mb-8 animate-fade-in-up"
                            data-testid="text-contact-hero-title"
                        >
                            <span className="block bg-gradient-to-r from-white to-viet-earth-gold bg-clip-text text-transparent animate-gradient">
                                Get In Touch
                            </span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center p-6 bg-viet-earth-cream rounded-xl"
                                    data-testid={`contact-info-${index}`}
                                >
                                    <IconComponent className="text-viet-green-medium h-12 w-12 mx-auto mb-4" />
                                    <h3
                                        className="text-lg font-semibold text-viet-green-dark mb-3"
                                        data-testid={`contact-title-${index}`}
                                    >
                                        {info.title}
                                    </h3>
                                    <div className="space-y-1 text-gray-700 mb-4">
                                        {info.details.map((detail, detailIndex) => (
                                            <p
                                                key={detailIndex}
                                                data-testid={`contact-detail-${index}-${detailIndex}`}
                                            >
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                    {info.action && (
                                        <Button
                                            size="sm"
                                            className="bg-viet-green-medium hover:bg-viet-green-dark text-white"
                                            data-testid={`contact-action-${index}`}
                                        >
                                            {info.action}
                                        </Button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                        <div className="text-center mb-8">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
                                data-testid="text-contact-form-title"
                            >
                                Send Us a Message
                            </h2>
                            <p
                                className="text-lg text-gray-600"
                                data-testid="text-contact-form-subtitle"
                            >
                                Fill out the form below and we'll get back to you as soon as
                                possible
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                        data-testid="input-contact-name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                        data-testid="input-contact-email"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full"
                                        data-testid="input-contact-phone"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <Input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full"
                                        data-testid="input-contact-subject"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full"
                                    placeholder="Tell us how we can help you..."
                                    data-testid="textarea-contact-message"
                                />
                            </div>

                            <div className="text-center">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-viet-green-medium hover:bg-viet-green-dark text-white px-8 py-3 rounded-lg text-lg font-semibold"
                                    data-testid="button-send-message"
                                >
                                    <Send className="h-5 w-5 mr-2" />
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Quick Chat Option */}
            <section className="py-16 md:py-24 bg-viet-green-dark text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <MessageCircle className="h-16 w-16 mx-auto mb-6 text-viet-green-light" />
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        data-testid="text-quick-chat-title"
                    >
                        Need Immediate Help?
                    </h2>
                    <p
                        className="text-lg text-gray-300 mb-8"
                        data-testid="text-quick-chat-description"
                    >
                        Connect with us instantly via WhatsApp for quick questions and immediate
                        support.
                    </p>
                    <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                        data-testid="button-whatsapp-chat"
                    >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Chat on WhatsApp
                    </Button>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2
                            className="text-3xl md:text-4xl font-bold text-viet-green-dark mb-4"
                            data-testid="text-faq-title"
                        >
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600" data-testid="text-faq-subtitle">
                            Find quick answers to common questions about VietRoot
                        </p>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-viet-earth-cream rounded-xl p-6"
                                data-testid={`faq-${index}`}
                            >
                                <h3
                                    className="text-lg font-semibold text-viet-green-dark mb-3"
                                    data-testid={`faq-question-${index}`}
                                >
                                    {faq.question}
                                </h3>
                                <p className="text-gray-700" data-testid={`faq-answer-${index}`}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
