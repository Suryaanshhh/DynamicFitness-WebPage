import { Header } from "./Header";
import Squares from './Squares';
import { useState } from 'react';

export const LandingPage = () => {
    const [activeTab, setActiveTab] = useState('strength');
    const [showMembershipPlans, setShowMembershipPlans] = useState(false);
    const [validityPeriod, setValidityPeriod] = useState('1month');
    
    const workoutPlans = {
        strength: {
            title: "Power & Strength",
            description: "Build muscle and increase strength with our specialized strength training programs.",
            highlights: [
                "5x5 Compound Lift Program",
                "Powerlifting Fundamentals",
                "Strength & Hypertrophy Split"
            ]
        },
        cardio: {
            title: "Cardio & Endurance",
            description: "Improve your cardiovascular health and burn calories with our diverse cardio options.",
            highlights: [
                "HIIT Circuit Training",
                "Endurance Building Program",
                "Fat Burning Cardio Series"
            ]
        },
        flexibility: {
            title: "Mobility & Recovery",
            description: "Enhance flexibility, prevent injuries and improve overall movement quality.",
            highlights: [
                "Dynamic Stretching Routine",
                "Yoga for Athletes",
                "Recovery & Rehabilitation"
            ]
        }
    };

    const membershipPlan = {
        name: "Premium Fitness",
        prices: {
            '1month': "1,999 INR",
            '3month': "5,499 INR",
            '6month': "9,999 INR",
            'yearly': "17,999 INR"
        },
        features: [
            "Full access to gym floor and equipment",
            "Group fitness classes included",
            "Personal trainer consultation",
            "Sauna & spa access",
            "Locker room facilities",
            "Free parking"
        ]
    };

    const validityOptions = [
        { value: '1month', label: '1 Month' },
        { value: '3month', label: '3 Months' },
        { value: '6month', label: '6 Months' },
        { value: 'yearly', label: 'Yearly' }
    ];

    // For demonstration - update this with your actual gym location
    const gymLocation = {
        address: "New Rajjab Ganj, opposite Sundari lawn, Karim Ganj, Lucknow, Uttar Pradesh 226003",
        mapUrl: "https://maps.app.goo.gl/SwDiUx8B9SeHtLE86"
    };

    return (
        <div className="relative w-full min-h-screen overflow-hidden text-white">
            {/* Layer 1: Gradient Background */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-br from-black via-[#0d001a] to-black" />
            
            {/* Layer 2: Squares Animation */}
            <div className="absolute inset-0 -z-10 opacity-60">
                <Squares
                    direction="diagonal"
                    speed={0.3}
                    borderColor="rgba(255, 255, 255, 0.07)" 
                    hoverFillColor="rgba(255, 255, 255, 0.15)" 
                    squareSize={60}
                />
            </div>
            
            {/* Header */}
            <Header />
            
            {/* Hero Section */}
            <section className="px-6 pt-24 pb-20 md:px-10 lg:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    {/* Left Column: Main Hero Content */}
                    <div className="max-w-xl mb-12 lg:mb-0">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                            Transform Your Body, <br />Elevate Your Mind
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            Our premium fitness facility offers cutting-edge equipment, expert coaching, and customized workout plans designed to help you achieve your fitness goals.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button 
                                className="px-8 py-3 rounded-md border border-white/30 hover:bg-white/10 font-semibold transition-all"
                                onClick={() => setShowMembershipPlans(!showMembershipPlans)}
                            >
                                View Membership
                            </button>
                        </div>
                    </div>
                    
                    {/* Right Column: Workout Plans */}
                    <div className="backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 max-w-xl w-full">
                        <h2 className="text-2xl font-bold mb-6">Expert Workout Plans</h2>
                        
                        {/* Tabs */}
                        <div className="flex mb-6 border-b border-white/10">
                            {Object.keys(workoutPlans).map((plan) => (
                                <button 
                                    key={plan}
                                    onClick={() => setActiveTab(plan)}
                                    className={`px-4 py-2 mr-2 transition-all ${
                                        activeTab === plan 
                                            ? 'text-purple-400 border-b-2 border-purple-400' 
                                            : 'text-gray-400 hover:text-gray-200'
                                    }`}
                                >
                                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                                </button>
                            ))}
                        </div>
                        
                        {/* Active Tab Content */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">{workoutPlans[activeTab].title}</h3>
                            <p className="text-gray-300 mb-4">{workoutPlans[activeTab].description}</p>
                            <ul className="space-y-2">
                                {workoutPlans[activeTab].highlights.map((item, index) => (
                                    <li key={index} className="flex items-center">
                                        <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-12 md:px-10 lg:px-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        {/* Location & Map Button - UPDATED SECTION */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Find Us</h3>
                            <p className="text-gray-300 mb-6">{gymLocation.address}</p>
                            
                            {/* Map Button - Replaced the map with this button */}
                            <a 
                                href={gymLocation.mapUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all flex items-center space-x-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>View on Google Maps</span>
                            </a>
                        </div>
                        
                        {/* Hours & Contact */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Timing and Contact</h3>
                            <div className="mb-6">
                                <h4 className="font-medium text-purple-400 mb-2">Opening Hours</h4>
                                <ul className="space-y-1 text-gray-300">
                                    <li className="flex justify-between">
                                        <span>Monday - Saturday</span>
                                        <span>6:00 AM - 11:00 PM</span>
                                    </li>
            
                                    <li className="flex justify-between">
                                        <span>Sunday</span>
                                        <span>Close</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-medium text-purple-400 mb-2">Contact</h4>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        [Your Phone Number]
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        info@yourfitnessgym.com
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-8 border-t border-white/10 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} Dynamic Fitness Gym. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Membership Plans Modal - Shows when button is clicked */}
            {showMembershipPlans && (
                <section className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl max-w-5xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                                    Membership Plans
                                </h2>
                                <button 
                                    onClick={() => setShowMembershipPlans(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Validity Period Selection */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium mb-3">Select Membership Duration:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {validityOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setValidityPeriod(option.value)}
                                            className={`px-4 py-2 rounded-lg transition-all ${
                                                validityPeriod === option.value
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-black/40 border border-white/10 hover:bg-black/60'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Membership Plan Card */}
                                <div className="backdrop-blur-sm p-6 rounded-xl border-2 border-purple-500 bg-black/40">
                                    <h3 className="text-2xl font-bold mb-2">{membershipPlan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-3xl font-bold">{membershipPlan.prices[validityPeriod]}</span>
                                        <span className="text-gray-400"> / {validityPeriod === 'yearly' ? 'year' : validityPeriod.replace('month', ' month')}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {membershipPlan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className="inline-block w-5 h-5 mt-0.5 mr-2 text-purple-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Contact Card */}
                                <div className="backdrop-blur-sm p-6 rounded-xl border border-white/10 bg-black/20">
                                    <div className="flex flex-col h-full justify-center">
                                        <h3 className="text-2xl font-bold mb-6">Join us today and elevate your fitness journey.</h3>
                                        <p className="text-lg mb-8">Contact us to learn more about our membership options and facilities.</p>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <span className="inline-block w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <div className="text-sm text-gray-400">Phone</div>
                                                    <div className="text-lg">[Your Phone Number]</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <span className="inline-block w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <div className="text-sm text-gray-400">Alternate Phone</div>
                                                    <div className="text-lg">[Your Alternate Phone Number]</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};