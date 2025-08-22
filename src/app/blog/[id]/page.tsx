'use client'
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Calendar, User, ArrowLeft, Share2, Heart, MessageCircle, ChevronRight, Tag, Clock, Eye, ThumbsUp, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {useRoute} from 'wouter'
// Mock blog data based on id
const getBlogById = (id: string) => {
  const blogs: Record<string, any> = {
    "1": {
      id: 1,
      title: "The Ancient Art of Vietnamese Tea Ceremony",
      excerpt: "Discover the cultural significance and health benefits of traditional Vietnamese tea ceremonies, passed down through generations.",
      content: `
        <p>Vietnamese tea culture dates back over 1,000 years, deeply woven into the fabric of our daily life and social customs. More than just a beverage, tea represents a philosophy of mindfulness, community, and connection to nature that has sustained Vietnamese people through centuries of change.</p>

        <h2>The Origins of Vietnamese Tea Culture</h2>
        <p>Tea cultivation in Vietnam began in the northern mountainous regions, where the cool climate and rich soil created perfect conditions for growing exceptional tea. The ethnic minorities of the region, particularly the H'mong and Thai people, were among the first to discover and cultivate wild tea plants.</p>

        <p>Over time, tea drinking evolved from a practical necessity to an art form. The Vietnamese tea ceremony, known as "Trà đạo," emphasizes simplicity, respect, and mindful presence. Unlike the elaborate ceremonies found in some cultures, Vietnamese tea culture focuses on creating genuine connections between people.</p>

        <h2>The Ritual and Its Meaning</h2>
        <p>A traditional Vietnamese tea ceremony begins with careful preparation. The tea master selects the finest leaves, often from specific harvests that capture the essence of the season. Water temperature, steeping time, and the sequence of serving all carry deep significance.</p>

        <blockquote>"In every cup of tea, we taste the earth, the rain, the sunshine, and the dedication of those who cultivated it. This is the true gift of tea - it connects us to the natural world and to each other." - Master Tea Artisan Nguyen Van Minh</blockquote>

        <p>The ceremony typically involves multiple rounds of brewing, with each steep revealing different flavor notes and characteristics of the tea. Participants sit in a circle, sharing not just tea but stories, wisdom, and companionship.</p>

        <h2>Health Benefits Rooted in Tradition</h2>
        <p>Vietnamese traditional medicine has long recognized tea's therapeutic properties. Green tea, in particular, is prized for its antioxidant content and ability to promote mental clarity. Oolong teas are favored for their balance of flavor and health benefits, while aged pu-erh teas are valued for their digestive properties.</p>

        <ul>
          <li><strong>Mental Clarity:</strong> The combination of caffeine and L-theanine in tea promotes alert calmness</li>
          <li><strong>Digestive Health:</strong> Traditional aged teas support healthy digestion</li>
          <li><strong>Antioxidant Power:</strong> High levels of catechins and polyphenols protect cellular health</li>
          <li><strong>Social Wellness:</strong> The communal aspect of tea drinking strengthens social bonds</li>
        </ul>

        <h2>Modern Applications of Ancient Wisdom</h2>
        <p>Today's busy world has renewed interest in the mindful practices of traditional tea ceremony. Many Vietnamese families continue to gather for tea, especially during festivals and family celebrations. The practice has also found new life in urban tea houses and wellness centers.</p>

        <p>At VietRoot, we honor these traditions by sourcing our teas directly from small family farms that have maintained organic growing practices for generations. Each package of our premium green tea carries with it centuries of wisdom and care.</p>

        <h2>Starting Your Own Tea Practice</h2>
        <p>You don't need elaborate equipment to begin your own tea journey. Start with high-quality loose leaf tea, a simple teapot or gaiwan, and most importantly, the intention to be present and mindful. Set aside time each day for this ritual - even five minutes can make a difference in your overall well-being.</p>

        <p>As you develop your practice, you'll discover that tea ceremony is not about perfection, but about presence. Each cup offers an opportunity to slow down, breathe deeply, and connect with the moment.</p>
      `,
      author: "Mai Nguyen",
      authorBio: "Tea ceremony master and cultural preservation advocate with over 15 years of experience in traditional Vietnamese tea arts.",
      authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b187?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      date: "2024-03-15",
      readTime: "8 min read",
      category: "culture",
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      tags: ["Tea", "Culture", "Tradition", "Health", "Mindfulness"],
      views: 2847,
      likes: 156,
      comments: 23,
      publishedDate: "March 15, 2024",
      lastUpdated: "March 16, 2024"
    },
    "2": {
      id: 2,
      title: "Meet Farmer Duc: Guardian of Wild Honey Traditions",
      excerpt: "Learn about Nguyen Van Duc's family legacy of wild honey harvesting in the pristine mountains of Ha Giang province.",
      content: `
        <p>High in the mountains of Ha Giang province, where mist dances between ancient limestone peaks and wildflowers carpet the valleys, Nguyen Van Duc continues a tradition that has sustained his family for three generations. As dawn breaks over the remote village of Dong Van, Duc prepares for another day of wild honey harvesting - a practice that requires equal parts courage, patience, and deep respect for nature.</p>

        <h2>A Legacy Written in Golden Nectar</h2>
        <p>Duc's grandfather first discovered the art of wild honey harvesting in the 1960s, when the family's survival depended on the forest's bounty. "My grandfather taught my father, and my father taught me," Duc explains, his weathered hands gesturing toward the towering cliffs where wild bees have built their homes for countless years. "Each generation adds to the knowledge, but we never take more than nature offers."</p>

        <p>The bees of Ha Giang are not ordinary honeybees. These are wild Asian honeybees (Apis dorsata), known for building their enormous combs on the faces of limestone cliffs, sometimes hundreds of meters above the ground. The honey they produce is unlike any other - dark amber in color, intensely flavorful, and imbued with the essence of hundreds of wild mountain flowers.</p>

        <h2>The Dangerous Dance of Harvest</h2>
        <p>Harvesting wild honey is not for the faint of heart. Duc and his team use traditional bamboo ladders and ropes to scale the treacherous cliff faces, often in complete darkness to avoid disturbing the bees during their active hours. The work requires years of training and an intimate understanding of bee behavior.</p>

        <blockquote>"The bees are our teachers," Duc says with reverence. "They show us when the honey is ready, when the flowers are blooming, when the season is changing. We are just grateful students in their classroom."</blockquote>

        <p>The harvesting season is short and precious, typically lasting only a few weeks in late spring when the mountain flowers are at their peak. Duc's family follows strict sustainable practices, taking only a portion of each hive's honey and leaving enough for the bees to survive and thrive.</p>

        <h2>Partnership with VietRoot: Preserving Tradition</h2>
        <p>Three years ago, Duc's life changed when he partnered with VietRoot. Before this partnership, he struggled to find buyers who truly understood the value of wild honey and were willing to pay fair prices for his dangerous and time-intensive work.</p>

        <p>"VietRoot doesn't just buy our honey," Duc explains. "They understand our story, they respect our methods, and they help us share our tradition with the world." This partnership has allowed Duc to invest in safety equipment for his team and ensure that his knowledge passes to the next generation.</p>

        <h2>The Science Behind the Magic</h2>
        <p>Wild Ha Giang honey is more than just delicious - it's a powerhouse of natural compounds that reflect the biodiversity of its origin. Laboratory analyses reveal:</p>

        <ul>
          <li><strong>Unique Enzyme Profiles:</strong> Wild processing creates enzyme combinations not found in commercial honey</li>
          <li><strong>High Antioxidant Content:</strong> The diverse floral sources contribute to exceptional antioxidant levels</li>
          <li><strong>Natural Antimicrobials:</strong> Compounds that support immune system health</li>
          <li><strong>Mineral Richness:</strong> Trace minerals from the limestone environment</li>
        </ul>

        <h2>Challenges and Conservation</h2>
        <p>Climate change and environmental pressures threaten the delicate ecosystem that supports wild honey production. Duc has become an advocate for conservation, working with local authorities to protect the flowering trees and plants that sustain the bee colonies.</p>

        <p>"If we lose the forest, we lose the bees. If we lose the bees, we lose our way of life," he reflects. "That's why every jar of honey carries the responsibility to protect this place."</p>

        <h2>Looking to the Future</h2>
        <p>Duc's son, now 19, is learning the family trade, though he brings modern safety techniques and environmental monitoring to the ancient practice. "Tradition must grow and adapt," Duc says with pride, "but its heart must remain the same."</p>

        <p>Through VietRoot's platform, customers around the world can now taste this liquid gold and support the preservation of an extraordinary tradition. Each purchase directly supports Duc's family and the conservation efforts that protect Ha Giang's unique ecosystem.</p>

        <p>When you open a jar of Wild Ha Giang Honey, you're not just tasting honey - you're experiencing the culmination of generations of knowledge, the essence of an untouched landscape, and the dedication of people like Duc who risk everything to preserve what matters most.</p>
      `,
      author: "VietRoot Team",
      authorBio: "Our team works directly with farmers and artisans to share their incredible stories and preserve Vietnamese agricultural traditions.",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      date: "2024-03-10",
      readTime: "10 min read",
      category: "farmers",
      image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
      tags: ["Farmers", "Honey", "Ha Giang", "Tradition", "Sustainability"],
      views: 3421,
      likes: 203,
      comments: 31,
      publishedDate: "March 10, 2024",
      lastUpdated: "March 10, 2024"
    }
  };
  
  return blogs[id] || blogs["1"];
};

const relatedPosts = [
  {
    id: 3,
    title: "Turmeric: The Golden Root of Wellness",
    excerpt: "Explore the incredible health benefits of Vietnamese turmeric...",
    image: "https://images.unsplash.com/photo-1615485499601-773e0eb7f0f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    category: "wellness",
    readTime: "6 min read",
    date: "2024-03-08"
  },
  {
    id: 4,
    title: "Sustainable Farming: Our Commitment to the Earth",
    excerpt: "How VietRoot partners support environmental conservation...",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    category: "sustainability",
    readTime: "5 min read",
    date: "2024-03-05"
  },
  {
    id: 5,
    title: "The Art of Vietnamese Spice Blending",
    excerpt: "Discover the secrets behind our traditional spice combinations...",
    image: "https://images.unsplash.com/photo-1596040827120-68b088d77665?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
    category: "culture",
    readTime: "7 min read",
    date: "2024-03-01"
  }
];

export default function BlogDetail() {
  const [match, params] = useRoute("/blog/:id");
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  if (!match) {
    return <div>Blog post not found</div>;
  }

  const post = getBlogById(params.id);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-viet-green-dark transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-viet-green-dark transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Article</span>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
          data-testid="img-blog-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-8 left-8">
          <Badge className="bg-viet-green-dark text-white px-4 py-2 text-sm font-medium capitalize">
            {post.category}
          </Badge>
        </div>
        
        {/* Article Meta */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" data-testid="text-blog-title">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-4xl" data-testid="text-blog-excerpt">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{post.publishedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Author Info */}
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg mb-8">
                <img 
                  src={post.authorImage} 
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{post.author}</h3>
                  <p className="text-gray-600 text-sm">{post.authorBio}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>Published {post.publishedDate}</span>
                    {post.lastUpdated !== post.publishedDate && (
                      <span>• Updated {post.lastUpdated}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="article-content"
                  data-testid="text-blog-content"
                />
              </div>

              {/* Tags */}
              <div className="mt-12 p-6 bg-viet-green-light/20 rounded-2xl">
                <h4 className="font-semibold text-gray-900 mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-viet-green-dark text-white">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share & Like */}
              <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => setIsLiked(!isLiked)}
                      variant={isLiked ? "default" : "outline"}
                      className={`${isLiked ? 'bg-red-500 hover:bg-red-600 text-white' : ''}`}
                      data-testid="button-like-post"
                    >
                      <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? post.likes + 1 : post.likes} Likes
                    </Button>
                    
                    <Button
                      onClick={() => setShowCommentForm(!showCommentForm)}
                      variant="outline"
                      data-testid="button-comment"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      {post.comments} Comments
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 mr-2">Share:</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare('facebook')}
                      className="p-2"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare('twitter')}
                      className="p-2"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare('linkedin')}
                      className="p-2"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comment Form */}
              {showCommentForm && (
                <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg">
                  <h4 className="font-semibold text-xl mb-6">Leave a Comment</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        data-testid="input-comment-name"
                      />
                      <Input
                        placeholder="Your Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-testid="input-comment-email"
                      />
                    </div>
                    <Textarea
                      placeholder="Your comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      data-testid="textarea-comment"
                    />
                    <Button className="bg-viet-green-dark hover:bg-viet-green-medium text-white" data-testid="button-submit-comment">
                      Post Comment
                    </Button>
                  </div>
                </div>
              )}

              {/* Sample Comments */}
              <div className="mt-8 space-y-6">
                <h4 className="font-semibold text-xl">Comments ({post.comments})</h4>
                
                {[
                  {
                    name: "Linh Tran",
                    date: "2 days ago",
                    comment: "Beautiful article! As someone who grew up drinking tea with my grandmother, this really resonates with me. Thank you for preserving these important traditions."
                  },
                  {
                    name: "James Mitchell",
                    date: "3 days ago",
                    comment: "I recently started a daily tea practice after reading about its benefits. This article gives me a deeper appreciation for the cultural significance behind it."
                  },
                  {
                    name: "Phuong Nguyen",
                    date: "5 days ago",
                    comment: "My family has been making tea this way for generations. It's wonderful to see our traditions being shared with the world through VietRoot's platform."
                  }
                ].map((comment, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-gray-900">{comment.name}</h5>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Table of Contents */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="font-semibold text-lg mb-4">Table of Contents</h4>
                  <nav className="space-y-2">
                    <a href="#origins" className="block text-sm text-gray-600 hover:text-viet-green-dark transition-colors">
                      The Origins of Vietnamese Tea Culture
                    </a>
                    <a href="#ritual" className="block text-sm text-gray-600 hover:text-viet-green-dark transition-colors">
                      The Ritual and Its Meaning
                    </a>
                    <a href="#benefits" className="block text-sm text-gray-600 hover:text-viet-green-dark transition-colors">
                      Health Benefits Rooted in Tradition
                    </a>
                    <a href="#modern" className="block text-sm text-gray-600 hover:text-viet-green-dark transition-colors">
                      Modern Applications
                    </a>
                    <a href="#practice" className="block text-sm text-gray-600 hover:text-viet-green-dark transition-colors">
                      Starting Your Own Tea Practice
                    </a>
                  </nav>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-viet-green-dark to-viet-green-medium text-white p-6 rounded-2xl">
                  <h4 className="font-semibold text-lg mb-3">Stay Updated</h4>
                  <p className="text-viet-green-light mb-4 text-sm">
                    Get the latest articles about Vietnamese culture and organic products delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Your email"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button className="w-full bg-white text-viet-green-dark hover:bg-gray-100">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                <article className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-viet-green-light text-viet-green-dark capitalize">
                        {relatedPost.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{relatedPost.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}