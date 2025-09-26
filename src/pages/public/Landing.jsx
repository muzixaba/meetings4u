import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Shield, DollarSign } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Landing = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Professional Meeting
            <span className="text-primary-500"> Representation</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with qualified representatives to attend your meetings when you can't be there yourself.
            Professional, reliable, and affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup?type=client">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started as Client
              </Button>
            </Link>
            <Link to="/signup?type=rep">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Work as Representative
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">Simple, secure, and professional</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Post Your Meeting</h3>
            <p className="text-gray-600">
              Describe your meeting requirements, location, and what needs to be done. Upload any necessary documents.
            </p>
          </Card>

          <Card className="text-center p-8">
            <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-accent-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Quotes</h3>
            <p className="text-gray-600">
              Qualified representatives in your area submit quotes with their rates and availability details.
            </p>
          </Card>

          <Card className="text-center p-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Meeting Completed</h3>
            <p className="text-gray-600">
              Your representative attends the meeting, completes required tasks, and provides you with a detailed report.
            </p>
          </Card>
        </div>
      </section>

      {/* Meeting Types */}
      <section className="py-16 bg-gray-100 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Meetings We Support</h2>
          <p className="text-lg text-gray-600 mb-12">Professional representation for various meeting types</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Tender Briefings',
              'Site Inspections',
              'Community Meetings',
              'Government Consultations'
            ].map((type) => (
              <Card key={type} className="p-6 text-center">
                <h3 className="font-semibold text-gray-900">{type}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
          <p className="text-lg text-gray-600">Pay only when your job is completed successfully</p>
        </div>

        <Card className="max-w-2xl mx-auto p-8 text-center">
          <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-primary-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">20% Commission</h3>
          <p className="text-gray-600 mb-4">
            We take a 20% commission only after your job is successfully completed.
            No upfront fees, no hidden charges.
          </p>
          <p className="text-sm text-gray-500">
            Example: If you accept a R250 quote, you pay R300 total (R250 to rep + R50 platform fee)
          </p>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of clients and representatives using Meetings4U for professional meeting services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup?type=client">
              <Button size="lg" className="w-full sm:w-auto">
                Post Your First Meeting
              </Button>
            </Link>
            <Link to="/signup?type=rep">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Start Earning as Rep
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;