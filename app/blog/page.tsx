'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Button from '@/components/Button';
import Link from 'next/link';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Industry News', 'Case Studies', 'Technical', 'Sustainability', 'Innovation'];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Advancing Water Security Through Smart Infrastructure',
      excerpt: 'Exploring how IoT and AI technologies are revolutionizing water management systems across urban and rural communities.',
      category: 'Innovation',
      author: 'Dr. Rajesh Kumar',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: '/blog/smart-water.jpg',
      featured: true
    },
    {
      id: '2',
      title: 'Sustainable Wastewater Treatment: A Case Study from Maharashtra',
      excerpt: 'How we designed and implemented a zero-discharge wastewater treatment plant serving 50,000 residents.',
      category: 'Case Studies',
      author: 'Priya Sharma',
      date: 'March 10, 2024',
      readTime: '8 min read',
      image: '/blog/wastewater-case.jpg',
      featured: true
    },
    {
      id: '3',
      title: 'The Future of Rural Water Supply in India',
      excerpt: 'Examining challenges and opportunities in providing sustainable water solutions to rural communities.',
      category: 'Industry News',
      author: 'Arun Patel',
      date: 'March 5, 2024',
      readTime: '6 min read',
      image: '/blog/rural-water.jpg'
    },
    {
      id: '4',
      title: 'Understanding NRW: Reducing Water Loss in Distribution Networks',
      excerpt: 'Technical guide to identifying and addressing Non-Revenue Water in municipal water systems.',
      category: 'Technical',
      author: 'Eng. Vikram Singh',
      date: 'February 28, 2024',
      readTime: '10 min read',
      image: '/blog/nrw-technical.jpg'
    },
    {
      id: '5',
      title: 'Green Infrastructure for Stormwater Management',
      excerpt: 'Nature-based solutions that combine flood protection with urban beautification and ecosystem services.',
      category: 'Sustainability',
      author: 'Dr. Meera Nair',
      date: 'February 20, 2024',
      readTime: '7 min read',
      image: '/blog/green-infra.jpg'
    },
    {
      id: '6',
      title: 'Membrane Technology in Water Treatment: Latest Advances',
      excerpt: 'Review of cutting-edge membrane technologies and their applications in water and wastewater treatment.',
      category: 'Technical',
      author: 'Dr. Suresh Reddy',
      date: 'February 15, 2024',
      readTime: '12 min read',
      image: '/blog/membrane-tech.jpg'
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PageHero
        variant="primary"
        badge="Insights & Updates"
        title="Our Blog"
        description="Expert insights on water engineering, sustainability, and industry trends from our team of professionals."
      />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-10">Featured</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-80 bg-gradient-to-br from-[#005F73] to-[#00C9C9]">
                    {/* Placeholder for image with grid pattern */}
                    <div className="absolute inset-0 p-4">
                      <div className="grid grid-cols-2 gap-2 h-full">
                        <div className="space-y-2">
                          <div className="bg-white/20 rounded-lg h-[45%]"></div>
                          <div className="bg-white/20 rounded-lg h-[50%]"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white/20 rounded-lg h-[55%]"></div>
                          <div className="bg-white/20 rounded-lg h-[40%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                      <span className="font-medium text-[#00C9C9]">{post.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#005F73] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'category-active' : 'filter'}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-4xl font-bold text-[#2C3E50] mb-10">Latest Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              post.featured ? null : (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-64 bg-gradient-to-br from-[#005F73] to-[#00C9C9] overflow-hidden">
                    {/* Placeholder for image - larger collage style */}
                    <div className="absolute inset-0 p-4">
                      <div className="grid grid-cols-2 gap-2 h-full transform group-hover:scale-105 transition-transform duration-500">
                        <div className="space-y-2">
                          <div className="bg-white/20 rounded-lg h-[60%] overflow-hidden">
                            <div className="h-full w-full bg-white/10"></div>
                          </div>
                          <div className="bg-white/20 rounded-lg h-[35%] overflow-hidden">
                            <div className="h-full w-full bg-white/10"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="bg-white/20 rounded-lg h-[40%] overflow-hidden">
                            <div className="h-full w-full bg-white/10"></div>
                          </div>
                          <div className="bg-white/20 rounded-lg h-[55%] overflow-hidden">
                            <div className="h-full w-full bg-white/10"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="font-medium text-[#00C9C9]">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-3 group-hover:text-[#005F73] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-[#005F73] to-[#00C9C9] text-white">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights on water engineering and sustainability
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button
              type="submit"
              variant="secondary"
              size="md"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}