import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    content: "The personality insights provided by Personality Arc have transformed our approach to team building and client relationships.",
    author: "John Doe",
    role: "CEO at TechCorp",
    rating: 5
  },
  {
    id: 2,
    content: "This platform has helped me understand myself better and make more informed career decisions.",
    author: "Sarah Smith",
    role: "Marketing Director",
    rating: 4.5
  },
  {
    id: 3,
    content: "An invaluable tool for personal development and team management.",
    author: "Michael Brown",
    role: "HR Manager",
    rating: 5
  }
];

export const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl p-8 relative">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-6 w-6 ${
                    index < currentTestimonial.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <p className="text-gray-700 text-lg mb-6 text-center">
              "{currentTestimonial.content}"
            </p>
            
            <div className="text-center mb-8">
              <h4 className="font-semibold text-gray-900">{currentTestimonial.author}</h4>
              <p className="text-gray-600">{currentTestimonial.role}</p>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};