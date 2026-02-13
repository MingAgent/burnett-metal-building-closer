import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import Input from '../../common/Input/Input';
import { useEstimatorStore } from '../../../store/estimatorStore';
import { containerVariants, itemVariants } from '../../../animations/variants';

export function Step1CustomerInfo() {
  const { customer, setCustomerInfo } = useEstimatorStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <motion.p variants={itemVariants} className="text-gray-600 mb-6">
        Please provide your contact information so we can prepare your custom estimate.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Input
            label="Full Name"
            placeholder="John Smith"
            value={customer.name}
            onChange={(e) => setCustomerInfo({ name: e.target.value })}
            leftIcon={<User className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            value={customer.email}
            onChange={(e) => setCustomerInfo({ email: e.target.value })}
            leftIcon={<Mail className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
            value={customer.phone}
            onChange={(e) => setCustomerInfo({ phone: e.target.value })}
            leftIcon={<Phone className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="Street Address"
            placeholder="123 Main Street"
            value={customer.address}
            onChange={(e) => setCustomerInfo({ address: e.target.value })}
            leftIcon={<MapPin className="w-5 h-5" />}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label="City"
            placeholder="Austin"
            value={customer.city}
            onChange={(e) => setCustomerInfo({ city: e.target.value })}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
          <Input
            label="State"
            placeholder="TX"
            value={customer.state}
            onChange={(e) => setCustomerInfo({ state: e.target.value })}
          />
          <Input
            label="ZIP Code"
            placeholder="78701"
            value={customer.zip}
            onChange={(e) => setCustomerInfo({ zip: e.target.value })}
          />
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200"
      >
        <p className="text-sm text-orange-800">
          <strong>Note:</strong> Your information is secure and will only be used to prepare your estimate and contact you about your building project.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Step1CustomerInfo;
