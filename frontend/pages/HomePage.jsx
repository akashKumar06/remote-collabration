import { Link } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CardContent } from "../components/CardContent";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">CollabTrack</h1>
          <div>
            <Button className="mr-4">
              <Link to="/login">login</Link>
            </Button>
            <Button variant="outline">
              <Link to="/signup">signup</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="flex flex-col-reverse lg:flex-row items-center container mx-auto py-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Streamline Your Team Collaboration
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Create teams, assign tasks, and track your projects with ease. Boost
            productivity and ensure everyone stays on the same page.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
            Get Started
          </Button>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold text-gray-800 text-center mb-12">
            Why Choose CollabTrack?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Team Management",
                description:
                  "Team leaders can easily create and manage teams, ensuring a well-structured workflow.",
              },
              {
                title: "Task Assignment",
                description:
                  "Assign tasks to team members with deadlines and priorities for clear accountability.",
              },
              {
                title: "Project Tracking",
                description:
                  "Track the progress of your projects in real-time with detailed dashboards.",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="shadow-md">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <CheckCircle className="text-blue-600 w-6 h-6 mr-2" />
                    <h4 className="font-semibold text-lg text-gray-800">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2025 CollabTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
