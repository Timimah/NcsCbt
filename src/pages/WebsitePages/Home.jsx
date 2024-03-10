import React, { useEffect, useState } from 'react';
import { Button } from '../../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import ncs from '../../assets/ncs.png';
import screenshot from '../../assets/quizscreen.png';
import flower from '../../assets/flower.png'
import flowr from '../../assets/flowr.png'
import quote from '../../assets/quote.png';
import { Card } from '../../components/website/Card';
import { Cbt } from '../../components/user/Cbt';
import { Pq } from '../../components/user/PQ';
import { Time } from '../../components/user/Time';
import { User } from '../../components/user/USER';
import { Data } from '../../components/user/Data';
import { TestimonialCard } from '../../components/website/TestimonialCard';
import { PricingTable } from '../../components/website/PricingTable';
import { Contact } from '../../components/website/Contact';
import { Footer } from '../../components/website/Footer';

const featured = [
  {
    icon: <Cbt />,
    title: "CBT Mock Exams",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?"
  },
  {
    icon: <Pq />,
    title: "Past Questions",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?"
  },
  {
    icon: <Time />,
    title: "Manage your Time",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?"
  },
  {
    icon: <User />,
    title: "User Friendly",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?"
  },
  {
    icon: <Data />,
    title: "Less Data",
    content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta obcaecati quis reiciendis repellendus incidunt recusandae?"
  }
]

const testimonials = [
  {
    name: 'Floyd Miles',
    title: 'Vice President, GoPro',
    testimonial: 'Arrow team underline scrolling list community strikethrough component inspect. Reesizing reesizing horizontal stroke polygon prototype. Follower style edit bullet content layout duplicate strikethrough.',
  },
  {
    name: 'Jane Cooper',
    title: 'CEO, Airbnb',
    testimonial: 'Connection edit duplicate shadow underline. Distribute duplicate scale scale polygon clip device. Align horizontal inspect overflow union stroke horizontal rectangle. Create.',
  },
  {
    name: 'Kristin Watson',
    title: 'Co-Founder, Strap',
    testimonial: 'Effect edit auto main figjam thumbnail. Hand outline.',
  },
];

export const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <div className="">
        <img className='absolute right-0' src={flower} alt="flower" />
        <img className='absolute -bottom-96' src={flowr} alt="flower" />
      </div>
      <header className={`fixed inset-0 py-8 px-10 h-24 ${isScrolled ? 'bg-story' : ''}`}>
        <nav className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-bold ml-5 cursor-pointer" onClick={() => navigate('/')}>
            <img src={ncs} alt="" />
            <span className='font-bold text-2xl text-primary'>NCSCBT</span>
          </div>
          <ul className="flex text-lg space-x-10 font-bold">
            <li><a href="#" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#" onClick={() => scrollToSection('about')}>About us</a></li>
            <li><a href="#" onClick={() => scrollToSection('pricing')}>Pricing</a></li>
            <li><a href="#" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
          <div className='flex w-1/3'>
            <Button title="Create Account" btnStyles="w-full border border-primary text-blue-primary px-4 py-3 rounded-md mr-4 font-bold text-primary" btnClick={() => { navigate('/create-account') }} />
            <Button title="Sign in" btnStyles="w-full bg-primary text-white px-4 py-3 rounded-md mr-4 font-bold" btnClick={() => { navigate('/login') }} />
          </div>
        </nav>
      </header>

      <main className="flex-grow mt-24">
        <section id="home" className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold mb-4 text-primary">Nigeria Customs Service 2024 CBT Practice </h1>
            <span className='text-sm'>Get Yourself Prepared For NCS 2024 CBT Exams to Get High Score</span>
            <Button title="Get Started" btnStyles="px-4 py-3 rounded-md bg-primary text-white my-8" btnClick={() => navigate('/create-account')} />
            <img src={screenshot} alt="Application Screenshot" className="mx-auto my-8" />
          </div>
        </section>

        <section id="about" className="text-center py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl text-primary font-bold mb-8">What we've achieved so far <br /> <span className='text-sm font-normal'>Register with us today to get rid of the fear of using a computer</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              <div className="p-6">
                <p className="text-4xl text-yellow font-bold">1894+</p>
                <h3 className="w-full">Total Number of Questions</h3>
              </div>
              <div className="p-6">
                <p className="text-4xl text-yellow font-bold">3M</p>
                <h3 className="">Active Users</h3>
              </div>
              <div className="p-6">
                <p className="text-4xl text-yellow font-bold">1M</p>
                <h3 className="">Total Users</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-2 text-primary">Features</h2>
            <span className='text-sm'>Link rectangle rotate undo boolean boolean. Library project stroke line thumbnail. Background opacity star polygon object reesizing image star bullet. </span>
            <div className='grid grid-cols-2 md:grid-cols-3 items-center justify-center gap-8 mx-auto py-10'>
              {featured.map((feature, index) => (
                <Card key={index} title={feature.title} content={feature.content} icon={feature.icon} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-story py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <img className='inset-0 -ml-32' src={quote} alt={quote} />
            <div className='-ml-24 -mt-12'>
              <div className="text-6xl font-bold">Real stories from real customers</div>
              <span className='text-sm font-normal'>Get inspired by these stories</span></div>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`${index === 1 ? 'col-span-2' : ''}`}>
                  <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    title={testimonial.title}
                    testimonial={testimonial.testimonial}
                    isLarge={index === 1}
                  />
                </div>
              ))}
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              {testimonials.map((testimonial, index) => {
                if (index === 0) {
                  return (
                    <div key={index} className="md:col-span-2">
                      <TestimonialCard
                        name={testimonial.name}
                        title={testimonial.title}
                        testimonial={testimonial.testimonial}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <TestimonialCard
                        name={testimonial.name}
                        title={testimonial.title}
                        testimonial={testimonial.testimonial}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>

        <section id='pricing' className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl font-bold text-primary">Pricing</div>
            <span className='text-sm font-normal'>Editor share clip share pencil distribute content component. Undo duplicate bold strikethrough flatten invite selection duplicate main. Asset font shadow select follower.</span>
            <div>
              <PricingTable />
            </div>
          </div>
        </section>

        <section id='contact' className="py-20 w-full">
          <Contact />
        </section>

      </main>

      {/* <footer className="bg-gray-800 text-white py-4 px-6">
        <div className="max-w-3xl mx-auto text-center">
          &copy; 2023 Nigeria Customs Service 2024 CBT Practice. All rights reserved.
        </div>
      </footer> */}
      <Footer abtClick={() => scrollToSection('about')} contactClick={() => scrollToSection('contact')} />
    </div>
  );
}
