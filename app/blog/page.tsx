'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
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
    <div className="min-h-screen bg-white">
      <Header />

      <PageHero
        variant="primary"
        badge="Insights & Updates"
        title="Our Blog"
        description="Expert insights on water engineering, sustainability, and industry trends from our team of professionals."
      />

      {/* Editorial Layout */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">

          {/* Featured Hero Article */}
          {featuredPosts.length > 0 && (
            <div className="mb-32">
              <Link href={`/blog/${featuredPosts[0].id}`} className="group block">
                <article className="grid lg:grid-cols-12 gap-16 items-start">
                  {/* Content Side */}
                  <div className="lg:col-span-7 space-y-8">
                    <div>
                      <h2 className="text-5xl lg:text-6xl font-bold text-[#2C3E50] leading-tight group-hover:text-[#005F73] transition-colors duration-500">
                        {featuredPosts[0].title}
                      </h2>
                      <p className="text-sm font-semibold text-[#00C9C9] uppercase tracking-wide mt-3">
                        {featuredPosts[0].category}
                      </p>
                    </div>

                    <p className="text-xl text-gray-600 leading-relaxed font-light">
                      {featuredPosts[0].excerpt}
                    </p>

                    <div className="flex items-center gap-4 pt-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-full"></div>
                      <div>
                        <p className="font-semibold text-[#2C3E50] text-lg">{featuredPosts[0].author}</p>
                        <p className="text-gray-500">{featuredPosts[0].date}</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="lg:col-span-5">
                    <div className="relative h-[500px] bg-gradient-to-br from-[#005F73] via-[#007A8F] to-[#00C9C9] rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                      {/* Water ripple effect */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/30 rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-white/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 border border-white/25 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* All Articles Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[#2C3E50] mb-4">Latest Articles</h2>
            <p className="text-lg text-gray-600 mb-8">Explore our latest insights and industry updates</p>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-[#005F73] text-white border-[#005F73] shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-[#005F73] hover:text-[#005F73] hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Three-Column Equal Blog Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => !post.featured).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block"
              >
                <article className="space-y-6">
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-[#005F73] to-[#00C9C9] rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#00C9C9] uppercase tracking-wide mb-2">
                        {post.category}
                      </p>
                      <h3 className="text-xl font-bold text-[#2C3E50] group-hover:text-[#005F73] transition-colors duration-300 leading-tight">
                        {post.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-screen-2xl">
          <CTASection
            title="Join the Conversation"
            description="Get exclusive insights, case studies, and industry updates from our water engineering experts."
            primaryButtonText="Subscribe to Updates"
            primaryButtonHref="/contact"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}