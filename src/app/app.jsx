import PricingCard from '@/components/PricingCard';

export default function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Simple, Transparent Pricing</h1>
                    <p className="text-lg text-slate-600">Choose the plan that fits your needs</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingCard
                        name="Starter"
                        price="29"
                        description="Perfect for getting started"
                        features={[
                            'Up to 5 projects',
                            '5GB storage',
                            'Basic analytics',
                            'Community support',
                            'Monthly billing'
                        ]}
                        cta="Get Started"
                        highlighted={false}
                    />

                    <PricingCard
                        name="Professional"
                        price="79"
                        description="For growing teams"
                        features={[
                            'Unlimited projects',
                            '500GB storage',
                            'Advanced analytics',
                            'Priority email support',
                            'Monthly or annual billing',
                            'Custom integrations'
                        ]}
                        cta="Start Free Trial"
                        highlighted={true}
                    />

                    <PricingCard
                        name="Enterprise"
                        price="Custom"
                        description="For large organizations"
                        features={[
                            'Everything in Professional',
                            'Unlimited storage',
                            'Real-time analytics',
                            '24/7 phone & email support',
                            'Dedicated account manager',
                            'Custom SLA'
                        ]}
                        cta="Contact Sales"
                        highlighted={false}
                    />
                </div>
            </div>
        </div>
    );
}