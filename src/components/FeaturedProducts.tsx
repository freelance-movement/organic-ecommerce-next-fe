'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
    {
        id: 1,
        name: 'Dried Mango Slices',
        description: 'Natural sweetness, no preservatives',
        price: '₫180,000',
        originalPrice: '₫220,000',
        image: 'https://images.unsplash.com/photo-1553279030-83ba509d4d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        alt: 'Dried Mango Slices',
        badge: 'Bestseller',
    },
    {
        id: 2,
        name: 'Dried Dragon Fruit',
        description: 'Rich in antioxidants, crispy texture',
        price: '₫250,000',
        image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        alt: 'Dried Dragon Fruit',
        badge: 'Premium',
    },
    {
        id: 3,
        name: 'Dried Jackfruit Chips',
        description: 'Sweet & natural, crunchy delight',
        price: '₫160,000',
        image: 'https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        alt: 'Dried Jackfruit Chips',
        badge: 'Organic',
    },
    {
        id: 4,
        name: 'Dried Banana Chips',
        description: 'Golden crispy, naturally sweet',
        price: '₫140,000',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300',
        alt: 'Dried Banana Chips',
        badge: 'Popular',
    },
];

export default function FeaturedProducts() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const productsPerSlide = 3; // Show 3 products per slide for desktop, 2 for mobile
    const totalSlides = Math.ceil(products.length / productsPerSlide);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalSlides, isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <section className="py-16 md:py-16 bg-gray-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-viet-green-light/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-viet-earth-gold/10 rounded-full blur-3xl animate-float animation-delay-600"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-2xl">
                        <ShoppingCart className="h-6 w-6 text-white" />
                    </div>
                    <h2
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
                        data-testid="text-products-title"
                    >
                        Our Most Loved Products
                    </h2>
                    <p
                        className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200"
                        data-testid="text-products-subtitle"
                    >
                        Handpicked organic treasures from across Vietnam, bringing you the finest
                        natural flavors
                    </p>
                    <div className="w-32 h-2 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold mx-auto rounded-full mt-6 animate-fade-in-up animation-delay-400 shadow-lg"></div>
                </div>

                {/* Universal Product Slider - All Devices */}
                <div className="relative">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-viet-green-light/30">
                        <div className="relative overflow-hidden rounded-2xl">
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                    <div key={slideIndex} className="w-full flex-shrink-0">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                                            {products
                                                .slice(
                                                    slideIndex * productsPerSlide,
                                                    (slideIndex + 1) * productsPerSlide
                                                )
                                                .map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group relative border border-gray-100"
                                                        data-testid={`card-product-${product.id}`}
                                                    >
                                                        {/* Badge */}
                                                        <div className="absolute top-3 left-3 z-10">
                                                            <span className="bg-gradient-to-r from-viet-green-medium to-viet-green-dark text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                                                                {product.badge}
                                                            </span>
                                                        </div>

                                                        {/* Image Container */}
                                                        <div className="relative overflow-hidden">
                                                            <img
                                                                src={product.image}
                                                                alt={product.alt}
                                                                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                                                data-testid={`img-product-${product.id}`}
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                        </div>

                                                        <div className="p-6 space-y-4">
                                                            {/* Price Section - Moved to Top */}
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex flex-col">
                                                                    <span
                                                                        className="text-2xl font-bold text-viet-green-medium"
                                                                        data-testid={`text-product-price-${product.id}`}
                                                                    >
                                                                        {product.price}
                                                                    </span>
                                                                    {product.originalPrice && (
                                                                        <span className="text-sm text-gray-400 line-through">
                                                                            {product.originalPrice}
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                <Button
                                                                    size="sm"
                                                                    className="bg-gradient-to-r from-viet-green-medium to-viet-green-dark hover:from-viet-green-dark hover:to-viet-green-medium text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                                                                    data-testid={`button-add-to-cart-${product.id}`}
                                                                >
                                                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                                                    Add
                                                                </Button>
                                                            </div>

                                                            <h3
                                                                className="text-lg font-bold text-gray-800 group-hover:text-viet-green-dark transition-colors duration-300"
                                                                data-testid={`text-product-name-${product.id}`}
                                                            >
                                                                {product.name}
                                                            </h3>

                                                            <p
                                                                className="text-gray-600 text-sm leading-relaxed"
                                                                data-testid={`text-product-description-${product.id}`}
                                                            >
                                                                {product.description}
                                                            </p>
                                                        </div>

                                                        {/* Hover Effect Border */}
                                                        <div className="absolute inset-0 rounded-2xl border-2 border-viet-green-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={prevSlide}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            data-testid="button-prev-slide"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={nextSlide}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-viet-green-dark rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300"
                            data-testid="button-next-slide"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>

                        {/* Dot Indicators */}
                        <div className="flex justify-center space-x-3 mt-6">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide
                                            ? 'bg-viet-green-medium scale-125 shadow-lg'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    data-testid={`dot-indicator-${index}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* View All Products Button */}
                <div className="text-center mt-16">
                    <Button
                        className="bg-gradient-to-r from-viet-green-dark to-viet-green-medium hover:from-viet-green-medium hover:to-viet-green-dark text-white px-12 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
                        data-testid="button-view-all-products"
                    >
                        View All Products
                        <ArrowRight className="h-5 w-5 ml-3" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
