import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { StepWizard } from './components/layout/StepWizard';
import Header from './components/layout/Header/Header';
import { useEstimatorStore } from './store/estimatorStore';

// Import step components
import Step1CustomerInfo from './components/estimator/steps/Step1CustomerInfo';
import Step2BuildingSize from './components/estimator/steps/Step2BuildingSize';
import Step3Accessories from './components/estimator/steps/Step3Accessories';
import Step4Colors from './components/estimator/steps/Step4Colors';
import Step5Concrete from './components/estimator/steps/Step5Concrete';
import Step6Review from './components/estimator/steps/Step6Review';

const steps = [
  { id: 1, title: 'Customer Info', component: <Step1CustomerInfo /> },
  { id: 2, title: 'Building Size', component: <Step2BuildingSize /> },
  { id: 3, title: 'Accessories', component: <Step3Accessories /> },
  { id: 4, title: 'Colors', component: <Step4Colors /> },
  { id: 5, title: 'Concrete', component: <Step5Concrete /> },
  { id: 6, title: 'Review', component: <Step6Review /> }
];

function App() {
  const { currentStep, nextStep, prevStep, goToStep, calculatePricing } = useEstimatorStore();

  // Calculate pricing on initial load
  useEffect(() => {
    calculatePricing();
  }, [calculatePricing]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Metal Building Estimator</h1>
          <p className="text-orange-100 text-lg">
            Get an instant quote for your custom metal building
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepWizard
          steps={steps}
          currentStep={currentStep}
          onNext={nextStep}
          onPrev={prevStep}
          onStepClick={goToStep}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Gryphon FrameWorks</h3>
              <p className="text-sm">
                Quality metal buildings designed and installed with precision.
                Serving residential and commercial customers since 2010.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="text-sm space-y-2">
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@gryphonframeworks.com</li>
                <li>Hours: Mon-Fri 8am-6pm</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Service Area</h3>
              <p className="text-sm">
                We proudly serve Texas and surrounding states.
                Contact us for availability in your area.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Gryphon FrameWorks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
