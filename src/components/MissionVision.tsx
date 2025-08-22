import { Target, Eye, Leaf, Heart, Globe, Award, Users2, TrendingUp } from 'lucide-react';

const visionGoals = [
    {
        icon: Award,
        title: 'Market Leader',
        description:
            'Become the most trusted brand for Vietnamese organic products globally by 2030.',
    },
    {
        icon: Users2,
        title: 'Community Impact',
        description:
            'Partner with 1,000+ farmers and support 10,000+ rural families across Vietnam.',
    },
    {
        icon: TrendingUp,
        title: 'Sustainable Growth',
        description:
            'Achieve carbon-neutral operations while maintaining 100% organic certification.',
    },
];

export default function MissionVision() {
    return (
        <div>
            {/* Mission Section */}
            <section className="py-16 md:py-16 bg-gradient-to-br from-viet-green-dark to-viet-green-medium text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-6 animate-float">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                        <h2
                            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 animate-fade-in-up"
                            data-testid="text-mission-title"
                        >
                            Our Mission
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-white to-viet-earth-gold mx-auto rounded-full animate-fade-in-up animation-delay-200"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Mission Statement */}
                        <div className="space-y-8 animate-fade-in-up animation-delay-400">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                                <h3 className="text-2xl font-bold mb-6 text-center">
                                    Bringing Vietnam's Natural Treasures to the World
                                </h3>
                                <p className="text-lg leading-relaxed text-white/90 mb-6">
                                    At VietRoot, we bridge the gap between Vietnam's rich
                                    agricultural heritage and global consumers who value
                                    authenticity, quality, and sustainability. We empower local
                                    farmers while delivering premium organic products that tell the
                                    story of our beautiful homeland.
                                </p>
                                <p className="text-lg leading-relaxed text-white/90">
                                    Every product we offer carries the essence of Vietnamese soil,
                                    the dedication of our farmers, and our unwavering commitment to
                                    preserving traditional farming methods for future generations.
                                </p>
                            </div>
                        </div>

                        {/* Right - Mission Values */}
                        <div className="space-y-6 animate-fade-in-up animation-delay-600">
                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Leaf className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">
                                        Sustainable Agriculture
                                    </h4>
                                    <p className="text-white/80">
                                        Supporting eco-friendly farming practices that preserve our
                                        environment for future generations.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Heart className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">
                                        Farmer Empowerment
                                    </h4>
                                    <p className="text-white/80">
                                        Creating fair trade opportunities that improve livelihoods
                                        and strengthen rural communities.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                                <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Globe className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Global Reach</h4>
                                    <p className="text-white/80">
                                        Sharing Vietnam's natural bounty with health-conscious
                                        consumers around the world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-16 md:py-16 bg-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-viet-earth-cream to-white opacity-50"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-viet-green-light/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-viet-earth-gold/10 rounded-full blur-3xl"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-full mb-6 animate-float shadow-xl">
                            <Eye className="h-6 w-6 text-white" />
                        </div>
                        <h2
                            className="text-2xl md:text-3xl lg:text-4xl font-bold text-viet-green-dark mb-6 animate-fade-in-up"
                            data-testid="text-vision-title"
                        >
                            Our Vision
                        </h2>
                        <div className="w-32 h-1 bg-gradient-to-r from-viet-green-medium to-viet-earth-gold mx-auto rounded-full animate-fade-in-up animation-delay-200"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left - Vision Statement */}
                        <div className="space-y-8 animate-fade-in-up animation-delay-400">
                            <div className="bg-gradient-to-br from-white to-viet-earth-cream rounded-3xl p-8 shadow-2xl border border-viet-green-light/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-viet-green-medium/5 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="relative">
                                    <h3 className="text-3xl font-bold text-viet-green-dark mb-6 text-center">
                                        A World Connected by Nature's Goodness
                                    </h3>
                                    <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                        <p>
                                            We envision a future where Vietnamese organic products
                                            are recognized worldwide as symbols of quality,
                                            authenticity, and sustainable agriculture.
                                        </p>
                                        <p>
                                            Through innovation and tradition, we will create a
                                            global network that honors our farmers, protects our
                                            environment, and nourishes communities across
                                            continents.
                                        </p>
                                        <div className="bg-viet-green-medium/10 rounded-xl p-6 border-l-4 border-viet-green-medium">
                                            <p className="font-semibold text-viet-green-dark italic">
                                                "To be the bridge that brings Vietnam's agricultural
                                                heritage to every table in the world, creating
                                                prosperity for our farmers and wellness for our
                                                customers."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Vision Goals */}
                        <div className="space-y-8 animate-fade-in-up animation-delay-600">
                            <h3 className="text-2xl font-bold text-viet-green-dark text-center mb-8">
                                Our 2030 Goals
                            </h3>

                            <div className="space-y-6">
                                {visionGoals.map((goal, index) => {
                                    const IconComponent = goal.icon;
                                    return (
                                        <div
                                            key={index}
                                            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-viet-green-medium/30 relative overflow-hidden"
                                            style={{ animationDelay: `${(index + 1) * 200}ms` }}
                                        >
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-viet-green-medium/10 to-viet-earth-gold/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

                                            <div className="relative flex items-start space-x-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-viet-green-medium to-viet-green-dark rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                    <IconComponent className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-viet-green-dark mb-2 group-hover:text-viet-green-medium transition-colors duration-300">
                                                        {goal.title}
                                                    </h4>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {goal.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
